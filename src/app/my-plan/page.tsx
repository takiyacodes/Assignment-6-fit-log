"use client";

import { useState } from "react";
import { useWorkout } from "@/context/WorkoutContext";
import { Workout } from "@/types/workout";
import Link from "next/link";

export default function MyPlanPage() {
  const { todayPlan, savedWorkouts, removeFromPlan, removeFromSaved, toggleDone } = useWorkout();
  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
  const [sortBy, setSortBy] = useState<"duration" | "calories" | "rating">("duration");

  const currentList = activeTab === "plan" ? todayPlan : savedWorkouts;

  const sortedList = [...currentList].sort((a: Workout, b: Workout) => {
    if (sortBy === "duration") return Number(b.duration) - Number(a.duration);
    if (sortBy === "calories") return Number(b.calories) - Number(a.calories);
    if (sortBy === "rating") return Number(b.rating) - Number(a.rating);
    return 0;
  });

  const totalExercises = todayPlan.length;
  const totalMinutes = todayPlan.reduce((acc, curr) => acc + Number(curr.duration || 0), 0);
  const totalCalories = todayPlan.reduce((acc, curr) => acc + Number(curr.calories || 0), 0);

  return (
    <main className="bg-[#0a0a0c] min-h-screen text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        <div className="mb-8">
          <h1 className="text-3xl font-black uppercase">MY PLAN</h1>
          <p className="text-zinc-400 text-xs mt-1">Cap of five lifts for today. Finish them, then load more.</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8 bg-[#141416] border border-zinc-800 p-4 rounded-lg">
          <div>
            <span className="text-zinc-500 text-[10px] uppercase font-bold block">Exercises</span>
            <span className="text-2xl sm:text-3xl font-black text-[#ccff00]">{totalExercises}</span>
          </div>
          <div>
            <span className="text-zinc-500 text-[10px] uppercase font-bold block">Minutes</span>
            <span className="text-2xl sm:text-3xl font-black text-white">{totalMinutes}</span>
          </div>
          <div>
            <span className="text-zinc-500 text-[10px] uppercase font-bold block">Calories</span>
            <span className="text-2xl sm:text-3xl font-black text-white">{totalCalories}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4 mb-6">
          <div className="flex bg-[#141416] p-1 rounded border border-zinc-800">
            <button
              onClick={() => setActiveTab("plan")}
              className={`px-4 py-1.5 rounded text-xs font-bold transition ${
                activeTab === "plan" ? "bg-[#ccff00] text-black" : "text-zinc-400 hover:text-white"
              }`}
            >
              Today's Plan
            </button>
            <button
              onClick={() => setActiveTab("saved")}
              className={`px-4 py-1.5 rounded text-xs font-bold transition ${
                activeTab === "saved" ? "bg-[#ccff00] text-black" : "text-zinc-400 hover:text-white"
              }`}
            >
              Saved
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-zinc-400">Sort By</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "duration" | "calories" | "rating")}
              className="bg-[#141416] border border-zinc-800 text-white rounded px-3 py-1.5 outline-none cursor-pointer"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        {sortedList.length === 0 ? (
          <div className="bg-[#141416] border border-zinc-800 rounded-lg p-12 text-center my-8">
            <h3 className="text-lg font-black uppercase mb-1">NOTHING HERE YET</h3>
            <p className="text-zinc-400 text-xs mb-6">Browse the library and add a lift to get today moving.</p>
            <Link
              href="/"
              className="bg-[#ccff00] text-black font-extrabold text-xs uppercase px-5 py-2.5 rounded inline-block"
            >
              Go to workouts
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {sortedList.map((item) => (
              <div
                key={item.id}
                className={`bg-[#141416] border ${
                  item.isDone ? "border-green-900/50 opacity-70" : "border-zinc-800"
                } rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4`}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-12 object-cover rounded bg-zinc-900"
                  />
                  <div>
                    <h4 className={`font-black text-sm uppercase ${item.isDone ? "line-through text-zinc-500" : ""}`}>
                      {item.name}
                    </h4>
                    <p className="text-xs text-zinc-400 mb-1">{item.equipment}</p>
                    <div className="flex gap-3 text-[11px] text-zinc-500">
                      <span>⏱️ {item.duration} min</span>
                      <span>🔥 {item.calories} kcal</span>
                      <span>⭐ {item.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <Link
                    href={`/workout/${item.id}`}
                    className="border border-zinc-700 hover:border-zinc-500 text-white text-xs font-bold px-3 py-1.5 rounded"
                  >
                    View Details
                  </Link>

                  {activeTab === "plan" && (
                    <button
                      onClick={() => toggleDone(item.id)}
                      className={`text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1 ${
                        item.isDone
                          ? "bg-zinc-800 text-zinc-400"
                          : "bg-[#ccff00] text-black hover:bg-lime-400"
                      }`}
                    >
                      ✓ {item.isDone ? "Done" : "Mark as Done"}
                    </button>
                  )}

                  <button
                    onClick={() => (activeTab === "plan" ? removeFromPlan(item.id) : removeFromSaved(item.id))}
                    className="text-zinc-500 hover:text-red-400 text-sm px-2 py-1"
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