"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { switchActiveMember } from "@/data/userProfileStore";

export default function MemberProfileRedirectPage() {
  const params = useParams();
  const router = useRouter();
  const username = (params?.username as string) || "";

  useEffect(() => {
    if (username) {
      switchActiveMember(username);
      router.replace("/profile");
    }
  }, [username, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-xs text-slate-500">
      <div className="flex items-center gap-2">
        <span className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <span>Loading member workspace...</span>
      </div>
    </div>
  );
}
