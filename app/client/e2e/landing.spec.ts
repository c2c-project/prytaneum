// eslint-disable-next-line import/no-extraneous-dependencies
import { test, expect } from '@playwright/test';

test('landing page should have register button', async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-test-id=landing-button]').click();
    await expect(page).toHaveURL('/register');
});
