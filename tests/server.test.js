const { test, before, after } = require("node:test");
const assert = require("node:assert/strict");
const { server } = require("../server.js");
let base;
before(async () => {
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  base = `http://127.0.0.1:${server.address().port}`;
});
after(() => new Promise((r) => server.close(r)));
test("all seven screens and source datasets are served", async () => {
  for (const file of [
    "index.html",
    "account.html",
    "decision-brief.html",
    "value-radar.html",
    "scenario-simulator.html",
    "ask-business.html",
    "morning-brief.html",
    "data/customers.csv",
    "data/orders.csv",
    "data/opportunities.csv",
    "data/relationship_notes.csv",
  ])
    assert.equal((await fetch(`${base}/${file}`)).status, 200, file);
});
test("server does not expose credentials or source configuration", async () => {
  for (const file of [
    ".env",
    ".env.example",
    "server.js",
    "package.json",
    "docs/LEONARDO-BRIEFING.md",
  ])
    assert.equal((await fetch(`${base}/${file}`)).status, 404);
});
test("analysis validates requests and rejects cross-origin requests", async () => {
  assert.equal(
    (
      await fetch(`${base}/api/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: '{"type":"invalid"}',
      })
    ).status,
    400,
  );
  assert.equal(
    (
      await fetch(`${base}/api/analyze`, {
        method: "POST",
        headers: { Origin: "https://example.invalid" },
        body: "{}",
      })
    ).status,
    403,
  );
  const status = await (await fetch(`${base}/api/status`)).json();
  assert.equal(typeof status.configured, "boolean");
  if (!status.configured) {
    const res = await fetch(`${base}/api/analyze`, {
      method: "POST",
      body: JSON.stringify({ type: "brief", accountId: 1 }),
    });
    const result = await res.json();
    assert.equal(result.mode, "local");
    assert.match(result.text, /Atlas Precision Abrasives/);
  }
});
