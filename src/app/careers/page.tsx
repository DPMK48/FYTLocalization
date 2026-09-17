"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Users, Sparkles, ArrowRight, CheckCircle2, Globe2 } from "lucide-react";

export default function CareersPage() {
  const roles = [
    {
      title: "Native African Languages Translator (Hausa, Swahili, Yoruba, Igbo)",
      type: "Freelance / Remote",
      location: "Pan-Africa & Global",
      description: "Translate legal, technical, fintech, and public sector content with high cultural fidelity.",
      skills: ["Translation", "Dual Review", "CAT Tools"],
    },
    {
      title: "AI Speech & Acoustic Data Annotator",
      type: "Contract / Sprint Based",
      location: "Remote",
      description: "Transcribe and annotate speech corpora for AI voice assistants, identifying regional accents and tone.",
      skills: ["RLHF", "Audio Annotation", "ASR"],
    },
    {
      title: "Simultaneous Conference Interpreter (French ↔ English ↔ Arabic)",
      type: "Live Event / RSI",
      location: "Hybrid / Zoom RSI",
      description: "Deliver real-time booth interpretation for international conferences and corporate summits.",
      skills: ["Simultaneous", "RSI", "Diplomatic Protocol"],
    },
    {
      title: "Video Subtitle Specialist & SDH Captioner",
      type: "Freelance / Remote",
      location: "Remote",
      description: "Craft frame-accurate SRT/VTT multilingual captions and closed captions for film and streaming.",
      skills: ["SRT/VTT", "Timing", "SDH"],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />

      <header className="bg-[#003cd6] text-white py-14 lg:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Users className="w-3.5 h-3.5" />
            Join Our Freelancer & Linguist Network
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.15] max-w-2xl">
            Linguist Opportunities at FYTLOCALIZATION
          </h1>
          <p className="mt-3 text-sm sm:text-base text-blue-100 max-w-xl leading-relaxed">
            We are always onboarding talented native translators, conference interpreters, audio transcribers, and AI localization specialists.
          </p>
        </div>
      </header>

      <main className="flex-1 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Current Open Positions</h2>
            <p className="text-xs text-slate-500 mt-1">Flexible remote assignments with transparent, timely payouts.</p>
          </div>
          <Link
            href="/register"
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20"
          >
            Apply Directly as Linguist
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roles.map((role, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700">
                    {role.type}
                  </span>
                  <span className="text-xs text-slate-400">{role.location}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900">{role.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{role.description}</p>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {role.skills.map((s, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-600">Active Recruitment</span>
                <Link
                  href="/register"
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
