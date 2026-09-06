import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#003cd6",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "FYTLOCALIZATION | Professional Translation, AI Localization & Interpretation",
  description:
    "Connecting the world through language. Accurate translations, AI localization, real-time interpretation, precision transcription, and subtitle services in 100+ African and global languages.",
  keywords: [
    "FYTLOCALIZATION",
    "Translation Company",
    "African Languages Translation",
    "AI Localization",
    "Interpretation Services",
    "Audio Transcription",
    "Subtitling Services",
    "Hausa Translation",
    "Yoruba Translation",
    "Swahili Translation",
    "Arabic Translation",
    "French Translation",
  ],
  authors: [{ name: "FYTLOCALIZATION Team" }],
  openGraph: {
    title: "FYTLOCALIZATION | Connecting The World Through Language",
    description:
      "Enterprise-grade translation, AI localization, audio transcription, and interpretation across 100+ global languages.",
    url: "https://fytlocalization.com",
    siteName: "FYTLOCALIZATION",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FYTLOCALIZATION | Connecting The World Through Language",
    description: "Accurate translation and AI localization services for African and global languages.",
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
      <body className="font-sans antialiased bg-white text-slate-900 selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
