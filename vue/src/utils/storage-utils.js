const STORAGE_KEY = "moodEntries";

/**
 * Saves mood entries to localStorage
 */
export function saveEntriesToStorage(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

/**
 * Loads mood entries from localStorage
 */
export function loadEntriesFromStorage() {
  const savedEntries = localStorage.getItem(STORAGE_KEY);
  return savedEntries ? JSON.parse(savedEntries) : [];
}
