import "@/app/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WorkoutProvider } from "@/context/WorkoutContext";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "FitLog - Workout Library & Planner",
  description: "Train with intent. Log every set.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0a0a0c] text-white antialiased">
        <WorkoutProvider>
          <Toaster position="bottom-right" toastOptions={{ style: { background: '#1c1c1f', color: '#fff' } }} />
          <Navbar />
          {children}
          <Footer />
        </WorkoutProvider>
      </body>
    </html>
  );
}
