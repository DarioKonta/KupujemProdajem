import { test, expect, Locator } from '@playwright/test';

test.use({ headless: false, launchOptions: { slowMo: 0 } });

const LISTING_URL = '/';

function appears(locator: Locator, timeout = 5000): Promise<boolean> {
  return locator
    .waitFor({ state: 'visible', timeout })
    .then(() => true)
    .catch(() => false);
}

test('Dodati u adresar otvara login formu', async ({ page }) => {
  await page.goto(LISTING_URL);

  const section = page.locator('section').filter({
    has: page.getByRole('button', { name: 'Najnoviji oglasi' }),
  });
  const items = section.locator('a[class*="adName"]');

  await expect(items.first()).toBeVisible();
  const itemCount = await items.count();

  let foundDodaj = false;

  for (let i = 0; i < itemCount; i++) {
    await items.nth(i).click();

    const dodajBtn = page.locator('button').filter({ hasText: 'Dodajte u Adresar' });
    const hasDodaj = await appears(dodajBtn);

    console.log('iteration', i, 'hasDodaj', hasDodaj);

    if (!hasDodaj) {
      await page.goBack();
      await expect(items.first()).toBeVisible();
      continue;
    }

    foundDodaj = true;
    await dodajBtn.click();

    const email = page
      .locator('form')
      .filter({ hasText: 'E-mail adresaUlogujte se' })
      .getByLabel('email');
    await expect(email).toBeVisible();

    const ulogujteSe = page.getByText('Prijavite se').nth(2); // Codegen mi je dao ovaj locator nisam uspeo sam da ga napravim
    await expect(ulogujteSe).toBeVisible();

    break;
  }
  expect(foundDodaj, 'Nijedan oglas nije imao dugme "Dodajte u Adresar"').toBe(true);
});
