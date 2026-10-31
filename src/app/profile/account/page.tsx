"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProfileHeader from "@/components/ProfileHeader";
import { useUserProfile } from "@/data/userProfileStore";
import { CheckCircle2, AlertCircle, Eye, EyeOff } from "lucide-react";

export default function ProfileAccountPage() {
  const { profile, updateProfile } = useUserProfile();
  const [email, setEmail] = useState(profile.email);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [savedMessage, setSavedMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setEmail(profile.email);
  }, [profile.email]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavedMessage("");
    setErrorMessage("");
    setSaving(true);

    try {
      // 1. Update email in local store
      updateProfile({ email });

      // 2. If password provided, update in MongoDB Atlas
      if (password.trim()) {
        const res = await fetch("/api/auth/update-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: profile.email || email,
            newPassword: password.trim(),
          }),
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
          setErrorMessage(data.error || "Failed to update password");
          setSaving(false);
          return;
        }
      }

      setPassword("");
      setSavedMessage("Account preferences and password updated successfully.");
      setTimeout(() => setSavedMessage(""), 4000);
    } catch (err) {
      console.error("Account update error:", err);
      setErrorMessage("Network error while updating password");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-6 sm:py-10">
        <ProfileHeader currentTab="Account" />

        <div className="bg-white border-x border-b border-slate-200 px-6 sm:px-10 py-6 space-y-6 text-xs">
          <div className="space-y-1">
            <h2 className="text-base font-bold text-slate-900">Account Settings</h2>
            <p className="text-slate-500">
              Manage your login email, credentials, and notification preferences.
            </p>
          </div>

          {savedMessage && (
            <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl flex items-center gap-2 max-w-xl animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{savedMessage}</span>
            </div>
          )}

          {errorMessage && (
            <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded-xl flex items-center gap-2 max-w-xl animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-4 max-w-xl">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Account Email (required)
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Leave blank to keep current password"
                  className="w-full pl-3.5 pr-10 py-2.5 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
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
              <span className="text-[11px] text-slate-400 mt-1 block">
                Must be at least 6 characters.
              </span>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-xs"
            >
              {saving ? "Saving..." : "Save Preferences"}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
