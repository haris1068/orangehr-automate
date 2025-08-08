import type { Page } from 'playwright/test';
import { LoginPage } from '../pages/loginPage';
import { DashboardPage } from '../pages/dashboardPage';
import { RecruitmentPage } from '../pages/recruitmentPage';
import { MyInfoPage } from '../pages/myInfoPage';

export class HrOperations {
  private loginPage: LoginPage;
  private dashBoardPage : DashboardPage;
  private recruitmentPage : RecruitmentPage;
  private myInfoPage : MyInfoPage;
  constructor(page: Page) {
    this.loginPage = new LoginPage(page);
    this.dashBoardPage = new DashboardPage(page);
    this.recruitmentPage = new RecruitmentPage(page);
    this.myInfoPage = new MyInfoPage(page);
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

  public async searchCandidateByField(fieldName: string, searchString: string) {
    await this.recruitmentPage.searchCandidate(fieldName, searchString);
    await this.recruitmentPage.candidateFound();
  }

  public async updateMyInfo() {
    await this.myInfoPage.editMyInfo();
    await this.myInfoPage.deleteAttachment();
  }
}
