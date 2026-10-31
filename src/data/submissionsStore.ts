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

const STORAGE_KEY = "fyt_quote_submissions_v2";
const EVENT_KEY = "fyt_quote_submissions_updated";

export const INITIAL_SUBMISSIONS: QuoteSubmission[] = [];

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
