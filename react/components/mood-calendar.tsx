"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { MoodEntry } from "@/types/mood";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

interface MoodCalendarProps {
  entries: MoodEntry[];
}

export default function MoodCalendar({ entries }: MoodCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<MoodEntry | null>(null);

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDay(null);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDay(null);
  };

  const getMoodForDay = (day: number): MoodEntry | undefined => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day,
    ).padStart(2, "0")}`;
    return entries.find((entry) => entry.date.startsWith(dateStr));
  };

  const handleDayClick = (day: number) => {
    const entry = getMoodForDay(day);
    setSelectedDay(entry || null);
  };

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case "😊":
        return "bg-gradient-to-br from-green-400 to-emerald-500 text-white";
      case "😐":
        return "bg-gradient-to-br from-amber-400 to-yellow-500 text-white";
      case "😞":
        return "bg-gradient-to-br from-red-400 to-rose-500 text-white";
      default:
        return "";
    }
  };

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="h-10 w-10" />);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const entry = getMoodForDay(day);
    const isToday =
      new Date().getDate() === day &&
      new Date().getMonth() === month &&
      new Date().getFullYear() === year;

    days.push(
      <button
        type="button"
        key={day}
        onClick={() => handleDayClick(day)}
        className={`h-10 w-10 rounded-full flex items-center justify-center transition-all duration-200
          ${
            isToday
              ? "ring-2 ring-primary ring-offset-2 dark:ring-offset-gray-900"
              : ""
          }
          ${entry ? getMoodColor(entry.mood) : "hover:bg-secondary"}`}
      >
        <div className="relative">
          <span>{day}</span>
        </div>
      </button>,
    );
  }

  return (
    <div>
      <Card className="mb-6 border-none overflow-hidden bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <Button
              variant="outline"
              size="icon"
              onClick={prevMonth}
              className="rounded-full border-primary/20 hover:bg-primary/10"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-medium">
                {currentDate.toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </h3>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={nextMonth}
              className="rounded-full border-primary/20 hover:bg-primary/10"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center mb-3">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="text-sm font-medium text-muted-foreground"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 justify-items-center">
            {days}
          </div>
        </CardContent>
      </Card>

      {selectedDay && (
        <Card className="animate-fadeIn border-none overflow-hidden bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div
                className={`flex items-center justify-center w-12 h-12 rounded-full shadow-sm ${getMoodColor(
                  selectedDay.mood,
                )}`}
              >
                <span className="text-3xl">{selectedDay.mood}</span>
              </div>
              <h3 className="text-lg font-medium">
                {new Date(selectedDay.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </h3>
            </div>
            {selectedDay.note ? (
              <div className="p-4 rounded-lg bg-secondary/30 backdrop-blur-sm">
                <p className="whitespace-pre-wrap">{selectedDay.note}</p>
              </div>
            ) : (
              <p className="text-muted-foreground italic">
                No notes for this day
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
