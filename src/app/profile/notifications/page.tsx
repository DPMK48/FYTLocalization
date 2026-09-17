"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProfileHeader from "@/components/ProfileHeader";
import { useUserProfile, saveStoredNotifications, NotificationItem } from "@/data/userProfileStore";
import {
  Bell,
  CheckCheck,
  PlusCircle,
  ShieldCheck,
  PenTool,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  Trash2,
} from "lucide-react";

export default function ProfileNotificationsPage() {
  const { notifications, markAllNotificationsAsRead } = useUserProfile();
  const [filterType, setFilterType] = useState<"all" | "unread">("all");
  const [newNotifText, setNewNotifText] = useState("");

  const handleMarkOne = (id: string) => {
    const updated = notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
    saveStoredNotifications(updated);
  };

  const handleDeleteOne = (id: string) => {
    const updated = notifications.filter((n) => n.id !== id);
    saveStoredNotifications(updated);
  };

  const handleAddNotification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNotifText.trim()) return;

    const newItem: NotificationItem = {
      id: `notif-${Date.now()}`,
      text: newNotifText.trim(),
      time: "Just now",
      read: false,
      type: "system",
    };
    saveStoredNotifications([newItem, ...notifications]);
    setNewNotifText("");
  };

  const filtered = notifications.filter((n) => (filterType === "unread" ? !n.read : true));

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-6 sm:py-10">
        <ProfileHeader currentTab="Notifications" />

        <div className="bg-white border-x border-b border-slate-200 px-6 sm:px-10 py-6 space-y-6 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">Live Alerts & Notifications</h2>
              <p className="text-slate-500">
                Editorial submissions, admin appointment alerts, and direct communications.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex bg-slate-100 p-0.5 rounded-lg text-xs font-semibold">
                <button
                  onClick={() => setFilterType("all")}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    filterType === "all" ? "bg-white shadow-xs text-slate-900" : "text-slate-600"
                  }`}
                >
                  All ({notifications.length})
                </button>
                <button
                  onClick={() => setFilterType("unread")}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    filterType === "unread" ? "bg-white shadow-xs text-blue-600" : "text-slate-600"
                  }`}
                >
                  Unread ({notifications.filter((n) => !n.read).length})
                </button>
              </div>

              <button
                onClick={markAllNotificationsAsRead}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-50 rounded transition-colors border border-blue-200"
              >
                <CheckCheck className="w-4 h-4" />
                <span>Mark all read</span>
              </button>
            </div>
          </div>

          {/* Notification List */}
          <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden max-w-3xl">
            {filtered.length === 0 ? (
              <div className="p-10 text-center text-slate-400 space-y-2">
                <Bell className="w-8 h-8 mx-auto text-slate-300" />
                <p className="font-semibold text-xs">No notifications found.</p>
              </div>
            ) : (
              filtered.map((n) => {
                const isApproval = n.type === "approval";
                const isAdminNotif = n.type === "admin";

                return (
                  <div
                    key={n.id}
                    className={`p-4 flex items-start gap-3 transition-colors ${
                      !n.read ? "bg-blue-50/40" : "hover:bg-slate-50"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        isApproval
                          ? "bg-amber-500 text-white"
                          : isAdminNotif
                          ? "bg-blue-600 text-white"
                          : !n.read
                          ? "bg-blue-600 text-white shadow-xs"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {isApproval ? (
                        <PenTool className="w-4 h-4" />
                      ) : isAdminNotif ? (
                        <ShieldCheck className="w-4 h-4" />
                      ) : (
                        <Bell className="w-4 h-4" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-xs leading-relaxed ${
                          !n.read ? "font-bold text-slate-900" : "text-slate-700 font-normal"
                        }`}
                      >
                        {n.text}
                      </p>

                      <div className="flex items-center gap-3 mt-1.5 text-[10px] text-slate-400">
                        <span>{n.time}</span>
                        {n.link && (
                          <Link
                            href={n.link}
                            className="text-blue-600 hover:underline font-semibold flex items-center gap-0.5"
                          >
                            <span>Open in Studio</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {!n.read && (
                        <button
                          onClick={() => handleMarkOne(n.id)}
                          className="p-1 text-slate-400 hover:text-blue-600"
                          title="Mark read"
                        >
                          <CheckCheck className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteOne(n.id)}
                        className="p-1 text-slate-300 hover:text-rose-500"
                        title="Delete notification"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Quick Push Test Alert */}
          <form onSubmit={handleAddNotification} className="flex gap-2 max-w-3xl pt-2">
            <input
              type="text"
              value={newNotifText}
              onChange={(e) => setNewNotifText(e.target.value)}
              placeholder="Test live alert (e.g. Swahili speech corpus verified)..."
              className="flex-1 px-3 py-2 border border-slate-300 rounded text-slate-800 focus:outline-none focus:border-blue-600"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded flex items-center gap-1.5 shadow-xs"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Add Alert</span>
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
