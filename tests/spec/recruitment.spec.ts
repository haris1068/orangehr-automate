import { test } from '@playwright/test';

import { HrOperations } from '../actions/hrOperations';

const ADMIN_USER = process.env.ADMIN_USER!;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;

test.describe('search for users in recruitment', () => {

  test('verify searching for a user in recruitment successfully', async ({ page }) => {
    const hrOperations = new HrOperations(page);
    await hrOperations.loginAndGoToDashboard(ADMIN_USER, ADMIN_PASSWORD);
    await hrOperations.searchCandidateByField('Date of Application', '2024-01-01');
  });

});
