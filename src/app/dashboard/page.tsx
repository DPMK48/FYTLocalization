"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useMembersStore, Member } from "@/data/membersData";
import { useUserProfile } from "@/data/userProfileStore";
import { useBlogStore } from "@/data/blogStore";
import { useTestimonialsStore, Testimonial } from "@/data/testimonialsStore";
import { useSubmissionsStore, QuoteSubmission } from "@/data/submissionsStore";
import {
  User,
  MoreHorizontal,
  LayoutGrid,
  List,
  ShieldCheck,
  ShieldAlert,
  PenTool,
  MessageSquare,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  Users,
  Search,
  BookOpen,
  CheckSquare,
  Square,
  Send,
  X,
  Star,
  FileText,
  Layers,
} from "lucide-react";

export default function DashboardPage() {
  const { profile, addNotification, sendMassMessage } = useUserProfile();
  const { members, toggleAdmin, toggleCopywriter } = useMembersStore();
  const { pendingPosts } = useBlogStore();
  const { pending: pendingReviews, approveReview, rejectReview } = useTestimonialsStore();
  const { submissions, updateStatus } = useSubmissionsStore();

  const [activeTab, setActiveTab] = useState<"directory" | "reviews" | "quotes">("directory");

  const [filterName, setFilterName] = useState("");
  const [filterNickname, setFilterNickname] = useState("");
  const [filterSkills, setFilterSkills] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [sortBy, setSortBy] = useState("Admins First");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // 9.1: Mass messaging state
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [massModalOpen, setMassModalOpen] = useState(false);
  const [massText, setMassText] = useState("");

  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
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
        `${member.name} was appointed as Admin & Editorial Reviewer by ${profile.firstName}.`,
        "/dashboard",
        "admin"
      );
      showToast(`${member.name} has been promoted to Admin & Editor!`);
    } else {
      addNotification(
        `${member.name}'s Admin privileges were removed by ${profile.firstName}.`,
        "/dashboard",
        "admin"
      );
      showToast(`${member.name} is no longer an Admin.`);
    }
  };

  const handleToggleCopywriterAction = (member: Member) => {
    const newStatus = toggleCopywriter(member.id);
    setOpenMenuId(null);

    if (newStatus) {
      addNotification(
        `${member.name} was designated as Lead Blog Copywriter under Admin supervision.`,
        "/profile/posts",
        "system"
      );
      showToast(`${member.name} is now designated as Lead Blog Copywriter.`);
    } else {
      showToast(`${member.name}'s copywriter designation was removed.`);
    }
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

  // 9.1: Selection Handlers
  const toggleSelectMember = (username: string) => {
    setSelectedMembers((prev) =>
      prev.includes(username) ? prev.filter((u) => u !== username) : [...prev, username]
    );
  };

  const handleSelectAll = () => {
    if (selectedMembers.length === filteredMembers.length) {
      setSelectedMembers([]);
    } else {
      setSelectedMembers(filteredMembers.map((m) => m.username));
    }
  };

  // Reset mass messaging state if not admin
  useEffect(() => {
    if (!profile.isAdmin) {
      setMassModalOpen(false);
      setSelectedMembers([]);
    }
  }, [profile.isAdmin]);

  const handleSendMassMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile.isAdmin || !massText.trim() || selectedMembers.length === 0) return;

    sendMassMessage(massText.trim(), selectedMembers);
    showToast(`Mass message sent to ${selectedMembers.length} member inboxes!`);
    setMassText("");
    setSelectedMembers([]);
    setMassModalOpen(false);
  };

  const adminCount = members.filter((m) => m.isAdmin).length;
  const pendingQuotesCount = submissions.filter((s) => s.status === "pending").length;

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f6f9] text-slate-800">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-6">
        
        {/* Toast Alert */}
        {toastMessage && (
          <div className="p-3.5 bg-emerald-50 text-emerald-900 border border-emerald-300 rounded-xl flex items-center justify-between text-xs font-semibold shadow-xs animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{toastMessage}</span>
            </div>
            <button onClick={() => setToastMessage(null)} className="text-emerald-700 hover:text-emerald-900">
              ✕
            </button>
          </div>
        )}

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3 flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("directory")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === "directory"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Members ({members.length})</span>
            </button>

            {/* 7.3: Review Moderation Tab */}
            <button
              onClick={() => setActiveTab("reviews")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 relative ${
                activeTab === "reviews"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Testimonials</span>
              {pendingReviews.length > 0 && (
                <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {pendingReviews.length}
                </span>
              )}
            </button>

            {/* 4.5: Quote Submissions Tab */}
            <button
              onClick={() => setActiveTab("quotes")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 relative ${
                activeTab === "quotes"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-blue-500" />
              <span>Quotes</span>
              {pendingQuotesCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {pendingQuotesCount}
                </span>
              )}
            </button>
          </div>

          <Link href="/profile" className="text-xs text-blue-600 font-bold hover:underline flex items-center gap-1">
            <span>My Profile</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>

        {/* Editorial CMS Review Queue Banner for Admins */}
        {profile.isAdmin && pendingPosts.length > 0 && (
          <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                  Admin Action Required: {pendingPosts.length} Blog Draft{pendingPosts.length > 1 ? "s" : ""} Pending Approval
                </h2>
                <p className="text-xs text-amber-800">
                  Staff writers have submitted drafts awaiting your review before they go live on the public website.
                </p>
              </div>
            </div>
            <Link
              href="/profile/posts"
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold whitespace-nowrap transition-colors"
            >
              Review & Publish Drafts →
            </Link>
          </div>
        )}

        {/* Quick Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Total Members
            </span>
            <span className="text-2xl font-extrabold text-slate-900 mt-0.5 block">
              {members.length}
            </span>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
            <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider block">
              Admins / Editors
            </span>
            <span className="text-2xl font-extrabold text-blue-700 mt-0.5 block">
              {adminCount}
            </span>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
            <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider block">
              Pending Reviews
            </span>
            <span className="text-2xl font-extrabold text-amber-600 mt-0.5 block">
              {pendingReviews.length}
            </span>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
            <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider block">
              Active Quote Requests
            </span>
            <span className="text-2xl font-extrabold text-emerald-700 mt-0.5 block">
              {submissions.length}
            </span>
          </div>
        </div>

        {/* ================= TAB 1: MEMBERS DIRECTORY ================= */}
        {activeTab === "directory" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Main Column: Members Directory */}
            <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Members & Staff Directory
                  </h2>
                  <p className="text-xs text-slate-500">
                    Manage team roles, admin permissions, and direct mass communications.
                  </p>
                </div>

                {/* 9.1: Mass message button (Admin Only) */}
                {profile.isAdmin && (
                  <button
                    type="button"
                    onClick={() => {
                      if (selectedMembers.length === 0) {
                        showToast("Please check at least one member to message.");
                      } else {
                        setMassModalOpen(true);
                      }
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                      selectedMembers.length > 0
                        ? "bg-blue-600 text-white shadow-md hover:bg-blue-700"
                        : "bg-slate-100 text-slate-400 cursor-not-allowed"
                    }`}
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Message Selected ({selectedMembers.length})</span>
                  </button>
                )}
              </div>

              {/* Sort and View Bar with 9.1 Select All */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 text-xs gap-3 flex-wrap">
                <div className="flex items-center gap-3">
                  {profile.isAdmin && (
                    <>
                      <button
                        type="button"
                        onClick={handleSelectAll}
                        className="flex items-center gap-1.5 font-bold text-slate-700 hover:text-blue-600"
                      >
                        {selectedMembers.length === filteredMembers.length && filteredMembers.length > 0 ? (
                          <CheckSquare className="w-4 h-4 text-blue-600" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-400" />
                        )}
                        <span>Select All ({filteredMembers.length})</span>
                      </button>

                      <span className="text-slate-400">|</span>
                    </>
                  )}

                  <span className="text-slate-500 text-[11px]">
                    Showing <strong>{filteredMembers.length}</strong> registered members
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-2.5 py-1.5 border border-slate-200 rounded-lg text-slate-600 bg-white font-medium focus:outline-none"
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
                  const isChecked = selectedMembers.includes(member.username);
                  const isMenuOpen = openMenuId === member.id;

                  return (
                    <div
                      key={member.id}
                      className={`py-4 first:pt-2 space-y-3 ${
                        viewMode === "grid" ? "p-4 border border-slate-200 rounded-2xl bg-slate-50/50" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between relative">
                        <div className="flex items-center gap-3">
                          {/* 9.1 Checkbox (Admin Only) */}
                          {profile.isAdmin && (
                            <button
                              type="button"
                              onClick={() => toggleSelectMember(member.username)}
                              className="text-slate-400 hover:text-blue-600 shrink-0"
                              title="Select member"
                            >
                              {isChecked ? (
                                <CheckSquare className="w-4 h-4 text-blue-600" />
                              ) : (
                                <Square className="w-4 h-4 text-slate-300" />
                              )}
                            </button>
                          )}

                          {/* Avatar */}
                          <div className="relative shrink-0">
                            <div className="w-11 h-11 rounded-full bg-[#f1f3f7] flex items-center justify-center text-slate-400 border border-slate-200 overflow-hidden relative">
                              <User className="w-5 h-5" />
                            </div>
                            {member.isOnline && (
                              <span
                                className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-amber-400 border-2 border-white animate-pulse"
                                title="Active status"
                              />
                            )}
                          </div>

                          {/* Member Meta */}
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-2 flex-wrap">
                              {member.username === profile.nickname ? (
                                <Link
                                  href="/profile"
                                  className="text-sm font-bold text-blue-600 hover:underline flex items-center gap-1.5"
                                  title="View Your Profile"
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
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                                  <ShieldCheck className="w-3 h-3 text-blue-600" />
                                  Admin
                                </span>
                              )}

                              {member.isCopywriter && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                                  <PenTool className="w-3 h-3 text-emerald-600" />
                                  Copywriter
                                </span>
                              )}
                            </div>

                            <p className="text-xs text-slate-600">
                              {member.role}
                            </p>

                            <p className="text-[11px] text-slate-400">
                              {member.location} • {member.lastActive}
                            </p>
                          </div>
                        </div>

                        {/* Actions: Direct message for other users & dropdown */}
                        <div className="flex items-center gap-2">
                          {member.username !== profile.nickname && (
                            <Link
                              href={`/profile/messages?to=${member.username}`}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors"
                              title={`Send message to ${member.name}`}
                            >
                              <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                              <span className="hidden sm:inline">Send Message</span>
                            </Link>
                          )}

                          {/* Dropdown Menu */}
                          <div className="relative" ref={isMenuOpen ? menuRef : null}>
                          <button
                            type="button"
                            onClick={() => setOpenMenuId(isMenuOpen ? null : member.id)}
                            className="text-slate-400 hover:text-slate-700 p-2 rounded-lg hover:bg-slate-100 transition-colors"
                            title="More member actions"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </button>

                          {isMenuOpen && (
                            <div className="absolute right-0 top-9 z-30 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 text-xs text-slate-700 divide-y divide-slate-100">
                              <div className="py-1">
                                <Link
                                  href={`/profile/messages?to=${member.username}`}
                                  className="w-full px-3.5 py-2 text-left hover:bg-slate-50 flex items-center gap-2 text-slate-700"
                                >
                                  <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                                  <span>Direct Message</span>
                                </Link>
                              </div>

                              {profile.isAdmin && (
                                <div className="py-1">
                                  {member.id !== "m-1" && (
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
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
                })}
              </div>
            </div>

            {/* Sidebar Filters */}
            <div className="lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4 text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                  Filter Directory
                </span>
                <button onClick={handleReset} className="text-blue-600 hover:underline text-[11px]">
                  Reset
                </button>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Search Name</label>
                <input
                  type="text"
                  value={filterName}
                  onChange={(e) => setFilterName(e.target.value)}
                  placeholder="e.g. Fatima, Hamdan"
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Filter by Skill</label>
                <input
                  type="text"
                  value={filterSkills}
                  onChange={(e) => setFilterSkills(e.target.value)}
                  placeholder="e.g. Translation, Transcription"
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Filter by Location</label>
                <input
                  type="text"
                  value={filterLocation}
                  onChange={(e) => setFilterLocation(e.target.value)}
                  placeholder="e.g. Nigeria, Kenya, Ghana"
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="pt-2 border-t border-slate-100">
                <span className="text-[11px] font-bold text-slate-400 block mb-2 uppercase">
                  Quick Actions
                </span>
                <Link
                  href="/profile/messages"
                  className="block w-full text-center py-2 px-3 rounded-xl bg-blue-50 text-blue-700 font-bold hover:bg-blue-100 transition-colors"
                >
                  Open Messaging Hub →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: TESTIMONIALS REVIEW QUEUE ================= */}
        {activeTab === "reviews" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Client Testimonials Moderation Desk
                </h2>
                <p className="text-xs text-slate-500">
                  Verify, approve, or reject client feedback before it goes live on the website.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200">
                {pendingReviews.length} Pending Approval
              </span>
            </div>

            {pendingReviews.length === 0 ? (
              <div className="py-12 text-center text-slate-400 space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                <p className="text-sm font-bold text-slate-700">Review Queue is Clear</p>
                <p className="text-xs">All submitted client testimonials have been moderated.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pendingReviews.map((rev: Testimonial) => (
                  <div
                    key={rev.id}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1 text-amber-500">
                          {[...Array(rev.rating || 5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <span className="text-[10px] text-slate-400">{rev.createdAt}</span>
                      </div>

                      <p className="text-xs font-medium text-slate-700 italic mb-3">
                        &ldquo;{rev.content}&rdquo;
                      </p>

                      <div className="text-xs">
                        <strong className="text-slate-900 block">{rev.name}</strong>
                        <span className="text-slate-500">{rev.role}, {rev.company}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          rejectReview(rev.id);
                          showToast(`Review by ${rev.name} was rejected.`);
                        }}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => {
                          approveReview(rev.id);
                          showToast(`Review by ${rev.name} approved and is now live!`);
                        }}
                        className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-xs"
                      >
                        Approve & Publish
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 3: QUOTE SUBMISSIONS QUEUE ================= */}
        {activeTab === "quotes" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Quote Requests & Intake Leads
                </h2>
                <p className="text-xs text-slate-500">
                  Review client project briefs from the website and send customized proposals.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200">
                {submissions.length} Total Submissions
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {submissions.map((sub: QuoteSubmission) => (
                <div key={sub.id} className="py-4 space-y-2 text-xs">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        sub.category === "ai-data" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
                      }`}>
                        {sub.category === "ai-data" ? "AI Data" : "Localization"}
                      </span>
                      <h3 className="font-bold text-slate-900 text-sm">{sub.service}</h3>
                      <span className="text-slate-400">• {sub.createdAt}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        sub.status === "pending"
                          ? "bg-amber-100 text-amber-800"
                          : sub.status === "reviewed"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-emerald-100 text-emerald-800"
                      }`}>
                        {sub.status.toUpperCase()}
                      </span>
                      <button
                        onClick={() => {
                          const nextStatus = sub.status === "pending" ? "reviewed" : sub.status === "reviewed" ? "responded" : "pending";
                          updateStatus(sub.id, nextStatus);
                        }}
                        className="text-blue-600 hover:underline text-[11px] font-semibold"
                      >
                        Change Status
                      </button>
                    </div>
                  </div>

                  {/* Metadata Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Client</span>
                      <strong className="text-slate-800">{sub.fullName}</strong> ({sub.email})
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Volume / Scope</span>
                      <span className="text-slate-800">{sub.volume || "Unspecified"}</span>
                    </div>
                    <div>
                      {sub.category === "localization" ? (
                        <>
                          <span className="text-slate-400 block text-[10px] uppercase font-bold">Language Pair</span>
                          <span className="text-slate-800">{sub.sourceLang || "English"} → {sub.targetLang || "Any"}</span>
                        </>
                      ) : (
                        <>
                          <span className="text-slate-400 block text-[10px] uppercase font-bold">Target Region & Type</span>
                          <span className="text-slate-800">{sub.targetRegion || "Any"} • {sub.dataType}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {sub.notes && (
                    <p className="text-slate-600 italic bg-white p-2 rounded border border-slate-100">
                      &ldquo;{sub.notes}&rdquo;
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* 9.1: Mass Message Compose Modal (Admin Only) */}
      {massModalOpen && profile.isAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <button
              onClick={() => setMassModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-slate-900 mb-1">
              Send Mass Message to {selectedMembers.length} Members
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Each member will receive this message as an individual private message in their own inbox.
            </p>

            <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto mb-4 p-2 bg-slate-50 rounded-xl border border-slate-200">
              {selectedMembers.map((u) => {
                const member = members.find((m) => m.username === u);
                return (
                  <span key={u} className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[11px] font-semibold">
                    {member?.name || u}
                  </span>
                );
              })}
            </div>

            <form onSubmit={handleSendMassMessage} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Message Content *</label>
                <textarea
                  rows={4}
                  required
                  value={massText}
                  onChange={(e) => setMassText(e.target.value)}
                  placeholder="Type your message to all selected members..."
                  className="w-full p-3 rounded-xl border border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none resize-none"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setMassModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-sm flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send to {selectedMembers.length} Members</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
