"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { createMoodEntry, updateMoodEntry } from "@/lib/api";
import {
  type MoodEntry,
  type MoodType,
  parseMoodToBackend,
  parseMoodToFrontend,
} from "@/types/mood";
import { HeartHandshake } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface MoodFormProps {
  entries: MoodEntry[];
  setEntries: React.Dispatch<React.SetStateAction<MoodEntry[]>>;
}

export default function MoodForm({ entries, setEntries }: MoodFormProps) {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [todayEntry, setTodayEntry] = useState<MoodEntry | null>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState("");

  // Only render theme-dependent UI on the client to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Check if there's already an entry for today
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const existingEntry = entries.find((e) => e.date.split("T")[0] === today);

    if (existingEntry) {
      setTodayEntry(existingEntry);
      setSelectedMood(parseMoodToFrontend(existingEntry.mood));
      setNote(existingEntry.note);
    } else {
      setTodayEntry(null);
      setSelectedMood(null);
      setNote("");
    }
  }, [entries]);

  const moods: MoodType[] = ["😊", "😐", "😞"];
  const moodColors = {
    "😊": "bg-gradient-to-br from-green-400 to-emerald-500",
    "😐": "bg-gradient-to-br from-amber-400 to-yellow-500",
    "😞": "bg-gradient-to-br from-red-400 to-rose-500",
  };

  const handleSubmit = async () => {
    if (!selectedMood) return;

    setIsSubmitting(true);
    setError("");

    try {
      const now = new Date().toISOString();

      if (todayEntry) {
        // Update existing entry
        const updatedEntry = await updateMoodEntry(
          Number.parseInt(todayEntry.id),
          note,
          selectedMood,
          now,
        );

        // Update the entries state
        setEntries((prev) =>
          prev.map((entry) =>
            entry.id === todayEntry.id
              ? {
                  id: updatedEntry.id.toString(),
                  date: updatedEntry.date,
                  mood: updatedEntry.mood,
                  note: updatedEntry.note,
                }
              : entry,
          ),
        );
      } else {
        // Create new entry
        console.log(selectedMood);
        const newEntry = await createMoodEntry(note, selectedMood, now);

        console.log(newEntry);
        console.log(newEntry.mood);

        // Add the new entry to the entries state
        setEntries((prev) => [
          ...prev,
          {
            id: newEntry.id.toString(),
            date: newEntry.date,
            mood: newEntry.mood,
            note: newEntry.note,
          },
        ]);
      }
    } catch (err) {
      console.error("Error saving mood entry:", err);
      setError(
        err instanceof Error ? err.message : "Failed to save your mood entry",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full transition-all duration-300 hover:shadow-lg border-none overflow-hidden bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <CardContent className="p-6 md:p-8">
        <div className="flex items-center gap-2 mb-6">
          <HeartHandshake className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">
            How are you feeling today?
            {mounted && (
              <span className="ml-2 text-xs text-muted-foreground">
                {resolvedTheme === "dark" ? "🌙 Dark mode" : "☀️ Light mode"}
              </span>
            )}
          </h2>
        </div>

        <div className="flex justify-center gap-6 mb-8">
          {moods.map((mood) => (
            <button
              type="button"
              key={mood}
              onClick={() => setSelectedMood(mood)}
              className={`text-4xl p-4 rounded-full transition-all duration-300 transform hover:scale-110 shadow-sm
               ${
                 selectedMood === mood
                   ? `${moodColors[mood]} text-white scale-110 shadow-md`
                   : "bg-secondary hover:bg-secondary/80"
               }`}
              aria-label={`Select mood: ${mood}`}
            >
              {mood}
            </button>
          ))}
        </div>

        <div className="mb-6">
          <Textarea
            placeholder="Add a note about your day (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="resize-none min-h-[120px] bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-primary/10 focus-visible:ring-primary/20"
          />
        </div>

        {error && (
          <div className="p-3 mb-4 rounded-md bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        <Button
          onClick={handleSubmit}
          disabled={!selectedMood || isSubmitting}
          className="w-full bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 transition-all duration-300"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Saving...
            </span>
          ) : (
            <>{todayEntry ? "Update" : "Save"} Today's Mood</>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
