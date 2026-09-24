export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white flex flex-col items-center justify-center p-6">
      <div className="w-10 h-10 border-4 border-[#ccff00] border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-zinc-400 text-sm font-semibold tracking-wide uppercase">Loading Workouts...</p>
    </div>
  );
}