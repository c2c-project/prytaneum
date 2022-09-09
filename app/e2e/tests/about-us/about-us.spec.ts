import { PlaywrightAboutUsPage } from '@local/common/pages';
import { test, expect, getCurrentDevice } from '@local/common/utils/fixtures';

test.describe('About Us Page', () => {
    test.describe('Items Present on Page While Logged In', () => {
        test('I can see the proper images on the page', async ({ aboutUsPage }) => {
            // Go to About Us Page
            await aboutUsPage.goto();

            // Verify images are present
            await expect(aboutUsPage.logo).toHaveCount(1);
            await expect(aboutUsPage.directorsImage).toHaveCount(1);
        });

        test('I can see the proper text on the page', async ({ aboutUsPage }) => {
            // Go to About Us Page
            await aboutUsPage.goto();

            // Verify text is present
            await expect(aboutUsPage.title).toHaveCount(1);
            await expect(aboutUsPage.description).toHaveCount(1);
        });
    });

    test.describe('Items Present on Page While Not Logged In', () => {
        let unauthAboutUsPage: PlaywrightAboutUsPage;

        test.beforeAll(async ({ browser, browserName, isMobile }) => {
            // Use context without authentication
            const context = await browser.newContext();
            const page = await context.newPage();
            const device = getCurrentDevice(browserName, isMobile);
            unauthAboutUsPage = new PlaywrightAboutUsPage(page, device);
        });

        test('I can see the proper images on the page', async () => {
            // Go to About Us Page
            await unauthAboutUsPage.goto();

            // Verify images are present
            await expect(unauthAboutUsPage.logo).toHaveCount(1);
            await expect(unauthAboutUsPage.directorsImage).toHaveCount(1);
        });

        test('I can see the proper text on the page', async () => {
            // Go to About Us Page
            await unauthAboutUsPage.goto();

            // Verify text is present
            await expect(unauthAboutUsPage.title).toHaveCount(1);
            await expect(unauthAboutUsPage.description).toHaveCount(1);
        });
    });
});
