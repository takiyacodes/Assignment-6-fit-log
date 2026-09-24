"use client";

export default function Hero() {
  const scrollToLibrary = () => {
    const element = document.getElementById("library");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="bg-[#141416] border-b border-zinc-800 py-12 md:py-20 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        <div>
          <span className="text-[#ccff00] text-xs font-bold tracking-widest uppercase block mb-3">
            WORKOUT LIBRARY
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-none mb-4 uppercase">
            TRAIN WITH INTENT. <br />
            LOG EVERY SET.
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base mb-6 leading-relaxed max-w-lg">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.
          </p>
          <button
            onClick={scrollToLibrary}
            className="bg-[#ccff00] hover:bg-[#b3e600] text-black font-extrabold px-6 py-3.5 rounded text-sm tracking-wider uppercase flex items-center gap-2 transition"
          >
            <span>BROWSE WORKOUTS</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>

        <div className="flex justify-center md:justify-end">
          <div className="relative w-full max-w-md aspect-4/3 rounded-lg overflow-hidden border border-zinc-800 bg-zinc-900 flex items-center justify-center">
             <img
              src="https://web.programming-hero.com/assets/informative-eHraW5Rc.png"
              alt="FitLog Banner"
              className="object-cover w-full h-full"
            />
          </div>
        </div>

      </div>
    </section>
  );
}