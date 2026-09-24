import Hero from "@/components/Hero";
import WorkoutCard from "@/components/WorkoutCard";
import { Workout } from "@/types/workout";

async function getWorkouts(): Promise<Workout[]> {
  const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch workouts");
  return res.json();
}

export default async function HomePage() {
  const workouts = await getWorkouts();

  return (
    <main className="bg-[#0a0a0c] min-h-screen text-white pb-20">
      <Hero />

      <section id="library" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="mb-8">
          <h2 className="text-2xl font-black tracking-tight uppercase">THE LIBRARY</h2>
          <p className="text-zinc-400 text-sm mt-1">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {workouts?.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      </section>
    </main>
  );
}
