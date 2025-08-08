import { test } from '@playwright/test';

import { LoginActions } from '../actions/loginActions';

test.describe('verify successful login of user and dashboard loaded', () => {
  test('verify successful login of user', async ({ page }) => {
    const login = new LoginActions(page);
    await login.loginAndGoToDashboard('Admin', 'admin123');
  });

  test('verify unsuccessful login of user and error displayed', async ({ page }) => {
    const login = new LoginActions(page);
    await login.invalidLoginAndErrorDisplayed('test', 'wrong');
  });
});
