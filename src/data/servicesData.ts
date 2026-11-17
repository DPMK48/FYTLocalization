/**
 * FYT Localization - Reorganized Services Data Structure
 * Two primary categories: Localization Services & AI Data Services
 * Data-driven: adding new services is simply adding objects to this list.
 */

export type ServiceCategoryType = "localization" | "ai-data";

export interface SubService {
  id: string;
  slug: string;
  category: ServiceCategoryType;
  title: string;
  shortDesc: string;
  image: string; // Placeholder or human-oriented image
  deliverables?: string[];
  features?: string[];
  defaultVolumeLabel?: string;
}

export interface ServiceCategory {
  id: ServiceCategoryType;
  title: string;
  tagline: string;
  description: string;
  image: string; // Human-oriented realistic category image
  services: SubService[];
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "localization",
    title: "Localization Services",
    tagline: "Culturally authentic communication across 100+ African and global languages.",
    description:
      "Enterprise linguistic solutions engineered with certified native speakers, multi-tier QA, and cultural nuance. Covering translation, transcription, interpretation, subtitling, MTPE, LQA, technical UI/UX localization, and cultural testing.",
    image: "/images/localization-category.jpg",
    services: [
      {
        id: "translation",
        slug: "translation",
        category: "localization",
        title: "Translation & Localization",
        shortDesc: "Accurate, culturally nuanced document and digital translation in 100+ African and international language pairs.",
        image: "/images/translation.jpg",
        features: [
          "Native linguists in 100+ language pairs",
          "Dual-proofreading and Human-in-the-Loop QA",
          "Official document & certified translation stamp",
          "Domain-specific terminology glossaries",
        ],
        deliverables: ["Certified PDF/DOCX files", "Translation Memory (.TMX)", "Marketing & Legal localization"],
        defaultVolumeLabel: "e.g. 2,500 words",
      },
      {
        id: "transcription",
        slug: "transcription",
        category: "localization",
        title: "Transcription",
        shortDesc: "Fast and reliable audio/video transcription capturing tone, pauses, accents, and speaker labels.",
        image: "/images/transcription.jpg",
        features: [
          "Speaker Diarization (Multi-speaker recognition)",
          "Time-stamped transcripts (e.g. [00:01:24])",
          "Clean verbatim or full verbatim options",
          "Preservation of African dialects & code-switching",
        ],
        deliverables: ["Word .docx and .txt transcripts", "Time-coded JSON/XML for digital workflows"],
        defaultVolumeLabel: "e.g. 45 minutes audio",
      },
      {
        id: "interpretation",
        slug: "interpretation",
        category: "localization",
        title: "Interpretation",
        shortDesc: "Simultaneous and consecutive interpretation for summits, legal hearings, webinars, and events.",
        image: "/images/interpretation.jpg",
        features: [
          "Simultaneous booth & consecutive interpretation",
          "Remote Simultaneous Interpretation (RSI) on Zoom/Teams",
          "Diplomatic and corporate accredited linguists",
          "Whispered (Chuchotage) & escort modes",
        ],
        deliverables: ["Live audio interpretation feeds", "Post-event recorded audio", "Terminology briefings"],
        defaultVolumeLabel: "e.g. 2 days event or 4 hours",
      },
      {
        id: "subtitling",
        slug: "subtitling",
        category: "localization",
        title: "Subtitling",
        shortDesc: "Frame-accurate multilingual subtitles and closed captions for film, broadcast, and streaming media.",
        image: "/images/subtitle.jpg",
        features: [
          "Frame-accurate synchronization (24/25/30 fps)",
          "SDH (Subtitles for the Deaf and Hard of Hearing)",
          "Closed caption soft files or hardcoded burns",
          "Characters-per-second (CPS) speed optimization",
        ],
        deliverables: [".SRT, .VTT, .ASS files", "Broadcast-ready .SCC/.CAP", "Multilingual caption bundles"],
        defaultVolumeLabel: "e.g. 90 minutes video",
      },
      {
        id: "mtpe",
        slug: "mtpe",
        category: "localization",
        title: "MTPE (Machine Translation Post-Editing)",
        shortDesc: "Expert human refinement of AI and neural machine translations for rapid, cost-effective high-volume output.",
        image: "/images/mtpe.jpg",
        features: [
          "Light and Full MTPE workflows according to ISO 18587",
          "Terminology harmonization with client glossaries",
          "Fluency, tone, and grammatical accuracy correction",
          "Up to 50% faster turnaround for large documentation",
        ],
        deliverables: ["Publish-ready localized documents", "Post-editing quality assessment report", "Updated Translation Memories (.TMX)"],
        defaultVolumeLabel: "e.g. 10,000 words",
      },
      {
        id: "lqa",
        slug: "lqa",
        category: "localization",
        title: "Language Quality Assurance (LQA)",
        shortDesc: "Independent linguistic audits, error categorization, and metric-driven validation of translated content.",
        image: "/images/lqa.jpg",
        features: [
          "MQM (Multidimensional Quality Metrics) framework",
          "Independent third-party linguistic audits",
          "Severity grading (Critical, Major, Minor)",
          "Glossary and style guide conformance verification",
        ],
        deliverables: ["Detailed LQA scorecard & error report", "Actionable linguistic remediation feedback", "Quality certification pass badge"],
        defaultVolumeLabel: "e.g. Audit sample",
      },
      {
        id: "ui-ux-localization",
        slug: "ui-ux-technical-localization",
        category: "localization",
        title: "UI/UX & Technical Localization",
        shortDesc: "Software, app, and web interface localization tailored for character limits, RTL/LTR scripts, and technical UX.",
        image: "/images/localization.jpg",
        features: [
          "String truncation & pseudo-localization testing",
          "Resource formats (.po, .json, .strings, .xml, .yaml)",
          "Contextual in-app UI testing on real devices",
          "Technical documentation & API guide localization",
        ],
        deliverables: ["Validated localization resource files", "UI screenshot defect reports", "Production-ready build assets"],
        defaultVolumeLabel: "e.g. App or Website build",
      },
      {
        id: "cultural-context-testing",
        slug: "cultural-context-testing",
        category: "localization",
        title: "Cultural-Context Testing",
        shortDesc: "In-country native user testing to guarantee imagery, idioms, humor, symbols, and marketing tone resonate culturally.",
        image: "/images/africa_hero.jpg",
        features: [
          "Native user panel focus groups across African markets",
          "Taboo, religious, and political sensitivity scanning",
          "Payment gateway and local consumer expectation audits",
          "Brand name and slogan resonance analysis",
        ],
        deliverables: ["Cultural sensitivity audit report", "Alternative wording & visual recommendations", "Go-to-market local adaptation blueprint"],
        defaultVolumeLabel: "e.g. Market entry test",
      },
    ],
  },
  {
    id: "ai-data",
    title: "AI Data Services",
    tagline: "Empowering next-generation artificial intelligence with diverse African speech, image, and multimedia datasets.",
    description:
      "High-fidelity human data collection, sourcing, annotation, and model evaluation at scale. Covering multimodal annotation, LLM red-teaming, voice-overs, and custom speech corpora.",
    image: "/images/ai-data-category.jpg",
    services: [
      {
        id: "ai-data-collection",
        slug: "ai-data-collection",
        category: "ai-data",
        title: "AI Data Collection & Annotation",
        shortDesc: "High-fidelity multimodal data collection and precise human labeling across diverse African demographics and real-world environments.",
        image: "/images/ai-data-collection.jpg",
        features: [
          "Image, video, text & audio dataset collection",
          "High-accuracy bounding boxes & semantic segmentation",
          "Multi-tier annotator QA & inter-annotator agreement",
          "Ethically gathered with strict consent waivers",
        ],
        deliverables: ["Structured JSON / CSV / XML annotation files", "High-resolution raw & processed datasets", "Demographic & metadata manifests"],
        defaultVolumeLabel: "e.g. 10,000 items",
      },
      {
        id: "llm-chatbot-testing",
        slug: "llm-chatbot-testing",
        category: "ai-data",
        title: "LLM / Chatbot Testing & Evaluation",
        shortDesc: "Rigorous benchmarking, red-teaming, cultural safety assessments, and human evaluation for LLMs and conversational AI.",
        image: "/images/llm-testing.jpg",
        features: [
          "Cultural appropriateness & bias detection in African contexts",
          "Hallucination, safety, and toxicity benchmark audits",
          "Multi-turn prompt testing across low-resource dialects",
          "RLHF feedback scoring and preference ranking",
        ],
        deliverables: ["Comprehensive LLM evaluation scorecard", "Red-teaming incident logs & mitigation guides", "Human-graded prompt-response corpora"],
        defaultVolumeLabel: "e.g. 5,000 prompt runs",
      },
      {
        id: "ai-data-sourcing",
        slug: "ai-data-sourcing",
        category: "ai-data",
        title: "AI Data Sourcing & Preparation",
        shortDesc: "End-to-end dataset discovery, cleaning, deduplication, formatting, and ingestion pipelines for machine learning models.",
        image: "/images/data-sourcing.jpg",
        features: [
          "Low-resource and regional language corpora discovery",
          "Audio/text normalization, cleaning, and tokenization",
          "Strict compliance with IP, NDPA, and GDPR rights",
          "Domain adaptation across finance, health, and law",
        ],
        deliverables: ["Cleaned train/test/validation data splits", "Schema-validated JSONL / Parquet files", "Licensing & provenance documentation"],
        defaultVolumeLabel: "e.g. 100K tokens / records",
      },
      {
        id: "voice-over-speech",
        slug: "voice-over-speech",
        category: "ai-data",
        title: "Voice-Over & Speech Data",
        shortDesc: "Professional native studio voice-overs, dubbing, and acoustic speech corpora for automatic speech recognition (ASR) & TTS.",
        image: "/images/voice-over.jpg",
        features: [
          "Native African dialect voice actors & voice talent",
          "Studio-grade 48kHz acoustic recordings",
          "Phonetic alignment & time-synchronized transcripts",
          "Dialectal & accent diversity (Hausa, Yoruba, Igbo, Swahili, etc.)",
        ],
        deliverables: ["Broadcast-quality WAV / MP3 masters", "Phoneme-aligned text transcripts", "Actor usage rights & commercial releases"],
        defaultVolumeLabel: "e.g. 50 audio hours",
      },
      {
        id: "egocentric-capture",
        slug: "egocentric-capture",
        category: "ai-data",
        title: "Egocentric Capture",
        shortDesc: "High-fidelity audio, video, and behavioral data collection using head-mounted smartphone rigs, body-worn cameras, and POV recording devices.",
        image: "/images/egocentric-headstrap.jpg",
        features: [
          "First-person perspective for AR/VR & robotics training",
          "Daily living tasks, cooking, artisan work, and navigation",
          "Gaze tracking and hands-in-action interaction datasets",
          "Synchronized audio and spatial sensory inputs",
        ],
        deliverables: ["POV video streams with synchronized audio", "Object interaction bounding boxes", "Task action step segmentation"],
        defaultVolumeLabel: "e.g. 50 hours POV capture",
      },
    ],
  },
];

// Flat list of all subservices for quick lookup
export const ALL_SERVICES: SubService[] = SERVICE_CATEGORIES.flatMap((c) => c.services);

export function getServiceById(id: string): SubService | undefined {
  return ALL_SERVICES.find(
    (s) => s.id.toLowerCase() === id.toLowerCase() || s.slug.toLowerCase() === id.toLowerCase()
  );
}

export function getCategoryForService(serviceNameOrId: string): ServiceCategoryType {
  const normalized = serviceNameOrId.toLowerCase().trim();
  const found = ALL_SERVICES.find(
    (s) =>
      s.id.toLowerCase() === normalized ||
      s.title.toLowerCase() === normalized ||
      s.slug.toLowerCase() === normalized
  );
  if (found) return found.category;
  
  // Check if it belongs to AI Data Services
  const aiKeywords = ["image", "video", "audio", "speech", "voice", "egocentric", "llm", "chatbot", "prompt", "annotation", "ai", "data", "sourcing"];
  if (aiKeywords.some((k) => normalized.includes(k))) {
    return "ai-data";
  }
  return "localization";
}
