import { Page, Locator } from '@playwright/test'
import { ResultsPage } from './Z1_ResultsPage';
import { appears } from '../helpers/locators';

export class FilterPanel {
    readonly root: Locator

    constructor(readonly page: Page) {
        this.page = page;
        this.root = page.locator('[class*="searchFilters"]');
    }

    async selectKategorija(kategorija: string): Promise<void> {
        await this.root.getByRole('combobox', { name: 'categoryId' }).click();
        await this.root.getByRole('option', { name: kategorija }).click();
    }

    async selectGrupa(grupa: string): Promise<void> {
        await this.root.getByRole('option', { name: grupa }).click();
    }

    async fillCenaOd(cenaOd: number): Promise<void> {
        await this.root.getByRole('textbox', { name: 'priceFrom' }).fill(String(cenaOd));
    }

    async selectDin(): Promise<void> {
        await this.root.locator('label').filter({ hasText: 'din' }).click();
    }

    async checkSamoSaCenom(): Promise<void> {
        await this.root.getByRole('checkbox', { name: 'hasPrice Samo sa cenom' }).click(); 
    }

    async selectStanje(stanja: readonly string[]): Promise<void> { // Iz fixtures.ts stanja[] je readonly string[]
        const stanjeCombobox = this.page
            .locator('input[aria-label="condition"]')
            .locator('xpath=ancestor::div[contains(@class, "-control")][1]') // Jako nezgodan locator ali jedini koji je ostao konstantan

        await stanjeCombobox.click()

        for (const stanje of stanja) {
            const option = this.page.getByRole('option', { name: stanje }) 

            if (!(await appears(option, 1000))) {
            await stanjeCombobox.click()
            }
            await option.click()
        }
    }

    async applyFilters(): Promise<ResultsPage> {
        await this.root.getByRole('button', { name: 'Primenite filtere' }).click();
        const results = new ResultsPage(this.page);
        await results.waitUntilLoaded();
        return results;
    }
}