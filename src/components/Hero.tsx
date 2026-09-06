"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Send,
  User,
  MessageSquare,
  ArrowLeftRight,
  Mail,
} from "lucide-react";
import { TwitterIcon, LinkedInIcon, FacebookIcon, WhatsAppIcon } from "@/components/Icons";

interface HeroProps {
  onOpenOrderModal: (serviceName?: string) => void;
}

export default function Hero({ onOpenOrderModal }: HeroProps) {
  return (
    <section
      id="home"
      className="relative w-full min-h-screen lg:h-[calc(100vh-68px)] lg:min-h-[680px] flex items-center justify-center overflow-hidden bg-[#00a896]"
    >
      {/* Background Africa Continent Map */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <Image
          src="/images/africa_hero.jpg"
          alt="Connecting Africa and the World Through Language"
          fill
          priority
          className="object-cover object-center opacity-85 brightness-100 contrast-105 blur-[3px] scale-105"
        />
        {/* Flat tint overlay */}
        <div className="absolute inset-0 bg-[#00a896]/40 pointer-events-none" />
      </div>

      {/* Floating 3D Language Icon Cards (Matching Exact Screenshot Placement) */}
      
      {/* 1. Upper Right: "A" Latin Glyph Card */}
      <div className="absolute top-12 sm:top-16 right-8 sm:right-20 lg:right-32 z-20 pointer-events-none">
        <div className="w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-3xl bg-[#00b4a0] shadow-2xl border border-white/20 flex items-center justify-center animate-float">
          <span className="font-extrabold text-4xl sm:text-6xl lg:text-7xl text-white select-none">
            A
          </span>
        </div>
      </div>

      {/* 2. Lower Left: "文" Multilingual Glyph Card */}
      <div className="absolute bottom-16 sm:bottom-20 left-6 sm:left-24 lg:left-44 z-20 pointer-events-none">
        <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-3xl bg-[#00b4a0] shadow-2xl border border-white/20 flex items-center justify-center animate-float-delayed">
          <span className="font-extrabold text-4xl sm:text-6xl lg:text-7xl text-white select-none">
            文
          </span>
        </div>
      </div>

      {/* 3. Upper Left: Directional Arrow Badge */}
      <div className="absolute top-36 sm:top-40 left-4 sm:left-14 lg:left-24 z-20 pointer-events-none hidden sm:block">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#00b4a0] shadow-xl border border-white/20 flex items-center justify-center animate-float">
          <ArrowLeftRight className="w-8 h-8 sm:w-10 sm:h-10 text-white stroke-[2.5]" />
        </div>
      </div>

      {/* 4. Lower Right: Speech / Chat Message Bubble Card */}
      <div className="absolute bottom-20 sm:bottom-28 right-8 sm:right-24 lg:right-40 z-20 pointer-events-none">
        <div className="w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-3xl bg-[#00b4a0] shadow-2xl border border-white/20 flex items-center justify-center animate-float-delayed">
          <MessageSquare className="w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-white fill-white/20 stroke-[2]" />
        </div>
      </div>

      {/* Main Hero Center Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-30 w-full flex flex-col items-center sm:items-start text-center sm:text-left">
        
        {/* Welcome Tag with Green Line Accent */}
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <span className="w-10 sm:w-14 h-1 bg-[#10b981] rounded-full" />
          <span className="text-sm sm:text-base font-semibold text-white tracking-wide">
            Welcome to FYTLOCALIZATION
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.12] mb-8 max-w-4xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]">
          Connecting The World Through Language
        </h1>

        {/* Sub-description */}
        <p className="text-sm sm:text-base md:text-lg text-white max-w-2xl leading-relaxed mb-8 font-medium drop-shadow-[0_1px_6px_rgba(0,0,0,0.3)]">
          Professional translation, AI localization, real-time conference interpretation, audio transcription, and synchronized subtitling across 100+ African & global languages.
        </p>

        {/* Dual Action Buttons Matching the Exact Pattern */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mb-14">
          
          {/* GET STARTED Button (Solid Royal Blue) */}
          <button
            onClick={() => onOpenOrderModal("General Translation")}
            className="group inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white bg-blue-700 hover:bg-blue-800 rounded-xl shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
          >
            <span>GET STARTED</span>
            <Send className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          {/* GET A QUOTE Button (Solid Crisp White Card with Icon) */}
          <a
            href="#calculator"
            className="group inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-blue-700 hover:text-blue-800 bg-white hover:bg-slate-50 rounded-xl shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
          >
            <span>GET A QUOTE</span>
            <User className="w-4 h-4 text-blue-700 group-hover:scale-110 transition-transform" />
          </a>
        </div>

        {/* Social Icons Floating Cluster (Matching Screenshot Lower Left Position) */}
        <div className="flex items-center gap-3 pt-2">
          <a
            href="https://x.com/fytlocalization"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-[#00a8e8] text-white flex items-center justify-center hover:scale-110 shadow-lg transition-all"
            title="Twitter / X"
            aria-label="Twitter"
          >
            <TwitterIcon className="w-4 h-4" />
          </a>

          <a
            href="https://wa.me/message/OIYPQ375X3HKP1"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-[#25d366] text-white flex items-center justify-center hover:scale-110 shadow-lg transition-all"
            title="WhatsApp Live Desk"
            aria-label="WhatsApp"
          >
            <WhatsAppIcon className="w-4 h-4" />
          </a>

          <a
            href="https://www.linkedin.com/company/fytlocalization/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-[#0077b5] text-white flex items-center justify-center hover:scale-110 shadow-lg transition-all"
            title="LinkedIn"
            aria-label="LinkedIn"
          >
            <LinkedInIcon className="w-4 h-4" />
          </a>

          <a
            href="mailto:support@fytlocalization.com"
            className="w-10 h-10 rounded-full bg-[#52616b] text-white flex items-center justify-center hover:scale-110 shadow-lg transition-all"
            title="Email Support"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </a>

          <a
            href="https://www.facebook.com/people/Fytlocalization/61583295960480/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-[#1877f2] text-white flex items-center justify-center hover:scale-110 shadow-lg transition-all"
            title="Facebook"
            aria-label="Facebook"
          >
            <FacebookIcon className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
