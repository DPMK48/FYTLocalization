"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Star, ShieldCheck } from "lucide-react";

interface ScientificApproachProps {
  onOpenOrderModal: () => void;
}

export default function ScientificApproach({ onOpenOrderModal }: ScientificApproachProps) {
  return (
    <section id="why-us" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading & Vision Details (Exact match to screenshot) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Top Accent Line */}
            <div className="flex items-center gap-3">
              <span className="w-10 h-0.5 bg-blue-700" />
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                Why Us?
              </span>
            </div>

            {/* Main Headline in Royal Blue */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-blue-700 tracking-tight leading-[1.18]">
              Our Scientific Vision Approach
            </h2>

            {/* Sub-heading */}
            <h3 className="text-base sm:text-lg font-semibold text-slate-700 leading-relaxed">
              Professional Translation, Transcription, Interpretation, and Subtitle Services at Affordable Prices.
            </h3>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
              Our goal is to help businesses and individuals communicate effectively across linguistic and cultural barriers through native expertise, rigorous QA stages, and timely execution.
            </p>

            {/* WHY US? Button (Solid Royal Blue) */}
            <div className="pt-4">
              <button
                onClick={onOpenOrderModal}
                className="px-8 py-3.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                WHY US?
              </button>
            </div>
          </div>

          {/* Right Column: Large Photo + Floating Testimonial Card */}
          <div className="lg:col-span-6 relative">
            <div className="relative w-full aspect-[4/3.5] sm:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-100">
              <Image
                src="/images/subtitle.jpg"
                alt="Our Scientific Vision and Transcription Editing Studio"
                fill
                className="object-cover"
              />
            </div>

            {/* Floating White Testimonial Card (Positioned at Bottom Corner with Orange Accent Line) */}
            <div className="absolute -bottom-8 right-2 sm:right-6 max-w-sm sm:max-w-md bg-white rounded-xl p-5 sm:p-6 shadow-2xl border border-slate-100 z-20 border-b-4 border-b-orange-500">
              <p className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed mb-4">
                &ldquo;The transcription services were accurate and delivered on time. We were impressed with the quality and professionalism.&rdquo;
              </p>
              
              <div>
                <h4 className="text-sm font-bold text-orange-600">
                  Lawan Dadinkowa
                </h4>
                <p className="text-xs text-slate-500">
                  CEO, Dadinkowa Media
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
