"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TwitterIcon, LinkedInIcon, FacebookIcon, WhatsAppIcon } from "@/components/Icons";

interface HeroProps {
  onOpenOrderModal: (serviceName?: string) => void;
}

export default function Hero({ onOpenOrderModal }: HeroProps) {

  return (
    <section
      id="home"
      className="relative w-full min-h-[640px] flex items-center justify-center overflow-hidden bg-[#003cd6]"
    >
      {/* Background Africa Continent Map with solid blue overlay */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <Image
          src="/images/africa_hero.jpg"
          alt="Connecting Africa and the World Through Language"
          fill
          priority
          className="object-cover object-center opacity-30 brightness-95 contrast-110"
        />
        <div className="absolute inset-0 bg-[#003cd6]/80 pointer-events-none" />
      </div>

      {/* Main Hero Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 w-full flex flex-col items-center sm:items-start text-center sm:text-left">
        
        {/* Welcome Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold mb-4 border border-white/20">
          <span>Welcome to FYTLOCALIZATION</span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-5 max-w-3xl">
          Connecting The World Through Language
        </h1>

        {/* Concise Description */}
        <p className="text-base sm:text-lg text-blue-100 max-w-2xl leading-relaxed mb-6 font-normal">
          Professional translation, conference interpretation, AI localization, audio transcription, and subtitling in 100+ African and global languages.
        </p>

        {/* Dual Actions: BOOK NOW & CONTACT US */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mb-10">
          <button
            onClick={() => onOpenOrderModal("General Translation")}
            className="inline-flex items-center gap-2 px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-900 bg-white hover:bg-blue-50 rounded-lg shadow-sm transition-colors whitespace-nowrap"
          >
            <span>BOOK NOW</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <Link
            href="/contact-us"
            className="inline-flex items-center gap-2 px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white hover:bg-white/10 border border-white/40 rounded-lg transition-colors whitespace-nowrap"
          >
            <span>CONTACT US</span>
          </Link>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-3">
          <a
            href="https://x.com/fytlocalization"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            title="Twitter / X"
            aria-label="Twitter"
          >
            <TwitterIcon className="w-4 h-4" />
          </a>

          <a
            href="https://wa.me/message/OIYPQ375X3HKP1"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            title="WhatsApp Live Desk"
            aria-label="WhatsApp"
          >
            <WhatsAppIcon className="w-4 h-4" />
          </a>

          <a
            href="https://www.linkedin.com/company/fytlocalization/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            title="LinkedIn"
            aria-label="LinkedIn"
          >
            <LinkedInIcon className="w-4 h-4" />
          </a>

          <a
            href="https://www.facebook.com/people/Fytlocalization/61583295960480/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
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
