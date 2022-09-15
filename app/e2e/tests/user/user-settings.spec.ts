import { test, expect } from '@local/common/utils/fixtures';

test.describe('User Settings Page', () => {
    test('I can update my email', async({ userSettingsPage }) => {
        // Go to User Settings
        await userSettingsPage.goto();

        // Enter new email address
        await userSettingsPage.updateEmail(`${userSettingsPage.device}@example.com`);

        // Verify email address was updated successfully
        await expect(userSettingsPage.page.locator(`text=Current email: ${userSettingsPage.device}@example.com`)).toHaveCount(1);
    });

    test('I can update my password', async({ userSettingsPage }) => {
        // Go to User Settings
        await userSettingsPage.goto();

        // Change password
        await userSettingsPage.updatePassword('Password1!', 'Password2@');

        // Confirm password was updated successfully
        await expect(userSettingsPage.passwordUpdateConfirmation).toHaveCount(1);
    });

    test('I cannot see the user settings when not logged in', async({ browser }) => {
        // Use context without authentication
        const context = await browser.newContext();
        const page = await context.newPage();

        // Attempt to navigate to User Settings
        await page.goto('/settings');

        // Verify we are directed to the landing page
        await expect(page).toHaveURL('/');
    });
});