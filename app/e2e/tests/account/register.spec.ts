import { test, expect } from '@playwright/test';
import { PlaywrightRegisterPage } from '@local/common/pages/playwright-register-page';

test.describe('register page', () => {
    test('register page displays form and illustration', async ({ page }) => {
        // arrange
        const register = new PlaywrightRegisterPage(page);
        // act
        await register.goto();
        // assert
        await register.amOnRegisterPage();
        await register.see(register.registerIllustration);
        await register.see(register.firstNameInput);
        await register.see(register.lastNameInput);
        await register.see(register.emailInput);
        await register.see(register.passwordInput);
        await register.see(register.confirmPasswordInput);
        await register.see(register.registerButton);
        await register.see(register.loginLink);
    });
    test('An error displays when registering with different passwords', async ({ page }) => {
        // arrange
        const register = new PlaywrightRegisterPage(page);
        // act
        await register.goto();
        await register.fillInFirstName('John');
        await register.fillInLastName('Doe');
        await register.fillInEmail('johnDoe@test.com');
        await register.fillInPassword('Password1!');
        await register.fillInConfirmPassword('Password2!');
        await register.submitRegisterForm();
        // assert
        await register.see(register.failedSnackMismatcedPasswords);
    });
    test('An error displays when passwords lack a special character', async ({ page }) => {
        // arrange
        const register = new PlaywrightRegisterPage(page);
        // act
        await register.goto();
        await register.fillInFirstName('John');
        await register.fillInLastName('Doe');
        await register.fillInEmail('johnDoe@test.com');
        await register.fillInPassword('Password1');
        await register.fillInConfirmPassword('Password1');
        await register.submitRegisterForm();
        // assert
        await register.see(register.failedSnackPasswordSpecialCharacter);
    });
    test('An error displays when passwords lack a number', async ({ page }) => {
        // arrange
        const register = new PlaywrightRegisterPage(page);
        // act
        await register.goto();
        await register.fillInFirstName('John');
        await register.fillInLastName('Doe');
        await register.fillInEmail('johnDoe@test.com');
        await register.fillInPassword('Password!');
        await register.fillInConfirmPassword('Password!');
        await register.submitRegisterForm();
        // assert
        await register.see(register.failedSnackPasswordMissingNumber);
    });
    test('An error displays when passwords lack an upper case character', async ({ page }) => {
        // arrange
        const register = new PlaywrightRegisterPage(page);
        // act
        await register.goto();
        await register.fillInFirstName('John');
        await register.fillInLastName('Doe');
        await register.fillInEmail('johnDoe@test.com');
        await register.fillInPassword('password1!');
        await register.fillInConfirmPassword('password1!');
        await register.submitRegisterForm();
        // assert
        await register.see(register.failedSnackPasswordUpperCase);
    });
    test('An error displays when passwords lack a lower case character', async ({ page }) => {
        // arrange
        const register = new PlaywrightRegisterPage(page);
        // act
        await register.goto();
        await register.fillInFirstName('John');
        await register.fillInLastName('Doe');
        await register.fillInEmail('johnDoe@test.com');
        await register.fillInPassword('PASSWORD1!');
        await register.fillInConfirmPassword('PASSWORD1!');
        await register.submitRegisterForm();
        // assert
        await register.see(register.failedSnackPasswordLowerCase);
    });
    test('An error displays when passwords are less than 8 characters', async ({ page }) => {
        // arrange
        const register = new PlaywrightRegisterPage(page);
        // act
        await register.goto();
        await register.fillInFirstName('John');
        await register.fillInLastName('Doe');
        await register.fillInEmail('johnDoe@test.com');
        await register.fillInPassword('Pass1!');
        await register.fillInConfirmPassword('Pass1!');
        await register.submitRegisterForm();
        // assert
        await register.see(register.failedSnackPasswordLength);
    });
    test('An error displays when account already exists', async ({ page }) => {
        // arrange
        const register = new PlaywrightRegisterPage(page);
        // act
        await register.goto();
        await register.fillInFirstName('John');
        await register.fillInLastName('Doe');
        await register.fillInEmail('user1@example.com');
        await register.fillInPassword('Password1!');
        await register.fillInConfirmPassword('Password1!');
        await register.submitRegisterForm();
        // assert
        await register.see(register.failedSnackInternalError);
    });
    test('I can register successfully with valid form data', async ({ page }) => {
        // arrange
        const register = new PlaywrightRegisterPage(page);
        // act
        await register.goto();
        await register.fillInFirstName('John');
        await register.fillInLastName('Doe');
        await register.fillInEmail(`newuser${Math.floor(Math.random() * 10000)}@test.com`);
        await register.fillInPassword('Password1!');
        await register.fillInConfirmPassword('Password1!');
        await register.submitRegisterForm();
        // assert
        await register.amRegistered();
    });
    test('I can click "Already have an account?" link', async ({ page }) => {
        // arrange
        const register = new PlaywrightRegisterPage(page);
        // act
        await register.goto();
        await register.clickOnLoginLink();
        // assert
        await register.amOnLoginPage();
    });
});
