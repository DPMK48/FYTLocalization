"use client";

import React from "react";
import {
  Lightbulb,
  LineChart,
  UserCheck,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

interface HowItWorksProps {
  onOpenOrderModal: () => void;
}

export default function HowItWorks({ onOpenOrderModal }: HowItWorksProps) {
  const steps = [
    {
      icon: Lightbulb,
      title: "Order Our Service",
      description:
        "Browse through our range of services including translation, transcription, interpretation, and subtitles. Select the one that fits your project needs.",
    },
    {
      icon: LineChart,
      title: "Tell us more",
      description:
        "Provide us with the details of your project. Specify the language pair, project type, and any special requirements you may have.",
    },
    {
      icon: UserCheck,
      title: "Get Started",
      description:
        "Submit your project details and receive a personalized quote. Once you approve, our team of professionals will begin working on your project.",
    },
    {
      icon: CheckCircle2,
      title: "Receive your Order",
      description:
        "Sit back and relax while we handle the rest. You’ll receive your completed order promptly, with the quality and accuracy you expect from FYTLOCALIZATION.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-[#003cd6] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Big White Card with 4 Step Process Grid (Matching Screenshot) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-12 text-slate-800 shadow-2xl border border-blue-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
                {steps.map((step) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.title} className="flex flex-col items-start text-left">
                      {/* Circular icon in blue border */}
                      <div className="w-12 h-12 rounded-full border-2 border-blue-600 flex items-center justify-center mb-4 text-blue-700 bg-blue-50/50">
                        <Icon className="w-6 h-6 stroke-[2]" />
                      </div>
                      
                      <h3 className="text-base sm:text-lg font-extrabold text-blue-700 mb-2">
                        {step.title}
                      </h3>
                      
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Title & Action (Matching Screenshot) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Top Accent Line */}
            <div className="flex items-center gap-3">
              <span className="w-10 h-0.5 bg-white" />
              <span className="text-xs font-bold uppercase tracking-wider text-white/90">
                How It Work
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.18]">
              Translation Services & Solutions
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
              This step-by-step process ensures a smooth and efficient experience, making it easy for you to get the language support you need.
            </p>

            {/* White SERVICES Button */}
            <div className="pt-2">
              <a
                href="#services"
                className="inline-flex items-center justify-center px-10 py-3.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-blue-700 bg-white hover:bg-slate-100 rounded-lg shadow-lg hover:shadow-xl transition-all"
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
