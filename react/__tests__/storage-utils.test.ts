import type { MoodEntry } from "@/types/mood";
import {
  loadEntriesFromStorage,
  saveEntriesToStorage,
} from "@/utils/storage-utils";

describe("Storage Utilities", () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe("saveEntriesToStorage", () => {
    it("saves entries to localStorage with the correct key", () => {
      const entries: MoodEntry[] = [
        {
          id: "1",
          date: "2023-06-10T12:00:00.000Z",
          mood: "😊",
          note: "Note 1",
        },
      ];

      saveEntriesToStorage(entries);

      expect(localStorage.setItem).toHaveBeenCalledWith(
        "moodEntries",
        JSON.stringify(entries),
      );
    });

    it("handles empty arrays correctly", () => {
      saveEntriesToStorage([]);

      expect(localStorage.setItem).toHaveBeenCalledWith("moodEntries", "[]");
    });
  });

  describe("loadEntriesFromStorage", () => {
    it("loads and parses entries from localStorage", () => {
      const entries: MoodEntry[] = [
        {
          id: "1",
          date: "2023-06-10T12:00:00.000Z",
          mood: "😊",
          note: "Note 1",
        },
      ];

      // Setup localStorage to return our test data
      jest
        .spyOn(localStorage, "getItem")
        .mockReturnValue(JSON.stringify(entries));

      const loadedEntries = loadEntriesFromStorage();

      expect(localStorage.getItem).toHaveBeenCalledWith("moodEntries");
      expect(loadedEntries).toEqual(entries);
    });

    it("returns an empty array if no entries are found in localStorage", () => {
      // Setup localStorage to return null (no data found)
      jest.spyOn(localStorage, "getItem").mockReturnValue(null);

      const loadedEntries = loadEntriesFromStorage();

      expect(loadedEntries).toEqual([]);
    });
  });
});
