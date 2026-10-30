"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { TwitterIcon, LinkedInIcon, FacebookIcon, WhatsAppIcon } from "@/components/Icons";
import { SITE_CONFIG } from "@/data/siteConfig";

interface HeroProps {
  onOpenOrderModal: (serviceName?: string) => void;
}

export default function Hero({ onOpenOrderModal }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const slides = [
    {
      id: "slide-1",
      title: "Connecting The World Through Language",
      subtext:
        "Professional translation, interpretation, audio transcription, subtitling, and AI data services in 100+ African and global languages.",
      bgImage: "/images/africa_hero.jpg",
      primaryCta: { label: "BOOK NOW", action: () => onOpenOrderModal("Translation") },
      secondaryCta: { label: "CONTACT US", href: "/contact-us" },
    },
    {
      id: "slide-2",
      title: "Localization Services for Global Scale",
      subtext:
        "High-accuracy human translation, real-time interpretation, audio transcription, and frame-accurate subtitling across 100+ African and global languages.",
      bgImage: "/images/translation.jpg",
      primaryCta: { label: "SEND QUOTE", action: () => onOpenOrderModal("Translation") },
      secondaryCta: { label: "EXPLORE SERVICES", href: "/services" },
    },
    {
      id: "slide-3",
      title: "AI Data Services Across Africa",
      subtext:
        "Curated speech, image, and multimedia datasets engineered for Large Language Models, acoustic modeling, and cultural AI alignment.",
      bgImage: "/images/localization.jpg",
      primaryCta: { label: "SEND QUOTE", action: () => onOpenOrderModal("Audio Collection") },
      secondaryCta: { label: "LEARN MORE", href: "/services#ai-data" },
    },
  ];

  // Auto-advance every 6.5s unless hovered
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    } else if (diff < -50) {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }
    touchStartX.current = null;
  };

  const slide = slides[currentSlide];

  return (
    <section
      id="home"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full min-h-[600px] sm:min-h-[660px] flex items-center justify-center overflow-hidden bg-[#2b2c2e] transition-all"
    >
      {/* Background Image per slide with smooth crossfade */}
      {slides.map((s, idx) => (
        <div
          key={s.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            idx === currentSlide ? "opacity-100 z-0" : "opacity-0 -z-10"
          }`}
        >
          <Image
            src={s.bgImage}
            alt={s.title}
            fill
            sizes="100vw"
            priority={idx === 0}
            className="object-cover object-center opacity-30 brightness-95"
          />
          {/* Faint, transparent overlay in Blue (#0000FF) */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0000FF]/50 via-[#0000FF]/30 to-[#0000FF]/15 pointer-events-none" />
        </div>
      ))}

      {/* Main Slide Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 w-full flex flex-col items-center sm:items-start text-center sm:text-left">
        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.14] mb-5 max-w-3xl min-h-[1.15em] animate-in fade-in duration-500 drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]">
          {slide.title}
        </h1>

        {/* Subtext */}
        <p className="text-base sm:text-lg text-white/95 max-w-2xl leading-relaxed mb-8 font-normal drop-shadow-[0_1px_5px_rgba(0,0,0,0.6)]">
          {slide.subtext}
        </p>

        {/* Dual Actions */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mb-10">
          <button
            onClick={slide.primaryCta.action}
            className="inline-flex items-center gap-2 px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0000FF] bg-white hover:bg-slate-50 rounded-lg shadow-md hover:shadow-xl transition-all whitespace-nowrap active:scale-95"
          >
            <span>{slide.primaryCta.label}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <Link
            href={slide.secondaryCta.href}
            className="inline-flex items-center gap-2 px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white hover:bg-white/10 border border-white/40 rounded-lg transition-colors whitespace-nowrap"
          >
            <span>{slide.secondaryCta.label}</span>
          </Link>
        </div>

        {/* Social Icons (1.5: Centralized config) */}
        <div className="flex items-center gap-3">
          <a
            href={SITE_CONFIG.social.x}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            title="Twitter / X"
            aria-label="Twitter"
          >
            <TwitterIcon className="w-4 h-4" />
          </a>

          <a
            href={SITE_CONFIG.social.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            title="WhatsApp Live Desk"
            aria-label="WhatsApp"
          >
            <WhatsAppIcon className="w-4 h-4" />
          </a>

          <a
            href={SITE_CONFIG.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            title="LinkedIn"
            aria-label="LinkedIn"
          >
            <LinkedInIcon className="w-4 h-4" />
          </a>

          <a
            href={SITE_CONFIG.social.facebook}
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

      {/* Navigation Arrows */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
        aria-label="Previous slide"
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/20 hover:bg-black/40 text-white items-center justify-center transition-colors backdrop-blur-xs border border-white/20"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        aria-label="Next slide"
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/20 hover:bg-black/40 text-white items-center justify-center transition-colors backdrop-blur-xs border border-white/20"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Navigation Dots and Slide Counter */}
      <div className="absolute bottom-6 z-20 flex items-center gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`transition-all duration-300 rounded-full ${
              idx === currentSlide
                ? "w-8 h-2.5 bg-white shadow-sm"
                : "w-2.5 h-2.5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
