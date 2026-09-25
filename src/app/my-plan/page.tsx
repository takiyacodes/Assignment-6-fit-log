"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useWorkout } from "@/context/WorkoutContext";
import { Workout } from "@/types/workout";

export default function MyPlanPage() {
  const {
    todaysPlan,
    savedForLater,
    removeFromTodaysPlan,
    removeFromSavedForLater,
    markAsDone,
  } = useWorkout();


  const [activeTab, setActiveTab] = useState<"today" | "saved">("today");


  const [sortBy, setSortBy] = useState<"duration" | "caloriesBurned" | "rating">("duration");

  const currentList = activeTab === "today" ? todaysPlan : savedForLater;


  const totalExercises = todaysPlan.length;
  const totalMinutes = todaysPlan.reduce((acc, curr) => acc + curr.duration, 0);
  const totalCalories = todaysPlan.reduce((acc, curr) => acc + curr.caloriesBurned, 0);


  const sortedWorkouts = [...currentList].sort((a, b) => {
    if (sortBy === "duration") return b.duration - a.duration;
    if (sortBy === "caloriesBurned") return b.caloriesBurned - a.caloriesBurned;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <main className="bg-[#0a0a0c] min-h-screen text-white pb-20 pt-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">


        <div className="mb-6">
          <h1 className="text-3xl font-black uppercase tracking-tight text-white">MY PLAN</h1>
          <p className="text-zinc-400 text-xs mt-1">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>


        <div className="grid grid-cols-3 gap-4 bg-[#121216] border border-zinc-800/80 rounded-2xl p-6 mb-8">
          <div>
            <span className="text-zinc-500 text-xs font-semibold block mb-1">Exercises</span>
            <span className="text-3xl font-black text-white">{totalExercises}</span>
          </div>
          <div>
            <span className="text-zinc-500 text-xs font-semibold block mb-1">Minutes</span>
            <span className="text-3xl font-black text-white">{totalMinutes}</span>
          </div>
          <div>
            <span className="text-zinc-500 text-xs font-semibold block mb-1">Calories</span>
            <span className="text-3xl font-black text-white">{totalCalories}</span>
          </div>
        </div>


        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-4 mb-6">


          <div className="bg-zinc-950 p-1 rounded-xl border border-zinc-800 flex items-center gap-1">
            <button
              onClick={() => setActiveTab("today")}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${activeTab === "today"
                  ? "bg-[#ccff00] text-black"
                  : "text-zinc-400 hover:text-white"
                }`}
            >
              Today's Plan
            </button>
            <button
              onClick={() => setActiveTab("saved")}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${activeTab === "saved"
                  ? "bg-[#ccff00] text-black"
                  : "text-zinc-400 hover:text-white"
                }`}
            >
              Saved
            </button>
          </div>


          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <span>Sort By</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-zinc-900 border border-zinc-800 text-white rounded-lg px-3 py-1.5 text-xs font-semibold focus:outline-none focus:border-zinc-700 cursor-pointer"
            >
              <option value="duration">Duration</option>
              <option value="caloriesBurned">Calories</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>


        {sortedWorkouts.length === 0 ? (
          <div className="bg-[#121216] border border-zinc-800/80 rounded-2xl p-12 text-center my-12 flex flex-col items-center justify-center">
            <h3 className="text-lg font-black uppercase text-white mb-2">
              NOTHING HERE YET
            </h3>
            <p className="text-zinc-400 text-xs mb-6 max-w-sm">
              Browse the library and add a lift to get today moving.
            </p>
            <Link
              href="/"
              className="bg-[#ccff00] text-black font-bold text-xs uppercase px-5 py-2.5 rounded-xl hover:bg-[#b3e600] transition"
            >
              Go to workouts
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {sortedWorkouts.map((workout: Workout) => (
              <div
                key={workout.id}
                className="bg-[#121216] border border-zinc-800/80 rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-zinc-700 transition"
              >

                <div className="flex items-center gap-3">
                  <div className="relative w-16 h-16 bg-zinc-950 rounded-lg overflow-hidden border border-zinc-800 flex-shrink-0">
                    <Image
                      src={workout.image}
                      alt={workout.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-black uppercase text-white mb-0.5">
                      {workout.name}
                    </h4>
                    <p className="text-[11px] text-zinc-400 mb-1">{workout.equipment}</p>
                    <div className="flex items-center gap-3 text-[10px] text-zinc-400">
                      <span>⏱ {workout.duration} min</span>
                      <span>🔥 {workout.caloriesBurned} kcal</span>
                      <span className="text-yellow-400">★ {workout.rating}</span>
                    </div>
                  </div>
                </div>

               
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <Link
                    href={`/workout/${workout.id}`}
                    className="border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold px-3 py-1.5 rounded-lg transition text-center"
                  >
                    View Details
                  </Link>

                  {activeTab === "today" && (
                    <button
                      onClick={() => markAsDone(workout.id)}
                      className="bg-[#ccff00] hover:bg-[#b3e600] text-black text-xs font-bold px-3 py-1.5 rounded-lg transition flex items-center gap-1"
                    >
                      ✓ Mark as Done
                    </button>
                  )}

                  <button
                    onClick={() =>
                      activeTab === "today"
                        ? removeFromTodaysPlan(workout.id)
                        : removeFromSavedForLater(workout.id)
                    }
                    className="bg-zinc-900 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 border border-zinc-800 hover:border-red-500/30 text-xs font-bold w-8 h-8 rounded-lg transition flex items-center justify-center"
                    title="Remove"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}