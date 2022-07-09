import { PlaywrightOrganizationsPage } from '@local/common/pages/playwright-organizations-page';
import { test as base } from '@playwright/test';

type Fixtures = {
    organizationsPage: PlaywrightOrganizationsPage;
};

export const test = base.extend<Fixtures>({
    organizationsPage: async ({ browser, page }, use) => {
        const organizationPage = new PlaywrightOrganizationsPage(page);
        organizationPage.create(browser);
        await use(organizationPage);
        // Add any cleanup logic here
    },
});
