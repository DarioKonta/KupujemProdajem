# KupujemProdajem - Automated Test Assignment

[![Playwright Tests](https://github.com/DarioKonta/KupujemProdajem/actions/workflows/playwright.yml/badge.svg)](https://github.com/DarioKonta/KupujemProdajem/actions/workflows/playwright.yml)

- Automated tests for kupujemprodajem.com.
- Written in Playwright with TypeScript.
- Runs cross-browser (Chromium, Firefox, WebKit) and independent of operating
  system (Windows, Linux, macOS).

## Scenarios covered

**Search filter result count** (`tests/searchFilter.spec.ts`)

- Kategorija: "Odeća | Ženska"
- Grupa: "Bluze"
- Cena od: 100 RSD
- "samo sa cenom"
- Stanje: "Novo" + "Kao novo (nekorišćeno)"
- Asserts the resulting listing count exceeds a defined threshold.

**Adresar requires login** (`tests/adresar.spec.ts`)

- As a logged-out user, opens a listing and attempts to add it to Adresar.
- Asserts a login modal appears, since this action requires authentication.

## Prerequisites

- [Node.js](https://nodejs.org) v18 or newer (tested on v24.19.0)
- [Git](https://git-scm.com/downloads)

No other tools need to be installed manually.
Playwright manages its own browser binaries (see below).

## Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/DarioKonta/KupujemProdajem.git
cd KupujemProdajem
npm ci
npx playwright install
```

`npm ci` (not `npm install`) is used deliberately.  
It installs the exact dependency versions locked in `package-lock.json`.  
This makes the setup reproducible across machines and operating systems.

## Running the tests

Run the full suite, headless, across all three browsers:

```bash
npx playwright test
```

Run a single spec file:

```bash
npx playwright test tests/searchFilter.spec.ts
npx playwright test tests/adresar.spec.ts
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

## Continuous integration

Every push and pull request to main runs the suite headless on a clean
Linux runner via GitHub Actions. The workflow:

- installs Node and dependencies

- installs Playwright browsers with system dependencies

- runs npx playwright test

- uploads the HTML report and traces as downloadable artifacts

See .github/workflows/playwright.yml for the full configuration.  
The workflow status is shown by the badge at the top of this README.

## Project structure

```
== = == = == = == = == = == = == = == = == = == = == = == = == = == = == =

tests/
├── searchFilter.spec.ts        - Scenario 1
├── adresar.spec.ts             - Scenario 2
├
├── fixtures.ts                 - Custom fixtures - auto-injects page objects,
│                               handles navigation + cookie banner + popup dismissal
├── data/
│   └── searchCriteria.ts       - Filter values used by the search test
│
└── Archive/                    - Earlier versions of the specs, kept on purpose -
                                see "How this evolved" below

== = == = == = == = == = == =

pages/                          - Page Object classes (ListingPage, FilterPanel,
                                ResultsPage, AdPage, LoginModal)

== = == = == = == = == = == =

helpers/
└── locators.ts                 - Shared wait helper (waitFor-based, not isVisible -
                                see the note below on why that distinction mattered)

== = == = == = == = == = == =

Screenshots/                    - A passing run from each stage of development

== = == = == = == = == = == =
.github/
└── workflows/                  - CI - runs the suite on push/PR, headless,
                                uploads the HTML report and traces as artifacts

== = == = == = == = == = == =

Dockerfile
.dockerignore                   - Containerized run

== = == = == = == = == = == =
eslint.config.mjs
.prettierrc
.husky/                         - Lint/format, enforced on commit via a pre-commit hook

== = == = == = == = == = == = == = == = == = == = == = == = == = == = == =
```

## Running via Docker

Run the full suite in a clean, reproducible environment.  
No local Node install, no browsers, no OS-specific dependencies.

**Build the image:**

```bash
docker build -t kp-playwright-tests .
```

Run the tests:

```bash
docker run --rm kp-playwright-tests
```

## Notes

- The result-count threshold in `searchFilter.spec.ts` reflects live site
  data observed during development, not the assignment's original number,
  since inventory changes over time. See the comment above the constant in
  that file for details.
- `adresar.spec.ts` iterates over visible listings to find one that offers
  the "Dodajte u Adresar" action, since not every listing has it. If none is
  found, the test fails explicitly rather than passing without asserting
  anything.
