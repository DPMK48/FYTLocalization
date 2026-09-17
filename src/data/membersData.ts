export interface Member {
  id: string;
  username: string;
  name: string;
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
    role: "Founder & Lead Linguistic Director",
    avatarBg: "bg-blue-600",
    avatarText: "FY",
    joinedDate: "Aug 2026",
    lastActive: "Active now",
    isOnline: true,
    location: "Abuja, Nigeria",
    nativeLanguage: "Hausa & English",
    languagePairs: ["Hausa ↔ English", "Arabic → Hausa", "French → English"],
    skills: ["Translation", "AI Localization", "Transcription", "Interpretation"],
    bio: "Linguist and founder of FYTLOCALIZATION. Passionate about bringing African languages into modern AI training sets and cross-border digital platforms. Over 10+ years coordinating enterprise language solutions across Africa and the Middle East.",
    completedJobs: 480,
    rating: 5.0,
    badge: "Admin",
    isAdmin: true,
  },
  {
    id: "m-2",
    username: "hamdan",
    name: "Hamdan",
    role: "Senior African Languages Specialist",
    avatarBg: "bg-emerald-600",
    avatarText: "HA",
    joinedDate: "Jun 2024",
    lastActive: "Active 2 hours ago",
    isOnline: true,
    location: "Nairobi, Kenya",
    nativeLanguage: "Swahili & English",
    languagePairs: ["Swahili ↔ English", "Arabic → Swahili", "Somali → English"],
    skills: ["Translation", "Interpretation", "Subtitles"],
    bio: "Specialized in East African lingua francas, simultaneous conference interpretation, and media subtitling. Expert in Swahili dialect variations and Bantu linguistic morphology.",
    completedJobs: 312,
    rating: 4.9,
    badge: "Senior Linguist",
    isAdmin: false,
    isCopywriter: true,
  },
  {
    id: "m-3",
    username: "dorathy",
    name: "Dorathy",
    role: "Public Policy & Legal Translator",
    avatarBg: "bg-purple-600",
    avatarText: "DO",
    joinedDate: "Aug 2026",
    lastActive: "Active a week ago",
    isOnline: false,
    location: "Lagos, Nigeria",
    nativeLanguage: "Yoruba & English",
    languagePairs: ["Yoruba ↔ English", "Igbo → English"],
    skills: ["Translation", "Transcription", "Localization/AI Services"],
    bio: "Legal terminology specialist and public sector communications consultant. Experienced in civic tax education translation, fintech onboarding flows, and court transcriptions.",
    completedJobs: 195,
    rating: 4.95,
    badge: "Vetted Pro",
    isAdmin: false,
  },
  {
    id: "m-4",
    username: "spectre",
    name: "Spectre",
    role: "AI Localization & Speech Annotator",
    avatarBg: "bg-indigo-600",
    avatarText: "SP",
    joinedDate: "Aug 2026",
    lastActive: "Active 2 weeks ago",
    isOnline: false,
    location: "Accra, Ghana",
    nativeLanguage: "Twi & English",
    languagePairs: ["Twi ↔ English", "French → English", "Ewe → English"],
    skills: ["Localization/AI Services", "Transcription", "Subtitles"],
    bio: "Machine learning post-editor and speech corpora curator. Works extensively on acoustic model training, accent annotation, and automated subtitle synchronization.",
    completedJobs: 142,
    rating: 4.88,
    badge: "Vetted Pro",
    isAdmin: false,
  },
  {
    id: "m-5",
    username: "kelvin1",
    name: "Kelvin",
    role: "Audio Transcription & Media Captions Expert",
    avatarBg: "bg-amber-600",
    avatarText: "KE",
    joinedDate: "Sep 2026",
    lastActive: "Active 3 days ago",
    isOnline: false,
    location: "Johannesburg, South Africa",
    nativeLanguage: "Zulu & English",
    languagePairs: ["Zulu ↔ English", "Xhosa → English", "Afrikaans → English"],
    skills: ["Transcription", "Subtitles", "Translation"],
    bio: "High-speed multi-speaker audio transcriber and SDH captioner. Certified in broadcast subtitles and Southern African regional dialect nuances.",
    completedJobs: 98,
    rating: 4.9,
    badge: "Verified Member",
    isAdmin: false,
  },
  {
    id: "m-6",
    username: "lawan-dadinkowa",
    name: "Lawan Dadinkowa",
    role: "Media Localization Partner & Advisor",
    avatarBg: "bg-teal-600",
    avatarText: "LD",
    joinedDate: "Jul 2024",
    lastActive: "Active yesterday",
    isOnline: true,
    location: "Kano, Nigeria",
    nativeLanguage: "Hausa & English",
    languagePairs: ["Hausa ↔ English", "Fulani → Hausa"],
    skills: ["Interpretation", "Translation", "Subtitles"],
    bio: "CEO of Dadinkowa Media and enterprise translation partner with FYT. Longstanding collaborator on high-volume broadcast transcription, radio dubbing, and regional media syndication.",
    completedJobs: 240,
    rating: 5.0,
    badge: "Senior Linguist",
    isAdmin: false,
  },
];

export const MEMBERS = INITIAL_MEMBERS;

const STORAGE_KEY = "fyt_members_store";
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
