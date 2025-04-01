import { saveEntriesToStorage, loadEntriesFromStorage } from "./storage-utils";
import type { MoodEntry } from "@/types/mood";
import { describe, it, expect, beforeEach, vi } from "vitest";

describe("Storage Utilities", () => {
  beforeEach(() => {
    // Mock localStorage
    const mockLocalStorage: Record<string, string> = {};
    global.localStorage = {
      setItem: vi.fn((key, value) => {
        mockLocalStorage[key] = value;
      }),
      getItem: vi.fn((key) => mockLocalStorage[key] || null),
      removeItem: vi.fn((key) => {
        delete mockLocalStorage[key];
      }),
      clear: vi.fn(() => {
        Object.keys(mockLocalStorage).forEach(
          (key) => delete mockLocalStorage[key],
        );
      }),
    } as unknown as Storage;

    vi.restoreAllMocks();
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

      localStorage.setItem("moodEntries", JSON.stringify(entries));

      const loadedEntries = loadEntriesFromStorage();

      expect(localStorage.getItem).toHaveBeenCalledWith("moodEntries");
      expect(loadedEntries).toEqual(entries);
    });

    it("returns an empty array if no entries are found in localStorage", () => {
      const loadedEntries = loadEntriesFromStorage();

      expect(loadedEntries).toEqual([]);
    });
  });
});
