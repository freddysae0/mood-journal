import type { MoodEntry, MoodType } from "@/types/mood";

/**
 * Generate a unique ID that works in both browser and test environments
 */
function generateId(): string {
  // Check if crypto.randomUUID is available (modern browsers and Node.js 15+)
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  // Fallback for environments without crypto.randomUUID
  return (
    // biome-ignore lint/style/useTemplate: ai code
    "id-" +
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

/**
 * Creates a new mood entry
 */
export function createMoodEntry(
  mood: MoodType,
  note = "",
  id?: string,
): MoodEntry {
  return {
    id: id || generateId(),
    date: new Date().toISOString(),
    mood,
    note,
  };
}

/**
 * Checks if an entry exists for a specific date
 */
export function hasEntryForDate(entries: MoodEntry[], date: Date): boolean {
  const dateStr = date.toISOString().split("T")[0];
  return entries.some((entry) => entry.date.split("T")[0] === dateStr);
}

/**
 * Gets an entry for a specific date if it exists
 */
export function getEntryForDate(
  entries: MoodEntry[],
  date: Date,
): MoodEntry | undefined {
  const dateStr = date.toISOString().split("T")[0];
  return entries.find((entry) => entry.date.split("T")[0] === dateStr);
}

/**
 * Adds or updates a mood entry in the entries array
 */
export function addOrUpdateMoodEntry(
  entries: MoodEntry[],
  newEntry: MoodEntry,
): MoodEntry[] {
  const entryDate = new Date(newEntry.date).toISOString().split("T")[0];
  const existingEntryIndex = entries.findIndex(
    (e) => e.date.split("T")[0] === entryDate,
  );

  if (existingEntryIndex !== -1) {
    // Update existing entry
    const updatedEntries = [...entries];
    updatedEntries[existingEntryIndex] = newEntry;
    return updatedEntries;
  }
  // Add new entry
  return [...entries, newEntry];
}

/**
 * Gets entries for a specific month
 */
export function getEntriesForMonth(
  entries: MoodEntry[],
  year: number,
  month: number,
): MoodEntry[] {
  const monthStr = `${year}-${String(month + 1).padStart(2, "0")}`;
  return entries.filter((entry) => entry.date.startsWith(monthStr));
}

/**
 * Sorts entries by date (newest first)
 */
export function sortEntriesByDate(
  entries: MoodEntry[],
  ascending = false,
): MoodEntry[] {
  return [...entries].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return ascending ? dateA - dateB : dateB - dateA;
  });
}
