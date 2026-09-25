// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useWorkout } from "@/context/WorkoutContext";

// export default function Navbar() {
//   const pathname = usePathname();
//   // Correct state names matching WorkoutContext
//   const { todaysPlan, savedForLater } = useWorkout();

//   return (
//     <header className="bg-[#0f0f11] text-white border-b border-zinc-800 sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
//         {/* Left: Logo */}
//         <Link href="/" className="flex items-center gap-2 font-black tracking-wider text-xl">
//           <span className="text-[#ccff00]">⚡</span> FITLOG
//         </Link>

//         {/* Middle: Links */}
//         <nav className="flex items-center gap-8 text-sm font-semibold">
//           <Link
//             href="/"
//             className={
//               pathname === "/"
//                 ? "text-[#ccff00] underline underline-offset-8 decoration-2"
//                 : "text-zinc-400 hover:text-white transition"
//             }
//           >
//             Workouts
//           </Link>
//           <Link
//             href="/my-plan"
//             className={
//               pathname === "/my-plan"
//                 ? "text-[#ccff00] underline underline-offset-8 decoration-2"
//                 : "text-zinc-400 hover:text-white transition"
//             }
//           >
//             My Plan
//           </Link>
//         </nav>

//         {/* Right: Badges */}
//         <Link href="/my-plan" className="flex items-center gap-3">
//           <div className="bg-[#ccff00] text-black text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
//             <span>Plan</span>
//             <span className="bg-black text-[#ccff00] px-1.5 py-0.5 rounded-full text-[10px]">
//               {todaysPlan?.length || 0}
//             </span>
//           </div>

//           <div className="border border-zinc-700 text-zinc-300 hover:border-zinc-500 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
//             <span>Saved</span>
//             <span className="bg-zinc-800 text-white px-1.5 py-0.5 rounded-full text-[10px]">
//               {savedForLater?.length || 0}
//             </span>
//           </div>
//         </Link>

//       </div>
//     </header>
//   );
// }



"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useWorkout } from "@/context/WorkoutContext";

// Assets theke logo icon import
import logoImg from "@/assets/logo.png";

export default function Navbar() {
  const pathname = usePathname();
  const { todaysPlan, savedForLater } = useWorkout();

  return (
    <header className="bg-[#0f0f11] text-white border-b border-zinc-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Logo Icon + FITLOG Text */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={logoImg}
            alt="FITLOG Icon"
            width={28}
            height={28}
            className="w-7 h-7 object-contain"
            priority
          />
          <span className="text-xl font-black tracking-wider uppercase text-white">
            FITLOG
          </span>
        </Link>

        {/* Middle: Links */}
        <nav className="flex items-center gap-8 text-sm font-semibold">
          <Link
            href="/"
            className={
              pathname === "/"
                ? "text-[#ccff00] underline underline-offset-8 decoration-2"
                : "text-zinc-400 hover:text-white transition"
            }
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={
              pathname === "/my-plan"
                ? "text-[#ccff00] underline underline-offset-8 decoration-2"
                : "text-zinc-400 hover:text-white transition"
            }
          >
            My Plan
          </Link>
        </nav>

        {/* Right: Badges */}
        <Link href="/my-plan" className="flex items-center gap-3">
          <div className="bg-[#ccff00] text-black text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <span>Plan</span>
            <span className="bg-black text-[#ccff00] px-1.5 py-0.5 rounded-full text-[10px]">
              {todaysPlan?.length || 0}
            </span>
          </div>

          <div className="border border-zinc-700 text-zinc-300 hover:border-zinc-500 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <span>Saved</span>
            <span className="bg-zinc-800 text-white px-1.5 py-0.5 rounded-full text-[10px]">
              {savedForLater?.length || 0}
            </span>
          </div>
        </Link>

      </div>
    </header>
  );
}