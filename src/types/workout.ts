export interface Workout {
  id: string | number;
  name: string;
  category: string[];
  equipment: string;
  difficulty?: string;
  sets?: number | string;
  reps?: string;
  duration: number | string;
  calories: number | string;
  rating: number | string;
  image: string;
  description?: string;
  instructions?: string[];
  isDone?: boolean;
}

export interface WorkoutContextType {
  todayPlan: Workout[];
  savedWorkouts: Workout[];
  addToPlan: (workout: Workout) => void;
  addToSaved: (workout: Workout) => void;
  removeFromPlan: (id: string | number) => void;
  removeFromSaved: (id: string | number) => void;
  toggleDone: (id: string | number) => void;
}