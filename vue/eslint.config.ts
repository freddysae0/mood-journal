import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["app/**/*.ts", "app/**/*.tsx"],
    ignores: [],
    rules: {
      semi: "error",
    },
  },
]);
