import { expect, test } from '@playwright/test';

import { HrOperations } from '../actions/hrOperations';

const ADMIN_USER = process.env.ADMIN_USER!;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;

const userName = Math.random().toString(36).slice(2, 10);

test.describe('verify successful login of user and dashboard loaded', () => {
  test('verify unsuccessful login of user and error displayed', async ({ page }) => {
    const hrOperations = new HrOperations(page);
    await hrOperations.invalidLoginAndErrorDisplayed(ADMIN_USER, 'wrong');
  });

  test('verify successful login of user', async ({ page }) => {
    const hrOperations = new HrOperations(page);
    await hrOperations.loginAndGoToDashboard(ADMIN_USER, ADMIN_PASSWORD);
  });

  test('verify adding a new system user not successful', async ({ page }) => {
    const hrOperations = new HrOperations(page);
    await hrOperations.loginAndGoToDashboard(ADMIN_USER, ADMIN_PASSWORD);
    const userPage = await hrOperations.createSystemUser(userName, '1234');
    await expect(userPage.locator('span.oxd-input-field-error-message').first()).toBeVisible();
  });

  test('verify adding a new system user successfully', async ({ page }) => {
    const hrOperations = new HrOperations(page);
    await hrOperations.loginAndGoToDashboard(ADMIN_USER, ADMIN_PASSWORD);

    const userPage = await hrOperations.createSystemUser(userName, 'password123');
    await expect(userPage.locator('span.oxd-input-field-error-message').first()).not.toBeVisible();
    await expect(userPage.getByText('Success', { exact: true })).toBeVisible();
  });

  test('verify editing the created user successfully', async ({ page }) => {
    const hrOperations = new HrOperations(page);
    await hrOperations.loginAndGoToDashboard(ADMIN_USER, ADMIN_PASSWORD);

    const userPage = await hrOperations.editSystemUser(userName);
    await expect(userPage.locator('span.oxd-input-field-error-message').first()).not.toBeVisible();
    await expect(userPage.getByText('Success', { exact: true })).toBeVisible();
  });

});
