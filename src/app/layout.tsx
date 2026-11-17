import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import ChatbotWidget from "@/components/ChatbotWidget";
import { SITE_CONFIG } from "@/data/siteConfig";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0000FF",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "FYT Localization | Bridging Africa Through Language and Technology",
  description:
    "Professional translation, interpretation, audio transcription, subtitling, and AI data services in 100+ African and global languages.",
  keywords: [
    "FYT Localization",
    "Translation Company",
    "African Languages Translation",
    "AI Data Services",
    "Interpretation Services",
    "Audio Transcription",
    "Subtitling Services",
    "LLM Fine-tuning",
    "Speech Data Collection",
    "Hausa Translation",
    "Yoruba Translation",
    "Swahili Translation",
  ],
  authors: [{ name: "FYT Localization Team" }],
  openGraph: {
    title: "FYT Localization | Bridging Africa Through Language and Technology",
    description:
      "Enterprise-grade translation, interpretation, subtitling, and AI data services across 100+ global languages.",
    url: "https://fytlocalization.com",
    siteName: "FYT Localization",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FYT Localization | Bridging Africa Through Language and Technology",
    description: "Accurate translation and AI data services for African and global languages.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${inter.variable} scroll-smooth`}
    >
      <body className="font-sans antialiased bg-white text-slate-900 selection:bg-blue-600 selection:text-white relative">
        {children}
        <ChatbotWidget />
      </body>
    </html>
  );
}
