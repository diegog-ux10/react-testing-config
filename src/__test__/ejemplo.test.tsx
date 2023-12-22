import { render, screen } from "@testing-library/react";
import App from "../App";

test("loads and displays greeting", async () => {
  // ✅ ARRANGE
  render(<App />);

  // ✅ ACT
  await screen.findByRole("heading");

  // ✅ ASSERT
  expect(screen.getAllByText("Vite + React")).not.toBeNull();
});
