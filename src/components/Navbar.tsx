"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  onOpenOrderModal?: (serviceName?: string) => void;
}

export default function Navbar({ onOpenOrderModal }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Check auth state on mount and route change
  useEffect(() => {
    if (typeof window !== "undefined") {
      // If user directly navigates to authenticated routes, keep them logged in
      if (pathname.startsWith("/profile") || pathname.startsWith("/dashboard")) {
        localStorage.setItem("fyt_logged_in", "true");
        setIsLoggedIn(true);
      } else {
        const logged = localStorage.getItem("fyt_logged_in") === "true";
        setIsLoggedIn(logged);
      }
    }
  }, [pathname]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("fyt_logged_in");
      localStorage.removeItem("fyt_user_role");
      setIsLoggedIn(false);
      router.push("/login");
    }
  };

  // Base links: Dashboard ONLY displays when user is logged in
  const navLinks = [
    { name: "Home", href: "/" },
    ...(isLoggedIn ? [{ name: "Dashboard", href: "/dashboard" }] : []),
    { name: "Contact Us", href: "/contact-us" },
    { name: "Blog", href: "/blog" },
    { name: "Services", href: "/services" },
    { name: "Order Now", href: "/fytlocalization-service", isAction: true },
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <svg width="34" height="34" viewBox="0 0 44 44" fill="none">
            <rect width="44" height="44" rx="8" fill="#003cd6" />
            <path d="M11 28L19 14H25L17 28H11Z" fill="#ffffff" />
            <path d="M21 28L29 14H35L27 28H21Z" fill="#93c5fd" />
            <circle cx="31" cy="30" r="3" fill="#ffffff" />
          </svg>
          <div className="flex flex-col">
            <div className="flex items-center tracking-tight font-extrabold text-lg text-slate-900 leading-none">
              <span>FYT</span>
              <span className="text-blue-600">LOCALIZATION</span>
            </div>
            <span className="text-[8px] tracking-widest uppercase font-semibold text-slate-500 mt-0.5">
              TRANSLATION COMPANY
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-7 text-[14px] font-medium text-slate-700">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            if (link.isAction) {
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    if (pathname === "/" && onOpenOrderModal) {
                      e.preventDefault();
                      onOpenOrderModal();
                    }
                  }}
                  className="px-4 py-2 rounded text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  {link.name}
                </Link>
              );
            }

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative py-1 transition-colors ${
                  isActive
                    ? "text-blue-600 font-semibold"
                    : "text-slate-700 hover:text-blue-600"
                }`}
              >
                <span>{link.name}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-600 rounded-full" />
                )}
              </Link>
            );
          })}

          {/* Auth status link */}
          {isLoggedIn ? (
            <div className="flex items-center pl-2 border-l border-slate-200 text-xs">
              <button
                onClick={handleLogout}
                className="text-slate-500 hover:text-slate-900 font-medium"
              >
                Log out
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="text-xs font-semibold px-3 py-1.5 rounded border border-slate-300 hover:border-blue-600 hover:text-blue-600 transition-colors text-slate-700"
            >
              Login
            </Link>
          )}
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded text-slate-700 hover:bg-slate-100"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-2 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-800 hover:text-blue-600"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2 border-t border-slate-100 text-xs">
            {isLoggedIn ? (
              <div className="flex items-center justify-end">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="text-rose-600 font-medium"
                >
                  Log out
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-blue-600 font-semibold"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
