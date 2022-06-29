import { test, expect } from '@playwright/test';

test.describe('carousel buttons', () => {
    test.use({ storageState: undefined });
    test('views carousel buttons next and back should go from participant view <-> moderator view', async ({ page }) => {
        await page.goto('/');
        await page.locator('text=Next').first().click();
        await expect(page.locator('#page div:has-text("Moderator ViewHomeDashboardAbout UsLLorem IpsumTown Hall MeetingConcerns within ")').nth(3)).toBeVisible();
        await page.locator('text=Back').nth(2).click();
        await expect(page.locator('#page div:has-text("Participant ViewHomeDashboardAbout UsLLorem IpsumTown Hall MeetingConcerns withi")').nth(3)).toBeVisible();
    });

    test('roles carousel buttons next & back should go from participant role <-> moderator role <-> speaker role', async ({ page }) => {
        await page.goto('/');
        await page.locator('text=Next').nth(1).click();
        await expect(page.locator('#page div:has-text("Moderator RoleThe mediators who handle participants\' questions to be answered by")').nth(3)).toBeVisible();
        await page.locator('text=Next').nth(2).click();
        await expect(page.locator('#page div:has-text("Speaker RoleThe main speaker of a discussion. The speaker does not see the quest")').nth(3)).toBeVisible();
        await page.locator('text=Back').nth(3).click();
        await expect(page.locator('#page div:has-text("Moderator RoleThe mediators who handle participants\' questions to be answered by")').nth(3)).toBeVisible();
        await page.locator('text=Back').nth(3).click();
        await expect(page.locator('#page div:has-text("Participant RoleThe residents who want to engage in discussion on a policy topic.")').nth(3)).toBeVisible();
    });
});