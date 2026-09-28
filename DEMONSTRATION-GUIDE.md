# Leonardo Executive Decision Intelligence — Demonstration Guide

## Purpose

Use this guide to explain the prototype in a clear, evidence-led way. The demonstration is a conversation about how executives could evaluate strategic customer decisions. It is not a claim that the prototype is connected to Leonardo’s company systems or real customer records.

**Important framing:** Every customer, order, margin, opportunity, product allocation, and scenario in the prototype is fictional. The snapshot is fixed at **31 December 2025**. The executive remains responsible for the decision.

## 1. What is it?

This is an executive decision-intelligence workspace for strategic customer relationships. It brings account economics, growth signals, product mix, payment behavior, opportunities, risks, and missing evidence into one place.

It helps an executive explore a question such as:

> What is the short-term cost of supporting this customer, what longer-term value might be at stake, and what evidence is still missing?

The system organizes evidence and lets a person explore scenarios. It does not decide whether to support a customer.

### Suggested opening

> “I built a fictional industrial-minerals example around the decision logic you described: a customer with specialty purchases, growth, and a request that creates an immediate financial cost. I’d like to show how the full picture could be assembled, then get your view on which evidence would matter in a real decision.”

## 2. What pain points does it address?

| Executive pain point | Why it matters |
| --- | --- |
| Customer information is spread across teams and systems | Leaders spend time assembling basic context before they can discuss the decision. |
| Short-term financial pressure can dominate the discussion | A current cash or margin cost may obscure strategic value, or potential value may be used to excuse weak economics. |
| Revenue can hide margin and cash problems | Growing sales do not necessarily mean growing profit, and longer payment times tie up working capital. |
| “Potential” is easy to state but hard to substantiate | Opportunity pipeline, growth assumptions, and customer commitments need to be shown separately. |
| Commercial judgment is not always visible to others | Technical, operational, financial, and relationship context can sit with different people. |
| Decision assumptions are difficult to compare later with results | Without a record of the decision and its outcome, the organization cannot learn from the choice. |

These are the problems the prototype is designed to explore. They should be validated with Leonardo; the prototype does not establish that these problems exist in his organization.

## 3. How does it address those pain points?

- **Assembles an account view:** Revenue, gross margin, growth, product classification, payment records, relationship notes, and pipeline appear together.
- **Separates measures that are easy to conflate:** Revenue, gross profit, payment timing, support cost, and unweighted pipeline are labeled distinctly.
- **Shows evidence and its limits:** The brief identifies what is recorded, what is unverified, and which expert judgment is still needed.
- **Makes assumptions adjustable:** The simulator lets a user vary support amount, installment timing, baseline growth, expansion, and downside volume.
- **Keeps the decision with the executive:** The prototype presents scenarios and review questions; it does not produce an approval recommendation.
- **Captures learning:** A decision, owner, rationale, conditions, and later outcome can be recorded for the fictional account in the current browser.

## 4. Inputs and outputs

### Inputs in this prototype

All inputs are synthetic. The app computes its portfolio from seed data in `data.js` and generated monthly order records in `model.js`; editing the CSV downloads does not update the app.

| Input | Example in the demo | How it is used |
| --- | --- | --- |
| Account profile | Industry, region, relationship tenure | Account context and segmentation |
| Orders | Monthly revenue, costs, payment days for 2023–2025 | Revenue growth, gross margin, payment signals, and charts |
| Product mix | Product shares and explicit specialty classification | Mix summaries and a specialty-purchase signal |
| Opportunities | Amount, description, and stage | Unweighted pipeline and opportunity context |
| Relationship notes | Commercial observations and unresolved issues | Brief context, with qualitative claims identified as notes |
| Scenario assumptions | Support amount, payment installments, growth, uplift, downside | Illustrative cash and gross-profit comparisons |
| Executive review | Perspective, decision, owner, rationale, conditions, outcome | Local review notes and decision history |

The sample order history is monthly and synthetic. It cannot establish real invoice-level payment behavior, purchase frequency, or an actual outstanding balance.

### Outputs

- Portfolio overview and accounts requiring attention
- Account 360 with revenue, gross margin, growth, product mix, opportunities, notes, and recent order rows
- A three-year revenue run-rate scenario based on repeating the latest annual growth rate, explicitly labeled **scenario, not forecast**
- Executive decision brief with evidence, financial impact, risks, and unknowns
- Current-value and future-potential comparison scores, with the scoring method exposed
- Interactive support and discount scenarios, including cash timing and recovery sales
- Business-question responses from local calculations, or optional server-side AI when configured
- A ranked morning brief derived from the synthetic account records
- Browser-local executive review and decision/outcome records

## 5. Main features and how to explain them

### Executive overview

**Say:** “This is the portfolio starting point. It shows the current snapshot, overall revenue and margin, opportunity pipeline, and the relationships with signals worth reviewing.”

**Show:** Portfolio measures, the priority account, the value radar, and the strategic-account table. Point out that pipeline is unweighted and is not contracted revenue.

**Explain:** The overview helps prioritize attention. It is not an approval queue or a substitute for the underlying account evidence.

### Morning brief

**Say:** “The brief ranks a small set of signals calculated from the sample account records, then gives a next question to investigate.”

**Show:** Open a margin, payment, declining-revenue, or opportunity signal. Follow the link to that account.

**Explain:** The prototype uses transparent rules against its fixed synthetic snapshot. In production, these signals would be refreshed from governed company data, with source timestamps and thresholds reviewed by the business.

### Account 360

**Say:** “This is the one-page account picture: what the customer buys, what it contributes today, how the account is changing, and what is still uncertain.”

**Show:** Revenue and margin metrics, product mix, revenue history, opportunities, relationship notes, payment behavior, and order records.

**Explain:** The 2025-versus-2024 growth and calculated margins come from the synthetic ledger. Relationship statements are notes, not verified transaction facts. The annual tonnage and product classifications are also illustrative.

### Future-value scenario

**Say:** “This dollar amount is a simple scenario, not a forecast. It repeats the latest annual growth rate for three years so we can discuss the assumption explicitly.”

**Show:** The illustrative revenue run-rate, its growth input, and the expanded assumptions.

**Explain:** It excludes opportunity pipeline and does not model churn, pricing changes, margin, capacity, or probability. The separate future-value radar score is a comparative heuristic, not a dollar valuation or confidence score.

### Executive decision brief

**Say:** “The brief puts the situation, evidence, cost, upside, downside, and open questions together. It also separates recorded information from assumptions.”

**Show:** The support request, installment cash amount, incremental sales needed to recover support at current margin, scenario comparison, and evidence gaps.

**Explain:** Gross profit less support is not EBITDA or an accounting recommendation. The baseline assumes the relationship continues without support; it does not assume the customer will leave if support is declined. No retention probability or causal effect is inferred.

### Decision simulator

**Say:** “Here I can change the assumptions and see what would need to be true for the economics to work.”

**Show:** Change the number of installments, set additional volume growth to zero, then compare the baseline, supported-growth, and downside cases.

**Explain:** Installments alter modeled cash timing, not the total support charge. The scenarios are hypotheses and have no assigned probabilities. Tax, overhead, financing costs, capacity limits, and working-capital effects beyond the displayed cash timing are not fully modeled.

### Ask the business

**Say:** “A leader can ask a question in ordinary language. The local version only answers a limited set of supported topics and names unsupported questions.”

**Show:** Ask which accounts are growing fastest or which accounts have margin pressure. Open a result’s source account.

**Explain:** Without credentials, responses use deterministic local calculations, not a language model. The optional server integration sends selected fictional evidence to OpenAI’s Responses API. It must not be described as a live AI connection unless credentials are configured and the integration has been checked.

### Decision and outcome record

**Say:** “If a decision is made, we can capture who owned it, what conditions applied, and later what actually happened.”

**Show:** Enter a decision record, save it, then use **Update outcome** to add later learning.

**Explain:** In this demo, records stay in the current browser’s local storage. They are not shared, backed up, access-controlled, or a formal approval workflow. A production version needs an authenticated shared record with an audit trail.

## 6. Suggested 12–15 minute walkthrough

| Time | Show | Presenter goal |
| --- | --- | --- |
| 0–2 min | Opening and Executive overview | Establish the decision problem and clearly state the data is fictional. |
| 2–4 min | Morning brief | Show how the prototype prioritizes a few account signals. |
| 4–7 min | Atlas Account 360 | Connect specialty mix, growth, margin, payment context, and uncommitted pipeline. |
| 7–9 min | Future-value scenario and decision brief | Show the assumption behind the run-rate and distinguish evidence from estimates. |
| 9–12 min | Decision simulator | Change installments and growth assumptions; make the downside visible. |
| 12–13 min | Ask the business | Ask a supported question and inspect the evidence. |
| 13–15 min | Decision record and discussion | Show how judgment and later outcomes could be retained; ask what a real workflow would require. |

### Closing questions for Leonardo

1. “When you face a strategic customer decision like this, how do you gather the financial, technical, and relationship evidence today?”
2. “Which part of this account picture would change the discussion, and which parts would you remove?”
3. “What would you need to see before trusting a future-value estimate?”
4. “Which source systems and teams own those data today?”
5. “Who should validate the assumptions and record the final decision?”
6. “Which decision would be a useful first pilot if this were connected to company data?”

## 7. How it could work in production

The prototype is a local demonstration. A production product would need to replace the synthetic data, browser-only persistence, and single-user local server with company-approved integrations and services.

### Proposed production flow

```text
CRM / ERP / Finance / Product / Payment / Relationship sources
                         ↓
          Read-only connectors and scheduled sync
                         ↓
     Validation, identity matching, and data lineage
                         ↓
        Governed account and transaction store
                         ↓
     Deterministic metrics and scenario calculations
                         ↓
  Authenticated application API and executive workspace
                         ↓
 Optional AI synthesis over authorized, selected evidence
                         ↓
         Shared decision record and outcome tracking
```

### Likely production data sources

The actual systems must be discovered with the company; none are known from this prototype. Typical source categories would be:

| Source category | Data that could be connected | Example use |
| --- | --- | --- |
| CRM / account management | Account identity, ownership, contacts, opportunity stages, interaction history | Account context, pipeline, and relationship timeline |
| ERP / order management | Orders, shipments, products, quantities, currencies, dates | Revenue trends, product mix, volume, and order cadence |
| Finance / general ledger / costing | Cost of goods, standard or actual cost, rebates, freight, account-level contribution | Margin and profitability, with agreed definitions |
| Accounts receivable | Invoices, due dates, payments, open balances, disputes, credit limits | Days-to-pay, overdue balances, and working-capital exposure |
| Product / master data | Product hierarchy, grades, applications, units, valid classifications | Consistent product mix and specialty classification |
| Commercial and technical records | Approved relationship notes, claims, specifications, qualification status | Decision context and unresolved technical evidence |
| Operations / supply planning | Capacity, lead times, quality, delivery constraints | Test whether a proposed growth scenario is deliverable |
| ESG / compliance sources, when relevant | Approved account or product assessments and source evidence | Display verified data or clearly state that evidence is missing |

Every source fact should retain its source system, source record ID, as-of date, currency/unit, refresh time, and any transformation applied. Data owners should approve definitions such as gross margin, payment days, account identity, and “specialty product” before they drive executive signals.

### APIs and integration pattern

The right interface depends on the company’s systems and security policy. A practical design usually combines:

- **Vendor APIs:** Read data from CRM, ERP, finance, and product systems using supported REST, SOAP, or OData interfaces where available.
- **Events or webhooks:** Receive account, order, invoice, payment, and opportunity changes when source platforms can publish reliable events.
- **Batch ingestion:** Use scheduled extracts or a warehouse/lakehouse pipeline for systems without suitable APIs and for reconciled historical reporting.
- **Internal application APIs:** Provide versioned, authenticated endpoints to the UI. Example resources: `GET /api/accounts`, `GET /api/accounts/{id}/brief`, `GET /api/accounts/{id}/scenarios`, `POST /api/questions`, `POST /api/decision-records`, and `PATCH /api/decision-records/{id}/outcome`.
- **Audit and lineage APIs:** Make it possible to inspect where an answer came from, when source data last refreshed, and which calculation version was used.

These are suggested production interfaces, not endpoints already implemented in the prototype. The current local server has `GET /api/status` and `POST /api/analyze`; its static account data is generated locally. The optional AI path uses `POST https://api.openai.com/v1/responses` from the server, not from the browser.

### AI’s role in production

Use deterministic application code for financial arithmetic, aggregation, thresholds, and scenario calculations. Use AI to summarize retrieved evidence, draft a brief, or interpret a supported business question. The AI should not invent missing records, calculate critical financial figures without validation, or approve a decision.

For each AI-generated claim, return a source record or calculation reference so a user can inspect the evidence. If a question cannot be answered from authorized sources, the system should say what is missing. Treat notes and documents as untrusted source content, separate them from system instructions, and validate model output before rendering or storing it.

The prototype’s optional OpenAI connection currently uses the Responses API. In a production deployment, keep API credentials in server-side secret management, restrict access to the service, apply data minimization, and decide retention and privacy requirements before sending real customer data. The Responses API supports text and structured JSON outputs; use a structured response contract if the application needs predictable fields for a brief or cited claims. Check the current official API documentation and the organization’s data policies during implementation. [Responses API reference](https://developers.openai.com/api/reference/cli/resources/responses/methods/create) · [OpenAI API production best practices](https://developers.openai.com/api/docs/guides/production-best-practices).

### Production controls to plan for

- Company SSO, role-based access, and account/region-level authorization
- Server-side API credentials; no secrets in browser code
- Read-only source integrations at first, with explicit access scopes
- Data minimization, encryption in transit and at rest, retention rules, and privacy review
- Reconciliation checks, freshness indicators, currency handling, and data-quality alerts
- Audit logs for evidence access, AI requests, scenario assumptions, decisions, and outcome updates
- Shared database persistence and controlled edit history for decision records
- Rate limits, retries, timeouts, monitoring, cost controls, and graceful local/non-AI fallback
- Human review for technical claims, financial assumptions, exceptions, and final decisions
- Evaluation using representative, approved cases before executives rely on generated summaries

## 8. What the prototype does not prove

- It does not demonstrate access to Leonardo’s or Grupo Curimbaba’s internal data or systems.
- It does not show that the organization has the pain points described above.
- It does not validate the synthetic assumptions, account scores, or future-value scenario against actual outcomes.
- It does not provide a shared production workflow, authentication, database, or audit trail.
- It does not prove that the optional AI service is configured or suitable for real customer data.

Treat the meeting as product discovery: find out which decision matters, which evidence exists, who owns it, and what a trusted first use case would require.
