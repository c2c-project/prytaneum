import { test, expect } from '@playwright/test';

test.describe('landing page registration and authentication', () => {
    test('landing page should have register button', async ({ page }) => {
        await page.goto('/');
        await page.locator('[data-test-id=landing-button]').click();
        await expect(page).toHaveURL('/register');
    });

    test('landing page should have register button on appbar', async ({ page }) => {
        await page.goto('/');
        await page.locator('[data-test-id="appbar-register-button"]').click();

        await Promise.all([
            expect(page.locator('div[role="dialog"] div:has-text("Register")').nth(2)).toBeVisible(),
            expect(page.locator('text=First Name *First Name * >> input[type="text"]')).toBeVisible(),
            expect(page.locator('text=Last Name *Last Name * >> input[type="text"]')).toBeVisible(),
            expect(page.locator('input[type="email"]')).toBeVisible(),
            expect(page.locator('text=Password *Password *Passwords must be at least 8 characters >> input[type="password"]')).toBeVisible(),
            expect(page.locator('text=Confirm Password *Confirm Password * >> input[type="password"]')).toBeVisible(),
            expect(page.locator('form div:has-text("Register")')).toBeVisible(),
        ]);
    });

    test('after authentication, should be redirected', async ({ page }) => {
        await page.goto('/'),
        await page.locator('text=Login').click(),
        await page.locator('input[type="email"]').fill('test@prytaneum.io'),
        await page.locator('input[type="password"]').click(),
        await page.locator('input[type="password"]').fill('password'),
        await Promise.all([
            page.waitForNavigation({ url: 'http://localhost:8080/organizations/me' }),
            page.locator('div[role="dialog"] button:has-text("Login")').click()
        ]);
        await expect(page).toHaveURL('/organizations/me');
    });
});



