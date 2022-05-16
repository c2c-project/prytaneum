import { test, expect } from '@playwright/test';

test.describe('page redirects', () => {
    test.describe.configure({ mode: 'parallel' });
    test('login page should have email form', async ({ page }) => {
        await page.goto('/login');
        await expect(page.locator('input[type="email"]')).toBeVisible();
    })
    test('login page should have password form', async ({ page }) => {
        await page.goto('/login');
        await expect(page.locator('input[type="password"]')).toBeVisible();
    });
})
test.describe('errors', () => {
    test('An error displays when logging in with incorrect credentials', async ({ page }) => {
        await page.goto('/login');
        await page.locator('input[type="email"]').click();
        await page.locator('input[type="email"]').fill('test@test.com');
        await page.locator('input[type="email"]').press('Tab');
        await page.locator('input[type="password"]').fill('testPassword');
        await page.locator('text=LoginOr, register an account >> button').click();
        await expect(page.locator('text=Login failed; Invalid email or password.Dismiss')).toBeVisible(); 
    })
})
//some backend issues
test.describe('success', () => {
    test('Logs in successfully with correct credentials', async ({ page }) => {
        await page.goto('/login');
        await page.locator('input[type="email"]').click();
        await page.locator('input[type="email"]').fill('a@test.com');
        await page.locator('input[type="email"]').press('Tab');
        await page.locator('input[type="password"]').fill('a');
        await Promise.all([
            page.waitForNavigation({ url: '/organizations/me' }),
            page.locator('text=LoginOr, register an account >> button').click()
        ]);
        await expect(page).toHaveURL('/organizations/me');
    })
})