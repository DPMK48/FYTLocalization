"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText, CheckCircle2, AlertCircle } from "lucide-react";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />

      <header className="bg-[#003cd6] text-white py-14 lg:py-20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <FileText className="w-3.5 h-3.5" />
            Terms of Service
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Terms & Conditions
          </h1>
          <p className="mt-2 text-sm text-blue-100">
            Terms governing language services, translation delivery, and client engagement.
          </p>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-slate-200 shadow-sm space-y-8 text-sm text-slate-700 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">1. Quotations & Project Engagement</h2>
            <p>
              Quotes provided via the FYTLOCALIZATION website, calculator, or email are binding upon written acceptance or project deposit. Turnaround times commence once clear source files and instructions are confirmed.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">2. Quality Assurance & Revisions</h2>
            <p>
              All deliverables undergo dual native-speaker review. If any linguistic error, typographical inaccuracy, or terminology mismatch is identified, FYT provides complimentary revisions within 14 calendar days of delivery.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">3. Intellectual Property Rights</h2>
            <p>
              Clients retain 100% intellectual property and copyright ownership over all source texts and completed translations, subtitle files, and speech transcripts upon settlement of invoice.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">4. Cancellation & Rescheduling</h2>
            <p>
              For conference interpretation, cancellations within 48 hours of scheduled live sessions may be subject to a 50% reservation cancellation fee to compensate booked interpreters.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
