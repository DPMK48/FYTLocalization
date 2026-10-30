"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  CheckCircle2,
  Send,
  Phone,
  Layers,
  Sparkles,
} from "lucide-react";
import {
  SERVICE_CATEGORIES,
  getCategoryForService,
  ServiceCategoryType,
} from "@/data/servicesData";
import { saveSubmission } from "@/data/submissionsStore";
import { SITE_CONFIG } from "@/data/siteConfig";

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
  // Determine initial category
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategoryType>(
    getCategoryForService(initialService)
  );
  const [service, setService] = useState(initialService);

  // Localization Form Fields
  const [sourceLang, setSourceLang] = useState("English");
  const [targetLang, setTargetLang] = useState("Hausa");

  // AI Data Services Form Fields
  const [dataType, setDataType] = useState("Selfie & Facial Images");
  const [targetRegion, setTargetRegion] = useState("Nigeria & East Africa");
  const [collectionTool, setCollectionTool] = useState("Mobile application");

  // Common Fields (4.4: Labeled 'Estimated volume or duration')
  const [volume, setVolume] = useState("1,500 Words / Scope");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submittedSubject, setSubmittedSubject] = useState("");

  // Sync category and service when initialService prop changes
  useEffect(() => {
    if (initialService) {
      setService(initialService);
      const cat = getCategoryForService(initialService);
      setSelectedCategory(cat);
      if (cat === "localization") {
        setVolume("2,500 words");
      } else {
        setVolume("500 images / 50 hours");
      }
    }
  }, [initialService]);

  if (!isOpen) return null;

  const currentCategoryObj =
    SERVICE_CATEGORIES.find((c) => c.id === selectedCategory) || SERVICE_CATEGORIES[0];

  const handleCategoryChange = (newCat: ServiceCategoryType) => {
    setSelectedCategory(newCat);
    const firstService =
      SERVICE_CATEGORIES.find((c) => c.id === newCat)?.services[0]?.title || "Translation";
    setService(firstService);
    if (newCat === "localization") {
      setVolume("2,500 words");
    } else {
      setVolume("500 images / 50 hours");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      category: selectedCategory,
      service,
      fullName,
      email,
      volume,
      notes,
      ...(selectedCategory === "localization"
        ? { sourceLang, targetLang }
        : { dataType, targetRegion, collectionTool }),
    };

    try {
      // 1. Post to API route
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setSubmittedSubject(data.subject || `[Quote Request] ${service}`);

      // 2. Persist locally to store
      saveSubmission(payload);
    } catch {
      saveSubmission(payload);
      setSubmittedSubject(`[Quote Request] ${service}`);
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  };

  const handleWhatsAppDirect = () => {
    const details =
      selectedCategory === "localization"
        ? `• Service: ${service}\n• Pair: ${sourceLang} to ${targetLang}\n• Volume/Duration: ${volume}`
        : `• Service: ${service}\n• Data Type: ${dataType}\n• Target Region: ${targetRegion}\n• Volume/Duration: ${volume}`;

    const text = encodeURIComponent(
      `Hello ${SITE_CONFIG.name}! I would like to request a quote:\n\n${details}\n• Client: ${fullName || "Client"}\n• Email: ${email || "N/A"}\n• Brief: ${notes || "None"}`
    );
    window.open(`${SITE_CONFIG.contact.whatsappUrl}?text=${text}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 z-10 animate-in fade-in zoom-in-95 duration-200 my-8 max-h-[90vh] overflow-y-auto">
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
            <h3 className="text-2xl font-bold text-slate-900">Quote Request Received!</h3>
            <p className="text-xs font-mono text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg inline-block border border-blue-100">
              {submittedSubject}
            </p>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Your inquiry for <strong>{service}</strong> has been logged. Our language & AI project coordinator will email your customized scope summary within minutes.
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
            {/* 4.2: Rename modal title to 'Request a Quote' */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[11px] font-bold mb-2">
                <Sparkles className="w-3 h-3 text-blue-600" />
                <span>FYT Localization Project Intake</span>
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900">Request a Quote</h3>
              <p className="text-xs text-slate-500">
                Choose your category and describe your requirements. No upfront payment required.
              </p>
            </div>

            {/* Category Toggle Tabs */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl text-xs font-bold">
              <button
                type="button"
                onClick={() => handleCategoryChange("localization")}
                className={`py-2 px-3 rounded-lg transition-all text-center flex items-center justify-center gap-1.5 ${
                  selectedCategory === "localization"
                    ? "bg-white text-blue-700 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <span>Localization Services</span>
              </button>
              <button
                type="button"
                onClick={() => handleCategoryChange("ai-data")}
                className={`py-2 px-3 rounded-lg transition-all text-center flex items-center justify-center gap-1.5 ${
                  selectedCategory === "ai-data"
                    ? "bg-white text-blue-700 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <span>AI Data Services</span>
              </button>
            </div>

            {/* 4.3: VARIANT A - LOCALIZATION FORM */}
            {selectedCategory === "localization" ? (
              <div className="space-y-3 pt-1">
                {/* Service Selection */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Service (Pre-selected) *
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-300 text-slate-800 font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    {currentCategoryObj.services.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Source & Target Languages */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Source Language *
                    </label>
                    <input
                      type="text"
                      required
                      value={sourceLang}
                      onChange={(e) => setSourceLang(e.target.value)}
                      placeholder="e.g. English, French, Arabic"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Target Language *
                    </label>
                    <input
                      type="text"
                      required
                      value={targetLang}
                      onChange={(e) => setTargetLang(e.target.value)}
                      placeholder="e.g. Hausa, Yoruba, Swahili"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            ) : (
              /* 4.3: VARIANT B - AI DATA SERVICES FORM (No language pairs) */
              <div className="space-y-3 pt-1">
                {/* Service Selection */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    AI Service (Pre-selected) *
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-300 text-slate-800 font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    {currentCategoryObj.services.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Multimedia Type & Collection Tool Preference */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Data / Multimedia Type *
                    </label>
                    <input
                      type="text"
                      required
                      value={dataType}
                      onChange={(e) => setDataType(e.target.value)}
                      placeholder="e.g. Selfie images, video, speech audio"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Collection Tool (Optional)
                    </label>
                    <input
                      type="text"
                      value={collectionTool}
                      onChange={(e) => setCollectionTool(e.target.value)}
                      placeholder="e.g. Mobile app or conventional tool"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Target Region as Free-Text Input (NOT a dropdown of countries) */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Target Region (Free-Text Input) *
                  </label>
                  <input
                    type="text"
                    required
                    value={targetRegion}
                    onChange={(e) => setTargetRegion(e.target.value)}
                    placeholder="e.g. Northern Nigeria, Urban Kenya, or Francophone West Africa"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    Specify cities, dialects, demographics, or geographic zones.
                  </p>
                </div>
              </div>
            )}

            {/* 4.4: Labeled 'Estimated volume or duration' in both forms */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                Estimated volume or duration *
              </label>
              <input
                type="text"
                required
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                placeholder="e.g. 1,500 words, 2 weeks, 500 images, 50 audio hours"
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none font-medium"
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
                  placeholder="name@domain.com"
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
                placeholder="Include formatting requirements, industry domain, deadline, delivery format, etc."
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none resize-none"
              />
            </div>

            {/* 4.2: Rename submit button to 'Send Quote' */}
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
                    <span>Send Quote</span>
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
