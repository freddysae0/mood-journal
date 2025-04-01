<template>
  <div class="p-6 rounded-xl shadow-lg">
    <h2 class="text-2xl font-bold mb-6">Your Mood Timeline</h2>

    <div
      v-if="entries.length === 0"
      class="text-center py-8 text-gray-500 dark:text-gray-400"
    >
      <p>No mood entries yet. Add your first mood!</p>
    </div>

    <ul v-else class="space-y-4">
      <li
        v-for="entry in entries"
        :key="entry.id"
        class="p-4 rounded-lg border transition-colors"
        :class="getBorderColorClass(entry.mood)"
      >
        <div class="flex justify-between items-start">
          <div class="flex items-center">
            <span class="text-3xl mr-3">{{ entry.mood }}</span>
            <div>
              <p class="font-medium">{{ formatDate(entry.date) }}</p>
              <p class="text-gray-600 dark:text-gray-300 mt-1">
                {{ entry.note || "No note added" }}
              </p>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  entries: {
    type: Array,
    required: true,
  },
});

function formatDate(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

function getBorderColorClass(mood) {
  switch (mood) {
    case "😊":
      return "border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20";
    case "😐":
      return "border-yellow-300 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-900/20";
    case "😞":
      return "border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20";
    default:
      return "border-gray-300 dark:border-gray-700";
  }
}
</script>
