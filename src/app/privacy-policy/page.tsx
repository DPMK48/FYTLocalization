"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShieldCheck, Lock, FileText, CheckCircle2 } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />

      <header className="bg-[#0000FF] text-white py-14 lg:py-20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-white/90">
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
            <h2 className="text-lg font-bold text-slate-900">5. Regulatory Compliance & Data Protection Governance</h2>
            <div className="space-y-2 text-xs sm:text-sm">
              <p>
                <strong>Corporate Affairs Commission (CAC):</strong> FYTLOCALIZATION operates as a fully registered, verified corporate entity in the Federal Republic of Nigeria, compliant with all corporate and statutory regulations.
              </p>
              <p>
                <strong>Nigeria Data Protection Commission (NDPC):</strong> We are officially licensed and compliant with the data processing directives mandated by the NDPC.
              </p>
              <p>
                <strong>NDPA & GDPR Alignment:</strong> All speech corpora, multimedia datasets, linguistic assets, and participant information collected by FYTLOCALIZATION strictly adhere to the Nigeria Data Protection Act (NDPA 2023) and European Union General Data Protection Regulation (GDPR) guidelines on informed consent, anonymization, and subject rights.
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">6. Contact Data Protection Officer</h2>
            <p>
              For inquiries regarding data privacy or NDAs, reach out directly to our privacy officer at{" "}
              <a href="mailto:admin@fytlocalization.com" className="text-blue-600 font-semibold underline">
                admin@fytlocalization.com
              </a>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
