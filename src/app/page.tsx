"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhyChooseUs from "@/components/WhyChooseUs";
import ServicesSection from "@/components/ServicesSection";
import ScientificApproach from "@/components/ScientificApproach";
import HowItWorks from "@/components/HowItWorks";
import StatsCounter from "@/components/StatsCounter";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import OrderModal from "@/components/OrderModal";
import { MessageCircle } from "lucide-react";

export default function LandingPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("Translation");

  const handleOpenOrderModal = (serviceName?: string) => {
    if (serviceName) {
      setSelectedService(serviceName);
    }
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Top Navbar */}
      <Navbar onOpenOrderModal={handleOpenOrderModal} />

      {/* Hero Section */}
      <main className="flex-1">
        <Hero onOpenOrderModal={handleOpenOrderModal} />

        {/* Why Choose Us */}
        <WhyChooseUs onOpenOrderModal={() => handleOpenOrderModal("General Translation")} />

        {/* Services Showcase (Our Work) */}
        <ServicesSection onOpenOrderModal={handleOpenOrderModal} />

        {/* Scientific Vision Approach & Testimonials */}
        <ScientificApproach onOpenOrderModal={() => handleOpenOrderModal("Transcription")} />

        {/* How It Works (Step-by-step Process) */}
        <HowItWorks onOpenOrderModal={() => handleOpenOrderModal("Interpretation")} />

        {/* Stats & Track Record Experience */}
        <StatsCounter onOpenOrderModal={() => handleOpenOrderModal("Translation")} />

        {/* Contact & Consultation Form */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenOrderModal={handleOpenOrderModal} />

      {/* Interactive Order & Quote Modal */}
      <OrderModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialService={selectedService}
      />

      {/* Floating WhatsApp Live Button in bottom right */}
      <a
        href="https://wa.me/message/OIYPQ375X3HKP1"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-2xl shadow-emerald-500/40 hover:scale-110 active:scale-95 transition-all group"
        aria-label="Chat with FYTLOCALIZATION on WhatsApp"
        title="Instant WhatsApp Support"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute right-16 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg border border-slate-700 pointer-events-none">
          💬 Chat with us 24/7
        </span>
      </a>
    </div>
  );
}
