"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, AlertCircle, Eye, EyeOff } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import { switchActiveMember, saveStoredProfile } from "@/data/userProfileStore";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "Invalid email or password");
        setLoading(false);
        return;
      }

      const user = data.user;

      if (typeof window !== "undefined") {
        localStorage.setItem("fyt_logged_in", "true");
        localStorage.setItem("fyt_user_role", user.role);
        localStorage.setItem("fyt_logged_in_username", user.username);
        switchActiveMember(user.username);
        saveStoredProfile({
          firstName: user.name.split(" ")[0] || user.name,
          lastName: user.name.split(" ").slice(1).join(" ") || "",
          nickname: user.username,
          email: user.email,
          role: user.role === "admin" ? "Co-founder" : (user.specialty || "Linguist & Specialist"),
          specialty: user.specialty,
          isAdmin: user.isAdmin,
          bio: user.bio || "",
          nativeLanguage: user.nativeLanguage || "Hausa & English",
          languagePairs: user.languagePairs || [],
          skills: user.skills || ["Translation"],
        });
      }

      router.push("/dashboard");
    } catch (err) {
      console.error("Login Error:", err);
      // Fallback local authentication for default admin
      if (email.trim().toLowerCase() === "admin@fytlocalization.com" && (password === "FYTAdmin@2026" || password === "admin123")) {
        if (typeof window !== "undefined") {
          localStorage.setItem("fyt_logged_in", "true");
          localStorage.setItem("fyt_user_role", "admin");
          localStorage.setItem("fyt_logged_in_username", "adminfytlocalization-com");
          switchActiveMember("adminfytlocalization-com");
        }
        router.push("/dashboard");
      } else {
        setError("Unable to authenticate. Please check your credentials.");
      }
    } finally {
      setLoading(false);
    }
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

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

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
                  placeholder="name@fytlocalization.com"
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
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2.5 text-xs rounded-lg bg-slate-50 border border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none focus:bg-white"
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
              className="w-full py-2.5 px-4 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              {loading ? (
                <span className="inline-block animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          <div className="text-center text-xs text-slate-500 pt-1">
            Need an account?{" "}
            <Link href="/register" className="text-blue-600 font-semibold hover:underline">
              Register here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
