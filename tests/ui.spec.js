const { test, expect } = require("@playwright/test");
test("all pages render without errors or horizontal page overflow, on desktop and mobile", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const url of [
      "index.html",
      "account.html?id=1",
      "decision-brief.html?id=1",
      "value-radar.html",
      "scenario-simulator.html",
      "ask-business.html",
      "morning-brief.html",
    ]) {
      const response = await page.goto("/" + url);
      expect(response.status()).toBe(200);
      await expect(page.locator(".brand")).toHaveText(
        "Executive DecisionIntelligence System",
      );
      await expect(page.locator("h1")).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
        `${url} at ${width}px`,
      ).toBeTruthy();
    }
  }
  expect(errors).toEqual([]);
});
test("portfolio filters, search, sorting, account context and export work", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("#accountRows tr")).toHaveCount(8);
  await page.getByRole("button", { name: "Needs attention" }).click();
  await expect(page.locator("#accountRows tr")).toHaveCount(5);
  await page.getByRole("button", { name: "All accounts" }).click();
  await page.getByRole("searchbox").fill("Atlas");
  await expect(page.locator("#accountRows tr")).toHaveCount(1);
  await page.getByRole("searchbox").fill("missing");
  await expect(page.locator("#accountRows")).toContainText("No accounts match");
  await page.getByRole("searchbox").fill("");
  await page.locator("#sortRevenue").click();
  await expect(page.locator("#accountRows tr").first()).toContainText(
    "Nova Refractories",
  );
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Export portfolio" }).click();
  expect((await downloadPromise).suggestedFilename()).toBe(
    "executive-decision-intelligence-portfolio-2025.csv",
  );
  await page
    .locator("#accountRows")
    .getByRole("link", { name: "NR Nova Refractories Refractories & steel" })
    .click();
  await expect(page.locator("h1")).toHaveText("Nova Refractories");
  await page.getByRole("link", { name: "Build decision brief" }).click();
  await expect(page.locator("#accountSelect")).toHaveValue("2");
  await expect(page.locator("#briefText")).toContainText("Nova Refractories");
});
test("scenario inputs update economics, reset and retain selected account", async ({
  page,
}) => {
  await page.goto("/scenario-simulator.html?id=5&mode=discount");
  await expect(page.locator("#accountSelect")).toHaveValue("5");
  const before = await page.locator("#scenarioCallout").textContent();
  await page.locator("#discount").fill("12");
  await page.locator("#discount").dispatchEvent("input");
  await expect(page.locator("#discountValue")).toHaveText("12%");
  expect(await page.locator("#scenarioCallout").textContent()).not.toBe(before);
  await page.getByRole("button", { name: "Reset assumptions" }).click();
  await expect(page.locator("#discountValue")).toHaveText("7%");
  await page.locator("#accountSelect").selectOption("8");
  await page.locator("#discount").fill("15");
  await page.locator("#discount").dispatchEvent("input");
  await expect(page.locator("#scenarioMetrics")).toContainText(
    "Not achievable",
  );
});
test("business questions use relevant evidence and safely render arbitrary input", async ({
  page,
}) => {
  await page.goto("/ask-business.html");
  await page
    .getByRole("button", { name: "Which customers are growing fastest?" })
    .click();
  await expect(page.locator("#answerPanel")).toContainText("Terra Foundry");
  await page.locator("#askInput").fill("What is the weather on Mars?");
  await page.locator("#askSubmit").click();
  await expect(page.locator("#answerPanel")).toContainText(
    "The local analysis supports",
  );
  await page.locator("#askInput").fill("<img src=x onerror=alert(1)>");
  await page.locator("#askSubmit").click();
  await expect(page.locator("#answerPanel h2")).toContainText("<img");
  await expect(page.locator("#answerPanel img")).toHaveCount(0);
});
test("radar explains selected account; morning reviews persist", async ({
  page,
}) => {
  await page.goto("/value-radar.html");
  await page.locator('[data-radar="5"]').click();
  await expect(page.locator("#whyPanel")).toContainText("Terra Foundry");
  await expect(page).toHaveURL(/id=5/);
  await page.goto("/morning-brief.html");
  await page.locator('[data-review="1"]').click();
  await expect(page.locator('[data-review="1"]')).toHaveText("✓ Reviewed");
  await page.reload();
  await expect(page.locator('[data-review="1"]')).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await page.goto("/account.html?id=999");
  await expect(page.locator(".invalid-notice")).toBeVisible();
  await expect(page.locator("h1")).toHaveText("Atlas Precision Abrasives");
});
test("save visual review artifacts", async ({ page }) => {
  await page.goto("/");
  await page.screenshot({
    path: "test-results/overview-desktop.png",
    fullPage: true,
  });
  await page.goto("/scenario-simulator.html");
  await page.screenshot({
    path: "test-results/scenario-desktop.png",
    fullPage: true,
  });
  await page.goto("/decision-brief.html?id=1");
  await page.screenshot({
    path: "test-results/brief-desktop.png",
    fullPage: true,
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.screenshot({
    path: "test-results/overview-mobile.png",
    fullPage: true,
  });
});
test("one-time support changes cash timing without changing the economic commitment", async ({
  page,
}) => {
  await page.goto("/scenario-simulator.html?id=1");
  await expect(page.locator("#supportAmountValue")).toHaveText("$350K");
  const contribution = await page.locator("#supportCallout").textContent();
  await page.locator("#installments").fill("24");
  await page.locator("#installments").dispatchEvent("input");
  await expect(page.locator("#supportMetrics")).toContainText("$175K");
  expect(await page.locator("#supportCallout").textContent()).toBe(
    contribution,
  );
  await page.locator("#supportAmount").fill("700000");
  await page.locator("#supportAmount").dispatchEvent("input");
  expect(await page.locator("#supportCallout").textContent()).not.toBe(
    contribution,
  );
  await page.getByRole("button", { name: "Reset assumptions" }).click();
  await expect(page.locator("#supportAmountValue")).toHaveText("$350K");
  await expect(page.locator("#installmentsValue")).toHaveText("12 months");
  const download = page.waitForEvent("download");
  await page.getByRole("button", { name: "Export scenario" }).click();
  expect((await download).suggestedFilename()).toBe(
    "executive-decision-intelligence-relationship-support.csv",
  );
  await page.locator("#accountSelect").selectOption("5");
  await expect(page.locator("#accountSelect")).toHaveValue("5");
  await expect(page.locator("#supportBars")).toBeVisible();
});
test("decision judgment persists for the selected account and remains separate from public company context", async ({
  page,
}) => {
  await page.goto("/decision-brief.html?id=1");
  await expect(page.locator("#briefText")).toContainText("one-time settlement");
  await expect(page.locator(".decision-signals")).toContainText("100%");
  await page
    .locator("#decisionView")
    .selectOption("Consider conditional support");
  await page
    .locator("#decisionNotes")
    .fill("Obtain volume commitments and Finance cash review.");
  await page.getByRole("button", { name: "Save review notes" }).click();
  await page.reload();
  await expect(page.locator("#decisionNotes")).toHaveValue(
    "Obtain volume commitments and Finance cash review.",
  );
  await page.locator("#accountSelect").selectOption("2");
  await expect(page.locator("#decisionNotes")).toHaveValue("");
  await expect(page.locator(".decision-banner")).toContainText(
    "No support request is recorded",
  );
  await page
    .getByText("Why this demonstration fits industrial minerals", {
      exact: false,
    })
    .click();
  await expect(page.locator(".company-context")).toContainText(
    "Independent demonstration",
  );
  await expect(page.locator(".company-context a")).toHaveCount(3);
});
