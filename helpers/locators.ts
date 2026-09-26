import { Locator } from '@playwright/test';

export function appears(locator: Locator, timeout = 5000): Promise<boolean> {
  return locator
    .waitFor({ state: 'visible', timeout }) // Vraca promise
    .then(() => true) // Pretvara promise u boolean
    .catch(() => false);
}
