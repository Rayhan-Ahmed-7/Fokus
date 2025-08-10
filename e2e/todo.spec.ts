import { test, expect } from "@playwright/test";

test("can create and display a todo", async ({ page }) => {
  await page.goto("http://localhost:4173/todos");
  const input = page.getByPlaceholder("Add new todo");
  await input.fill("Buy milk");
  await input.press("Enter");
  await expect(page.getByText("Buy milk")).toBeVisible();
});
