"use client";

import Image from "next/image";
import Link from "next/link";
import { Workout } from "@/types/workout";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="bg-[#121216] border border-zinc-800/80 hover:border-zinc-700 rounded-2xl overflow-hidden group transition flex flex-col"
    >
     
      <div className="relative w-full h-48 bg-zinc-950 overflow-hidden">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-cover group-hover:scale-105 transition duration-300"
        />
      </div>

     
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          
          <div className="flex flex-wrap gap-1.5 mb-2.5">
            {workout.muscleGroups?.map((group, idx) => (
              <span
                key={idx}
                className="bg-[#ccff00] text-black text-[10px] font-black uppercase px-2 py-0.5 rounded-md"
              >
                {group}
              </span>
            ))}
          </div>

          <h3 className="text-base font-black uppercase text-white mb-1 tracking-tight">
            {workout.name}
          </h3>

        
          <p className="text-xs text-zinc-400 font-medium mb-3">
            {workout.equipment}
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs text-zinc-300 font-medium pt-2 border-t border-zinc-800/60">
          <span>⏱ {workout.duration} min</span>
          <span>🔥 {workout.caloriesBurned} kcal</span>
          <span className="flex items-center gap-1">⭐ {workout.rating}</span>
        </div>
      </div>
    </Link>
  );
}