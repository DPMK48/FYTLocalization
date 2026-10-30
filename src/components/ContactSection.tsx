"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, Mail, Phone, MapPin } from "lucide-react";
import { TwitterIcon, LinkedInIcon, FacebookIcon, WhatsAppIcon } from "@/components/Icons";
import { SITE_CONFIG } from "@/data/siteConfig";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "Translation",
    customService: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subjectSent, setSubjectSent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setSubjectSent(data.subject || `[Contact Inquiry] ${formData.service}`);
    } catch {
      setSubjectSent(`[Contact Inquiry] ${formData.service}`);
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-slate-50 border-t border-slate-200 text-slate-900 relative">
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
                Whether you need enterprise translations, multilingual transcription, interpretation, or speech datasets for AI models across Africa, our team responds promptly.
              </p>
            </div>

            {/* Direct details */}
            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-600" />
                <a href={`mailto:${SITE_CONFIG.contact.email}`} className="text-slate-700 font-semibold hover:text-blue-600">
                  {SITE_CONFIG.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-600" />
                <a href={SITE_CONFIG.contact.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-slate-700 font-semibold hover:text-emerald-600">
                  {SITE_CONFIG.contact.phoneDisplay}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span className="text-slate-600">
                  {SITE_CONFIG.contact.address}
                </span>
              </div>
            </div>

            {/* Social channels (1.5: Centralized config) */}
            <div className="pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-3">
                Follow FYT Localization:
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={SITE_CONFIG.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white text-blue-700 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-colors border border-blue-200 shadow-xs"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon className="w-5 h-5" />
                </a>
                <a
                  href={SITE_CONFIG.social.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white text-blue-700 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-colors border border-blue-200 shadow-xs"
                  aria-label="Twitter/X"
                >
                  <TwitterIcon className="w-5 h-5" />
                </a>
                <a
                  href={SITE_CONFIG.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white text-blue-700 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-colors border border-blue-200 shadow-xs"
                  aria-label="Facebook"
                >
                  <FacebookIcon className="w-5 h-5" />
                </a>
                <a
                  href={SITE_CONFIG.social.whatsapp}
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

          {/* Right Column: Interactive Consultation & Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-blue-100 shadow-xl relative">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center border border-emerald-300">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Message Received!</h3>
                  <p className="text-xs font-mono text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg inline-block border border-blue-100">
                    Subject: {subjectSent}
                  </p>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you for contacting FYT Localization. A coordinator will review your inquiry and get back to you shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", service: "Translation", customService: "", message: "" });
                    }}
                    className="mt-4 px-6 py-2.5 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-xs"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-slate-100 pb-3 mb-2">
                    <h3 className="text-xl font-bold text-slate-900">Send Us An Inquiry</h3>
                    <p className="text-xs text-slate-500">
                      Fill out the form below to receive a customized quote and timeline.
                    </p>
                  </div>

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
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                        placeholder="amina@example.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                  </div>

                  {/* 5.1: Grouped Service Selection */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Service of Interest *
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
                    >
                      <optgroup label="Localization Services">
                        <option value="Translation & Localization">Translation & Localization</option>
                        <option value="Transcription">Transcription (Audio & Video)</option>
                        <option value="Interpretation">Interpretation (Simultaneous & RSI)</option>
                        <option value="Subtitling">Subtitling & Closed Captioning</option>
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

                  {/* 5.2: Dynamic Custom Service Input if Other */}
                  {formData.service === "Other" && (
                    <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl space-y-1 animate-in fade-in">
                      <label className="block text-xs font-bold text-blue-900">
                        Please specify the custom service or requirement: *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.customService}
                        onChange={(e) => setFormData({ ...formData, customService: e.target.value })}
                        placeholder="e.g. Multi-dialect phoneme annotation, synthetic speech testing, etc."
                        className="w-full px-3.5 py-2 text-xs rounded-lg bg-white border border-blue-300 text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Project Details & Language Pairs / Region *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please specify source & target languages, target country/region, estimated volume or duration, and deadline."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-6 rounded-xl font-bold text-xs sm:text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
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
