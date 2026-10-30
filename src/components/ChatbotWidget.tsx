"use client";

import { useEffect } from "react";
import Script from "next/script";
import { SITE_CONFIG } from "@/data/siteConfig";

declare global {
  interface Window {
    __EMBED_CONFIG__?: {
      publicToken: string;
      getUserToken?: () => string | null;
      getUserId?: () => string | null;
      getUserName?: () => string | null;
      getUserEmail?: () => string | null;
      getUserRole?: () => string | null;
    };
  }
}

/**
 * 24/7 AI Chatbot Widget (Zilla / Xeelaa)
 * Seamlessly integrated from previous live website.
 */
export default function ChatbotWidget() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.__EMBED_CONFIG__ = {
        publicToken: SITE_CONFIG.chatbot.publicToken,
        getUserToken: () => {
          return document.querySelector("meta[name=user-token]")?.getAttribute("content") || null;
        },
        getUserId: () => {
          return document.querySelector("meta[name=user-id]")?.getAttribute("content") || null;
        },
        getUserName: () => {
          return document.querySelector("meta[name=user-name]")?.getAttribute("content") || null;
        },
        getUserEmail: () => {
          return document.querySelector("meta[name=user-email]")?.getAttribute("content") || null;
        },
        getUserRole: () => {
          return document.querySelector("meta[name=user-role]")?.getAttribute("content") || null;
        },
      };
    }
  }, []);

  return (
    <Script
      id="xeelaa-chatbot"
      src={SITE_CONFIG.chatbot.scriptUrl}
      strategy="afterInteractive"
    />
  );
}
