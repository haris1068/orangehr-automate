import type { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';
import { uploadAttachment } from '../utils/utils';

export class MyInfoPage {
  private page: Page;
  private myInfoLink: Locator;
  private myInfoHeading: Locator;
  private container: Locator;
  private saveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.myInfoLink = page.getByRole('link', { name: 'My Info' });
    this.myInfoHeading = page.getByRole('heading', { name: 'Personal Details' });
    this.container = page.locator('.orangehrm-attachment');
    this.saveButton = this.container.getByRole('button', { name: 'Save' });
  }

  public async editMyInfo(): Promise<void> {
    await this.myInfoLink.click();
    await expect(this.myInfoHeading).toBeVisible();

    await this.page.getByRole('button', { name: 'Add' }).click();

    await this.container.getByText('Browse').click();

    await uploadAttachment(this.page, 'challenge.docx');

    await this.container.getByRole('textbox', { name: 'Type comment here' }).fill('my attachment');

    await this.saveButton.click();
    await expect(this.page.getByText('Success', { exact: true })).toBeVisible();
  }

  public async deleteAttachment() {
    await this.page.locator('button.oxd-icon-button.oxd-table-cell-action-space', { has: this.page.locator('i.oxd-icon.bi-trash') }).click();
    await this.page.getByRole('button', { name: 'Yes, Delete' }).click();
    await expect(this.page.getByText('Success', { exact: true })).toBeVisible();
  }
}
