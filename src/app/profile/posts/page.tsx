"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProfileHeader from "@/components/ProfileHeader";
import { useUserProfile } from "@/data/userProfileStore";
import { useBlogStore, ManagedBlogPost } from "@/data/blogStore";
import {
  CheckCircle2,
  FileEdit,
  Trash2,
  ExternalLink,
  Plus,
  Send,
  X,
} from "lucide-react";

export default function ProfileBlogCMSPage() {
  const { profile, addNotification } = useUserProfile();
  const {
    posts,
    createPost,
    updatePost,
    deletePost,
    submitForApproval,
    approveAndPublish,
  } = useBlogStore();

  const [activeFilter, setActiveFilter] = useState<"all" | "pending" | "published" | "draft">("all");
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<ManagedBlogPost | null>(null);

  // Clean Form State
  const [formTitle, setFormTitle] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formExcerpt, setFormExcerpt] = useState("");
  const [formImageUrl, setFormImageUrl] = useState("");
  const [formContent, setFormContent] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleOpenNewPost = () => {
    setEditingPost(null);
    setFormTitle("");
    setFormSlug("");
    setFormExcerpt("");
    setFormImageUrl("");
    setFormContent("");
    setIsEditorOpen(true);
  };

  const handleOpenEdit = (post: ManagedBlogPost) => {
    setEditingPost(post);
    setFormTitle(post.title);
    setFormSlug(post.slug);
    setFormExcerpt(post.excerpt || "");
    setFormImageUrl(post.image?.startsWith("/images/") ? "" : post.image || "");
    setFormContent(post.content.join("\n\n"));
    setIsEditorOpen(true);
  };

  const handleSavePost = (actionType: "draft" | "submit" | "publish") => {
    if (!formTitle.trim()) {
      showToast("Please provide a title for your blog post.");
      return;
    }

    const paragraphs = formContent
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    const safeSlug =
      formSlug.trim() ||
      formTitle
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-") ||
      `post-${Date.now()}`;

    let status: ManagedBlogPost["status"] = "draft";
    if (actionType === "publish" && profile.isAdmin) {
      status = "published";
    } else if (actionType === "submit") {
      status = "pending_approval";
    }

    const authorFullName = `${profile.firstName} ${profile.lastName}`.trim();
    let finalImage = formImageUrl.trim();
    if (finalImage) {
      const isLocal = finalImage.startsWith("/");
      let isValidUrl = false;
      if (!isLocal) {
        try {
          const parsed = new URL(finalImage);
          isValidUrl = parsed.protocol === "http:" || parsed.protocol === "https:";
        } catch {
          isValidUrl = false;
        }
      }
      if (!isLocal && !isValidUrl) {
        showToast("Invalid image URL. Must start with '/' or be a valid http(s) URL.");
        return;
      }
    }

    if (editingPost) {
      updatePost(editingPost.slug, {
        title: formTitle,
        category: "General",
        readTime: "5 min read",
        excerpt: formExcerpt || formTitle,
        image: finalImage,
        content: paragraphs.length > 0 ? paragraphs : [formTitle],
        status,
        ...(status === "published" ? { approvedBy: authorFullName } : {}),
      });

      if (status === "pending_approval") {
        addNotification(`Post '${formTitle}' submitted for Admin review.`, "/profile/posts", "approval");
        showToast("Draft submitted for Admin approval.");
      } else if (status === "published") {
        showToast("Article published.");
      } else {
        showToast("Draft saved.");
      }
    } else {
      createPost({
        slug: safeSlug,
        title: formTitle,
        category: "General",
        author: authorFullName,
        authorRole: profile.role,
        authorUsername: profile.nickname,
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        readTime: "5 min read",
        excerpt: formExcerpt || formTitle,
        image: finalImage,
        content: paragraphs.length > 0 ? paragraphs : [formTitle],
        status,
        ...(status === "published" ? { approvedBy: authorFullName } : {}),
      });

      if (status === "pending_approval") {
        addNotification(`${authorFullName} submitted a new post '${formTitle}' for review.`, "/profile/posts", "approval");
        showToast("Post submitted for Admin review.");
      } else if (status === "published") {
        showToast("Article published to live blog.");
      } else {
        showToast("Draft saved.");
      }
    }

    setIsEditorOpen(false);
  };

  const handleAdminApprove = (post: ManagedBlogPost) => {
    approveAndPublish(post.slug, `${profile.firstName} ${profile.lastName}`);
    addNotification(`Post '${post.title}' has been approved and published.`, `/blog/${post.slug}`, "approval");
    showToast(`'${post.title}' is now published.`);
  };

  // Filter posts
  const filteredPosts = posts.filter((p) => {
    if (activeFilter === "pending") return p.status === "pending_approval";
    if (activeFilter === "published") return p.status === "published";
    if (activeFilter === "draft") return p.status === "draft";
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-6 sm:py-10">
        <ProfileHeader currentTab="Blog" />

        <div className="bg-white border-x border-b border-slate-200 px-6 sm:px-10 py-6 space-y-6">
          
          {/* Toast */}
          {toastMessage && (
            <div className="p-3 bg-slate-900 text-white rounded-lg flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{toastMessage}</span>
              </div>
              <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Clean Header Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Blog Posts
              </h2>
              <p className="text-xs text-slate-500">
                Create and manage your articles.
              </p>
            </div>

            <button
              onClick={handleOpenNewPost}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Create Post</span>
            </button>
          </div>

          {/* Minimal Filter Tabs */}
          <div className="flex items-center gap-2 text-xs border-b border-slate-100 pb-3">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                activeFilter === "all" ? "bg-slate-100 text-slate-900 font-bold" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              All ({posts.length})
            </button>
            <button
              onClick={() => setActiveFilter("published")}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                activeFilter === "published" ? "bg-slate-100 text-slate-900 font-bold" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Published ({posts.filter((p) => p.status === "published").length})
            </button>
            <button
              onClick={() => setActiveFilter("pending")}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                activeFilter === "pending" ? "bg-slate-100 text-slate-900 font-bold" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Pending Approval ({posts.filter((p) => p.status === "pending_approval").length})
            </button>
            <button
              onClick={() => setActiveFilter("draft")}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                activeFilter === "draft" ? "bg-slate-100 text-slate-900 font-bold" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Drafts ({posts.filter((p) => p.status === "draft").length})
            </button>
          </div>

          {/* Simple, Uncluttered Articles List */}
          <div className="divide-y divide-slate-100">
            {filteredPosts.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400">
                No blog posts found in this tab.
              </div>
            ) : (
              filteredPosts.map((post) => {
                const isAuthor = post.authorUsername === profile.nickname;
                const canManage = profile.isAdmin || isAuthor;

                return (
                  <div
                    key={post.slug}
                    className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/50 px-2 rounded-lg transition-colors"
                  >
                    <div className="space-y-1 max-w-2xl">
                      <div className="flex items-center gap-2.5">
                        <Link
                          href={post.status === "published" ? `/blog/${post.slug}` : "#"}
                          className="text-sm font-semibold text-slate-900 hover:text-blue-600 transition-colors"
                        >
                          {post.title}
                        </Link>
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-slate-400">
                        <span>{post.author}</span>
                        <span>•</span>
                        <span>{post.date}</span>
                        <span>•</span>
                        {/* Minimal text status */}
                        {post.status === "published" && (
                          <span className="text-slate-600 font-medium">Published</span>
                        )}
                        {post.status === "pending_approval" && (
                          <span className="text-amber-600 font-medium">Pending Review</span>
                        )}
                        {post.status === "draft" && (
                          <span className="text-slate-400 font-medium">Draft</span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      {/* Admin Approve Button */}
                      {profile.isAdmin && post.status === "pending_approval" && (
                        <button
                          onClick={() => handleAdminApprove(post)}
                          className="px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors"
                        >
                          Approve & Publish
                        </button>
                      )}

                      {/* Author Submit Draft Button */}
                      {!profile.isAdmin && isAuthor && post.status === "draft" && (
                        <button
                          onClick={() => {
                            submitForApproval(post.slug);
                            addNotification(`Draft '${post.title}' submitted for review.`, "/profile/posts", "approval");
                            showToast("Submitted to Admin for review.");
                          }}
                          className="px-3 py-1.5 rounded border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-medium flex items-center gap-1"
                        >
                          <Send className="w-3 h-3" />
                          <span>Submit</span>
                        </button>
                      )}

                      {/* View Link */}
                      {post.status === "published" && (
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="p-1.5 text-slate-400 hover:text-blue-600"
                          title="View on site"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      )}

                      {/* Edit */}
                      {canManage && (
                        <button
                          onClick={() => handleOpenEdit(post)}
                          className="p-1.5 text-slate-400 hover:text-slate-700"
                          title="Edit"
                        >
                          <FileEdit className="w-4 h-4" />
                        </button>
                      )}

                      {/* Delete */}
                      {canManage && (
                        <button
                          onClick={() => {
                            if (confirm(`Delete post '${post.title}'?`)) {
                              deletePost(post.slug);
                              showToast("Post deleted.");
                            }
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-600"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </main>

      {/* Simple Clean Post Editor Modal */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div
            onClick={() => setIsEditorOpen(false)}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs"
          />

          <div className="relative bg-white rounded-xl max-w-2xl w-full p-6 shadow-xl border border-slate-200 z-10 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                {editingPost ? "Edit Post" : "New Post"}
              </h3>
              <button
                onClick={() => setIsEditorOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => {
                    setFormTitle(e.target.value);
                    if (!editingPost) {
                      setFormSlug(
                        e.target.value
                          .toLowerCase()
                          .replace(/[^a-z0-9\s-]/g, "")
                          .trim()
                          .replace(/\s+/g, "-")
                      );
                    }
                  }}
                  placeholder="Article title"
                  className="w-full px-3 py-2 border border-slate-300 rounded text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Short Excerpt (optional)
                </label>
                <textarea
                  rows={2}
                  value={formExcerpt}
                  onChange={(e) => setFormExcerpt(e.target.value)}
                  placeholder="Brief summary..."
                  className="w-full px-3 py-2 border border-slate-300 rounded text-slate-800 focus:outline-none focus:border-blue-600 resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Image URL (optional)
                </label>
                <input
                  type="text"
                  value={formImageUrl}
                  onChange={(e) => setFormImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg (optional)"
                  className="w-full px-3 py-2 border border-slate-300 rounded text-slate-800 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Content *
                </label>
                <textarea
                  rows={8}
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  placeholder="Write your article content here..."
                  className="w-full px-3 py-2 border border-slate-300 rounded text-slate-800 focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => handleSavePost("draft")}
                className="px-3.5 py-1.5 rounded border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-medium"
              >
                Save Draft
              </button>

              <button
                type="button"
                onClick={() => handleSavePost("submit")}
                className="px-3.5 py-1.5 rounded bg-slate-800 hover:bg-slate-900 text-white text-xs font-medium"
              >
                Submit for Approval
              </button>

              {profile.isAdmin && (
                <button
                  type="button"
                  onClick={() => handleSavePost("publish")}
                  className="px-3.5 py-1.5 rounded bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium"
                >
                  Publish
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
