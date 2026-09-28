/* Shared deterministic model. Currency is USD. All records are synthetic. */
(function (root) {
  const seeds =
    typeof module !== "undefined" ? require("./data.js") : CUSTOMERS;
  const sum = (xs, fn = (x) => x) => xs.reduce((a, x) => a + fn(x), 0);
  const clamp = (n) => Math.max(0, Math.min(100, n));
  const premium = (c) =>
    sum(Object.entries(c.products), ([name, share]) =>
      c.specialtyProducts.includes(name) ? share : 0,
    );
  const orders = [];
  seeds.forEach((c) => {
    for (let year = 2023; year <= 2025; year++) {
      const annual = Math.round(
        c.revenue / (1 + c.growth / 100) ** (2025 - year),
      );
      const weights = Array.from(
        { length: 12 },
        (_, m) => 1 + 0.12 * Math.sin(((m + c.id) * Math.PI) / 6),
      );
      const total = sum(weights);
      let assigned = 0;
      for (let month = 0; month < 12; month++) {
        const revenue =
          month === 11
            ? annual - assigned
            : Math.round((annual * weights[month]) / total);
        assigned += revenue;
        const margin = c.margin + (c.id === 2 ? (2025 - year) * 5.3 : 0);
        orders.push({
          id: `ORD-${c.id}-${year}-${String(month + 1).padStart(2, "0")}`,
          customerId: c.id,
          date: `${year}-${String(month + 1).padStart(2, "0")}-15`,
          revenue,
          cost: Math.round(revenue * (1 - margin / 100)),
          paymentDays:
            c.id === 5 && year === 2025 && month >= 9
              ? 73
              : c.id === 5
                ? 45
                : { Excellent: 30, Good: 45, Fair: 60, Poor: 85 }[c.payment],
        });
      }
    }
  });
  const accounts = seeds.map((c) => {
    const current = orders.filter(
      (o) => o.customerId === c.id && o.date.startsWith("2025"),
    );
    const previous = orders.filter(
      (o) => o.customerId === c.id && o.date.startsWith("2024"),
    );
    const revenue = sum(current, (o) => o.revenue),
      profit = sum(current, (o) => o.revenue - o.cost);
    const growth = (revenue / sum(previous, (o) => o.revenue) - 1) * 100;
    const pipeline = sum(c.opportunities, (o) => o.value);
    const payment = c.id === 5 ? "Watch" : c.payment;
    const factors = {
      growth: clamp(((growth + 5) / 30) * 100),
      pipeline: clamp((pipeline / revenue) * 200),
      premium: premium(c),
      payment: { Excellent: 100, Good: 80, Fair: 50, Poor: 20, Watch: 55 }[
        payment
      ],
    };
    const future = Math.round(
      factors.growth * 0.35 +
        factors.pipeline * 0.3 +
        factors.premium * 0.2 +
        factors.payment * 0.15,
    );
    // A transparent scenario, not a probability-weighted forecast: repeat the
    // latest observed annual growth rate for three years from the 2025 base.
    const threeYearRunRate = Math.round(
      revenue * Math.max(0, 1 + growth / 100) ** 3,
    );
    const value = clamp((profit / 1800000) * 100);
    const quadrant =
      future >= 50
        ? value >= 50
          ? "protect"
          : "invest"
        : value >= 50
          ? "harvest"
          : "monitor";
    const status =
      c.id === 1
        ? "Decision required"
        : payment === "Poor"
          ? "Payment risk"
          : c.id === 2
            ? "Margin pressure"
            : c.id === 5
              ? "Payment watch"
              : growth < 0
                ? "Revenue declining"
                : "On track";
    return {
      ...c,
      revenue,
      margin: (profit / revenue) * 100,
      growth,
      profit,
      pipeline,
      payment,
      premium: premium(c),
      factors,
      future,
      threeYearRunRate,
      value,
      quadrant,
      status,
      current,
      previous,
    };
  });
  function simulate(c, discount = 7, expansion = 35, baselineGrowth = 5) {
    const d = discount / 100,
      e = expansion / 100,
      g = baselineGrowth / 100,
      m = c.margin / 100;
    const years = [1, 2, 3].map((y) => {
      const baseRevenue = c.revenue * (1 + g) ** (y - 1);
      const supportedVolume = baseRevenue * (1 + (e * y) / 3);
      const supportedRevenue = supportedVolume * (y === 1 ? 1 - d : 1);
      const supportedProfit = supportedRevenue - supportedVolume * (1 - m);
      const downsideVolume = baseRevenue * 0.9;
      return {
        year: y,
        baseRevenue,
        baseProfit: baseRevenue * m,
        supportedRevenue,
        supportedProfit,
        downsideRevenue: downsideVolume * (y === 1 ? 1 - d : 1),
        downsideProfit: downsideVolume * (m - (y === 1 ? d : 0)),
      };
    });
    return {
      years,
      cost: c.revenue * (1 + e / 3) * d,
      existingCost: c.revenue * d,
      breakEven: m > d ? (d / (m - d)) * 100 : null,
      baseline: sum(years, (y) => y.baseRevenue),
      supported: sum(years, (y) => y.supportedRevenue),
      downside: sum(years, (y) => y.downsideRevenue),
      profitDelta: sum(years, (y) => y.supportedProfit - y.baseProfit),
    };
  }
  const overview = {
    revenue: sum(accounts, (c) => c.revenue),
    profit: sum(accounts, (c) => c.profit),
    pipeline: sum(accounts, (c) => c.pipeline),
    previous: sum(accounts, (c) => sum(c.previous, (o) => o.revenue)),
    attention: accounts.filter((c) => c.status !== "On track").length,
  };
  function support(
    c,
    amount = 350000,
    months = 12,
    expansion = 20,
    baseGrowth = 5,
    downsideDrop = 30,
  ) {
    const m = c.margin / 100;
    const years = [1, 2, 3].map((y) => {
      const baseRevenue = c.revenue * (1 + baseGrowth / 100) ** (y - 1);
      const supportedRevenue = baseRevenue * (1 + ((expansion / 100) * y) / 3);
      const downsideRevenue = baseRevenue * (1 - downsideDrop / 100);
      const expense = y === 1 ? amount : 0;
      const cashPaid =
        (Math.max(0, Math.min(12, months - (y - 1) * 12)) * amount) / months;
      return {
        year: y,
        baseRevenue,
        baseProfit: baseRevenue * m,
        supportedRevenue,
        supportedProfit: supportedRevenue * m,
        supportedNet: supportedRevenue * m - expense,
        downsideRevenue,
        downsideProfit: downsideRevenue * m,
        downsideNet: downsideRevenue * m - expense,
        cashPaid,
      };
    });
    return {
      years,
      amount,
      months,
      monthlyCash: amount / months,
      recoveryRevenue: m > 0 ? amount / m : null,
      recoveryTonnes: m > 0 ? amount / m / (c.revenue / c.tonnes) : null,
      baseline: sum(years, (y) => y.baseProfit),
      supported: sum(years, (y) => y.supportedNet),
      downside: sum(years, (y) => y.downsideNet),
      profitDelta: sum(years, (y) => y.supportedNet - y.baseProfit),
      yearOneCash: years[0].cashPaid,
    };
  }
  function brief(c) {
    const s = support(c);
    return `${c.name} generated ${money(c.revenue)} in 2025 revenue at a ${c.margin.toFixed(1)}% gross margin, with ${signed(c.growth)}% year-over-year growth. Specialty grades account for ${c.premium}% of its synthetic product mix. These are the purchasing signals to examine alongside personal knowledge of the customer. [Orders; account product mix]\n\n${c.notes.join(" ")} [Relationship notes]\n\n${c.opportunities.length ? `${c.opportunities.length} open opportunities total ${money(c.pipeline)} in unweighted pipeline. They indicate potential demand, not signed orders or proof that financial support will cause retention.` : "No open opportunities are recorded. There is no documented expansion pipeline to support an investment thesis."} [Opportunities]\n\n${c.id === 1 ? "The requested" : "An illustrative"} ${money(s.amount)} one-time settlement would create ${money(s.monthlyCash)} of monthly cash payments over ${s.months} months. At the current product mix and gross margin, recovery requires ${money(s.recoveryRevenue)} of additional sales, or approximately ${Math.ceil(s.recoveryTonnes).toLocaleString("en-US")} additional tonnes. This is gross-profit recovery before overhead, tax, financing and working capital; it is not EBITDA or a forecast. [Scenario calculation]\n\nUnder the illustrative 20% year-three volume uplift, three-year gross profit less support changes by ${money(s.profitDelta)} versus an unchanged relationship baseline. If volume instead remains 30% below baseline after support, the three-year result falls to ${money(s.downside)}. Neither path is assigned a probability, and the no-support baseline does not assume the customer will leave. [Scenario calculation]\n\nBefore deciding, validate the customer's growth with purchase commitments, review the technical claim with the application specialist, establish a cash-exposure limit with Finance, and record the commercial decision owner. Environmental, safety and delivery evidence is not present. The advisory perspective informs the discussion; the authorized executive retains the decision.`;
  }
  function answer(question) {
    const q = question.toLowerCase();
    const named = accounts.filter(
      (c) =>
        q.includes(c.name.toLowerCase()) ||
        q.includes(c.name.split(" ")[0].toLowerCase()),
    );
    let matches, explanation, metric;
    if (
      /sacrific|concession|short.term|invest|long.term|future value|settlement|absorb|loss|support/.test(
        q,
      )
    ) {
      matches = [...accounts]
        .filter((c) => c.pipeline > 0)
        .sort((a, b) => b.future - a.future);
      explanation =
        "These accounts combine growth, pipeline, specialty-grade purchases and payment quality. Atlas has a fictional one-time settlement request; the others do not. Support should be considered alongside customer commitments, technical evidence and cash capacity. A score does not establish causation or justify automatic approval.";
      metric = "Future-value score";
    } else if (
      /margin|profit/.test(q) &&
      !/tonne|tonnage|cash|working capital/.test(q)
    ) {
      matches = [...accounts].sort((a, b) =>
        /declin|pressure|low/.test(q)
          ? a.margin - b.margin
          : b.margin - a.margin,
      );
      explanation =
        "Gross margins are calculated from recorded revenue less cost. Nova Refractories has a 5.3 percentage-point year-over-year margin decline alongside positive revenue growth.";
      metric = "Gross margin";
    } else if (/grow|growth/.test(q)) {
      matches = [...accounts].sort((a, b) => b.growth - a.growth);
      explanation =
        "Ranked by 2025 revenue growth against 2024, calculated from the synthetic order ledger.";
      metric = "YoY growth";
    } else if (/premium|highest.value|high.value|product/.test(q)) {
      matches = [...accounts].sort((a, b) => b.premium - a.premium);
      explanation =
        "Specialty share uses an explicit product classification in the synthetic dataset. Atlas purchases only high-added-value specialty grades. This is a demo classification, not a claim about actual product profitability or Grupo Curimbaba customer purchases.";
      metric = "Premium share";
    } else if (/cash|working capital|tonne|tonnage/.test(q)) {
      matches = named.length
        ? named
        : [...accounts].sort(
            (a, b) => b.profit / b.tonnes - a.profit / a.tonnes,
          );
      explanation = matches
        .slice(0, 5)
        .map(
          (c) =>
            `${c.name}: ${money(c.profit / c.tonnes)} gross profit per tonne on ${c.tonnes.toLocaleString("en-US")} synthetic annual tonnes. ${c.id === 5 ? "Moving from 45 to 73 payment days implies approximately " + money((c.revenue / 365) * 28) + " of additional receivables at uniform daily sales; this is a sensitivity, not a recorded balance." : ""}`,
        )
        .join("\n\n");
      metric = "Unit economics & cash exposure";
    } else if (/esg|environment|safety|emission|succession|expert/.test(q)) {
      matches = named.length ? named : [];
      explanation =
        "The demo has no account-level emissions, safety, certification or succession evidence. Do not infer ESG performance from product type. Before financial support, an application specialist should validate product requirements, Finance should review cash exposure, and Operations should confirm capacity and delivery commitments. These are open review questions, not measured risk scores.";
      metric = "Evidence gaps";
    } else if (/payment|risk|attention/.test(q)) {
      matches = accounts.filter((c) => c.status !== "On track");
      explanation =
        "These accounts have a pending decision, margin pressure, payment concerns or declining revenue. Terra’s extended terms are flagged separately from historical payment quality.";
      metric = "Attention signal";
    } else if (/revenue|largest|sales/.test(q)) {
      matches = [...accounts].sort((a, b) => b.revenue - a.revenue);
      explanation =
        "Ranked by total 2025 revenue from the synthetic order ledger.";
      metric = "2025 revenue";
    } else if (named.length) {
      matches = named;
      explanation = brief(named[0]);
      metric = "Account overview";
    } else
      return {
        text: "The local analysis supports revenue, growth, margins, premium products, payment risk and investment candidates. Try one of those topics, or name an account. For broader questions, connect a language model through the server configuration.",
        accounts: [],
        metric: "Unsupported question",
      };
    return {
      text: explanation,
      accounts: named.length
        ? matches.filter((c) => named.includes(c))
        : matches.slice(0, 5),
      metric,
    };
  }
  function money(n) {
    return `${n < 0 ? "−" : ""}$${Math.abs(n) >= 1e6 ? (Math.abs(n) / 1e6).toFixed(2) + "M" : Math.abs(n) >= 1e3 ? (Math.abs(n) / 1e3).toFixed(0) + "K" : Math.abs(n).toFixed(0)}`;
  }
  function signed(n) {
    return (n >= 0 ? "+" : "") + n.toFixed(1);
  }
  const model = {
    accounts,
    orders,
    overview,
    simulate,
    support,
    brief,
    answer,
    money,
    signed,
    sum,
  };
  if (typeof module !== "undefined") module.exports = model;
  else root.Model = model;
})(typeof window !== "undefined" ? window : globalThis);
