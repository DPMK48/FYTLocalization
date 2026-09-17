"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProfileHeader from "@/components/ProfileHeader";
import { useUserProfile } from "@/data/userProfileStore";
import { useMembersStore } from "@/data/membersData";
import { Send, User, MessageCircle, Check, Search, ShieldCheck } from "lucide-react";

function MessagesContent() {
  const searchParams = useSearchParams();
  const initialRecipient = searchParams.get("to") || "dorathy";

  const { profile, messages, sendMessage } = useUserProfile();
  const { members } = useMembersStore();

  const [activeRecipient, setActiveRecipient] = useState(initialRecipient);
  const [inputText, setInputText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const to = searchParams.get("to");
    if (to) {
      setActiveRecipient(to);
    }
  }, [searchParams]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, activeRecipient]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(inputText.trim(), activeRecipient);
    setInputText("");
  };

  // Filter contacts excluding self
  const contacts = members.filter((m) => m.username !== profile.nickname);
  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedMember = members.find((m) => m.username === activeRecipient) || contacts[0];

  // Filter messages for current thread
  const threadMessages = messages.filter((m) => {
    if (m.recipient === activeRecipient) return true;
    if (m.sender.toLowerCase().includes(selectedMember?.name.toLowerCase() || "")) return true;
    if (!m.isSelf && selectedMember?.username === "dorathy" && m.sender === "Dorathy") return true;
    return false;
  });

  return (
    <div className="bg-white border-x border-b border-slate-200 px-6 sm:px-10 py-6 space-y-6 text-xs">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900">Direct Team Messages</h2>
          <p className="text-slate-500">
            Real-time communications with FYT localization project managers, translators, and editors.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-semibold text-emerald-700">Chat Server Online</span>
        </div>
      </div>

      {/* Main Messaging Split View */}
      <div className="grid grid-cols-1 md:grid-cols-12 border border-slate-200 rounded-xl overflow-hidden h-[540px]">
        
        {/* Left: Contacts List (4 cols) */}
        <div className="md:col-span-4 border-r border-slate-200 bg-slate-50 flex flex-col h-full">
          <div className="p-3 border-b border-slate-200 bg-white">
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
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {filteredContacts.map((contact) => {
              const isSelected = contact.username === activeRecipient;
              return (
                <button
                  key={contact.id}
                  type="button"
                  onClick={() => setActiveRecipient(contact.username)}
                  className={`w-full p-3 text-left flex items-center gap-3 transition-colors ${
                    isSelected ? "bg-blue-50/80 border-l-4 border-blue-600" : "hover:bg-white"
                  }`}
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
              );
            })}
          </div>
        </div>

        {/* Right: Active Conversation Window (8 cols) */}
        <div className="md:col-span-8 flex flex-col h-full bg-white">
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
              threadMessages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${m.isSelf ? "items-end" : "items-start"}`}
                >
                  <div className="flex items-end gap-2 max-w-[80%]">
                    {!m.isSelf && (
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-bold shrink-0 mb-1">
                        {m.sender.slice(0, 1)}
                      </div>
                    )}
                    <div
                      className={`p-3 rounded-2xl text-xs leading-relaxed ${
                        m.isSelf
                          ? "bg-blue-600 text-white rounded-br-xs shadow-xs"
                          : "bg-white border border-slate-200 text-slate-800 rounded-bl-xs shadow-xs"
                      }`}
                    >
                      <p>{m.text}</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 px-1">
                    {m.sender} • {m.time}
                  </span>
                </div>
              ))
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
