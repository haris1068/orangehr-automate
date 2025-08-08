import type { Page } from 'playwright/test';
import { LoginPage } from '../pages/loginPage';
import { DashboardPage } from '../pages/dashboardPage';

export class LoginActions {
  private loginPage: LoginPage;
  private dashBoardPage : DashboardPage;
  constructor(page: Page) {
    this.loginPage = new LoginPage(page);
    this.dashBoardPage = new DashboardPage(page);
  }

  public async loginAndGoToDashboard(email: string, password: string) {
    await this.loginPage.goto();
    await this.loginPage.login(email, password);
    await this.dashBoardPage.dashboardLoadSuccessful();
  }

  public async invalidLoginAndErrorDisplayed(email: string, password: string) {
    await this.loginPage.goto();
    await this.loginPage.login(email, password);
    await this.dashBoardPage.dashboardLoadUnSuccessful();
  }

  public async createSystemUser(userName: string, password: string) {
    return await this.dashBoardPage.createSystemUser(userName, password);
  }

  public async editSystemUser(userName: string) {
    return await this.dashBoardPage.editSystemUser(userName);
  }
}
