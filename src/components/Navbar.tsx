"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, LayoutDashboard } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";

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

  // 1.2: Public Nav links contain About Us (replacing Dashboard in the main public nav)
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Services", href: "/services" },
    { name: "Blog", href: "/blog" },
    { name: "Contact Us", href: "/contact-us" },
    // 1.1: Nav CTA button renamed to "Book Now"
    { name: "Book Now", href: "/fytlocalization-service", isAction: true },
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* 1.4: Unified Official Brand Logo */}
        <BrandLogo />

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-7 text-[14px] font-medium text-slate-700">
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
                  className="px-5 py-2 rounded-lg text-xs uppercase tracking-wider font-extrabold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-xs"
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

          {/* Authenticated user portal link (not in main nav, reachable when logged in) */}
          {isLoggedIn ? (
            <div className="flex items-center pl-3 border-l border-slate-200 text-xs gap-3">
              <Link
                href="/dashboard"
                className="flex items-center gap-1.5 font-bold text-blue-700 hover:text-blue-800 bg-blue-50 px-2.5 py-1.5 rounded-md"
                title="Staff / Operations Dashboard"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Dashboard</span>
              </Link>
              <button
                onClick={handleLogout}
                className="text-slate-400 hover:text-rose-600 font-medium transition-colors ml-1"
              >
                Log out
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="text-xs font-semibold px-3.5 py-1.5 rounded-md border border-slate-300 hover:border-blue-600 hover:text-blue-600 transition-colors text-slate-700 ml-2"
            >
              Login
            </Link>
          )}
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-2 text-sm font-medium animate-in fade-in">
          {navLinks.map((link) => {
            if (link.isAction) {
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    if (pathname === "/" && onOpenOrderModal) {
                      e.preventDefault();
                      onOpenOrderModal();
                    }
                  }}
                  className="block w-full text-center mt-3 py-2.5 px-4 rounded-lg bg-blue-600 text-white font-bold text-xs uppercase tracking-wider"
                >
                  {link.name}
                </Link>
              );
            }

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 ${
                  pathname === link.href ? "text-blue-600 font-bold" : "text-slate-800 hover:text-blue-600"
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          {/* 1.3: Logout ONLY appears when user is authenticated, NEVER in public mobile nav */}
          <div className="pt-3 border-t border-slate-100 text-xs">
            {isLoggedIn ? (
              <div className="flex items-center justify-between py-1">
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-bold text-blue-600 flex items-center gap-1"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="text-rose-600 font-semibold"
                >
                  Log out
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-blue-600 font-semibold block py-1"
              >
                Portal Login →
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
