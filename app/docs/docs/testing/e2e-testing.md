# E2E Testing

## Pattern

For our e2e tests we are using the [Page Object Model](https://playwright.dev/docs/pom) (POM). The idea is for the class to handle all the locators and expects, abstracting each step of the testing to make the tests themselves clear and easy to follow. We also want to design the tests in a user flow centric way, putting focus on ensuring a user can perform a given action without encountering issues along the way.

## Landing Page Login Example

We want to test that a user can log in from the landing page and be redirected to the correct protected route. Typically without POM in playwright this would be done via direct playwright page interactions

### Without POM

```ts
test('I can login from the app bar', async ({ page }) => {
    await page.goto('/'),
        await page.locator('text=Login').click(),
        await page.locator('input[type="email"]').fill('test@prytaneum.io'),
        await page.locator('input[type="password"]').click(),
        await page.locator('input[type="password"]').fill('password'),
        await Promise.all([
            page.waitForNavigation(),
            page.locator('div[role="dialog"] button:has-text("Login")').click(),
        ]);
    await expect(page).toHaveURL('/organizations/me');
});
```

While this test does pass and work, it is not obvious at a glance what is going on with each step, and for longer, more complicated selectors, it can become even more difficult to follow.

### Our Pattern

Rather than putting all these page locators and interactions within the test, we can move them to a class based on the page we are testing. This way we can clearly dictate each step of our test in plain english, thus minimizing confusion.

#### Landing Page Class

When constructing we can locate all the components we want to interact with or ensure is visible/hidden for the user.
As for the actions, they can all be represented as methods.
:::note
Even if the component is not currently in the DOM you can still set it in the constructor since the locator is dynamic.
:::
:::note
Keep the methods small and in the scope of one specific task as shown in the example below. No one method should be performing multiple actions.
:::

```ts
export class PlaywrightLandingPage {
    readonly page: Page;
    readonly appBarLoginButton: Locator;
    // Constructor
    constructor(page: Page) {
        this.page = page;
        this.appBarLoginButton = page.locator('[data-test-id="appbar-login-button"]');
    }
    // Page Actions
    async goto() {
        await this.page.goto('/');
    }
    async clickOnLogin() {
        await this.appBarLoginButton.click();
    }
    async fillInEmail(email: string) {
        const emailInput = this.page.locator('input[type="email"]');
        await expect(emailInput).toBeVisible();
        await emailInput.fill(email);
    }
    async fillInPassword(password: string) {
        const passwordInput = this.page.locator('input[type="password"]').first();
        await expect(passwordInput).toBeVisible();
        await passwordInput.fill(password);
    }
    async submitLoginForm() {
        const loginButton = this.page.locator('div[role="dialog"] button:has-text("Login")');
        await expect(loginButton).toBeVisible();
        await Promise.all([this.page.waitForNavigation(), loginButton.click()]);
    }
    // Route Check
    async amLoggedIn() {
        await expect(this.page).toHaveURL('/organizations/me');
    }
}
```

#### A Landing Page Test

With the class set up, the tests can be performed as shown below, giving a clear sequence of actions performed on the page as well as validating the end result. Also note that the test naming convention follows the user flow philosophy. We want to know that I (The user) can perform said action.

```ts
test('I can login from the app bar', async ({ page }) => {
    const landing = new PlaywrightLandingPage(page);
    await landing.goto();
    await landing.clickOnLogin();
    await landing.fillInEmail('test@example.com');
    await landing.fillInPassword('Password1!');
    await landing.submitLoginForm();
    await landing.amLoggedIn();
});
```
