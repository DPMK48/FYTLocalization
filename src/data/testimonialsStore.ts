"use client";

import { useState, useEffect } from "react";

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number; // 1 to 5
  avatarBg?: string;
  isApproved: boolean;
  createdAt: string;
}

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "Lawan Dadinkowa",
    role: "Chief Executive Officer",
    company: "Dadinkowa Media",
    content:
      "The transcription and subtitling services were accurate, culturally authentic, and delivered ahead of broadcast deadlines. We were immensely impressed with the professionalism and linguistic precision.",
    rating: 5,
    avatarBg: "bg-blue-600",
    isApproved: true,
    createdAt: "2026-09-12",
  },
  {
    id: "test-2",
    name: "Amina Bello",
    role: "Program Director",
    company: "Sahel Health & Development Initiative",
    content:
      "Translating clinical trial protocols and community surveys into Hausa and Fulani required extreme nuance. FYT Localization exceeded our expectations with exceptional dual-proofreading QA.",
    rating: 5,
    avatarBg: "bg-emerald-600",
    isApproved: true,
    createdAt: "2026-09-28",
  },
  {
    id: "test-3",
    name: "Kwame Osei",
    role: "Principal AI Scientist",
    company: "AfroSpeech Labs",
    content:
      "Their acoustic speech dataset curation in low-resource African languages allowed us to cut word error rates on our voice recognition models by over 38%. Unrivaled field data collection quality.",
    rating: 5,
    avatarBg: "bg-teal-600",
    isApproved: true,
    createdAt: "2026-10-04",
  },
  {
    id: "test-4",
    name: "Fatima Zahra",
    role: "Head of Product Localization",
    company: "PaySahara Digital Bank",
    content:
      "FYT localized our entire mobile banking app and customer support scripts across 6 regional African dialects. The user adoption surge was immediate. Highly recommended for enterprise fintech.",
    rating: 5,
    avatarBg: "bg-indigo-600",
    isApproved: true,
    createdAt: "2026-10-15",
  },
];

const STORAGE_KEY = "fyt_testimonials_store";
const EVENT_KEY = "fyt_testimonials_updated";

export function getStoredTestimonials(): Testimonial[] {
  if (typeof window === "undefined") return INITIAL_TESTIMONIALS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_TESTIMONIALS));
      return INITIAL_TESTIMONIALS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_TESTIMONIALS;
  }
}

export function submitReview(data: {
  name: string;
  role: string;
  company: string;
  content: string;
  rating?: number;
}): Testimonial {
  const current = getStoredTestimonials();
  const colors = ["bg-blue-600", "bg-emerald-600", "bg-purple-600", "bg-amber-600", "bg-teal-600"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  const newTestimonial: Testimonial = {
    id: `test-${Date.now()}`,
    name: data.name.trim(),
    role: data.role.trim() || "Client",
    company: data.company.trim() || "Verified Partner",
    content: data.content.trim(),
    rating: data.rating && data.rating >= 1 && data.rating <= 5 ? data.rating : 5,
    avatarBg: randomColor,
    isApproved: false, // 7.3: Requires admin moderation
    createdAt: new Date().toISOString().slice(0, 10),
  };

  const updated = [newTestimonial, ...current];
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event(EVENT_KEY));
  }
  return newTestimonial;
}

export function approveReview(id: string) {
  const current = getStoredTestimonials();
  const updated = current.map((t) => (t.id === id ? { ...t, isApproved: true } : t));
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event(EVENT_KEY));
  }
}

export function rejectReview(id: string) {
  const current = getStoredTestimonials();
  const updated = current.filter((t) => t.id !== id);
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event(EVENT_KEY));
  }
}

export function useTestimonialsStore() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);

  useEffect(() => {
    setTestimonials(getStoredTestimonials());
    const handleUpdate = () => setTestimonials(getStoredTestimonials());
    window.addEventListener(EVENT_KEY, handleUpdate);
    return () => window.removeEventListener(EVENT_KEY, handleUpdate);
  }, []);

  const approved = testimonials.filter((t) => t.isApproved);
  const pending = testimonials.filter((t) => !t.isApproved);

  return {
    testimonials,
    approved,
    pending,
    submitReview,
    approveReview,
    rejectReview,
  };
}
