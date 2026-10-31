"use client";

import { useState, useEffect } from "react";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string; // Placeholder or client photo
  socials: {
    linkedin?: string;
    x?: string;
    email?: string;
  };
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  year: string;
  image: string; // Placeholder or certificate scan
  credentialUrl?: string;
}

export interface Partner {
  id: string;
  name: string;
  logo: string; // Logo image placeholder
  websiteUrl: string;
  industry: string;
}

export interface PastProject {
  id: string;
  title: string;
  category: "localization" | "ai-data";
  scopeOfWork: string;
  volume: string;
  clientName?: string;
  isConfidential: boolean;
  year: string;
  status: "completed" | "ongoing";
}

export const INITIAL_TEAM: TeamMember[] = [
  {
    id: "team-1",
    name: "Fatima Yusuf",
    role: "Co-founder",
    bio: "Pioneering African language inclusion across digital interfaces and machine learning models. Over a decade coordinating high-stakes diplomatic translation and pan-African speech corpora.",
    image: "/images/africa_hero.jpg", // TODO: replace with client asset
    socials: {
      linkedin: "https://www.linkedin.com/company/fytlocalization/",
      x: "https://x.com/fytlocalization",
      email: "admin@fytlocalization.com",
    },
  },
  {
    id: "team-2",
    name: "Hamdan Bello",
    role: "Head of African Language Operations",
    bio: "Specializing in Bantu morphology, Swahili dialect variation, and simultaneous conference interpretation systems for inter-governmental summits.",
    image: "/images/interpretation.jpg", // TODO: replace with client asset
    socials: {
      linkedin: "https://www.linkedin.com/company/fytlocalization/",
      x: "https://x.com/fytlocalization",
      email: "admin@fytlocalization.com",
    },
  },
  {
    id: "team-3",
    name: "Dorathy Adeyemi",
    role: "Lead QA & Legal Localization Coordinator",
    bio: "Expert in legal terminology harmonization, civic public education translation, and multi-tier Human-in-the-Loop review protocols.",
    image: "/images/translation.jpg", // TODO: replace with client asset
    socials: {
      linkedin: "https://www.linkedin.com/company/fytlocalization/",
      email: "admin@fytlocalization.com",
    },
  },
  {
    id: "team-4",
    name: "Spectre Mensah",
    role: "Director of AI Datasets & Speech Engineering",
    bio: "Spearheading audio, video, and egocentric dataset collection pipelines for automated speech recognition and large language model instruction tuning.",
    image: "/images/localization.jpg", // TODO: replace with client asset
    socials: {
      linkedin: "https://www.linkedin.com/company/fytlocalization/",
      x: "https://x.com/fytlocalization",
    },
  },
];

export const INITIAL_CERTIFICATIONS: Certification[] = [
  {
    id: "cert-cac",
    title: "CAC-Registered Company in Nigeria",
    issuer: "Corporate Affairs Commission (Federal Republic of Nigeria)",
    year: "Active Good Standing",
    image: "/images/transcription.jpg",
  },
  {
    id: "cert-ndpc",
    title: "Nigeria Data Protection Commission (NDPC) Licensed & Compliant",
    issuer: "Federal Government of Nigeria (Official NDPC License)",
    year: "Licensed & Verified",
    image: "/images/translation.jpg",
  },
  {
    id: "cert-ndpa-gdpr",
    title: "NDPA & GDPR-Aligned Data Protection Practices",
    issuer: "Nigeria Data Protection Act & EU GDPR Governance Standard",
    year: "Compliant Framework",
    image: "/images/subtitle.jpg",
  },
];

export const INITIAL_PARTNERS: Partner[] = [
  {
    id: "partner-1",
    name: "Dadinkowa Media",
    logo: "/images/lawan.jpg", // TODO: replace with client asset
    websiteUrl: "https://fytlocalization.com",
    industry: "Broadcasting & Digital Media",
  },
  {
    id: "partner-2",
    name: "Sahel Health Initiative",
    logo: "/images/africa_hero.jpg", // TODO: replace with client asset
    websiteUrl: "https://fytlocalization.com",
    industry: "Non-Governmental Healthcare",
  },
  {
    id: "partner-3",
    name: "AfroSpeech AI Labs",
    logo: "/images/localization.jpg", // TODO: replace with client asset
    websiteUrl: "https://fytlocalization.com",
    industry: "Machine Learning & NLP",
  },
  {
    id: "partner-4",
    name: "Pan-African Fintech Council",
    logo: "/images/translation.jpg", // TODO: replace with client asset
    websiteUrl: "https://fytlocalization.com",
    industry: "Financial Inclusion",
  },
  {
    id: "partner-5",
    name: "West African Cinema Collective",
    logo: "/images/subtitle.jpg", // TODO: replace with client asset
    websiteUrl: "https://fytlocalization.com",
    industry: "Film & Subtitling",
  },
];

// 8.7: Past projects data model ready for future display without restructuring
export const INITIAL_PAST_PROJECTS: PastProject[] = [
  {
    id: "proj-1",
    title: "Pan-African Fintech App UI & Glossary Localization",
    category: "localization",
    scopeOfWork: "Translation and cultural adaptation into Hausa, Yoruba, Igbo, and Swahili",
    volume: "125,000 UI strings & legal terms",
    clientName: "Tier-1 African Digital Bank",
    isConfidential: true,
    year: "2025",
    status: "completed",
  },
  {
    id: "proj-2",
    title: "48kHz Spontaneous Native Speech Corpus Collection",
    category: "ai-data",
    scopeOfWork: "Multi-accent speech recordings across 15 Nigerian states with phoneme transcripts",
    volume: "350 hours audio",
    clientName: "Global AI Tech Enterprise",
    isConfidential: true,
    year: "2026",
    status: "completed",
  },
  {
    id: "proj-3",
    title: "Regional Agricultural Summit Remote Simultaneous Interpretation",
    category: "localization",
    scopeOfWork: "4-channel real-time interpretation (English, French, Hausa, Arabic)",
    volume: "3-day conference",
    clientName: "International Agriculture Foundation",
    isConfidential: false,
    year: "2026",
    status: "completed",
  },
];

const STORAGE_KEY = "fyt_about_data_store_v4";
const EVENT_KEY = "fyt_about_data_updated";

export function getStoredAboutData() {
  if (typeof window === "undefined") {
    return {
      team: INITIAL_TEAM,
      certifications: INITIAL_CERTIFICATIONS,
      partners: INITIAL_PARTNERS,
      pastProjects: INITIAL_PAST_PROJECTS,
    };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const init = {
        team: INITIAL_TEAM,
        certifications: INITIAL_CERTIFICATIONS,
        partners: INITIAL_PARTNERS,
        pastProjects: INITIAL_PAST_PROJECTS,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(init));
      return init;
    }
    return JSON.parse(raw);
  } catch {
    return {
      team: INITIAL_TEAM,
      certifications: INITIAL_CERTIFICATIONS,
      partners: INITIAL_PARTNERS,
      pastProjects: INITIAL_PAST_PROJECTS,
    };
  }
}

export function useAboutData() {
  const [data, setData] = useState(getStoredAboutData());

  useEffect(() => {
    setData(getStoredAboutData());
    const handleUpdate = () => setData(getStoredAboutData());
    window.addEventListener(EVENT_KEY, handleUpdate);
    return () => window.removeEventListener(EVENT_KEY, handleUpdate);
  }, []);

  const updateTeam = (newTeam: TeamMember[]) => {
    const updated = { ...data, team: newTeam };
    setData(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event(EVENT_KEY));
    }
  };

  const updatePartners = (newPartners: Partner[]) => {
    const updated = { ...data, partners: newPartners };
    setData(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event(EVENT_KEY));
    }
  };

  return {
    ...data,
    updateTeam,
    updatePartners,
  };
}
