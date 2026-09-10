const { test } = require("node:test");
const assert = require("node:assert/strict");
const m = require("../model.js");
test("three years of records reconcile with annual portfolio totals", () => {
  assert.equal(m.orders.length, 288);
  assert.equal(m.overview.revenue, 30400000);
  for (const c of m.accounts) {
    assert.equal(c.current.length, 12);
    assert.ok(
      Math.abs(
        c.growth -
          { 1: 17, 2: 11, 3: 2, 4: 14, 5: 22, 6: -3, 7: 1, 8: -5 }[c.id],
      ) < 0.001,
    );
    assert.ok(
      Math.abs(
        c.margin -
          { 1: 29, 2: 18, 3: 34, 4: 22, 5: 31, 6: 26, 7: 19, 8: 15 }[c.id],
      ) < 0.001,
    );
  }
});
test("premium classification excludes standard components even when dominant", () => {
  assert.equal(m.accounts.find((c) => c.id === 8).premium, 0);
  assert.equal(m.accounts.find((c) => c.id === 3).premium, 70);
  assert.equal(m.accounts.find((c) => c.id === 5).payment, "Watch");
});
test("scenario economics include discount and gross profit", () => {
  const c = m.accounts[0],
    s = m.simulate(c, 7, 35, 5);
  assert.ok(Math.abs(s.existingCost - 329000) < 0.01);
  assert.ok(Math.abs(s.breakEven - 31.81818) < 0.001);
  assert.equal(
    s.supported,
    m.sum(s.years, (y) => y.supportedRevenue),
  );
  assert.ok(s.years[0].supportedProfit < s.years[0].baseProfit);
  const same = m.simulate(c, 0, 0, 0);
  assert.equal(same.profitDelta, 0);
  assert.equal(same.supported, c.revenue * 3);
  const impossible = m.simulate(m.accounts[7], 15, 35, 5);
  assert.equal(impossible.breakEven, null);
});
test("higher concessions lower supported revenue and profit; additional volume increases returns", () => {
  for (const c of m.accounts) {
    const a = m.simulate(c, 0, 35, 5),
      b = m.simulate(c, 10, 35, 5);
    assert.ok(a.supported > b.supported);
    assert.ok(a.profitDelta > b.profitDelta);
    assert.ok(
      m.simulate(c, 7, 50, 5).supported > m.simulate(c, 7, 0, 5).supported,
    );
  }
});
test("radar classification agrees with visible axis thresholds", () => {
  for (const c of m.accounts) {
    assert.ok(c.future >= 0 && c.future <= 100);
    assert.equal(
      c.quadrant,
      c.future >= 50
        ? c.value >= 50
          ? "protect"
          : "invest"
        : c.value >= 50
          ? "harvest"
          : "monitor",
    );
  }
});
test("questions rank computed records and refuse unsupported topics", () => {
  assert.equal(
    m.answer("Which customers are growing fastest?").accounts[0].name,
    "Terra Foundry",
  );
  assert.equal(
    m.answer("highest-value products").accounts[0].name,
    "Atlas Precision Abrasives",
  );
  assert.equal(
    m.answer("What will copper prices be next year?").metric,
    "Unsupported question",
  );
  assert.match(m.brief(m.accounts[0]), /350K/);
});
test("support installments change cash timing, not total economics", () => {
  const c = m.accounts[0],
    a = m.support(c, 350000, 12),
    b = m.support(c, 350000, 24);
  assert.equal(a.supported, b.supported);
  assert.ok(Math.abs(m.sum(b.years, (y) => y.cashPaid) - 350000) < 0.01);
  assert.equal(b.yearOneCash, 175000);
  assert.equal(b.years[1].cashPaid, 175000);
  assert.equal(b.years[2].cashPaid, 0);
  assert.ok(Math.abs(a.recoveryRevenue - 350000 / (c.margin / 100)) < 0.01);
  assert.ok(Math.abs(a.recoveryTonnes - 603.448275862) < 0.01);
});
test("support model exposes failed recovery and does not create revenue from a payment", () => {
  assert.equal(
    m.answer("Which accounts have the highest gross profit per tonne?").metric,
    "Unit economics & cash exposure",
  );
  const c = m.accounts[0],
    a = m.support(c, 350000, 12, 0, 0, 0);
  assert.equal(a.profitDelta, -350000);
  assert.equal(a.supported, a.downside);
  assert.equal(m.support(c, 0, 12, 0, 0, 0).profitDelta, 0);
  assert.equal(m.support(c, 350000, 12, 20, 5, 100).downside, -350000);
  assert.equal(m.accounts[0].premium, 100);
  assert.match(
    m.answer("Does Atlas meet ESG requirements?").text,
    /no account-level/,
  );
  assert.match(
    m.answer("Terra working capital").text,
    /additional receivables/,
  );
});
