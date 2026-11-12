/**
 * FYT Localization - Central Site Configuration
 * Single source of truth for branding, contact info, and social links.
 */

export const SITE_CONFIG = {
  name: "FYT Localization",
  tagline: "Bridging Africa Through Language and Technology.",
  officialName: "FYT LOCALIZATION",
  subtitle: "TRANSLATION & AI DATA COMPANY",
  
  // Single Logo Asset Path (Swapping this file or URL updates the logo everywhere)
  logoPath: "/images/logo.png",
  logoDarkPath: "/images/logo-white.png",
  logoAlt: "FYT Localization - Official Globe Logo",

  // Contact Information
  contact: {
    email: "admin@fytlocalization.com",
    supportEmail: "admin@fytlocalization.com",
    phone: "+234 703 721 9213",
    phoneDisplay: "+234 703 721 9213",
    whatsappUrl: "https://wa.me/2347037219213",
    whatsappDisplay: "+234 703 721 9213",
    address: "Unguwar Sararkuna, Maiduguri Bypass, Bauchi State, Nigeria",
  },

  // Social Channels
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61583295960480",
    linkedin: "https://www.linkedin.com/company/fytlocalization/",
    x: "https://x.com/fytlocalization",
    whatsapp: "https://wa.me/2347037219213",
  },

  // Chatbot configuration (Xeelaa / "Zilla")
  chatbot: {
    enabled: true,
    name: "Zilla (Xeelaa)",
    scriptUrl: "https://xeelaa.com/widget.js?key=jLWcz3U0iEBulMg5qL0P0FyffD0j1ZoUL451Z94sv1Cciw28llngbIbt5b1WNtt8",
    publicToken: "jLWcz3U0iEBulMg5qL0P0FyffD0j1ZoUL451Z94sv1Cciw28llngbIbt5b1WNtt8",
  },

  // Licenses & Certifications / Compliance
  compliance: {
    cac: "CAC-Registered Company in Nigeria",
    ndpc: "Nigeria Data Protection Commission (NDPC) Licensed & Compliant",
    privacyStandards: "NDPA & GDPR-Aligned Data Protection Practices",
  },
};

