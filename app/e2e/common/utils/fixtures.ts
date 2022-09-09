// From Playwright documentation: https://playwright.dev/docs/test-auth#testing-multiple-roles-with-pom-fixtures
import { PlaywrightOrganizationsPage, PlaywrightDashboardPage, PlaywrightAboutUsPage } from '@local/common/pages';
import { test as base } from '@playwright/test';
export { expect } from '@playwright/test';

export type Device = 'chromium-mobile' | 'chromium' | 'msedge' | 'safari-mobile' | 'safari' | 'firefox';

export type Fixtures = {
    aboutUsPage: PlaywrightAboutUsPage;
    organizationsPage: PlaywrightOrganizationsPage;
    dashboardPageOrganizer: PlaywrightDashboardPage;
    dashboardPageUser: PlaywrightDashboardPage;
    device: Device;
};

/**
 * Currently there are 6 devices being used to test
 * 1. Chromium Desktop
 * 2. Chromium Mobile
 * 3. Chromium MsEdge
 * 4. Safari Desktop
 * 5. Safari Mobile
 * 6. Firefox Desktop
 */
export function getCurrentDevice(browserName: string, isMobile?: boolean): Device {
    if (browserName === 'chromium') {
        if (isMobile === true) return 'chromium-mobile';
        if (isMobile === false) return 'chromium';
        return 'msedge';
    }
    if (browserName === 'webkit') {
        if (isMobile === true) return 'safari-mobile';
        return 'safari';
    }
    return 'firefox';
}

// Converts a device name to a state index
// Corresponds to the index of the state files under @local/common/state
// Example: chromium-mobile -> 1 -> @local/common/state/organizer1StorageState.json
export function getIndexByDevice(device: Device): number {
    switch (device) {
        case 'chromium-mobile':
            return 1;
        case 'chromium':
            return 2;
        case 'msedge':
            return 3;
        case 'safari-mobile':
            return 4;
        case 'safari':
            return 5;
        case 'firefox':
            return 6;
        default:
            throw new Error(`Unknown device: ${device}`);
    }
}

export const test = base.extend<Fixtures>({
    aboutUsPage: async ({ browser, page, browserName, isMobile }, use) => {
        const device = getCurrentDevice(browserName, isMobile);
        const aboutUsPage = await new PlaywrightAboutUsPage(page, device).create(browser);
        await use(aboutUsPage);
    },
    organizationsPage: async ({ browser, page, browserName, isMobile }, use) => {
        const device = getCurrentDevice(browserName, isMobile);
        const organizationPage = await new PlaywrightOrganizationsPage(page, device).create(browser);
        await use(organizationPage);
        // Add any cleanup logic here
    },
    dashboardPageOrganizer: async ({ browser, page, browserName, isMobile }, use) => {
        const device = getCurrentDevice(browserName, isMobile);
        const dashboardPage = await new PlaywrightDashboardPage(page, device).createWithOrganizerContext(browser);
        await use(dashboardPage);
        // Add any cleanup logic here
    },
    dashboardPageUser: async ({ browser, page, browserName, isMobile }, use, testInfo) => {
        const device = getCurrentDevice(browserName, isMobile);
        const dashboardPage = await new PlaywrightDashboardPage(page, device).createWithUserContext(browser);
        await use(dashboardPage);
        // Add any cleanup logic here
    },
    device: async ({ browserName, isMobile }, use) => {
        const device = getCurrentDevice(browserName, isMobile);
        use(device);
    },
});
