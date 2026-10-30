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
import PartnerStrip from "@/components/PartnerStrip";
import Footer from "@/components/Footer";
import OrderModal from "@/components/OrderModal";

export default function LandingPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("Translation");

  const handleOpenOrderModal = (serviceName: string = "Translation") => {
    setSelectedService(serviceName);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Top Navbar */}
      <Navbar onOpenOrderModal={handleOpenOrderModal} />

      {/* Main Sections */}
      <main className="flex-1">
        {/* 2. Hero Section Carousel (3 slides) */}
        <Hero onOpenOrderModal={handleOpenOrderModal} />

        {/* Why Choose Us */}
        <WhyChooseUs onOpenOrderModal={() => handleOpenOrderModal("Translation")} />

        {/* 3. Reorganized Services Showcase (2 Categories with Hover/Tap Reveal) */}
        <ServicesSection onOpenOrderModal={handleOpenOrderModal} />

        {/* 7. Scientific Vision Approach & Auto-Sliding Testimonials */}
        <ScientificApproach onOpenOrderModal={() => handleOpenOrderModal("Transcription")} />

        {/* How It Works (Step-by-step Process) */}
        <HowItWorks onOpenOrderModal={() => handleOpenOrderModal("Interpretation")} />

        {/* 6. Stats & Track Record (120+, 500+, 20+ African Countries) */}
        <StatsCounter onOpenOrderModal={() => handleOpenOrderModal("Translation")} />

        {/* 8.4: Partner Strip above Footer */}
        <PartnerStrip />

        {/* 5. Contact & Consultation Form */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenOrderModal={handleOpenOrderModal} />

      {/* 4. Interactive Quote Modal */}
      <OrderModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialService={selectedService}
      />
    </div>
  );
}
