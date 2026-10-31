"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProfileHeader from "@/components/ProfileHeader";
import { useUserProfile } from "@/data/userProfileStore";
import { Upload, Trash2, CheckCircle2, Loader2 } from "lucide-react";

function compressImage(file: File, maxDim = 500, quality = 0.85): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
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

export default function ChangeAvatarPage() {
  const { profile, updateProfile } = useUserProfile();
  const [preview, setPreview] = useState<string | null>(profile.avatarUrl);
  const [status, setStatus] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setProcessing(true);
    setStatus("Optimizing avatar photo...");

    try {
      const compressed = await compressImage(file, 500, 0.85);
      setPreview(compressed);
      setStatus("Image selected! Click 'Save Photo' to apply.");
    } catch {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
        setStatus("Image selected! Click 'Save Photo' to apply.");
      };
      reader.readAsDataURL(file);
    } finally {
      setProcessing(false);
    }
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
              Upload a clear square portrait photo. Photos are automatically optimized for fast loading.
            </p>
          </div>

          {status && (
            <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs flex items-center gap-2 max-w-xl animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{status}</span>
            </div>
          )}

          <div className="max-w-xl space-y-5">
            {/* Current / Preview Avatar */}
            <div className="flex items-center gap-4 p-4 border border-slate-200 rounded-xl bg-slate-50/50">
              <div className="w-20 h-20 bg-white border border-slate-300 rounded-sm overflow-hidden flex items-center justify-center shrink-0 shadow-xs relative">
                {preview ? (
                  <Image
                    src={preview}
                    alt="Preview"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                ) : (
                  <span className="text-xs text-slate-400 font-semibold">No Photo</span>
                )}
              </div>
              <div className="space-y-1 text-xs">
                <span className="font-bold text-slate-800 block">Avatar Preview</span>
                <p className="text-slate-500">
                  {preview ? "Preview of your selected portrait." : "Using default initials avatar."}
                </p>
              </div>
            </div>

            {/* Upload form */}
            <form onSubmit={handleSavePhoto} className="space-y-4">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl p-8 text-center bg-slate-50/50 hover:bg-blue-50/30 transition-colors cursor-pointer flex flex-col items-center justify-center gap-2"
              >
                <Upload className="w-7 h-7 text-slate-400" />
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-slate-800">
                    Click to browse your photo
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Supports JPG, PNG, WEBP (Square portrait recommended)
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
                      <span>Optimizing...</span>
                    </>
                  ) : (
                    <span>Save Photo</span>
                  )}
                </button>

                {preview && (
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    disabled={processing}
                    className="px-4 py-2.5 border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>Remove</span>
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
