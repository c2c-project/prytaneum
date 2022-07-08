import { test, expect } from '@playwright/test';
import { PlaywrightLandingPage } from '@local/common/pages/playwright-landing-page';

test.describe('landing page login button', () => {
    test.use({ storageState: undefined });

    test('app bar login form opens and closes', async ({ page }) => {
        // Arrange
        const landingPage = new PlaywrightLandingPage(page);
        await landingPage.goto();
        // Act + Assert
        await landingPage.appBarLoginOpensAndCloses();
    });

    test('app bar login form works', async ({ page }) => {
        // Arrange
        const landingPage = new PlaywrightLandingPage(page);
        await landingPage.goto();
        // Act
        await landingPage.appBarLogin({ email: 'test@example.com', password: 'Password1!' });
        // Assert
        await expect(page).toHaveURL('/organizations/me');
    });
});
