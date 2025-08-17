import { test, expect } from "@playwright/test";
import * as allure from "allure-js-commons";

test("can create and display a todo", async ({ page }) => {
  // await allure.epic('Web Interface');
  // await allure.feature('Todo Management');
  // await allure.story('Create Todo');
  // await allure.severity('normal');
  // await allure.tag('smoke');

  await allure.step("Navigate to todos page", async () => {
    await page.goto("/todos");
  });

  await allure.step("Add new todo", async () => {
    const input = page.getByPlaceholder("Add new todo");
    await input.fill("Buy milk");
    await input.press("Enter");
  });

  await allure.step("Verify todo is displayed", async () => {
    await expect(page.getByText("Buy milk")).toBeVisible();
    const screenshot = await page.screenshot();
    await allure.attachment("Todo Screenshot", screenshot, "image/png");
  });
});
