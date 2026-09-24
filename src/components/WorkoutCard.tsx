import Link from "next/link";
import { Workout } from "@/types/workout";
import Image from "next/image";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  const { id, name, category, equipment, duration, calories, rating, image } = workout;

  return (
    <Link href={`/workout/${id}`} className="group block bg-[#141416] border border-zinc-800 hover:border-zinc-700 rounded-lg overflow-hidden transition">
      <div className="relative aspect-16/10 bg-zinc-900 overflow-hidden">
        <Image
          src={image || "https://placehold.co/600x400/18181b/ffffff?text=Workout"}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />
      </div>

      <div className="p-4">
        <div className="flex flex-wrap gap-1.5 mb-2">
          {category?.map((cat, idx) => (
            <span
              key={idx}
              className="bg-[#ccff00] text-black text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-sm"
            >
              {cat}
            </span>
          ))}
        </div>

        <h3 className="text-base font-black tracking-wide uppercase text-white mb-1 group-hover:text-[#ccff00] transition">
          {name}
        </h3>
        <p className="text-xs text-zinc-400 mb-4">{equipment}</p>

        <div className="flex items-center gap-4 text-xs text-zinc-400 pt-3 border-t border-zinc-800/80">
          <span className="flex items-center gap-1">⏱️ {duration} min</span>
          <span className="flex items-center gap-1">🔥 {calories} kcal</span>
          <span className="flex items-center gap-1">⭐ {rating}</span>
        </div>
      </div>
    </Link>
  );
}