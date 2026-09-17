"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProfileHeader from "@/components/ProfileHeader";
import { useUserProfile } from "@/data/userProfileStore";
import { Upload, Trash2, CheckCircle2, MessageCircle } from "lucide-react";

export default function ChangeAvatarPage() {
  const { profile, updateProfile } = useUserProfile();
  const [preview, setPreview] = useState<string | null>(profile.avatarUrl);
  const [status, setStatus] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreview(result);
      setStatus("Image selected. Click 'Save Photo' to apply.");
    };
    reader.readAsDataURL(file);
  };

  const handleSavePhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!preview) return;
    updateProfile({ avatarUrl: preview });
    setStatus("Profile photo saved and reflected in real-time!");
    setTimeout(() => setStatus(null), 3000);
  };

  const handleRemovePhoto = () => {
    updateProfile({ avatarUrl: null });
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setStatus("Profile photo removed.");
    setTimeout(() => setStatus(null), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-6 sm:py-10">
        <ProfileHeader currentTab="Profile" currentSubTab="Profile Photo" />

        <div className="bg-white border-x border-b border-slate-200 px-6 sm:px-10 py-6 space-y-6">
          <div className="space-y-1">
            <h2 className="text-base font-bold text-slate-900">Change Profile Photo</h2>
            <p className="text-xs text-slate-500">
              Upload a JPG, PNG, or GIF file for your member profile. Saved changes reflect immediately.
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
            <div className="flex items-center gap-5 p-4 border border-slate-200 rounded-lg bg-slate-50/50">
              <div className="w-20 h-20 rounded-sm border border-slate-300 overflow-hidden bg-white flex items-center justify-center relative shrink-0 shadow-xs">
                {preview ? (
                  <Image
                    src={preview}
                    alt="Avatar preview"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                ) : (
                  <span className="text-xs text-slate-400 font-medium">No Photo</span>
                )}
              </div>
              <div className="space-y-1 text-xs">
                <span className="font-semibold text-slate-800 block">
                  {preview ? "Custom photo selected" : "Default system avatar active"}
                </span>
                <p className="text-slate-500">
                  Recommended dimension: 400x400 pixels (square).
                </p>
              </div>
            </div>

            {/* Drop / Select Zone */}
            <form onSubmit={handleSavePhoto} className="space-y-4">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-lg p-8 text-center bg-slate-50/50 hover:bg-blue-50/30 transition-colors cursor-pointer flex flex-col items-center justify-center gap-2"
              >
                <Upload className="w-7 h-7 text-slate-400" />
                <p className="text-xs font-semibold text-slate-700">
                  Click to browse or drop an image file
                </p>
                <span className="text-[11px] text-slate-400">
                  Supports PNG, JPG, WEBP, or GIF up to 5MB
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
                  disabled={!preview || preview === profile.avatarUrl}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-bold rounded transition-colors text-xs shadow-xs"
                >
                  Save Photo
                </button>

                {profile.avatarUrl && (
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="px-4 py-2.5 border border-rose-200 text-rose-600 hover:bg-rose-50 font-semibold rounded transition-colors text-xs flex items-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove Photo</span>
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
