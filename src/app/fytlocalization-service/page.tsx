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
  Globe2,
  Cpu,
} from "lucide-react";
import {
  SERVICE_CATEGORIES,
  ServiceCategoryType,
} from "@/data/servicesData";
import { saveSubmission } from "@/data/submissionsStore";
import { SITE_CONFIG } from "@/data/siteConfig";

export default function BookNowServicePage() {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategoryType>("localization");
  const [formData, setFormData] = useState({
    service: "Translation",
    sourceLanguage: "English",
    targetLanguage: "Hausa",
    dataType: "Facial / Selfie images",
    targetRegion: "Northern Nigeria & Sahel region",
    collectionTool: "Mobile recording app",
    budgetModel: "Per Word / Deliverable",
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

  const currentCatObj =
    SERVICE_CATEGORIES.find((c) => c.id === selectedCategory) || SERVICE_CATEGORIES[0];

  const handleCategoryChange = (cat: ServiceCategoryType) => {
    setSelectedCategory(cat);
    const firstService =
      SERVICE_CATEGORIES.find((c) => c.id === cat)?.services[0]?.title || "Translation";
    setFormData((prev) => ({
      ...prev,
      service: firstService,
      volume: cat === "localization" ? "2,500 words" : "500 images / 50 hours",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      category: selectedCategory,
      service: formData.service,
      fullName: formData.fullName,
      email: formData.email,
      volume: formData.volume,
      notes: `[Org: ${formData.organization || "N/A"}] [Phone: ${formData.phone || "N/A"}] [Deadline: ${formData.deadline}] - ${formData.projectBrief}`,
      ...(selectedCategory === "localization"
        ? { sourceLang: formData.sourceLanguage, targetLang: formData.targetLanguage }
        : { dataType: formData.dataType, targetRegion: formData.targetRegion, collectionTool: formData.collectionTool }),
    };

    try {
      await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      saveSubmission(payload);
    } catch {
      saveSubmission(payload);
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  };

  const handleWhatsAppQuickTrack = () => {
    const text = encodeURIComponent(
      `Hello ${SITE_CONFIG.name}! I requested a quote for:\n• Service: ${formData.service}\n• Scope: ${formData.volume}\n• Client: ${formData.fullName || "Client"}\n• Email: ${formData.email || "N/A"}`
    );
    window.open(`${SITE_CONFIG.contact.whatsappUrl}?text=${text}`, "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />

      {/* Header Banner */}
      <section className="bg-[#0000FF] text-white py-14 lg:py-20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.15] max-w-2xl mx-auto">
            Request a Project Quote
          </h1>
          <p className="mt-3 text-sm sm:text-base text-blue-100 max-w-xl mx-auto leading-relaxed">
            Specify your requirements below. Our dedicated project coordinator will evaluate your brief and email a competitive quote within minutes.
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
            <h2 className="text-3xl font-extrabold text-slate-900">Quote Request Received!</h2>
            <p className="text-slate-600 text-sm leading-relaxed max-w-md mx-auto">
              Thank you, <strong>{formData.fullName || "valued client"}</strong>. Your project brief for <strong>{formData.service}</strong> has been assigned to a language & AI coordinator.
            </p>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl max-w-md mx-auto text-left text-xs space-y-2">
              <div className="flex justify-between text-slate-500">
                <span>Category:</span>
                <strong className="text-slate-800">
                  {selectedCategory === "localization" ? "Localization Services" : "AI Data Services"}
                </strong>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Service:</span>
                <strong className="text-slate-800">{formData.service}</strong>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Volume / Scope:</span>
                <strong className="text-slate-800">{formData.volume}</strong>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                onClick={handleWhatsAppQuickTrack}
                className="px-6 py-3 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 flex items-center justify-center gap-2 shadow-sm"
              >
                <Phone className="w-4 h-4" />
                <span>Track on WhatsApp</span>
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
            {/* Category Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Select Service Category
              </label>
              <div className="grid grid-cols-2 gap-3 p-1.5 bg-slate-100 rounded-2xl">
                <button
                  type="button"
                  onClick={() => handleCategoryChange("localization")}
                  className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-2 ${
                    selectedCategory === "localization"
                      ? "bg-white text-blue-700 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Globe2 className="w-4 h-4 text-blue-600" />
                  <span>Localization Services</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleCategoryChange("ai-data")}
                  className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-2 ${
                    selectedCategory === "ai-data"
                      ? "bg-white text-blue-700 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Cpu className="w-4 h-4 text-blue-600" />
                  <span>AI Data Services</span>
                </button>
              </div>
            </div>

            {/* Step 1: Service Specific Inputs */}
            <div>
              <div className="flex items-center gap-2 pb-2 mb-4 border-b border-slate-100">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  {selectedCategory === "localization"
                    ? "Service Selection & Language Pairs"
                    : "AI Dataset Specification & Target Region"}
                </h3>
              </div>

              {selectedCategory === "localization" ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Service *
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-300 text-slate-800 font-semibold focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    >
                      {currentCatObj.services.map((s) => (
                        <option key={s.id} value={s.title}>
                          {s.title}
                        </option>
                      ))}
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
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      AI Data Service *
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-300 text-slate-800 font-semibold focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    >
                      {currentCatObj.services.map((s) => (
                        <option key={s.id} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Data / Multimedia Type *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.dataType}
                      onChange={(e) => setFormData({ ...formData, dataType: e.target.value })}
                      placeholder="e.g. Selfie images, video, speech audio"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Target Region (Free-Text) *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.targetRegion}
                      onChange={(e) => setFormData({ ...formData, targetRegion: e.target.value })}
                      placeholder="e.g. West Africa, Nairobi urban, etc."
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Step 2: Scope & Volume */}
            <div>
              <div className="flex items-center gap-2 pb-2 mb-4 border-b border-slate-100">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  Project Scope & Estimated Volume or Duration
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Estimated volume or duration *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.volume}
                    onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                    placeholder="e.g. 5,000 words, 100 audio hours, 2 weeks"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Target Completion Deadline
                  </label>
                  <input
                    type="text"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    placeholder="e.g. Within 48 hours, Next Friday, etc."
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Contact & Notes */}
            <div>
              <div className="flex items-center gap-2 pb-2 mb-4 border-b border-slate-100">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  Organization & Contact Details
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Amina Bello"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
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
                    placeholder="amina@organization.org"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Phone / WhatsApp (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+234..."
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Project Brief / Special Requirements
                </label>
                <textarea
                  rows={3}
                  value={formData.projectBrief}
                  onChange={(e) => setFormData({ ...formData, projectBrief: e.target.value })}
                  placeholder="Detail any technical requirements, tone guidelines, dialect specificities, or compliance standards..."
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none resize-none"
                />
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 px-6 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-md transition-all flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <span className="inline-block animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <>
                    <span>Send Quote</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </main>

      <Footer />
    </div>
  );
}
