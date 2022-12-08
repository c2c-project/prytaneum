import { chromium } from '@playwright/test';
import { PlaywrightLandingPage } from '@local/common/pages';
import { getOrganizersByDeviceAmmount, getUsersByDeviceAmmount } from '@local/common/utils';

async function globalSetup() {
    console.log('Running Global Setup...');
    console.log('Validating Environment...');
    if (!process.env.BASE_URL) throw new Error('BASE_URL is not set');
    if (!process.env.DEVICE_AMMOUNT) throw new Error('DEVICE_AMMOUNT is not set');
    console.log('Environment Validation Complete');

    // Ensure there is a unique user for each device
    const deviceAmmount = parseInt(process.env.DEVICE_AMMOUNT, 10);
    const users = getUsersByDeviceAmmount(deviceAmmount);
    const organizers = getOrganizersByDeviceAmmount(deviceAmmount);

    const browser = await chromium.launch();

    console.log('Creating User states...');
    // Create a storage state for each user (one for each browser used in testing)
    for (let i = 0; i < users.length; i++) {
        // Setup User Context
        const context = await browser.newContext({ baseURL: process.env.BASE_URL });
        // Log in Default User
        const page = await context.newPage();
        const landingPage = new PlaywrightLandingPage(page);
        await landingPage.goto();
        await landingPage.clickOnLogin();
        await landingPage.fillInEmail(`${users[i]}@example.com`);
        await landingPage.fillInPassword('Password1!');
        await landingPage.submitLoginForm();
        // Save signed-in state to 'storageState.json'
        await page.context().storageState({ path: `./common/state/${users[i]}StorageState.json` });
        await page.close();
        await context.close();
    }
    console.log('User states created');

    // Create a storage state for each organizer (one for each browser used in testing)
    console.log('Creating Organizer states...');
    for (let i = 0; i < organizers.length; i++) {
        // Setup Organizer Context
        const context = await browser.newContext({ baseURL: process.env.BASE_URL });
        // Log in Organizer
        const page = await context.newPage();
        const landingPage = new PlaywrightLandingPage(page);
        await landingPage.goto();
        await landingPage.clickOnLogin();
        await landingPage.fillInEmail(`${organizers[i]}@example.com`);
        await landingPage.fillInPassword('Password1!');
        await landingPage.submitLoginForm();
        // Save signed-in state to 'organizerStorageState.json'
        await page.context().storageState({ path: `./common/state/${organizers[i]}StorageState.json` });
        await page.close();
        await context.close();
    }
    console.log('Organizer states created');

    await browser.close();
    console.log('Global Setup Complete');
}

export default globalSetup;
