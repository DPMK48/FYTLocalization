"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUserProfile } from "@/data/userProfileStore";

export default function MemberProfileRedirectPage() {
  const params = useParams();
  const router = useRouter();
  const { profile } = useUserProfile();
  const username = (params?.username as string) || "";

  useEffect(() => {
    if (username) {
      if (username.toLowerCase() === profile.nickname.toLowerCase()) {
        router.replace("/profile");
      } else {
        // Enforce authorization: Users only access their own profile; redirect to direct message for other users
        router.replace(`/profile/messages?to=${encodeURIComponent(username)}`);
      }
    }
  }, [username, profile.nickname, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-xs text-slate-500">
      <div className="flex items-center gap-2">
        <span className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <span>Redirecting...</span>
      </div>
    </div>
  );
}
