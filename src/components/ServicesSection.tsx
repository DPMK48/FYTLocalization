"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";

interface ServicesSectionProps {
  onOpenOrderModal: (serviceName?: string) => void;
}

export default function ServicesSection({ onOpenOrderModal }: ServicesSectionProps) {
  const services = [
    {
      id: "interpretation",
      title: "INTERPRETATION",
      image: "/images/interpretation.jpg",
      description:
        "Professional interpretation services for meetings, conferences, and events. Seamless communication in real-time.",
      turnaround: "Live / Scheduled",
    },
    {
      id: "translation",
      title: "TRANSLATION",
      image: "/images/translation.jpg",
      description:
        "Accurate and culturally sensitive translations in over 100 languages for global audiences.",
      turnaround: "24–48 Hours",
    },
    {
      id: "localization",
      title: "LOCALIZATION/AI SERVICES",
      image: "/images/localization.jpg",
      description:
        "Connecting technology with real speakers, diverse accents, and linguistic intelligence for apps and platforms.",
      turnaround: "Sprint Based",
    },
    {
      id: "transcription",
      title: "TRANSCRIPTION",
      image: "/images/transcription.jpg",
      description:
        "Fast and reliable transcription services for audio and video content, capturing every detail and dialect.",
      turnaround: "12–24 Hours",
    },
    {
      id: "subtitle",
      title: "SUBTITLE",
      image: "/images/subtitle.jpg",
      description:
        "High-quality subtitle and captioning services for films, broadcast media, and digital video content.",
      turnaround: "24–48 Hours",
    },
  ];

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#003cd6] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-10 h-0.5 bg-white" />
            <span className="text-xs font-bold uppercase tracking-wider text-white/90">
              OUR WORK
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] mb-4">
            Professional Translation Services For Your Industry
          </h2>
          <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
            Accurate, culturally authentic linguistic solutions tailored for enterprises, media houses, governments, and NGOs across Africa and worldwide.
          </p>
        </div>

        {/* 5 Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl p-5 sm:p-6 text-slate-800 shadow-xl border border-blue-100 flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                {/* Photo Container */}
                <div className="relative h-48 w-full rounded-xl overflow-hidden mb-5 bg-slate-100 border border-slate-200">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold bg-[#003cd6] text-white flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {service.turnaround}
                  </span>
                </div>

                {/* Title with Vertical Blue Accent Line */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-1.5 h-6 bg-[#003cd6] rounded-full" />
                  <h3 className="text-base sm:text-lg font-extrabold text-blue-700 tracking-wide">
                    {service.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              {/* BOOK NOW Button */}
              <button
                onClick={() => onOpenOrderModal(service.title)}
                className="w-full py-2.5 px-4 rounded-lg text-xs font-extrabold uppercase tracking-wider text-blue-700 hover:text-white bg-white hover:bg-[#003cd6] border-2 border-blue-600 transition-all text-center flex items-center justify-center gap-2 group-hover:shadow-md"
              >
                <span>BOOK NOW</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
