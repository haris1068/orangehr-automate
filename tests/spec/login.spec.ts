import { expect, test } from '@playwright/test';

import { LoginActions } from '../actions/loginActions';

const ADMIN_USER = process.env.ADMIN_USER!;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;

test.describe('verify successful login of user and dashboard loaded', () => {
  const userName = Math.random().toString(36).slice(2, 10);
  test('verify unsuccessful login of user and error displayed', async ({ page }) => {
    const login = new LoginActions(page);
    await login.invalidLoginAndErrorDisplayed('test', 'wrong');
  });

  test('verify successful login of user', async ({ page }) => {
    const login = new LoginActions(page);
    await login.loginAndGoToDashboard(ADMIN_USER, ADMIN_PASSWORD);
  });

  test('verify adding a new system user not successful', async ({ page }) => {
    const login = new LoginActions(page);
    await login.loginAndGoToDashboard('Admin', 'admin123');
    const userPage = await login.createSystemUser(userName, '1234');
    await expect(userPage.locator('span.oxd-input-field-error-message').first()).toBeVisible();
  });

  test('verify adding a new system user successfully', async ({ page }) => {
    const login = new LoginActions(page);
    await login.loginAndGoToDashboard('Admin', 'admin123');

    const userPage = await login.createSystemUser(userName, 'password123');
    await expect(userPage.locator('span.oxd-input-field-error-message').first()).not.toBeVisible();
    await expect(userPage.getByText('Success', { exact: true })).toBeVisible();
  });

  test('verify editing the new created user successfully', async ({ page }) => {
    const login = new LoginActions(page);
    await login.loginAndGoToDashboard('Admin', 'admin123');

    const userPage = await login.editSystemUser(userName);
    await expect(userPage.locator('span.oxd-input-field-error-message').first()).not.toBeVisible();
    await expect(userPage.getByText('Success', { exact: true })).toBeVisible();
  });

});
