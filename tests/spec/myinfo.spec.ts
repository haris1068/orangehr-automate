import { test } from '@playwright/test';

import { HrOperations } from '../actions/hrOperations';

const ADMIN_USER = process.env.ADMIN_USER!;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;

test.describe('update my info and attach a document', () => {

  test('verify updating my info is successful', async ({ page }) => {
    const hrOperations = new HrOperations(page);
    await hrOperations.loginAndGoToDashboard(ADMIN_USER, ADMIN_PASSWORD);
    await hrOperations.updateMyInfo();
  });

});
