import { test, expect } from './fixtures';

test.use({ headless: true, launchOptions: { slowMo: 0 } }); // Ovde je samo radi testiranja, bice obrisano

test.describe('Adresar', () => {
  test(
    'Dodavanje oglasa u adresar otvara login dialog',
    { tag: '@smoke' },
    async ({ listingPage, adPage }) => {
      let found = false;
      const total = await listingPage.adCount();

      for (let i = 0; i < total; i++) {
        // Desava se da neki oglas nema dodaj u adresar, zato se prolazi kroz sve oglase
        await listingPage.openAd(i);

        const hasButton = await adPage.hasAddToAdresarButton();

        console.log(`Oglas ${i + 1} - Dugme prisutno: ${hasButton}`);

        if (!hasButton) {
          await listingPage.open();
          continue;
        }

        found = true;
        const login = await adPage.addToAdresar();
        await expect(login.heading()).toBeVisible();
        await expect(login.facebookLoginButton()).toBeVisible();
        break;
      }

      expect(found, 'Nijedan oglas nije imao dugme "Dodaj u Adresar"').toBe(true); // Edge case
    },
  );
});
