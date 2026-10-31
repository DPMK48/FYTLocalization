"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProfileHeader from "@/components/ProfileHeader";
import { useUserProfile } from "@/data/userProfileStore";
import { Image as ImageIcon, Trash2, CheckCircle2, Loader2 } from "lucide-react";

// Client-side canvas compression to ensure images easily fit storage quotas
function compressImage(file: File, maxWidth = 1600, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(event.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = reject;
      img.src = event.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function ChangeCoverPage() {
  const { profile, updateProfile } = useUserProfile();
  const [preview, setPreview] = useState<string | null>(profile.coverUrl);
  const [status, setStatus] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setProcessing(true);
    setStatus("Optimizing cover photo...");

    try {
      const compressed = await compressImage(file, 1600, 0.82);
      setPreview(compressed);
      setStatus("Cover image optimized! Click 'Save Cover Photo' to apply.");
    } catch (err) {
      console.error("Compression error:", err);
      // Fallback
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
        setStatus("Cover image selected. Click 'Save Cover Photo' to apply.");
      };
      reader.readAsDataURL(file);
    } finally {
      setProcessing(false);
    }
  };

  const handleSaveCover = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!preview) return;

    setProcessing(true);

    try {
      // 1. Save in user profile store
      updateProfile({ coverUrl: preview });

      // 2. Persist to MongoDB Atlas if user email is present
      try {
        await fetch("/api/profile/cover", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: profile.email || "admin@fytlocalization.com",
            coverUrl: preview,
          }),
        });
      } catch (apiErr) {
        console.warn("Could not sync to cloud DB:", apiErr);
      }

      setStatus("Cover photo saved successfully and applied across all profile pages!");
    } catch (saveErr) {
      console.error("Save error:", saveErr);
      setStatus("Failed to save cover photo. Please try a smaller image.");
    } finally {
      setProcessing(false);
      setTimeout(() => setStatus(null), 4000);
    }
  };

  const handleResetCover = async () => {
    updateProfile({ coverUrl: null });
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";

    try {
      await fetch("/api/profile/cover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: profile.email || "admin@fytlocalization.com",
          coverUrl: "",
        }),
      });
    } catch {
      // Ignore
    }

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
              Upload a wide banner image (recommended 1300x225 or 16:9). Images are automatically optimized.
            </p>
          </div>

          {status && (
            <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs flex items-center gap-2 max-w-xl animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{status}</span>
            </div>
          )}

          <div className="max-w-xl space-y-5">
            {/* Live Preview Box */}
            <div className="p-4 border border-slate-200 rounded-xl bg-slate-50/50 space-y-2">
              <span className="text-xs font-semibold text-slate-700 block">
                Live Banner Preview:
              </span>
              <div className="h-32 w-full rounded-lg border border-slate-300 overflow-hidden bg-[#e5e9f0] relative flex items-center justify-center">
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
                className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl p-8 text-center bg-slate-50/50 hover:bg-blue-50/30 transition-colors cursor-pointer flex flex-col items-center justify-center gap-2"
              >
                <ImageIcon className="w-7 h-7 text-slate-400" />
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-slate-800">
                    Click to select a cover image
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Supports JPG, PNG, WEBP. Auto-scaled for high definition.
                  </p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={!preview || processing}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-colors shadow-xs flex items-center gap-2"
                >
                  {processing ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <span>Save Cover Photo</span>
                  )}
                </button>

                {preview && (
                  <button
                    type="button"
                    onClick={handleResetCover}
                    disabled={processing}
                    className="px-4 py-2.5 border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>Reset</span>
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
