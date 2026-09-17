"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OrderModal from "@/components/OrderModal";
import {
  Globe2,
  ShieldCheck,
  Award,
  Sparkles,
  Users,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export default function AboutUsPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar onOpenOrderModal={() => setModalOpen(true)} />

      {/* Hero */}
      <section className="bg-[#003cd6] text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Our Mission & Heritage
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-3xl leading-[1.12]">
            Connecting The World Through Culturally Authentic Language
          </h1>
          <p className="mt-4 text-base sm:text-lg text-blue-100 max-w-2xl leading-relaxed">
            At FYTLOCALIZATION, we bridge gaps and connect people across the globe through the power of language, AI localization, and human nuance.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-16">
        
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
              <Globe2 className="w-4 h-4" />
              <span>The FYT Vision</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
              Why We Started: Bridging Africa&apos;s Linguistic Transparency Gap
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Africa is the most linguistically diverse continent on earth, with over 2,000 languages. Yet modern technology, global platforms, and corporate communications have historically treated this diversity as a barrier rather than a superpower.
            </p>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              FYTLOCALIZATION was founded to change this. We provide enterprise-grade translation, interpretation, speech transcription, subtitling, and AI dataset curation that respects the rhythm, tone, and lived context of African and global speakers.
            </p>
          </div>

          <div className="lg:col-span-6 relative h-80 sm:h-96 rounded-3xl overflow-hidden shadow-xl border border-slate-200">
            <Image
              src="/images/africa_hero.jpg"
              alt="FYT Localization African Reach"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* 3 Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Native Linguist Quality</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Every project is handled by verified native speakers with deep cultural immersion, ensuring that tone and regional slang never get lost in translation.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Human-in-the-Loop AI</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We empower machine translation and large language models with accurate speech data, RLHF annotation, and post-editing by real human experts.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Speed & Reliability</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Fast turnarounds with strict 24/7 coordination desks and dedicated WhatsApp support ensure deadlines are consistently met.
            </p>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#003cd6] text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold">Ready to take your message global?</h3>
            <p className="text-sm text-blue-100 mt-1">
              Contact our linguistic coordinators or get an instant quote today.
            </p>
          </div>
          <Link
            href="/fytlocalization-service"
            className="px-8 py-4 rounded-xl text-xs font-extrabold uppercase tracking-wider bg-white hover:bg-blue-50 text-blue-900 shadow-sm whitespace-nowrap"
          >
            Book Now
          </Link>
        </div>

      </main>

      <Footer onOpenOrderModal={() => setModalOpen(true)} />

      <OrderModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
