"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Send, CheckCircle2, Mail, Phone, MapPin, Sparkles } from "lucide-react";
import { TwitterIcon, LinkedInIcon, FacebookIcon, WhatsAppIcon } from "@/components/Icons";
import { SITE_CONFIG } from "@/data/siteConfig";

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "Translation",
    customService: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [resultSubject, setResultSubject] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setResultSubject(data.subject || `[Contact Inquiry] ${formData.service}`);
    } catch {
      setResultSubject(`[Contact Inquiry] ${formData.service}`);
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />

      {/* Header Banner */}
      <section className="bg-[#0000FF] text-white py-14 lg:py-20 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-3">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Contact FYT Localization
          </h1>
          <p className="text-sm sm:text-base text-blue-100 max-w-xl mx-auto leading-relaxed">
            Reach out with project inquiries, partnership proposals, or translation briefs. We respond promptly.
          </p>
        </div>
      </section>

      <main className="flex-1 py-12 lg:py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Info & Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Let&apos;s Connect</h2>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Our linguistic coordinators and AI dataset specialists are ready to discuss your scope.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 block">Email Us</span>
                    <a
                      href={`mailto:${SITE_CONFIG.contact.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {SITE_CONFIG.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 block">WhatsApp (Business)</span>
                    <a
                      href={SITE_CONFIG.contact.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 font-medium hover:underline"
                    >
                      {SITE_CONFIG.contact.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center shrink-0 border border-slate-200">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 block">Headquarters</span>
                    <span className="text-slate-600">{SITE_CONFIG.contact.address}</span>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-slate-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-3">
                  Follow & Connect With Us:
                </span>
                <div className="flex items-center gap-2.5">
                  <a
                    href={SITE_CONFIG.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 flex items-center justify-center transition-colors"
                    aria-label="LinkedIn"
                  >
                    <LinkedInIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={SITE_CONFIG.social.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 flex items-center justify-center transition-colors"
                    aria-label="Twitter / X"
                  >
                    <TwitterIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={SITE_CONFIG.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 flex items-center justify-center transition-colors"
                    aria-label="Facebook"
                  >
                    <FacebookIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={SITE_CONFIG.social.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-700 flex items-center justify-center transition-colors"
                    aria-label="WhatsApp"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 text-center space-y-4 shadow-sm animate-in fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center border-2 border-emerald-300">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Message Dispatched</h2>
                <p className="text-xs font-mono text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg inline-block border border-blue-100">
                  Subject: {resultSubject}
                </p>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Thank you for contacting FYT Localization. Our team has received your message and will reply to <strong>{formData.email}</strong> shortly.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", service: "Translation", customService: "", message: "" });
                    }}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-xs"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Send Us A Message
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Fill out the form below and we will get back to you promptly.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Amina Bello"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="amina@domain.com"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none focus:bg-white"
                      />
                    </div>
                  </div>

                  {/* 5.1: Grouped Service of Interest Dropdown */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Service of Interest *
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-300 text-slate-800 font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none focus:bg-white"
                    >
                      <optgroup label="Localization Services">
                        <option value="Translation & Localization">Translation & Localization</option>
                        <option value="Transcription">Transcription (Audio & Video)</option>
                        <option value="Interpretation">Interpretation (Simultaneous & RSI)</option>
                        <option value="Subtitling">Subtitling & Closed Captions</option>
                        <option value="MTPE (Machine Translation Post-Editing)">MTPE (Machine Translation Post-Editing)</option>
                        <option value="Language Quality Assurance (LQA)">Language Quality Assurance (LQA)</option>
                        <option value="UI/UX & Technical Localization">UI/UX & Technical Localization</option>
                        <option value="Cultural-Context Testing">Cultural-Context Testing</option>
                      </optgroup>
                      <optgroup label="AI Data Services">
                        <option value="AI Data Collection & Annotation">AI Data Collection & Annotation</option>
                        <option value="LLM / Chatbot Testing & Evaluation">LLM / Chatbot Testing & Evaluation</option>
                        <option value="AI Data Sourcing & Preparation">AI Data Sourcing & Preparation</option>
                        <option value="Voice-Over & Speech Data">Voice-Over & Speech Data</option>
                        <option value="Egocentric Capture">Egocentric Capture (POV)</option>
                      </optgroup>
                      <optgroup label="General & Custom">
                        <option value="General Inquiry">General Inquiry</option>
                        {/* 5.2: Other option */}
                        <option value="Other">Other (Specify Custom Service)</option>
                      </optgroup>
                    </select>
                  </div>

                  {/* 5.2: Dynamic Custom Service Input if Other is selected */}
                  {formData.service === "Other" && (
                    <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl space-y-1 animate-in fade-in">
                      <label className="block text-xs font-bold text-blue-900">
                        Please specify the custom service or solution needed: *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.customService}
                        onChange={(e) => setFormData({ ...formData, customService: e.target.value })}
                        placeholder="e.g. Synthetic voice generation, multi-dialect corpus evaluation, etc."
                        className="w-full px-3.5 py-2 text-xs rounded-lg bg-white border border-blue-300 text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Your Message & Requirements *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please specify target languages or regions, estimated timeline, project scope, or any questions..."
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none focus:bg-white resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-sm active:scale-95"
                  >
                    {submitting ? (
                      <span className="inline-block animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
