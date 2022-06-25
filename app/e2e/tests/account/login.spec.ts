import { test, expect } from '@playwright/test';

test.describe('login page', () => {
    test.describe.configure({ mode: 'parallel' });
    test('login page should display login form', async ({ page }) => {
        // arrange
        await page.goto('/login');
        // assert
        await expect(page.locator('input[type="email"]')).toBeVisible();
        await expect(page.locator('input[type="password"]')).toBeVisible();
        await expect(page.locator('[data-test-id=login-form-submit]')).toBeVisible();
    });
    test('An error displays when logging in with incorrect credentials', async ({ page }) => {
        // arrange
        await page.goto('/login');
        await page.locator('input[type="email"]').click();
        await page.locator('input[type="email"]').fill('test@test.com');
        await page.locator('input[type="email"]').press('Tab');
        await page.locator('input[type="password"]').fill('testPassword');
        // act
        await page.locator('[data-test-id=login-form-submit]').click();
        // assert
        await expect(page.locator('text=Login failed; Invalid email or password.Dismiss')).toBeVisible();
    });
    test('Logs in successfully with correct credentials', async ({ page }) => {
        // arrange
        await page.goto('/login');
        await page.locator('input[type="email"]').click();
        await page.locator('input[type="email"]').fill('test@prytaneum.io');
        await page.locator('input[type="email"]').press('Tab');
        await page.locator('input[type="password"]').fill('password');
        // act
        await Promise.all([
            page.waitForNavigation({ url: 'http://localhost:8080/organizations/me' }),
            page.locator('[data-test-id=login-form-submit]').click(),
        ]);
        // assert
        await expect(page).toHaveURL('/organizations/me');
    });
});
