"use client";

import MoodCalendar from "@/components/mood-calendar";
import MoodForm from "@/components/mood-form";
import MoodHistory from "@/components/mood-history";
import ThemeToggle from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  convertStrapiEntriesToAppFormat,
  getCurrentUser,
  getMoodEntries,
  isAuthenticated,
  logout,
} from "@/lib/api";
import type { MoodEntry } from "@/types/mood";
import { LogIn, LogOut, Sparkles, UserPlus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState("");

  // Check authentication status and load data
  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = isAuthenticated();
      setIsLoggedIn(authenticated);

      if (authenticated) {
        try {
          // Get current user
          const user = await getCurrentUser();
          if (user) {
            setUsername(user.username);

            // Get mood entries
            const entriesResponse = await getMoodEntries();
            const formattedEntries =
              convertStrapiEntriesToAppFormat(entriesResponse);
            setMoodEntries(formattedEntries);
          } else {
            // If user fetch fails, log out
            handleLogout();
          }
        } catch (error) {
          console.error("Error loading data:", error);
          handleLogout();
        }
      }

      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    setMoodEntries([]);
    setUsername("");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

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
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <span className="text-sm hidden md:inline">
                  Hello, {username}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="border-primary/20 hover:bg-primary/10 flex items-center gap-1"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Sign Out</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-primary/20 hover:bg-primary/10 flex items-center gap-1"
                  >
                    <LogIn className="h-4 w-4" />
                    <span className="hidden sm:inline">Sign In</span>
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    variant="default"
                    size="sm"
                    className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 flex items-center gap-1"
                  >
                    <UserPlus className="h-4 w-4" />
                    <span className="hidden sm:inline">Sign Up</span>
                  </Button>
                </Link>
              </div>
            )}
            <span className="text-sm text-muted-foreground hidden md:inline-block">
              Theme
            </span>
            <ThemeToggle />
          </div>
        </div>

        {isLoggedIn ? (
          <>
            <MoodForm entries={moodEntries} setEntries={setMoodEntries} />

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
          </>
        ) : (
          <div className="text-center p-10 rounded-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-primary/10 mt-10">
            <h2 className="text-2xl font-bold mb-4">Welcome to Mood Journal</h2>
            <p className="mb-6">
              Sign in or create an account to start tracking your mood and
              emotional wellbeing.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/login">
                <Button
                  variant="outline"
                  className="border-primary/20 hover:bg-primary/10"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
