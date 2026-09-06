"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, Clock, CheckCircle2 } from "lucide-react";

interface ServicesSectionProps {
  onOpenOrderModal: (serviceName?: string) => void;
}

export default function ServicesSection({ onOpenOrderModal }: ServicesSectionProps) {
  const [activeFilter, setActiveFilter] = useState("all");

  const services = [
    {
      id: "interpretation",
      category: "voice",
      title: "INTERPRETATION",
      image: "/images/interpretation.jpg",
      description:
        "Professional interpretation services for meetings, conferences, and events. Our interpreters facilitate seamless communication in real-time.",
      features: ["Simultaneous & Consecutive", "On-site & Remote RSI", "Certified Native Interpreters"],
      turnaround: "Live / Scheduled",
    },
    {
      id: "translation",
      category: "document",
      title: "TRANSLATION",
      image: "/images/translation.jpg",
      description:
        "Accurate and culturally sensitive translations in over 100 languages. Our expert translators ensure your message resonates with your target audience.",
      features: ["Document & Legal Localization", "100+ African & Global Pairs", "Certified Stamp/QA"],
      turnaround: "24–48 Hours",
    },
    {
      id: "localization",
      category: "tech",
      title: "LOCALIZATION/AI SERVICES",
      image: "/images/localization.jpg",
      description:
        "We offer personalized solutions for unique project needs, our team is here to deliver exactly what you need with human-augmented AI workflows.",
      features: ["Website & App UI Localization", "MTPE Quality Review", "Custom Terminology"],
      turnaround: "Sprint Based",
    },
    {
      id: "transcription",
      category: "audio",
      title: "TRANSCRIPTION",
      image: "/images/transcription.jpg",
      description:
        "Fast and reliable transcription services for audio and video content. We deliver precise transcriptions that capture every detail.",
      features: ["Speaker Diarization", "Time-stamped Transcripts", "Regional Dialect Accuracy"],
      turnaround: "12–24 Hours",
    },
    {
      id: "subtitle",
      category: "media",
      title: "SUBTITLE",
      image: "/images/subtitle.jpg",
      description:
        "High-quality subtitle services for films, videos, and online content. We provide clear and synchronized subtitles to enhance viewer experience.",
      features: ["Frame-accurate SRT & VTT", "SDH Captions for Hearing", "Multilingual Subtitling"],
      turnaround: "24–48 Hours",
    },
  ];

  const filterTabs = [
    { id: "all", label: "All Services" },
    { id: "document", label: "Translation" },
    { id: "voice", label: "Interpretation" },
    { id: "tech", label: "Localization/AI" },
    { id: "audio", label: "Transcription" },
    { id: "media", label: "Subtitle" },
  ];

  const filteredServices =
    activeFilter === "all"
      ? services
      : services.filter((s) => s.category === activeFilter);

  // Top 2 cards (Interpretation, Translation)
  const topServices = filteredServices.slice(0, 2);
  // Remaining cards (Localization, Transcription, Subtitle)
  const bottomServices = filteredServices.slice(2);

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#003cd6] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header & First 2 Cards Grid (Matching Exact Pattern in Screenshot) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
          
          {/* Left: Section Title */}
          <div className="lg:col-span-4 flex flex-col justify-center pt-2">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-0.5 bg-white" />
              <span className="text-xs font-bold uppercase tracking-wider text-white/90">
                OUR WORK
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] mb-6">
              Professional Translation Services For Your Industry
            </h2>
            <p className="text-sm sm:text-base text-blue-100 leading-relaxed mb-6">
              Accurate, culturally authentic linguistic solutions tailored for enterprises, media houses, governments, and NGOs across Africa and worldwide.
            </p>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {filterTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeFilter === tab.id
                      ? "bg-white text-blue-700 shadow-md"
                      : "bg-blue-800/60 text-white hover:bg-blue-800 border border-blue-400/30"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Top 2 Service Cards (Interpretation & Translation) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {topServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl p-5 sm:p-6 text-slate-800 shadow-xl border border-blue-100 flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  {/* Photo Container with padding/border */}
                  <div className="relative h-48 w-full rounded-xl overflow-hidden mb-5 bg-slate-100 border border-slate-200">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold bg-[#003cd6] text-white flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {service.turnaround}
                    </span>
                  </div>

                  {/* Title with Vertical Blue Accent Line (Exact match) */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-1.5 h-6 bg-[#003cd6] rounded-full" />
                    <h3 className="text-lg font-extrabold text-blue-700 tracking-wide">
                      {service.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                {/* ORDER NOW Button (Clean white card button with blue text / outline) */}
                <button
                  onClick={() => onOpenOrderModal(service.title)}
                  className="w-full py-2.5 px-4 rounded-lg text-xs font-extrabold uppercase tracking-wider text-blue-700 hover:text-white bg-white hover:bg-[#003cd6] border-2 border-blue-600 transition-all text-center flex items-center justify-center gap-2 group-hover:shadow-md"
                >
                  <span>ORDER NOW</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Row: 3 Service Cards (Localization, Transcription, Subtitle) */}
        {bottomServices.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bottomServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl p-5 sm:p-6 text-slate-800 shadow-xl border border-blue-100 flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  {/* Photo Container */}
                  <div className="relative h-44 w-full rounded-xl overflow-hidden mb-5 bg-slate-100 border border-slate-200">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold bg-[#003cd6] text-white flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {service.turnaround}
                    </span>
                  </div>

                  {/* Title with Vertical Blue Accent Line */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-1.5 h-6 bg-[#003cd6] rounded-full" />
                    <h3 className="text-base sm:text-lg font-extrabold text-blue-700 tracking-wide">
                      {service.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                {/* ORDER NOW Button */}
                <button
                  onClick={() => onOpenOrderModal(service.title)}
                  className="w-full py-2.5 px-4 rounded-lg text-xs font-extrabold uppercase tracking-wider text-blue-700 hover:text-white bg-white hover:bg-[#003cd6] border-2 border-blue-600 transition-all text-center flex items-center justify-center gap-2 group-hover:shadow-md"
                >
                  <span>ORDER NOW</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
