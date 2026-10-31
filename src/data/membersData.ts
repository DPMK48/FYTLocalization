export interface Member {
  id: string;
  username: string;
  name: string;
  email?: string;
  role: string;
  avatarBg: string;
  avatarText: string;
  joinedDate: string;
  lastActive: string;
  isOnline: boolean;
  location: string;
  nativeLanguage: string;
  languagePairs: string[];
  skills: string[];
  bio: string;
  completedJobs: number;
  rating: number;
  badge: "Vetted Pro" | "Senior Linguist" | "Verified Member" | "Admin";
  isAdmin: boolean;
  isCopywriter?: boolean;
}

export const INITIAL_MEMBERS: Member[] = [
  {
    id: "m-1",
    username: "adminfytlocalization-com",
    name: "Fatima Yusuf",
    role: "Co-founder",
    avatarBg: "bg-blue-600",
    avatarText: "FY",
    joinedDate: "Aug 2026",
    lastActive: "Active now",
    isOnline: true,
    location: "Bauchi State, Nigeria",
    nativeLanguage: "Hausa & English",
    languagePairs: ["Hausa ↔ English", "Arabic → Hausa", "French → English"],
    skills: ["Translation", "AI Localization", "Transcription", "Interpretation"],
    bio: "Linguist and founder of FYTLOCALIZATION. Passionate about bringing African languages into modern AI training sets and cross-border digital platforms. Over 10+ years coordinating enterprise language solutions across Africa and the Middle East.",
    completedJobs: 480,
    rating: 5.0,
    badge: "Admin",
    isAdmin: true,
  },
];

export const MEMBERS = INITIAL_MEMBERS;

const STORAGE_KEY = "fyt_members_store_v3";
const EVENT_KEY = "fyt_members_updated";

export function getStoredMembers(): Member[] {
  if (typeof window === "undefined") return INITIAL_MEMBERS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_MEMBERS));
      return INITIAL_MEMBERS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_MEMBERS;
  } catch {
    return INITIAL_MEMBERS;
  }
}

export function saveStoredMembers(members: Member[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
    window.dispatchEvent(new Event(EVENT_KEY));
  } catch (err) {
    console.error("Failed to save members", err);
  }
}

// React Hook for dynamic member management
import { useState, useEffect, useCallback } from "react";

export function useMembersStore() {
  const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS);

  const sync = useCallback(() => {
    setMembers(getStoredMembers());
  }, []);

  useEffect(() => {
    sync();

    // Fetch live approved members from database
    fetch("/api/members")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.members) && data.members.length > 0) {
          const liveMembers: Member[] = data.members.map((u: any, idx: number) => ({
            id: u._id || `m-${idx + 1}`,
            username: u.username,
            name: u.name,
            email: u.email,
            role: u.role === "admin" ? "Co-founder" : (u.specialty || u.role || "Linguist & Specialist"),
            avatarBg: u.avatarBg || "bg-blue-600",
            avatarText: u.avatarText || u.name?.slice(0, 2).toUpperCase() || "MB",
            joinedDate: u.createdAt ? new Date(u.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "Aug 2026",
            lastActive: u.isOnline ? "Active now" : "Recently",
            isOnline: u.isOnline ?? true,
            location: u.location || "Bauchi State, Nigeria",
            nativeLanguage: u.nativeLanguage || "Hausa & English",
            languagePairs: u.languagePairs || [],
            skills: u.skills || (u.specialty ? [u.specialty] : ["Translation"]),
            bio: u.bio || "",
            completedJobs: u.completedJobs || 0,
            rating: u.rating || 5.0,
            badge: u.role === "admin" || u.isAdmin ? "Admin" : (u.badge || "Verified Member"),
            isAdmin: u.role === "admin" || u.isAdmin === true,
            isCopywriter: u.isCopywriter === true,
          }));

          saveStoredMembers(liveMembers);
          setMembers(liveMembers);
        }
      })
      .catch((err) => console.warn("Live members fetch error", err));

    const handleUpdate = () => sync();
    window.addEventListener(EVENT_KEY, handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener(EVENT_KEY, handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, [sync]);

  const toggleAdmin = (memberId: string): boolean => {
    // Fatima Yusuf is permanently admin
    if (memberId === "m-1") return true;

    const current = getStoredMembers();
    let newAdminStatus = false;
    const updated = current.map((m) => {
      if (m.id === memberId) {
        newAdminStatus = !m.isAdmin;
        return {
          ...m,
          isAdmin: newAdminStatus,
          badge: newAdminStatus ? ("Admin" as const) : ("Verified Member" as const),
        };
      }
      return m;
    });

    saveStoredMembers(updated);
    setMembers(updated);
    return newAdminStatus;
  };

  const toggleCopywriter = (memberId: string): boolean => {
    const current = getStoredMembers();
    let status = false;
    const updated = current.map((m) => {
      if (m.id === memberId) {
        status = !m.isCopywriter;
        return {
          ...m,
          isCopywriter: status,
        };
      }
      return m;
    });

    saveStoredMembers(updated);
    setMembers(updated);
    return status;
  };

  return {
    members,
    toggleAdmin,
    toggleCopywriter,
  };
}
