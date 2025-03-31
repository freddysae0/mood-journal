/**
 * Saves mood entries to localStorage
 */
import type { MoodEntry } from "@/types/mood";

export function saveEntriesToStorage(entries: MoodEntry[]): void {
  localStorage.setItem("moodEntries", JSON.stringify(entries));
}

/**
 * Loads mood entries from localStorage
 */
export function loadEntriesFromStorage(): MoodEntry[] {
  const savedEntries = localStorage.getItem("moodEntries");
  return savedEntries ? JSON.parse(savedEntries) : [];
}
