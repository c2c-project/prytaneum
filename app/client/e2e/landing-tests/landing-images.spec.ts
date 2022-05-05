import { test, expect } from '@playwright/test';

test.describe('landing page images', () => {
    test('image at start of landing page should be visible', async ({ page }) => {
        await page.goto('/');
        await expect(page.locator('#page div:has-text("A crucial tool for a better democracy.Register")').nth(2)).toBeVisible();
    });

    test('live feed screenshot should be visible', async ({ page }) => {
        await page.goto('/');
        await expect(page.locator('text=HomeDashboardAbout UsLLorem IpsumTown Hall MeetingConcerns within the cityEElias').first()).toBeVisible();
    });

    test('participant view example should be visible', async ({ page }) => {
        await page.goto('/');
        await expect(page.locator('#page div:has-text("Participant ViewHomeDashboardAbout UsLLorem IpsumTown Hall MeetingConcerns withi")').nth(3)).toBeVisible();
    });

    test('democracy fund logo should be visible', async ({ page }) => {
        await page.goto('/')
        await expect(page.locator('img[alt="democracy fund logo"]')).toBeVisible();
    });

    test('prytaneum logo should be visible', async ({ page }) => {
        await page.goto('/')
        await expect(page.locator('img[alt="prytaneum logo"]')).toBeVisible(); 
    });

    test('ucr tecd logo should be visible', async ({ page }) => {
        await page.goto('/');
        await expect(page.locator('img[alt="ucr tecd logo"]')).toBeVisible();
    });
});
