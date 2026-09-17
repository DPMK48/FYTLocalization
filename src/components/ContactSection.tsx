"use client";

import React, { useState } from "react";
import {
  Send,
  CheckCircle2,
} from "lucide-react";
import { TwitterIcon, LinkedInIcon, FacebookIcon, WhatsAppIcon } from "@/components/Icons";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "Translation",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#f0f7ff] text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Contact Info & Support Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-0.5 bg-blue-700" />
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                  Contact Us
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-blue-700 tracking-tight leading-[1.18]">
                Let&apos;s Discuss Your Next Project.
              </h2>
              <p className="mt-4 text-base text-slate-600 leading-relaxed">
                Whether you have an urgent translation order, a large transcription backlog, or need conference interpreters, our team responds in minutes.
              </p>
            </div>



            {/* Social channels */}
            <div className="pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-3">
                Follow FYTLOCALIZATION:
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.linkedin.com/company/fytlocalization/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white text-blue-700 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-colors border border-blue-200 shadow-xs"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon className="w-5 h-5" />
                </a>
                <a
                  href="https://x.com/fytlocalization"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white text-blue-700 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-colors border border-blue-200 shadow-xs"
                  aria-label="Twitter/X"
                >
                  <TwitterIcon className="w-5 h-5" />
                </a>
                <a
                  href="https://www.facebook.com/people/Fytlocalization/61583295960480/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white text-blue-700 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-colors border border-blue-200 shadow-xs"
                  aria-label="Facebook"
                >
                  <FacebookIcon className="w-5 h-5" />
                </a>
                <a
                  href="https://wa.me/message/OIYPQ375X3HKP1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white text-emerald-600 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-colors border border-emerald-200 shadow-xs"
                  aria-label="WhatsApp"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Consultation & Message Form (White Card on Light Blue) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-blue-100 shadow-xl relative">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center border border-emerald-300">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Message Received!</h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Thank you for contacting FYTLOCALIZATION. A language specialist will review your inquiry and get back to you within 15 minutes.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", service: "Translation", message: "" });
                    }}
                    className="mt-4 px-6 py-2.5 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-slate-100 pb-4 mb-2">
                    <h3 className="text-xl font-bold text-slate-900">Send Us An Inquiry</h3>
                    <p className="text-xs text-slate-500">
                      Fill out the form below to receive a customized quote and timeline.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Amina Bello"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. amina@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Service Needed
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="Translation">Document & Legal Translation</option>
                      <option value="Interpretation">Conference & Event Interpretation</option>
                      <option value="Localization">AI Localization & MTPE</option>
                      <option value="Transcription">Audio & Video Transcription</option>
                      <option value="Subtitle">Subtitles & Closed Captioning</option>
                      <option value="Other">Custom Multi-Language Package</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Project Details & Language Pairs *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please specify source & target languages (e.g. English to Hausa & French), estimated word count or duration, and deadline."
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 px-6 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span className="inline-block animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                    ) : (
                      <>
                        <span>Submit Project Details</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
