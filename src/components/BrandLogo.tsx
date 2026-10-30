"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SITE_CONFIG } from "@/data/siteConfig";

interface BrandLogoProps {
  variant?: "light" | "dark";
  className?: string;
  showSubtitle?: boolean;
}

/**
 * Single source of truth for the FYT Localization Logo.
 * Uses SITE_CONFIG.logoPath ("/images/logo.png").
 * Replacing public/images/logo.png will update the logo site-wide.
 */
export default function BrandLogo({
  variant = "light",
  className = "",
  showSubtitle = true,
}: BrandLogoProps) {
  return (
    <Link href="/" className={`inline-flex items-center gap-3 shrink-0 group ${className}`}>
      {/* Official PNG Asset (458 x 86) */}
      <div className="relative h-10 w-[214px] max-w-full">
        <Image
          src={SITE_CONFIG.logoPath}
          alt={SITE_CONFIG.logoAlt}
          fill
          priority
          sizes="214px"
          className={`object-contain object-left transition-opacity ${
            variant === "dark" ? "brightness-0 invert" : ""
          }`}
        />
      </div>
    </Link>
  );
}
