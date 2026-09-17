"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // Admin is unified into the main member dashboard
    router.replace("/dashboard");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-600 text-xs">
      <div className="flex items-center gap-2">
        <span className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <span>Redirecting to unified Operations Dashboard...</span>
      </div>
    </div>
  );
}
