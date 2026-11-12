"use client";

import React from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  ArrowUp,
  ArrowRight,
} from "lucide-react";
import { TwitterIcon, LinkedInIcon, FacebookIcon, WhatsAppIcon } from "@/components/Icons";
import BrandLogo from "@/components/BrandLogo";
import { SITE_CONFIG } from "@/data/siteConfig";

interface FooterProps {
  onOpenOrderModal?: (serviceName?: string) => void;
}

export default function Footer({ onOpenOrderModal }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#2b2c2e] text-slate-300 text-sm border-t border-slate-700/80">
      {/* Upper Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Company Brand Column */}
          <div className="lg:col-span-5 space-y-4">
            {/* 1.4: Official Logo */}
            <div className="inline-flex items-center bg-white/80 hover:bg-white/90 backdrop-blur-md rounded-lg px-2.5 py-1 border border-white/20 transition-all shadow-sm">
              <BrandLogo variant="light" />
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm">
              {SITE_CONFIG.tagline} Certified language and AI data solutions bridging communication worldwide with cultural precision.
            </p>

            {/* Compliance & Trust Badges */}
            <div className="pt-1 flex flex-wrap gap-2 text-[11px] text-slate-300">
              <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 flex items-center gap-1.5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                CAC-Registered (Nigeria)
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 flex items-center gap-1.5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                NDPC Licensed & Compliant
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 flex items-center gap-1.5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                NDPA & GDPR Aligned
              </span>
            </div>

            {/* 1.5: Social Icons driven from SITE_CONFIG */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={SITE_CONFIG.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-[#0000FF] hover:border-[#0000FF] flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
                title="Follow FYT Localization on LinkedIn"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.social.x}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-[#0000FF] hover:border-[#0000FF] flex items-center justify-center transition-colors"
                aria-label="Twitter/X"
                title="Follow FYT Localization on X"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-[#0000FF] hover:border-[#0000FF] flex items-center justify-center transition-colors"
                aria-label="Facebook"
                title="Follow FYT Localization on Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-[#04ddb2] hover:border-[#04ddb2] flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
                title="Chat with us on WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="lg:col-span-3 lg:col-start-6 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-teal-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:text-teal-300 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-teal-300 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-teal-300 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-teal-300 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/fytlocalization-service" className="text-teal-300 font-semibold hover:underline transition-colors flex items-center gap-1">
                  <span>Book Now</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Support Desk */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Support Desk
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-teal-300 shrink-0" />
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="hover:text-white transition-colors"
                >
                  {SITE_CONFIG.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                <a
                  href={SITE_CONFIG.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp: {SITE_CONFIG.contact.phoneDisplay}
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar & Legal */}
      <div className="border-t border-slate-700/80 bg-[#242527] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>
            © 2026 <strong className="text-white">{SITE_CONFIG.officialName}</strong>. All rights reserved.
          </div>

          <div className="flex items-center gap-6 text-slate-400">
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/login" className="hover:text-white transition-colors">
              Portal Login
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
