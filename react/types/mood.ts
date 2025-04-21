export type MoodType = "😊" | "😐" | "😞";
export const parseMoodToBackend = (mood: MoodType): BackendMoodType => {
  const moodMap: Record<MoodType, BackendMoodType> = {
    "😊": "happy",
    "😐": "meh",
    "😞": "sad",
  };

  return moodMap[mood];
};

export const parseMoodToFrontend = (mood: BackendMoodType): MoodType => {
  const moodMap: Record<BackendMoodType, MoodType> = {
    happy: "😊",
    meh: "😐",
    sad: "😞",
  };

  return moodMap[mood];
};

export type BackendMoodType = "happy" | "sad" | "meh";
export interface MoodEntry {
  id: string;
  date: string;
  mood: BackendMoodType;
  note: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
}
