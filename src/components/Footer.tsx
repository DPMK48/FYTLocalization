"use client";

import React from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  ArrowUp,
} from "lucide-react";
import { TwitterIcon, LinkedInIcon, FacebookIcon } from "@/components/Icons";

interface FooterProps {
  onOpenOrderModal: (serviceName?: string) => void;
}

export default function Footer({ onOpenOrderModal }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0022a3] text-blue-100 text-sm border-t border-blue-800">
      {/* Upper Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Company Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <svg
                width="36"
                height="36"
                viewBox="0 0 44 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="44" height="44" rx="10" fill="#ffffff" />
                <path d="M11 28L19 14H25L17 28H11Z" fill="#00D2B4" />
                <path d="M21 28L29 14H35L27 28H21Z" fill="#0056F5" />
                <circle cx="31" cy="30" r="3" fill="#00D2B4" />
              </svg>
              <div className="flex flex-col">
                <div className="flex items-center tracking-tight font-extrabold text-lg text-white">
                  <span>FYT</span>
                  <span className="text-teal-300">LOCALIZATION</span>
                </div>
                <span className="text-[8px] tracking-widest uppercase font-semibold text-blue-200 -mt-1">
                  TRANSLATION COMPANY
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed max-w-sm">
              Connecting people, businesses, and cultures across the globe through certified translation, AI localization, real-time interpretation, audio transcription, and synchronized subtitling in 100+ languages.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.linkedin.com/company/fytlocalization/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-blue-900 border border-blue-700 text-white hover:bg-blue-600 flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
              <a
                href="https://x.com/fytlocalization"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-blue-900 border border-blue-700 text-white hover:bg-blue-600 flex items-center justify-center transition-colors"
                aria-label="Twitter/X"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/people/Fytlocalization/61583295960480/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-blue-900 border border-blue-700 text-white hover:bg-blue-600 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/message/OIYPQ375X3HKP1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-blue-900 border border-blue-700 text-white hover:bg-emerald-600 flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="#home" className="hover:text-teal-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#why-choose" className="hover:text-teal-300 transition-colors">
                  Why Choose Us
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-teal-300 transition-colors">
                  Our Work & Services
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="hover:text-teal-300 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#calculator" className="hover:text-teal-300 transition-colors">
                  Instant Quote
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-teal-300 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Core Services Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Core Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onOpenOrderModal("Document Translation")}
                  className="hover:text-teal-300 transition-colors text-left"
                >
                  Certified Document Translation
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenOrderModal("Conference Interpretation")}
                  className="hover:text-teal-300 transition-colors text-left"
                >
                  Simultaneous Interpretation
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenOrderModal("AI Localization & MTPE")}
                  className="hover:text-teal-300 transition-colors text-left"
                >
                  AI Localization & MTPE
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenOrderModal("Audio Transcription")}
                  className="hover:text-teal-300 transition-colors text-left"
                >
                  Audio & Video Transcription
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenOrderModal("Subtitles & Closed Captions")}
                  className="hover:text-teal-300 transition-colors text-left"
                >
                  Subtitling & Closed Captions
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Support Desk */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Global Support Desk
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-teal-300 shrink-0" />
                <a
                  href="mailto:support@fytlocalization.com"
                  className="hover:text-white transition-colors"
                >
                  support@fytlocalization.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                <a
                  href="https://wa.me/message/OIYPQ375X3HKP1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp: +234 Support Desk
                </a>
              </div>
              <div className="p-3 bg-blue-900/60 rounded-xl border border-blue-700/60 text-[11px] text-blue-100 leading-relaxed">
                Operating 24/7 with linguists in West, East, North, and Southern Africa, Europe, and the Americas.
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar & Legal */}
      <div className="border-t border-blue-800 bg-[#001c87] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>
            © 2025 <strong className="text-white">FYTLOCALIZATION</strong>. All rights reserved.
          </div>

          <div className="flex items-center gap-6 text-blue-200">
            <Link href="#terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="#privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-white hover:text-teal-300 transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
