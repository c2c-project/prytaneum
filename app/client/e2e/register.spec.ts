import { test, expect } from '@playwright/test';

test.describe('page redirects', () => {
    test.describe.configure({ mode: 'parallel' });
    test('register page should have a first name field', async ({ page }) => {
        await page.goto('/register');
        await expect(page.locator('label:has-text("First Name *")')).toBeVisible();
    });
    test('register page should have a last name field', async ({ page }) => {
        await page.goto('/register');
        await expect(page.locator('label:has-text("Last Name *")')).toBeVisible();
    });
    test('register page should have a email field', async ({ page }) => {
        await page.goto('/register');
        await expect(page.locator('label:has-text("Email *")')).toBeVisible();
    });
    test('register page should have a password field', async ({ page }) => {
        await page.goto('/register');
        await expect(page.locator('#register-password-label')).toBeVisible();
    });
    test('register page should have a confirm password field', async ({ page }) => {
        await page.goto('/register');
        await expect(page.locator('label:has-text("Confirm Password *")')).toBeVisible();
    });
})
test.describe('errors', () => {
    test('An error displays when registering with different passwords', async ({ page }) => {
        await page.goto('/register');
        await page.locator('text=First Name *First Name * >> input[type="text"]').click();
        await page.locator('text=First Name *First Name * >> input[type="text"]').fill('John');
        await page.locator('text=Last Name *Last Name * >> input[type="text"]').click();
        await page.locator('text=Last Name *Last Name * >> input[type="text"]').fill('Doe');
        await page.locator('input[type="email"]').click();
        await page.locator('input[type="email"]').fill('JohnDoe@gmail.com');
        await page.locator('text=Password *Password *Passwords must be at least 8 characters >> input[type="password"]').click();
        await page.locator('text=Password *Password *Passwords must be at least 8 characters >> input[type="password"]').fill('JohnDoePwd');
        await page.locator('text=Confirm Password *Confirm Password * >> input[type="password"]').click();
        await page.locator('text=Confirm Password *Confirm Password * >> input[type="password"]').fill('diffPwd');
        await page.locator('text=RegisterAlready have an account? >> button').click();
        await expect(page.locator('text=Passwords must matchDismiss')).toBeVisible(); //times out for some reason currently
    })
})
//some backend issues
test.describe('success', () => {
    test('Registers successfully with correctly filled fields', async ({ page }) => {
        await page.goto('/register');
        await page.locator('text=First Name *First Name * >> input[type="text"]').click();
        await page.locator('text=First Name *First Name * >> input[type="text"]').fill('Robert');
        await page.locator('text=Last Name *Last Name * >> input[type="text"]').click();
        await page.locator('text=Last Name *Last Name * >> input[type="text"]').fill('Doe');
        await page.locator('input[type="email"]').click();
        await page.locator('input[type="email"]').fill('RDsldfjksdffs@gmail.com');
        await page.locator('text=Password *Password *Passwords must be at least 8 characters >> input[type="password"]').click();
        await page.locator('text=Password *Password *Passwords must be at least 8 characters >> input[type="password"]').fill('RobertDoePwd');
        await page.locator('text=Confirm Password *Confirm Password * >> input[type="password"]').click();
        await page.locator('text=Confirm Password *Confirm Password * >> input[type="password"]').fill('RobertDoePwd');
        await Promise.all([
            page.waitForNavigation({ url: '/app/home' }),
            page.locator('text=RegisterAlready have an account? >> button').click()
        ]);
        await expect(page).toHaveURL('/app/home');
    })
})