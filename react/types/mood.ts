export type MoodType = "😊" | "😐" | "😞";

export interface MoodEntry {
  id: string;
  date: string;
  mood: MoodType;
  note: string;
}
