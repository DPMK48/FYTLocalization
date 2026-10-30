"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, Star, ChevronLeft, ChevronRight, MessageSquarePlus, Quote } from "lucide-react";
import { useTestimonialsStore } from "@/data/testimonialsStore";
import SubmitReviewModal from "@/components/SubmitReviewModal";

interface ScientificApproachProps {
  onOpenOrderModal: () => void;
}

export default function ScientificApproach({ onOpenOrderModal }: ScientificApproachProps) {
  const { approved } = useTestimonialsStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  // Auto-advance reviews carousel every 5.5s
  useEffect(() => {
    if (isPaused || approved.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % approved.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused, approved.length]);

  const activeReview = approved[currentIndex] || approved[0];

  return (
    <section id="why-us" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading & Vision Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-10 h-0.5 bg-blue-700" />
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                Why Us?
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-blue-700 tracking-tight leading-[1.18]">
              Our Scientific Vision Approach
            </h2>

            <h3 className="text-base sm:text-lg font-semibold text-slate-700 leading-relaxed">
              Precision language services & authentic AI data tailored for enterprise and media.
            </h3>

            <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
              Native cultural immersion, multi-tier QA, and rapid turnaround across 100+ African and global languages. Verified by top Pan-African media houses, multinational NGOs, and AI development labs.
            </p>

            <div className="pt-3 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenOrderModal}
                className="px-7 py-3.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white bg-[#0000FF] hover:bg-[#0000dd] rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                WHY US?
              </button>

              {/* 7.2: Submit a Review Button */}
              <button
                type="button"
                onClick={() => setReviewModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-5 py-3 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                <MessageSquarePlus className="w-3.5 h-3.5 text-blue-600" />
                <span>Submit a Review</span>
              </button>
            </div>
          </div>

          {/* Right Column: Studio Photo + 7.4 Auto-Sliding Carousel of Approved Reviews */}
          <div className="lg:col-span-7 relative">
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-100">
              <Image
                src="/images/subtitle.jpg"
                alt="Our Scientific Vision and Transcription Editing Studio"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
            </div>

            {/* 7.4: Auto-Sliding Reviews Card with navigation dots */}
            <div
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="mt-4 sm:-mt-24 sm:ml-8 relative sm:max-w-xl bg-white rounded-2xl p-6 sm:p-7 shadow-2xl border border-slate-200 z-20 border-b-4 border-b-blue-600 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1">
                  {[...Array(activeReview?.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                  <span className="text-[11px] font-bold text-slate-400 ml-1.5">
                    Verified Client Review
                  </span>
                </div>

                {/* Prev / Next Buttons */}
                {approved.length > 1 && (
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() =>
                        setCurrentIndex((prev) => (prev - 1 + approved.length) % approved.length)
                      }
                      className="p-1 rounded-md text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                      aria-label="Previous review"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setCurrentIndex((prev) => (prev + 1) % approved.length)
                      }
                      className="p-1 rounded-md text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                      aria-label="Next review"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Review Text */}
              <div className="relative pl-6 mb-4 min-h-[70px]">
                <Quote className="w-5 h-5 text-blue-200 absolute left-0 top-0" />
                <p className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed italic">
                  &ldquo;{activeReview?.content}&rdquo;
                </p>
              </div>

              {/* Client Info & Dots */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <div>
                  <h4 className="text-sm font-bold text-blue-700">
                    {activeReview?.name}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {activeReview?.role}{activeReview?.company ? `, ${activeReview.company}` : ""}
                  </p>
                </div>

                {/* 7.4: Navigation Dots */}
                <div className="flex items-center gap-1.5">
                  {approved.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setCurrentIndex(i)}
                      aria-label={`View review ${i + 1}`}
                      className={`h-2 rounded-full transition-all ${
                        i === currentIndex ? "w-5 bg-blue-600" : "w-2 bg-slate-300 hover:bg-slate-400"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Review Submission Modal */}
      <SubmitReviewModal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
      />
    </section>
  );
}
