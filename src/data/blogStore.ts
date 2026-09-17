"use client";

import { useState, useEffect, useCallback } from "react";
import { BLOG_POSTS as INITIAL_BLOG_POSTS, BlogPost } from "./blogPosts";

export type BlogPostStatus = "draft" | "pending_approval" | "published";

export interface ManagedBlogPost extends BlogPost {
  status: BlogPostStatus;
  authorUsername: string;
  createdAt: string;
  updatedAt: string;
  adminFeedback?: string;
  approvedBy?: string;
}

const STORAGE_KEY = "fyt_custom_cms_posts";
const EVENT_KEY = "fyt_blog_updated";

// Initialize with the existing 6 published articles
const DEFAULT_POSTS: ManagedBlogPost[] = INITIAL_BLOG_POSTS.map((post) => ({
  ...post,
  status: "published" as BlogPostStatus,
  authorUsername: post.author === "Fatima Yusuf" ? "adminfytlocalization-com" : post.author.toLowerCase().replace(/\s+/g, "-"),
  createdAt: post.date,
  updatedAt: post.date,
}));

export function getStoredBlogPosts(): ManagedBlogPost[] {
  if (typeof window === "undefined") return DEFAULT_POSTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_POSTS));
      return DEFAULT_POSTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_POSTS;
  } catch {
    return DEFAULT_POSTS;
  }
}

export function saveStoredBlogPosts(posts: ManagedBlogPost[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    window.dispatchEvent(new Event(EVENT_KEY));
  } catch (err) {
    console.error("Failed to save blog posts", err);
  }
}

export function useBlogStore() {
  const [posts, setPosts] = useState<ManagedBlogPost[]>(DEFAULT_POSTS);

  const sync = useCallback(() => {
    setPosts(getStoredBlogPosts());
  }, []);

  useEffect(() => {
    sync();
    const handleUpdate = () => sync();
    window.addEventListener(EVENT_KEY, handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener(EVENT_KEY, handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, [sync]);

  // Create new post (can be saved as draft or submitted for review)
  const createPost = (
    post: Omit<ManagedBlogPost, "createdAt" | "updatedAt">
  ): ManagedBlogPost => {
    const now = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    const newPost: ManagedBlogPost = {
      ...post,
      createdAt: now,
      updatedAt: now,
    };

    const current = getStoredBlogPosts();
    const updated = [newPost, ...current];
    saveStoredBlogPosts(updated);
    setPosts(updated);
    return newPost;
  };

  // Submit draft for Admin review
  const submitForApproval = (slug: string) => {
    const current = getStoredBlogPosts();
    const now = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    const updated = current.map((p) =>
      p.slug === slug ? { ...p, status: "pending_approval" as BlogPostStatus, updatedAt: now } : p
    );
    saveStoredBlogPosts(updated);
    setPosts(updated);
  };

  // Admin approves & publishes to public site
  const approveAndPublish = (slug: string, approvedByName: string = "Fatima Yusuf") => {
    const current = getStoredBlogPosts();
    const now = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    const updated = current.map((p) =>
      p.slug === slug
        ? {
            ...p,
            status: "published" as BlogPostStatus,
            date: now,
            updatedAt: now,
            approvedBy: approvedByName,
            adminFeedback: undefined,
          }
        : p
    );
    saveStoredBlogPosts(updated);
    setPosts(updated);
  };

  // Admin requests revision / rejects
  const requestRevision = (slug: string, feedback: string) => {
    const current = getStoredBlogPosts();
    const now = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    const updated = current.map((p) =>
      p.slug === slug
        ? {
            ...p,
            status: "draft" as BlogPostStatus,
            updatedAt: now,
            adminFeedback: feedback,
          }
        : p
    );
    saveStoredBlogPosts(updated);
    setPosts(updated);
  };

  // Update existing post
  const updatePost = (slug: string, changes: Partial<ManagedBlogPost>) => {
    const current = getStoredBlogPosts();
    const now = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    const updated = current.map((p) =>
      p.slug === slug ? { ...p, ...changes, updatedAt: now } : p
    );
    saveStoredBlogPosts(updated);
    setPosts(updated);
  };

  // Delete post
  const deletePost = (slug: string) => {
    const current = getStoredBlogPosts();
    const updated = current.filter((p) => p.slug !== slug);
    saveStoredBlogPosts(updated);
    setPosts(updated);
  };

  // Only published posts appear on the public blog
  const publishedPosts = posts.filter((p) => p.status === "published");
  const pendingPosts = posts.filter((p) => p.status === "pending_approval");
  const draftPosts = posts.filter((p) => p.status === "draft");

  return {
    posts,
    publishedPosts,
    pendingPosts,
    draftPosts,
    createPost,
    submitForApproval,
    approveAndPublish,
    requestRevision,
    updatePost,
    deletePost,
  };
}
