"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<"member" | "admin">("member");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    languagePair: "English to Hausa",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (typeof window !== "undefined") {
      localStorage.setItem("fyt_logged_in", "true");
      localStorage.setItem("fyt_user_role", role);
    }

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 400);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Top Header */}
      <div className="py-4 px-6 sm:px-10 bg-white border-b border-slate-200 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <svg width="32" height="32" viewBox="0 0 44 44" fill="none">
            <rect width="44" height="44" rx="8" fill="#003cd6" />
            <path d="M11 28L19 14H25L17 28H11Z" fill="#ffffff" />
            <path d="M21 28L29 14H35L27 28H21Z" fill="#93c5fd" />
            <circle cx="31" cy="30" r="3" fill="#ffffff" />
          </svg>
          <span className="font-extrabold text-base tracking-tight">
            FYT<span className="text-blue-600">LOCALIZATION</span>
          </span>
        </Link>
        <Link href="/login" className="text-xs font-semibold text-blue-600 hover:underline">
          Already registered? Sign In →
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 py-10">
        <div className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200 shadow-xs max-w-md w-full space-y-6">
          {submitted ? (
            <div className="py-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Registration Complete</h2>
              <p className="text-xs text-slate-600">
                Your account has been created.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => router.push("/dashboard")}
                  className="w-full py-2.5 px-4 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  Go to Dashboard →
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center space-y-1">
                <h1 className="text-2xl font-bold text-slate-900">Create Account</h1>
                <p className="text-xs text-slate-500">
                  Select your role to get started
                </p>
              </div>

              {/* 2 Roles: Member & Admin */}
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

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter full name"
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-slate-50 border border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@domain.com"
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-slate-50 border border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Primary Language Pair
                  </label>
                  <input
                    type="text"
                    value={formData.languagePair}
                    onChange={(e) => setFormData({ ...formData, languagePair: e.target.value })}
                    placeholder="e.g. English to Hausa, French to English"
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-slate-50 border border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Create password"
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-slate-50 border border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none focus:bg-white"
                  />
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
                      <span>Register as {role === "admin" ? "Admin" : "Member"}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
