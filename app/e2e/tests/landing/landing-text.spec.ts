import { test, expect } from '@playwright/test';
import { PlaywrightLandingPage } from '@local/common/pages/playwright-landing-page';

test.use({ storageState: undefined });

test('landing page text should be visible', async ({ page }) => {
    // Arrange
    const landingPage = new PlaywrightLandingPage(page);
    await landingPage.goto();
    // Assert
    await Promise.all([
        expect(
            page.locator('text=What is Prytaneum?Prytaneum is an open-source, highly-interactive online town ha')
        ).toBeVisible(),
        expect(page.locator('text=A better solution for remote public engagement.')).toBeVisible(),
        expect(
            page.locator('text=Just like any town hall, Prytaneum offers roles to fit the needs of any attendee')
        ).toBeVisible(),
        expect(
            page
                .locator(
                    '#page div:has-text("Participant RoleThe residents who want to engage in discussion on a policy topic.")'
                )
                .nth(3)
        ).toBeVisible(),
    ]);
});
