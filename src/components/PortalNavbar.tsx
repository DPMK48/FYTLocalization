"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Globe2, ShieldCheck, User, ArrowLeft } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";

interface PortalNavbarProps {
  roleTitle: string;
  userName: string;
}

export default function PortalNavbar({ roleTitle, userName }: PortalNavbarProps) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <header className="bg-[#2b2c2e] text-white border-b border-slate-700/80 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-4">
          <div className="bg-white/95 rounded-lg p-1.5 inline-block">
            <BrandLogo />
          </div>
          <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-900/60 text-blue-200 border border-blue-700/60">
            {roleTitle}
          </span>
        </div>

        {/* Right side navigation & user */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white transition-colors"
          >
            <Globe2 className="w-3.5 h-3.5" />
            <span>Public Website</span>
          </Link>

          <Link
            href="/profile"
            className="text-xs text-blue-300 hover:underline font-semibold"
          >
            My Profile →
          </Link>

          <div className="flex items-center gap-2 pl-3 border-l border-slate-700">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
              {userName.slice(0, 2).toUpperCase()}
            </div>
            <span className="hidden md:inline-block text-xs font-semibold text-slate-200">
              {userName}
            </span>
            <button
              onClick={() => router.push("/login")}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors ml-1"
              title="Log out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
