import { test, expect } from '@playwright/test';

test.describe('register page', () => {
    test('register page displays form', async ({ page }) => {
        // arrange
        await page.goto('/register');
        // assert
        await Promise.all([
            expect(page.locator('label:has-text("First Name *")')).toBeVisible(),
            expect(page.locator('label:has-text("Last Name *")')).toBeVisible(),
            expect(page.locator('label:has-text("Email *")')).toBeVisible(),
            expect(page.locator('#register-password-label')).toBeVisible(),
            expect(page.locator('label:has-text("Confirm Password *")')).toBeVisible(),
            expect(page.locator('[data-test-id=register-form-submit]')).toBeVisible(),
        ])
    });
    test('An error displays when registering with different passwords', async ({ page }) => {
        // arrange
        await page.goto('/register');
        await page.locator('text=First Name *First Name * >> input[type="text"]').click();
        await page.locator('text=First Name *First Name * >> input[type="text"]').fill('John');
        await page.locator('text=Last Name *Last Name * >> input[type="text"]').click();
        await page.locator('text=Last Name *Last Name * >> input[type="text"]').fill('Doe');
        await page.locator('input[type="email"]').click();
        await page.locator('input[type="email"]').fill('JohnDoe@gmail.com');
        await page
            .locator('text=Password *Password *Passwords must be at least 8 characters >> input[type="password"]')
            .click();
        await page
            .locator('text=Password *Password *Passwords must be at least 8 characters >> input[type="password"]')
            .fill('JohnDoePwd');
        await page.locator('text=Confirm Password *Confirm Password * >> input[type="password"]').click();
        await page.locator('text=Confirm Password *Confirm Password * >> input[type="password"]').fill('diffPwd');
        // act
        await page.locator('[data-test-id=register-form-submit]').click();
        // assert
        await expect(page.locator('text=Passwords must matchDismiss')).toBeVisible();
    });
    test('Registers successfully with correctly filled fields', async ({ page }) => {
        // arrange
        await page.goto('/register');
        await page.locator('text=First Name *First Name * >> input[type="text"]').click();
        await page.locator('text=First Name *First Name * >> input[type="text"]').fill('New');
        await page.locator('text=First Name *First Name * >> input[type="text"]').press('Tab');
        await page.locator('text=Last Name *Last Name * >> input[type="text"]').fill('User');
        await page.locator('text=Last Name *Last Name * >> input[type="text"]').press('Tab');
        await page.locator('input[type="email"]').fill(`newuser${Math.floor(Math.random() * 10000)}@prytaneum.io`);
        await page.locator('input[type="email"]').press('Tab');
        await page.locator('text=Password *Password *Passwords must be at least 8 characters >> input[type="password"]').fill('password');
        await page.locator('text=Password *Password *Passwords must be at least 8 characters >> input[type="password"]').press('Tab');
        await page.locator('text=Password *Password *Passwords must be at least 8 characters >> [aria-label="toggle password visibility"]').press('Tab');
        await page.locator('text=Confirm Password *Confirm Password * >> input[type="password"]').fill('password');
        // act
        await Promise.all([
            page.waitForNavigation({ url: 'http://localhost:8080/organizations/me' }),
            page.locator('[data-test-id=register-form-submit]').click()
        ]);
        // assert
        await expect(page).toHaveURL('/organizations/me');
    })
})
