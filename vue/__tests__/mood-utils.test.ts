import type { MoodEntry } from "@/types/mood";
import {
  addOrUpdateMoodEntry,
  createMoodEntry,
  getEntriesForMonth,
  getEntryForDate,
  hasEntryForDate,
  sortEntriesByDate,
} from "@/utils/mood-utils";
import { describe, expect, it } from "vitest";

describe("Mood Utilities", () => {
  describe("createMoodEntry", () => {
    it("creates a mood entry with the provided mood and note", () => {
      const entry = createMoodEntry("😊", "Had a great day!");

      expect(entry.id).toBeTruthy(); // Just check that an ID was generated
      expect(entry.mood).toBe("😊");
      expect(entry.note).toBe("Had a great day!");
      expect(entry.date).toBeTruthy(); // Check that a date was set
    });

    it("creates a mood entry with an empty note if not provided", () => {
      const entry = createMoodEntry("😐");
      expect(entry.note).toBe("");
    });

    it("uses the provided ID if one is given", () => {
      const customId = "custom-id-123";
      const entry = createMoodEntry("😞", "Bad day", customId);
      expect(entry.id).toBe(customId);
    });
  });

  describe("hasEntryForDate and getEntryForDate", () => {
    const entries: MoodEntry[] = [
      {
        id: "1",
        date: "2023-06-10T12:00:00.000Z",
        mood: "😊",
        note: "Note 1",
      },
      {
        id: "2",
        date: "2023-06-15T15:30:00.000Z",
        mood: "😐",
        note: "Note 2",
      },
    ];

    it("checks if an entry exists for a date", () => {
      // Create a date that matches one of our entries
      const matchDate = new Date("2023-06-15T00:00:00.000Z");
      expect(hasEntryForDate(entries, matchDate)).toBe(true);

      // Create a date that doesn't match any entry
      const noMatchDate = new Date("2023-06-20T00:00:00.000Z");
      expect(hasEntryForDate(entries, noMatchDate)).toBe(false);
    });

    it("gets an entry for a specific date", () => {
      const matchDate = new Date("2023-06-15T00:00:00.000Z");
      const entry = getEntryForDate(entries, matchDate);

      expect(entry).toBeDefined();
      expect(entry?.id).toBe("2");

      const noMatchDate = new Date("2023-06-20T00:00:00.000Z");
      expect(getEntryForDate(entries, noMatchDate)).toBeUndefined();
    });
  });

  describe("addOrUpdateMoodEntry", () => {
    it("adds a new entry when no entry exists for that date", () => {
      const entries: MoodEntry[] = [
        {
          id: "1",
          date: "2023-06-10T12:00:00.000Z",
          mood: "😊",
          note: "Note 1",
        },
      ];

      const newEntry: MoodEntry = {
        id: "2",
        date: "2023-06-15T15:30:00.000Z",
        mood: "😐",
        note: "Note 2",
      };

      const result = addOrUpdateMoodEntry(entries, newEntry);
      expect(result.length).toBe(2);
      expect(result).toContainEqual(newEntry);
    });

    it("updates an existing entry when one exists for that date", () => {
      const entries: MoodEntry[] = [
        {
          id: "1",
          date: "2023-06-10T12:00:00.000Z",
          mood: "😊",
          note: "Note 1",
        },
        {
          id: "2",
          date: "2023-06-15T15:30:00.000Z",
          mood: "😐",
          note: "Note 2",
        },
      ];

      const updatedEntry: MoodEntry = {
        id: "3",
        date: "2023-06-15T18:00:00.000Z", // Same day as entry with id '2'
        mood: "😞",
        note: "Updated note",
      };

      const result = addOrUpdateMoodEntry(entries, updatedEntry);

      // Should still have 2 entries (replaced one)
      expect(result.length).toBe(2);

      // Should contain the updated entry
      expect(result).toContainEqual(updatedEntry);

      // Should not contain the original entry for that date
      expect(result.find((e) => e.id === "2")).toBeUndefined();
    });
  });

  describe("getEntriesForMonth", () => {
    const entries: MoodEntry[] = [
      {
        id: "1",
        date: "2023-05-25T12:00:00.000Z", // May
        mood: "😊",
        note: "Note 1",
      },
      {
        id: "2",
        date: "2023-06-10T15:30:00.000Z", // June
        mood: "😐",
        note: "Note 2",
      },
      {
        id: "3",
        date: "2023-06-15T10:00:00.000Z", // June
        mood: "😞",
        note: "Note 3",
      },
    ];

    it("returns entries for the specified month", () => {
      const juneEntries = getEntriesForMonth(entries, 2023, 5); // June (0-indexed)
      expect(juneEntries.length).toBe(2);

      const mayEntries = getEntriesForMonth(entries, 2023, 4); // May (0-indexed)
      expect(mayEntries.length).toBe(1);

      const julyEntries = getEntriesForMonth(entries, 2023, 6); // July (0-indexed)
      expect(julyEntries.length).toBe(0);
    });
  });

  describe("sortEntriesByDate", () => {
    const entries: MoodEntry[] = [
      {
        id: "1",
        date: "2023-06-10T12:00:00.000Z", // June 10
        mood: "😊",
        note: "Note 1",
      },
      {
        id: "2",
        date: "2023-06-15T15:30:00.000Z", // June 15
        mood: "😐",
        note: "Note 2",
      },
      {
        id: "3",
        date: "2023-06-05T10:00:00.000Z", // June 5
        mood: "😞",
        note: "Note 3",
      },
    ];

    it("sorts entries by date", () => {
      // Descending order (newest first)
      const descending = sortEntriesByDate(entries);
      expect(descending[0].date).toBe("2023-06-15T15:30:00.000Z"); // June 15
      expect(descending[1].date).toBe("2023-06-10T12:00:00.000Z"); // June 10
      expect(descending[2].date).toBe("2023-06-05T10:00:00.000Z"); // June 5

      // Ascending order (oldest first)
      const ascending = sortEntriesByDate(entries, true);
      expect(ascending[0].date).toBe("2023-06-05T10:00:00.000Z"); // June 5
      expect(ascending[1].date).toBe("2023-06-10T12:00:00.000Z"); // June 10
      expect(ascending[2].date).toBe("2023-06-15T15:30:00.000Z"); // June 15
    });
  });
});
