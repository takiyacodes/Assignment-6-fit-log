"use client";

import React, { useEffect, useState, use } from "react";
import { useWorkout } from "@/context/WorkoutContext";
import { Workout } from "@/types/workout";
import Link from "next/link";
import Image from "next/image";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function WorkoutDetailsPage({ params: paramsPromise }: PageProps) {
  const params = use(paramsPromise);
  const { id } = params;
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  
  const { addToTodaysPlan, addToSavedForLater } = useWorkout();

  useEffect(() => {
    async function fetchDetails() {
      try {
        const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`);
        const data = await res.json();
        setWorkout(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0c] text-white flex items-center justify-center ">
        <p className="text-zinc-400 animate-pulse">Loading workout details...</p>
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="min-h-screen bg-[#0a0a0c] text-white flex flex-col items-center justify-center p-6">
        <h2 className="text-xl font-bold">Workout not found</h2>
        <Link href="/" className="mt-4 text-[#ccff00] underline">Back to library</Link>
      </div>
    );
  }

  return (
    <main className="bg-[#0a0a0c] min-h-screen text-white py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
       
        <div className="bg-[#141416] border border-zinc-800 rounded-2xl overflow-hidden relative min-h-[350px]">
          <Image
            src={workout.image || "https://placehold.co/600x600"}
            alt={workout.name}
            width={600}
            height={600}
            className="w-full h-auto object-cover max-h-[1000px]"
          />
        </div>

       
        <div>
          <h1 className="text-3xl font-black uppercase mb-2 text-white">{workout.name}</h1>
          <p className="text-zinc-400 text-xs mb-4 leading-relaxed">{workout.description}</p>

          
          <div className="flex gap-2 mb-6">
            {workout.category?.map((cat, i) => (
              <span key={i} className="bg-[#ccff00] text-black text-[10px] font-extrabold uppercase px-2.5 py-1 rounded">
                {cat}
              </span>
            ))}
          </div>

          
          <div className="bg-[#121216] border border-zinc-800/80 rounded-xl p-4 mb-6 text-xs space-y-2.5">
            <div className="flex justify-between py-1 border-b border-zinc-800/60"><span className="text-zinc-500 uppercase font-semibold">EQUIPMENT</span><span className="font-medium text-zinc-200">{workout.equipment}</span></div>
            <div className="flex justify-between py-1 border-b border-zinc-800/60"><span className="text-zinc-500 uppercase font-semibold">DIFFICULTY</span><span className="font-medium text-zinc-200">{workout.difficulty || "Intermediate"}</span></div>
            <div className="flex justify-between py-1 border-b border-zinc-800/60"><span className="text-zinc-500 uppercase font-semibold">SETS</span><span className="font-medium text-zinc-200">{workout.sets || "4"}</span></div>
            <div className="flex justify-between py-1 border-b border-zinc-800/60"><span className="text-zinc-500 uppercase font-semibold">REPS</span><span className="font-medium text-zinc-200">{workout.reps || "6-8"}</span></div>
            <div className="flex justify-between py-1 border-b border-zinc-800/60"><span className="text-zinc-500 uppercase font-semibold">DURATION</span><span className="font-medium text-zinc-200">{workout.duration} min</span></div>
            <div className="flex justify-between py-1 border-b border-zinc-800/60"><span className="text-zinc-500 uppercase font-semibold">CALORIES</span><span className="font-medium text-zinc-200">{workout.caloriesBurned || workout.calories} kcal</span></div>
            <div className="flex justify-between py-1"><span className="text-zinc-500 uppercase font-semibold">RATING</span><span className="font-medium text-yellow-400">★ {workout.rating}</span></div>
          </div>

        
          {workout.instructions && (
            <div className="mb-8">
              <h3 className="text-xs font-bold uppercase text-zinc-400 tracking-wider mb-3">INSTRUCTIONS</h3>
              <ol className="space-y-2 text-xs text-zinc-300 list-decimal list-inside leading-relaxed">
                {workout.instructions.map((step, idx) => (
                  <li key={idx} className="pl-1">{step}</li>
                ))}
              </ol>
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => addToTodaysPlan(workout)}
              className="bg-[#ccff00] hover:bg-[#b3e600] text-black font-extrabold text-xs uppercase px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition"
            >
              ➕ Add to today's plan
            </button>
            <button
              onClick={() => addToSavedForLater(workout)}
              className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-white font-bold text-xs uppercase px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition"
            >
              📌 Save for later
            </button>
          </div>

        </div>

      </div>
    </main>
  );
}