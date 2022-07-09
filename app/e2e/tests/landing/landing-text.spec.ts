import { test, expect } from '@playwright/test';
import { PlaywrightLandingPage } from '@local/common/pages/playwright-landing-page';

test.use({ storageState: undefined });

test.skip('landing page text should be visible', async ({ page }) => {
    // TODO Implement tests when new landing page is ready
    // Possibly impement with a screenshot comparison
});
