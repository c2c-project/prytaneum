import { test } from '@playwright/test';
import { PlaywrightLandingPage } from '@local/common/pages/playwright-landing-page';

test.describe('landing page side nav', () => {
    test('I can see routes that do not require authentication when opening the sidenav', async ({ page }) => {
        const landing = new PlaywrightLandingPage(page);
        await landing.goto();
        await landing.openSideNav();
        await landing.see(await landing.locateSideNavText('About Us'));
        await landing.see(await landing.locateSideNavText('Getting Started Guide'));
        await landing.see(await landing.locateSideNavText('Organizer Guide'));
        await landing.see(await landing.locateSideNavText('Moderator Guide'));
        await landing.see(await landing.locateSideNavText('Participant Guide'));
    });

    // TODO: check that authenticated routes are hidden once routes are properly hidden
    // test('displays valid unauthenicated routes', async ({ page }) => {
    //     const landing = new PlaywrightLandingPage(page);
    //     await landing.goto();
    //     await landing.doNotSee(await landing.locateSideNavText('Dashboard'));
    //     await landing.doNotSee(await landing.locateSideNavText('My Organizations'));
    // });
});
