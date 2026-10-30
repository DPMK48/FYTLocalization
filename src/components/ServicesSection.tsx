"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Globe2,
  Cpu,
  CheckCircle2,
  ChevronDown,
  Layers,
  Sparkles,
} from "lucide-react";
import { SERVICE_CATEGORIES, SubService } from "@/data/servicesData";

interface ServicesSectionProps {
  onOpenOrderModal: (serviceName?: string) => void;
}

export default function ServicesSection({ onOpenOrderModal }: ServicesSectionProps) {
  // State for toggling the dropdown inside each card
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({
    localization: false,
    "ai-data": false,
  });

  const toggleDropdown = (id: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#0000FF] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-10 h-0.5 bg-white" />
            <span className="text-xs font-bold uppercase tracking-wider text-white/90">
              OUR CAPABILITIES
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] mb-4">
            Professional Localization and AI Services
          </h2>
          <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
            Organized into two specialized domains: enterprise linguistic localization and authentic African AI training datasets. Open the dropdown inside either card to explore our included services.
          </p>
        </div>

        {/* Two Category Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {SERVICE_CATEGORIES.map((category) => {
            const isLocalization = category.id === "localization";
            const isDropdownOpen = !!openDropdowns[category.id];

            return (
              <div
                key={category.id}
                className="bg-white rounded-3xl p-6 sm:p-8 text-slate-800 shadow-2xl border border-blue-100/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Category Image */}
                  <div className="relative h-56 sm:h-64 w-full rounded-2xl overflow-hidden mb-6 bg-slate-100 border border-slate-200 shadow-inner group">
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    
                    {/* Category Floating Pill */}
                    <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/90 backdrop-blur-md text-white text-xs font-bold shadow-md">
                      {isLocalization ? (
                        <Globe2 className="w-3.5 h-3.5 text-blue-200" />
                      ) : (
                        <Cpu className="w-3.5 h-3.5 text-teal-300" />
                      )}
                      <span>{category.title}</span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <p className="text-xs font-medium text-blue-100 line-clamp-2">
                        {category.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="mb-4">
                    <h3 className="text-2xl font-extrabold text-blue-700 tracking-tight mb-2">
                      {category.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {category.description}
                    </p>
                  </div>

                  {/* Included Services Dropdown Inside Both Cards */}
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => toggleDropdown(category.id)}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-slate-50 hover:bg-blue-50/80 border border-slate-200/90 hover:border-blue-300 transition-all text-left group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                          <Layers className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-800 group-hover:text-blue-700 block">
                            Included Services ({category.services.length})
                          </span>
                          <span className="text-[10px] text-slate-500">
                            Click to {isDropdownOpen ? "hide" : "view all"} sub-services
                          </span>
                        </div>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-transform duration-300 ${
                          isDropdownOpen ? "rotate-180 text-blue-600" : ""
                        }`}
                      />
                    </button>

                    {/* Dropdown Menu List */}
                    {isDropdownOpen && (
                      <div className="mt-2.5 space-y-2 p-2 rounded-2xl bg-slate-50/80 border border-slate-200/80 animate-in fade-in duration-200 max-h-80 overflow-y-auto">
                        {category.services.map((sub: SubService) => (
                          <div
                            key={sub.id}
                            className="p-3 rounded-xl bg-white hover:bg-blue-50/60 border border-slate-200/70 hover:border-blue-300 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 shadow-xs"
                          >
                            <div className="flex-1">
                              <h4 className="text-xs font-bold text-slate-900">
                                {sub.title}
                              </h4>
                              <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5 line-clamp-2">
                                {sub.shortDesc}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => onOpenOrderModal(sub.title)}
                              className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white text-[11px] font-bold transition-colors flex items-center gap-1 shrink-0"
                            >
                              <span>Send Quote</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Primary CTAs */}
                <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={() => onOpenOrderModal(category.services[0].title)}
                    className="w-full sm:flex-1 py-3 px-5 rounded-xl text-xs font-extrabold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2 active:scale-95"
                  >
                    <span>Send Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <Link
                    href={`/services#${category.id}`}
                    className="w-full sm:w-auto py-3 px-5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors text-center whitespace-nowrap"
                  >
                    Explore Details
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
