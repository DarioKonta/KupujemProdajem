import { test, expect } from '@playwright/test';
import { ListingPage } from '../../pages/ListingPage';
import { AdPage } from '../../pages/Z2_AdPage';

test.use({ headless: true, launchOptions: { slowMo: 0 } });

test('Dodavanje oglasa u adresar otvara login dialog', async ({ page }) => {
  const listing = new ListingPage(page);
  await listing.open();

  await listing.acceptCookies();
  await listing.closePopup();

  let found = false;
  const total = await listing.adCount();

  for (let i = 0; i < total; i++) {
    console.log(`Iteracija ${i + 1}`);
    await listing.openAd(i);

    const ad = new AdPage(page);
    const hasButton = await ad.hasAddToAdresarButton();

    console.log(`Oglas ${i + 1} - Dugme prisutno: ${hasButton}`);

    if (!hasButton) {
      await listing.open();
      continue;
    }

    found = true;
    const login = await ad.addToAdresar();
    await expect(login.heading()).toBeVisible();
    await expect(login.facebookLoginButton()).toBeVisible();
    break;
  }

  expect(found, 'Nijedan oglas nije imao dugme "Dodaj u Adresar"').toBe(true);
});
