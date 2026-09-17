"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Sparkles,
  Send,
  CheckCircle2,
  Phone,
  FileText,
  Clock,
  ShieldCheck,
  Upload,
  Globe2,
} from "lucide-react";

export default function BookNowServicePage() {
  const [formData, setFormData] = useState({
    service: "Translation",
    sourceLanguage: "English",
    targetLanguage: "Hausa",
    budgetModel: "Per Word",
    volume: "2,500 words",
    deadline: "Within 48 hours",
    fullName: "",
    email: "",
    phone: "",
    organization: "",
    projectBrief: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service: formData.service,
          sourceLang: formData.sourceLanguage,
          targetLang: formData.targetLanguage,
          volume: formData.volume,
          fullName: formData.fullName,
          email: formData.email,
          notes: `[Budget Model: ${formData.budgetModel}] [Deadline: ${formData.deadline}] [Org: ${formData.organization}] [Phone: ${formData.phone}] - ${formData.projectBrief}`,
        }),
      });
    } catch {
      // Fallback
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  };

  const handleWhatsAppQuickTrack = () => {
    const text = encodeURIComponent(
      `Hello FYTLOCALIZATION! I submitted a booking request for:\n• Service: ${formData.service}\n• Pair: ${formData.sourceLanguage} to ${formData.targetLanguage}\n• Scope: ${formData.volume}\n• Client: ${formData.fullName || "Client"}\n• Email: ${formData.email || "N/A"}`
    );
    window.open(`https://wa.me/message/OIYPQ375X3HKP1?text=${text}`, "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />

      {/* Header Banner */}
      <section className="bg-[#003cd6] text-white py-14 lg:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-3 border border-white/20">
            <Sparkles className="w-3.5 h-3.5" />
            Official Project Intake Desk
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.15] max-w-2xl">
            Book Now & Request a Formal Project Quote
          </h1>
          <p className="mt-3 text-sm sm:text-base text-blue-100 max-w-xl leading-relaxed">
            Specify your language pair, scope, and service requirements below. Our dedicated project coordinator will evaluate your brief and email a competitive quote within minutes.
          </p>
        </div>
      </section>

      {/* Form Container */}
      <main className="flex-1 py-12 lg:py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {submitted ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl text-center space-y-6 max-w-2xl mx-auto animate-in fade-in">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center border-2 border-emerald-300">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900">Booking Request Received!</h2>
            <p className="text-slate-600 text-sm leading-relaxed max-w-md mx-auto">
              Thank you, <strong>{formData.fullName || "valued client"}</strong>. Your project brief for <strong>{formData.service}</strong> ({formData.sourceLanguage} → {formData.targetLanguage}) has been assigned to a language manager.
            </p>

            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 text-xs text-blue-900 text-left space-y-1">
              <div><strong>Reference ID:</strong> FYT-{Date.now().toString().slice(-6)}</div>
              <div><strong>Service:</strong> {formData.service}</div>
              <div><strong>Scope:</strong> {formData.volume} ({formData.budgetModel})</div>
              <div><strong>Confirmation sent to:</strong> {formData.email}</div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleWhatsAppQuickTrack}
                className="px-6 py-3 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
              >
                <Phone className="w-4 h-4" />
                <span>Track Instantly on WhatsApp</span>
              </button>
              <Link
                href="/"
                className="px-6 py-3 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200"
              >
                Return to Homepage
              </Link>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-8"
          >
            {/* Step 1: Service & Language Pair */}
            <div>
              <div className="flex items-center gap-2 pb-2 mb-4 border-b border-slate-100">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  Service Selection & Language Pair
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Service Line *
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-300 text-slate-800 font-semibold focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    <option value="Translation">1. Translation (Document & Legal)</option>
                    <option value="Interpretation">2. Interpretation (Conferences & RSI)</option>
                    <option value="Localization/AI Services">3. Localization / AI Data Annotation</option>
                    <option value="Transcription">4. Transcription (Audio & Video)</option>
                    <option value="Subtitle">5. Subtitling & Closed Captions</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Source Language *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.sourceLanguage}
                    onChange={(e) => setFormData({ ...formData, sourceLanguage: e.target.value })}
                    placeholder="e.g. English, French, Arabic"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Target Language(s) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.targetLanguage}
                    onChange={(e) => setFormData({ ...formData, targetLanguage: e.target.value })}
                    placeholder="e.g. Hausa, Yoruba, Swahili"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Scope & Budget Model */}
            <div>
              <div className="flex items-center gap-2 pb-2 mb-4 border-b border-slate-100">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  Project Scope, Budget Model & Urgency
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Budget Model *
                  </label>
                  <select
                    value={formData.budgetModel}
                    onChange={(e) => setFormData({ ...formData, budgetModel: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-300 text-slate-800 font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    <option value="Per Word">Per Word (Recommended for Translation)</option>
                    <option value="Per Hour">Per Hour (Recommended for Interpretation)</option>
                    <option value="Per Minute">Per Minute (Transcription & Subtitles)</option>
                    <option value="Per Milestone">Per Milestone / Project Sprint</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Volume / Estimated Duration
                  </label>
                  <input
                    type="text"
                    value={formData.volume}
                    onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                    placeholder="e.g. 5,000 words or 90 mins audio"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Turnaround Timeline
                  </label>
                  <select
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-300 text-slate-800 font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    <option value="Rush (12–24h)">Rush Priority (12–24 Hours)</option>
                    <option value="Standard (24–48h)">Standard (24–48 Hours)</option>
                    <option value="Flexible (3–5 days)">Flexible (3–5 Days)</option>
                    <option value="Scheduled Future Event">Scheduled Future Event / Conference</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 3: Client Details */}
            <div>
              <div className="flex items-center gap-2 pb-2 mb-4 border-b border-slate-100">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  Contact Information
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Dr. Alex Vance"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Official Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@organization.org"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    WhatsApp or Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+234..."
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="e.g. NGO, Fintech, Media House"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Step 4: Brief & Optional File Upload */}
            <div>
              <div className="flex items-center gap-2 pb-2 mb-4 border-b border-slate-100">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                  4
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  Project Brief & File Upload
                </h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Project Brief & Instructions
                  </label>
                  <textarea
                    rows={4}
                    value={formData.projectBrief}
                    onChange={(e) => setFormData({ ...formData, projectBrief: e.target.value })}
                    placeholder="Describe your project, context, target audience, specific dialect requirements, or formatting needs..."
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                {/* Upload Zone */}
                <div className="p-6 border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50/50 hover:bg-slate-50 text-center transition-colors">
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-slate-700">
                    Upload sample document, audio clip, or RFP specification
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Supports .docx, .pdf, .mp3, .srt, .xlsx up to 50MB (protected under strict NDA)
                  </p>
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setSelectedFile(e.target.files[0].name);
                      }
                    }}
                  />
                  <label
                    htmlFor="file-upload"
                    className="inline-block mt-3 px-4 py-2 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 cursor-pointer shadow-sm"
                  >
                    {selectedFile ? `Selected: ${selectedFile}` : "Select File"}
                  </label>
                </div>
              </div>
            </div>

            {/* Submission Actions */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 py-4 px-6 rounded-xl text-sm font-extrabold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-600/25 transition-all flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <span className="inline-block animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Booking & Request Formal Quote</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleWhatsAppQuickTrack}
                className="py-4 px-6 rounded-xl text-sm font-bold text-slate-900 bg-teal-400 hover:bg-teal-300 shadow-lg transition-all flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <Phone className="w-4 h-4" />
                <span>Chat via WhatsApp</span>
              </button>
            </div>
          </form>
        )}
      </main>

      <Footer />
    </div>
  );
}
