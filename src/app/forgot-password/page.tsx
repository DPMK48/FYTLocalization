"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, ArrowRight, CheckCircle2, Lock } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <div className="py-4 px-6 sm:px-10 bg-white border-b border-slate-200 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <svg width="32" height="32" viewBox="0 0 44 44" fill="none">
            <rect width="44" height="44" rx="10" fill="#0A1838" />
            <path d="M11 28L19 14H25L17 28H11Z" fill="#00D2B4" />
            <path d="M21 28L29 14H35L27 28H21Z" fill="#0056F5" />
            <circle cx="31" cy="30" r="3" fill="#00D2B4" />
          </svg>
          <span className="font-extrabold text-base tracking-tight">
            FYT<span className="text-blue-600">LOCALIZATION</span>
          </span>
        </Link>
        <Link href="/login" className="text-xs font-semibold text-blue-600 hover:underline">
          ← Back to Login
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl max-w-md w-full space-y-6">
          {submitted ? (
            <div className="text-center py-6 space-y-4 animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center border-2 border-emerald-300">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Reset Link Dispatched</h2>
              <p className="text-xs text-slate-600 max-w-xs mx-auto">
                If an account exists for <strong>{email}</strong>, we have sent a secure password reset link. Please check your inbox.
              </p>
              <div className="pt-2">
                <Link
                  href="/login"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 inline-block"
                >
                  Return to Sign In
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                  <Lock className="w-5 h-5" />
                </div>
                <h1 className="text-2xl font-extrabold text-slate-900">Reset Password</h1>
                <p className="text-xs text-slate-500 mt-1">
                  Enter your registered email address and we will send instructions to reset your password.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full pl-9 pr-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 shadow-md transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="inline-block animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <>
                    <span>Send Reset Instructions</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
