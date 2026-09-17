"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProfileHeader from "@/components/ProfileHeader";
import { useUserProfile } from "@/data/userProfileStore";
import { CheckCircle2, MessageCircle } from "lucide-react";

export default function ProfileAccountPage() {
  const { profile, updateProfile } = useUserProfile();
  const [email, setEmail] = useState(profile.email);
  const [password, setPassword] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setEmail(profile.email);
  }, [profile.email]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ email });
    setPassword("");
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
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

          {saved && (
            <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded flex items-center gap-2 max-w-xl">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Account preferences saved in real-time.</span>
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
                className="w-full px-3 py-2 border border-slate-300 rounded text-slate-800 focus:outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                New Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Leave blank to keep current password"
                className="w-full px-3 py-2 border border-slate-300 rounded text-slate-800 focus:outline-none focus:border-blue-600"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded transition-colors shadow-xs"
            >
              Save Preferences
            </button>
          </form>
        </div>
      </main>

      <Footer />

      {/* Floating Chat Button */}
      <a
        href="https://wa.me/message/OIYPQ375X3HKP1"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg transition-colors"
        aria-label="Chat support"
        title="Live Support"
      >
        <MessageCircle className="w-6 h-6 fill-white stroke-none" />
      </a>
    </div>
  );
}
