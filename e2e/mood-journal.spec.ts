import { test, expect } from "@playwright/test";
import { localhost, port } from "./utils";

const exec = (port: string) => {
  test.describe(`Mood Journal ${port}`, () => {
    test.beforeEach(async ({ page }) => {
      // Clear localStorage before each test
      await page.addInitScript(() => {
        localStorage.clear();
      });

      // Navigate to the app
      await page.goto(`${localhost}:${port}`);
    });

    test("should have the correct title", async ({ page }) => {
      await expect(page).toHaveTitle(/Mood Journal/);
    });

    test("should allow adding a mood entry", async ({ page }) => {
      // Select a mood
      await page.locator('button:has-text("😊")').first().click();

      // Add a note
      await page
        .locator('textarea[placeholder*="Add a note"]')
        .fill("Had a great day testing with Playwright!");

      // Save the entry
      await page.locator('button:text("Save Today\'s Mood")').click();

      // Verify the entry appears in the timeline
      await page.locator('button:has-text("Timeline")').click();
      await expect(
        page.locator("text=Had a great day testing with Playwright!"),
      ).toBeVisible();
    });
  });
};
exec(port("Vue"));
exec(port("React"));
