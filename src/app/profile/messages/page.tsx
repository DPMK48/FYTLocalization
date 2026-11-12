"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProfileHeader from "@/components/ProfileHeader";
import { useUserProfile } from "@/data/userProfileStore";
import { useMembersStore } from "@/data/membersData";
import {
  Send,
  User,
  MessageCircle,
  Check,
  Search,
  ShieldCheck,
  Users,
  CheckSquare,
  Square,
  Sparkles,
} from "lucide-react";

function MessagesContent() {
  const searchParams = useSearchParams();
  const { profile, messages, sendMessage, sendMassMessage } = useUserProfile();
  const { members } = useMembersStore();

  // Filter contacts excluding self
  const contacts = members.filter((m) => m.username !== profile.nickname);
  const initialRecipient =
    searchParams.get("to") || (contacts.length > 0 ? contacts[0].username : "");

  const [activeRecipient, setActiveRecipient] = useState(initialRecipient);
  const [inputText, setInputText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 9.1: Multi-select state for mass messaging (Admin Only)
  const [multiSelectMode, setMultiSelectMode] = useState(false);
  const [selectedUsernames, setSelectedUsernames] = useState<string[]>([]);
  const [massMessageText, setMassMessageText] = useState("");
  const [massSuccessToast, setMassSuccessToast] = useState<string | null>(null);

  // Admin access check for mass mode
  const isMassMode = multiSelectMode && profile.isAdmin;

  useEffect(() => {
    const to = searchParams.get("to");
    if (to) {
      setActiveRecipient(to);
    } else if (!activeRecipient && contacts.length > 0) {
      setActiveRecipient(contacts[0].username);
    }
  }, [searchParams, contacts, activeRecipient]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, activeRecipient]);

  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedMember =
    members.find((m) => m.username.toLowerCase() === activeRecipient.toLowerCase()) ||
    contacts[0];

  // Filter messages for current thread between logged-in user and selected recipient
  const threadMessages = messages.filter((m) => {
    if (!activeRecipient || !profile.nickname) return false;
    const normMe = profile.nickname.toLowerCase();
    const normOther = activeRecipient.toLowerCase();
    const normSender = (m.sender === "You" ? normMe : m.sender).toLowerCase();
    const normRecipient = (m.recipient || "").toLowerCase();

    const isOutbound =
      (normSender === normMe || m.isSelf) && normRecipient === normOther;
    const isInbound =
      (normSender === normOther ||
        normSender.includes(selectedMember?.name.toLowerCase() || "___")) &&
      (normRecipient === normMe || normRecipient === "you");

    return isOutbound || isInbound;
  });

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeRecipient) return;
    const text = inputText.trim();
    setInputText("");
    await sendMessage(text, activeRecipient);
  };

  // 9.1: Handle toggle single member selection
  const toggleSelectMember = (username: string) => {
    setSelectedUsernames((prev) =>
      prev.includes(username) ? prev.filter((u) => u !== username) : [...prev, username]
    );
  };

  // 9.1: Select All toggle
  const handleSelectAll = () => {
    if (selectedUsernames.length === filteredContacts.length) {
      setSelectedUsernames([]);
    } else {
      setSelectedUsernames(filteredContacts.map((c) => c.username));
    }
  };

  // Reset mass message mode if not admin
  useEffect(() => {
    if (!profile.isAdmin && multiSelectMode) {
      setMultiSelectMode(false);
      setSelectedUsernames([]);
    }
  }, [profile.isAdmin, multiSelectMode]);

  // 9.1: Mass message submission (Admin Only)
  const handleSendMassMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile.isAdmin || !massMessageText.trim() || selectedUsernames.length === 0) return;

    const count = await sendMassMessage(massMessageText.trim(), selectedUsernames);
    setMassSuccessToast(`Message broadcast to ${count} team members successfully!`);
    setMassMessageText("");
    setSelectedUsernames([]);
    setMultiSelectMode(false);
    setTimeout(() => setMassSuccessToast(null), 4000);
  };

  return (
    <div className="bg-white border-x border-b border-slate-200 px-6 sm:px-10 py-6 space-y-6 text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-3">
        <div>
          <h2 className="text-base font-bold text-slate-900">Direct Team Messages</h2>
          <p className="text-slate-500">
            Real-time communications with FYT localization project managers, translators, and editors.
          </p>
        </div>

        {/* 9.1: Admin Mass Messaging Action Bar (Admin only) */}
        <div className="flex items-center gap-3">
          {profile.isAdmin && (
            <button
              type="button"
              onClick={() => {
                setMultiSelectMode(!multiSelectMode);
                if (multiSelectMode) setSelectedUsernames([]);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs ${
                multiSelectMode
                  ? "bg-amber-100 text-amber-900 border border-amber-300"
                  : "bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200"
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>{multiSelectMode ? "Cancel Multi-Select" : "Mass Message Members"}</span>
            </button>
          )}

          <div className="hidden sm:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-semibold text-emerald-700">Chat Server Online</span>
          </div>
        </div>
      </div>

      {/* Success Notification */}
      {massSuccessToast && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-semibold">{massSuccessToast}</span>
        </div>
      )}

      {/* Main Messaging Split View */}
      <div className="grid grid-cols-1 md:grid-cols-12 border border-slate-200 rounded-2xl overflow-hidden h-[560px] shadow-xs">
        
        {/* Left: Contacts List (4 cols) */}
        <div className="md:col-span-4 border-r border-slate-200 bg-slate-50 flex flex-col h-full">
          {/* Search bar + Select All Bar in MultiSelect Mode */}
          <div className="p-3 border-b border-slate-200 bg-white space-y-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search colleagues..."
                className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:bg-white focus:border-blue-600"
              />
            </div>

            {/* 9.1: Multi-select header with "Select All" checkbox (Admin Only) */}
            {isMassMode && (
              <div className="flex items-center justify-between pt-1 text-[11px] font-bold text-slate-700">
                <button
                  type="button"
                  onClick={handleSelectAll}
                  className="flex items-center gap-1.5 text-blue-700 hover:underline"
                >
                  {selectedUsernames.length === filteredContacts.length && filteredContacts.length > 0 ? (
                    <CheckSquare className="w-3.5 h-3.5 text-blue-600" />
                  ) : (
                    <Square className="w-3.5 h-3.5 text-slate-400" />
                  )}
                  <span>Select All ({filteredContacts.length})</span>
                </button>
                <span className="text-slate-500">
                  {selectedUsernames.length} selected
                </span>
              </div>
            )}
          </div>

          {/* Contacts Feed */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {filteredContacts.map((contact) => {
              const isSelected = contact.username === activeRecipient;
              const isChecked = selectedUsernames.includes(contact.username);

              return (
                <div
                  key={contact.id}
                  className={`w-full p-3 text-left flex items-center gap-3 transition-colors ${
                    isMassMode
                      ? isChecked
                        ? "bg-blue-50/80"
                        : "hover:bg-white"
                      : isSelected
                      ? "bg-blue-50/80 border-l-4 border-blue-600"
                      : "hover:bg-white"
                  }`}
                >
                  {/* 9.1 Checkbox (Admin Only) */}
                  {isMassMode && (
                    <button
                      type="button"
                      onClick={() => toggleSelectMember(contact.username)}
                      className="text-slate-400 hover:text-blue-600 shrink-0"
                    >
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 text-blue-600" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-300" />
                      )}
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      if (isMassMode) {
                        toggleSelectMember(contact.username);
                      } else {
                        setActiveRecipient(contact.username);
                      }
                    }}
                    className="flex-1 min-w-0 flex items-center gap-3 text-left"
                  >
                    <div className="relative shrink-0">
                      <div className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-700 text-xs">
                        {contact.name.slice(0, 2).toUpperCase()}
                      </div>
                      {contact.isOnline && (
                        <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-white" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 truncate">
                          {contact.name}
                        </span>
                        {contact.isAdmin && (
                          <span title="Admin">
                            <ShieldCheck className="w-3 h-3 text-blue-600 shrink-0" />
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 truncate">
                        {contact.role}
                      </p>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Active Conversation Window OR 9.1 Mass Broadcast Compose Window */}
        <div className="md:col-span-8 flex flex-col h-full bg-white">
          {isMassMode ? (
            /* 9.1: Mass Broadcast Compose Window (Admin Only) */
            <div className="flex-1 flex flex-col p-6 space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2 text-blue-700 font-bold text-sm">
                  <Users className="w-4 h-4" />
                  <span>Compose Mass Message to Selected Members</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Each recipient receives this message as an individual private message in their own inbox thread.
                </p>
              </div>

              {/* Selected Recipients Chips */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Recipients ({selectedUsernames.length} Selected):
                </label>
                {selectedUsernames.length === 0 ? (
                  <p className="text-xs text-amber-700 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
                    Please check one or more colleagues on the left, or click &ldquo;Select All&rdquo;.
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto p-2 bg-slate-50 rounded-xl border border-slate-200">
                    {selectedUsernames.map((u) => {
                      const memberObj = members.find((m) => m.username === u);
                      return (
                        <span
                          key={u}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-100 text-blue-800 text-xs font-semibold"
                        >
                          <span>{memberObj?.name || u}</span>
                          <button
                            type="button"
                            onClick={() => toggleSelectMember(u)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            ×
                          </button>
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Message Input */}
              <form onSubmit={handleSendMassMessage} className="flex-1 flex flex-col space-y-3">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                  Message Content *
                </label>
                <textarea
                  rows={6}
                  required
                  value={massMessageText}
                  onChange={(e) => setMassMessageText(e.target.value)}
                  placeholder="Type announcement, project update, or instructions to selected members..."
                  className="flex-1 w-full p-3.5 rounded-xl border border-slate-300 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs resize-none"
                />

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-slate-500">
                    Will send to {selectedUsernames.length} member{selectedUsernames.length === 1 ? "" : "s"}.
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setMultiSelectMode(false)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={selectedUsernames.length === 0 || !massMessageText.trim()}
                      className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md flex items-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send to {selectedUsernames.length} Selected</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            /* Standard 1-on-1 Conversation Window (9.2: Kept working as is) */
            <>
              {/* Thread Header */}
              <div className="p-3.5 border-b border-slate-200 bg-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                    {selectedMember?.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 leading-tight">
                      {selectedMember?.name}
                    </h3>
                    <span className="text-[11px] text-slate-400">
                      {selectedMember?.role} • {selectedMember?.isOnline ? "Active now" : "Offline"}
                    </span>
                  </div>
                </div>
                {selectedMember?.isAdmin && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                    Admin Partner
                  </span>
                )}
              </div>

              {/* Messages Feed */}
              <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-slate-50/50">
                {threadMessages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-1">
                    <MessageCircle className="w-8 h-8 text-slate-300" />
                    <p className="text-xs font-semibold">No messages with {selectedMember?.name} yet.</p>
                    <p className="text-[11px]">Send a note below to start the conversation.</p>
                  </div>
                ) : (
                  threadMessages.map((m) => {
                    const isSelf =
                      m.isSelf ||
                      m.sender === "You" ||
                      m.sender.toLowerCase() === profile.nickname.toLowerCase();
                    const senderLabel = isSelf ? "You" : (selectedMember?.name || m.sender);

                    return (
                      <div
                        key={m.id}
                        className={`flex flex-col ${isSelf ? "items-end" : "items-start"}`}
                      >
                        <div className="flex items-end gap-2 max-w-[80%]">
                          {!isSelf && (
                            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-bold shrink-0 mb-1">
                              {senderLabel.slice(0, 1).toUpperCase()}
                            </div>
                          )}
                          <div
                            className={`p-3 rounded-2xl text-xs leading-relaxed ${
                              isSelf
                                ? "bg-blue-600 text-white rounded-br-xs shadow-xs"
                                : "bg-white border border-slate-200 text-slate-800 rounded-bl-xs shadow-xs"
                            }`}
                          >
                            <p>{m.text}</p>
                          </div>
                        </div>
                        <span className="text-[10px] text-slate-400 mt-1 px-1">
                          {senderLabel} • {m.time}
                        </span>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Send Input Bar */}
              <form onSubmit={handleSend} className="p-3 border-t border-slate-200 bg-white flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={`Message ${selectedMember?.name || "colleague"}...`}
                  className="flex-1 px-3.5 py-2 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:border-blue-600 text-xs"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProfileMessagesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-6 sm:py-10">
        <ProfileHeader currentTab="Messages" />
        <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400">Loading messages...</div>}>
          <MessagesContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
