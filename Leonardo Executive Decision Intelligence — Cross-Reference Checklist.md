# Leonardo Executive Decision Intelligence System
## Prototype Cross-Reference Checklist & Interface Specification

---

## 1. Purpose

The system should help executives make better-informed decisions about strategically important customers.

The core problem is:

> Important customer information exists across different places, while executives often need to make decisions under short-term financial pressure.

The system should bring that information together and make the **short-term cost vs. long-term customer value** visible.

It should **not make the decision for the executive**.

It should provide:

- Context
- Evidence
- Financial impact
- Growth signals
- Future potential
- Risks
- Unknowns
- Scenarios
- Executive questions

The executive remains responsible for the final decision.

---

# 2. Core Product Concept

### Current situation

```text
CRM
Finance
Sales History
Product Data
Payment Data
Relationship Notes
        ↓
   Scattered Information
        ↓
 Manual Analysis
        ↓
 Executive Judgment
```

### Proposed system

```text
Business Data
     ↓
AI Intelligence Layer
     ↓
Customer / Account Intelligence
     ↓
Decision Brief
     ↓
Scenario Analysis
     ↓
Executive Decision
```

The system is an **AI-powered decision-intelligence layer**, not simply another dashboard.

---

# 3. Leonardo's Original Story → Product Requirements

| Leonardo's experience | Business meaning | System capability |
|---|---|---|
| Customer bought special high-value products | Product mix matters | Product / purchase intelligence |
| Customer was growing | Growth is a future-value signal | Growth analysis |
| He accepted a significant short-term loss | Immediate cost isn't the whole picture | Short-term vs. long-term analysis |
| Customer had significant potential | Future value matters | Opportunity / potential analysis |
| He made similar decisions 3–4 times | Pattern recognition can support judgment | Historical/comparable account analysis |
| New executives focus on short-term results | Short-term metrics can dominate decisions | Future-value visibility |
| His experience helped him recognize the opportunity | Knowledge shouldn't exist only in one person's head | Executive decision support |
| Information may be fragmented | Context takes effort to assemble | Account 360 |
| AI could help surface the bigger picture | AI can reduce analysis effort | AI decision-intelligence layer |

---

# 4. Executive Dashboard

## Goal

Answer one question immediately:

> **"What deserves my attention?"**

The dashboard should NOT feel like a wall of charts.

It should prioritize:

1. Important changes
2. Strategic opportunities
3. Risks
4. Customers requiring attention

### Required elements

- [ ] Customer requiring attention
- [ ] Revenue changes
- [ ] Growth changes
- [ ] Margin changes
- [ ] Payment changes
- [ ] Opportunity signals
- [ ] Risk signals
- [ ] Recently changed accounts
- [ ] Morning executive brief

### Example

```text
EXECUTIVE OVERVIEW

Good morning, Leonardo.

3 things worth your attention

┌────────────────────────────────────────────┐
│ 01  Customer A                             │
│     Revenue +24%                           │
│     Expansion opportunity detected         │
│     → View account                         │
├────────────────────────────────────────────┤
│ 02  Customer B                             │
│     Margin declined 9%                     │
│     → Investigate                          │
├────────────────────────────────────────────┤
│ 03  Customer C                             │
│     Orders increasing, payments slowing     │
│     → Review risk                           │
└────────────────────────────────────────────┘
```

---

# 5. Account 360

## Goal

Give an executive the complete customer picture without requiring them to open multiple systems.

### Customer information

- [ ] Customer overview
- [ ] Current revenue
- [ ] Historical revenue
- [ ] Purchase history
- [ ] Product mix
- [ ] High-value products
- [ ] Purchase frequency
- [ ] Average order value
- [ ] Growth trend
- [ ] Profitability
- [ ] Margin
- [ ] Payment history
- [ ] Outstanding balance
- [ ] Payment behaviour
- [ ] Relationship duration
- [ ] Recent account activity
- [ ] Recent changes

### The 60-second test

An executive should be able to answer:

> **"Why does this customer matter?"**

within approximately 60 seconds.

---

# 6. Growth & Future Potential

This is one of the most important parts of the system.

The system should not only answer:

> "How valuable is this customer today?"

It should also help answer:

> **"What could this customer become?"**

### Required capabilities

- [ ] Historical growth
- [ ] Current growth rate
- [ ] Growth trajectory
- [ ] Product expansion
- [ ] Purchasing behaviour
- [ ] Cross-sell opportunities
- [ ] Estimated future value
- [ ] Potential opportunity size
- [ ] Evidence supporting the potential
- [ ] Confidence / uncertainty
- [ ] Assumptions behind estimates

### Important design rule

Do not show a number like:

```text
Potential Value: $2.1M
```

without explaining where it came from.

Instead:

```text
Potential Value
$2.1M

Based on:
• 24% historical growth
• Increasing order frequency
• Higher-value product adoption
• Expansion into 2 additional categories

Assumption:
Current growth trajectory continues.
```

---

# 7. Short-Term vs. Long-Term View

This is the central concept of the product.

The interface should make this relationship visually obvious.

## TODAY

- [ ] Current revenue
- [ ] Current margin
- [ ] Immediate cost
- [ ] Cash impact
- [ ] Payment exposure
- [ ] Short-term loss

## TOMORROW

- [ ] Growth trajectory
- [ ] Future revenue
- [ ] Potential account value
- [ ] Product expansion
- [ ] Strategic opportunity
- [ ] Potential lifetime value

### Example interface

```text
CUSTOMER VALUE

TODAY                         POTENTIAL

$800K                         $2.1M
Current value                 Estimated opportunity

31%                           +24%
Current margin                Growth trajectory


DECISION IMPACT

Immediate cost:              -$120K

Business required to recover:
$387K

Potential account:
$2.1M
```

The interface should help the executive understand:

> **What am I giving up today, and what could I be protecting tomorrow?**

---

# 8. Executive Decision Brief

This should be one of the most important screens.

The system should automatically create a concise executive brief.

## Structure

### Situation

What is happening?

### Evidence

What does the data show?

### Financial impact

What does the decision cost?

### Opportunity

What could the customer become?

### Risk

What could go wrong?

### Unknowns

What don't we know?

### Questions

What should management investigate?

### Example

```text
EXECUTIVE DECISION BRIEF

CUSTOMER A

Situation
Customer has requested extended payment terms,
creating a potential $120K short-term cash impact.

Evidence
• Revenue increased 24%
• Higher-value products represent 63% of purchases
• Customer expanded into two product categories
• Payment history remains strong

Opportunity
Estimated future account value: $2.1M

Risk
$120K immediate cash exposure.

Unknown
Customer's expected purchasing commitment for
the next 12 months is not confirmed.

Questions for management
1. What additional business can realistically be secured?
2. Can payment risk be reduced through revised terms?
3. Can the customer provide a purchasing commitment?
```

---

# 9. Decision Simulator

## Goal

Allow executives to test different scenarios.

The system should answer:

> **"What would have to be true for this decision to make sense?"**

### Inputs

- [ ] Customer value
- [ ] Cost of supporting customer
- [ ] Payment terms
- [ ] Payment delay
- [ ] Additional business
- [ ] Expected growth
- [ ] Time horizon
- [ ] Margin assumptions

### Outputs

- [ ] Immediate financial impact
- [ ] Break-even point
- [ ] Revenue required to recover cost
- [ ] Cash-flow effect
- [ ] Future value
- [ ] Scenario comparison

### Interface

```text
DECISION SIMULATOR

Support customer
$120K

Expected additional business
$400K

Expected growth
24%

Payment extension
6 months

────────────────────────────

Immediate impact
-$120K

Estimated recovery
8 months

Potential account value
$2.1M
```

Allow executives to change assumptions and immediately see how the scenario changes.

---

# 10. Risk Analysis

The system must show both upside and downside.

### Risks

- [ ] Financial risk
- [ ] Payment risk
- [ ] Margin risk
- [ ] Customer concentration
- [ ] Growth uncertainty
- [ ] Dependency risk
- [ ] Data quality risk
- [ ] Missing information

### Important section

## What could make this analysis wrong?

This is an important trust feature.

The system should identify:

- Assumptions
- Missing data
- Weak evidence
- Uncertain forecasts
- Data that needs verification

---

# 11. Ask the Business

The AI interface should allow executives to ask questions using normal language.

### Example questions

```text
Which customers are growing fastest?

Which large customers are becoming less profitable?

Which customers have strong growth but weak current margins?

Which customers are buying more high-value products?

Which customers have increasing payment risk?

Which customers resemble our strongest long-term accounts?

Where are we sacrificing short-term margin
for potential long-term value?
```

### Requirements

- [ ] Natural-language questions
- [ ] Answers based on business data
- [ ] Supporting numbers
- [ ] Evidence/source indicators
- [ ] Ability to drill into customer
- [ ] No unsupported AI conclusions
- [ ] Clear distinction between fact and estimate

---

# 12. Morning Executive Brief

The system should proactively identify important changes.

### Example

```text
GOOD MORNING, LEONARDO

3 things worth reviewing today

01
Customer X
Purchasing volume increased 18%.

Why it matters:
The account is showing accelerating demand.

02
Customer Y
Margin declined 11%.

Why it matters:
Revenue remains strong but profitability
is moving in the wrong direction.

03
Customer Z
Orders increased while payment time
increased from 12 to 31 days.

Why it matters:
Growth is positive, but cash exposure
is increasing.
```

The goal is:

> **Less information. More attention on what matters.**

---

# 13. Evidence & Explainability

Every important AI-generated conclusion should follow:

```text
CLAIM
↓
EVIDENCE
↓
ASSUMPTION
↓
UNCERTAINTY
```

For example:

```text
Potential opportunity: $2.1M

Evidence:
• Revenue growth: 24%
• Product expansion: 2 categories
• Order frequency: +18%

Assumption:
Growth continues at approximately the
current trajectory.

Confidence:
Medium
```

### Checklist

- [ ] Important numbers have evidence
- [ ] AI conclusions show supporting data
- [ ] Estimates are labelled
- [ ] Assumptions are visible
- [ ] Uncertainty is visible
- [ ] Missing information is identified

---

# 14. Decision Record

Consider adding a way to record the final decision.

### Decision

- [ ] Decision made
- [ ] Decision maker
- [ ] Date
- [ ] Reason
- [ ] Assumptions
- [ ] Expected outcome
- [ ] Review date

This creates an important future capability:

> **Decision → Outcome → Learning**

For example:

```text
Decision:
Support customer

Expected:
Customer expands purchasing by $400K

Review:
6 months

Actual:
$520K additional business
```

Over time, this could help the organization understand which decision signals actually correlate with successful outcomes.

---

# 15. Interface & Design Direction

## Overall Design Philosophy

The product should feel like:

**Executive intelligence software**

not:

**AI SaaS dashboard**

and not:

**a generic analytics dashboard.**

It should communicate:

- Calm
- Premium
- Strategic
- Trustworthy
- Data-driven
- Executive-level
- Minimal
- High signal / low noise

---

# 16. Visual Hierarchy

The interface should follow this hierarchy:

```text
WHAT CHANGED?
      ↓
WHY DOES IT MATTER?
      ↓
WHAT IS THE OPPORTUNITY?
      ↓
WHAT IS THE RISK?
      ↓
WHAT SHOULD I INVESTIGATE?
```

Avoid presenting 20 charts and expecting the executive to figure out the story.

The system should **tell the story through the interface.**

---

# 17. Dashboard Layout

Recommended structure:

```text
┌────────────────────────────────────────────────────┐
│ Logo                         Search     Leonardo ▾ │
├────────────────────────────────────────────────────┤
│                                                    │
│ Good morning, Leonardo                             │
│                                                    │
│ 3 things worth your attention                     │
│                                                    │
│ ┌────────────┐ ┌────────────┐ ┌────────────┐      │
│ │ Opportunity│ │ Risk       │ │ Change     │      │
│ │ Customer A │ │ Customer B │ │ Customer C │      │
│ └────────────┘ └────────────┘ └────────────┘      │
│                                                    │
│ Strategic Accounts                                 │
│                                                    │
│ Customer       Revenue   Growth   Margin  Signal  │
│ Customer A     $800K     +24%     31%     ↑       │
│ Customer B     $1.2M     -8%      18%     ↓       │
│ Customer C     $450K     +35%     42%     ★       │
│                                                    │
└────────────────────────────────────────────────────┘
```

---

# 18. Navigation

Keep navigation simple.

Recommended:

```text
Overview
Accounts
Opportunities
Risks
Decision Briefs
Simulator
Ask the Business
Morning Brief
Decisions
```

Avoid excessive navigation.

The executive should be able to reach the important information in one or two clicks.

---

# 19. Account Page Layout

Recommended structure:

```text
CUSTOMER A

$800K Revenue       +24% Growth       31% Margin
────────────────────────────────────────────────

[Overview] [Purchasing] [Profitability] [Risk]
[Opportunity] [Decision Brief]

────────────────────────────────────────────────

EXECUTIVE SUMMARY

Customer is growing rapidly and increasingly
purchasing high-value products.

────────────────────────────────────────────────

TODAY                    POTENTIAL

$800K                    $2.1M
Current value            Estimated opportunity

────────────────────────────────────────────────

WHY THIS MATTERS

• Growth accelerating
• Product mix improving
• Payment history strong
• Expansion opportunity identified

────────────────────────────────────────────────

AI DECISION BRIEF

[View full brief]
```

---

# 20. Design Rules

### DO

- [ ] Use generous whitespace
- [ ] Use strong typography hierarchy
- [ ] Keep charts simple
- [ ] Highlight important numbers
- [ ] Use restrained visual accents
- [ ] Make evidence easy to inspect
- [ ] Use progressive disclosure
- [ ] Make important changes visually obvious
- [ ] Keep the interface calm
- [ ] Make the AI feel like an intelligence layer

### DON'T

- [ ] Don't fill every screen with charts
- [ ] Don't use excessive cards
- [ ] Don't use gradients everywhere
- [ ] Don't make it look like a generic AI dashboard
- [ ] Don't overuse AI sparkle/chatbot visuals
- [ ] Don't show unexplained AI scores
- [ ] Don't use huge amounts of text
- [ ] Don't make the executive hunt for the conclusion
- [ ] Don't make AI appear to be the decision-maker

---

# 21. Typography

The interface should prioritize readability.

Recommended hierarchy:

```text
Page title
Large, confident

Section heading
Clear and compact

Key metric
Large numeric value

Supporting explanation
Small, readable text

Evidence / metadata
Subtle but accessible
```

Avoid excessive font weights.

Use typography to create hierarchy rather than decoration.

---

# 22. Charts

Charts should answer a question.

Good:

```text
Revenue trajectory
───────────────╮
             ╭─╯
          ╭──╯
──────╭───╯
```

Bad:

A complicated chart containing:

- 7 colours
- 5 axes
- 12 labels
- 8 data series

Every chart should answer something like:

> Is the customer growing?

> Is profitability improving?

> Is payment risk increasing?

> Is the customer becoming more valuable?

---

# 23. AI Interaction Design

AI should feel **embedded into the workflow**, not bolted on.

Instead of a giant:

```text
CHAT WITH AI
```

box dominating the screen, use contextual intelligence:

```text
AI INSIGHT

Customer growth has accelerated over
the last 3 quarters.

Why?
Higher-value products now represent
63% of purchases.

[Explore evidence]
```

Then allow:

```text
Ask about this customer...
```

when the executive wants deeper analysis.

---

# 24. Trust Design

Because this system supports financial and strategic decisions, trust is more important than visual novelty.

Use:

- [ ] Data source indicators
- [ ] Last updated timestamp
- [ ] Confidence indicators
- [ ] Assumption labels
- [ ] Evidence links
- [ ] "Why am I seeing this?" explanations
- [ ] Clear distinction between actual data and projections

Example:

```text
$2.1M Potential Value

ESTIMATE

Based on:
Revenue growth
Product expansion
Purchase frequency

Last updated:
Today, 08:30
```

---

# 25. Complete User Journey

The prototype should support this complete journey:

```text
                    CUSTOMER CHANGE
                          ↓
                  SYSTEM DETECTS IT
                          ↓
                  EXECUTIVE ALERT
                          ↓
                     ACCOUNT 360
                          ↓
                  AI DECISION BRIEF
                          ↓
              TODAY ←→ TOMORROW
                          ↓
                  SCENARIO SIMULATOR
                          ↓
                  RISKS + UNKNOWNS
                          ↓
                EXECUTIVE INVESTIGATES
                          ↓
                   HUMAN DECISION
                          ↓
                   DECISION RECORD
                          ↓
                    FUTURE OUTCOME
```

---

# 26. Leonardo Demo Checklist

Before the meeting, verify that the prototype can demonstrate this story:

### Step 1 — Find an important customer

- [ ] Dashboard surfaces the customer
- [ ] Reason for attention is clear

### Step 2 — Understand the customer

- [ ] Account 360
- [ ] Revenue
- [ ] Growth
- [ ] Product mix
- [ ] Profitability
- [ ] Payment history

### Step 3 — Understand future potential

- [ ] Growth trajectory
- [ ] Opportunity
- [ ] Potential value
- [ ] Evidence

### Step 4 — Understand the decision

- [ ] Short-term cost
- [ ] Long-term potential
- [ ] Financial impact
- [ ] Risks

### Step 5 — Explore

- [ ] Decision brief
- [ ] Simulator
- [ ] Ask the Business

### Step 6 — Make the decision

- [ ] System provides evidence
- [ ] Executive retains control
- [ ] Decision can be recorded

---

# 27. The 10-Question Final Test

The prototype is covering the core concept if it can answer:

1. [ ] Why is this customer important?
2. [ ] How valuable are they today?
3. [ ] Are they growing or declining?
4. [ ] What are they buying?
5. [ ] How profitable are they?
6. [ ] What could they become?
7. [ ] What would this decision cost us?
8. [ ] What could we gain or protect?
9. [ ] What could go wrong?
10. [ ] What information are we still missing?

---

# 28. Most Important Product Principle

The system should never communicate:

> **"AI says you should keep this customer."**

It should communicate:

> **"Here is the complete picture. Here is the evidence. Here is the potential. Here is the cost. Here are the risks. Here is what we don't know."**

Then:

> **The executive decides.**

That distinction is fundamental to the product.

---

# 29. What To Validate With Leonardo

The meeting should ultimately discover whether this prototype maps to his real business.

Ask:

### Current process

> "When you have a strategic customer decision like the one you described, how do you actually gather this information today?"

### Data

> "Where does this information live today?"

### Decision makers

> "Who normally has to make this kind of decision?"

### Friction

> "Which part of that process takes the most time?"

### Visibility

> "Is it easy today to see a customer's growth, profitability, purchasing behaviour and potential together?"

### Prototype

> "Looking at this, which parts would actually be useful in your day-to-day decision-making?"

### Missing piece

> "What would you need to see here before you would trust something like this?"

### Real opportunity

> "If this were connected to your actual business data, what decisions would you want it to help with first?"

---

# 30. The Product in One Sentence

> **An AI-powered executive intelligence layer that turns scattered customer data into clear evidence about current value, future potential, financial trade-offs and risk, so executives can make strategic customer decisions with the full picture in front of them.**

---

# Final Prototype Standard

Do not judge the prototype by:

> "Does it have enough features?"

Judge it by:

> **"Can Leonardo understand a strategically important customer, see the short-term trade-off versus long-term opportunity, investigate the evidence, understand the risks, and make a decision without having to manually assemble the story?"**

If the answer is **yes**, the prototype is demonstrating the right product.