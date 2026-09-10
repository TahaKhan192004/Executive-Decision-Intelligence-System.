const { accounts, overview, money, signed, simulate } = Model;
const $ = (s) => document.querySelector(s);
const esc = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const icons = {
  overview: "▦",
  morning: "☷",
  account: "▤",
  brief: "▧",
  radar: "◎",
  scenario: "⌁",
  ask: "✧",
};
const routes = [
  ["overview", "index.html", "Executive overview"],
  ["morning", "morning-brief.html", "Morning brief"],
  ["account", "account.html", "Account 360"],
  ["brief", "decision-brief.html", "Decision briefs"],
  ["radar", "value-radar.html", "Long-term value radar"],
  ["scenario", "scenario-simulator.html", "Scenario simulator"],
  ["ask", "ask-business.html", "Ask the business"],
];
const page = document.body.dataset.page || "overview";
const requestedId = new URLSearchParams(location.search).get("id");
let account = accounts.find((c) => c.id === Number(requestedId || 1));
const invalidAccount = !account;
account ||= accounts[0];
const link = (p, c = account) =>
  `${routes.find((r) => r[0] === p)[1]}?id=${c.id}`;
const badge = (text, type = "") =>
  `<span class="badge ${type || (/risk|declining/.test(text) ? "red" : /required|pressure|watch/.test(text) ? "amber" : "green")}">${esc(text)}</span>`;
const initials = (c) =>
  c.name
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("");
const accountName = (c) =>
  `<a class="account-link" href="${link("account", c)}"><span class="company-avatar a${c.id}">${initials(c)}</span><span><strong>${c.name}</strong><small>${c.industry}</small></span></a>`;
const select = () =>
  `<label class="sr-only" for="accountSelect">Select account</label><select id="accountSelect">${accounts.map((c) => `<option value="${c.id}" ${c.id === account.id ? "selected" : ""}>${c.name}</option>`).join("")}</select>`;
function heading(eyebrow, title, description, actions = "") {
  return `<div class="page-heading"><div><div class="eyebrow">${eyebrow}</div><h1>${title}</h1><p>${description}</p></div><div class="heading-actions">${actions}</div></div>`;
}
function metric(label, value, note, type = "") {
  return `<div class="metric"><div class="metric-label">${label}</div><div class="metric-value ${type}">${value}</div><div class="metric-note">${note}</div></div>`;
}
function panelHead(title, sub = "", action = "") {
  return `<div class="panel-heading"><div><h2>${title}</h2>${sub ? `<p>${sub}</p>` : ""}</div>${action}</div>`;
}
function spark(values, color = "var(--teal)", fill = false) {
  const min = Math.min(...values) * 0.9,
    max = Math.max(...values) * 1.05;
  const points = values
    .map(
      (v, i) =>
        `${(i / (values.length - 1)) * 300},${75 - ((v - min) / (max - min || 1)) * 65}`,
    )
    .join(" ");
  return `<svg class="spark" viewBox="0 0 300 85" preserveAspectRatio="none" role="img" aria-label="Monthly revenue trend">${fill ? `<polygon points="0,85 ${points} 300,85" fill="${color}" opacity=".07"/>` : ""}<polyline points="${points}" stroke="${color}" stroke-width="2.5" vector-effect="non-scaling-stroke" fill="none"/></svg>`;
}
function radar(compact = false) {
  return `<div class="radar-wrap ${compact ? "compact" : ""}"><div class="axis-top">HIGH FUTURE VALUE</div><div class="radar-plot"><span class="quadrant-label q1">INVEST<small>Build tomorrow’s value</small></span><span class="quadrant-label q2">PROTECT<small>Strengthen the relationship</small></span><span class="quadrant-label q3">MONITOR<small>Watch for a change</small></span><span class="quadrant-label q4">HARVEST<small>Maintain current returns</small></span>${accounts.map((c) => `<button class="radar-point ${c.quadrant}" style="left:${8 + c.value * 0.84}%;bottom:${10 + c.future * 0.8}%" data-radar="${c.id}" aria-label="Explain ${c.name}, current value ${c.value.toFixed(0)}, future value ${c.future}"><span></span><b>${c.name.split(" ")[0]}</b></button>`).join("")}</div><div class="axis-bottom"><span>LOW CURRENT VALUE</span><span>HIGH CURRENT VALUE →</span></div></div>`;
}
function sourceDetails() {
  return `<details class="source-details"><summary>Data sources & methodology <span>4 datasets · 2023–2025</span></summary><p>All customer accounts and financial figures are fictional. Revenue and margins are aggregated from 288 synthetic monthly order records. The reporting period is January–December 2025, compared with 2024. Product mix and relationship notes are synthetic account inputs. Opportunities are unweighted and are not contracted revenue.</p><div class="source-links">${["customers", "orders", "opportunities", "relationship_notes"].map((s) => `<a href="data/${s}.csv" download>${s}.csv ↓</a>`).join("")}</div></details>${companyContext()}`;
}
document.body.innerHTML = `<a class="skip-link" href="#main">Skip to content</a><aside class="sidebar"><a class="brand" href="index.html"><span class="system-name">Executive Decision<br>Intelligence System</span></a><div class="workspace"><span class="workspace-mark">C</span><div>Industrial minerals<small>Strategic relationship review</small></div><span class="workspace-chevron">⌄</span></div><div class="nav-label">WORKSPACE</div><nav aria-label="Main navigation">${routes.map(([key, href, label], i) => `${i === 4 ? '<div class="nav-label nav-section">INTELLIGENCE</div>' : ""}<a href="${href}${["account", "brief", "scenario"].includes(key) ? "?id=" + account.id : ""}" class="nav-item ${page === key ? "active" : ""}" ${page === key ? 'aria-current="page"' : ""}><span class="nav-icon" aria-hidden="true">${icons[key]}</span>${label}${key === "morning" ? '<span class="nav-count">5</span>' : ""}</a>`).join("")}</nav><div class="sidebar-bottom"><div class="demo-card"><span class="status-dot"></span> Demonstration workspace<p>Synthetic data. Real possibilities.</p></div><div class="profile"><span class="profile-avatar">L</span><div>Leonardo<small>Advisory-board perspective</small></div></div></div></aside><div class="app-shell"><header class="topbar"><div class="breadcrumb">Workspace <span>/</span> <strong>${routes.find((r) => r[0] === page)[2]}</strong></div><div class="topbar-right"><span class="demo-label">SYNTHETIC DATA</span><span class="snapshot">Snapshot · 31 Dec 2025</span><button class="avatar-button" id="profileInfo" aria-label="About this workspace">L</button></div></header><main id="main" tabindex="-1"></main><footer><span><span class="status-dot"></span> Demonstration using synthetic data</span><span>Evidence informs. Executives decide.</span></footer></div><dialog id="infoDialog"><button class="dialog-close" aria-label="Close dialog">×</button><div class="eyebrow">Executive Decision Intelligence System</div><h2>Built for the longer view.</h2><p>A strategic account intelligence demonstration for Leonardo. All customer accounts, transactions and commercial notes are fictional. Public company context is cited separately; this is an independent demonstration, not a Grupo Curimbaba system.</p><p>The snapshot is fixed at 31 December 2025. Local analysis is available without credentials; live AI requires a server-side model connection.</p><button class="button primary dialog-done">Understood</button></dialog><div id="toast" class="toast" role="status"></div>`;
$("#profileInfo").onclick = () => $("#infoDialog").showModal();
$(".dialog-close").onclick = $(".dialog-done").onclick = () =>
  $("#infoDialog").close();
function toast(message) {
  $("#toast").textContent = message;
  $("#toast").classList.add("show");
  setTimeout(() => $("#toast").classList.remove("show"), 3500);
}
function bindSelect() {
  const el = $("#accountSelect");
  if (el)
    el.onchange = () => {
      location.href = `${routes.find((r) => r[0] === page)[1]}?id=${el.value}${page === "scenario" && new URLSearchParams(location.search).get("mode") === "discount" ? "&mode=discount" : ""}`;
    };
}
function exportCSV(rows, filename) {
  const csv = rows
    .map((row) =>
      row.map((x) => '"' + String(x).replaceAll('"', '""') + '"').join(","),
    )
    .join("\r\n");
  const url = URL.createObjectURL(
    new Blob([csv], { type: "text/csv;charset=utf-8;" }),
  );
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  toast("Export downloaded");
}
function overviewPage() {
  const growth = (overview.revenue / overview.previous - 1) * 100;
  $("#main").innerHTML =
    heading(
      "YOUR PORTFOLIO, IN PERSPECTIVE",
      "The longer view.",
      "Prepared for Leonardo. Connect customer economics, technical judgment and the long-term view.",
      `<button class="button" id="exportPortfolio">↓ Export portfolio</button><a class="button primary" href="morning-brief.html">Read morning brief <span>↗</span></a>`,
    ) +
    `<div class="period-line"><span><span class="status-dot"></span> Portfolio overview <b>8 strategic accounts</b></span><span>FY 2025 <span class="divider">|</span> USD</span></div><section class="metrics" aria-label="Portfolio metrics">${metric("Portfolio revenue", money(overview.revenue), `<span class="positive">↗ ${signed(growth)}%</span> vs. previous year`)}${metric("Gross margin", ((overview.profit / overview.revenue) * 100).toFixed(1) + "%", `${money(overview.profit)} gross profit`)}${metric("Open opportunity pipeline", money(overview.pipeline), "6 opportunities · unweighted")}${metric("Executive attention", String(overview.attention).padStart(2, "0"), '<span class="amber-text">1 commercial decision pending</span>')}</section>` +
    `<div class="overview-grid"><section class="panel attention-panel">${panelHead("A decision worth a closer look", "STRATEGIC ACCOUNT SPOTLIGHT", badge("Decision required"))}<div class="spotlight-account">${accountName(accounts[0])}<span>9-year relationship</span></div><h3>Absorb a loss today.<br>Build a stronger relationship?</h3><p>A specialty-abrasives customer requests a one-time settlement after a claimed process loss. Its high-added-value purchases and growth warrant a closer look.</p><div class="spotlight-stats"><div><small>One-time support request</small><strong class="negative">−$350K</strong></div><div><small>Open opportunity pipeline</small><strong>$3.00M</strong></div><div><small>Revenue growth</small><strong class="positive">+17.0%</strong></div></div><div class="spotlight-bottom"><span>Specialty purchases / growth / cash exposure</span><a href="decision-brief.html?id=1">Open decision brief ↗</a></div></section><section class="panel radar-panel">${panelHead("Long-term value radar", "Where today’s value meets tomorrow’s potential.", '<a class="text-link" href="value-radar.html">Explore ↗</a>')}${radar(true)}<div class="radar-caption"><span class="legend-dot"></span> Select an account to explore the evidence</div></section></div>` +
    `<section class="panel accounts-panel">${panelHead("Strategic accounts", "Performance, potential and the signals that matter.", '<span class="table-count">8 accounts</span>')}<div class="table-toolbar"><div class="tabs" role="group" aria-label="Account filters"><button class="selected" data-filter="all">All accounts <span>8</span></button><button data-filter="attention">Needs attention <span>${overview.attention}</span></button><button data-filter="opportunity">With opportunities</button></div><label class="search-box"><span aria-hidden="true">⌕</span><input type="search" id="accountSearch" placeholder="Search accounts…" aria-label="Search accounts"></label></div><div class="table-scroll"><table class="account-table"><thead><tr><th>Account</th><th><button id="sortRevenue">Revenue ↓</button></th><th>Gross margin</th><th>YoY growth</th><th>Future value</th><th>Attention signal</th><th><span class="sr-only">Open account</span></th></tr></thead><tbody id="accountRows"></tbody></table></div><div class="table-foot"><span id="resultsCount"></span><span>Reporting period: Jan – Dec 2025</span></div></section>${sourceDetails()}`;
  let filter = "all",
    reverse = false,
    sorted = false;
  function rows() {
    let list = accounts.filter(
      (c) =>
        (filter === "all" ||
          (filter === "attention" && c.status !== "On track") ||
          (filter === "opportunity" && c.pipeline > 0)) &&
        `${c.name} ${c.industry}`
          .toLowerCase()
          .includes($("#accountSearch").value.toLowerCase()),
    );
    if (sorted)
      list.sort((a, b) =>
        reverse ? a.revenue - b.revenue : b.revenue - a.revenue,
      );
    $("#accountRows").innerHTML = list.length
      ? list
          .map(
            (c) =>
              `<tr><td>${accountName(c)}</td><td class="numeric">${money(c.revenue)}</td><td>${c.margin.toFixed(1)}%</td><td class="${c.growth >= 0 ? "positive" : "negative"}">${signed(c.growth)}%</td><td><span class="score-line"><span class="score-track"><span style="width:${c.future}%"></span></span>${c.future}<small>/100</small></span></td><td>${badge(c.status)}</td><td><a class="row-arrow" href="${link("account", c)}" aria-label="Open ${c.name}">↗</a></td></tr>`,
          )
          .join("")
      : '<tr><td colspan="7" class="empty">No accounts match. Try a different name or filter.</td></tr>';
    $("#resultsCount").textContent =
      `Showing ${list.length} of ${accounts.length} strategic accounts`;
  }
  rows();
  $("#accountSearch").oninput = rows;
  document.querySelectorAll("[data-filter]").forEach(
    (b) =>
      (b.onclick = () => {
        filter = b.dataset.filter;
        document
          .querySelectorAll("[data-filter]")
          .forEach((x) => x.classList.toggle("selected", x === b));
        rows();
      }),
  );
  $("#sortRevenue").onclick = () => {
    reverse = sorted ? !reverse : false;
    sorted = true;
    $("#sortRevenue").textContent = `Revenue ${reverse ? "↑" : "↓"}`;
    rows();
  };
  $("#exportPortfolio").onclick = () =>
    exportCSV(
      [
        [
          "Account",
          "2025 revenue USD",
          "Gross margin %",
          "YoY growth %",
          "Future score",
          "Attention",
        ],
        ...accounts.map((c) => [
          c.name,
          c.revenue,
          c.margin.toFixed(2),
          c.growth.toFixed(2),
          c.future,
          c.status,
        ]),
      ],
      "executive-decision-intelligence-portfolio-2025.csv",
    );
  document
    .querySelectorAll("[data-radar]")
    .forEach(
      (b) =>
        (b.onclick = () =>
          (location.href = `value-radar.html?id=${b.dataset.radar}`)),
    );
}
function accountPage() {
  const c = account;
  $("#main").innerHTML =
    heading(
      "ACCOUNT INTELLIGENCE",
      c.name,
      `${c.industry} · Account 360 · FY 2025`,
      `${select()}<a class="button primary" href="${link("brief")}">Build decision brief ↗</a>`,
    ) +
    `<div class="account-subnav">${badge(c.status)}<span>Relationship perspective</span><a href="${link("scenario")}">Model relationship support ↗</a></div><section class="metrics">${metric("Annual revenue", money(c.revenue), "2025 · recorded orders")}${metric("Gross margin", c.margin.toFixed(1) + "%", money(c.profit) + " gross profit")}${metric("Revenue growth", signed(c.growth) + "%", "2025 vs. 2024", c.growth >= 0 ? "positive" : "negative")}${metric("Specialty product mix", c.premium + "%", "Explicit specialty-grade classification")}</section>${economicsStrip(c)}<div class="two-col"><section class="panel">${panelHead("Revenue over time", "Monthly synthetic order revenue · 2023–2025")}<div class="revenue-chart">${spark(
      Model.orders.filter((o) => o.customerId === c.id).map((o) => o.revenue),
      "var(--teal)",
      true,
    )}</div><div class="chart-years"><span>2023</span><span>2024</span><span>2025</span></div><div class="annual-values">${[
      2023, 2024, 2025,
    ]
      .map(
        (y) =>
          `<div><small>${y} revenue</small><strong>${money(
            Model.sum(
              Model.orders.filter(
                (o) => o.customerId === c.id && o.date.startsWith(y),
              ),
              (o) => o.revenue,
            ),
          )}</strong></div>`,
      )
      .join(
        "",
      )}</div></section><section class="panel">${panelHead("Product mix", "Share of account purchases · synthetic inputs")}<div class="product-stack">${Object.entries(
      c.products,
    )
      .map(
        ([k, v], i) =>
          `<span style="width:${v}%;background:var(--mix${i})" title="${k}: ${v}%"></span>`,
      )
      .join("")}</div>${Object.entries(c.products)
      .map(
        ([k, v], i) =>
          `<div class="mix-row"><span><i style="background:var(--mix${i})"></i>${k}</span><strong>${v}%</strong></div>`,
      )
      .join(
        "",
      )}<p class="subtle">Specialty classification is explicit in the synthetic account data; product names alone do not prove margin.</p></section></div><div class="two-col"><section class="panel">${panelHead("Commercial opportunities", `${c.opportunities.length} open · ${money(c.pipeline)} unweighted pipeline`)}${c.opportunities.length ? c.opportunities.map((o) => `<div class="opportunity"><div>${badge(o.stage, "neutral")}<h3>${esc(o.desc)}</h3></div><strong>${money(o.value)}</strong></div>`).join("") : '<div class="empty">No open opportunities recorded for this account.</div>'}<p class="subtle">Pipeline indicates potential. Timing and purchase commitments remain unverified.</p></section><section class="panel">${panelHead("Relationship intelligence", "Commercial notes & payment behavior")}${c.notes.map((n) => `<div class="note-row"><span class="note-dot"></span><p>${esc(n)}</p></div>`).join("")}<div class="payment-summary"><span>Current payment assessment</span>${badge(c.payment, c.payment === "Poor" ? "red" : c.payment === "Watch" ? "amber" : "green")}</div></section></div><section class="panel">${panelHead("Recent order ledger", "Latest 6 monthly records · USD", '<a class="text-link" href="data/orders.csv" download>Download full ledger ↓</a>')}<div class="table-scroll"><table><thead><tr><th>Order reference</th><th>Date</th><th>Revenue</th><th>Gross profit</th><th>Payment days</th></tr></thead><tbody>${[
      ...c.current,
    ]
      .reverse()
      .slice(0, 6)
      .map(
        (o) =>
          `<tr><td class="mono">${o.id}</td><td>${o.date}</td><td>${money(o.revenue)}</td><td>${money(o.revenue - o.cost)}</td><td>${o.paymentDays} days</td></tr>`,
      )
      .join("")}</tbody></table></div></section>${sourceDetails()}`;
  bindSelect();
}
let aiAvailable = false;
async function checkAI() {
  try {
    const r = await fetch("/api/status");
    if (r.ok) aiAvailable = (await r.json()).configured;
  } catch {}
  document
    .querySelectorAll("[data-ai-status]")
    .forEach(
      (e) =>
        (e.textContent = aiAvailable
          ? "Connected AI · grounded in portfolio data"
          : "Local analysis · no language model connected"),
    );
}
async function requestAnalysis(type, question) {
  const response = await fetch("/api/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type, accountId: account.id, question }),
  });
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.error || "Analysis is temporarily unavailable.");
  }
  return response.json();
}
function radarPage() {
  $("#main").innerHTML =
    heading(
      "LOOK BEYOND THIS QUARTER",
      "Long-term value radar",
      "An explainable view of current contribution and future potential.",
    ) +
    `<div class="radar-layout"><section class="panel">${panelHead("The portfolio, in perspective", "Select an account to inspect the signals behind its position.")}${radar()}<div class="radar-key">${["invest", "protect", "monitor", "harvest"].map((q) => `<span><i class="key-${q}"></i>${q[0].toUpperCase() + q.slice(1)}</span>`).join("")}</div></section><section class="panel" id="whyPanel" aria-live="polite"></section></div><section class="panel methodology">${panelHead("Transparent by design", "A consistent scoring framework, not an opaque AI verdict.")}<div class="four-col"><div><strong>35%</strong><h3>Revenue growth</h3><p>−5% to +25% YoY maps to a 0–100 signal.</p></div><div><strong>30%</strong><h3>Opportunity pipeline</h3><p>Pipeline worth 50% of annual revenue earns a full signal.</p></div><div><strong>20%</strong><h3>Specialty product mix</h3><p>The share of purchases explicitly classified as specialty grades in the demo.</p></div><div><strong>15%</strong><h3>Payment quality</h3><p>Excellent 100, good 80, watch 55, fair 50, poor 20.</p></div></div><p class="subtle">Current value = annual gross profit ÷ $1.8M, capped at 100. Both axes divide at 50. This illustrative framework omits unverified relationship strength and strategic importance; it is a starting point for discussion.</p></section>${sourceDetails()}`;
  function explain(c) {
    account = c;
    history.replaceState(null, "", `value-radar.html?id=${c.id}`);
    $("#whyPanel").innerHTML =
      `<div class="eyebrow">BEHIND THE POSITION</div><div class="radar-account">${accountName(c)}</div>${badge(c.quadrant[0].toUpperCase() + c.quadrant.slice(1), "neutral")}<div class="radar-scores"><div><small>Current value</small><strong>${c.value.toFixed(0)}<small>/100</small></strong></div><div><small>Future value</small><strong>${c.future}<small>/100</small></strong></div></div><p>${c.name} contributes ${money(c.profit)} in annual gross profit, with ${signed(c.growth)}% revenue growth and ${money(c.pipeline)} in open opportunities.</p><div class="factor-list">${Object.entries(
        c.factors,
      )
        .map(
          ([k, v]) =>
            `<div><span>${{ growth: "Growth", pipeline: "Pipeline", premium: "Premium mix", payment: "Payment quality" }[k]}</span><strong>${v.toFixed(0)}<small> / 100</small></strong></div>`,
        )
        .join(
          "",
        )}</div><a class="button full-width" href="${link("account", c)}">View account evidence ↗</a>`;
    document
      .querySelectorAll("[data-radar]")
      .forEach((b) =>
        b.classList.toggle("chosen", Number(b.dataset.radar) === c.id),
      );
  }
  document
    .querySelectorAll("[data-radar]")
    .forEach(
      (b) =>
        (b.onclick = () =>
          explain(accounts.find((c) => c.id === Number(b.dataset.radar)))),
    );
  explain(account);
}
function concessionPage() {
  $("#main").innerHTML =
    heading(
      "MAKE THE TRADE-OFF VISIBLE",
      "Scenario simulator",
      "Test the short-term cost against the potential long-term return.",
      `${select()}<button class="button" id="exportScenario">↓ Export scenario</button>`,
    ) +
    `<div class="scenario-layout"><section class="panel inputs-panel">${panelHead("Decision assumptions", "Adjust the inputs. See the implications.")}<div class="scenario-account">${accountName(account)}</div>${[
      [
        "discount",
        "Commercial concession",
        0,
        15,
        7,
        "Applied to all year-one purchases.",
      ],
      [
        "expansion",
        "Additional volume by year 3",
        0,
        60,
        35,
        "Ramps evenly across the three years.",
      ],
      [
        "baselineGrowth",
        "Annual baseline growth",
        -10,
        25,
        5,
        "Applied from year two onwards.",
      ],
    ]
      .map(
        ([id, label, min, max, value, note]) =>
          `<div class="slider-control"><div><label for="${id}">${label}</label><output id="${id}Value">${value}%</output></div><input type="range" id="${id}" min="${min}" max="${max}" value="${value}" step="1"><div class="range-limits"><span>${min}%</span><span>${max}%</span></div><p>${note}</p></div>`,
      )
      .join(
        "",
      )}<button class="button full-width" id="resetScenario">Reset assumptions</button><p class="subtle">Illustrative assumptions, not forecasts. Unit costs and product mix remain constant.</p></section><div><section class="panel">${panelHead("Three possible paths", "Cumulative revenue over three years · USD")}<div id="scenarioBars" class="scenario-bars"></div><div class="scenario-callout" id="scenarioCallout" aria-live="polite"></div></section><section class="metrics scenario-metrics" id="scenarioMetrics" aria-live="polite"></section><section class="panel">${panelHead("Year-by-year economics", "Revenue and gross profit, including the concession.")}<div class="table-scroll"><table><thead><tr><th>Period</th><th>Base revenue</th><th>Supported revenue</th><th>Base gross profit</th><th>Supported gross profit</th></tr></thead><tbody id="scenarioRows"></tbody></table></div></section></div></div><details class="source-details"><summary>How this model works</summary><p>Baseline revenue in year y = current annual revenue × (1 + baseline growth)^(y − 1). Supported volume grows above that baseline by one third of the selected expansion each year. The concession reduces all supported revenue in year one only. Unit costs remain at the current cost-to-revenue ratio. Downside assumes volume 10% below baseline in every year and the same first-year concession. There are no probabilities, taxes, financing costs or capacity constraints in this model.</p><p>First-year break-even uplift = discount ÷ (gross margin − discount). If the concession equals or exceeds margin, additional volume cannot restore gross profit under these assumptions.</p></details>${sourceDetails()}`;
  bindSelect();
  let result;
  function render() {
    const d = Number($("#discount").value),
      e = Number($("#expansion").value),
      g = Number($("#baselineGrowth").value);
    result = simulate(account, d, e, g);
    for (const id of ["discount", "expansion", "baselineGrowth"])
      $("#" + id + "Value").textContent = $("#" + id).value + "%";
    const max = Math.max(result.baseline, result.supported, result.downside);
    $("#scenarioBars").innerHTML = [
      ["Baseline", result.baseline, "base", "Current trajectory"],
      [
        "Supported expansion",
        result.supported,
        "supported",
        "Concession + volume uplift",
      ],
      ["Downside", result.downside, "downside", "10% below baseline volume"],
    ]
      .map(
        ([name, v, cls, sub]) =>
          `<div class="scenario-bar-row"><div><strong>${name}</strong><small>${sub}</small></div><div class="scenario-bar-track"><div class="scenario-bar ${cls}" style="width:${(v / max) * 100}%"></div></div><b>${money(v)}</b></div>`,
      )
      .join("");
    $("#scenarioCallout").innerHTML =
      `<strong class="${result.profitDelta >= 0 ? "positive" : "negative"}">${result.profitDelta >= 0 ? "+" : ""}${money(result.profitDelta)}</strong><span>three-year gross profit ${result.profitDelta >= 0 ? "upside" : "reduction"} versus baseline, if the assumed expansion is realized.</span>`;
    $("#scenarioMetrics").innerHTML =
      metric(
        "Year-one concession cost",
        "−" + money(result.cost),
        "Includes assumed additional volume",
        "negative",
      ) +
      metric(
        "Break-even volume uplift",
        result.breakEven === null
          ? "Not achievable"
          : result.breakEven.toFixed(1) + "%",
        "Within the concession year",
      ) +
      metric(
        "Year-one net revenue",
        money(result.years[0].supportedRevenue),
        "Supported scenario, after concession",
      );
    $("#scenarioRows").innerHTML = result.years
      .map(
        (y) =>
          `<tr><td>Year ${y.year}</td><td>${money(y.baseRevenue)}</td><td>${money(y.supportedRevenue)}</td><td>${money(y.baseProfit)}</td><td>${money(y.supportedProfit)}</td></tr>`,
      )
      .join("");
  }
  ["discount", "expansion", "baselineGrowth"].forEach(
    (id) => ($("#" + id).oninput = render),
  );
  $("#resetScenario").onclick = () => {
    $("#discount").value = 7;
    $("#expansion").value = 35;
    $("#baselineGrowth").value = 5;
    render();
    toast("Default assumptions restored");
  };
  $("#exportScenario").onclick = () =>
    exportCSV(
      [
        ["Account", account.name],
        ["Discount %", $("#discount").value],
        ["Expansion %", $("#expansion").value],
        ["Baseline growth %", $("#baselineGrowth").value],
        [
          "Year",
          "Baseline revenue",
          "Supported revenue",
          "Baseline gross profit",
          "Supported gross profit",
          "Downside revenue",
          "Downside gross profit",
        ],
        ...result.years.map((y) => [
          y.year,
          y.baseRevenue,
          y.supportedRevenue,
          y.baseProfit,
          y.supportedProfit,
          y.downsideRevenue,
          y.downsideProfit,
        ]),
      ],
      "executive-decision-intelligence-scenario.csv",
    );
  render();
}
const questions = [
  "Which customers are growing fastest?",
  "Which relationships could justify absorbing a short-term loss?",
  "Which accounts have margin pressure?",
  "Which customers buy the highest-value products?",
];
function askPage() {
  $("#main").innerHTML =
    heading(
      "A CONVERSATION WITH YOUR PORTFOLIO",
      "Ask the business",
      "Go from a business question to the evidence behind it.",
    ) +
    `<div class="ask-layout"><section class="panel ask-main"><div class="ask-intro"><span class="ask-symbol">✧</span><h2>What deserves a closer look?</h2><p>Explore performance, commercial trade-offs and the relationships worth investing in.</p></div><div class="suggestions">${questions.map((q, i) => `<button data-question="${i}">${q}<span>↗</span></button>`).join("")}</div><form id="askForm"><label class="sr-only" for="askInput">Your business question</label><div class="ask-composer"><textarea id="askInput" rows="2" maxlength="2000" required placeholder="Ask a question about your strategic accounts…"></textarea><button class="button primary" id="askSubmit" type="submit">Ask <span>↑</span></button></div><div class="composer-note"><span data-ai-status>Local analysis · no language model connected</span><span>Enter to ask · Shift + Enter for a new line</span></div></form><section id="answerPanel" class="answer-panel" hidden aria-live="polite"></section></section><aside><section class="panel">${panelHead("Grounded in your records", "Every perspective starts with evidence.")}<div class="data-source"><span>▤</span><div><strong>Account portfolio</strong><small>8 strategic relationships</small></div></div><div class="data-source"><span>▤</span><div><strong>Order history</strong><small>288 records · 3 years</small></div></div><div class="data-source"><span>▤</span><div><strong>Commercial pipeline</strong><small>6 open opportunities</small></div></div><div class="data-source"><span>▤</span><div><strong>Relationship notes</strong><small>16 commercial observations</small></div></div></section><p class="aside-note">Ask for a perspective, then inspect the underlying account. Assumptions and uncertainty belong in the conversation.</p></aside></div>${sourceDetails()}`;
  async function ask(q) {
    if (!q.trim()) return;
    $("#askInput").value = q;
    $("#askSubmit").disabled = true;
    $("#answerPanel").hidden = false;
    $("#answerPanel").innerHTML =
      '<p class="loading" role="status">Reviewing the portfolio evidence…</p>';
    try {
      await checkAI();
      const local = Model.answer(q);
      const result = aiAvailable ? await requestAnalysis("question", q) : local;
      $("#answerPanel").innerHTML =
        `<div class="eyebrow">${aiAvailable ? "AI-GENERATED ANALYSIS" : "COMPUTED PORTFOLIO ANALYSIS"}</div><h2>${esc(q)}</h2><div class="prose">${result.text
          .split("\n\n")
          .map((p) => `<p>${esc(p)}</p>`)
          .join(
            "",
          )}</div>${!aiAvailable && local.accounts.length ? `<div class="table-scroll"><table><thead><tr><th>Source account</th><th>Revenue</th><th>Growth</th><th>Margin</th><th>Premium</th><th>Future value</th></tr></thead><tbody>${local.accounts.map((c) => `<tr><td><a class="text-link" href="${link("account", c)}">${c.name} ↗</a></td><td>${money(c.revenue)}</td><td>${signed(c.growth)}%</td><td>${c.margin.toFixed(1)}%</td><td>${c.premium}%</td><td>${c.future}/100</td></tr>`).join("")}</tbody></table></div>` : ""}<div class="answer-source">Sources: 2025 & 2024 order ledger · account product mix · opportunities · relationship notes</div>`;
    } catch (e) {
      $("#answerPanel").innerHTML =
        `<p class="negative">${esc(e.message)}</p><p>Your question is preserved. Try again in a moment.</p>`;
    } finally {
      $("#askSubmit").disabled = false;
    }
  }
  $("#askForm").onsubmit = (e) => {
    e.preventDefault();
    ask($("#askInput").value);
  };
  $("#askInput").onkeydown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      ask($("#askInput").value);
    }
  };
  document
    .querySelectorAll("[data-question]")
    .forEach(
      (b) => (b.onclick = () => ask(questions[Number(b.dataset.question)])),
    );
  checkAI();
}
function morningPage() {
  const developments = [
    {
      id: 1,
      type: "Decision required",
      title: "A claimed loss. A relationship worth examining.",
      body: "Atlas requests $350K of one-time support after a claimed process loss. Its purchases are entirely specialty grades, revenue is up 17%, and $3M of opportunities remain uncommitted.",
      next: "Review technical evidence, cash installments and minimum commitments together.",
      source: "Commercial pipeline & relationship notes",
      route: "brief",
    },
    {
      id: 2,
      type: "Margin pressure",
      title: "More revenue. Less margin.",
      body: "Nova’s revenue grew 11.0%, while gross margin fell 5.3 percentage points to 18.0%. The growth is not translating proportionately into profit.",
      next: "Understand pricing and cost movements before the next renewal.",
      source: "2024 & 2025 order ledger",
      route: "account",
    },
    {
      id: 5,
      type: "Payment watch",
      title: "Growth is putting working capital in focus.",
      body: "Terra grew 22.0% year over year. Payment terms extended from 45 to 73 days in the relationship notes, with the latest ledger records at 73 days.",
      next: "Validate cash exposure and the reason for extended terms.",
      source: "Relationship notes & recent order records",
      route: "account",
    },
    {
      id: 4,
      type: "Opportunity",
      title: "The product mix is moving upmarket.",
      body: "Omega's specialty nutrition share is 40%, with a $700K distribution opportunity. Commercial notes report rising demand ahead of the next crop cycle.",
      next: "Validate distributor sell-through and seasonal demand before extending credit.",
      source: "Product mix & commercial notes; historical mix not available",
      route: "account",
    },
    {
      id: 3,
      type: "Monitor",
      title: "A strong account, with a softer demand signal.",
      body: "Beta still contributes a 34.0% margin, but relationship notes flag four consecutive months of declining order frequency.",
      next: "Validate the frequency signal with transaction-level records; the monthly demo ledger cannot establish it.",
      source: "Relationship notes; frequency signal is qualitative",
      route: "account",
    },
  ];
  let read = [];
  try {
    read = JSON.parse(localStorage.getItem("meridian-reviewed") || "[]");
    if (!Array.isArray(read)) read = [];
  } catch {}
  $("#main").innerHTML =
    heading(
      "YOUR EXECUTIVE READING ROOM",
      "Good morning, Leonardo.",
      "Five developments worth your attention. Start with what could change a decision.",
      `<span class="brief-date">Portfolio snapshot<br><strong>31 December 2025</strong></span>`,
    ) +
    `<div class="morning-summary"><span><strong>05</strong> developments</span><span><strong>01</strong> pending decision</span><span><strong id="reviewedCount">${read.length.toString().padStart(2, "0")}</strong> reviewed by you</span><span class="reading-time">A 3-minute perspective</span></div><div class="morning-layout"><section class="morning-feed">${developments
      .map(
        (d, i) =>
          `<article class="panel development" id="development-${d.id}"><div class="development-number">0${i + 1}</div><div class="development-content"><div class="development-top"><a class="text-link" href="account.html?id=${d.id}">${accounts.find((c) => c.id === d.id).name}</a>${badge(d.type, d.type === "Opportunity" ? "green" : d.type === "Monitor" ? "neutral" : "amber")}</div><h2>${d.title}</h2><p>${d.body}</p><div class="next-step"><strong>Next consideration</strong><span>${d.next}</span></div><small class="source-note">Source: ${d.source}</small><div class="development-actions"><a class="text-link" href="${link(
            d.route,
            accounts.find((c) => c.id === d.id),
          )}">${d.route === "brief" ? "Open decision brief" : "Explore account"} ↗</a><button class="review-button ${read.includes(d.id) ? "reviewed" : ""}" data-review="${d.id}" aria-pressed="${read.includes(d.id)}">${read.includes(d.id) ? "✓ Reviewed" : "Mark reviewed"}</button></div></div></article>`,
      )
      .join(
        "",
      )}</section><aside class="panel morning-aside"><div class="eyebrow">THE LONGER VIEW</div><h2>Today’s exception.<br>Tomorrow’s advantage.</h2><p>Look for relationships where short-term performance tells only part of the story.</p><a href="value-radar.html" class="button full-width">Explore value radar ↗</a><div class="aside-rule"></div><h3>Your review stays here</h3><p>Review marks are saved in this browser. They do not approve a commercial decision or notify anyone.</p></aside></div>${sourceDetails()}`;
  document.querySelectorAll("[data-review]").forEach(
    (b) =>
      (b.onclick = () => {
        const id = Number(b.dataset.review);
        read = read.includes(id) ? read.filter((x) => x !== id) : [...read, id];
        try {
          localStorage.setItem("meridian-reviewed", JSON.stringify(read));
        } catch {
          toast("Browser storage unavailable; marks last for this visit.");
        }
        b.classList.toggle("reviewed", read.includes(id));
        b.textContent = read.includes(id) ? "✓ Reviewed" : "Mark reviewed";
        b.setAttribute("aria-pressed", read.includes(id));
        $("#reviewedCount").textContent = String(read.length).padStart(2, "0");
      }),
  );
}
({
  overview: overviewPage,
  account: accountPage,
  brief: briefPage,
  radar: radarPage,
  scenario: scenarioPage,
  ask: askPage,
  morning: morningPage,
})[page]();
if (invalidAccount && requestedId) {
  const message = document.createElement("p");
  message.className = "invalid-notice";
  message.textContent =
    "That account was not found. Showing Atlas Precision Abrasives instead.";
  $("#main").prepend(message);
}
