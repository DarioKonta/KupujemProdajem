import { Page, Locator } from '@playwright/test';

export class LoginModal {
  readonly root: Locator;

  constructor(readonly page: Page) {
    this.root = page.locator('[class*="Modal-module"]');
  }

  heading(): Locator {
    return this.root.locator('[class*="LoginFlow"]').getByText('E-mail adresaPrijavite se');
  }

  facebookLoginButton(): Locator {
    return this.root.getByLabel('Prijavite se pomoću Facebook-a');
  }
}
