import { test, expect } from './fixtures';
import { searchCriteria } from './data/searchCriteria';

const MIN_EXPECTED_RESULTS = 800;
const unused = 1;

test.use({ headless: true, launchOptions: { slowMo: 0 } }); // Ovde je samo radi testiranja, bice obrisano

test.describe('Search FIlter', () => {
  test(
    `Search filter Odeća | Ženska > Bluze vraca vise od ${MIN_EXPECTED_RESULTS} rezulata`,
    { tag: '@smoke' },
    async ({ listingPage, filterPanel }) => {
      await listingPage.openFilterPanel();

      // ==================== Osnovni filteri ====================
      await filterPanel.selectKategorija(searchCriteria.kategorija);
      await filterPanel.selectGrupa(searchCriteria.grupa);

      // ==================== Cena ====================
      await filterPanel.fillCenaOd(searchCriteria.cenaOd);
      await filterPanel.selectDin();
      await filterPanel.checkSamoSaCenom();

      // ==================== Dodatni filteri ====================
      await filterPanel.selectStanje(searchCriteria.stanje);

      const results = await filterPanel.applyFilters();

      const count = await results.numberOfItems();

      expect(count).toBeGreaterThan(MIN_EXPECTED_RESULTS);

      // ==================== Edge case ====================

      await results.sortJeftinije();
      await results.waitUntilLoaded();
      const price = await results.firstItemPrice();

      expect(price).toBeGreaterThanOrEqual(searchCriteria.cenaOd);
      console.log(`Cena najjeftinijeg oglasa je: ${price} dinara`);
    },
  );
});
