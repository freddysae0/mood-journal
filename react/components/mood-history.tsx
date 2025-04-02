"use client";

import { Card, CardContent } from "@/components/ui/card";
import type { MoodEntry } from "@/types/mood";
import { formatDistanceToNow } from "date-fns";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface MoodHistoryProps {
  entries: MoodEntry[];
}

export default function MoodHistory({ entries }: MoodHistoryProps) {
  const [expandedEntryId, setExpandedEntryId] = useState<string | null>(null);

  // Sort entries by date (newest first)
  const sortedEntries = [...entries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const toggleExpand = (id: string) => {
    setExpandedEntryId(expandedEntryId === id ? null : id);
  };

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case "😊":
        return "bg-gradient-to-br from-green-400/20 to-emerald-500/20 border-green-400/30";
      case "😐":
        return "bg-gradient-to-br from-amber-400/20 to-yellow-500/20 border-amber-400/30";
      case "😞":
        return "bg-gradient-to-br from-red-400/20 to-rose-500/20 border-red-400/30";
      default:
        return "";
    }
  };

  if (entries.length === 0) {
    return (
      <div className="text-center p-10 rounded-xl bg-secondary/30 backdrop-blur-sm border border-primary/10">
        <p className="text-lg">
          No mood entries yet. Start tracking your mood today!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sortedEntries.map((entry) => (
        <Card
          key={entry.id}
          className={`overflow-hidden transition-all duration-300 hover:shadow-md border-none ${getMoodColor(
            entry.mood,
          )}`}
          onClick={() => toggleExpand(entry.id)}
        >
          <CardContent className="p-5">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-sm">
                  <span className="text-3xl">{entry.mood}</span>
                </div>
                <div>
                  <p className="font-medium">
                    {new Date(entry.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(entry.date), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-full hover:bg-secondary/50"
                aria-label={
                  expandedEntryId === entry.id
                    ? "Collapse entry"
                    : "Expand entry"
                }
              >
                {expandedEntryId === entry.id ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </button>
            </div>

            {expandedEntryId === entry.id && entry.note && (
              <div className="mt-4 pt-4 border-t border-primary/10 animate-fadeIn">
                <p className="whitespace-pre-wrap">{entry.note}</p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
