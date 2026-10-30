"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useBlogStore } from "@/data/blogStore";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  ArrowRight,
  BookOpen,
} from "lucide-react";

export default function BlogPostReaderPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { posts, publishedPosts } = useBlogStore();

  const post = posts.find((p) => p.slug === slug) || publishedPosts[0];
  const otherPosts = publishedPosts.filter((p) => p.slug !== post?.slug).slice(0, 3);

  // Validate image URL safely to prevent Next.js Image crash on invalid input (e.g. malformed strings)
  const isLocalImage = typeof post?.image === "string" && post.image.trim().startsWith("/");
  let isValidExternalImage = false;
  if (typeof post?.image === "string" && !isLocalImage) {
    try {
      const url = new URL(post.image.trim());
      isValidExternalImage = url.protocol === "http:" || url.protocol === "https:";
    } catch {
      isValidExternalImage = false;
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />

      {/* Article Header */}
      <header className="bg-[#0000FF] text-white py-14 lg:py-20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-md transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Journal</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-400 text-slate-950">
              {post.category}
            </span>
            <span className="text-xs text-white/80 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.2]">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 pt-2">
            <div className="w-10 h-10 rounded-full bg-teal-300 text-slate-950 font-bold text-sm flex items-center justify-center">
              {post.author.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-bold text-white">{post.author}</p>
              <p className="text-xs text-blue-200">{post.authorRole} • {post.date}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Article Body */}
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-10">
        {/* Optional Featured Image */}
        {isLocalImage ? (
          <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-slate-900">
            <Image
              src={post.image!}
              alt={post.title}
              fill
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
              priority
            />
          </div>
        ) : isValidExternalImage ? (
          <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-slate-900">
            <img
              src={post.image!}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        ) : null}

        {/* Text Content */}
        <article className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base font-normal">
          {post.content.map((paragraph, index) => (
            <p key={index} className="first-of-type:text-lg first-of-type:font-medium first-of-type:text-slate-900 first-of-type:leading-relaxed">
              {paragraph}
            </p>
          ))}
        </article>

        {/* Related Articles */}
        <section className="space-y-6 pt-6">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            More From the Journal
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {otherPosts.map((op) => (
              <Link
                key={op.slug}
                href={`/blog/${op.slug}`}
                className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                    {op.category}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 mt-1 line-clamp-2 transition-colors">
                    {op.title}
                  </h4>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{op.readTime}</span>
                  <span className="text-blue-600 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    Read →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
