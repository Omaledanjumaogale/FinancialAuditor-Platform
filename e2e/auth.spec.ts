import { test, expect } from '@playwright/test';

/**
 * E2E Spec — Authentication Flow
 * FA-Phase3 | Covers: landing page loads, login navigation, form interaction,
 * validation, and sign-up toggle.
 */

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('landing page loads with correct title and hero content', async ({ page }) => {
    await expect(page).toHaveTitle(/FinancialAuditor/i);
    // Brand logo should be visible
    await expect(page.getByRole('link', { name: /FinancialAuditor home/i })).toBeVisible();
  });

  test('landing page has no critical console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    // Filter out known non-critical errors (e.g. blocked third-party scripts)
    const criticalErrors = errors.filter(
      (e) => !e.includes('favicon') && !e.includes('sw.js') && !e.includes('chrome-extension')
    );
    expect(criticalErrors).toHaveLength(0);
  });

  test('landing page has navigation links visible', async ({ page }) => {
    await expect(page.getByRole('link', { name: /features/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /how it works/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /pricing/i })).toBeVisible();
  });

  test('navigating to /auth shows login form', async ({ page }) => {
    await page.goto('/auth');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();
  });

  test('auth form has sign in button', async ({ page }) => {
    await page.goto('/auth');
    const submitBtn = page.getByRole('button', { name: /sign in|log in|continue/i });
    await expect(submitBtn).toBeVisible();
  });

  test('empty form submission shows validation feedback', async ({ page }) => {
    await page.goto('/auth');
    const submitBtn = page.getByRole('button', { name: /sign in|log in|continue/i });
    await submitBtn.click();
    // HTML5 validation or custom error message should appear
    const emailInput = page.getByLabel(/email/i);
    const isInvalid = await emailInput.evaluate((el: HTMLInputElement) => !el.validity.valid);
    expect(isInvalid).toBe(true);
  });

  test('/auth page has correct meta description', async ({ page }) => {
    await page.goto('/auth');
    const metaDesc = page.locator('meta[name="description"]');
    await expect(metaDesc).toHaveCount(1);
  });
});

test.describe('Error Boundary', () => {
  test('non-existent page shows 404 error page with navigation', async ({ page }) => {
    const response = await page.goto('/this-page-does-not-exist');
    // Should not be a blank page — our +error.svelte should render
    await expect(page.getByRole('heading')).toBeVisible();
    // Should have a home link
    await expect(page.getByRole('link', { name: /go home/i })).toBeVisible();
  });

  test('error page has brand logo', async ({ page }) => {
    await page.goto('/nonexistent-route-404');
    await expect(page.getByRole('link', { name: /financialauditor home/i })).toBeVisible();
  });
});

test.describe('Mobile Responsiveness', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('landing page renders without horizontal scroll on mobile', async ({ page }) => {
    await page.goto('/');
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 5); // 5px tolerance
  });

  test('mobile nav is visible on small screens', async ({ page }) => {
    await page.goto('/');
    // MobileBottomNav should be visible at mobile breakpoint
    const mobileNav = page.locator('nav').last();
    await expect(mobileNav).toBeVisible();
  });
});
