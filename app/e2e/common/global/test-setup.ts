import { chromium } from '@playwright/test';
import { PlaywrightLandingPage } from '@local/common/pages/playwright-landing-page';

async function globalSetup() {
    // Setup User Context
    const userBrowser = await chromium.launch();
    const userContext = await userBrowser.newContext({ baseURL: process.env.BASE_URL || 'http://localhost:8080' });

    // Log in Default User
    const userPage = await userContext.newPage();
    const userLanding = new PlaywrightLandingPage(userPage);
    await userLanding.goto();
    await userLanding.clickOnLogin();
    await userLanding.fillInEmail(`test@example.com`);
    await userLanding.fillInPassword('Password1!');
    await userLanding.submitLoginForm();
    // Save signed-in state to 'storageState.json'
    await userPage.context().storageState({ path: './common/state/userStorageState.json' });
    await userBrowser.close();

    // Setup Organizer Context
    const organizerBrowser = await chromium.launch();
    const organizerContext = await organizerBrowser.newContext({
        baseURL: process.env.BASE_URL || 'http://localhost:8080',
    });

    // Log in Organizer
    const organizerPage = await organizerContext.newPage();
    const organizerLanding = new PlaywrightLandingPage(organizerPage);
    await organizerLanding.goto();
    await organizerLanding.clickOnLogin();
    await organizerLanding.fillInEmail(`organizer@example.com`);
    await organizerLanding.fillInPassword('Password1!');
    await organizerLanding.submitLoginForm();
    // Save signed-in state to 'organizerStorageState.json'
    await organizerPage.context().storageState({ path: './common/state/organizerStorageState.json' });
    await organizerBrowser.close();
}

export default globalSetup;
