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
        await expect(page.locator('div:has-text("RegisterFirst Name *First Name *Last Name *Last Name *Email *Email *We\'ll never ")').nth(3)).toBeVisible();
    });

    test('after authentication, should be redirected', async ({ page }) => {
        await page.goto('/');
        await page.locator('text=Login').click();
        await page.locator('input[type="email"]').fill('dshan017@ucr.edu');
        await page.locator('input[type="password"]').click();
        await page.locator('input[type="password"]').fill('dianeshan2');
        await Promise.all([
            page.waitForNavigation(/*{ url: 'http://localhost:8080/organizations/me' }*/),
            page.locator('div[role="dialog"] button:has-text("Login")').click()
        ]);

        await expect(page).toHaveURL('/organizations/me');
    });
});



