"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OrderModal from "@/components/OrderModal";
import { SERVICE_CATEGORIES, SubService } from "@/data/servicesData";
import {
  CheckCircle2,
  ArrowRight,
  Globe2,
  Cpu,
  Sparkles,
  Layers,
  Clock,
  ShieldCheck,
} from "lucide-react";

export default function ServicesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("Translation");

  // 4.1: Trigger quote modal with pre-selected service
  const handleOpenQuoteModal = (serviceTitle: string = "Translation") => {
    setSelectedService(serviceTitle);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar onOpenOrderModal={() => handleOpenQuoteModal("Translation")} />

      {/* Header Banner */}
      <section className="bg-slate-50 border-b border-slate-200 py-16 lg:py-24 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] text-slate-900">
            Our Services & Solutions
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            From high-stakes diplomatic interpretation and certified translation to large-scale African speech and image dataset curation.
          </p>
        </div>
      </section>

      {/* Main Content with 3.4: Grouped Containers (Localization into AI Data) */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 w-full space-y-20">
        
        {/* Iterate over the two primary categories */}
        {SERVICE_CATEGORIES.map((category, catIdx) => {
          const isLocalization = category.id === "localization";

          return (
            <section
              key={category.id}
              id={category.id}
              className="scroll-mt-24 space-y-8"
            >
              {/* Category Container Header */}
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-8 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
                      {isLocalization ? (
                        <Globe2 className="w-4 h-4 text-blue-600" />
                      ) : (
                        <Cpu className="w-4 h-4 text-blue-600" />
                      )}
                      <span>Category 0{catIdx + 1}</span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                      {category.title}
                    </h2>

                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
                      {category.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-semibold text-slate-500">
                      <span className="font-bold text-slate-700">Sub-services:</span>
                      {category.services.map((s) => (
                        <span
                          key={s.id}
                          className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700"
                        >
                          {s.title}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Category Representative Photo (3.5: Human-oriented realistic image) */}
                  <div className="lg:col-span-4 relative h-48 sm:h-56 rounded-2xl overflow-hidden border border-slate-200 shadow-xs">
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                    <span className="absolute bottom-3 left-3 text-xs font-bold text-white bg-blue-600/90 px-3 py-1 rounded-full backdrop-blur-xs">
                      {category.services.length} Specialized Offerings
                    </span>
                  </div>
                </div>
              </div>

              {/* Individual Sub-Service Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.services.map((service: SubService) => (
                  <div
                    key={service.id}
                    className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs hover:shadow-md hover:border-blue-400 transition-all flex flex-col justify-between space-y-6"
                  >
                    <div className="space-y-4">
                      {/* Image Thumbnail (Human-oriented placeholder) */}
                      <div className="relative h-44 w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#0000FF] text-white">
                          {service.defaultVolumeLabel || "Available"}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-slate-900">
                          {service.title}
                        </h3>
                        <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                          {service.shortDesc}
                        </p>
                      </div>

                      {/* Key Highlights */}
                      {service.features && (
                        <div className="pt-3 border-t border-slate-100 space-y-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                            Core Highlights
                          </span>
                          {service.features.slice(0, 3).map((feat, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* 4.1: Send Quote CTA Button */}
                    <div className="pt-4 border-t border-slate-100">
                      <button
                        onClick={() => handleOpenQuoteModal(service.title)}
                        className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <span>Send Quote</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        {/* Enterprise Callout Banner */}
        <div className="rounded-3xl bg-[#0000FF] text-white p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Have a multi-country or specialized AI data project?
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 max-w-xl leading-relaxed">
              We provide custom enterprise master services agreements (MSAs), bespoke data collection protocols, and dedicated coordination teams.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleOpenQuoteModal("Translation")}
              className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-[#0000FF] text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
            >
              Send Quote
            </button>
            <Link
              href="/contact-us"
              className="px-6 py-3.5 rounded-xl border border-white/30 text-white hover:bg-white/10 text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </main>

      <Footer onOpenOrderModal={() => handleOpenQuoteModal("Translation")} />

      <OrderModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialService={selectedService}
      />
    </div>
  );
}
