import { test, expect } from '@playwright/test';
import { PlaywrightLandingPage } from '@local/common/pages/playwright-landing-page';

test.use({ storageState: undefined });

test('landing page buttons display', async ({ page }) => {
    // Arrange
    const landingPage = new PlaywrightLandingPage(page);
    await landingPage.goto();
    // Assert
    await expect(landingPage.appBarHamburgerButton).toBeVisible();
    await expect(landingPage.appBarRegisterButton).toBeVisible();
    await expect(landingPage.appBarLoginButton).toBeVisible();
    await expect(landingPage.landingButton).toBeVisible();
});
