"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OrderModal from "@/components/OrderModal";
import PartnerStrip from "@/components/PartnerStrip";
import {
  Globe2,
  Award,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Target,
  Compass,
  Building2,
  ExternalLink,
} from "lucide-react";
import { TwitterIcon, LinkedInIcon, FacebookIcon, WhatsAppIcon } from "@/components/Icons";
import { useAboutData, TeamMember, Certification, Partner } from "@/data/aboutData";
import { SITE_CONFIG } from "@/data/siteConfig";

export default function AboutUsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const { team, certifications, partners } = useAboutData();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar onOpenOrderModal={() => setModalOpen(true)} />

      {/* Hero Header */}
      <section className="bg-slate-50 border-b border-slate-200 py-16 lg:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center sm:text-left">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-3xl leading-[1.12] text-slate-900">
            {SITE_CONFIG.tagline}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
            Enterprise-grade translation, interpretation, and authentic African AI training datasets empowering global technology to speak with cultural resonance.
          </p>

          {/* 8.5: Company Social Media Links */}
          <div className="flex items-center gap-3 pt-6 justify-center sm:justify-start">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">
              Connect:
            </span>
            <a
              href={SITE_CONFIG.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-xs flex items-center justify-center transition-colors"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <LinkedInIcon className="w-4 h-4" />
            </a>
            <a
              href={SITE_CONFIG.social.x}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-xs flex items-center justify-center transition-colors"
              aria-label="Twitter / X"
              title="Twitter / X"
            >
              <TwitterIcon className="w-4 h-4" />
            </a>
            <a
              href={SITE_CONFIG.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-xs flex items-center justify-center transition-colors"
              aria-label="Facebook"
              title="Facebook"
            >
              <FacebookIcon className="w-4 h-4" />
            </a>
            <a
              href={SITE_CONFIG.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-white hover:bg-emerald-50 text-emerald-600 border border-slate-200 shadow-xs flex items-center justify-center transition-colors"
              aria-label="WhatsApp"
              title="WhatsApp"
            >
              <WhatsAppIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-20">
        
        {/* 8.1: Company Vision & Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Vision Card */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                <Compass className="w-6 h-6" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Our Vision
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                To be recognized as Africa&apos;s premier localization and AI powerhouse, building bridges between Africa and the global market through language, data, and technology.
              </p>
            </div>
          </div>

          {/* Mission Card */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-100">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Our Mission
              </h2>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>Deliver world-class language and AI-driven services that empower global communication.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>Create inclusive AI datasets that represent African and Arabian voices in technology.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>Support businesses, NGOs, and governments with localization strategies that drive growth and impact.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 8.2: Core Team Members */}
        <section className="space-y-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Meet the Team
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member: TeamMember) => (
              <div
                key={member.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Photo Thumbnail (8.2: With client asset placeholder) */}
                  <div className="relative h-56 w-full rounded-xl overflow-hidden mb-4 bg-slate-100 border border-slate-200">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-xs font-semibold text-blue-600 mb-2">
                    {member.role}
                  </p>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                {/* Social Links */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-2">
                  {member.socials.linkedin && (
                    <a
                      href={member.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 rounded-md bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-600 flex items-center justify-center transition-colors"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <LinkedInIcon className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {member.socials.x && (
                    <a
                      href={member.socials.x}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 rounded-md bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-600 flex items-center justify-center transition-colors"
                      aria-label={`${member.name} X`}
                    >
                      <TwitterIcon className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 8.3: Certifications and Licenses (Mandatory) */}
        <section className="space-y-8 bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Certified Compliance & Quality Standards
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Operating with full governmental registration, international quality benchmarks, and data protection compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certifications.map((cert: Certification) => (
              <div
                key={cert.id}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-blue-400 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Certificate Scan Placeholder */}
                  <div className="relative h-44 w-full rounded-xl overflow-hidden mb-4 bg-white border border-slate-200 shadow-inner flex items-center justify-center">
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    {cert.issuer}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-200/60 text-[11px] text-slate-600 font-semibold flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    {cert.year}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                    Official
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 8.4: Partners Marquee Strip */}
        <PartnerStrip title="Our Enterprise Partners & Institutional Collaborators" />

        {/* CTA Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0000FF] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to take your project global?
            </h3>
            <p className="text-sm text-blue-100 mt-1">
              Contact our linguistic coordinators or request a formal project quote today.
            </p>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="px-8 py-4 rounded-xl text-xs font-extrabold uppercase tracking-wider bg-white hover:bg-slate-50 text-[#0000FF] shadow-sm whitespace-nowrap active:scale-95 transition-all"
          >
            Send Quote
          </button>
        </div>

      </main>

      <Footer onOpenOrderModal={() => setModalOpen(true)} />

      <OrderModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
