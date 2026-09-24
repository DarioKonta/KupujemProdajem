import { Page, Locator } from '@playwright/test'
import { ResultsPage } from './Z1_ResultsPage';

export class FilterPanel {
    readonly root: Locator

    constructor(readonly page: Page) {
        this.page = page;
        this.root = page.locator('[class*="searchFilters"]');
    }

    async selectKategorija(): Promise<void> {
        await this.root.getByRole('combobox', { name: 'categoryId' }).click();
        await this.root.getByRole('option', { name: 'Odeća | Ženska' }).click();
    }

    async selectGrupa(): Promise<void> {
        await this.root.getByRole('option', { name: 'Bluze' }).click();
    }

    async fillCenaOd(iznos: string): Promise<void> {
        await this.root.getByRole('textbox', { name: 'priceFrom' }).fill(iznos);
    }

    async selectDin(): Promise<void> {
        await this.root.locator('label').filter({ hasText: 'din' }).click();
    }

    async checkSamoSaCenom(): Promise<void> {
        await this.root.getByRole('checkbox', { name: 'hasPrice Samo sa cenom' }).click();
    }

    async selectStanje(): Promise<void> {
        const trigger = this.page
            .locator('input[aria-label="condition"]')
            .locator('xpath=ancestor::div[contains(@class, "-control")][1]');
            
        const nekorisceno = this.page.getByRole('option', { name: 'Nekorišćeno (polovno)' });

        await trigger.click();
        await this.page.getByRole('option', { name: 'Novo' }).click();

        // Ukoliko combobox ne ostane otvoren, klikni ga ponovo
        const stillOpen = await nekorisceno.isVisible().catch(() => false)
        if (!stillOpen) {
            await trigger.click();
        }

        await nekorisceno.click();
        }

    async applyFilters(): Promise<ResultsPage> {
        await this.root.getByRole('button', { name: 'Primenite filtere' }).click();
        const results = new ResultsPage(this.page);
        await results.waitUntilLoaded();
        return results;
    }
}