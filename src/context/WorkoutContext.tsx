"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import toast from "react-hot-toast";
import { Workout, WorkoutContextType } from "@/types/workout";

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export function WorkoutProvider({ children }: { children: ReactNode }) {
  const [todayPlan, setTodayPlan] = useState<Workout[]>([]);
  const [savedWorkouts, setSavedWorkouts] = useState<Workout[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const localPlan = localStorage.getItem("fitlog_today_plan");
    const localSaved = localStorage.getItem("fitlog_saved_workouts");

    if (localPlan) {
      try { setTodayPlan(JSON.parse(localPlan)); } catch (e) {}
    }
    if (localSaved) {
      try { setSavedWorkouts(JSON.parse(localSaved)); } catch (e) {}
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("fitlog_today_plan", JSON.stringify(todayPlan));
      localStorage.setItem("fitlog_saved_workouts", JSON.stringify(savedWorkouts));
    }
  }, [todayPlan, savedWorkouts, isLoaded]);

  const addToPlan = (workout: Workout) => {
    if (todayPlan.length >= 5) {
      toast.error("Cap of five lifts reached for today!");
      return;
    }
    if (todayPlan.some((item) => item.id === workout.id)) {
      toast.error("Already in Today's Plan!");
      return;
    }
    setTodayPlan([...todayPlan, { ...workout, isDone: false }]);
    toast.success("Added to today's plan!");
  };

  const addToSaved = (workout: Workout) => {
    if (savedWorkouts.some((item) => item.id === workout.id)) {
      toast.error("Already saved for later!");
      return;
    }
    setSavedWorkouts([...savedWorkouts, workout]);
    toast.success("Saved for later!");
  };

  const removeFromPlan = (id: string | number) => {
    setTodayPlan(todayPlan.filter((item) => item.id !== id));
    toast.success("Removed from today's plan");
  };

  const removeFromSaved = (id: string | number) => {
    setSavedWorkouts(savedWorkouts.filter((item) => item.id !== id));
    toast.success("Removed from saved workouts");
  };

  const toggleDone = (id: string | number) => {
    setTodayPlan((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextState = !item.isDone;
          if (nextState) toast.success("Marked as done!");
          return { ...item, isDone: nextState };
        }
        return item;
      })
    );
  };

  return (
    <WorkoutContext.Provider
      value={{
        todayPlan,
        savedWorkouts,
        addToPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
        toggleDone,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}

export const useWorkout = (): WorkoutContextType => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error("useWorkout must be used within a WorkoutProvider");
  }
  return context;
};