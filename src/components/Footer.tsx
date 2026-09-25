
"use client";

import Image from "next/image";
import Link from "next/link";


import logoImg from "@/assets/logo.png";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0c] border-t border-zinc-900 py-8 text-zinc-500 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={logoImg}
            alt="FITLOG Icon"
            width={24}
            height={24}
            className="w-6 h-6 object-contain"
          />
          <span className="text-base font-black tracking-wider uppercase text-white">
            FITLOG
          </span>
        </Link>

        
        <p className="text-zinc-500 text-[14px] font-medium">
          © {new Date().getFullYear()} © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
}


