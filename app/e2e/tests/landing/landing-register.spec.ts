import { test, expect } from '@playwright/test';
import { PlaywrightLandingPage } from '@local/common/pages/playwright-landing-page';

test.describe('landing page registration buttons', () => {
    test.use({ storageState: undefined });

    test('app bar register form opens and closes', async ({ page }) => {
        // Arrange
        const landingPage = new PlaywrightLandingPage(page);
        await landingPage.goto();
        // Act + Assert
        await landingPage.appBarRegisterOpensAndCloses();
    });

    test('app bar register form works', async ({ page }) => {
        // Arrange
        const landingPage = new PlaywrightLandingPage(page);
        await landingPage.goto();
        // Act
        await landingPage.appBarRegister({
            email: `newuser${Math.floor(Math.random() * 10000)}@example.com`,
            password: 'Password1!',
            firstName: 'First',
            lastName: 'Last',
        });
        // Assert
        await expect(page).toHaveURL('/organizations/me');
    });

    test('larger register button redirects to registration page', async ({ page }) => {
        // Arrange
        const landingPage = new PlaywrightLandingPage(page);
        await landingPage.goto();
        // Act
        await landingPage.landingButton.click();
        // Assert
        await expect(page).toHaveURL('/register');
    });
});
