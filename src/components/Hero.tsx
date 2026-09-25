
import Image from "next/image";
import Link from "next/link";


import bannerImg from "@/assets/banner.png";

export default function Hero() {
  return (
    <section className="bg-[#0a0a0c] text-white py-12 border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
        
       
       
        <div className="max-w-xl">
          <span className="text-[#ccff00] text-xs font-black uppercase tracking-widest block mb-2">
            WORKOUT LIBRARY
          </span>
          <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight leading-tight mb-4">
            TRAIN WITH INTENT. LOG EVERY SET.
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today’s plan, and watch the week’s work add up.
          </p>
          <Link
            href="#library"
            className="inline-block bg-[#ccff00] text-black text-xs font-extrabold uppercase px-6 py-3 rounded-xl hover:bg-[#b3e600] transition"
          >
            BROWSE WORKOUTS
          </Link>
        </div>

       
        <div className="relative w-full max-w-md h-[300px] flex justify-center items-center">
          <Image
            src={bannerImg}
            alt="FitLog Banner"
            width={300}
            height={300}
            className="object-contain"
            priority
          />
        </div>

      </div>
    </section>
  );
}