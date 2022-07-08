import { test, expect } from '@playwright/test';
import { PlaywrightLandingPage } from '@local/common/pages/playwright-landing-page';

test.describe('carousel buttons', () => {
    test.use({ storageState: undefined });
    test("Top carousel's next and back buttons work", async ({ page }) => {
        // Arrange
        const landingPage = new PlaywrightLandingPage(page);
        await landingPage.goto();
        // Act + Assert
        await landingPage.nextButtons.first().click();
        await expect(
            page
                .locator(
                    '#page div:has-text("Moderator ViewHomeDashboardAbout UsLLorem IpsumTown Hall MeetingConcerns within ")'
                )
                .nth(3)
        ).toBeVisible();
        await landingPage.backButtons.nth(2).click();
        await expect(
            page
                .locator(
                    '#page div:has-text("Participant ViewHomeDashboardAbout UsLLorem IpsumTown Hall MeetingConcerns withi")'
                )
                .nth(3)
        ).toBeVisible();
    });

    test("Bottom carousel's next and back buttons work", async ({ page }) => {
        // Arrange
        const landingPage = new PlaywrightLandingPage(page);
        await landingPage.goto();
        // Act + Assert
        await landingPage.nextButtons.nth(1).click();
        await expect(
            page
                .locator(
                    '#page div:has-text("Moderator RoleThe mediators who handle participants\' questions to be answered by")'
                )
                .nth(3)
        ).toBeVisible();
        await landingPage.nextButtons.nth(2).click();
        await expect(
            page
                .locator(
                    '#page div:has-text("Speaker RoleThe main speaker of a discussion. The speaker does not see the quest")'
                )
                .nth(3)
        ).toBeVisible();
        await landingPage.backButtons.nth(3).click();
        await expect(
            page
                .locator(
                    '#page div:has-text("Moderator RoleThe mediators who handle participants\' questions to be answered by")'
                )
                .nth(3)
        ).toBeVisible();
        await landingPage.backButtons.nth(3).click();
        await expect(
            page
                .locator(
                    '#page div:has-text("Participant RoleThe residents who want to engage in discussion on a policy topic.")'
                )
                .nth(3)
        ).toBeVisible();
    });
});
