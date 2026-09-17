"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OrderModal from "@/components/OrderModal";
import { SERVICES } from "@/data/servicesData";
import {
  CheckCircle2,
  ArrowRight,
  Languages,
  Mic2,
  Cpu,
  FileText,
  Film,
} from "lucide-react";

const SERVICE_ICONS: Record<string, React.ElementType> = {
  translation: Languages,
  interpretation: Mic2,
  ai: Cpu,
  transcription: FileText,
  subtitles: Film,
};

export default function ServicesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("Translation");

  const handleOpenBookModal = (serviceTitle: string = "Translation") => {
    setSelectedService(serviceTitle);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Navbar onOpenOrderModal={() => handleOpenBookModal()} />

      {/* Header Section */}
      <section className="bg-slate-50 border-b border-slate-200 py-14 lg:py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Our Services
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Professional linguistic solutions and AI speech datasets across 100+ African and global languages.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 w-full space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((srv, idx) => {
            const Icon = SERVICE_ICONS[srv.category] || Languages;

            return (
              <div
                key={srv.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-slate-400">
                      0{idx + 1}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      {srv.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {srv.description}
                    </p>
                  </div>

                  {/* Key Highlights */}
                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    {srv.features.slice(0, 3).map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <button
                    onClick={() => handleOpenBookModal(srv.title)}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Book {srv.title}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Clean Callout */}
        <div className="rounded-2xl bg-blue-600 text-white p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-1 text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-bold">
              Have a high-volume or specialized project?
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 max-w-xl leading-relaxed">
              We provide customized quotes and dedicated project coordinators for enterprise scale and multi-language requirements.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleOpenBookModal("Translation")}
              className="px-6 py-3 rounded-xl bg-white hover:bg-blue-50 text-blue-900 text-xs font-bold transition-colors shadow-xs"
            >
              Get a Quote
            </button>
            <Link
              href="/contact-us"
              className="px-5 py-3 rounded-xl border border-white/30 text-white hover:bg-white/10 text-xs font-bold transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </main>

      <Footer onOpenOrderModal={() => handleOpenBookModal()} />

      <OrderModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialService={selectedService}
      />
    </div>
  );
}
