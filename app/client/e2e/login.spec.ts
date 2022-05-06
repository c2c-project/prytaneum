import { test, expect } from '@playwright/test';

test.describe('page redirects', () => {
    test.describe.configure({ mode: 'parallel' });
    test('login page should have email form', async ({ page }) => {
        await page.goto('/login');
        await expect(page.locator('[data-test-id=login-email-text]')).toContainText('Email');
    })
    test('login page should have password form', async ({ page }) => {
        await page.goto('/login');
        await expect(page.locator('[data-test-id=login-password-text]')).toContainText('Password');
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