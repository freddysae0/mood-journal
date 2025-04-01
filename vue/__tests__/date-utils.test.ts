import {
  getDaysInMonth,
  getFirstDayOfMonth,
  formatDateString,
  isSameDay,
  getDateForDay,
} from "@/utils/date-utils";
import { describe, it, expect } from "vitest";

describe("Date Utilities", () => {
  describe("getDaysInMonth", () => {
    it("returns the correct number of days for months with 31 days", () => {
      expect(getDaysInMonth(2023, 0)).toBe(31); // January
      expect(getDaysInMonth(2023, 2)).toBe(31); // March
      expect(getDaysInMonth(2023, 4)).toBe(31); // May
      expect(getDaysInMonth(2023, 6)).toBe(31); // July
      expect(getDaysInMonth(2023, 7)).toBe(31); // August
      expect(getDaysInMonth(2023, 9)).toBe(31); // October
      expect(getDaysInMonth(2023, 11)).toBe(31); // December
    });

    it("returns the correct number of days for months with 30 days", () => {
      expect(getDaysInMonth(2023, 3)).toBe(30); // April
      expect(getDaysInMonth(2023, 5)).toBe(30); // June
      expect(getDaysInMonth(2023, 8)).toBe(30); // September
      expect(getDaysInMonth(2023, 10)).toBe(30); // November
    });

    it("returns the correct number of days for February in a non-leap year", () => {
      expect(getDaysInMonth(2023, 1)).toBe(28); // February 2023
    });

    it("returns the correct number of days for February in a leap year", () => {
      expect(getDaysInMonth(2020, 1)).toBe(29); // February 2020
      expect(getDaysInMonth(2024, 1)).toBe(29); // February 2024
    });
  });

  describe("getFirstDayOfMonth", () => {
    it("returns the correct day of the week for the first day of the month", () => {
      expect(getFirstDayOfMonth(2023, 0)).toBe(0); // January 1, 2023 was a Sunday (0)
      expect(getFirstDayOfMonth(2023, 1)).toBe(3); // February 1, 2023 was a Wednesday (3)
      expect(getFirstDayOfMonth(2023, 2)).toBe(3); // March 1, 2023 was a Wednesday (3)
      expect(getFirstDayOfMonth(2023, 5)).toBe(4); // June 1, 2023 was a Thursday (4)
    });
  });

  describe("formatDateString", () => {
    it("formats the date as YYYY-MM-DD", () => {
      expect(formatDateString(new Date(2023, 0, 1))).toBe("2023-01-01");
      expect(formatDateString(new Date(2023, 5, 15))).toBe("2023-06-15");
      expect(formatDateString(new Date(2023, 11, 31))).toBe("2023-12-31");
    });

    it("pads single-digit months and days with a leading zero", () => {
      expect(formatDateString(new Date(2023, 0, 1))).toBe("2023-01-01");
      expect(formatDateString(new Date(2023, 8, 9))).toBe("2023-09-09");
    });
  });

  describe("isSameDay", () => {
    it("returns true for dates on the same day, regardless of time", () => {
      const date1 = new Date(2023, 5, 15, 9, 0, 0);
      const date2 = new Date(2023, 5, 15, 18, 30, 0);

      expect(isSameDay(date1, date2)).toBe(true);
    });

    it("returns false for dates on different days", () => {
      const date1 = new Date(2023, 5, 15);
      const date2 = new Date(2023, 5, 16);

      expect(isSameDay(date1, date2)).toBe(false);
    });

    it("returns false for dates in different months", () => {
      const date1 = new Date(2023, 5, 15);
      const date2 = new Date(2023, 6, 15);

      expect(isSameDay(date1, date2)).toBe(false);
    });

    it("returns false for dates in different years", () => {
      const date1 = new Date(2023, 5, 15);
      const date2 = new Date(2024, 5, 15);

      expect(isSameDay(date1, date2)).toBe(false);
    });
  });

  describe("getDateForDay", () => {
    it("returns a Date object for the specified year, month, and day", () => {
      const date = getDateForDay(2023, 5, 15);

      expect(date.getFullYear()).toBe(2023);
      expect(date.getMonth()).toBe(5);
      expect(date.getDate()).toBe(15);
    });
  });
});
