"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Send, CheckCircle2 } from "lucide-react";

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "Translation",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } catch {
      // Fallback
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-14 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-xl mx-auto">
          {submitted ? (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Message Sent</h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Thank you for contacting us. Our team will review your inquiry and reply to <strong>{formData.email}</strong> shortly.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", email: "", service: "Translation", message: "" });
                  }}
                  className="px-5 py-2 text-xs font-semibold text-blue-600 hover:underline"
                >
                  Send Another Message
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 shadow-xs space-y-6">
              <div className="text-center space-y-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  Contact Us
                </h1>
                <p className="text-xs sm:text-sm text-slate-500">
                  Fill out the form below and we will get back to you promptly.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-slate-50 border border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter your email"
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-slate-50 border border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Service of Interest
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-slate-50 border border-slate-300 text-slate-800 font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none focus:bg-white"
                  >
                    <option value="Translation">Translation</option>
                    <option value="Interpretation">Interpretation</option>
                    <option value="Localization/AI Services">Localization / AI Services</option>
                    <option value="Transcription">Transcription</option>
                    <option value="Subtitle">Subtitles</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your message..."
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-slate-50 border border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none focus:bg-white resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 px-4 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <span className="inline-block animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
