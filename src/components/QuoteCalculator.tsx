"use client";

import React, { useState, useMemo } from "react";
import {
  Calculator,
  ArrowRight,
  Clock,
  Sparkles,
  CheckCircle2,
  FileText,
  HelpCircle,
  Phone,
} from "lucide-react";

interface QuoteCalculatorProps {
  onOpenOrderModal: (serviceDetails?: string) => void;
}

export default function QuoteCalculator({ onOpenOrderModal }: QuoteCalculatorProps) {
  const [serviceType, setServiceType] = useState("translation");
  const [sourceLang, setSourceLang] = useState("English");
  const [targetLang, setTargetLang] = useState("French");
  const [units, setUnits] = useState(1500); // words or minutes
  const [speed, setSpeed] = useState("standard"); // standard, rush, express

  const languagesList = [
    "English",
    "French",
    "Hausa",
    "Yorùbá",
    "Kiswahili",
    "Arabic",
    "Igbo",
    "Amharic",
    "Portuguese",
    "Spanish",
    "German",
    "Zulu",
    "Somali",
    "Oromo",
    "Wolof",
    "Fula (Fulani)",
  ];

  const calculation = useMemo(() => {
    let ratePerUnit = 0.08; // default $0.08 per word
    let unitLabel = "words";
    let baseTimeHours = 24;

    if (serviceType === "translation") {
      ratePerUnit = 0.08;
      unitLabel = "words";
      baseTimeHours = Math.max(12, Math.ceil((units / 2000) * 24));
    } else if (serviceType === "transcription") {
      ratePerUnit = 1.25; // per audio minute
      unitLabel = "audio mins";
      baseTimeHours = Math.max(8, Math.ceil((units / 60) * 12));
    } else if (serviceType === "subtitle") {
      ratePerUnit = 2.5; // per video minute
      unitLabel = "video mins";
      baseTimeHours = Math.max(12, Math.ceil((units / 30) * 24));
    } else if (serviceType === "interpretation") {
      ratePerUnit = 45.0; // per hour
      unitLabel = "hours";
      baseTimeHours = 0; // live event
    } else if (serviceType === "localization") {
      ratePerUnit = 0.06; // per word MTPE + post-edit
      unitLabel = "words";
      baseTimeHours = Math.max(12, Math.ceil((units / 3000) * 24));
    }

    let speedMultiplier = 1.0;
    let deliveryLabel = `${baseTimeHours} Hours`;

    if (speed === "rush") {
      speedMultiplier = 1.25;
      deliveryLabel = `${Math.max(12, Math.round(baseTimeHours * 0.6))} Hours (Rush)`;
    } else if (speed === "express") {
      speedMultiplier = 1.5;
      deliveryLabel = `${Math.max(6, Math.round(baseTimeHours * 0.4))} Hours (Express)`;
    } else {
      deliveryLabel = `${baseTimeHours} Hours (Standard SLA)`;
    }

    const estimatedTotal = Math.max(15, Math.round(units * ratePerUnit * speedMultiplier));

    return {
      estimatedTotal,
      unitLabel,
      deliveryLabel,
      ratePerUnit,
    };
  }, [serviceType, units, speed]);

  const handleApplyQuote = () => {
    const summary = `${serviceType.toUpperCase()} (${sourceLang} → ${targetLang}) - ${units} ${calculation.unitLabel} [Est: $${calculation.estimatedTotal}]`;
    onOpenOrderModal(summary);
  };

  return (
    <section id="calculator" className="py-20 lg:py-24 bg-slate-50 relative overflow-hidden">
      {/* Background Subtle Shapes */}
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/80 border border-blue-200 mb-3">
            <Calculator className="w-3.5 h-3.5 text-blue-700" />
            <span className="text-xs font-bold uppercase tracking-wider text-blue-800">
              Transparent Pricing & Estimator
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Calculate Your <span className="text-blue-600">Project Quote</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Get instant, upfront estimates for translation, audio transcription, or media subtitling with zero hidden fees.
          </p>
        </div>

        {/* Interactive Calculator Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl shadow-slate-900/5 border border-slate-200/90 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Form Column */}
            <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
              {/* Service Type Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  1. Select Service Type
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: "translation", label: "Translation" },
                    { id: "transcription", label: "Transcription" },
                    { id: "subtitle", label: "Subtitles" },
                    { id: "localization", label: "AI Localization" },
                    { id: "interpretation", label: "Interpretation" },
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => {
                        setServiceType(s.id);
                        if (s.id === "transcription" || s.id === "subtitle") {
                          setUnits(30);
                        } else if (s.id === "interpretation") {
                          setUnits(4);
                        } else {
                          setUnits(1500);
                        }
                      }}
                      className={`px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                        serviceType === s.id
                          ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Language Pair Selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Source Language
                  </label>
                  <select
                    value={sourceLang}
                    onChange={(e) => setSourceLang(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm font-medium bg-slate-50 border border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    {languagesList.map((lang) => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Target Language
                  </label>
                  <select
                    value={targetLang}
                    onChange={(e) => setTargetLang(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm font-medium bg-slate-50 border border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    {languagesList.map((lang) => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Units Input & Range Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Volume / Quantity ({calculation.unitLabel})
                  </label>
                  <span className="text-sm font-extrabold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
                    {units.toLocaleString()} {calculation.unitLabel}
                  </span>
                </div>
                <input
                  type="range"
                  min={
                    serviceType === "interpretation"
                      ? 1
                      : serviceType === "transcription" || serviceType === "subtitle"
                      ? 5
                      : 100
                  }
                  max={
                    serviceType === "interpretation"
                      ? 40
                      : serviceType === "transcription" || serviceType === "subtitle"
                      ? 300
                      : 25000
                  }
                  step={
                    serviceType === "interpretation"
                      ? 1
                      : serviceType === "transcription" || serviceType === "subtitle"
                      ? 5
                      : 100
                  }
                  value={units}
                  onChange={(e) => setUnits(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              {/* Urgency SLA Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Delivery Speed / SLA
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "standard", label: "Standard", desc: "Best value" },
                    { id: "rush", label: "Rush +25%", desc: "Faster delivery" },
                    { id: "express", label: "Express +50%", desc: "Priority queue" },
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSpeed(s.id)}
                      className={`p-2.5 rounded-xl text-center border text-xs font-semibold transition-all ${
                        speed === s.id
                          ? "bg-blue-50 text-blue-700 border-blue-400 shadow-xs"
                          : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      <div className="font-bold">{s.label}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{s.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results & CTA Column */}
            <div className="lg:col-span-5 bg-slate-900 p-6 sm:p-8 text-white flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-800">
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
                    Live Calculation
                  </span>
                  <span className="text-[11px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                    Instant Quote
                  </span>
                </div>

                {/* Big Estimated Price */}
                <div className="mb-6">
                  <span className="text-xs text-slate-400 block mb-1">Estimated Total</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-extrabold text-white">
                      ${calculation.estimatedTotal}
                    </span>
                    <span className="text-xs text-slate-400">USD</span>
                  </div>
                  <p className="text-[11px] text-teal-300 mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-teal-400" />
                    Includes Native Human Review & QA
                  </p>
                </div>

                {/* Summary Specs */}
                <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700 space-y-2.5 text-xs text-slate-300 mb-6">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Service:</span>
                    <span className="font-semibold text-white capitalize">{serviceType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Pair:</span>
                    <span className="font-semibold text-white">
                      {sourceLang} → {targetLang}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Scope:</span>
                    <span className="font-semibold text-white">
                      {units.toLocaleString()} {calculation.unitLabel}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-slate-700">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-teal-400" />
                      Delivery:
                    </span>
                    <span className="font-bold text-teal-300">{calculation.deliveryLabel}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleApplyQuote}
                  className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <span>Submit & Place Order</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={`https://wa.me/message/OIYPQ375X3HKP1?text=${encodeURIComponent(
                    `Hello FYTLOCALIZATION, I would like to order ${serviceType.toUpperCase()} for ${units} ${
                      calculation.unitLabel
                    } (${sourceLang} to ${targetLang}). Estimated: $${calculation.estimatedTotal}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Send Quote to WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
