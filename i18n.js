/* English / Brazilian Portuguese switch.
   The app renders English. When Portuguese is selected, this layer translates the
   rendered DOM (text nodes and a few attributes) and keeps translating whatever the
   app renders later. Numbers in the dictionary use English notation; they are
   converted to Portuguese notation (1,234.5 -> 1.234,5) after translation.
   Unknown strings stay in English rather than breaking the page. */
(function () {
  const KEY = "eds-lang";
  const valid = (v) => (v === "en" || v === "pt" ? v : null);
  let lang = "en";
  try {
    const requested = valid(new URLSearchParams(location.search).get("lang"));
    if (requested) localStorage.setItem(KEY, requested);
    lang = requested || valid(localStorage.getItem(KEY)) || "en";
  } catch {}

  const D = {
    /* Shell */
    "Skip to content": "Ir para o conteúdo",
    "Executive Decision": "Sistema de Inteligência",
    "Intelligence System": "de Decisão Executiva",
    "Executive Decision Intelligence System":
      "Sistema de Inteligência de Decisão Executiva",
    "Industrial minerals": "Minerais industriais",
    "Strategic relationship review": "Revisão estratégica de relacionamentos",
    WORKSPACE: "ÁREA DE TRABALHO",
    INTELLIGENCE: "INTELIGÊNCIA",
    Workspace: "Área de trabalho",
    "Executive overview": "Visão executiva",
    "Morning brief": "Resumo matinal",
    "Account 360": "Conta 360",
    "Decision briefs": "Resumos de decisão",
    "Long-term value radar": "Radar de valor de longo prazo",
    "Scenario simulator": "Simulador de cenários",
    "Ask the business": "Pergunte ao negócio",
    "Demonstration workspace": "Ambiente de demonstração",
    "Synthetic data. Real possibilities.":
      "Dados sintéticos. Possibilidades reais.",
    "Advisory-board perspective": "Perspectiva do conselho consultivo",
    "SYNTHETIC DATA": "DADOS SINTÉTICOS",
    "Snapshot · 31 Dec 2025": "Posição em 31 dez 2025",
    "About this workspace": "Sobre este ambiente",
    "Main navigation": "Navegação principal",
    "Demonstration using synthetic data": "Demonstração com dados sintéticos",
    "Evidence informs. Executives decide.":
      "As evidências informam. Os executivos decidem.",
    "Close dialog": "Fechar janela",
    "Built for the longer view.": "Feito para a visão de longo prazo.",
    "A strategic account intelligence demonstration for Leonardo. All customer accounts, transactions and commercial notes are fictional. Public company context is cited separately; this is an independent demonstration, not a Grupo Curimbaba system.":
      "Uma demonstração de inteligência de contas estratégicas para Leonardo. Todas as contas de clientes, transações e notas comerciais são fictícias. O contexto público da empresa é citado separadamente; esta é uma demonstração independente, não um sistema do Grupo Curimbaba.",
    "The snapshot is fixed at 31 December 2025. Local analysis is available without credentials; live AI requires a server-side model connection.":
      "A posição é fixada em 31 de dezembro de 2025. A análise local está disponível sem credenciais; a IA em tempo real exige uma conexão de modelo no servidor.",
    Understood: "Entendi",
    Language: "Idioma",
    "31 December 2025": "31 de dezembro de 2025",

    /* Overview */
    "EXECUTIVE OVERVIEW": "VISÃO EXECUTIVA",
    "See the signals. Decide where to look.":
      "Veja os sinais. Decida onde olhar.",
    "Portfolio performance and the relationships that may need executive attention.":
      "Desempenho da carteira e os relacionamentos que podem exigir atenção executiva.",
    "↓ Export portfolio": "↓ Exportar carteira",
    "Read morning brief": "Ler resumo matinal",
    "Portfolio overview": "Visão da carteira",
    "FY 2025": "Exercício 2025",
    "Portfolio metrics": "Indicadores da carteira",
    "Portfolio revenue": "Receita da carteira",
    "year over year": "em relação ao ano anterior",
    "Gross margin": "Margem bruta",
    "Open opportunity pipeline": "Pipeline de oportunidades abertas",
    "Unweighted · not contracted revenue":
      "Não ponderado · não é receita contratada",
    "Executive attention": "Atenção executiva",
    "PRIORITY ACCOUNT": "CONTA PRIORITÁRIA",
    "Short-term exposure.": "Exposição de curto prazo.",
    "Long-term relationship value.": "Valor de relacionamento de longo prazo.",
    "A fictional settlement request puts cash at risk. Growth and specialty purchases provide context; future demand and causation remain unverified.":
      "Um pedido fictício de acordo coloca o caixa em risco. O crescimento e as compras de especialidades dão contexto; a demanda futura e a causalidade continuam não verificadas.",
    "One-time support request": "Pedido de apoio pontual",
    "Unweighted opportunity pipeline":
      "Pipeline de oportunidades não ponderado",
    "Revenue growth": "Crescimento da receita",
    "Review decision brief ↗": "Revisar resumo de decisão ↗",
    "Current value and future signals": "Valor atual e sinais futuros",
    "Explainable portfolio scores · open an account to inspect the evidence.":
      "Pontuações explicáveis da carteira · abra uma conta para inspecionar as evidências.",
    "Method ↗": "Método ↗",
    "Current value": "Valor atual",
    "Future potential": "Potencial futuro",
    "Score / 100": "Pontuação / 100",
    "Scores are comparative signals, not dollar forecasts.":
      "As pontuações são sinais comparativos, não projeções em dólares.",
    "Strategic accounts": "Contas estratégicas",
    "Performance, potential and the signals that matter.":
      "Desempenho, potencial e os sinais que importam.",
    "Account filters": "Filtros de contas",
    "All accounts": "Todas as contas",
    "Needs attention": "Requer atenção",
    "With opportunities": "Com oportunidades",
    "Search accounts…": "Buscar contas…",
    "Search accounts": "Buscar contas",
    Account: "Conta",
    "Revenue ↓": "Receita ↓",
    "Revenue ↑": "Receita ↑",
    "YoY growth": "Crescimento anual",
    "Future value": "Valor futuro",
    "Attention signal": "Sinal de atenção",
    "Open account": "Abrir conta",
    "No accounts match. Try a different name or filter.":
      "Nenhuma conta encontrada. Tente outro nome ou filtro.",
    "Reporting period: Jan – Dec 2025": "Período de referência: jan – dez 2025",

    /* Shared footers: sources and public context */
    "Data sources & methodology": "Fontes de dados e metodologia",
    "4 datasets · 2023–2025": "4 conjuntos de dados · 2023–2025",
    "All customer accounts and financial figures are fictional. Revenue and margins are aggregated from 288 synthetic monthly order records. The reporting period is January–December 2025, compared with 2024. Product mix and relationship notes are synthetic account inputs. Opportunities are unweighted and are not contracted revenue.":
      "Todas as contas de clientes e os números financeiros são fictícios. A receita e as margens são agregadas a partir de 288 registros mensais de pedidos sintéticos. O período de referência é janeiro–dezembro de 2025, comparado com 2024. O mix de produtos e as notas de relacionamento são dados sintéticos das contas. As oportunidades não são ponderadas e não representam receita contratada.",
    "Why this demonstration fits industrial minerals":
      "Por que esta demonstração se aplica a minerais industriais",
    "Public context · researched 11 Sep 2026":
      "Contexto público · pesquisado em 11 set 2026",
    "Products with application value": "Produtos com valor de aplicação",
    "The group serves abrasives, refractories, foundry, oil and gas, agriculture and other industrial markets. USEM lists fused aluminas, silicon carbides and bauxites. The fictional accounts use those product families.":
      "O grupo atende os mercados de abrasivos, refratários, fundição, óleo e gás, agricultura e outros mercados industriais. A USEM lista aluminas fundidas, carbetos de silício e bauxitas. As contas fictícias usam essas famílias de produtos.",
    "USEM product portfolio ↗": "Portfólio de produtos da USEM ↗",
    "Capital discipline over time": "Disciplina de capital ao longo do tempo",
    "The group’s published values include sustainable long-term results and growth with low financial leverage. This demo therefore exposes cash commitments alongside commercial upside.":
      "Os valores publicados pelo grupo incluem resultados sustentáveis de longo prazo e crescimento com baixa alavancagem financeira. Por isso, esta demonstração expõe os compromissos de caixa junto com o potencial comercial.",
    "Grupo Curimbaba code of conduct · p. 1 ↗":
      "Código de conduta do Grupo Curimbaba · p. 1 ↗",
    "A diversified business context": "Um contexto de negócios diversificado",
    "Yoorin’s official portfolio includes thermophosphate, potassic and foliar fertilizers. The agriculture account represents a fictional distributor, not a group company or a known customer.":
      "O portfólio oficial da Yoorin inclui fertilizantes termofosfatados, potássicos e foliares. A conta do setor agrícola representa um distribuidor fictício, não uma empresa do grupo nem um cliente conhecido.",
    "Yoorin official company profile ↗": "Perfil oficial da empresa Yoorin ↗",
    "Independent demonstration. Public company facts inform the setting; all customer identities, product allocations, financials and operational scenarios are synthetic. USD is a common illustrative reporting currency, not an actual group currency conversion.":
      "Demonstração independente. Fatos públicos da empresa informam o cenário; todas as identidades de clientes, alocações de produtos, dados financeiros e cenários operacionais são sintéticos. O USD é uma moeda de referência ilustrativa comum, não uma conversão cambial real do grupo.",

    /* Account data */
    "Bonded & coated abrasives": "Abrasivos aglomerados e revestidos",
    "Refractories & steel": "Refratários e aço",
    "Advanced ceramics": "Cerâmicas avançadas",
    "Agriculture & soil nutrition": "Agricultura e nutrição do solo",
    "Foundry & investment casting": "Fundição e microfusão",
    "Steel & metallurgy": "Aço e metalurgia",
    "Surface preparation": "Preparação de superfícies",
    "United States": "Estados Unidos",
    Brazil: "Brasil",
    "Green silicon carbide microgrits":
      "Microgrãos de carbeto de silício verde",
    "White fused alumina specialty grades":
      "Grades especiais de alumina fundida branca",
    "Boron carbide powders": "Pós de carbeto de boro",
    "Brown fused alumina": "Alumina fundida marrom",
    "Fused spinel specialty grades": "Grades especiais de espinélio fundido",
    "Refractory-grade bauxite": "Bauxita grau refratário",
    "Boron carbide precision powders": "Pós de precisão de carbeto de boro",
    "Calcined alumina": "Alumina calcinada",
    "Thermophosphate fertilizer": "Fertilizante termofosfato",
    "Specialty foliar nutrients": "Nutrientes foliares especiais",
    "Potassic mineral fertilizer": "Fertilizante mineral potássico",
    "Specialty ceramic foundry sand": "Areia cerâmica especial para fundição",
    "Metallurgical silicon carbide": "Carbeto de silício metalúrgico",
    "Fused mullite": "Mulita fundida",
    "Specialty fused spinel": "Espinélio fundido especial",
    "Brown fused alumina blasting grit":
      "Granalha de jateamento de alumina fundida marrom",
    "Black silicon carbide": "Carbeto de silício preto",
    "Additional grinding-wheel line: specialty microgrit qualification":
      "Nova linha de rebolos: qualificação de microgrãos especiais",
    "Multi-year specialty alumina supply agreement":
      "Contrato plurianual de fornecimento de alumina especial",
    "Second production line sourcing review":
      "Revisão de fornecimento para a segunda linha de produção",
    "Specialty nutrition distribution program for the next crop cycle":
      "Programa de distribuição de nutrição especial para o próximo ciclo de safra",
    "New casting line: foundry-sand qualification and volume ramp":
      "Nova linha de fundição: qualificação da areia e aumento gradual de volume",
    Qualified: "Qualificada",
    Early: "Inicial",
    Active: "Ativa",
    Excellent: "Excelente",
    Good: "Boa",
    Fair: "Regular",
    Poor: "Ruim",
    Watch: "Atenção",
    "Decision required": "Decisão necessária",
    "Payment risk": "Risco de pagamento",
    "Margin pressure": "Pressão de margem",
    "Payment watch": "Atenção ao pagamento",
    "Revenue declining": "Receita em queda",
    "Declining revenue": "Receita em queda",
    "On track": "Em linha",
    Opportunity: "Oportunidade",
    Monitor: "Monitorar",
    Protect: "Proteger",
    Invest: "Investir",
    Harvest: "Rentabilizar",
    "Nine-year relationship; historical payments are reliable. Purchases are entirely specialty grades with high added value.":
      "Relacionamento de nove anos; o histórico de pagamentos é confiável. As compras são inteiramente de grades especiais de alto valor agregado.",
    "Customer requests a $350,000 one-time commercial settlement, payable over 12 months, following a claimed process loss. The fictional technical review reports material within specification; the cause and commercial terms remain open.":
      "O cliente solicita um acordo comercial pontual de $350,000, pago em 12 meses, após uma alegada perda de processo. A revisão técnica fictícia indica material dentro da especificação; a causa e as condições comerciais permanecem em aberto.",
    "Revenue is growing while gross margin fell 5.3 percentage points. Energy, freight and pricing drivers still need validation.":
      "A receita está crescendo enquanto a margem bruta caiu 5.3 pontos percentuais. Os fatores de energia, frete e preço ainda precisam ser validados.",
    "Reliable technical collaboration. The next sourcing review should examine product-level contribution, not revenue alone.":
      "Colaboração técnica confiável. A próxima revisão de fornecimento deve examinar a contribuição por produto, não apenas a receita.",
    "Order frequency declining for four consecutive months.":
      "A frequência de pedidos está em queda há quatro meses consecutivos.",
    "High margin but flat growth — treat as stable, not a growth account.":
      "Margem alta, mas crescimento estável — tratar como conta estável, não como conta de crescimento.",
    "Commercial team reports rising specialty nutrition demand; validate against the crop calendar and distributor sell-through.":
      "A equipe comercial relata aumento da demanda por nutrição especial; validar com o calendário de safra e o giro do distribuidor.",
    "Historical payments are reliable. No farm-level outcome or environmental certification data is included in this demo.":
      "O histórico de pagamentos é confiável. Esta demonstração não inclui resultados no nível da fazenda nem dados de certificação ambiental.",
    "Payment terms extended from 45 to 73 days this quarter — worth monitoring.":
      "O prazo de pagamento passou de 45 para 73 dias neste trimestre — vale acompanhar.",
    "Fastest-growing account in the portfolio by percentage.":
      "Conta de crescimento mais rápido da carteira em termos percentuais.",
    "Revenue softening for two consecutive quarters.":
      "Receita em desaceleração por dois trimestres consecutivos.",
    "No active opportunities in pipeline.":
      "Nenhuma oportunidade ativa no pipeline.",
    "Sales are broadly flat in this illustrative account history.":
      "As vendas estão praticamente estáveis neste histórico ilustrativo da conta.",
    "Differentiation and customer process requirements need review before increasing exposure.":
      "A diferenciação e os requisitos de processo do cliente precisam ser revisados antes de aumentar a exposição.",
    "Payment delays increasing over the past two quarters.":
      "Os atrasos de pagamento aumentaram nos dois últimos trimestres.",
    "Declining margin and declining volume — candidate for reduced allocation.":
      "Margem e volume em queda — candidata a redução de alocação.",

    /* Account 360 */
    "ACCOUNT INTELLIGENCE": "INTELIGÊNCIA DA CONTA",
    "Select account": "Selecionar conta",
    "Build decision brief ↗": "Criar resumo de decisão ↗",
    "Relationship perspective": "Perspectiva do relacionamento",
    "Model relationship support ↗": "Simular apoio ao relacionamento ↗",
    "Annual revenue": "Receita anual",
    "2025 · recorded orders": "2025 · pedidos registrados",
    "2025 vs. 2024": "2025 vs. 2024",
    "Specialty product mix": "Mix de produtos especiais",
    "Explicit specialty-grade classification":
      "Classificação explícita de grades especiais",
    "Industrial account economics": "Economia da conta industrial",
    "Customer market": "Mercado do cliente",
    "Synthetic annual volume": "Volume anual sintético",
    "Gross profit / tonne": "Lucro bruto / tonelada",
    "Relationship history": "Histórico do relacionamento",
    "Unit economics use an illustrative annual tonnage input. Gross profit excludes overhead and is not EBITDA.":
      "A economia unitária usa uma tonelagem anual ilustrativa. O lucro bruto exclui despesas gerais e não é EBITDA.",
    "SCENARIO · NOT A FORECAST": "CENÁRIO · NÃO É UMA PROJEÇÃO",
    "2025 vs. 2024 growth repeated": "Crescimento 2025 vs. 2024 repetido",
    "Evidence strength: limited · one comparison":
      "Força da evidência: limitada · uma comparação",
    "Evidence and assumptions": "Evidências e premissas",
    "Calculated from the synthetic 2024–2025 order ledger. Formula: 2025 annual revenue × (1 + 2025 growth rate)³. This assumes growth persists unchanged, does not include unweighted pipeline, and is not probability-weighted. Actual demand, pricing, capacity, churn and future margin may differ.":
      "Calculado a partir do livro de pedidos sintético de 2024–2025. Fórmula: receita anual de 2025 × (1 + taxa de crescimento de 2025)³. Pressupõe que o crescimento se mantém inalterado, não inclui o pipeline não ponderado e não é ponderado por probabilidade. A demanda, os preços, a capacidade, o churn e a margem futura reais podem ser diferentes.",
    "Revenue over time": "Receita ao longo do tempo",
    "Monthly synthetic order revenue · 2023–2025":
      "Receita mensal sintética de pedidos · 2023–2025",
    "Monthly revenue trend": "Tendência da receita mensal",
    "Product mix": "Mix de produtos",
    "Share of account purchases · synthetic inputs":
      "Participação nas compras da conta · dados sintéticos",
    "Specialty classification is explicit in the synthetic account data; product names alone do not prove margin.":
      "A classificação de especialidades é explícita nos dados sintéticos da conta; os nomes dos produtos, por si só, não comprovam margem.",
    "Commercial opportunities": "Oportunidades comerciais",
    "No open opportunities recorded for this account.":
      "Nenhuma oportunidade aberta registrada para esta conta.",
    "Pipeline indicates potential. Timing and purchase commitments remain unverified.":
      "O pipeline indica potencial. O prazo e os compromissos de compra continuam não verificados.",
    "Relationship intelligence": "Inteligência de relacionamento",
    "Commercial notes & payment behavior":
      "Notas comerciais e comportamento de pagamento",
    "Current payment assessment": "Avaliação atual de pagamento",
    "Recent order ledger": "Livro de pedidos recentes",
    "Latest 6 monthly records · USD": "Últimos 6 registros mensais · USD",
    "Download full ledger ↓": "Baixar livro completo ↓",
    "Order reference": "Referência do pedido",
    Date: "Data",
    Revenue: "Receita",
    "Gross profit": "Lucro bruto",
    "Payment days": "Dias de pagamento",
    "That account was not found. Showing Atlas Precision Abrasives instead.":
      "Essa conta não foi encontrada. Exibindo a Atlas Precision Abrasives.",

    /* Long-term value radar */
    "LOOK BEYOND THIS QUARTER": "OLHE ALÉM DESTE TRIMESTRE",
    "An explainable view of current contribution and future potential.":
      "Uma visão explicável da contribuição atual e do potencial futuro.",
    "The portfolio, in perspective": "A carteira em perspectiva",
    "Compare account scores, then select a bar to inspect the evidence.":
      "Compare as pontuações das contas e selecione uma barra para inspecionar as evidências.",
    "BEHIND THE SCORES": "POR TRÁS DAS PONTUAÇÕES",
    Growth: "Crescimento",
    Pipeline: "Pipeline",
    "Premium mix": "Mix premium",
    "Payment quality": "Qualidade de pagamento",
    "View account evidence ↗": "Ver evidências da conta ↗",
    "Transparent by design": "Transparente por princípio",
    "A consistent scoring framework, not an opaque AI verdict.":
      "Um modelo de pontuação consistente, não um veredito opaco de IA.",
    "Opportunity pipeline": "Pipeline de oportunidades",
    "−5% to +25% YoY maps to a 0–100 signal.":
      "De −5% a +25% ao ano equivale a um sinal de 0 a 100.",
    "Pipeline worth 50% of annual revenue earns a full signal.":
      "Um pipeline equivalente a 50% da receita anual gera o sinal máximo.",
    "The share of purchases explicitly classified as specialty grades in the demo.":
      "A parcela das compras classificada explicitamente como grades especiais na demonstração.",
    "Excellent 100, good 80, watch 55, fair 50, poor 20.":
      "Excelente 100, boa 80, atenção 55, regular 50, ruim 20.",
    "Current value = annual gross profit ÷ $1.8M, capped at 100. The strategy categories use a threshold of 50 on each score. This illustrative framework omits unverified relationship strength and strategic importance; it is a starting point for discussion.":
      "Valor atual = lucro bruto anual ÷ $1.8M, limitado a 100. As categorias estratégicas usam um limite de 50 em cada pontuação. Este modelo ilustrativo omite a força do relacionamento e a importância estratégica, que não foram verificadas; é um ponto de partida para a discussão.",

    /* Scenario simulator: price concession */
    "MAKE THE TRADE-OFF VISIBLE": "TORNE A TROCA VISÍVEL",
    "Test the short-term cost against the potential long-term return.":
      "Teste o custo de curto prazo contra o retorno potencial de longo prazo.",
    "↓ Export scenario": "↓ Exportar cenário",
    "Decision assumptions": "Premissas da decisão",
    "Adjust the inputs. See the implications.":
      "Ajuste os dados. Veja as implicações.",
    "Commercial concession": "Concessão comercial",
    "Applied to all year-one purchases.":
      "Aplicada a todas as compras do primeiro ano.",
    "Additional volume by year 3": "Volume adicional até o ano 3",
    "Ramps evenly across the three years.":
      "Cresce de forma uniforme ao longo dos três anos.",
    "Annual baseline growth": "Crescimento anual de referência",
    "Applied from year two onwards.": "Aplicado a partir do segundo ano.",
    "Reset assumptions": "Restaurar premissas",
    "Illustrative assumptions, not forecasts. Unit costs and product mix remain constant.":
      "Premissas ilustrativas, não projeções. Os custos unitários e o mix de produtos permanecem constantes.",
    "Three possible paths": "Três caminhos possíveis",
    "Cumulative revenue over three years · USD":
      "Receita acumulada em três anos · USD",
    Baseline: "Referência",
    "Current trajectory": "Trajetória atual",
    "Supported expansion": "Expansão apoiada",
    "Concession + volume uplift": "Concessão + aumento de volume",
    Downside: "Cenário adverso",
    "10% below baseline volume": "Volume 10% abaixo da referência",
    "three-year gross profit upside versus baseline, if the assumed expansion is realized.":
      "ganho de lucro bruto em três anos em relação à referência, se a expansão presumida se concretizar.",
    "three-year gross profit reduction versus baseline, if the assumed expansion is realized.":
      "redução do lucro bruto em três anos em relação à referência, se a expansão presumida se concretizar.",
    "Year-one concession cost": "Custo da concessão no primeiro ano",
    "Includes assumed additional volume": "Inclui o volume adicional presumido",
    "Break-even volume uplift": "Aumento de volume para ponto de equilíbrio",
    "Not achievable": "Inatingível",
    "Within the concession year": "Dentro do ano da concessão",
    "Year-one net revenue": "Receita líquida do primeiro ano",
    "Supported scenario, after concession": "Cenário apoiado, após a concessão",
    "Year-by-year economics": "Economia ano a ano",
    "Revenue and gross profit, including the concession.":
      "Receita e lucro bruto, incluindo a concessão.",
    Period: "Período",
    "Base revenue": "Receita de referência",
    "Supported revenue": "Receita apoiada",
    "Base gross profit": "Lucro bruto de referência",
    "Supported gross profit": "Lucro bruto apoiado",
    "How this model works": "Como este modelo funciona",
    "Baseline revenue in year y = current annual revenue × (1 + baseline growth)^(y − 1). Supported volume grows above that baseline by one third of the selected expansion each year. The concession reduces all supported revenue in year one only. Unit costs remain at the current cost-to-revenue ratio. Downside assumes volume 10% below baseline in every year and the same first-year concession. There are no probabilities, taxes, financing costs or capacity constraints in this model.":
      "Receita de referência no ano y = receita anual atual × (1 + crescimento de referência)^(y − 1). O volume apoiado cresce acima dessa referência em um terço da expansão selecionada a cada ano. A concessão reduz toda a receita apoiada apenas no primeiro ano. Os custos unitários permanecem na razão atual entre custo e receita. O cenário adverso pressupõe volume 10% abaixo da referência em todos os anos e a mesma concessão no primeiro ano. Este modelo não inclui probabilidades, impostos, custos de financiamento nem restrições de capacidade.",
    "First-year break-even uplift = discount ÷ (gross margin − discount). If the concession equals or exceeds margin, additional volume cannot restore gross profit under these assumptions.":
      "Aumento de equilíbrio no primeiro ano = desconto ÷ (margem bruta − desconto). Se a concessão for igual ou superior à margem, o volume adicional não consegue restaurar o lucro bruto nessas premissas.",

    /* Scenario simulator: one-time support */
    "One-time relationship support": "Apoio pontual ao relacionamento",
    "Temporary price concession": "Concessão temporária de preço",
    "RELATIONSHIP SUPPORT · CAPITAL AT RISK":
      "APOIO AO RELACIONAMENTO · CAPITAL EM RISCO",
    "What would make the loss worth taking?":
      "O que faria a perda valer a pena?",
    "Compare a one-time commitment with customer growth, cash timing and a failed recovery.":
      "Compare um compromisso pontual com o crescimento do cliente, o momento do caixa e uma recuperação que não se concretiza.",
    "A decision, with conditions": "Uma decisão, com condições",
    "All inputs below are illustrative.":
      "Todos os dados abaixo são ilustrativos.",
    "One-time support amount": "Valor do apoio pontual",
    "Full economic charge in year one.":
      "Encargo econômico integral no primeiro ano.",
    "Payment installments": "Parcelas de pagamento",
    "Equal monthly payments, starting immediately.":
      "Pagamentos mensais iguais, começando imediatamente.",
    "A hypothesis, not a probability or a commitment.":
      "Uma hipótese, não uma probabilidade nem um compromisso.",
    "Volume decline after support": "Queda de volume após o apoio",
    "Downside volume below baseline in all three years.":
      "Volume adverso abaixo da referência nos três anos.",
    "Does the longer view justify the commitment?":
      "A visão de longo prazo justifica o compromisso?",
    "Three-year gross profit less one-time support · USD":
      "Lucro bruto de três anos menos o apoio pontual · USD",
    "No support": "Sem apoio",
    "Relationship continues at baseline":
      "O relacionamento continua na referência",
    "Support + growth": "Apoio + crescimento",
    "Uplift hypothesis, less support": "Hipótese de aumento, menos o apoio",
    "Support + downside": "Apoio + cenário adverso",
    "Lower volume, support unrecovered": "Volume menor, apoio não recuperado",
    "three-year contribution difference versus baseline. The assumed volume growth must actually materialize.":
      "diferença de contribuição em três anos em relação à referência. O crescimento de volume presumido precisa realmente se concretizar.",
    "The baseline assumes the relationship continues without support. Support does not guarantee retention or expansion. Compare hypotheses without treating them as causal evidence.":
      "A referência pressupõe que o relacionamento continua sem apoio. O apoio não garante retenção nem expansão. Compare as hipóteses sem tratá-las como evidência causal.",
    "Monthly cash commitment": "Compromisso mensal de caixa",
    "Additional sales to recover": "Vendas adicionais para recuperar",
    "Cash paid in year one": "Caixa pago no primeiro ano",
    "Economics and cash are different": "Economia e caixa são diferentes",
    "The support charge is recognized once; installments change payment timing.":
      "O encargo do apoio é reconhecido uma única vez; as parcelas mudam apenas o momento do pagamento.",
    "Baseline gross profit": "Lucro bruto de referência",
    "Supported GP less support": "LB apoiado menos apoio",
    "Downside GP less support": "LB adverso menos apoio",
    "Support cash paid": "Caixa pago em apoio",
    "Gross profit less support is an illustrative decision metric, not EBITDA, operating profit or an accounting treatment recommendation.":
      "O lucro bruto menos o apoio é uma métrica de decisão ilustrativa, não é EBITDA, lucro operacional nem uma recomendação de tratamento contábil.",
    "Calculation assumptions and limits": "Premissas e limites do cálculo",
    "Baseline revenue = current annual revenue × (1 + growth)^(year − 1). Additional supported volume ramps by one third of the selected uplift each year. Gross margin and product mix remain constant. The full support amount is deducted in year one in both supported and downside paths. Downside volume stays the selected percentage below baseline. Cash installments begin in month one; a 24-month schedule spreads payments across years one and two without changing the total charge.":
      "Receita de referência = receita anual atual × (1 + crescimento)^(ano − 1). O volume adicional apoiado cresce um terço do aumento selecionado a cada ano. A margem bruta e o mix de produtos permanecem constantes. O valor total do apoio é deduzido no primeiro ano nos cenários apoiado e adverso. O volume adverso permanece no percentual selecionado abaixo da referência. As parcelas de caixa começam no primeiro mês; um cronograma de 24 meses distribui os pagamentos entre o primeiro e o segundo ano sem alterar o encargo total.",
    "Recovery sales = support amount ÷ gross margin. Recovery tonnes = recovery sales ÷ current revenue per tonne. These are incremental requirements, not all existing purchases. Tax, overhead, financing, discount rates, capacity constraints and working-capital requirements are excluded. No liability outcome or retention probability is assumed.":
      "Vendas de recuperação = valor do apoio ÷ margem bruta. Toneladas de recuperação = vendas de recuperação ÷ receita atual por tonelada. São necessidades incrementais, não todas as compras existentes. Impostos, despesas gerais, financiamento, taxas de desconto, restrições de capacidade e necessidades de capital de giro estão excluídos. Nenhum resultado de responsabilidade nem probabilidade de retenção é presumido.",
    "Default assumptions restored": "Premissas padrão restauradas",
    "Support assumptions restored": "Premissas de apoio restauradas",
    "Export downloaded": "Exportação baixada",

    /* Ask the business */
    "A CONVERSATION WITH YOUR PORTFOLIO": "UMA CONVERSA COM A SUA CARTEIRA",
    "Go from a business question to the evidence behind it.":
      "Vá de uma pergunta de negócio às evidências por trás dela.",
    "What deserves a closer look?": "O que merece um olhar mais atento?",
    "Explore performance, commercial trade-offs and the relationships worth investing in.":
      "Explore o desempenho, as trocas comerciais e os relacionamentos que valem o investimento.",
    "Which customers are growing fastest?":
      "Quais clientes estão crescendo mais rápido?",
    "Which relationships could justify absorbing a short-term loss?":
      "Quais relacionamentos poderiam justificar absorver uma perda de curto prazo?",
    "Which accounts have margin pressure?":
      "Quais contas têm pressão de margem?",
    "Which customers buy the highest-value products?":
      "Quais clientes compram os produtos de maior valor?",
    "Your business question": "Sua pergunta de negócio",
    "Ask a question about your strategic accounts…":
      "Faça uma pergunta sobre suas contas estratégicas…",
    Ask: "Perguntar",
    "Local analysis · no language model connected":
      "Análise local · nenhum modelo de linguagem conectado",
    "Connected AI · grounded in portfolio data":
      "IA conectada · baseada nos dados da carteira",
    "Enter to ask · Shift + Enter for a new line":
      "Enter para perguntar · Shift + Enter para nova linha",
    "Grounded in your records": "Baseado nos seus registros",
    "Every perspective starts with evidence.":
      "Toda perspectiva começa com evidências.",
    "Account portfolio": "Carteira de contas",
    "8 strategic relationships": "8 relacionamentos estratégicos",
    "Order history": "Histórico de pedidos",
    "288 records · 3 years": "288 registros · 3 anos",
    "Commercial pipeline": "Pipeline comercial",
    "6 open opportunities": "6 oportunidades abertas",
    "Relationship notes": "Notas de relacionamento",
    "16 commercial observations": "16 observações comerciais",
    "Ask for a perspective, then inspect the underlying account. Assumptions and uncertainty belong in the conversation.":
      "Peça uma perspectiva e depois inspecione a conta que a sustenta. Premissas e incertezas fazem parte da conversa.",
    "Reviewing the portfolio evidence…":
      "Analisando as evidências da carteira…",
    "AI-GENERATED ANALYSIS": "ANÁLISE GERADA POR IA",
    "COMPUTED PORTFOLIO ANALYSIS": "ANÁLISE CALCULADA DA CARTEIRA",
    "Source account": "Conta de origem",
    Margin: "Margem",
    Premium: "Premium",
    "Sources: 2025 & 2024 order ledger · account product mix · opportunities · relationship notes":
      "Fontes: livro de pedidos de 2025 e 2024 · mix de produtos da conta · oportunidades · notas de relacionamento",
    "Your question is preserved. Try again in a moment.":
      "Sua pergunta foi preservada. Tente novamente em instantes.",
    "Analysis is temporarily unavailable.":
      "A análise está temporariamente indisponível.",
    "These accounts combine growth, pipeline, specialty-grade purchases and payment quality. Atlas has a fictional one-time settlement request; the others do not. Support should be considered alongside customer commitments, technical evidence and cash capacity. A score does not establish causation or justify automatic approval.":
      "Estas contas combinam crescimento, pipeline, compras de grades especiais e qualidade de pagamento. A Atlas tem um pedido fictício de acordo pontual; as demais não. O apoio deve ser considerado junto com os compromissos do cliente, as evidências técnicas e a capacidade de caixa. Uma pontuação não estabelece causalidade nem justifica aprovação automática.",
    "Gross margins are calculated from recorded revenue less cost. Nova Refractories has a 5.3 percentage-point year-over-year margin decline alongside positive revenue growth.":
      "As margens brutas são calculadas a partir da receita registrada menos o custo. A Nova Refractories tem uma queda anual de margem de 5.3 pontos percentuais, apesar do crescimento positivo da receita.",
    "Ranked by 2025 revenue growth against 2024, calculated from the synthetic order ledger.":
      "Classificadas pelo crescimento da receita de 2025 em relação a 2024, calculado a partir do livro de pedidos sintético.",
    "Specialty share uses an explicit product classification in the synthetic dataset. Atlas purchases only high-added-value specialty grades. This is a demo classification, not a claim about actual product profitability or Grupo Curimbaba customer purchases.":
      "A participação de especialidades usa uma classificação explícita de produtos no conjunto de dados sintético. A Atlas compra apenas grades especiais de alto valor agregado. Esta é uma classificação de demonstração, não uma afirmação sobre a rentabilidade real dos produtos nem sobre compras de clientes do Grupo Curimbaba.",
    "The demo has no account-level emissions, safety, certification or succession evidence. Do not infer ESG performance from product type. Before financial support, an application specialist should validate product requirements, Finance should review cash exposure, and Operations should confirm capacity and delivery commitments. These are open review questions, not measured risk scores.":
      "A demonstração não tem evidências de emissões, segurança, certificação ou sucessão no nível da conta. Não infira o desempenho ESG a partir do tipo de produto. Antes de qualquer apoio financeiro, um especialista de aplicação deve validar os requisitos do produto, as Finanças devem revisar a exposição de caixa e as Operações devem confirmar a capacidade e os compromissos de entrega. São questões de revisão em aberto, não pontuações de risco medidas.",
    "These accounts have a pending decision, margin pressure, payment concerns or declining revenue. Terra’s extended terms are flagged separately from historical payment quality.":
      "Estas contas têm uma decisão pendente, pressão de margem, preocupações com pagamento ou receita em queda. Os prazos estendidos da Terra são sinalizados separadamente da qualidade histórica de pagamento.",
    "Ranked by total 2025 revenue from the synthetic order ledger.":
      "Classificadas pela receita total de 2025 do livro de pedidos sintético.",
    "The local analysis supports revenue, growth, margins, premium products, payment risk and investment candidates. Try one of those topics, or name an account. For broader questions, connect a language model through the server configuration.":
      "A análise local cobre receita, crescimento, margens, produtos premium, risco de pagamento e candidatas a investimento. Tente um desses temas ou cite uma conta. Para perguntas mais amplas, conecte um modelo de linguagem pela configuração do servidor.",

    /* Morning brief */
    "YOUR EXECUTIVE READING ROOM": "SUA SALA DE LEITURA EXECUTIVA",
    "Good morning, Leonardo.": "Bom dia, Leonardo.",
    "Signals ranked from the current account records. Each item links to its supporting account evidence.":
      "Sinais classificados a partir dos registros atuais das contas. Cada item leva às evidências da conta que o sustenta.",
    "Portfolio snapshot": "Posição da carteira",
    "prioritized signals": "sinais priorizados",
    "pending decisions": "decisões pendentes",
    "reviewed by you": "revisados por você",
    "Derived from the 2025 snapshot": "Derivado da posição de 2025",
    "A support request needs an executive review.":
      "Um pedido de apoio precisa de revisão executiva.",
    "Revenue growth is not translating into margin.":
      "O crescimento da receita não está se traduzindo em margem.",
    "Recent payment timing has lengthened.":
      "O prazo recente de pagamento aumentou.",
    "Revenue is below the prior year.":
      "A receita está abaixo do ano anterior.",
    "An open opportunity could extend the relationship.":
      "Uma oportunidade aberta pode ampliar o relacionamento.",
    "Review the account’s latest performance signals.":
      "Revise os sinais de desempenho mais recentes da conta.",
    "Next consideration": "Próxima consideração",
    "Validate the technical claim, cash limit and customer commitments.":
      "Validar a alegação técnica, o limite de caixa e os compromissos do cliente.",
    "Review price, product mix and cost movements before renewal.":
      "Revisar preço, mix de produtos e variações de custo antes da renovação.",
    "Confirm the cause and quantify working-capital exposure.":
      "Confirmar a causa e quantificar a exposição de capital de giro.",
    "Check demand, customer plans and account economics.":
      "Verificar a demanda, os planos do cliente e a economia da conta.",
    "Validate timing, customer commitment and delivery capacity.":
      "Validar o prazo, o compromisso do cliente e a capacidade de entrega.",
    "Confirm the relationship note against current customer evidence.":
      "Confirmar a nota de relacionamento com as evidências atuais do cliente.",
    "Relationship notes, order ledger & opportunity pipeline":
      "Notas de relacionamento, livro de pedidos e pipeline de oportunidades",
    "2024 & 2025 synthetic order ledger":
      "Livro de pedidos sintético de 2024 e 2025",
    "2025 synthetic order ledger & relationship notes":
      "Livro de pedidos sintético de 2025 e notas de relacionamento",
    "Opportunity pipeline, product mix & order ledger":
      "Pipeline de oportunidades, mix de produtos e livro de pedidos",
    "Synthetic order ledger & relationship notes":
      "Livro de pedidos sintético e notas de relacionamento",
    "Open decision brief ↗": "Abrir resumo de decisão ↗",
    "Explore account ↗": "Explorar conta ↗",
    "✓ Reviewed": "✓ Revisado",
    "Mark reviewed": "Marcar como revisado",
    "THE LONGER VIEW": "A VISÃO DE LONGO PRAZO",
    "Today’s exception.": "A exceção de hoje.",
    "Tomorrow’s advantage.": "A vantagem de amanhã.",
    "Look for relationships where short-term performance tells only part of the story.":
      "Procure relacionamentos em que o desempenho de curto prazo conta apenas parte da história.",
    "Explore value radar ↗": "Explorar o radar de valor ↗",
    "Your review stays here": "Sua revisão fica aqui",
    "Review marks are saved in this browser. They do not approve a commercial decision or notify anyone.":
      "As marcações de revisão são salvas neste navegador. Elas não aprovam nenhuma decisão comercial nem notificam ninguém.",
    "Browser storage unavailable; marks last for this visit.":
      "Armazenamento do navegador indisponível; as marcações duram apenas nesta visita.",

    /* Decision brief */
    "STRATEGIC RELATIONSHIP · DECISION BRIEF":
      "RELACIONAMENTO ESTRATÉGICO · RESUMO DE DECISÃO",
    "A loss today. Value over time?":
      "Uma perda hoje. Valor ao longo do tempo?",
    "↓ Print / save PDF": "↓ Imprimir / salvar PDF",
    "COMMERCIAL SUPPORT REQUEST": "PEDIDO DE APOIO COMERCIAL",
    "ILLUSTRATIVE SUPPORT SCENARIO": "CENÁRIO ILUSTRATIVO DE APOIO",
    "Should we absorb a claimed loss to support this relationship?":
      "Devemos absorver uma perda alegada para apoiar este relacionamento?",
    "What evidence would justify exceptional support?":
      "Que evidências justificariam um apoio excepcional?",
    "A fictional specialty-abrasives customer requests $350K, payable over 12 months. The synthetic technical review reports material within specification; the cause of the claimed process loss remains unresolved.":
      "Um cliente fictício de abrasivos especiais solicita $350K, pagos em 12 meses. A revisão técnica sintética indica material dentro da especificação; a causa da alegada perda de processo continua sem solução.",
    "No support request is recorded for this account. The $350K case below is a what-if analysis only.":
      "Nenhum pedido de apoio está registrado para esta conta. O caso de $350K abaixo é apenas uma análise hipotética.",
    "Evidence gathering": "Coleta de evidências",
    "specialty-grade purchases": "compras de grades especiais",
    "annual revenue growth": "crescimento anual da receita",
    "uncommitted opportunity pipeline":
      "pipeline de oportunidades sem compromisso",
    "One-time commitment": "Compromisso pontual",
    "Fictional support amount": "Valor fictício de apoio",
    "Monthly cash payments": "Pagamentos mensais de caixa",
    "12 equal installments": "12 parcelas iguais",
    "Incremental sales to recover": "Vendas incrementais para recuperar",
    "At current gross margin and mix": "Na margem bruta e no mix atuais",
    "Current gross profit / tonne": "Lucro bruto atual / tonelada",
    "Illustrative volume · not EBITDA": "Volume ilustrativo · não é EBITDA",
    "Executive assessment": "Avaliação executiva",
    "Bring the evidence together. Preserve the judgment.":
      "Reúna as evidências. Preserve o julgamento.",
    "↻ Generate assessment": "↻ Gerar avaliação",
    "Computed from the current account records":
      "Calculado a partir dos registros atuais da conta",
    "Reviewing the account evidence…": "Analisando as evidências da conta…",
    "AI assessment generated · validate against sources":
      "Avaliação de IA gerada · valide com as fontes",
    "Assessment refreshed from synthetic source records":
      "Avaliação atualizada a partir dos registros de origem sintéticos",
    "What is known — and what is not": "O que se sabe — e o que não se sabe",
    "Keep assumptions visible": "Mantenha as premissas visíveis",
    "Recorded in the demo": "Registrado na demonstração",
    "Orders, product classification, historic margin and commercial notes.":
      "Pedidos, classificação de produtos, margem histórica e notas comerciais.",
    Unverified: "Não verificado",
    "Expansion timing, future demand, claim causation and purchase commitments.":
      "Prazo da expansão, demanda futura, causa da alegação e compromissos de compra.",
    "Executive judgment": "Julgamento executivo",
    "Trust, strategic importance, precedent and willingness to accept a near-term loss.":
      "Confiança, importância estratégica, precedente e disposição de aceitar uma perda de curto prazo.",
    "TEST THE DOWNSIDE": "TESTE O CENÁRIO ADVERSO",
    "What if support does not lead to growth?":
      "E se o apoio não levar ao crescimento?",
    "Change the commitment, installments and volume assumptions. See what remains at risk.":
      "Altere o compromisso, as parcelas e as premissas de volume. Veja o que continua em risco.",
    "Open relationship-support model ↗":
      "Abrir modelo de apoio ao relacionamento ↗",
    "The executive’s judgment": "O julgamento do executivo",
    "Capture the conditions under which this relationship merits support.":
      "Registre as condições em que este relacionamento merece apoio.",
    "Current perspective": "Perspectiva atual",
    "Consider conditional support": "Considerar apoio condicional",
    "Defer pending evidence": "Adiar até haver evidências",
    "Do not support on current evidence": "Não apoiar com as evidências atuais",
    "Reasoning & conditions": "Raciocínio e condições",
    "What do you know about this customer that the numbers do not show?":
      "O que você sabe sobre este cliente que os números não mostram?",
    "Save review notes": "Salvar notas da revisão",
    "Saved in this browser": "Salvo neste navegador",
    "Browser storage unavailable. Copy your notes before leaving.":
      "Armazenamento do navegador indisponível. Copie suas notas antes de sair.",
    "Evidence still needed": "Evidências ainda necessárias",
    "Application specialist": "Especialista de aplicação",
    "Review the technical claim and qualification requirements.":
      "Revisar a alegação técnica e os requisitos de qualificação.",
    Finance: "Finanças",
    "Validate cash headroom and a maximum support commitment.":
      "Validar a folga de caixa e um compromisso máximo de apoio.",
    "Commercial lead": "Líder comercial",
    "Confirm demand, milestones and the decision owner.":
      "Confirmar a demanda, os marcos e o responsável pela decisão.",
    "Operations & ESG": "Operações e ESG",
    "Verify capacity, delivery, safety and environmental requirements. No account-level ESG evidence is included.":
      "Verificar capacidade, entrega, segurança e requisitos ambientais. Nenhuma evidência ESG no nível da conta está incluída.",
    "Record a decision and follow-up":
      "Registrar uma decisão e o acompanhamento",
    "Keep the decision, owner, conditions and later result together. This record stays in this browser.":
      "Mantenha juntos a decisão, o responsável, as condições e o resultado posterior. Este registro fica neste navegador.",
    Decision: "Decisão",
    Pending: "Pendente",
    "Support approved": "Apoio aprovado",
    "Support declined": "Apoio recusado",
    Deferred: "Adiado",
    Other: "Outro",
    "Decision owner": "Responsável pela decisão",
    "Name or role": "Nome ou função",
    "Decision date": "Data da decisão",
    "Outcome status": "Situação do resultado",
    "Awaiting outcome": "Aguardando resultado",
    "Outcome reviewed": "Resultado revisado",
    "Conditions and rationale": "Condições e justificativa",
    "What was decided, why, and under what conditions?":
      "O que foi decidido, por quê e em que condições?",
    "Follow-up outcome / learning": "Resultado do acompanhamento / aprendizado",
    "Update later with realized sales, margin, payment, retention, or lessons.":
      "Atualize depois com vendas, margem, pagamento, retenção ou lições realizadas.",
    "Save decision record": "Salvar registro da decisão",
    "Decision record saved in this browser":
      "Registro da decisão salvo neste navegador",
    "Browser storage unavailable; copy the record before leaving.":
      "Armazenamento do navegador indisponível; copie o registro antes de sair.",
    "Editing saved record": "Editando registro salvo",
    "Conditions:": "Condições:",
    "Outcome:": "Resultado:",
    "None recorded": "Nenhuma registrada",
    "Not yet recorded": "Ainda não registrado",
    "Date not set": "Data não definida",
    "Owner not recorded": "Responsável não registrado",
    "Update outcome": "Atualizar resultado",
    "No decisions recorded yet.": "Nenhuma decisão registrada ainda.",
    "Browser-local demonstration record; it is not an approval workflow, shared database or notification.":
      "Registro de demonstração local do navegador; não é um fluxo de aprovação, banco de dados compartilhado nem notificação.",
  };

  const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const names = (typeof Model !== "undefined" ? Model.accounts : [])
    .map((c) => escapeRe(c.name))
    .join("|");
  const OUTCOME = /^(Awaiting outcome|Outcome reviewed)$/;
  const R = [
    [/^(\d+) strategic accounts$/, (n) => `${n} contas estratégicas`],
    [
      /^Showing (\d+) of (\d+) strategic accounts$/,
      (a, b) => `Exibindo ${a} de ${b} contas estratégicas`,
    ],
    [/^(\d+) accounts$/, (n) => `${n} contas`],
    [/^(\d+)-year relationship$/, (n) => `relacionamento de ${n} anos`],
    [/^([−-]?\$[\d.,]+[MK]?) gross profit$/, (a) => `${a} de lucro bruto`],
    [
      /^(\d+) decisions? pending$/,
      (n) => `${n} ${n === "1" ? "decisão pendente" : "decisões pendentes"}`,
    ],
    [
      /^(\d+)% specialty mix · (.+)\/month for (\d+) months$/,
      (p, m, n) => `${p}% de mix de especialidades · ${m}/mês por ${n} meses`,
    ],
    [
      /^(.+) · Account 360 · FY 2025$/,
      (a) => `${tr(a)} · Conta 360 · Exercício 2025`,
    ],
    [/^(\d+) years$/, (n) => `${n} anos`],
    [
      /^Illustrative revenue run-rate in (\d+) years$/,
      (n) => `Run-rate de receita ilustrativo em ${n} anos`,
    ],
    [
      /^If the latest observed annual growth rate repeats for three years, 2025 revenue of (.+) would imply a run-rate of$/,
      (a) =>
        `Se a última taxa de crescimento anual observada se repetir por três anos, a receita de 2025 de ${a} implicaria um run-rate de`,
    ],
    [/^(\d{4}) revenue$/, (y) => `Receita ${y}`],
    [
      /^(\d+) open · (.+) unweighted pipeline$/,
      (n, a) => `${n} em aberto · ${a} de pipeline não ponderado`,
    ],
    [/^(\d+) days?$/, (n) => `${n} ${n === "1" ? "dia" : "dias"}`],
    [
      /^(.+) contributes (.+) in annual gross profit, with (.+)% revenue growth and (.+) in open opportunities\.$/,
      (a, b, c, d) =>
        `${a} contribui com ${b} em lucro bruto anual, com crescimento de receita de ${c}% e ${d} em oportunidades abertas.`,
    ],
    [/^(\d+) months$/, (n) => `${n} meses`],
    [/^(\d+) equal monthly payments$/, (n) => `${n} pagamentos mensais iguais`],
    [
      /^(.+) additional tonnes at current mix$/,
      (a) => `${a} toneladas adicionais no mix atual`,
    ],
    [/^Total support: (.+)$/, (a) => `Apoio total: ${a}`],
    [/^Year (\d)$/, (n) => `Ano ${n}`],
    [
      /^Explain (.+), current value (\d+), future potential (\d+)$/,
      (a, b, c) => `Explicar ${a}, valor atual ${b}, potencial futuro ${c}`,
    ],
    [/^(.+): (\d+)%$/, (a, n) => `${tr(a)}: ${n}%`],
    [/^Decision history · (\d+)$/, (n) => `Histórico de decisões · ${n}`],
    [
      /^(.*) · (.*) · (Awaiting outcome|Outcome reviewed)$/,
      (a, b, c) => [tr(a), tr(b), tr(c)].join(" · "),
    ],
    [/^Source: (.+)$/, (a) => `Fonte: ${tr(a)}`],
    [
      /^(.+) · Advisory perspective for executive discussion$/,
      (a) => `${a} · Perspectiva consultiva para discussão executiva`,
    ],
    [
      /^Revenue changed (\S+)% year over year at a (\S+)% gross margin\. (.+)$/,
      (g, m, n) =>
        `A receita variou ${g}% em relação ao ano anterior, com margem bruta de ${m}%. ${tr(n)}`,
    ],
    [
      /^A fictional \$350K one-time settlement is under consideration\. Revenue grew (\S+)%, specialty purchases are (\S+)%, and (\S+) of pipeline remains uncommitted\.$/,
      (g, p, pipe) =>
        `Um acordo pontual fictício de $350K está em análise. A receita cresceu ${g}%, as compras de especialidades somam ${p}% e ${pipe} de pipeline continua sem compromisso.`,
    ],
    [
      /^Revenue changed (\S+)% year over year while gross margin moved (\S+) points to (\S+)%\.$/,
      (g, d, m) =>
        `A receita variou ${g}% em relação ao ano anterior, enquanto a margem bruta variou ${d} pontos, para ${m}%.`,
    ],
    [
      /^Latest three 2025 records average (\d+) days against a (\d+)-day annual average\. Revenue grew (\S+)%\.$/,
      (a, b, g) =>
        `Os três últimos registros de 2025 têm média de ${a} dias, contra uma média anual de ${b} dias. A receita cresceu ${g}%.`,
    ],
    [
      /^2025 revenue changed (\S+)% year over year; gross margin is (\S+)%\. (?:(\S+) in pipeline is unweighted\.|No open pipeline is recorded\.)$/,
      (g, m, pipe) =>
        `A receita de 2025 variou ${g}% em relação ao ano anterior; a margem bruta é de ${m}%. ${pipe ? `${pipe} em pipeline não são ponderados.` : "Nenhum pipeline aberto está registrado."}`,
    ],
    [
      /^(\S+) of unweighted pipeline is recorded alongside (\S+)% revenue growth and (\S+)% specialty mix\.$/,
      (pipe, g, p) =>
        `${pipe} de pipeline não ponderado estão registrados, junto com crescimento de receita de ${g}% e mix de especialidades de ${p}%.`,
    ],
  ];
  if (names) R.push([new RegExp(`^Open (${names})$`), (a) => `Abrir ${a}`]);

  function tr(s) {
    if (Object.prototype.hasOwnProperty.call(D, s)) return D[s];
    for (const [re, fn] of R) {
      const m = re.exec(s);
      if (m) return fn(...m.slice(1));
    }
    return s;
  }
  // Translate a string, keeping its surrounding whitespace. English mode is a no-op.
  function t(str) {
    if (lang !== "pt" || typeof str !== "string") return str;
    const m = /^(\s*)([\s\S]*?)(\s*)$/.exec(str);
    const core = m[2].replace(/\s+/g, " ");
    if (!core) return str;
    const out = tr(core);
    return out === core ? str : m[1] + out + m[3];
  }
  // 1,234.5 -> 1.234,5
  const localize = (s) =>
    s.replace(/(\d)([.,])(?=\d)/g, (_, d, p) => d + (p === "." ? "," : "."));

  /* Portuguese prose for the generated brief and computed answers. */
  function briefPt(c) {
    const s = Model.support(c),
      m = Model.money,
      sg = Model.signed;
    const n = c.opportunities.length;
    const opp = n
      ? `${n === 1 ? "1 oportunidade aberta soma" : `${n} oportunidades abertas somam`} ${m(c.pipeline)} em pipeline não ponderado. ${n === 1 ? "Indica" : "Indicam"} demanda potencial, não pedidos assinados nem prova de que o apoio financeiro causará retenção.`
      : "Não há oportunidades abertas registradas. Não existe pipeline de expansão documentado que sustente uma tese de investimento.";
    return `${c.name} gerou ${m(c.revenue)} de receita em 2025, com margem bruta de ${c.margin.toFixed(1)}% e crescimento de ${sg(c.growth)}% em relação ao ano anterior. As grades especiais representam ${c.premium}% do mix de produtos sintético. Esses são os sinais de compra a examinar junto com o conhecimento pessoal do cliente. [Pedidos; mix de produtos da conta]\n\n${c.notes.map(tr).join(" ")} [Notas de relacionamento]\n\n${opp} [Oportunidades]\n\n${c.id === 1 ? "O acordo pontual solicitado, de" : "Um acordo pontual ilustrativo de"} ${m(s.amount)}, geraria ${m(s.monthlyCash)} em pagamentos mensais de caixa ao longo de ${s.months} meses. Com o mix de produtos e a margem bruta atuais, a recuperação exige ${m(s.recoveryRevenue)} em vendas adicionais, ou cerca de ${Math.ceil(s.recoveryTonnes).toLocaleString("en-US")} toneladas adicionais. Trata-se de recuperação de lucro bruto antes de despesas gerais, impostos, financiamento e capital de giro; não é EBITDA nem uma projeção. [Cálculo do cenário]\n\nCom o aumento ilustrativo de 20% no volume do terceiro ano, o lucro bruto de três anos menos o apoio varia ${m(s.profitDelta)} em relação a uma referência de relacionamento inalterado. Se o volume, em vez disso, permanecer 30% abaixo da referência após o apoio, o resultado de três anos cai para ${m(s.downside)}. Nenhum dos caminhos recebe probabilidade, e a referência sem apoio não pressupõe que o cliente irá embora. [Cálculo do cenário]\n\nAntes de decidir, valide o crescimento do cliente com compromissos de compra, revise a alegação técnica com o especialista de aplicação, defina com as Finanças um limite de exposição de caixa e registre o responsável pela decisão comercial. Não há evidências ambientais, de segurança ou de entrega. A perspectiva consultiva informa a discussão; o executivo autorizado mantém a decisão.`;
  }
  const hints = [
    [/cresc/, "growth"],
    [/margem|lucro/, "margin profit"],
    [/pressao|queda|declinio|reducao/, "pressure declin"],
    [
      /absorv|perda|curto prazo|concessao|sacrific|investi|longo prazo|valor futuro|acordo|apoio|suporte/,
      "absorb loss short-term support",
    ],
    [/premium|especia|maior valor|alto valor|produto/, "premium product"],
    [/caixa|capital de giro|tonelada|tonelagem/, "cash working capital tonne"],
    [
      /esg|ambient|seguranca|emiss|sucessao|especialista/,
      "esg environment safety",
    ],
    [/pagamento|risco|atencao/, "payment risk attention"],
    [/receita|vendas|faturamento|maior receita/, "revenue sales"],
  ];
  const plain = (q) => q.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  function installModel() {
    if (typeof Model === "undefined") return;
    const brief = Model.brief,
      answer = Model.answer;
    Model.brief = (c) => (lang === "pt" ? briefPt(c) : brief(c));
    Model.answer = (question) => {
      if (lang !== "pt") return answer(question);
      const p = plain(question);
      const extra = hints
        .filter(([re]) => re.test(p))
        .map(([, h]) => h)
        .join(" ");
      const res = answer(`${question} ${extra}`);
      let text;
      if (res.metric === "Account overview") text = briefPt(res.accounts[0]);
      else if (res.metric === "Unit economics & cash exposure")
        text = res.accounts
          .slice(0, 5)
          .map(
            (c) =>
              `${c.name}: ${Model.money(c.profit / c.tonnes)} de lucro bruto por tonelada sobre ${c.tonnes.toLocaleString("en-US")} toneladas anuais sintéticas. ${c.id === 5 ? "Passar de 45 para 73 dias de prazo de pagamento implica cerca de " + Model.money((c.revenue / 365) * 28) + " a mais em recebíveis, com vendas diárias uniformes; é uma sensibilidade, não um saldo registrado." : ""}`,
          )
          .join("\n\n");
      else text = tr(res.text);
      return { ...res, text };
    };
  }
  installModel();

  /* DOM translation */
  const SKIP = new Set(["SCRIPT", "STYLE", "TEXTAREA", "NOSCRIPT"]);
  const ATTRS = ["placeholder", "aria-label", "title", "alt"];
  const writtenText = new WeakMap();
  const writtenAttr = new WeakMap();
  const xlate = (s) => localize(t(s));
  function text(node) {
    const v = node.nodeValue;
    if (writtenText.get(node) === v || !v.trim()) return;
    const out = xlate(v);
    if (out !== v) node.nodeValue = out;
    writtenText.set(node, node.nodeValue);
  }
  function attr(el, name) {
    const v = el.getAttribute(name);
    const seen = writtenAttr.get(el);
    if (v === null || (seen && seen[name] === v)) return;
    const out = xlate(v);
    if (out !== v) el.setAttribute(name, out);
    writtenAttr.set(el, { ...seen, [name]: el.getAttribute(name) });
  }
  function walk(root) {
    if (root.nodeType === 3) {
      if (root.parentNode && !SKIP.has(root.parentNode.nodeName)) text(root);
      return;
    }
    if (root.nodeType !== 1 || SKIP.has(root.nodeName)) return;
    const w = document.createTreeWalker(root, 1 | 4);
    for (let n = w.currentNode; n; n = w.nextNode()) {
      if (n.nodeType === 3) {
        if (!SKIP.has(n.parentNode.nodeName)) text(n);
      } else ATTRS.forEach((a) => attr(n, a));
    }
  }
  function observe() {
    new MutationObserver((records) => {
      for (const r of records) {
        if (r.type === "childList") r.addedNodes.forEach(walk);
        else if (r.type === "characterData") walk(r.target);
        else if (r.type === "attributes") attr(r.target, r.attributeName);
      }
    }).observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ATTRS,
    });
  }

  function toggle() {
    const bar = document.querySelector(".topbar-right");
    if (!bar) return;
    const group = document.createElement("div");
    group.className = "lang-toggle";
    group.setAttribute("role", "group");
    group.setAttribute("aria-label", "Language");
    [
      ["en", "EN", "English"],
      ["pt", "PT", "Português"],
    ].forEach(([code, label, name]) => {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = label;
      b.lang = code;
      b.title = name;
      b.setAttribute("aria-label", name);
      b.setAttribute("aria-pressed", String(code === lang));
      b.onclick = () => {
        if (code === lang) return;
        try {
          localStorage.setItem(KEY, code);
        } catch {}
        const url = new URL(location.href);
        url.searchParams.delete("lang");
        location.href = url.href;
      };
      group.append(b);
    });
    bar.prepend(group);
  }

  function init() {
    toggle();
    if (lang !== "pt") return;
    document.documentElement.lang = "pt-BR";
    document.title = xlate(document.title);
    walk(document.body);
    observe();
  }
  // Deferred scripts run in order before DOMContentLoaded, so app.js has rendered by then.
  document.addEventListener("DOMContentLoaded", init);

  window.I18N = { lang, t, localize };
})();
