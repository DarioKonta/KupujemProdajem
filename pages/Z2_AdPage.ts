import { Page, Locator } from '@playwright/test';
import { LoginModal } from './Z2_LoginModal';
import { appears } from '../helpers/locators';
export class AdPage {
  readonly addButton: Locator;

  constructor(readonly page: Page) {
    this.addButton = page.locator('button').filter({ hasText: 'Dodajte u Adresar' });
  }

  async hasAddToAdresarButton(): Promise<boolean> {
    return appears(this.addButton, 5000);
  }

  async addToAdresar(): Promise<LoginModal> {
    await this.addButton.click();
    return new LoginModal(this.page);
  }
}
