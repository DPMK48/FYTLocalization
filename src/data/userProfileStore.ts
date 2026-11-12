"use client";

import { useState, useEffect, useCallback } from "react";
import { getStoredMembers, Member } from "./membersData";

export interface UserProfile {
  firstName: string;
  lastName: string;
  nickname: string;
  avatarUrl: string | null;
  coverUrl: string | null;
  email: string;
  role: string;
  joinedDate: string;
  lastActive: string;
  isOnline: boolean;
  nativeLanguage: string;
  languagePairs: string[];
  skills: string[];
  isAdmin: boolean;
  isCopywriter?: boolean;
  bio?: string;
  specialty?: string;
}

export interface NotificationItem {
  id: string;
  text: string;
  time: string;
  read: boolean;
  link?: string;
  type?: "approval" | "message" | "system" | "admin";
}

export interface DirectMessage {
  id: string;
  sender: string;
  recipient: string;
  text: string;
  time: string;
  isSelf: boolean;
}

export const FATIMA_PROFILE: UserProfile = {
  firstName: "Fatima",
  lastName: "Yusuf",
  nickname: "adminfytlocalization-com",
  avatarUrl: null,
  coverUrl: null,
  email: "admin@fytlocalization.com",
  role: "Co-founder",
  joinedDate: "Aug 2026",
  lastActive: "Active now",
  isOnline: true,
  nativeLanguage: "Hausa & English",
  languagePairs: ["Hausa ↔ English", "Arabic → Hausa", "French → English"],
  skills: ["Translation", "AI Localization", "Transcription", "Interpretation"],
  isAdmin: true,
};

export const DEFAULT_NOTIFICATIONS: NotificationItem[] = [];

export const DEFAULT_MESSAGES: DirectMessage[] = [];

export function getProfileForMember(username: string): UserProfile {
  const members = getStoredMembers();
  const member =
    members.find((m) => m.username.toLowerCase() === username.toLowerCase()) ||
    members[0];

  const nameParts = member.name.split(" ");
  const firstName = nameParts[0] || member.name;
  const lastName = nameParts.slice(1).join(" ") || "";

  return {
    firstName,
    lastName,
    nickname: member.username,
    avatarUrl: null,
    coverUrl: null,
    email:
      member.username === "adminfytlocalization-com"
        ? "admin@fytlocalization.com"
        : `${member.username}@fytlocalization.com`,
    role: member.role,
    joinedDate: member.joinedDate,
    lastActive: member.lastActive,
    isOnline: member.isOnline,
    nativeLanguage: member.nativeLanguage,
    languagePairs: member.languagePairs,
    skills: member.skills,
    isAdmin: member.isAdmin,
    isCopywriter: member.isCopywriter,
  };
}

export function getNotificationsForMember(username?: string): NotificationItem[] {
  return [];
}

export function getMessagesForMember(username?: string): DirectMessage[] {
  return [];
}

// LocalStorage helpers
export function getStoredProfile(): UserProfile {
  if (typeof window === "undefined") return FATIMA_PROFILE;
  try {
    const raw = localStorage.getItem("fyt_user_profile");
    if (raw) {
      const parsed: UserProfile = JSON.parse(raw);
      // Migrate Fatima Yusuf's role to Co-founder if an old cached title exists
      if (
        parsed.nickname === "adminfytlocalization-com" ||
        parsed.email === "admin@fytlocalization.com" ||
        parsed.isAdmin ||
        parsed.role === "Founder & Lead Linguistic Director"
      ) {
        parsed.role = "Co-founder";
      } else if (parsed.specialty) {
        parsed.role = parsed.specialty;
      }
      return parsed;
    }
    const loggedUsername = localStorage.getItem("fyt_logged_in_username");
    if (loggedUsername) {
      return getProfileForMember(loggedUsername);
    }
    return FATIMA_PROFILE;
  } catch {
    return FATIMA_PROFILE;
  }
}

export function saveStoredProfile(partial: Partial<UserProfile>): UserProfile {
  if (typeof window === "undefined") return FATIMA_PROFILE;
  try {
    const current = getStoredProfile();
    const updated = { ...current, ...partial };
    
    // Always enforce Co-founder for Fatima / Admin
    if (
      updated.nickname === "adminfytlocalization-com" ||
      updated.email === "admin@fytlocalization.com" ||
      updated.isAdmin ||
      updated.role === "Founder & Lead Linguistic Director"
    ) {
      updated.role = "Co-founder";
    } else if (updated.specialty) {
      updated.role = updated.specialty;
    }

    try {
      localStorage.setItem("fyt_user_profile", JSON.stringify(updated));
    } catch (quotaErr) {
      console.warn("Storage quota exceeded, storing in sessionStorage", quotaErr);
      sessionStorage.setItem("fyt_user_profile", JSON.stringify(updated));
    }

    window.dispatchEvent(new Event("fyt_profile_updated"));
    return updated;
  } catch {
    return FATIMA_PROFILE;
  }
}

export function getStoredNotifications(): NotificationItem[] {
  if (typeof window === "undefined") return DEFAULT_NOTIFICATIONS;
  try {
    const raw = localStorage.getItem("fyt_user_notifications_v2");
    if (!raw) return DEFAULT_NOTIFICATIONS;
    return JSON.parse(raw);
  } catch {
    return DEFAULT_NOTIFICATIONS;
  }
}

export function saveStoredNotifications(notifs: NotificationItem[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("fyt_user_notifications_v2", JSON.stringify(notifs));
    window.dispatchEvent(new Event("fyt_profile_updated"));
  } catch {
    // Ignore error
  }
}

export function getStoredMessages(): DirectMessage[] {
  if (typeof window === "undefined") return DEFAULT_MESSAGES;
  try {
    const raw = localStorage.getItem("fyt_user_messages_v2");
    if (!raw) return DEFAULT_MESSAGES;
    return JSON.parse(raw);
  } catch {
    return DEFAULT_MESSAGES;
  }
}

export function saveStoredMessages(msgs: DirectMessage[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("fyt_user_messages_v2", JSON.stringify(msgs));
    window.dispatchEvent(new Event("fyt_profile_updated"));
  } catch {
    // Ignore error
  }
}

export function switchActiveMember(username: string): UserProfile {
  if (typeof window === "undefined") return FATIMA_PROFILE;
  try {
    const newProfile = getProfileForMember(username);
    const newNotifs = getNotificationsForMember(username);
    const newMsgs = getMessagesForMember(username);

    localStorage.setItem("fyt_user_profile", JSON.stringify(newProfile));
    localStorage.setItem("fyt_user_notifications", JSON.stringify(newNotifs));
    localStorage.setItem("fyt_user_messages", JSON.stringify(newMsgs));
    localStorage.setItem("fyt_logged_in_username", username);

    window.dispatchEvent(new Event("fyt_profile_updated"));
    return newProfile;
  } catch {
    return FATIMA_PROFILE;
  }
}

// Unified React hook for real-time synchronization
export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile>(FATIMA_PROFILE);
  const [notifications, setNotifications] = useState<NotificationItem[]>(DEFAULT_NOTIFICATIONS);
  const [messages, setMessages] = useState<DirectMessage[]>(DEFAULT_MESSAGES);
  const [activeNowString, setActiveNowString] = useState("Active now");

  const syncState = useCallback(() => {
    setProfile(getStoredProfile());
    setNotifications(getStoredNotifications());
    setMessages(getStoredMessages());
  }, []);

  useEffect(() => {
    syncState();

    const handleUpdate = () => syncState();
    window.addEventListener("fyt_profile_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    const interval = setInterval(() => {
      setActiveNowString("Active now");
    }, 10000);

    return () => {
      window.removeEventListener("fyt_profile_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
      clearInterval(interval);
    };
  }, [syncState]);

  // Sync messages from MongoDB Atlas periodically
  useEffect(() => {
    if (!profile.nickname) return;

    const fetchLiveMessages = () => {
      fetch(`/api/messages?user=${encodeURIComponent(profile.nickname)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && Array.isArray(data.messages)) {
            const mapped: DirectMessage[] = data.messages.map((m: any) => ({
              id: m._id || `msg-${m.createdAt}`,
              sender:
                m.sender.toLowerCase() === profile.nickname.toLowerCase()
                  ? "You"
                  : m.sender,
              recipient: m.recipient,
              text: m.text,
              time: m.createdAt
                ? new Date(m.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                : "Recent",
              isSelf: m.sender.toLowerCase() === profile.nickname.toLowerCase(),
            }));
            saveStoredMessages(mapped);
            setMessages(mapped);
          }
        })
        .catch(() => {});
    };

    fetchLiveMessages();
    const msgTimer = setInterval(fetchLiveMessages, 4000);
    return () => clearInterval(msgTimer);
  }, [profile.nickname]);

  const updateProfile = (partial: Partial<UserProfile>) => {
    const updated = saveStoredProfile(partial);
    setProfile(updated);
  };

  const markAllNotificationsAsRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    saveStoredNotifications(updated);
    setNotifications(updated);
  };

  const addNotification = (
    text: string,
    link?: string,
    type: NotificationItem["type"] = "system"
  ) => {
    const newItem: NotificationItem = {
      id: `notif-${Date.now()}`,
      text,
      time: "Just now",
      read: false,
      link,
      type,
    };
    const updated = [newItem, ...getStoredNotifications()];
    saveStoredNotifications(updated);
    setNotifications(updated);
  };

  const sendMessage = async (text: string, recipient: string) => {
    if (!text.trim() || !recipient) return;

    const newMsg: DirectMessage = {
      id: `msg-${Date.now()}`,
      sender: "You",
      recipient,
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isSelf: true,
    };
    const updated = [...getStoredMessages(), newMsg];
    saveStoredMessages(updated);
    setMessages(updated);

    try {
      await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender: profile.nickname,
          recipient,
          text: text.trim(),
        }),
      });
    } catch (err) {
      console.warn("Live message send error", err);
    }
  };

  const sendMassMessage = async (text: string, recipients: string[]) => {
    if (!profile.isAdmin) {
      console.warn("Unauthorized: only users with admin role have access to mass messaging.");
      return 0;
    }
    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const newMessages: DirectMessage[] = recipients.map((recipient, i) => ({
      id: `msg-${Date.now()}-${i}`,
      sender: "You",
      recipient,
      text: text.trim(),
      time: timestamp,
      isSelf: true,
    }));
    const updated = [...getStoredMessages(), ...newMessages];
    saveStoredMessages(updated);
    setMessages(updated);

    try {
      await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender: profile.nickname,
          recipients,
          text: text.trim(),
        }),
      });
    } catch (err) {
      console.warn("Live mass message send error", err);
    }

    return newMessages.length;
  };

  const selectMember = (username: string) => {
    const updated = switchActiveMember(username);
    setProfile(updated);
    setNotifications(getNotificationsForMember(username));
    setMessages(getMessagesForMember(username));
  };

  return {
    profile,
    updateProfile,
    notifications,
    markAllNotificationsAsRead,
    addNotification,
    messages,
    sendMessage,
    sendMassMessage,
    selectMember,
    activeNowString,
  };
}
