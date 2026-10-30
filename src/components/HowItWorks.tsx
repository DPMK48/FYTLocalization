"use client";

import React from "react";
import {
  Search,
  FileCheck2,
  Users,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

interface HowItWorksProps {
  onOpenOrderModal: () => void;
}

export default function HowItWorks({ onOpenOrderModal }: HowItWorksProps) {
  const steps = [
    {
      num: "01",
      icon: Search,
      title: "Inquiry & Needs Analysis",
      description: "Client requirements, language pairs, and turnaround timelines defined.",
    },
    {
      num: "02",
      icon: FileCheck2,
      title: "Quotation & Agreement",
      description: "Transparent rate card, official contract, and NDA signed.",
    },
    {
      num: "03",
      icon: Users,
      title: "Execution & Delivery",
      description: "Native linguists and specialized AI data engineering teams execute.",
    },
    {
      num: "04",
      icon: ShieldCheck,
      title: "Multi-Tier Quality Assurance",
      description: "Accuracy, ISO compliance, and cultural nuance guaranteed.",
    },
    {
      num: "05",
      icon: CheckCircle2,
      title: "Secure Delivery & Support",
      description: "Final project handover with after-service assistance and support.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-slate-50 text-slate-900 border-y border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Big White Card with 5 Step Process Grid */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 text-slate-800 shadow-xl border border-slate-200">
              <div className="space-y-6">
                {steps.map((step) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.title} className="flex items-start gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors">
                      {/* Step Number + Icon */}
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center shrink-0 font-extrabold text-sm shadow-xs">
                        <Icon className="w-5 h-5 text-blue-600" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                            Step {step.num}
                          </span>
                          <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Title & Action */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Top Accent Line */}
            <div className="flex items-center gap-3">
              <span className="w-10 h-0.5 bg-blue-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                How It Works
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.18]">
              Localization & AI Data Solutions
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Streamlined process delivering reliable language solutions and authentic AI training datasets on schedule.
            </p>

            {/* Blue SERVICES Button */}
            <div className="pt-2">
              <a
                href="#services"
                className="inline-flex items-center justify-center px-10 py-3.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                SERVICES
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
