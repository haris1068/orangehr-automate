import { Page, Locator, expect } from '@playwright/test';

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

}
