"use client";

import React from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { useAboutData, Partner } from "@/data/aboutData";

interface PartnerStripProps {
  title?: string;
  className?: string;
}

export default function PartnerStrip({
  title = "Trusted by Leading Enterprises, Media Houses & AI Labs",
  className = "",
}: PartnerStripProps) {
  const { partners } = useAboutData();

  // Duplicate list to achieve continuous seamless marquee scroll
  const marqueePartners = [...partners, ...partners];

  return (
    <section className={`py-12 bg-white border-y border-slate-200 overflow-hidden ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
        <h3 className="text-sm sm:text-base font-bold text-slate-700 uppercase tracking-wider">
          {title}
        </h3>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden flex items-center py-2">
        <div className="flex gap-6 animate-marquee shrink-0 whitespace-nowrap hover:[animation-play-state:paused]">
          {marqueePartners.map((partner: Partner, idx: number) => (
            <a
              key={`${partner.id}-${idx}`}
              href={partner.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-slate-50 hover:bg-blue-50/80 border border-slate-200 hover:border-blue-300 transition-all shadow-xs group shrink-0"
              title={`Visit ${partner.name} (opens in new tab)`}
            >
              {/* Logo Thumbnail Placeholder */}
              <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-white border border-slate-200 shrink-0">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  sizes="32px"
                  className="object-cover group-hover:scale-105 transition-transform"
                />
              </div>

              <div>
                <span className="text-xs font-extrabold text-slate-800 group-hover:text-blue-700 flex items-center gap-1.5">
                  <span>{partner.name}</span>
                  <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </span>
                <span className="text-[10px] text-slate-500 block">
                  {partner.industry}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
