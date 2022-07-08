import { test, expect } from '@playwright/test';
import { PlaywrightLandingPage } from '@local/common/pages/playwright-landing-page';

test.describe('landing page side nav', () => {
    test.use({ storageState: undefined });

    test('displays valid unauthenicated routes', async ({ page }) => {
        // Arrange
        const landingPage = new PlaywrightLandingPage(page);
        await landingPage.goto();
        // Assert
        await landingPage.sideNavDisplaysText('About Us');
        await landingPage.sideNavDisplaysText('Getting Started Guide');
        await landingPage.sideNavDisplaysText('Organizer Guide');
        await landingPage.sideNavDisplaysText('Moderator Guide');
        await landingPage.sideNavDisplaysText('Participant Guide');
    });

    // TODO: uncomment once sidenav hides protected routes
    // test('hides authenticated routes', async ({ page }) => {
    //     const landingPage = new PlaywrightLandingPage(page);
    //     await landingPage.goto();
    //     await landingPage.sideNavHidesText('Dashboard');
    //     await landingPage.sideNavHidesText('My Organizations');
    // });
});
