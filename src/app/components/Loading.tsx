"use client";

import { Ship } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b bg-blue-900/90 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-rock inline-block">
          <Ship className="w-16 h-16 text-white" />
        </div>
        <p className="mt-4 text-white text-lg font-medium animate-pulse">Loading...</p>
      </div>
    </div>
  );
}