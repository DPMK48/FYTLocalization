"use client";

import { useState, useEffect } from "react";

export interface QuoteSubmission {
  id: string;
  category: "localization" | "ai-data";
  service: string;
  subject: string;
  createdAt: string;
  // Common fields
  fullName: string;
  email: string;
  volume: string; // Estimated volume or duration
  notes: string;
  // Localization specific
  sourceLang?: string;
  targetLang?: string;
  // AI Data specific
  dataType?: string; // selfie images, general images, video, audio, etc.
  targetRegion?: string; // free-text region input
  collectionTool?: string; // mobile app, conventional tool, etc.
  status: "pending" | "reviewed" | "responded";
}

const STORAGE_KEY = "fyt_quote_submissions";
const EVENT_KEY = "fyt_quote_submissions_updated";

export const INITIAL_SUBMISSIONS: QuoteSubmission[] = [
  {
    id: "quote-1",
    category: "localization",
    service: "Translation",
    subject: "[Quote Request - Localization Services] Translation",
    createdAt: "2026-10-17 14:32",
    fullName: "Musa Al-Hassan",
    email: "musa@africadynamics.org",
    volume: "15,000 words",
    notes: "Agricultural policy manuals translation from English to Hausa and Swahili. Requires certified review.",
    sourceLang: "English",
    targetLang: "Hausa, Swahili",
    status: "reviewed",
  },
  {
    id: "quote-2",
    category: "ai-data",
    service: "Audio Collection",
    subject: "[Quote Request - AI Data Services] Audio Collection",
    createdAt: "2026-10-18 09:15",
    fullName: "Elena Rostova",
    email: "e.rostova@speechtech-labs.ai",
    volume: "120 audio hours",
    notes: "Spontaneous conversational recordings in West African English and Yoruba. 48kHz WAV with time-aligned transcripts.",
    dataType: "Audio (Spontaneous speech)",
    targetRegion: "Lagos, Ibadan, and Abuja urban centers",
    collectionTool: "Mobile recording app with noise isolation",
    status: "pending",
  },
];

export function getStoredSubmissions(): QuoteSubmission[] {
  if (typeof window === "undefined") return INITIAL_SUBMISSIONS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SUBMISSIONS));
      return INITIAL_SUBMISSIONS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_SUBMISSIONS;
  }
}

export function saveSubmission(submission: Omit<QuoteSubmission, "id" | "createdAt" | "status" | "subject">): QuoteSubmission {
  const current = getStoredSubmissions();
  const categoryLabel = submission.category === "ai-data" ? "AI Data Services" : "Localization Services";
  const newRecord: QuoteSubmission = {
    ...submission,
    id: `quote-${Date.now()}`,
    subject: `[Quote Request - ${categoryLabel}] ${submission.service}`,
    createdAt: new Date().toISOString().replace("T", " ").slice(0, 16),
    status: "pending",
  };
  const updated = [newRecord, ...current];
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event(EVENT_KEY));
  }
  return newRecord;
}

export function useSubmissionsStore() {
  const [submissions, setSubmissions] = useState<QuoteSubmission[]>(INITIAL_SUBMISSIONS);

  useEffect(() => {
    setSubmissions(getStoredSubmissions());
    const handleUpdate = () => setSubmissions(getStoredSubmissions());
    window.addEventListener(EVENT_KEY, handleUpdate);
    return () => window.removeEventListener(EVENT_KEY, handleUpdate);
  }, []);

  const updateStatus = (id: string, status: "pending" | "reviewed" | "responded") => {
    const updated = submissions.map((s) => (s.id === id ? { ...s, status } : s));
    setSubmissions(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event(EVENT_KEY));
    }
  };

  return { submissions, updateStatus, addSubmission: saveSubmission };
}
