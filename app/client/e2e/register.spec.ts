import { test, expect } from '@playwright/test';

test.describe('display fields', () => {
    // arrange
    test.beforeEach(async ({ page }) => {
        // act: go to starting url before each test
        await page.goto('/register');
    });
    // assert
    test('register page should have a first name field', async ({ page }) => {
        await expect(page.locator('label:has-text("First Name *")')).toBeVisible();
    });
    test('register page should have a last name field', async ({ page }) => {
        await expect(page.locator('label:has-text("Last Name *")')).toBeVisible();
    });
    test('register page should have a email field', async ({ page }) => {
        await expect(page.locator('label:has-text("Email *")')).toBeVisible();
    });
    test('register page should have a password field', async ({ page }) => {
        await expect(page.locator('#register-password-label')).toBeVisible();
    });
    test('register page should have a confirm password field', async ({ page }) => {
        await expect(page.locator('label:has-text("Confirm Password *")')).toBeVisible();
    });
})
test.describe('errors', () => {
    test.beforeEach(async ({ page }) => {
        // arange
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
    });
    test('An error displays when registering with different passwords', async ({ page }) => {
        // act
        await page.locator('text=RegisterAlready have an account? >> button').click();
        // assert
        await expect(page.locator('text=Passwords must matchDismiss')).toBeVisible(); //times out for some reason currently
    })
})
//some backend issues
// test.describe('success', () => {
//     test('Registers successfully with correctly filled fields', async ({ page }) => {
//         await page.goto('http://localhost:8080/register');
//         await page.locator('text=First Name *First Name * >> input[type="text"]').click();
//         await page.locator('text=First Name *First Name * >> input[type="text"]').fill('John');
//         await page.locator('text=First Name *First Name * >> input[type="text"]').press('Tab');
//         await page.locator('main div:has-text("RegisterFirst Name *First Name *Last Name *Last Name *Email *Email *We\'ll never ")').nth(1).click();
//         await page.locator('text=First Name *First Name * >> input[type="text"]').dblclick();
//         await page.locator('text=First Name *First Name * >> input[type="text"]').dblclick();
//         await page.locator('text=First Name *First Name * >> input[type="text"]').click();
//         await page.locator('text=First Name *First Name * >> input[type="text"]').fill('testUser');
//         await page.locator('text=First Name *First Name * >> input[type="text"]').press('Tab');
//         await page.locator('text=Last Name *Last Name * >> input[type="text"]').fill('testPass');
//         await page.locator('text=Last Name *Last Name * >> input[type="text"]').press('Tab');
//         await page.locator('input[type="email"]').fill('testEmail@gmail.com');
//         await page.locator('input[type="email"]').press('Tab');
//         await page.locator('text=Password *Password *Passwords must be at least 8 characters >> input[type="password"]').fill('testPass');
//         await page.locator('text=Password *Password *Passwords must be at least 8 characters >> input[type="password"]').press('Tab');
//         await page.locator('text=Password *Password *Passwords must be at least 8 characters >> [aria-label="toggle password visibility"]').press('Tab');
//         await page.locator('text=Confirm Password *Confirm Password * >> input[type="password"]').fill('testPass');
//         await Promise.all([
//             page.waitForNavigation(/*{ url: 'http://localhost:8080/app/home' }*/),
//             page.locator('text=RegisterAlready have an account? >> button').click()
//         ]);
//         await expect(page).toHaveURL('/app/home');
//     })
// })
//display error when submitted with empty fields (feature not implemented)
//display error when invalid email entered (feature not implemented)