import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-8xl font-black text-[#ccff00] mb-2">404</h1>
      <h2 className="text-2xl font-bold uppercase mb-2">PAGE NOT FOUND</h2>
      <p className="text-zinc-400 text-xs mb-6">The page or exercise you are looking for does not exist.</p>
      <Link href="/" className="bg-[#ccff00] text-black font-extrabold text-xs uppercase px-6 py-3 rounded">
        Return to Workouts
      </Link>
    </div>
  );
}