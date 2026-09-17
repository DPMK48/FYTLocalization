"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useBlogStore } from "@/data/blogStore";
import { Search, ArrowRight } from "lucide-react";

export default function BlogIndexPage() {
  const { publishedPosts } = useBlogStore();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = publishedPosts.filter((post) => {
    const query = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.author.toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Navbar />

      {/* Clean Header */}
      <section className="border-b border-slate-200 py-12 sm:py-16 bg-slate-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Blog
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
            Insights on African linguistic structures, speech dataset curation, tone preservation in AI, and cross-border translation.
          </p>

          {/* Simple Search */}
          <div className="pt-2 max-w-md">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-2 text-xs rounded-lg border border-slate-300 text-slate-900 bg-white focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Simplified Articles List */}
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {filteredPosts.length === 0 ? (
          <div className="py-16 text-center text-xs text-slate-400">
            No articles found matching &ldquo;{searchQuery}&rdquo;.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredPosts.map((post) => (
              <article key={post.slug} className="py-8 first:pt-0 space-y-2.5">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span>{post.author}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="text-xl sm:text-2xl font-bold text-slate-900 hover:text-blue-600 transition-colors block leading-snug"
                >
                  {post.title}
                </Link>

                <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="pt-1">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline"
                  >
                    <span>Read more</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
