export interface ServiceItem {
  id: string;
  slug: string;
  category: "translation" | "interpretation" | "ai" | "transcription" | "subtitles";
  title: string;
  subtitle: string;
  tagline: string;
  image: string;
  description: string;
  detailedOverview: string;
  features: string[];
  deliverables: string[];
  supportedLanguages: string;
  turnaround: string;
  pricingBasis: string;
  useCases: string[];
}

export const SERVICES: ServiceItem[] = [
  {
    id: "translation",
    slug: "translation",
    category: "translation",
    title: "Translation",
    subtitle: "Accurate, culturally resonant document and digital translations",
    tagline: "Bridging cultural divides in over 100+ African and international languages.",
    image: "/images/translation.jpg",
    description:
      "Accurate and culturally sensitive translations in over 100 languages. Our native linguists ensure your message resonates with local nuances, idioms, and industry terminology.",
    detailedOverview:
      "Our translation services cover technical, legal, medical, corporate, and marketing materials. Rather than literal word swapping, our linguists maintain context, tone, and cultural appropriateness across top African languages (Hausa, Yoruba, Swahili, Igbo, Amharic, Zulu, Oromo) and global languages (French, Arabic, Spanish, Portuguese, German, Mandarin).",
    features: [
      "100+ African & Global Language Pairs",
      "Human-in-the-Loop QA & Dual-Proofreading",
      "Certified Legal & Official Document Stamp",
      "Industry-Specific Terminology Glossaries",
    ],
    deliverables: [
      "Certified PDF and DOCX translations",
      "Localized Marketing Collateral & Brochures",
      "Technical Manuals & User Guides",
      "Bilingual Translation Memory (.TMX)",
    ],
    supportedLanguages: "100+ languages including Hausa, Yoruba, Igbo, Swahili, Arabic, French, Portuguese",
    turnaround: "24–48 Hours (Rush 12h available)",
    pricingBasis: "Per Word ($0.04 - $0.10 / word)",
    useCases: [
      "Government Policy & Regulatory Compliance",
      "Banking, Fintech & Mobile App Localization",
      "Healthcare, Clinical Trials & Patient Leaflets",
      "Contracts, Patents & Court Filings",
    ],
  },
  {
    id: "interpretation",
    slug: "interpretation",
    category: "interpretation",
    title: "Interpretation",
    subtitle: "Real-time voice interpretation for conferences, summits & meetings",
    tagline: "Seamless real-time communication across linguistic boundaries.",
    image: "/images/interpretation.jpg",
    description:
      "Professional interpretation services for meetings, conferences, and high-stakes events. Our certified interpreters facilitate seamless communication in real-time.",
    detailedOverview:
      "Whether delivering simultaneous booth interpretation at international summits or consecutive interpretation for cross-border diplomatic or legal discussions, FYT provides vetted native interpreters. We support on-site booth deployments as well as Remote Simultaneous Interpretation (RSI) across Zoom, Teams, Webex, and dedicated RSI platforms.",
    features: [
      "Simultaneous (Booth) & Consecutive Modes",
      "Remote Simultaneous Interpretation (RSI) via Zoom / Teams",
      "On-site Diplomatic & Corporate Interpreters",
      "Whispered (Chuchotage) & Escort Interpretation",
    ],
    deliverables: [
      "Live Audio Feeds for Multi-Channel Streams",
      "Post-Event Recorded Interpretation Audio",
      "Session Glossaries & Terminology Briefings",
      "Technical RSI Soundcheck & Coordination",
    ],
    supportedLanguages: "Major African trade languages (Swahili, Hausa, Arabic, French, English, Portuguese)",
    turnaround: "Live Scheduled Sessions",
    pricingBasis: "Per Hour or Full-Day Rate",
    useCases: [
      "Pan-African & International NGO Conferences",
      "Cross-Border Corporate Boardroom Meetings",
      "Court Depositions & Legal Hearings",
      "Medical Consultations & Tele-health",
    ],
  },
  {
    id: "localization",
    slug: "localization-ai-services",
    category: "ai",
    title: "Localization / AI Services",
    subtitle: "Machine learning dataset curation, speech annotation & cultural adaptation",
    tagline: "Teaching artificial intelligence how Africa and the world truly speak.",
    image: "/images/localization.jpg",
    description:
      "We offer personalized solutions for unique project needs, connecting technology with native speakers, diverse accents, and real linguistic intelligence.",
    detailedOverview:
      "Modern AI models consistently fail when processing tonal shifts, regional accents, and underrepresented languages. FYT Localization bridges this data gap by curating high-volume speech datasets, running RLHF with domain experts, annotating sentiment and intent, and performing Machine Translation Post-Editing (MTPE) to ensure digital platforms feel truly native.",
    features: [
      "Speech Dataset Collection with Native Accents",
      "RLHF & AI Model Cultural Alignment",
      "Machine Translation Post-Editing (MTPE)",
      "Tone, Sentiment & Intent Labeling",
    ],
    deliverables: [
      "High-Fidelity Audio Corpora (.wav + transcripts)",
      "JSON / CSV Annotation & Tokenized Datasets",
      "Culturally Adapted Software UI Strings (.po, .json)",
      "Model Evaluation & LQA Reports",
    ],
    supportedLanguages: "High-density and low-resource African & emerging market languages",
    turnaround: "Agile Sprint Based",
    pricingBasis: "Per Token, Per Audio Hour, or Milestone",
    useCases: [
      "Voice Assistant & Chatbot Training",
      "Fintech Voice-Banking Prompts in Local Dialects",
      "Speech-to-Text (ASR) Model Fine-Tuning",
      "Global Software & Game UI Adaptation",
    ],
  },
  {
    id: "transcription",
    slug: "transcription",
    category: "transcription",
    title: "Transcription",
    subtitle: "High-precision audio and video transcription with tone & diarization",
    tagline: "Turning spoken voices into pristine, actionable text records.",
    image: "/images/transcription.jpg",
    description:
      "Fast and reliable transcription services for audio and video content. We deliver precise transcriptions that capture every detail, pause, and dialect nuance.",
    detailedOverview:
      "Accurate transcription goes beyond robotic speech-to-text. At FYT, skilled transcribers preserve tone, hesitations, laughter, and multi-speaker exchanges. We deliver clean verbatim or full verbatim transcripts with synchronized timestamps and speaker labels, optimized for research, legal discovery, media production, and AI training.",
    features: [
      "Speaker Diarization (Multi-Speaker Identification)",
      "Time-Stamped Transcripts (e.g. [00:01:24])",
      "Clean Verbatim or Full Verbatim Modes",
      "Code-Switching & Dialect Preservation",
    ],
    deliverables: [
      "Formatted Word (.docx) and Plaintext (.txt) Files",
      "Time-coded JSON/XML for Digital Media Pipelines",
      "Quality Assurance & Terminology Verification",
      "Secure Confidentiality & NDA Compliance",
    ],
    supportedLanguages: "50+ Languages and regional dialects",
    turnaround: "12–24 Hours (Express turnaround available)",
    pricingBasis: "Per Audio/Video Minute ($1.00 - $2.50 / min)",
    useCases: [
      "Qualitative Market Research & Focus Groups",
      "Legal Depositions & Police Bodycam Audio",
      "Podcast, Radio & Broadcast Journalism",
      "Medical Dictations & Academic Lectures",
    ],
  },
  {
    id: "subtitle",
    slug: "subtitles",
    category: "subtitles",
    title: "Subtitle & Closed Captions",
    subtitle: "Frame-accurate multilingual subtitles and SDH accessibility files",
    tagline: "Enhancing viewer engagement across films, streaming, and educational video.",
    image: "/images/subtitle.jpg",
    description:
      "High-quality subtitle services for films, videos, and online content. We provide clear, synchronized subtitles to maximize global reach and accessibility.",
    detailedOverview:
      "From Nollywood cinema and streaming documentaries to corporate training videos and YouTube campaigns, our subtitle specialists craft readable, frame-synchronized captions. We ensure reading speed (characters per second), line breaks, and cultural humor translate flawlessly to target audiences.",
    features: [
      "Frame-Accurate Synchronization (24/25/29.97/30 fps)",
      "SDH (Subtitles for the Deaf and Hard of Hearing)",
      "Burned-in (Hardcoded) or Closed Caption (Soft) Formats",
      "Character-per-second (CPS) Readability Optimization",
    ],
    deliverables: [
      "Standard .SRT, .VTT, .ASS, and .DFXP Caption Files",
      "Broadcast-Compliant .SCC and .CAP Formats",
      "Hardcoded MP4/MOV Deliverables with Custom Typography",
      "Translated Multilingual Subtitle Bundles",
    ],
    supportedLanguages: "English, French, Arabic, Hausa, Yoruba, Swahili, Spanish, etc.",
    turnaround: "24–48 Hours",
    pricingBasis: "Per Video Minute ($3.00 - $7.00 / min)",
    useCases: [
      "Feature Films, Documentaries & Web Series",
      "Social Media Video Content (Reels, TikTok, YouTube)",
      "Corporate E-Learning & Internal Training Courses",
      "Government Public Service Announcements",
    ],
  },
];
