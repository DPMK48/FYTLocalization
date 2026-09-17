"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { User, ShieldCheck } from "lucide-react";
import { useUserProfile } from "@/data/userProfileStore";

interface ProfileHeaderProps {
  currentTab: "Profile" | "Account" | "Notifications" | "Messages" | "Blog";
  currentSubTab?: "View" | "Edit" | "Profile Photo" | "Cover Photo";
}

export default function ProfileHeader({ currentTab, currentSubTab }: ProfileHeaderProps) {
  const { profile, notifications, messages, activeNowString } = useUserProfile();

  const unreadNotifications = notifications.filter((n) => !n.read).length;

  return (
    <div className="bg-white border border-slate-200 rounded-sm overflow-hidden">
      {/* Cover Banner */}
      <div className="h-48 sm:h-64 bg-[#e5e9f0] relative w-full flex items-center justify-center overflow-hidden">
        {profile.coverUrl ? (
          <Image
            src={profile.coverUrl}
            alt="Cover Photo"
            fill
            unoptimized
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 opacity-15 flex flex-wrap gap-8 items-center justify-center p-4 select-none pointer-events-none">
            {Array.from({ length: 18 }).map((_, i) => (
              <div
                key={i}
                className="w-16 h-16 rounded-xl border-2 border-slate-500/40 flex items-center justify-center"
              >
                <div className="w-8 h-8 rounded-full bg-slate-500/30" />
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Avatar and Identity Bar */}
      <div className="px-6 sm:px-10 pb-4 relative">
        <div className="flex flex-col sm:flex-row sm:items-end gap-5 -mt-16 sm:-mt-20 mb-6">
          {/* Square Avatar with Status Dot */}
          <div className="relative shrink-0">
            <div className="w-28 h-28 sm:w-36 sm:h-36 bg-white border border-slate-200 rounded-sm p-2 shadow-xs flex items-center justify-center overflow-hidden">
              {profile.avatarUrl ? (
                <div className="relative w-full h-full rounded-sm overflow-hidden">
                  <Image
                    src={profile.avatarUrl}
                    alt={`${profile.firstName} ${profile.lastName}`}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-full h-full bg-[#f1f3f7] rounded-sm flex items-center justify-center text-slate-400">
                  <User className="w-16 h-16 stroke-[1.5]" />
                </div>
              )}
            </div>
            {/* Realtime Active Indicator Dot */}
            <span
              className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-white ring-2 ring-amber-400/20 animate-pulse"
              title="Member Active"
            />
          </div>

          {/* Name & Realtime Meta */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-medium text-slate-800">
                {profile.firstName} {profile.lastName}
              </h1>
              {profile.isAdmin ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold border border-blue-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  Admin
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200">
                  Staff Member
                </span>
              )}
            </div>
            <p className="text-sm font-semibold text-slate-700">
              {profile.role}
            </p>
            <p className="text-xs text-slate-500 flex items-center gap-1.5">
              <span>Joined {profile.joinedDate}</span>
              <span>•</span>
              <span className="text-emerald-600 font-medium inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
                {activeNowString}
              </span>
            </p>
          </div>
        </div>

        {/* Horizontal Tabs */}
        <div className="border-b border-slate-200 flex items-center gap-6 text-sm font-medium overflow-x-auto">
          <Link
            href="/profile"
            className={`pb-2.5 transition-colors whitespace-nowrap ${
              currentTab === "Profile"
                ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
                : "text-blue-600 hover:underline"
            }`}
          >
            Profile
          </Link>

          <Link
            href="/profile/posts"
            className={`pb-2.5 transition-colors whitespace-nowrap ${
              currentTab === "Blog"
                ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
                : "text-blue-600 hover:underline"
            }`}
          >
            Blog
          </Link>

          <Link
            href="/profile/account"
            className={`pb-2.5 transition-colors whitespace-nowrap ${
              currentTab === "Account"
                ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
                : "text-blue-600 hover:underline"
            }`}
          >
            Account
          </Link>

          <Link
            href="/profile/notifications"
            className={`pb-2.5 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              currentTab === "Notifications"
                ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
                : "text-blue-600 hover:underline"
            }`}
          >
            <span>Notifications</span>
            {unreadNotifications > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-rose-500 text-white leading-tight">
                {unreadNotifications}
              </span>
            )}
          </Link>

          <Link
            href="/profile/messages"
            className={`pb-2.5 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              currentTab === "Messages"
                ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
                : "text-blue-600 hover:underline"
            }`}
          >
            <span>Messages</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700 leading-tight">
              {messages.length}
            </span>
          </Link>
        </div>

        {/* Sub-links under Profile */}
        {currentTab === "Profile" && (
          <div className="py-3 border-b border-slate-100 flex items-center gap-4 text-xs font-medium text-blue-600">
            <Link
              href="/profile"
              className={currentSubTab === "View" ? "font-bold text-slate-900" : "hover:underline"}
            >
              View
            </Link>
            <Link
              href="/profile/edit"
              className={currentSubTab === "Edit" ? "font-bold text-slate-900" : "hover:underline"}
            >
              Edit
            </Link>
            <Link
              href="/profile/change-avatar"
              className={currentSubTab === "Profile Photo" ? "font-bold text-slate-900" : "hover:underline"}
            >
              Profile Photo
            </Link>
            <Link
              href="/profile/change-cover"
              className={currentSubTab === "Cover Photo" ? "font-bold text-slate-900" : "hover:underline"}
            >
              Cover Photo
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
