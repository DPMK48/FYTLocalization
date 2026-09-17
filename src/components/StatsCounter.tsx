"use client";

import React from "react";
import { ArrowRight, Globe, Users, FolderCheck, Clock } from "lucide-react";

interface StatsCounterProps {
  onOpenOrderModal: () => void;
}

export default function StatsCounter({ onOpenOrderModal }: StatsCounterProps) {
  return (
    <section className="py-20 lg:py-28 bg-[#003cd6] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading & Description (Exact match) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-10 h-0.5 bg-white" />
              <span className="text-xs font-bold uppercase tracking-wider text-white/90">
                Experience
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.18]">
              Professional Translation Services
            </h2>

            <p className="text-sm sm:text-base text-blue-100 leading-relaxed max-w-xl">
              Certified specialists delivering high-accuracy translation, interpretation, and transcription worldwide.
            </p>

            <div className="pt-2">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white bg-blue-800 hover:bg-blue-900 border-2 border-white/80 rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                <span>CONTACT US TODAY</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: White Metric Stat Cards (Projects and Freelancers) */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 text-center text-slate-800 shadow-2xl border border-blue-100 flex flex-col items-center justify-center">
              <span className="text-4xl sm:text-5xl font-extrabold text-blue-700 font-mono mb-2">
                +120
              </span>
              <span className="text-sm sm:text-base font-bold text-slate-700">
                Projects
              </span>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 text-center text-slate-800 shadow-2xl border border-blue-100 flex flex-col items-center justify-center">
              <span className="text-4xl sm:text-5xl font-extrabold text-blue-700 font-mono mb-2">
                +17
              </span>
              <span className="text-sm sm:text-base font-bold text-slate-700">
                Freelancers
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
