"use client";

import { useState, useEffect } from "react";
import MoodForm from "@/components/mood-form";
import MoodHistory from "@/components/mood-history";
import MoodCalendar from "@/components/mood-calendar";
import ThemeToggle from "@/components/theme-toggle";
import type { MoodEntry } from "@/types/mood";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles } from "lucide-react";

export default function Home() {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);

  // Load mood entries from localStorage on initial render
  useEffect(() => {
    const savedEntries = localStorage.getItem("moodEntries");
    if (savedEntries) {
      setMoodEntries(JSON.parse(savedEntries));
    }
  }, []);

  // Save mood entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("moodEntries", JSON.stringify(moodEntries));
  }, [moodEntries]);

  const addMoodEntry = (entry: MoodEntry) => {
    // Check if there's already an entry for today
    const today = new Date().toISOString().split("T")[0];
    const existingEntryIndex = moodEntries.findIndex(
      (e) => e.date.split("T")[0] === today,
    );

    if (existingEntryIndex !== -1) {
      // Update existing entry
      const updatedEntries = [...moodEntries];
      updatedEntries[existingEntryIndex] = entry;
      setMoodEntries(updatedEntries);
    } else {
      // Add new entry
      setMoodEntries([...moodEntries, entry]);
    }
  };

  return (
    <main className="min-h-screen p-4 md:p-8 transition-colors duration-300 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary animate-pulse-slow" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-400 dark:to-purple-300 bg-clip-text text-transparent">
              Mood Journal
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden md:inline-block">
              Theme
            </span>
            <ThemeToggle />
          </div>
        </div>

        <MoodForm onAddEntry={addMoodEntry} entries={moodEntries} />

        <Tabs defaultValue="timeline" className="mt-10">
          <TabsList className="grid w-full grid-cols-2 mb-6 rounded-full p-1 bg-secondary/50 backdrop-blur-sm">
            <TabsTrigger
              value="timeline"
              className="rounded-full data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-primary data-[state=active]:shadow-sm"
            >
              Timeline
            </TabsTrigger>
            <TabsTrigger
              value="calendar"
              className="rounded-full data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-primary data-[state=active]:shadow-sm"
            >
              Calendar
            </TabsTrigger>
          </TabsList>
          <TabsContent value="timeline" className="mt-4 animate-fadeIn">
            <MoodHistory entries={moodEntries} />
          </TabsContent>
          <TabsContent value="calendar" className="mt-4 animate-fadeIn">
            <MoodCalendar entries={moodEntries} />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
