import { Browser, Locator, Page } from '@playwright/test';
import { Device, getIndexByDevice } from '@local/common/utils';

export class PlaywrightUserSettingsPage {
    readonly page: Page;
    readonly device: Device;
    readonly passwordUpdateConfirmation: Locator;

    constructor(page: Page, device: Device) {
        this.page = page;
        this.device = device;

        this.passwordUpdateConfirmation = page.locator('text=Password changed successfully!');
    }

    async create(browser: Browser) {
        const deviceIndex = getIndexByDevice(this.device);
        const context = await browser.newContext({
            baseURL: process.env.BASE_URL || 'http://localhost:8080',
            storageState: `./common/state/organizer${deviceIndex}StorageState.json`,
        });
        const page = await context.newPage();
        return new PlaywrightUserSettingsPage(page, this.device);
    }

    async goto() {
        await this.page.goto('/settings');
    }

    async updateEmail(newEmail: string) {
        // Enter new email address
        await this.page.locator('[aria-label="Enter your new email"]').fill(newEmail);

        // Submit Form
        await this.page.locator('text=Update email').click();
    }

    async updatePassword(oldPassword: string, newPassword: string) {
        // Enter old password
        await this.page.locator('[aria-label="Enter your old password"]').fill(oldPassword);

        // Enter new password
        await this.page.locator('[aria-label="Enter your new password"] input[type="password"]').fill(newPassword);

        // Enter new password again
        await this.page.locator('[aria-label="Enter your new password again"] input[type="password"]').fill(newPassword);

        // Submit Form
        await this.page.locator('text=Update password').click();
    }
}