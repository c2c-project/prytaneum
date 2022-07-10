import { test } from '@playwright/test';

test.use({ storageState: undefined });

test.skip('I can see the landing text', async ({ page }) => {
    // TODO Implement tests when new landing page is ready
    // Possibly impement with a screenshot comparison
});
