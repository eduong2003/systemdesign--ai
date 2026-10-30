import { test, expect } from "@playwright/test";
test("drafts, submissions, and learning progress persist", async ({ page }) => {
  await page.goto("/problems/url-shortener");
  await page.getByRole("button", { name: "Submit design" }).click();
  await expect(page.locator(".workspace").getByRole("alert")).toContainText(
    "at least 100",
  );
  const design =
    "Use stateless API servers behind a load balancer. Store URL mappings in PostgreSQL with a unique short-code index. Cache popular redirects with a TTL. Retry code collisions and monitor latency.";
  await page.getByLabel("DESIGN NOTES").fill(design);
  await page.getByRole("button", { name: "Save draft" }).click();
  await expect(page.getByText("Draft saved in this browser.")).toBeVisible();
  await page.reload();
  await expect(page.getByLabel("DESIGN NOTES")).toHaveValue(design);
  await page.getByRole("button", { name: "Submit design" }).click();
  await page.goto("/dashboard");
  await expect(
    page.locator(".metrics").getByText("1/8", { exact: true }),
  ).toBeVisible();
  await expect(page.locator(".activity").getByText("Submitted")).toBeVisible();
  await page.goto("/learn/caching");
  await page
    .getByRole("button", { name: "Mark as learned", exact: true })
    .click();
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Learned", exact: false }),
  ).toBeVisible();
  await page.goto("/dashboard");
  await expect(
    page.locator(".metrics").getByText("1/10", { exact: true }),
  ).toBeVisible();
});
test("challenge filtering and empty state", async ({ page }) => {
  await page.goto("/problems");
  await expect(page.locator(".problem-card")).toHaveCount(8);
  await page.getByRole("button", { name: "Hard", exact: true }).click();
  await expect(page.locator(".problem-card")).toHaveCount(4);
  await page.getByLabel("Search challenges").fill("nothing-matches");
  await expect(page.getByText("No matching challenges")).toBeVisible();
  await page.getByRole("button", { name: "Clear filters" }).click();
  await expect(page.locator(".problem-card")).toHaveCount(8);
});
test("mobile pages fit and navigation works", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  for (const path of [
    "/",
    "/problems",
    "/problems/url-shortener",
    "/learn",
    "/dashboard",
    "/tutor",
  ]) {
    await page.goto(path);
    await expect(page.locator("h1")).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBeTruthy();
  }
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Problems", exact: true })
    .click();
  await expect(page).toHaveURL(/\/problems$/);
});
test("unknown routes return a useful 404", async ({ page }) => {
  const response = await page.goto("/problems/missing");
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("link", { name: "Browse challenges" }),
  ).toBeVisible();
});

test("challenge design review shows the AI response", async ({ page }) => {
  await page.route("**/api/tutor", (route) =>
    route.fulfill({
      json: {
        answer:
          "What is strong\nYour design uses a cache for popular redirects.\n\nBiggest gaps\nExplain how you handle cache misses.",
      },
    }),
  );
  await page.goto("/problems/url-shortener");
  await page.getByLabel("DESIGN NOTES").fill(
    "Use stateless API servers behind a load balancer. Store URL mappings in PostgreSQL with a unique short-code index. Cache popular redirects with a TTL. Retry code collisions and monitor latency.",
  );
  await page.getByRole("button", { name: "Review my design" }).click();
  await expect(page.getByRole("heading", { name: "Design feedback" })).toBeVisible();
  await expect(page.getByText(/Explain how you handle cache misses/)).toBeVisible();
});

test("AI tutor chat uses the selected challenge context", async ({ page }) => {
  await page.route("**/api/tutor", async (route) => {
    const request = route.request();
    const payload = request.postDataJSON();
    expect(payload).toMatchObject({
      mode: "chat",
      problemSlug: "url-shortener",
      message: "How should I handle cache misses?",
    });
    await route.fulfill({ json: { answer: "What latency target are you optimizing for?" } });
  });
  await page.goto("/tutor");
  await page.getByLabel("YOUR QUESTION").fill("How should I handle cache misses?");
  await page.getByRole("button", { name: "Ask tutor" }).click();
  await expect(page.getByText("What latency target are you optimizing for?")).toBeVisible();
});

test("AI tutor API rejects unknown challenge slugs", async ({ request }) => {
  const response = await request.post("/api/tutor", {
    data: {
      mode: "review",
      problemSlug: "not-a-real-challenge",
      design: "This is a sufficiently long design that should still be rejected because the challenge does not exist.",
    },
  });
  expect(response.status()).toBe(400);
});
