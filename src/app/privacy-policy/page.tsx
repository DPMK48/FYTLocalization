"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShieldCheck, Lock, FileText, CheckCircle2 } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />

      <header className="bg-[#003cd6] text-white py-14 lg:py-20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Lock className="w-3.5 h-3.5" />
            Security & Data Protection
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-blue-100">
            Last updated: September 2026 • FYTLOCALIZATION Global Privacy Standard
          </p>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-slate-200 shadow-sm space-y-8 text-sm text-slate-700 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">1. Overview & Commitment</h2>
            <p>
              At FYTLOCALIZATION, protecting client confidentiality and personal data is central to our business. This policy explains how we collect, process, and safeguard information submitted via our translation quote calculators, booking forms, and member network.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">2. Document Confidentiality & Non-Disclosure (NDA)</h2>
            <p>
              All client documents, audio files, video transcripts, and AI training datasets uploaded to FYTLOCALIZATION are held under strict non-disclosure terms. Only vetted native linguists assigned to your specific project are granted access, under binding confidentiality agreements.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">3. Information We Collect</h2>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li>Contact details: Name, business email address, phone/WhatsApp number.</li>
              <li>Project details: Language pairs, source files, deadlines, and scope.</li>
              <li>Member registration: Linguist credentials, CV/portfolio, native dialects, and payout details.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">4. Data Retention & Deletion</h2>
            <p>
              Source files are permanently deleted from working storage 30 days after project delivery unless enterprise clients request immediate purge or longer contractual retention for translation memory maintenance.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">5. Contact Data Protection Officer</h2>
            <p>
              For inquiries regarding data privacy or NDAs, reach out directly to our privacy officer at{" "}
              <a href="mailto:support@fytlocalization.com" className="text-blue-600 font-semibold underline">
                support@fytlocalization.com
              </a>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
