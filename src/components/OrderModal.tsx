"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  CheckCircle2,
  Send,
  Phone,
} from "lucide-react";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export default function OrderModal({
  isOpen,
  onClose,
  initialService = "Translation",
}: OrderModalProps) {
  const [service, setService] = useState(initialService);
  const [sourceLang, setSourceLang] = useState("English");
  const [targetLang, setTargetLang] = useState("Hausa");
  const [volume, setVolume] = useState("1,500 Words");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialService) {
      setService(initialService);
    }
  }, [initialService]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // Post to API endpoint
      await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service,
          sourceLang,
          targetLang,
          volume,
          fullName,
          email,
          notes,
        }),
      });
    } catch {
      // Graceful fallback
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello FYTLOCALIZATION! I would like to book a service:\n\n• Service: ${service}\n• Language Pair: ${sourceLang} to ${targetLang}\n• Scope: ${volume}\n• Name: ${fullName || "Client"}\n• Email: ${email || "N/A"}\n• Notes: ${notes || "None"}`
    );
    window.open(`https://wa.me/message/OIYPQ375X3HKP1?text=${text}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center border-2 border-emerald-300">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Booking Request Received!</h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Your booking for <strong>{service}</strong> ({sourceLang} → {targetLang}) has been logged. Our project coordinator will email your customized quote and scope summary within minutes.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleWhatsAppDirect}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Track on WhatsApp</span>
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <h3 className="text-2xl font-bold text-slate-900">Book Your Project</h3>
              <p className="text-xs text-slate-500">
                Provide your project requirements across any of our 5 language specializations.
              </p>
            </div>

            {/* Service & Languages */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Service *
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-300 text-slate-800 font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none"
                >
                  <option value="Translation">1. Translation</option>
                  <option value="Interpretation">2. Interpretation</option>
                  <option value="Localization/AI Services">3. Localization / AI</option>
                  <option value="Transcription">4. Transcription</option>
                  <option value="Subtitle">5. Subtitle & Captions</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Source Language
                </label>
                <input
                  type="text"
                  value={sourceLang}
                  onChange={(e) => setSourceLang(e.target.value)}
                  placeholder="e.g. English"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Target Language
                </label>
                <input
                  type="text"
                  value={targetLang}
                  onChange={(e) => setTargetLang(e.target.value)}
                  placeholder="e.g. Hausa / Swahili"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>
            </div>

            {/* Scope / Volume */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                Estimated Volume or Audio Duration
              </label>
              <input
                type="text"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                placeholder="e.g. 2,500 words, 45 mins audio, or 3 days conference"
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@domain.com"
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>
            </div>

            {/* Special Instructions */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                Project Brief / Special Requirements
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Include formatting requirements, industry domain, deadline, etc."
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none resize-none"
              />
            </div>

            {/* Action */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/25 transition-all flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <span className="inline-block animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Confirm & Book Now</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
