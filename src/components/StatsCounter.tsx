"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Globe, Users, FolderCheck, MapPin } from "lucide-react";

interface StatsCounterProps {
  onOpenOrderModal: () => void;
}

export default function StatsCounter({ onOpenOrderModal }: StatsCounterProps) {
  return (
    <section className="py-20 lg:py-28 bg-[#0000FF] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: 6.1 Updated Heading & Supporting Paragraph */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-10 h-0.5 bg-white" />
              <span className="text-xs font-bold uppercase tracking-wider text-white/90">
                Proven Track Record
              </span>
            </div>

            {/* 6.1: Heading changed to "Professional Localization and AI Services" */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.18]">
              Professional Localization and AI Services
            </h2>

            {/* 6.1: Supporting paragraph covering both localization and AI data work */}
            <p className="text-sm sm:text-base text-blue-100 leading-relaxed max-w-xl">
              Certified native linguists and field data collectors delivering enterprise-grade translation, interpretation, multi-speaker transcription, and rich speech and multimedia datasets for global artificial intelligence models.
            </p>

            <div className="pt-2">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#0000FF] bg-white hover:bg-slate-100 rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                <span>CONTACT US TODAY</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: 6.2 Consistent Metric Stat Cards (3 cards: 120+, 500+, 20+) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Card 1: 120+ Projects */}
            <div className="bg-white rounded-2xl p-6 text-center text-slate-800 shadow-xl border border-blue-100 flex flex-col items-center justify-center transform hover:-translate-y-1 transition-transform">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                <FolderCheck className="w-5 h-5" />
              </div>
              <span className="text-3xl sm:text-4xl font-extrabold text-blue-700 font-mono mb-1">
                120+
              </span>
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Projects Completed
              </span>
            </div>

            {/* Card 2: 1,200+ Freelancers & Contributors */}
            <div className="bg-white rounded-2xl p-6 text-center text-slate-800 shadow-xl border border-blue-100 flex flex-col items-center justify-center transform hover:-translate-y-1 transition-transform">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-3xl sm:text-4xl font-extrabold text-blue-700 font-mono mb-1">
                1,200+
              </span>
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Freelancers & Contributors Across Africa
              </span>
            </div>

            {/* Card 3: 20+ African Countries */}
            <div className="bg-white rounded-2xl p-6 text-center text-slate-800 shadow-xl border border-blue-100 flex flex-col items-center justify-center transform hover:-translate-y-1 transition-transform">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-3xl sm:text-4xl font-extrabold text-blue-700 font-mono mb-1">
                20+
              </span>
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                African Countries
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
