import type { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';

export class RecruitmentPage {
  private page: Page;
  private recruitmentLink: Locator;
  private recruitmentHeading: Locator;
  private searchButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.recruitmentLink = page.getByRole('link', { name: 'Recruitment' });
    this.recruitmentHeading = page.getByRole('heading', { name: 'Candidates' });
    this.searchButton = page.getByRole('button', { name: 'Search' });
  }

  public async searchCandidate(fieldName: string, searchString: string): Promise<void> {
    await this.recruitmentLink.click();
    await expect(this.recruitmentHeading).toBeVisible();

    const inputGroup = this.page.locator(`div.oxd-input-group:has(label:has-text("${fieldName}"))`);
    const input = inputGroup.locator('input.oxd-input');

    await expect(input).toBeVisible();
    await input.fill(searchString);
    await this.searchButton.click();
  }

  public async candidateFound(): Promise<void> {
    const recordsFoundSpan = this.page.locator('span:has-text("Records Found")');
    await expect(recordsFoundSpan).toBeVisible();

    const text = await recordsFoundSpan.textContent();
    if (text === null || text.trim() === '') {
      throw new Error('No records found text displayed');
    }

    const match = text.match(/\((\d+)\)/);
    if (!match || Number(match[1]) === 0) {
      throw new Error('No records found');
    }

    const tableBody = this.page.locator('div.oxd-table-body[role="rowgroup"]');
    const rows = tableBody.locator('div.oxd-table-row[role="row"]');

    await expect(rows).not.toHaveCount(0);

  }
}
