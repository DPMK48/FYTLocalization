"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, User } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";

import { switchActiveMember } from "@/data/userProfileStore";
import { getStoredMembers } from "@/data/membersData";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"member" | "admin">("member");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (typeof window !== "undefined") {
      localStorage.setItem("fyt_logged_in", "true");
      localStorage.setItem("fyt_user_role", role);

      if (role === "admin") {
        switchActiveMember("adminfytlocalization-com");
      } else {
        const members = getStoredMembers();
        const matched = members.find(
          (m) =>
            m.username.toLowerCase() === email.toLowerCase() ||
            m.name.toLowerCase() === email.toLowerCase() ||
            `${m.username}@fytlocalization.com`.toLowerCase() === email.toLowerCase()
        );
        switchActiveMember(matched ? matched.username : "hamdan");
      }
    }

    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 400);
  };

  const handleQuickLogin = (selectedRole: "member" | "admin") => {
    if (typeof window !== "undefined") {
      localStorage.setItem("fyt_logged_in", "true");
      localStorage.setItem("fyt_user_role", selectedRole);
      if (selectedRole === "admin") {
        switchActiveMember("adminfytlocalization-com");
      } else {
        switchActiveMember("hamdan");
      }
    }
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Top Header */}
      <div className="py-4 px-6 sm:px-10 bg-white border-b border-slate-200 flex items-center justify-between">
        <BrandLogo />
        <Link
          href="/"
          className="text-xs font-semibold text-slate-600 hover:text-blue-600"
        >
          ← Back to Website
        </Link>
      </div>

      {/* Login Card */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200 shadow-xs max-w-md w-full space-y-6">
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-bold text-slate-900">Sign In</h1>
            <p className="text-xs text-slate-500">
              Access your FYTLOCALIZATION account
            </p>
          </div>

          {/* 2 Roles Toggle: Member & Admin */}
          <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => setRole("member")}
              className={`py-2 rounded-lg transition-all ${
                role === "member"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Member
            </button>
            <button
              type="button"
              onClick={() => setRole("admin")}
              className={`py-2 rounded-lg transition-all ${
                role === "admin"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Admin
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={role === "admin" ? "admin@fytlocalization.com" : "member@fytlocalization.com"}
                  className="w-full pl-9 pr-3.5 py-2.5 text-xs rounded-lg bg-slate-50 border border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none focus:bg-white"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-blue-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3.5 py-2.5 text-xs rounded-lg bg-slate-50 border border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none focus:bg-white"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="inline-block animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <>
                  <span>Sign In as {role === "admin" ? "Admin" : "Member"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Access */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
            <span className="text-slate-400 text-[11px]">Instant Demo:</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin("member")}
                className="px-2.5 py-1 rounded-md text-[11px] font-semibold text-blue-600 hover:bg-blue-50"
              >
                Demo Member →
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin("admin")}
                className="px-2.5 py-1 rounded-md text-[11px] font-semibold text-blue-600 hover:bg-blue-50"
              >
                Demo Admin →
              </button>
            </div>
          </div>

          {role === "member" ? (
            <div className="text-center text-xs text-slate-500 pt-1">
              Need an account?{" "}
              <Link href="/register" className="text-blue-600 font-semibold hover:underline">
                Register here
              </Link>
            </div>
          ) : (
            <div className="text-center text-xs text-slate-400 pt-1 px-2">
              <span className="text-[11px] leading-relaxed block text-slate-500">
                Admin accounts are default and pre-configured. Admins can sign in and assign roles from the dashboard.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
