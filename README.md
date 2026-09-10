# Meridian — Executive Intelligence

A strategic account decision workspace tailored to Leonardo's conversation and industrial-minerals background. All customer accounts and financial records are fictional. Public company context is separately cited in the app. The fixed reporting snapshot is **31 December 2025**, with three years of synthetic monthly records.

See [conversation analysis, company research and the 15-minute walkthrough](docs/LEONARDO-BRIEFING.md). This private preparation file is excluded from the server's public allowlist.

## Run

Requires Node.js 20 or newer. There are no production dependencies.

```sh
npm start
```

Open **http://localhost:4173**. The seven HTML pages also work when opened directly, with local analysis; a local server is needed for the optional AI connection.

## What works

- Executive overview with reconciled metrics, account search, filters, revenue sorting, and CSV export.
- Account 360 with industrial mineral products, geography, synthetic tonnage, gross profit per tonne, three years of revenue, opportunities, payment context, and order records.
- Account-specific decision briefs computed from the same data; optional live AI generation and print-to-PDF.
- Interactive value radar with explicit factors, weights, and matching quadrant thresholds.
- Relationship-support simulator with a one-time settlement, 1–24 monthly payments, adjustable expansion and failed-recovery assumptions, incremental sales needed to recover, and export. A temporary price concession remains a separate mode.
- Account-specific executive review notes, persisted locally without implying an approval or workflow assignment.
- Business questions with computed local rankings and explicit unsupported-question responses, plus optional live AI.
- Five developments in the morning brief, with browser-local review marks.
- Responsive layouts, keyboard-accessible controls, print styling, empty states, and invalid-account handling.

## Optional live AI

Copy `.env.example` to `.env`, set `OPENAI_API_KEY` and `OPENAI_MODEL` to a Responses API compatible model available to your account, and restart the server. Credentials stay on the server. Only the fictional records relevant to the request are included with the question. The UI automatically distinguishes connected AI from local analysis.

Without credentials, **no language model is called**. Briefs are deterministic, data-driven assessments, and business questions use a limited local intent classifier. Unknown questions are acknowledged instead of being mapped to an unrelated answer. The live integration requires credentials to validate end to end.

## Data and calculations

`data.js` holds the synthetic seed account records. `model.js` deterministically generates the 288 monthly orders and computes all metrics. The four CSVs in `data/` are downloadable exports of that model. Run `node generate-data.js` after changing the seeds to refresh them. The UI does not ingest edits made directly to the CSV exports.

Annual revenue reconciles to $30.4M. Growth compares 2025 against 2024. Gross margin is weighted by revenue, using the generated order costs. Specialty mix uses each account's explicit `specialtyProducts` classification; it is not inferred from product names. Commercial note claims such as purchase frequency are separated from ledger evidence. Annual tonnes and relationship tenure are synthetic seed inputs, included in the customer export.

Future value = 35% normalized growth + 30% normalized pipeline + 20% premium share + 15% payment quality. Current value = annual gross profit / $1.8M, capped at 100. Both quadrant boundaries are 50. This can place an account differently from the initial scenario's manually assigned quadrant.

The default support model subtracts the full one-time commitment in year one from both supported and downside gross profit. Installments affect cash timing only. Supported volume ramps to the selected year-three uplift; downside remains the selected percentage below baseline. Baseline growth compounds from year two. The comparison metric is gross profit less support, not EBITDA. The baseline assumes continued business without support; there is no inferred retention probability or claim of causality.

The alternative discount model reduces all first-year supported revenue, restores full price in years two and three, and holds unit costs constant. It reports revenue and gross profit separately. No modeled outcome is an approval recommendation. `board.js` implements the public company context, support scenario and advisory review views; `model.js` is shared with the server's AI evidence package.

## Verification

```sh
npm install
npm test
npm run test:ui
```

Browser checks use installed Microsoft Edge through Playwright. They exercise all seven screens at desktop and mobile widths, account navigation, filters, exports, scenario controls, radar selection, unsupported questions, safe text rendering and persistent review marks. Screenshots are written to `test-results/`.

## Scope

This is a local demonstration, not a production deployment. It has no authentication, live ERP/CRM connection, shared approval workflow, or database. The server binds to localhost. Review marks are saved only in the current browser. The synthetic ledger contains monthly aggregated records, not a real transaction history.
