import { test, expect } from '@playwright/test';
import { PlaywrightLandingPage } from '@local/common/pages/playwright-landing-page';

test.use({ storageState: undefined });

test('landing page images should be visible', async ({ page }) => {
    // Arrange
    const landingPage = new PlaywrightLandingPage(page);
    await landingPage.goto();
    // Assert
    await Promise.all([
        expect(landingPage.appBarPrytaneumLogo).toBeVisible(),
        expect(landingPage.prytanumTextLogo).toBeVisible(),
        expect(landingPage.prytaneumLogoSubheader).toBeVisible(),
        expect(landingPage.landingGraphic).toBeVisible(),
        expect(landingPage.bottomPrytaneumLogo).toBeVisible(),
        expect(landingPage.DemocracyFundLogo).toBeVisible(),
        expect(landingPage.UCRTecdLogo).toBeVisible(),
    ]);
});
