import { test, expect } from '@playwright/test';
import { ListingPage } from '../../pages/ListingPage';
import { FilterPanel } from '../../pages/Z1_FilterPanel';
import { ResultsPage } from '../../pages/Z1_ResultsPage';

const MIN_EXPECTED_RESULTS = 800;

test.use({ headless: true, launchOptions: { slowMo: 0 } });

test(`Search filter Odeća | Ženska > Bluze vraca vise od ${MIN_EXPECTED_RESULTS} rezulata`, async ({
  page,
}) => {
  const listing = new ListingPage(page);
  await listing.open();

  await listing.acceptCookies();
  await listing.closePopup();

  await listing.openFilterPanel();

  // ==================== Osnovni filteri ====================
  const filters = new FilterPanel(page);
  await filters.selectKategorija();
  await filters.selectGrupa();

  // ==================== Cena ====================
  await filters.fillCenaOd('100');
  await filters.selectDin();
  await filters.checkSamoSaCenom();

  // ==================== Dodatni filteri ====================
  await filters.selectStanje();

  const results = await filters.applyFilters();

  const count = await results.numberOfItems();

  expect(count).toBeGreaterThan(MIN_EXPECTED_RESULTS);
});
