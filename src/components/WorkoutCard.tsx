

// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { Workout } from "@/types/workout";
// import { useWorkout } from "@/context/WorkoutContext";

// export default function WorkoutCard({ workout }: { workout: Workout }) {
//   const { addToTodaysPlan, addToSavedForLater } = useWorkout();

//   return (
//     <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden flex flex-col justify-between hover:border-zinc-700 transition">
//       <div>
//         <div className="relative w-full h-48 bg-zinc-950">
//           <Image
//             src={workout.image}
//             alt={workout.name}
//             fill
//             className="object-cover"
//           />
//           <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md text-amber-400 font-bold text-xs px-2.5 py-1 rounded-full border border-amber-500/20">
//             ★ {workout.rating}
//           </div>
//         </div>

//         <div className="p-5">
//           <div className="flex flex-wrap gap-2 mb-3">
//             {workout.muscleGroups.map((group, idx) => (
//               <span key={idx} className="bg-zinc-800 text-zinc-300 text-xs px-2.5 py-1 rounded-md font-medium">
//                 {group}
//               </span>
//             ))}
//           </div>

//           <h3 className="text-xl font-bold text-white mb-2">{workout.name}</h3>
//           <p className="text-zinc-400 text-sm line-clamp-2 mb-4">{workout.description}</p>

//           <div className="grid grid-cols-2 gap-2 text-xs text-zinc-400 border-t border-zinc-800/80 pt-3">
//             <div><span className="text-zinc-500">Duration:</span> {workout.duration} mins</div>
//             <div><span className="text-zinc-500">Calories:</span> {workout.caloriesBurned} kcal</div>
//             <div><span className="text-zinc-500">Equipment:</span> {workout.equipment}</div>
//             <div><span className="text-zinc-500">Difficulty:</span> {workout.difficulty}</div>
//           </div>
//         </div>
//       </div>

//       <div className="p-5 pt-0 flex flex-col gap-2">
//         <div className="grid grid-cols-2 gap-2">
//           <button
//             onClick={() => addToTodaysPlan(workout)}
//             className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold py-2 px-3 rounded-lg transition"
//           >
//             + Today's Plan
//           </button>
//           <button
//             onClick={() => addToSavedForLater(workout)}
//             className="w-full bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold py-2 px-3 rounded-lg transition"
//           >
//             Save Later
//           </button>
//         </div>
//         <Link
//           href={`/workout/${workout.id}`}
//           className="w-full text-center bg-zinc-950 hover:bg-black text-zinc-400 hover:text-white text-xs font-medium py-2 rounded-lg border border-zinc-800 transition"
//         >
//           View Details
//         </Link>
//       </div>
//     </div>
//   );
// }




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
      {/* Image Container */}
      <div className="relative w-full h-48 bg-zinc-950 overflow-hidden">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-cover group-hover:scale-105 transition duration-300"
        />
      </div>

      {/* Content Area */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          {/* Category Badges (muscleGroups) */}
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

          {/* Title */}
          <h3 className="text-base font-black uppercase text-white mb-1 tracking-tight">
            {workout.name}
          </h3>

          {/* Equipment */}
          <p className="text-xs text-zinc-400 font-medium mb-3">
            {workout.equipment}
          </p>
        </div>

        {/* Stats Row */}
        <div className="flex items-center gap-3 text-xs text-zinc-300 font-medium pt-2 border-t border-zinc-800/60">
          <span>⏱ {workout.duration} min</span>
          <span>🔥 {workout.caloriesBurned} kcal</span>
          <span className="flex items-center gap-1">⭐ {workout.rating}</span>
        </div>
      </div>
    </Link>
  );
}