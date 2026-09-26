import { Page, Locator } from '@playwright/test';

export class ResultsPage {
  readonly results: Locator;

  constructor(readonly page: Page) {
    this.results = page.locator('[class*="AdItem"]');
  }

  async waitUntilLoaded(): Promise<void> {
    await this.results.first().waitFor({ state: 'visible' });
  }

  async numberOfItems(): Promise<number> {
    const resultText = await this.page
      .locator('div')
      .filter({ has: this.page.getByRole('button', { name: 'Početna' }) })
      .getByText(/\d+\s*oglasa/)
      .last()
      .textContent();

    if (resultText === null) throw new Error('Broj oglasa nije pronađen u breadcrumbu');

    return parseInt(resultText.replace(/\D/g, ''), 10);
  }

  async sortJeftinije(): Promise<void> {
    await this.page.getByLabel('Sortiraj').click();
    await this.page.getByRole('button', { name: 'Jeftinije' }).click();
  }

  async firstItemPrice(): Promise<number> {
    const price = await this.results.first().locator('[class*= "priceText"]').textContent();

    if (price === null) throw new Error('Cena prvog oglasa nije pronađena');

    return parseInt(price.replace(/\D/g, ''), 10);
  }
}
