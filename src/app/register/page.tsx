"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Eye, EyeOff, Clock } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    specialty: "Translation & Localization",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || "Failed to create account. Please try again.");
        setLoading(false);
        return;
      }
      setSubmitted(true);
    } catch (err) {
      console.error("Register error", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Top Header */}
      <div className="py-4 px-6 sm:px-10 bg-white border-b border-slate-200 flex items-center justify-between">
        <BrandLogo />
        <Link href="/login" className="text-xs font-semibold text-blue-600 hover:underline">
          Already registered? Sign In →
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 py-10">
        <div className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200 shadow-xs max-w-md w-full space-y-6">
          {submitted ? (
            <div className="py-6 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-amber-50 text-amber-600 mx-auto flex items-center justify-center border border-amber-200 shadow-xs">
                <Clock className="w-7 h-7" />
              </div>
              <div className="space-y-1.5">
                <h2 className="text-xl font-bold text-slate-900">Registration Pending Approval</h2>
                <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
                  Your staff member registration has been received and is waiting for administrator approval.
                  Once verified, you will be able to log in to your account.
                </p>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-left text-xs space-y-1">
                <div><span className="font-semibold text-slate-700">Account:</span> {formData.name} ({formData.email})</div>
                <div><span className="font-semibold text-slate-700">Specialty:</span> {formData.specialty}</div>
                <div><span className="font-semibold text-slate-700">Status:</span> <span className="text-amber-600 font-semibold">Pending Admin Review</span></div>
              </div>
              <div className="pt-2">
                <Link
                  href="/login"
                  className="inline-block w-full py-2.5 px-4 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors text-center"
                >
                  Return to Sign In →
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center space-y-1">
                <h1 className="text-2xl font-bold text-slate-900">Create Member Account</h1>
                <p className="text-xs text-slate-500">
                  Join our community of translators, editors, and speech specialists
                </p>
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                  {error}
                </div>
              )}

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

                {/* Specialty Dropdown */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Specialty (Service Offering)
                  </label>
                  <select
                    value={formData.specialty}
                    onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-slate-50 border border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none focus:bg-white font-medium"
                  >
                    <optgroup label="Localization Services">
                      <option value="Translation & Localization">Translation & Localization</option>
                      <option value="Transcription">Transcription</option>
                      <option value="Interpretation">Interpretation</option>
                      <option value="Subtitling">Subtitling</option>
                      <option value="MTPE (Machine Translation Post-Editing)">MTPE (Machine Translation Post-Editing)</option>
                      <option value="Language Quality Assurance (LQA)">Language Quality Assurance (LQA)</option>
                      <option value="UI/UX & Technical Localization">UI/UX & Technical Localization</option>
                      <option value="Cultural-Context Testing">Cultural-Context Testing</option>
                    </optgroup>
                    <optgroup label="AI Data Services">
                      <option value="AI Data Collection & Annotation">AI Data Collection & Annotation</option>
                      <option value="LLM / Chatbot Testing & Evaluation">LLM / Chatbot Testing & Evaluation</option>
                      <option value="AI Data Sourcing & Preparation">AI Data Sourcing & Preparation</option>
                      <option value="Voice-Over & Speech Data">Voice-Over & Speech Data</option>
                      <option value="Egocentric Capture">Egocentric Capture</option>
                    </optgroup>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="Create password"
                      className="w-full pl-3.5 pr-10 py-2.5 text-xs rounded-lg bg-slate-50 border border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none focus:bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none p-0.5 rounded"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
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
                      <span>Create Member Account</span>
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
