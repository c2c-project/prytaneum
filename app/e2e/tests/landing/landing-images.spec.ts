import { test, expect } from '@playwright/test';

test.describe('landing page images', () => {
    test('image at start of landing page should be visible', async ({ page }) => {
        await page.goto('/');
        await Promise.all([
            expect(page.locator('#page div:has-text("A crucial tool for a better democracy.Register")').nth(2)).toBeVisible(),
            expect(page.locator('text=HomeDashboardAbout UsLLorem IpsumTown Hall MeetingConcerns within the cityEElias').first()).toBeVisible(),
            expect(page.locator('#page div:has-text("Participant ViewHomeDashboardAbout UsLLorem IpsumTown Hall MeetingConcerns withi")').nth(3)).toBeVisible(),
            expect(page.locator('img[alt="democracy fund logo"]')).toBeVisible(),
            expect(page.locator('img[alt="prytaneum logo"]')).toBeVisible(), 
            expect(page.locator('img[alt="ucr tecd logo"]')).toBeVisible(),
        ]);
    });
});
