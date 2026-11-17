"use client";

import { useState, useEffect } from "react";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  phone?: string;
  website?: string;
  socials: {
    linkedin?: string;
    x?: string;
    email?: string;
    website?: string;
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
  logo?: string;
  websiteUrl?: string;
  industry?: string;
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
    name: "Fatima Yusuf Tomsu",
    role: "Founder & Chief Executive Officer, fytlocalization",
    bio: "Pioneering African language inclusion across digital interfaces and machine learning models. Over a decade coordinating high-stakes diplomatic translation, enterprise localization, and pan-African speech corpora.",
    image: "/images/Fatima.jpeg",
    phone: "+234 703 721 9213",
    website: "https://fytlocalization.com",
    socials: {
      linkedin: "https://www.linkedin.com/in/fatima-yusuf-tomsu-bb5197228",
      email: "fatima@Fytlocalization.com",
      website: "https://fytlocalization.com",
    },
  },
  {
    id: "team-2",
    name: "Abdulmuiz Zaid",
    role: "Chief of Operations (COO)",
    bio: "Leading cross-border operations, localization delivery pipelines, resource allocation, and strategic execution across all enterprise translation and AI projects.",
    image: "/images/Zaid.jpeg",
    socials: {
      linkedin: "https://www.linkedin.com/in/zaid-abdulmuiz-aaa908393",
      x: "https://www.x.com/prof6795",
      email: "Vm@fytlocalization.com",
    },
  },
  {
    id: "team-3",
    name: "Sanusi Muhammad",
    role: "Social Media Manager",
    bio: "Directing brand storytelling, digital community engagement, and strategic media outreach to champion African language technology worldwide.",
    image: "/images/Sanusi.jpeg",
    socials: {
      email: "admin@fytlocalization.com",
    },
  },
];

export const INITIAL_CERTIFICATIONS: Certification[] = [
  {
    id: "cert-cac",
    title: "CAC-Registered Company in Nigeria",
    issuer: "Corporate Affairs Commission (Federal Republic of Nigeria)",
    year: "Active Good Standing",
    image: "/images/cac.jpg",
  },
  {
    id: "cert-ndpc",
    title: "Nigeria Data Protection Commission (NDPC) Licensed & Compliant",
    issuer: "Federal Government of Nigeria (Official NDPC License)",
    year: "Licensed & Verified",
    image: "/images/ndpc.jpg",
  },
  {
    id: "cert-ndpa-gdpr",
    title: "NDPA & GDPR-Aligned Data Protection Practices",
    issuer: "Nigeria Data Protection Act & EU GDPR Governance Standard",
    year: "Compliant Framework",
    image: "/images/NDPA_Logo_800x800.png",
  },
];

export const INITIAL_PARTNERS: Partner[] = [
  {
    id: "partner-talent-track",
    name: "Talent Track",
    industry: "Enterprise Workforce & Talent",
  },
  {
    id: "partner-shape-ai",
    name: "Shape AI",
    industry: "AI Training & Data Systems",
  },
  {
    id: "partner-gif",
    name: "GIF",
    industry: "Global Innovation & Research",
  },
  {
    id: "partner-talentrack",
    name: "TalentRack",
    industry: "Technical Operations & Talent",
  },
  {
    id: "partner-translingua",
    name: "Translingua",
    industry: "Language Solutions & Localization",
  },
  {
    id: "partner-centific",
    name: "Centific",
    industry: "Global AI & Data Solutions",
  },
  {
    id: "partner-openai",
    name: "OpenAI",
    industry: "Artificial Intelligence Research",
  },
  {
    id: "partner-micro-1",
    name: "Micro 1",
    industry: "AI Engineering & Talent",
  },
  {
    id: "partner-ivision",
    name: "iVision",
    industry: "Digital Vision & AI Tech",
  },
  {
    id: "partner-the-delta-group",
    name: "The Delta Group",
    industry: "Global Communications & Media",
  },
  {
    id: "partner-dataocean",
    name: "DataOcean",
    industry: "Multimodal AI Data Solutions",
  },
  {
    id: "partner-kgen",
    name: "KGen",
    industry: "Community & Web3 Intelligence",
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

const STORAGE_KEY = "fyt_about_data_store_v8";
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
    const parsed = JSON.parse(raw);
    if (!parsed.team || parsed.team.length !== INITIAL_TEAM.length || parsed.team[0]?.name !== INITIAL_TEAM[0].name) {
      parsed.team = INITIAL_TEAM;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    }
    if (
      !parsed.certifications ||
      parsed.certifications.length !== INITIAL_CERTIFICATIONS.length ||
      parsed.certifications[2]?.image !== INITIAL_CERTIFICATIONS[2].image
    ) {
      parsed.certifications = INITIAL_CERTIFICATIONS;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    }
    if (
      !parsed.partners ||
      parsed.partners.length !== INITIAL_PARTNERS.length ||
      parsed.partners[0]?.name !== INITIAL_PARTNERS[0].name
    ) {
      parsed.partners = INITIAL_PARTNERS;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    }
    return parsed;
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
