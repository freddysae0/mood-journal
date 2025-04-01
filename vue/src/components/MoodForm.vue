<template>
  <div class="p-6 rounded-xl shadow-lg transition-all">
    <h2 class="text-2xl font-bold mb-6 text-center">
      How are you feeling today?
    </h2>

    <div class="mood-selector flex justify-center gap-4 mb-6">
      <button
        v-for="mood in moods"
        :key="mood"
        @click="selectedMood = mood"
        class="text-4xl p-3 rounded-full transition-transform transform hover:scale-110"
        :class="
          selectedMood === mood
            ? 'bg-blue-100 dark:bg-blue-900 ring-2 ring-blue-500 scale-110'
            : ''
        "
      >
        {{ mood }}
      </button>
    </div>

    <div class="mb-6">
      <label for="note" class="block mb-2 font-medium"
        >Add a note (optional)</label
      >
      <textarea
        id="note"
        v-model="note"
        rows="3"
        class="w-full p-3 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600"
        placeholder="Write about your day..."
      ></textarea>
    </div>

    <button
      @click="saveEntry"
      :disabled="!selectedMood"
      class="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Save Entry
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { createMoodEntry } from "../utils/mood-utils";

const moods = ["😊", "😐", "😞"];
const selectedMood = ref("");
const note = ref("");

const emit = defineEmits(["save-entry"]);

function saveEntry() {
  if (!selectedMood.value) return;

  const entry = createMoodEntry(selectedMood.value, note.value);
  emit("save-entry", entry);

  // Reset form
  selectedMood.value = "";
  note.value = "";
}
</script>
