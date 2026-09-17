"use client";

import React from "react";
import {
  Clock,
  Users,
  Award,
  Zap,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

interface WhyChooseUsProps {
  onOpenOrderModal: () => void;
}

export default function WhyChooseUs({ onOpenOrderModal }: WhyChooseUsProps) {
  const pillars = [
    {
      icon: Clock,
      title: "Fast Turnaround",
      subtitle: "Fast Delivery",
      description: "Prompt, deadline-driven delivery with 12–24h express turnaround.",
      highlight: "< 24h Express Available",
      topBorder: "bg-blue-600",
      accentBg: "bg-blue-50 text-blue-600 border-blue-200",
    },
    {
      icon: Users,
      title: "Professional Freelancers",
      subtitle: "Native Specialists",
      description: "Vetted native linguists covering over 100+ language pairs.",
      highlight: "100+ Native Linguists",
      topBorder: "bg-teal-500",
      accentBg: "bg-teal-50 text-teal-700 border-teal-200",
    },
    {
      icon: Award,
      title: "Customer Satisfaction",
      subtitle: "Guaranteed Quality",
      description: "Rigorous multi-stage quality assurance and verified accuracy.",
      highlight: "100% Guaranteed QA",
      topBorder: "bg-indigo-600",
      accentBg: "bg-indigo-50 text-indigo-700 border-indigo-200",
    },
  ];

  const valuePoints = [
    "Native cultural adaptation",
    "Confidentiality & NDA protection",
    "Transparent flat rates",
    "Dedicated project coordinator",
  ];

  return (
    <section id="why-choose" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 border-l-4 border-blue-600 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                Why Choose FYTLOCALIZATION?
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Professional Services At{" "}
              <span className="text-blue-600">Affordable Prices.</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Tailored language solutions bridging communication worldwide with accuracy, speed, and cultural precision.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start md:items-end gap-4 shrink-0">
            <button
              onClick={onOpenOrderModal}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md transition-all"
            >
              <span>ABOUT US & WORKFLOW</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3 Pillar Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="group relative bg-slate-50 hover:bg-white rounded-2xl p-8 border border-slate-200 hover:border-blue-400 shadow-xs hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
              >
                {/* Top accent line */}
                <div
                  className={`absolute top-0 left-8 right-8 h-1 rounded-t-2xl ${pillar.topBorder} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-14 h-14 rounded-2xl ${pillar.accentBg} flex items-center justify-center border shadow-xs group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200 group-hover:border-blue-200 group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors">
                      0{idx + 1}
                    </span>
                  </div>

                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-1">
                    {pillar.subtitle}
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-teal-600" />
                    {pillar.highlight}
                  </span>
                  <span className="text-xs font-bold text-blue-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all flex items-center gap-1">
                    Explore <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Value Points Trust Banner (Sage / Emerald Green Matching Website Accent) */}
        <div className="bg-[#5ba878] rounded-2xl p-6 sm:p-8 text-white shadow-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {valuePoints.map((point) => (
              <div key={point} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center shrink-0 mt-0.5 border border-white/40">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-xs sm:text-sm text-white font-medium leading-snug">
                  {point}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
