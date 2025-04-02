import { expect, test } from "@playwright/test";

const testingFn = (app: "Vue" | "React") => {
  test.describe(`Shrek Adjective Changer - - - ${app} TEST`, () => {
    test("Simple test", async ({ page }) => {
      expect(true).toBeTruthy();
    });
  });
};
testingFn("React");
testingFn("Vue");
