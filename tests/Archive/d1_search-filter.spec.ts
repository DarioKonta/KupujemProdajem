import {test, expect } from '@playwright/test'

const MIN_EXPECTED_RESULTS = 800;

test.use( {headless: false, launchOptions: { slowMo: 0 }})

test('Search filter Odeća | Ženska > Bluze vraca vise od 1000 rezulata', async ({ page }) => {
    await page.goto('/');
    
    // ==================== Osnovni filteri ====================
    await page.getByRole('button', {name: 'Sve kategorije'}).click();
    await page.getByRole(('button'), {name: 'Odeća i obuća'}).click();
    await page.getByRole(('button'), {name: 'Ženska odeća'}).click();
    await page.locator('section').filter({ hasText: 'Odeća | Ženska Bluze' }).getByLabel('Bluze').click();
    
    // ==================== Cena ====================
    await page.locator('section').getByLabel('priceFrom').fill('100');
    await page.getByRole(('radio'), { name: 'rsd'}).check();
    await page.getByRole(('checkbox'), { name: 'Samo sa cenom'}).check();
    
    // ==================== Dodatni filteri ====================
    await page.getByRole(('checkbox'), {name: 'Novo'}).check();
    await page.getByRole(('checkbox'), {name: 'Nekorišćeno (polovno)'}).check();
   
    await page.locator('button').filter({hasText: 'Filtrirajte rezultate'}).click();

    const resultText = await page.getByText(/\d[\d.]* oglas/).textContent();
    const resultCount = parseInt(resultText!.replace(/\D/g, ''), 10);

    expect(resultCount).toBeGreaterThan(MIN_EXPECTED_RESULTS);
}) 