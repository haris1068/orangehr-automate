import type { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';

export class DashboardPage {
  private page: Page;
  private heading: Locator;
  private errorAlert: Locator;
  private loginHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Dashboard' });
    this.errorAlert = page.getByRole('alert');
    this.loginHeading = page.getByRole('heading', { name: 'Login' });
  }

  public async dashboardLoadSuccessful(): Promise<void> {
    await expect(this.heading).toBeVisible();
  }

  public async dashboardLoadUnSuccessful(): Promise<void> {
    expect(await this.errorAlert.textContent()).toEqual('Invalid credentials');
    await expect(this.loginHeading).toBeVisible();
  }

  public async createSystemUser(userName: string, password: string): Promise<Page> {
    await this.page.getByRole('link', { name: 'Admin' }).click();
    await this.page.getByRole('heading', { name: 'System Users' }).isVisible();

    await this.page.getByRole('button', { name: 'Add' }).click();
    await this.page.getByRole('heading', { name: 'Add User' }).isVisible();

    await this.page.locator('.oxd-select-text').first().click();
    await this.page.getByRole('option', { name: 'ESS' }).click();

    await this.page.getByRole('textbox', { name: 'Type for hints...' }).fill('test');
    await this.page.getByRole('option', { name: 'sww test' }).first().click();

    await this.page.locator('div.oxd-input-group:has(label:has-text("Status")) div.oxd-select-text').click();
    await this.page.getByRole('option', { name: 'Enabled' }).click();

    await this.page.locator('div.oxd-input-group:has(label:has-text("Username")) input.oxd-input').fill(userName);
    await this.page.locator('div.oxd-input-group:has(label:has-text("Password")) input.oxd-input').first().fill(password);
    await this.page.locator('div.oxd-input-group:has(label:has-text("Confirm Password")) input.oxd-input').fill(password);
    await this.page.getByRole('button', { name: 'Save' }).click();
    return this.page;
  }

  public async editSystemUser(userName: string): Promise<Page> {
    await this.page.getByRole('link', { name: 'Admin' }).click();
    await this.page.getByRole('heading', { name: 'System Users' }).isVisible();

    await this.page.locator('div.oxd-input-group:has(label:has-text("Username")) input.oxd-input').fill(userName);
    await this.page.getByRole('button', { name: 'Search' }).click();

    await this.page.click('button:has(i.bi-pencil-fill)');

    await this.page.locator('div.oxd-input-group:has(label:has-text("Status")) div.oxd-select-text').click();
    await this.page.getByRole('option', { name: 'Disabled' }).click();

    await this.page.getByRole('button', { name: 'Save' }).click();
    return this.page;
  }

}
