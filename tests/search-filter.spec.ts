import {test, expect } from '@playwright/test'

const MIN_EXPECTED_RESULTS = 800; // per assignment spec; adjust if business requirement changes

test.use({headless: false, launchOptions: {slowMo: 0}});

test('search filter for Odeća | Ženska > Bluze returns more than 1000 results', async ({ page }) => {
    await page.goto('https://www.kupujemprodajem.com/');
    await page.getByRole('button', {name: 'Sve kategorije'}).click();
    await page.getByRole(('button'), {name: 'Odeća i obuća'}).click();
    await page.getByRole(('button'), {name: 'Ženska odeća'}).click();
    await page.locator('section').filter({ hasText: 'Odeća | Ženska Bluze' }).getByLabel('Bluze').click();

    await page.locator('section').getByLabel('priceFrom').fill('100');
    await page.getByRole(('radio'), { name: 'rsd'}).check();
    await page.getByRole(('checkbox'), {name: 'Novo'}).check();
    await page.getByRole(('checkbox'), {name: 'Nekorišćeno (polovno)'}).check();
    await page.getByRole(('checkbox'), { name: 'Samo sa cenom'}).check();
    await page.locator('button').filter({hasText: 'Filtrirajte rezultate'}).click();

    const resultText = await page.getByText(/\d[\d.]* oglas/).textContent();
    const resultCount = parseInt(resultText!.replace(/\D/g, ''), 10);

    expect(resultCount).toBeGreaterThan(MIN_EXPECTED_RESULTS);
}) 