export default function Footer() {
  return (
    <footer className="bg-[#0a0a0c] border-t border-zinc-800 text-zinc-500 text-xs py-8 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-black text-white">
          <span className="text-[#ccff00]">⚡</span> FITLOG
        </div>
        <p>© 2026 FitLog — Workout Library. Train hard, log honest.</p>
      </div>
    </footer>
  );
}