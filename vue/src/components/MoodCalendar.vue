<template>
  <div class="p-6 rounded-xl shadow-lg">
    <div class="flex justify-between items-center mb-6">
      <button
        @click="prevMonth"
        class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <h2 class="text-2xl font-bold">{{ monthName }} {{ year }}</h2>

      <button
        @click="nextMonth"
        class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>

    <div class="grid grid-cols-7 gap-1 text-center mb-2">
      <div v-for="day in weekdays" :key="day" class="font-medium text-sm py-1">
        {{ day }}
      </div>
    </div>

    <div class="grid grid-cols-7 gap-1">
      <!-- Empty cells for days before the first day of the month -->
      <div
        v-for="_ in firstDayOfMonth"
        :key="'empty-' + _"
        class="aspect-square"
      ></div>

      <!-- Calendar days -->
      <div v-for="day in daysInMonth" :key="day" class="aspect-square p-1">
        <div
          class="h-full w-full flex flex-col items-center justify-center rounded-full relative"
          :class="getDayClass(day)"
        >
          <span class="text-sm">{{ day }}</span>
          <span v-if="getMoodForDay(day)" class="absolute bottom-1 text-xs">
            {{ getMoodForDay(day) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import {
  getDaysInMonth,
  getFirstDayOfMonth,
  getDateForDay,
} from "../utils/date-utils";
import { getEntryForDate } from "../utils/mood-utils";

const props = defineProps({
  entries: {
    type: Array,
    required: true,
  },
});

const currentDate = new Date();
const currentMonth = ref(currentDate.getMonth());
const currentYear = ref(currentDate.getFullYear());

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const monthName = computed(() => {
  return new Date(currentYear.value, currentMonth.value).toLocaleString(
    "default",
    { month: "long" },
  );
});

const daysInMonth = computed(() => {
  return getDaysInMonth(currentYear.value, currentMonth.value);
});

const firstDayOfMonth = computed(() => {
  return getFirstDayOfMonth(currentYear.value, currentMonth.value);
});

const year = computed(() => {
  return currentYear.value;
});

function prevMonth() {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value--;
  } else {
    currentMonth.value--;
  }
}

function nextMonth() {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value++;
  } else {
    currentMonth.value++;
  }
}

function getMoodForDay(day) {
  const date = getDateForDay(currentYear.value, currentMonth.value, day);
  const entry = getEntryForDate(props.entries, date);
  return entry ? entry.mood : null;
}

function getDayClass(day) {
  const date = getDateForDay(currentYear.value, currentMonth.value, day);
  const today = new Date();
  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  const mood = getMoodForDay(day);

  let moodClass = "";
  if (mood) {
    switch (mood) {
      case "😊":
        moodClass = "bg-green-100 dark:bg-green-900/30";
        break;
      case "😐":
        moodClass = "bg-yellow-100 dark:bg-yellow-900/30";
        break;
      case "😞":
        moodClass = "bg-red-100 dark:bg-red-900/30";
        break;
    }
  }

  return {
    "border border-blue-500": isToday,
    [moodClass]: mood,
    "hover:bg-gray-100 dark:hover:bg-gray-700": !mood,
  };
}
</script>
