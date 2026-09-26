import { Page, Locator } from '@playwright/test';
import { appears } from '../helpers/locators';

export class ListingPage {
  readonly newestAdsSection: Locator;
  readonly adLinks: Locator;

  constructor(readonly page: Page) {
    this.newestAdsSection = page
      .locator('section')
      .filter({ has: page.getByRole('button', { name: 'Najnoviji oglasi' }) });
    this.adLinks = this.newestAdsSection.locator('a[class*="adName"]');
  }

  async open(): Promise<void> {
    await this.page.goto('/'); // URL se nalazi u playwright.confing.ts
    await this.adLinks.first().waitFor({ state: 'visible' });
  }

  async acceptCookies(): Promise<void> {
    const cookies = this.page
      .locator('[class*="Grid-module"]')
      .getByRole('button', { name: 'Prihvatam' });

    if (await appears(cookies, 1000)) {
      await cookies.click();
    }
  }

  async closePopup(): Promise<void> {
    const closePopupBtn = this.page
      .locator('iframe[title="Dijalog Prijavljivanje pomoću Google-a"]')
      .contentFrame()
      .getByRole('button', { name: 'Затвори' }); // Nisam uspeo da nadjem stabilniji locator

    if (await appears(closePopupBtn, 1000)) {
      await closePopupBtn.click();
    }
  }

  // ==================== Zadatak 1 ====================
  async openFilterPanel(): Promise<void> {
    await this.page.getByRole('button', { name: 'Pretražite detaljno' }).click();
  }

  // ==================== Zadatak 2 ====================
  async adCount(): Promise<number> {
    return this.adLinks.count();
  }

  async openAd(index: number): Promise<void> {
    await this.adLinks.nth(index).click();
  }
}
