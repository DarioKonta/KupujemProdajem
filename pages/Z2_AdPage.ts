import { Page, Locator} from '@playwright/test'
import { LoginModal } from './Z2_LoginModal'

export class AdPage {
    readonly addButton: Locator;

    constructor(readonly page: Page) {
        this.addButton = page.locator('button').filter({ hasText: 'Dodajte u Adresar'});
    }

    async hasAddToAdresarButton(timeout = 5000): Promise<boolean> {
        return this.addButton
            .waitFor({state: 'visible', timeout})
            .then(() => true)
            .catch(() => false);
    }

    async addToAdresar(): Promise<LoginModal> {
        await this.addButton.click()
        return new LoginModal(this.page);
    }
}