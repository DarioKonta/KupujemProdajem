# KupujemProdajem — Automated Test Assignment

Automated tests for kupujemprodajem.com, written in Playwright with TypeScript.
Runs cross-browser (Chromium, Firefox, WebKit) and independent of operating
system (Windows, Linux, macOS).

## Scenarios covered

1. **Search filter result count** (`tests/search-filter.spec.ts`)
   Applies category "Odeća | Ženska" → group "Bluze", price from 100 RSD,
   "samo sa cenom", and condition "Novo" + "Kao novo (nekorišćeno)". Asserts
   the resulting listing count exceeds a defined threshold.

2. **Adresar requires login** (`tests/adressar.spec.ts`)
   As a logged-out user, opens a listing and attempts to add it to Adresar.
   Asserts a login modal appears, since this action requires authentication.

## Prerequisites

- [Node.js](https://nodejs.org) v18 or newer (tested on v24.19.0)
- [Git](https://git-scm.com/downloads)

No other tools need to be installed manually — Playwright manages its own
browser binaries (see below).

## Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/DarioKonta/KupujemProdajem.git
cd KupujemProdajem
npm ci
```

`npm ci` (not `npm install`) is used deliberately — it installs the exact
dependency versions locked in `package-lock.json`, which is what makes the
setup reproducible across machines and operating systems.

Install the browser binaries Playwright needs:

```bash
npx playwright install
```

## Running the tests

Run the full suite, headless, across all three browsers:

```bash
npx playwright test
```

Run a single spec file:

```bash
npx playwright test tests/search-filter.spec.ts
npx playwright test tests/adressar.spec.ts
```

Run with the browser visible (useful for watching a test execute):

```bash
npx playwright test --headed
```

Run a single test slowed down, for step-by-step observation:

```bash
npx playwright test --headed --slow-mo=500
```

## Viewing results

After a run, Playwright generates an HTML report. Open it with:

```bash
npx playwright show-report
```

This shows pass/fail status per browser, and for any failure: a trace,
screenshot, and the exact locator/step that failed.

A screenshot of a full passing run is included in this repository under
`Screenshots/`.

## Project structure

```
tests/
  search-filter.spec.ts   Scenario 1 — search filter result count
  adressar.spec.ts        Scenario 2 — Adresar login gate
Screenshots/               Evidence of a passing test run
playwright.config.ts       Test runner configuration (browsers, retries, base URL)
tsconfig.json               TypeScript configuration
```

## Notes

- The result-count threshold in `search-filter.spec.ts` reflects live site
  data observed during development, not the assignment's original number,
  since inventory changes over time. See the comment above the constant in
  that file for details.
- `adressar.spec.ts` iterates over visible listings to find one that offers
  the "Dodajte u Adresar" action, since not every listing has it. If none is
  found, the test fails explicitly rather than passing without asserting
  anything.
