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
  role: "Founder & Lead Linguistic Director",
  joinedDate: "Aug 2026",
  lastActive: "Active now",
  isOnline: true,
  nativeLanguage: "Hausa & English",
  languagePairs: ["Hausa ↔ English", "Arabic → Hausa", "French → English"],
  skills: ["Translation", "AI Localization", "Transcription", "Interpretation"],
  isAdmin: true,
};

export const DEFAULT_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    text: "Hamdan submitted a blog draft 'When Language Sings, Clicks, and Changes Meaning' for your review.",
    time: "10 mins ago",
    read: false,
    link: "/profile/posts",
    type: "approval",
  },
  {
    id: "notif-2",
    text: "Your translation order #1082 was approved by QA coordinator.",
    time: "2 hours ago",
    read: false,
    type: "system",
  },
  {
    id: "notif-3",
    text: "Welcome to FYTLOCALIZATION member community.",
    time: "1 day ago",
    read: true,
    type: "system",
  },
];

export const DEFAULT_MESSAGES: DirectMessage[] = [
  {
    id: "msg-1",
    sender: "Dorathy",
    recipient: "adminfytlocalization-com",
    text: "Hi Fatima, could you check the medical glossary for the Swahili project?",
    time: "11:20 AM",
    isSelf: false,
  },
  {
    id: "msg-2",
    sender: "You",
    recipient: "dorathy",
    text: "Yes, reviewing it now. Will update you shortly.",
    time: "11:25 AM",
    isSelf: true,
  },
];

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

export function getNotificationsForMember(username: string): NotificationItem[] {
  if (username === "adminfytlocalization-com") {
    return DEFAULT_NOTIFICATIONS;
  }
  return [
    {
      id: `notif-${username}-1`,
      text: `Welcome ${username} to the FYTLOCALIZATION member portal.`,
      time: "1 hour ago",
      read: false,
      type: "system",
    },
    {
      id: `notif-${username}-2`,
      text: "New localization task guidelines posted by Lead Linguistic Director.",
      time: "Yesterday",
      read: true,
      type: "system",
    },
  ];
}

export function getMessagesForMember(username: string): DirectMessage[] {
  if (username === "adminfytlocalization-com") {
    return DEFAULT_MESSAGES;
  }
  return [
    {
      id: `msg-${username}-1`,
      sender: "Fatima Yusuf",
      recipient: username,
      text: `Hello ${username}, welcome to your active team workspace! Let me know if you need anything.`,
      time: "10:00 AM",
      isSelf: false,
    },
  ];
}

// LocalStorage helpers
export function getStoredProfile(): UserProfile {
  if (typeof window === "undefined") return FATIMA_PROFILE;
  try {
    const raw = localStorage.getItem("fyt_user_profile");
    if (raw) {
      return JSON.parse(raw);
    }
    const loggedUsername = localStorage.getItem("fyt_logged_in_username");
    if (loggedUsername) {
      return getProfileForMember(loggedUsername);
    }
    const role = localStorage.getItem("fyt_user_role");
    if (role === "member") {
      return getProfileForMember("hamdan");
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
    localStorage.setItem("fyt_user_profile", JSON.stringify(updated));
    window.dispatchEvent(new Event("fyt_profile_updated"));
    return updated;
  } catch {
    return FATIMA_PROFILE;
  }
}

export function getStoredNotifications(): NotificationItem[] {
  if (typeof window === "undefined") return DEFAULT_NOTIFICATIONS;
  try {
    const raw = localStorage.getItem("fyt_user_notifications");
    if (!raw) return DEFAULT_NOTIFICATIONS;
    return JSON.parse(raw);
  } catch {
    return DEFAULT_NOTIFICATIONS;
  }
}

export function saveStoredNotifications(notifs: NotificationItem[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("fyt_user_notifications", JSON.stringify(notifs));
    window.dispatchEvent(new Event("fyt_profile_updated"));
  } catch {
    // Ignore error
  }
}

export function getStoredMessages(): DirectMessage[] {
  if (typeof window === "undefined") return DEFAULT_MESSAGES;
  try {
    const raw = localStorage.getItem("fyt_user_messages");
    if (!raw) return DEFAULT_MESSAGES;
    return JSON.parse(raw);
  } catch {
    return DEFAULT_MESSAGES;
  }
}

export function saveStoredMessages(msgs: DirectMessage[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("fyt_user_messages", JSON.stringify(msgs));
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

  const sendMessage = (text: string, recipient: string = "dorathy") => {
    const newMsg: DirectMessage = {
      id: `msg-${Date.now()}`,
      sender: "You",
      recipient,
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isSelf: true,
    };
    const updated = [...getStoredMessages(), newMsg];
    saveStoredMessages(updated);
    setMessages(updated);

    setTimeout(() => {
      const replies = [
        `Received! Thanks for following up on this, ${profile.firstName}.`,
        `Got your message! I'm on it and will update the task tracker shortly.`,
        `Checked and agreed. Let's sync on this at our weekly editorial review.`,
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      const botMsg: DirectMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: recipient,
        recipient: profile.nickname,
        text: randomReply,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isSelf: false,
      };
      const withBot = [...getStoredMessages(), botMsg];
      saveStoredMessages(withBot);
      setMessages(withBot);
    }, 1200);
  };

  const sendMassMessage = (text: string, recipients: string[]) => {
    if (!profile.isAdmin) {
      console.warn("Unauthorized: only users with admin role have access to mass messaging.");
      return 0;
    }
    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const newMessages: DirectMessage[] = recipients.map((recipient, i) => ({
      id: `msg-${Date.now()}-${i}`,
      sender: "You",
      recipient,
      text,
      time: timestamp,
      isSelf: true,
    }));
    const updated = [...getStoredMessages(), ...newMessages];
    saveStoredMessages(updated);
    setMessages(updated);
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
