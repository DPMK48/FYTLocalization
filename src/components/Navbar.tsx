"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";

interface NavbarProps {
  onOpenOrderModal: (serviceName?: string) => void;
}

export default function Navbar({ onOpenOrderModal }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Dashboard", href: "https://fytlocalization.com/login" },
    { name: "Contact Us", href: "#contact" },
    { name: "Blog", href: "https://fytlocalization.com/blog/" },
    { name: "Services", href: "#services" },
    { name: "Order Now", href: "#calculator", isOrderNow: true },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 py-3"
          : "bg-white py-4 border-b border-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <div className="relative flex items-center justify-center">
            <svg
              width="38"
              height="38"
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transform group-hover:scale-105 transition-transform duration-200"
            >
              <rect width="44" height="44" rx="10" fill="#0A1838" />
              <path d="M11 28L19 14H25L17 28H11Z" fill="#00D2B4" />
              <path d="M21 28L29 14H35L27 28H21Z" fill="#0056F5" />
              <circle cx="31" cy="30" r="3" fill="#00D2B4" />
            </svg>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center tracking-tight font-extrabold text-xl text-slate-900 whitespace-nowrap">
              <span>FYT</span>
              <span className="text-blue-600">LOCALIZATION</span>
            </div>
            <span className="text-[9px] tracking-widest uppercase font-semibold text-slate-500 -mt-1 whitespace-nowrap">
              TRANSLATION COMPANY
            </span>
          </div>
        </Link>

        {/* Exact Desktop Navigation Links from Original Design */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-[15px] font-medium text-slate-700">
          {navLinks.map((link) => {
            const isActive = activeLink === link.name;
            if (link.isOrderNow) {
              return (
                <button
                  key={link.name}
                  onClick={() => {
                    setActiveLink(link.name);
                    onOpenOrderModal();
                  }}
                  className="relative py-1 text-slate-800 hover:text-blue-600 font-semibold transition-colors whitespace-nowrap group flex flex-col items-center"
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-blue-600 rounded-full" />
                  )}
                </button>
              );
            }

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setActiveLink(link.name)}
                className={`relative py-1 transition-colors whitespace-nowrap ${
                  isActive
                    ? "text-blue-600 font-semibold"
                    : "text-slate-800 hover:text-blue-600"
                }`}
              >
                <span>{link.name}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-blue-600 rounded-full animate-in fade-in duration-200" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-3 text-base font-semibold text-slate-800">
            {navLinks.map((link) => {
              if (link.isOrderNow) {
                return (
                  <button
                    key={link.name}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setActiveLink(link.name);
                      onOpenOrderModal();
                    }}
                    className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-blue-50 text-blue-600 font-bold"
                  >
                    {link.name}
                  </button>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setActiveLink(link.name);
                  }}
                  className={`px-3 py-2.5 rounded-xl hover:bg-blue-50 transition-colors ${
                    activeLink === link.name ? "text-blue-600 bg-blue-50/60" : ""
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
