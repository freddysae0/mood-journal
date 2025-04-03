import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Toggle } from "../components/ui/toggle";

describe("Toggle Component", () => {
  test("should render correctly", () => {
    render(<Toggle data-testid="toggle-button" />);
    const toggleButton = screen.getByTestId("toggle-button");
    expect(toggleButton).toBeInTheDocument();
  });

  test("should toggle state on click", () => {
    render(<Toggle data-testid="toggle-button" />);
    const toggleButton = screen.getByTestId("toggle-button");

    // Initial state should be off
    expect(toggleButton).not.toHaveAttribute("data-state", "on");

    // Click to turn on
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute("data-state", "on");

    // Click to turn off
    fireEvent.click(toggleButton);
    expect(toggleButton).not.toHaveAttribute("data-state", "on");
  });

  test("should apply the correct size and variant classes", () => {
    render(<Toggle data-testid="toggle-button" size="lg" variant="outline" />);
    const toggleButton = screen.getByTestId("toggle-button");
    expect(toggleButton).toHaveClass(
      "h-11",
      "px-5",
      "min-w-11",
      "border",
      "border-input",
    );
  });
});
