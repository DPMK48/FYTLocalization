"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useMembersStore, Member } from "@/data/membersData";
import { useUserProfile } from "@/data/userProfileStore";
import {
  User,
  MoreHorizontal,
  LayoutGrid,
  List,
  ShieldCheck,
  PenTool,
  MessageSquare,
  ExternalLink,
  CheckCircle2,
  Lock,
} from "lucide-react";

export default function MembersDirectoryPage() {
  const router = useRouter();
  const [authChecking, setAuthChecking] = useState(true);
  const { profile, activeNowString, addNotification } = useUserProfile();
  const { members, toggleAdmin, toggleCopywriter } = useMembersStore();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const loggedIn = localStorage.getItem("fyt_logged_in") === "true";
      if (!loggedIn) {
        router.replace("/login?redirect=/members");
        return;
      }
      setAuthChecking(false);
    }
  }, [router]);

  const [filterName, setFilterName] = useState("");
  const [filterNickname, setFilterNickname] = useState("");
  const [filterSkills, setFilterSkills] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [sortBy, setSortBy] = useState("Admins First");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleReset = () => {
    setFilterName("");
    setFilterNickname("");
    setFilterSkills("");
    setFilterLocation("");
  };

  const handleToggleAdminAction = (member: Member) => {
    if (member.id === "m-1") {
      showToast("Fatima Yusuf is the founding director and permanent admin.");
      setOpenMenuId(null);
      return;
    }

    const newStatus = toggleAdmin(member.id);
    setOpenMenuId(null);

    if (newStatus) {
      addNotification(
        `${member.name} was promoted to Admin & Editor by ${profile.firstName}.`,
        "/dashboard",
        "admin"
      );
      showToast(`${member.name} has been promoted to Admin.`);
    } else {
      showToast(`${member.name}'s Admin role was revoked.`);
    }
  };

  const handleToggleCopywriterAction = (member: Member) => {
    const newStatus = toggleCopywriter(member.id);
    setOpenMenuId(null);
    showToast(
      newStatus
        ? `${member.name} is now designated as Blog Copywriter.`
        : `${member.name}'s copywriter designation was removed.`
    );
  };

  const filteredMembers = members
    .filter((m) => {
      const matchName = m.name.toLowerCase().includes(filterName.toLowerCase());
      const matchNick = m.username.toLowerCase().includes(filterNickname.toLowerCase());
      const matchSkill =
        !filterSkills || m.skills.some((s) => s.toLowerCase().includes(filterSkills.toLowerCase()));
      const matchLoc = !filterLocation || m.location.toLowerCase().includes(filterLocation.toLowerCase());
      return matchName && matchNick && matchSkill && matchLoc;
    })
    .sort((a, b) => {
      if (sortBy === "Admins First") {
        if (a.isAdmin && !b.isAdmin) return -1;
        if (!a.isAdmin && b.isAdmin) return 1;
      } else if (sortBy === "Alphabetical") {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

  if (authChecking) {
    return (
      <div className="min-h-screen flex flex-col bg-[#f4f6f9] text-slate-800">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f6f9] text-slate-800">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-4">
        {toastMessage && (
          <div className="p-3 bg-emerald-50 text-emerald-900 border border-emerald-300 rounded-lg flex items-center gap-2 text-xs font-semibold shadow-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{toastMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Column */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-sm p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-base font-bold text-slate-900">
                  All Members & Staff Directory
                </h1>
                <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1.5">
                  <Lock className="w-3 h-3 text-slate-400" />
                  <span>Profiles are restricted to individual owners. Colleague collaboration is available via Direct Messages.</span>
                </p>
              </div>
              <Link href="/dashboard" className="text-xs text-blue-600 font-semibold hover:underline">
                ← Back to Dashboard
              </Link>
            </div>

            {/* Sort and View Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 text-xs">
              <span className="text-slate-500 text-[11px]">
                Showing {filteredMembers.length} members
              </span>

              <div className="flex items-center gap-3">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-2.5 py-1.5 border border-slate-200 rounded text-slate-600 bg-white font-medium focus:outline-none"
                >
                  <option value="Admins First">Admins First</option>
                  <option value="Alphabetical">Alphabetical</option>
                </select>

                <div className="flex items-center gap-1 text-slate-400">
                  <button
                    type="button"
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 rounded hover:text-slate-700 ${viewMode === "grid" ? "text-blue-600 font-bold" : ""}`}
                    title="Grid View"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 rounded hover:text-slate-700 ${viewMode === "list" ? "text-blue-600 font-bold" : ""}`}
                    title="List View"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Members List */}
            <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 gap-4" : "divide-y divide-slate-100"}>
              {filteredMembers.map((member) => {
                const isSelf = member.username === profile.nickname;
                const isMenuOpen = openMenuId === member.id;

                return (
                  <div
                    key={member.id}
                    className={`py-5 first:pt-2 space-y-4 ${
                      viewMode === "grid" ? "p-4 border border-slate-200 rounded-xl bg-slate-50/50" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between relative">
                      <div className="flex items-center gap-4">
                        <div className="relative shrink-0">
                          <div className="w-12 h-12 rounded-full bg-[#f1f3f7] flex items-center justify-center text-slate-400 border border-slate-200 overflow-hidden relative">
                            {member.username === "adminfytlocalization-com" && profile.avatarUrl ? (
                              <Image
                                src={profile.avatarUrl}
                                alt={profile.firstName}
                                fill
                                unoptimized
                                className="object-cover rounded-full"
                              />
                            ) : (
                              <User className="w-6 h-6" />
                            )}
                          </div>
                          {member.isOnline && (
                            <span
                              className="absolute top-0 right-0 w-3 h-3 rounded-full bg-amber-400 border-2 border-white animate-pulse"
                              title="Active status"
                            />
                          )}
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            {isSelf ? (
                              <Link
                                href="/profile"
                                className="text-sm font-bold text-blue-600 hover:underline flex items-center gap-1.5"
                                title="Your Profile"
                              >
                                <span>{member.name}</span>
                                <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">You</span>
                              </Link>
                            ) : (
                              <span className="text-sm font-bold text-slate-900">
                                {member.name}
                              </span>
                            )}

                            {member.isAdmin && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
                                <ShieldCheck className="w-3 h-3 text-blue-600" />
                                Admin
                              </span>
                            )}

                            {member.isCopywriter && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                                <PenTool className="w-3 h-3 text-emerald-600" />
                                Copywriter
                              </span>
                            )}
                          </div>

                          <p className="text-xs text-slate-600">{member.role}</p>
                          <p className="text-[11px] text-slate-400">
                            Joined {member.joinedDate} • {member.lastActive}
                          </p>
                        </div>
                      </div>

                      {/* Three dots (...) menu */}
                      <div className="relative" ref={isMenuOpen ? menuRef : null}>
                        <button
                          type="button"
                          onClick={() => setOpenMenuId(isMenuOpen ? null : member.id)}
                          className="text-slate-400 hover:text-slate-700 p-2 rounded-lg hover:bg-slate-100 transition-colors"
                          title="More options"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>

                        {isMenuOpen && (
                          <div className="absolute right-0 top-9 z-30 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 text-xs text-slate-700 divide-y divide-slate-100 animate-in fade-in zoom-in-95 duration-100">
                            {profile.isAdmin && (
                              <div className="py-1">
                                {member.id === "m-1" ? (
                                  <div className="px-3.5 py-1.5 text-[11px] text-slate-400 italic">
                                    Primary Founder (Permanent Admin)
                                  </div>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => handleToggleAdminAction(member)}
                                    className="w-full px-3.5 py-2 text-left hover:bg-blue-50 flex items-center gap-2 text-blue-700 font-semibold"
                                  >
                                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                                    <span>
                                      {member.isAdmin ? "Remove Admin Role" : "Make Admin / Editor"}
                                    </span>
                                  </button>
                                )}

                                <button
                                  type="button"
                                  onClick={() => handleToggleCopywriterAction(member)}
                                  className="w-full px-3.5 py-2 text-left hover:bg-emerald-50 flex items-center gap-2 text-emerald-800 font-semibold"
                                >
                                  <PenTool className="w-3.5 h-3.5 text-emerald-600" />
                                  <span>
                                    {member.isCopywriter ? "Remove Copywriter" : "Assign Blog Copywriter"}
                                  </span>
                                </button>
                              </div>
                            )}

                            <div className="py-1">
                              {!isSelf ? (
                                <Link
                                  href={`/profile/messages?to=${member.username}`}
                                  className="w-full px-3.5 py-2 text-left hover:bg-slate-50 flex items-center gap-2 text-slate-700"
                                  onClick={() => setOpenMenuId(null)}
                                >
                                  <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                                  <span>Send Direct Message</span>
                                </Link>
                              ) : (
                                <Link
                                  href="/profile"
                                  className="w-full px-3.5 py-2 text-left hover:bg-slate-50 flex items-center gap-2 text-slate-700"
                                  onClick={() => setOpenMenuId(null)}
                                >
                                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                                  <span>My Profile</span>
                                </Link>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {!isSelf && (
                      <div className="pt-1">
                        <Link
                          href={`/profile/messages?to=${member.username}`}
                          className="w-full block text-center py-2 px-4 rounded border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                        >
                          Send Message
                        </Link>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-sm p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900">
                Filter Results
              </h2>
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-blue-600 hover:underline"
              >
                Reset All
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 mb-1 font-medium">Name</label>
                <input
                  type="text"
                  value={filterName}
                  onChange={(e) => setFilterName(e.target.value)}
                  placeholder="e.g. Fatima or Hamdan"
                  className="w-full px-3 py-2 border border-slate-200 rounded text-slate-800 focus:outline-none focus:border-blue-600 bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-slate-600 mb-1 font-medium">Nickname</label>
                <input
                  type="text"
                  value={filterNickname}
                  onChange={(e) => setFilterNickname(e.target.value)}
                  placeholder="e.g. dorathy"
                  className="w-full px-3 py-2 border border-slate-200 rounded text-slate-800 focus:outline-none focus:border-blue-600 bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-slate-600 mb-1 font-medium">Skills</label>
                <input
                  type="text"
                  value={filterSkills}
                  onChange={(e) => setFilterSkills(e.target.value)}
                  placeholder="e.g. Translation, Interpretation"
                  className="w-full px-3 py-2 border border-slate-200 rounded text-slate-800 focus:outline-none focus:border-blue-600 bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-slate-600 mb-1 font-medium">Location</label>
                <input
                  type="text"
                  value={filterLocation}
                  onChange={(e) => setFilterLocation(e.target.value)}
                  placeholder="e.g. Nigeria, Kenya"
                  className="w-full px-3 py-2 border border-slate-200 rounded text-slate-800 focus:outline-none focus:border-blue-600 bg-slate-50/50"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
