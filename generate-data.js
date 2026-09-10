const fs = require("node:fs");
const m = require("./model.js");
const write = (name, rows) =>
  fs.writeFileSync(
    `data/${name}.csv`,
    rows
      .map((row) =>
        row.map((v) => '"' + String(v).replaceAll('"', '""') + '"').join(","),
      )
      .join("\r\n"),
  );
write("customers", [
  [
    "id",
    "name",
    "industry",
    "revenue_2025_usd",
    "gross_margin_pct",
    "growth_pct",
    "premium_share_pct",
    "payment_assessment",
    "market_region",
    "annual_tonnes_synthetic",
    "relationship_years_synthetic",
    "specialty_products",
  ],
  ...m.accounts.map((c) => [
    c.id,
    c.name,
    c.industry,
    c.revenue,
    c.margin.toFixed(2),
    c.growth.toFixed(2),
    c.premium,
    c.payment,
    c.region,
    c.tonnes,
    c.relationshipYears,
    c.specialtyProducts.join("; "),
  ]),
]);
write("orders", [
  ["id", "customer_id", "date", "revenue_usd", "cost_usd", "payment_days"],
  ...m.orders.map((o) => [
    o.id,
    o.customerId,
    o.date,
    o.revenue,
    o.cost,
    o.paymentDays,
  ]),
]);
write("opportunities", [
  ["id", "customer_id", "description", "value_usd", "stage"],
  ...m.accounts.flatMap((c) =>
    c.opportunities.map((o, i) => [
      `OPP-${c.id}-${i + 1}`,
      c.id,
      o.desc,
      o.value,
      o.stage,
    ]),
  ),
]);
write("relationship_notes", [
  ["id", "customer_id", "note"],
  ...m.accounts.flatMap((c) =>
    c.notes.map((n, i) => [`NOTE-${c.id}-${i + 1}`, c.id, n]),
  ),
]);
