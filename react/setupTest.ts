import "@testing-library/jest-dom";
import { TextDecoder, TextEncoder } from "node:util";
import { jest } from "@jest/globals";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

// Mock next-themes
jest.mock("next-themes", () => ({
  useTheme: () => ({
    theme: "light",
    setTheme: jest.fn(),
    resolvedTheme: "light",
  }),
}));

// Add TextEncoder/TextDecoder for Node environments
global.TextEncoder = TextEncoder;
// biome-ignore lint/suspicious/noExplicitAny: complex typing
global.TextDecoder = TextDecoder as any;

// Mock crypto.randomUUID
global.crypto = {
  ...global.crypto,
  randomUUID: jest.fn(
    () => "123e4567-e89b-12d3-a456-426614174000",
  ) as () => `${string}-${string}-${string}-${string}-${string}`,
};
