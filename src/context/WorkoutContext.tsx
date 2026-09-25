"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Workout } from "@/types/workout";
import toast from "react-hot-toast";

interface WorkoutContextType {
  todaysPlan: Workout[];
  savedForLater: Workout[];
  completedWorkouts: number[];
  addToTodaysPlan: (workout: Workout) => void;
  addToSavedForLater: (workout: Workout) => void;
  removeFromTodaysPlan: (id: number) => void;
  removeFromSavedForLater: (id: number) => void;
  markAsDone: (id: number) => void;
  isCompleted: (id: number) => boolean;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export function WorkoutProvider({ children }: { children: React.ReactNode }) {
  const [todaysPlan, setTodaysPlan] = useState<Workout[]>([]);
  const [savedForLater, setSavedForLater] = useState<Workout[]>([]);
  const [completedWorkouts, setCompletedWorkouts] = useState<number[]>([]);

  // LocalStorage Sync
  useEffect(() => {
    const localPlan = localStorage.getItem("fitlog_plan");
    const localSaved = localStorage.getItem("fitlog_saved");
    const localCompleted = localStorage.getItem("fitlog_completed");

    if (localPlan) setTodaysPlan(JSON.parse(localPlan));
    if (localSaved) setSavedForLater(JSON.parse(localSaved));
    if (localCompleted) setCompletedWorkouts(JSON.parse(localCompleted));
  }, []);

  useEffect(() => {
    localStorage.setItem("fitlog_plan", JSON.stringify(todaysPlan));
  }, [todaysPlan]);

  useEffect(() => {
    localStorage.setItem("fitlog_saved", JSON.stringify(savedForLater));
  }, [savedForLater]);

  useEffect(() => {
    localStorage.setItem("fitlog_completed", JSON.stringify(completedWorkouts));
  }, [completedWorkouts]);

  const addToTodaysPlan = (workout: Workout) => {
    if (todaysPlan.some((w) => w.id === workout.id)) {
      toast.error("Already in Today's Plan!");
      return;
    }
    if (todaysPlan.length >= 5) {
      toast.error("Limit reached! Max 5 lifts allowed for today.");
      return;
    }
    setTodaysPlan([...todaysPlan, workout]);
    toast.success("Added to today's plan!");
  };

  const addToSavedForLater = (workout: Workout) => {
    if (savedForLater.some((w) => w.id === workout.id)) {
      toast.error("Already in Saved list!");
      return;
    }
    setSavedForLater([...savedForLater, workout]);
    toast.success("Saved for later!");
  };

  const removeFromTodaysPlan = (id: number) => {
    setTodaysPlan(todaysPlan.filter((w) => w.id !== id));
    toast.success("Removed from Today's Plan!");
  };

  const removeFromSavedForLater = (id: number) => {
    setSavedForLater(savedForLater.filter((w) => w.id !== id));
    toast.success("Removed from Saved list!");
  };

  const markAsDone = (id: number) => {
    if (!completedWorkouts.includes(id)) {
      setCompletedWorkouts([...completedWorkouts, id]);
      toast.success("Workout marked as completed! 💪");
    } else {
      toast.error("Already completed!");
    }
  };

  const isCompleted = (id: number) => {
    return completedWorkouts.includes(id);
  };

  return (
    <WorkoutContext.Provider
      value={{
        todaysPlan,
        savedForLater,
        completedWorkouts,
        addToTodaysPlan,
        addToSavedForLater,
        removeFromTodaysPlan,
        removeFromSavedForLater,
        markAsDone,
        isCompleted,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkout() {
  const context = useContext(WorkoutContext);
  if (!context) throw new Error("useWorkout must be used within WorkoutProvider");
  return context;
}