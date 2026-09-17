"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProfileHeader from "@/components/ProfileHeader";
import { useUserProfile } from "@/data/userProfileStore";
import { MessageCircle } from "lucide-react";

export default function ProfilePage() {
  const { profile } = useUserProfile();

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-6 sm:py-10">
        <ProfileHeader currentTab="Profile" currentSubTab="View" />

        {/* View Profile Base Table matching screenshot */}
        <div className="bg-white border-x border-b border-slate-200 px-6 sm:px-10 py-6 space-y-4">
          <h2 className="text-base font-bold text-slate-900">
            View Profile
          </h2>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Base
          </h3>

          <div className="border border-slate-200 rounded-sm divide-y divide-slate-200 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 p-3.5 bg-white">
              <span className="font-semibold text-slate-700">First Name</span>
              <span className="sm:col-span-2 text-slate-900 font-medium">
                {profile.firstName}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 p-3.5 bg-white">
              <span className="font-semibold text-slate-700">Last Name</span>
              <span className="sm:col-span-2 text-slate-900 font-medium">
                {profile.lastName || "—"}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 p-3.5 bg-white">
              <span className="font-semibold text-slate-700">Nickname</span>
              <span className="sm:col-span-2 text-slate-900 font-medium">
                {profile.nickname}
              </span>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Floating Chat Button matching screenshot */}
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
