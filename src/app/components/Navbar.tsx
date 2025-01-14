"use client";

import Link from "next/link";
import { Ship } from "lucide-react";

export default function Navbar() {
  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white/20 backdrop-blur-md rounded-full px-8 py-4 shadow-lg">
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center gap-2">
            <Ship className="w-6 h-6 text-white" />
            <span className="text-xl font-bold italic text-white">
              S<span className="text-green-400">AI</span>LER
            </span>
          </Link>
          <nav className="flex gap-8">
            <a
              href="#features"
              className="text-white/90 hover:text-white transition-colors"
            >
              Features
            </a>
            <a
              href="#testimonials"
              className="text-white/90 hover:text-white transition-colors"
            >
              Testimonials
            </a>
            <a
              href="#cta"
              className="text-white/90 hover:text-white transition-colors"
            >
              Get Started
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}