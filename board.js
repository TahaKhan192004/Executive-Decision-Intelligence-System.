/* Public context is separate from synthetic records and private meeting preparation. */
function companyContext() {
  return `<details class="source-details company-context"><summary>Why this demonstration fits industrial minerals <span>Public context · researched 11 Sep 2026</span></summary><div class="context-grid"><div><h3>Products with application value</h3><p>The group serves abrasives, refractories, foundry, oil and gas, agriculture and other industrial markets. USEM lists fused aluminas, silicon carbides and bauxites. The fictional accounts use those product families.</p><a href="https://www.usminerals.com/" target="_blank" rel="noopener noreferrer">USEM product portfolio ↗</a></div><div><h3>Capital discipline over time</h3><p>The group’s published values include sustainable long-term results and growth with low financial leverage. This demo therefore exposes cash commitments alongside commercial upside.</p><a href="https://www.grupocurimbaba.com.br/pt/pdf/codigoConduta" target="_blank" rel="noopener noreferrer">Grupo Curimbaba code of conduct · p. 1 ↗</a></div><div><h3>A diversified business context</h3><p>Yoorin’s official portfolio includes thermophosphate, potassic and foliar fertilizers. The agriculture account represents a fictional distributor, not a group company or a known customer.</p><a href="https://www.yoorin.com.br/en/sobrenos" target="_blank" rel="noopener noreferrer">Yoorin official company profile ↗</a></div></div><p>Independent demonstration. Public company facts inform the setting; all customer identities, product allocations, financials and operational scenarios are synthetic. USD is a common illustrative reporting currency, not an actual group currency conversion.</p></details>`;
}
function economicsStrip(c) {
  return `<section class="economics-strip" aria-label="Industrial account economics"><div><small>Customer market</small><strong>${esc(c.region)}</strong></div><div><small>Synthetic annual volume</small><strong>${c.tonnes.toLocaleString()} t</strong></div><div><small>Gross profit / tonne</small><strong>${money(c.profit / c.tonnes)}</strong></div><div><small>Relationship history</small><strong>${c.relationshipYears} years</strong></div><p>Unit economics use an illustrative annual tonnage input. Gross profit excludes overhead and is not EBITDA.</p></section>`;
}
function reviewPanel(c) {
  return `<section class="panel review-panel">${panelHead("The executive’s judgment", "Capture the conditions under which this relationship merits support.")}<div class="review-grid"><div><label for="decisionView">Current perspective</label><select id="decisionView"><option>Evidence gathering</option><option>Consider conditional support</option><option>Defer pending evidence</option><option>Do not support on current evidence</option></select><label for="decisionNotes">Reasoning & conditions</label><textarea id="decisionNotes" rows="4" maxlength="3000" placeholder="What do you know about this customer that the numbers do not show?"></textarea><button class="button primary" id="saveReview">Save review notes</button><span id="reviewSaveStatus" role="status"></span></div><div class="evidence-gaps"><h3>Evidence still needed</h3><p><strong>Application specialist</strong> Review the technical claim and qualification requirements.</p><p><strong>Finance</strong> Validate cash headroom and a maximum support commitment.</p><p><strong>Commercial lead</strong> Confirm demand, milestones and the decision owner.</p><p><strong>Operations & ESG</strong> Verify capacity, delivery, safety and environmental requirements. No account-level ESG evidence is included.</p></div></div><p class="subtle">Saved only in this browser for this fictional account. A review note is not an approval, a workflow assignment or a message to anyone.</p></section>`;
}
function bindReview(c) {
  const key = `meridian-decision-review-${c.id}`;
  try {
    const draft = JSON.parse(localStorage.getItem(key) || "null");
    if (draft) {
      if ([...$("#decisionView").options].some((o) => o.value === draft.view))
        $("#decisionView").value = draft.view;
      $("#decisionNotes").value =
        typeof draft.notes === "string" ? draft.notes : "";
    }
  } catch {}
  $("#saveReview").onclick = () => {
    try {
      localStorage.setItem(
        key,
        JSON.stringify({
          view: $("#decisionView").value,
          notes: $("#decisionNotes").value,
        }),
      );
      $("#reviewSaveStatus").textContent = "Saved in this browser";
    } catch {
      $("#reviewSaveStatus").textContent =
        "Browser storage unavailable. Copy your notes before leaving.";
    }
  };
}
function briefPage() {
  const c = account,
    s = Model.support(c);
  $("#main").innerHTML =
    heading(
      "STRATEGIC RELATIONSHIP · DECISION BRIEF",
      "A loss today. Value over time?",
      `${c.name} · Advisory perspective for executive discussion`,
      `${select()}<button class="button" id="printBrief">↓ Print / save PDF</button>`,
    ) +
    `<section class="decision-banner"><div><div class="eyebrow">${c.id === 1 ? "COMMERCIAL SUPPORT REQUEST" : "ILLUSTRATIVE SUPPORT SCENARIO"}</div><h2>${c.id === 1 ? "Should we absorb a claimed loss to support this relationship?" : "What evidence would justify exceptional support?"}</h2><p>${c.id === 1 ? "A fictional specialty-abrasives customer requests $350K, payable over 12 months. The synthetic technical review reports material within specification; the cause of the claimed process loss remains unresolved." : "No support request is recorded for this account. The $350K case below is a what-if analysis only."}</p></div>${badge("Evidence gathering", "amber")}</section><div class="decision-signals"><div><strong>${c.premium}%</strong><span>specialty-grade purchases</span></div><div><strong>${signed(c.growth)}%</strong><span>annual revenue growth</span></div><div><strong>${money(c.pipeline)}</strong><span>uncommitted opportunity pipeline</span></div></div><section class="metrics">${metric("One-time commitment", money(s.amount), "Fictional support amount", "negative")}${metric("Monthly cash payments", money(s.monthlyCash), "12 equal installments")}${metric("Incremental sales to recover", money(s.recoveryRevenue), "At current gross margin and mix")}${metric("Current gross profit / tonne", money(c.profit / c.tonnes), "Illustrative volume · not EBITDA")}</section><div class="brief-layout"><section class="panel assessment-panel">${panelHead("Executive assessment", "Bring the evidence together. Preserve the judgment.", '<span class="assessment-symbol">✧</span>')}<div class="analysis-mode" data-ai-status>Local analysis · no language model connected</div><div id="briefText" class="prose">${Model.brief(
      c,
    )
      .split("\n\n")
      .map((p) => `<p>${esc(p)}</p>`)
      .join(
        "",
      )}</div><div class="analysis-actions"><button class="button primary" id="generateBrief">↻ Generate assessment</button><span id="briefStatus" role="status">Computed from the current account records</span></div></section><aside class="brief-side"><section class="panel">${panelHead("What is known — and what is not", "Keep assumptions visible")}<ol class="checklist"><li><strong>Recorded in the demo</strong><span>Orders, product classification, historic margin and commercial notes.</span></li><li><strong>Unverified</strong><span>Expansion timing, future demand, claim causation and purchase commitments.</span></li><li><strong>Executive judgment</strong><span>Trust, strategic importance, precedent and willingness to accept a near-term loss.</span></li></ol></section><section class="panel soft-panel"><div class="eyebrow">TEST THE DOWNSIDE</div><h3>What if support does not lead to growth?</h3><p>Change the commitment, installments and volume assumptions. See what remains at risk.</p><a class="text-link" href="${link("scenario")}">Open relationship-support model ↗</a></section></aside></div>${reviewPanel(c)}${sourceDetails()}`;
  bindSelect();
  bindReview(c);
  $("#printBrief").onclick = () => window.print();
  $("#generateBrief").onclick = async () => {
    const b = $("#generateBrief");
    b.disabled = true;
    $("#briefStatus").textContent = "Reviewing the account evidence…";
    try {
      await checkAI();
      const result = aiAvailable
        ? await requestAnalysis("brief")
        : { text: Model.brief(c) };
      $("#briefText").innerHTML = result.text
        .split("\n\n")
        .map((p) => `<p>${esc(p)}</p>`)
        .join("");
      $("#briefStatus").textContent = aiAvailable
        ? "AI assessment generated · validate against sources"
        : "Assessment refreshed from synthetic source records";
    } catch (e) {
      $("#briefStatus").textContent = e.message;
    } finally {
      b.disabled = false;
    }
  };
  checkAI();
}
function scenarioPage() {
  if (new URLSearchParams(location.search).get("mode") === "discount") {
    concessionPage();
    $("#main").insertAdjacentHTML(
      "afterbegin",
      `<div class="scenario-mode"><a href="scenario-simulator.html?id=${account.id}">One-time relationship support</a><span aria-current="page">Temporary price concession</span></div>`,
    );
    return;
  }
  const controls = [
    [
      "supportAmount",
      "One-time support amount",
      0,
      1000000,
      350000,
      25000,
      "USD",
      "Full economic charge in year one.",
    ],
    [
      "installments",
      "Payment installments",
      1,
      24,
      12,
      1,
      "months",
      "Equal monthly payments, starting immediately.",
    ],
    [
      "supportExpansion",
      "Additional volume by year 3",
      0,
      60,
      20,
      5,
      "%",
      "A hypothesis, not a probability or a commitment.",
    ],
    [
      "supportGrowth",
      "Annual baseline growth",
      -10,
      25,
      5,
      1,
      "%",
      "Applied from year two onwards.",
    ],
    [
      "downsideDrop",
      "Volume decline after support",
      0,
      100,
      30,
      5,
      "%",
      "Downside volume below baseline in all three years.",
    ],
  ];
  $("#main").innerHTML =
    heading(
      "RELATIONSHIP SUPPORT · CAPITAL AT RISK",
      "What would make the loss worth taking?",
      "Compare a one-time commitment with customer growth, cash timing and a failed recovery.",
      `${select()}<button class="button" id="exportSupport">↓ Export scenario</button>`,
    ) +
    `<div class="scenario-mode"><span aria-current="page">One-time relationship support</span><a href="scenario-simulator.html?id=${account.id}&mode=discount">Temporary price concession</a></div><div class="scenario-layout"><section class="panel inputs-panel support-inputs">${panelHead("A decision, with conditions", "All inputs below are illustrative.")}<div class="scenario-account">${accountName(account)}</div>${controls.map(([id, label, min, max, value, step, unit, note]) => `<div class="slider-control"><div><label for="${id}">${label}</label><output id="${id}Value"></output></div><input type="range" id="${id}" min="${min}" max="${max}" value="${value}" step="${step}"><p>${note}</p></div>`).join("")}<button class="button full-width" id="resetSupport">Reset assumptions</button></section><div><section class="panel">${panelHead("Does the longer view justify the commitment?", "Three-year gross profit less one-time support · USD")}<div class="scenario-bars" id="supportBars"></div><div class="scenario-callout" id="supportCallout" aria-live="polite"></div><p class="subtle">The baseline assumes the relationship continues without support. Support does not guarantee retention or expansion. Compare hypotheses without treating them as causal evidence.</p></section><section class="metrics scenario-metrics" id="supportMetrics" aria-live="polite"></section><section class="panel">${panelHead("Economics and cash are different", "The support charge is recognized once; installments change payment timing.")}<div class="table-scroll"><table><thead><tr><th>Period</th><th>Baseline gross profit</th><th>Supported GP less support</th><th>Downside GP less support</th><th>Support cash paid</th></tr></thead><tbody id="supportRows"></tbody></table></div><p class="subtle">Gross profit less support is an illustrative decision metric, not EBITDA, operating profit or an accounting treatment recommendation.</p></section></div></div><details class="source-details"><summary>Calculation assumptions and limits</summary><p>Baseline revenue = current annual revenue × (1 + growth)^(year − 1). Additional supported volume ramps by one third of the selected uplift each year. Gross margin and product mix remain constant. The full support amount is deducted in year one in both supported and downside paths. Downside volume stays the selected percentage below baseline. Cash installments begin in month one; a 24-month schedule spreads payments across years one and two without changing the total charge.</p><p>Recovery sales = support amount ÷ gross margin. Recovery tonnes = recovery sales ÷ current revenue per tonne. These are incremental requirements, not all existing purchases. Tax, overhead, financing, discount rates, capacity constraints and working-capital requirements are excluded. No liability outcome or retention probability is assumed.</p></details>${sourceDetails()}`;
  bindSelect();
  let result;
  function render() {
    const values = Object.fromEntries(
      controls.map(([id]) => [id, Number($("#" + id).value)]),
    );
    controls.forEach(
      ([id, , , , , , unit]) =>
        ($("#" + id + "Value").textContent =
          unit === "USD"
            ? money(values[id])
            : `${values[id]}${unit === "%" ? "%" : " months"}`),
    );
    result = Model.support(
      account,
      values.supportAmount,
      values.installments,
      values.supportExpansion,
      values.supportGrowth,
      values.downsideDrop,
    );
    const max = Math.max(
      Math.abs(result.baseline),
      Math.abs(result.supported),
      Math.abs(result.downside),
      1,
    );
    $("#supportBars").innerHTML = [
      [
        "No support",
        result.baseline,
        "base",
        "Relationship continues at baseline",
      ],
      [
        "Support + growth",
        result.supported,
        "supported",
        "Uplift hypothesis, less support",
      ],
      [
        "Support + downside",
        result.downside,
        "downside",
        "Lower volume, support unrecovered",
      ],
    ]
      .map(
        ([label, v, cls, sub]) =>
          `<div class="scenario-bar-row"><div><strong>${label}</strong><small>${sub}</small></div><div><div class="scenario-bar ${cls}" style="width:${(Math.abs(v) / max) * 100}%"></div></div><b class="${v < 0 ? "negative" : ""}">${money(v)}</b></div>`,
      )
      .join("");
    $("#supportCallout").innerHTML =
      `<strong class="${result.profitDelta >= 0 ? "positive" : "negative"}">${result.profitDelta >= 0 ? "+" : ""}${money(result.profitDelta)}</strong><span>three-year contribution difference versus baseline. The assumed volume growth must actually materialize.</span>`;
    $("#supportMetrics").innerHTML =
      metric(
        "Monthly cash commitment",
        money(result.monthlyCash),
        `${values.installments} equal monthly payments`,
      ) +
      metric(
        "Additional sales to recover",
        money(result.recoveryRevenue),
        `${Math.ceil(result.recoveryTonnes).toLocaleString()} additional tonnes at current mix`,
      ) +
      metric(
        "Cash paid in year one",
        money(result.yearOneCash),
        "Total support: " + money(result.amount),
      );
    $("#supportRows").innerHTML = result.years
      .map(
        (y) =>
          `<tr><td>Year ${y.year}</td><td>${money(y.baseProfit)}</td><td>${money(y.supportedNet)}</td><td>${money(y.downsideNet)}</td><td>${money(y.cashPaid)}</td></tr>`,
      )
      .join("");
  }
  controls.forEach(([id]) => ($("#" + id).oninput = render));
  $("#resetSupport").onclick = () => {
    controls.forEach(([id, , , , value]) => ($("#" + id).value = value));
    render();
    toast("Support assumptions restored");
  };
  $("#exportSupport").onclick = () =>
    exportCSV(
      [
        ["Account", account.name],
        ...controls.map(([id, label]) => [label, $("#" + id).value]),
        [
          "Year",
          "Baseline GP",
          "Supported GP less support",
          "Downside GP less support",
          "Support cash paid",
        ],
        ...result.years.map((y) => [
          y.year,
          y.baseProfit,
          y.supportedNet,
          y.downsideNet,
          y.cashPaid,
        ]),
      ],
      "executive-decision-intelligence-relationship-support.csv",
    );
  render();
}
