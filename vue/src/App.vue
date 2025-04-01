<template>
  <div
    class="min-h-screen transition-colors duration-300"
    :class="isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'"
  >
    <div class="container mx-auto px-4 py-8 max-w-4xl">
      <header class="flex justify-between items-center mb-8">
        <h1
          class="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
        >
          Mood Journal
        </h1>
        <ThemeToggle :isDarkMode="isDarkMode" @toggle-theme="toggleTheme" />
      </header>

      <main class="grid gap-8 md:grid-cols-[1fr_1.5fr]">
        <div class="order-2 md:order-1">
          <MoodForm
            @save-entry="addMoodEntry"
            :class="isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'"
          />
        </div>
        <div class="order-1 md:order-2 space-y-8">
          <div class="tabs flex space-x-2 mb-4">
            <button
              @click="activeTab = 'history'"
              class="px-4 py-2 rounded-lg transition-colors"
              :class="
                activeTab === 'history'
                  ? isDarkMode
                    ? 'bg-gray-700 text-white'
                    : 'bg-blue-500 text-white'
                  : isDarkMode
                    ? 'text-gray-400 hover:bg-gray-700'
                    : 'text-gray-600 hover:bg-gray-200'
              "
            >
              Timeline
            </button>
            <button
              @click="activeTab = 'calendar'"
              class="px-4 py-2 rounded-lg transition-colors"
              :class="
                activeTab === 'calendar'
                  ? isDarkMode
                    ? 'bg-gray-700 text-white'
                    : 'bg-blue-500 text-white'
                  : isDarkMode
                    ? 'text-gray-400 hover:bg-gray-700'
                    : 'text-gray-600 hover:bg-gray-200'
              "
            >
              Calendar
            </button>
          </div>

          <MoodHistory
            v-if="activeTab === 'history'"
            :entries="sortedEntries"
            :class="isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'"
          />
          <MoodCalendar
            v-else
            :entries="moodEntries"
            :class="isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'"
          />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import ThemeToggle from "./components/ThemeToggle.vue";
import MoodForm from "./components/MoodForm.vue";
import MoodHistory from "./components/MoodHistory.vue";
import MoodCalendar from "./components/MoodCalendar.vue";
import { sortEntriesByDate } from "./utils/mood-utils";
import {
  saveEntriesToStorage,
  loadEntriesFromStorage,
} from "./utils/storage-utils";

// State
const moodEntries = ref([]);
const activeTab = ref("history");
const isDarkMode = ref(false);

// Computed
const sortedEntries = computed(() => {
  return sortEntriesByDate(moodEntries.value);
});

// Methods
function addMoodEntry(entry) {
  // Check if there's an entry for the same day
  const today = new Date(entry.date).toISOString().split("T")[0];
  const existingEntryIndex = moodEntries.value.findIndex(
    (e) => new Date(e.date).toISOString().split("T")[0] === today,
  );

  if (existingEntryIndex !== -1) {
    // Update existing entry
    moodEntries.value[existingEntryIndex] = entry;
  } else {
    // Add new entry
    moodEntries.value.push(entry);
  }
}

function toggleTheme() {
  isDarkMode.value = !isDarkMode.value;
  localStorage.setItem("darkMode", isDarkMode.value ? "dark" : "light");
}

// Lifecycle
onMounted(() => {
  // Load entries from localStorage
  const savedEntries = loadEntriesFromStorage();
  if (savedEntries.length > 0) {
    moodEntries.value = savedEntries;
  }

  // Load theme preference
  const savedTheme = localStorage.getItem("darkMode");
  if (savedTheme) {
    isDarkMode.value = savedTheme === "dark";
  } else {
    // Check system preference
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    isDarkMode.value = prefersDark;
  }
});

// Watch for changes to save to localStorage
watch(
  moodEntries,
  (newEntries) => {
    saveEntriesToStorage(newEntries);
  },
  { deep: true },
);
</script>

<style>
@import "./assets/main.css";

.dark {
  @apply text-white;
}
</style>
