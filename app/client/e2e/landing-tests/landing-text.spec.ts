import { test, expect } from '@playwright/test';

test.describe('landing page text', () => {
    test('what is prytaneum text should be visible', async ({ page }) => {
        await page.goto('/');
        await expect(page.locator('text=What is Prytaneum?Prytaneum is an open-source, highly-interactive online town ha')).toBeVisible();
    });

    test('a better solution text should be visible', async ({ page }) => {
        await page.goto('/');
        await expect(page.locator('text=A better solution for remote public engagement.')).toBeVisible();
    });

    test('just like any town hall text should be visible', async ({ page }) => {
        await page.goto('/');
        await expect(page.locator('text=Just like any town hall, Prytaneum offers roles to fit the needs of any attendee')).toBeVisible();
    });

    test('participant role description should be visible', async ({ page }) => {
        await page.goto('/');
        await expect(page.locator('#page div:has-text("Participant RoleThe residents who want to engage in discussion on a policy topic.")').nth(3)).toBeVisible();
    });
});