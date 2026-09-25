export interface Workout {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
}

export interface WorkoutContextType {
  todaysPlan: Workout[];
  savedForLater: Workout[];
  addToTodaysPlan: (workout: Workout) => void;
  addToSavedForLater: (workout: Workout) => void;
  removeFromTodaysPlan: (id: number) => void;
  removeFromSavedForLater: (id: number) => void;
}