import {test, expect } from './fixtures'
import { searchCriteria } from './data/searchCriteria'

const MIN_EXPECTED_RESULTS = 800;

test.use({headless: true, launchOptions: {slowMo: 0}});    // Ovde je samo radi testiranja, bice obrisano

test(`Search filter Odeća | Ženska > Bluze vraca vise od ${MIN_EXPECTED_RESULTS} rezulata`, async ({ listingPage, filterPanel }) => {
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
}) 