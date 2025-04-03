import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
// @ts-ignore
import ToggleThemeButton from "../src/components/ThemeToggle.vue";

describe("ToggleThemeButton", () => {
  it("renders correctly in light mode", () => {
    const wrapper = mount(ToggleThemeButton, {
      props: { isDarkMode: false },
    });

    expect(wrapper.classes()).toContain("bg-gray-200");
    expect(wrapper.find("svg").exists()).toBe(true);
    expect(wrapper.find("svg").classes()).toContain("text-gray-700");
  });

  it("renders correctly in dark mode", () => {
    const wrapper = mount(ToggleThemeButton, {
      props: { isDarkMode: true },
    });

    expect(wrapper.classes()).toContain("bg-gray-700");
    expect(wrapper.find("svg").exists()).toBe(true);
    expect(wrapper.find("svg").classes()).toContain("text-yellow-300");
  });

  it("emits toggle-theme event on click", async () => {
    const wrapper = mount(ToggleThemeButton, {
      props: { isDarkMode: false },
    });

    await wrapper.trigger("click");
    expect(wrapper.emitted("toggle-theme")).toBeTruthy();
  });
});
