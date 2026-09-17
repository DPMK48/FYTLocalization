"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProfileHeader from "@/components/ProfileHeader";
import { useUserProfile } from "@/data/userProfileStore";
import { Image as ImageIcon, Trash2, CheckCircle2, MessageCircle } from "lucide-react";

export default function ChangeCoverPage() {
  const { profile, updateProfile } = useUserProfile();
  const [preview, setPreview] = useState<string | null>(profile.coverUrl);
  const [status, setStatus] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 8 * 1024 * 1024) {
      alert("Cover image size must be less than 8MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreview(result);
      setStatus("Cover image selected. Click 'Save Cover Photo' to apply.");
    };
    reader.readAsDataURL(file);
  };

  const handleSaveCover = (e: React.FormEvent) => {
    e.preventDefault();
    if (!preview) return;
    updateProfile({ coverUrl: preview });
    setStatus("Cover photo saved and updated across all profile pages in real-time!");
    setTimeout(() => setStatus(null), 3000);
  };

  const handleResetCover = () => {
    updateProfile({ coverUrl: null });
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setStatus("Cover photo reset to default banner.");
    setTimeout(() => setStatus(null), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-6 sm:py-10">
        <ProfileHeader currentTab="Profile" currentSubTab="Cover Photo" />

        <div className="bg-white border-x border-b border-slate-200 px-6 sm:px-10 py-6 space-y-6">
          <div className="space-y-1">
            <h2 className="text-base font-bold text-slate-900">Change Cover Photo</h2>
            <p className="text-xs text-slate-500">
              Upload a wide banner image (recommended 1300x225 or 16:9). Changes apply live.
            </p>
          </div>

          {status && (
            <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded text-xs flex items-center gap-2 max-w-xl">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{status}</span>
            </div>
          )}

          <div className="max-w-xl space-y-5">
            {/* Live Preview Box */}
            <div className="p-4 border border-slate-200 rounded-lg bg-slate-50/50 space-y-2">
              <span className="text-xs font-semibold text-slate-700 block">
                Live Banner Preview:
              </span>
              <div className="h-32 w-full rounded-md border border-slate-300 overflow-hidden bg-[#e5e9f0] relative flex items-center justify-center">
                {preview ? (
                  <Image
                    src={preview}
                    alt="Cover preview"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                ) : (
                  <span className="text-xs text-slate-400 font-medium">Default patterned banner</span>
                )}
              </div>
            </div>

            {/* Drop / Select Zone */}
            <form onSubmit={handleSaveCover} className="space-y-4">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-lg p-8 text-center bg-slate-50/50 hover:bg-blue-50/30 transition-colors cursor-pointer flex flex-col items-center justify-center gap-2"
              >
                <ImageIcon className="w-7 h-7 text-slate-400" />
                <p className="text-xs font-semibold text-slate-700">
                  Click to select a cover image file
                </p>
                <span className="text-[11px] text-slate-400">
                  Supports JPG, PNG, WEBP up to 8MB
                </span>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={!preview || preview === profile.coverUrl}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-bold rounded transition-colors text-xs shadow-xs"
                >
                  Save Cover Photo
                </button>

                {profile.coverUrl && (
                  <button
                    type="button"
                    onClick={handleResetCover}
                    className="px-4 py-2.5 border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold rounded transition-colors text-xs flex items-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Reset to Default</span>
                  </button>
                )}
              </div>
            </form>
          </div>
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
