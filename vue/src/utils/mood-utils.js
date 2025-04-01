/**
 * Generate a unique ID
 */
function generateId() {
  // Check if crypto.randomUUID is available
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  // Fallback for environments without crypto.randomUUID
  return (
    "id-" +
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

/**
 * Creates a new mood entry
 */
export function createMoodEntry(mood, note = "", id) {
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
export function hasEntryForDate(entries, date) {
  const dateStr = date.toISOString().split("T")[0];
  return entries.some((entry) => entry.date.split("T")[0] === dateStr);
}

/**
 * Gets an entry for a specific date if it exists
 */
export function getEntryForDate(entries, date) {
  const dateStr = date.toISOString().split("T")[0];
  return entries.find((entry) => entry.date.split("T")[0] === dateStr);
}

/**
 * Adds or updates a mood entry in the entries array
 */
export function addOrUpdateMoodEntry(entries, newEntry) {
  const entryDate = new Date(newEntry.date).toISOString().split("T")[0];
  const existingEntryIndex = entries.findIndex(
    (e) => e.date.split("T")[0] === entryDate,
  );

  if (existingEntryIndex !== -1) {
    // Update existing entry
    const updatedEntries = [...entries];
    updatedEntries[existingEntryIndex] = newEntry;
    return updatedEntries;
  } else {
    // Add new entry
    return [...entries, newEntry];
  }
}

/**
 * Gets entries for a specific month
 */
export function getEntriesForMonth(entries, year, month) {
  const monthStr = `${year}-${String(month + 1).padStart(2, "0")}`;
  return entries.filter((entry) => entry.date.startsWith(monthStr));
}

/**
 * Sorts entries by date (newest first)
 */
export function sortEntriesByDate(entries, ascending = false) {
  return [...entries].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return ascending ? dateA - dateB : dateB - dateA;
  });
}
