import { test as base, expect } from '@playwright/test'
import { ListingPage } from '../pages/ListingPage'
import { FilterPanel } from '../pages/Z1_FilterPanel'
import { AdPage } from '../pages/Z2_AdPage';

export const test = base.extend<{
    listingPage: ListingPage;
    filterPanel: FilterPanel;
    adPage: AdPage;
}>({
    listingPage: async ({page}, use): Promise<void> => {
        const listing = new ListingPage(page);
        await listing.open();
        await listing.acceptCookies();
        await listing.closePopup();
        await use(listing);
    },

    filterPanel: async ({page}, use): Promise<void> => {
        const filters = new FilterPanel(page);
        await use(filters);
    },

    adPage: async ({page}, use): Promise<void> => {
        const ad = new AdPage(page);
        await use(ad);
    }
})

export {expect};