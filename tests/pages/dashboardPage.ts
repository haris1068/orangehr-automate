import type { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';

export class DashboardPage {
  private page: Page;
  private heading: Locator;
  private errorAlert: Locator;
  private loginHeading: Locator;
  private adminLink: Locator;
  private systemUsersHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Dashboard' });
    this.errorAlert = page.getByRole('alert');
    this.loginHeading = page.getByRole('heading', { name: 'Login' });
    this.adminLink = page.getByRole('link', { name: 'Admin' });
    this.systemUsersHeading = page.getByRole('heading', { name: 'System Users' });
  }

  public async dashboardLoadSuccessful(): Promise<void> {
    await expect(this.heading).toBeVisible();
  }

  public async dashboardLoadUnSuccessful(): Promise<void> {
    await expect(this.errorAlert).toHaveText('Invalid credentials');
    await expect(this.loginHeading).toBeVisible();
  }

  public async createSystemUser(userName: string, password: string): Promise<Page> {
    await this.adminLink.click();
    await expect(this.systemUsersHeading).toBeVisible();

    await this.page.getByRole('button', { name: 'Add' }).click();
    await expect(this.page.getByRole('heading', { name: 'Add User' })).toBeVisible();

    // Select User Role
    await this.page.locator('.oxd-select-text').first().click();
    await this.page.getByRole('option', { name: 'ESS' }).click();

    // Employee Name autocomplete
    const container = this.page.locator('div.oxd-autocomplete-wrapper');
    const input = container.locator('input[placeholder="Type for hints..."]');
    await input.fill('test');

    const dropdown = container.locator('div[role="listbox"]');
    await dropdown.locator('text=Searching...').waitFor({ state: 'detached', timeout: 5000 });

    await dropdown.locator('div[role="option"]').first().click();

    // Select Status
    const statusDropdown = this.page.locator('div.oxd-input-group:has(label:has-text("Status")) div.oxd-select-text');
    await statusDropdown.click();
    await this.page.getByRole('option', { name: 'Enabled' }).click();

    // Fill Username, Password and Confirm Password
    await this.page.locator('div.oxd-input-group:has(label:has-text("Username")) input.oxd-input').fill(userName);
    await this.page.locator('div.oxd-input-group:has(label:has-text("Password")) input.oxd-input').first().fill(password);
    await this.page.locator('div.oxd-input-group:has(label:has-text("Confirm Password")) input.oxd-input').fill(password);

    await this.page.getByRole('button', { name: 'Save' }).click();
    return this.page;
  }

  public async editSystemUser(userName: string): Promise<Page> {
    await this.adminLink.click();
    await expect(this.systemUsersHeading).toBeVisible();

    // Search User
    await this.page.locator('div.oxd-input-group:has(label:has-text("Username")) input.oxd-input').fill(userName);
    await this.page.getByRole('button', { name: 'Search' }).click();

    // Edit User
    await this.page.click('button:has(i.bi-pencil-fill)');

    const statusDropdown = this.page.locator('div.oxd-input-group:has(label:has-text("Status")) div.oxd-select-text');
    await statusDropdown.click();
    await this.page.getByRole('option', { name: 'Disabled' }).click();

    await this.page.getByRole('button', { name: 'Save' }).click();
    return this.page;
  }
}
