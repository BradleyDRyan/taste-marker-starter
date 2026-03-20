import {
  BellSimple,
  CaretDown,
  CaretUp,
  ChartLineUp,
  Circle,
  CurrencyDollar,
  FolderSimple,
  FunnelSimple,
  Gauge,
  HouseSimple,
  MagnifyingGlass,
  Package,
  TrendDown,
  TrendUp,
  Users,
  GearSix,
} from "@phosphor-icons/react";

const navItems = [
  { label: "Overview", icon: HouseSimple, active: true },
  { label: "Teams", icon: Users },
  { label: "Models", icon: Package },
  { label: "Departments", icon: FolderSimple },
  { label: "Settings", icon: GearSix },
];

const tokenTrend = [
  { day: "Mon", budget: 62, usage: 74, cost: 1.22, sessions: 420 },
  { day: "Tue", budget: 65, usage: 70, cost: 1.31, sessions: 380 },
  { day: "Wed", budget: 68, usage: 79, cost: 1.52, sessions: 470 },
  { day: "Thu", budget: 64, usage: 82, cost: 1.61, sessions: 519 },
  { day: "Fri", budget: 70, usage: 88, cost: 1.94, sessions: 603 },
  { day: "Sat", budget: 67, usage: 91, cost: 2.11, sessions: 645 },
  { day: "Sun", budget: 71, usage: 86, cost: 2.03, sessions: 587 },
];

const kpis = [
  {
    label: "Tokens consumed",
    value: "1,894,320",
    delta: "+18.4%",
    tone: "up",
    detail: "vs previous week",
  },
  {
    label: "AI spend",
    value: "$12.9k",
    delta: "+14.9%",
    tone: "up",
    detail: "accelerated after automation rollout",
  },
  {
    label: "Budget health",
    value: "62% used",
    delta: "21 days left",
    tone: "neutral",
    detail: "pacing on track for quarter",
  },
  {
    label: "Avg efficiency",
    value: "14.7 tok/$",
    delta: "-6.3%",
    tone: "down",
    detail: "leaner prompts in Sales",
  },
];

const departments = [
  {
    team: "Research",
    tokens: 482_100,
    budget: 34,
    pace: "+31%",
    trend: "warning",
    note: "High experimentation volume from model evaluations",
  },
  {
    team: "Sales",
    tokens: 376_430,
    budget: 18,
    pace: "+22%",
    trend: "warning",
    note: "Bulk draft generation increased this sprint",
  },
  {
    team: "Support",
    tokens: 244_890,
    budget: 14,
    pace: "+4%",
    trend: "healthy",
    note: "Steady usage after policy tuning",
  },
  {
    team: "Product",
    tokens: 201_440,
    budget: 11,
    pace: "-8%",
    trend: "healthy",
    note: "Feature launches reduced fallback calls",
  },
];

const modelSnapshot = [
  {
    model: "gpt-5.1",
    spend: "$5.1k",
    median: "1,140",
    pace: "+9%",
    confidence: "High",
  },
  {
    model: "Gemini 2.0",
    spend: "$3.6k",
    median: "980",
    pace: "+17%",
    confidence: "Medium",
  },
  {
    model: "Claude Opus",
    spend: "$2.8k",
    median: "1,020",
    pace: "-4%",
    confidence: "High",
  },
  {
    model: "Llama 4",
    spend: "$1.4k",
    median: "870",
    pace: "-12%",
    confidence: "Low",
  },
];

const rows = [
  {
    requestId: "AI-2047",
    employee: "Lena Ortiz",
    team: "Research",
    model: "gpt-5.1",
    tokens: "84,920",
    tokensPerMinute: "1.31k",
    status: "Watch",
    state: "warning",
  },
  {
    requestId: "AI-2048",
    employee: "Noah Patel",
    team: "Support",
    model: "Gemini 2.0",
    tokens: "58,740",
    tokensPerMinute: "890",
    status: "Healthy",
    state: "healthy",
  },
  {
    requestId: "AI-2049",
    employee: "Maya Chen",
    team: "Sales",
    model: "Claude Opus",
    tokens: "92,310",
    tokensPerMinute: "1.52k",
    status: "Healthy",
    state: "healthy",
  },
  {
    requestId: "AI-2050",
    employee: "David Kim",
    team: "Product",
    model: "Llama 4",
    tokens: "27,130",
    tokensPerMinute: "610",
    status: "Review",
    state: "danger",
  },
  {
    requestId: "AI-2051",
    employee: "Sara López",
    team: "Research",
    model: "gpt-5.1",
    tokens: "41,980",
    tokensPerMinute: "1.02k",
    status: "Watch",
    state: "warning",
  },
];

const formatCompact = (value: number) =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value);

export default function Page() {
  const topTeam = departments.sort((a, b) => b.budget - a.budget)[0];

  return (
    <div className="dashboard-shell">
      <div className="dashboard-shell-inner dashboard-stack">
        <div className="dashboard-layout dashboard-stack">
          <aside className="dashboard-nav dashboard-panel" aria-label="Primary navigation">
            <div className="dashboard-nav-brand">
              <p className="dashboard-nav-brand-kicker">Operations workspace</p>
              <h2 className="dashboard-nav-brand-title">Northlight AI</h2>
              <p className="dashboard-nav-brand-subtitle">Employee token governance</p>
            </div>

            <ul className="dashboard-nav-list">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.label}>
                    <a
                      href="#"
                      className={`dashboard-nav-item ${item.active ? "dashboard-nav-item--active" : ""}`}
                    >
                      <Icon
                        size="var(--lui-appnav-icon-size)"
                        weight={item.active ? "fill" : "regular"}
                      />
                      <span>{item.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </aside>

          <main className="dashboard-content dashboard-stack">
            <header className="dashboard-toolbar dashboard-panel">
              <div>
                <p className="dashboard-kpi-label">Dashboard</p>
                <h1 className="dashboard-title">Employee AI Token Usage</h1>
                <p className="dashboard-subtitle">Monitor momentum, budget risk, and where spend is actually moving.</p>
              </div>
              <button className="dashboard-alert" type="button" aria-label="Open alerts">
                <BellSimple size="1.05rem" weight="bold" />
                Alert queue
                <span className="dashboard-alert-dot">3</span>
              </button>
            </header>

            <section className="dashboard-toolbar-controls dashboard-panel">
              <label className="dashboard-search" htmlFor="dashboard-search">
                <MagnifyingGlass size="1.05rem" />
                <input
                  id="dashboard-search"
                  className="dashboard-search-input"
                  placeholder="Search employee, model, request, or team"
                />
              </label>
              <label className="dashboard-filter-chip" htmlFor="filter">
                <FunnelSimple size="1rem" />
                <select id="filter" className="dashboard-filter-select" defaultValue="7">
                  <option value="7">Last 7 days</option>
                  <option value="14">Last 14 days</option>
                  <option value="30">Last 30 days</option>
                  <option value="90">Quarter to date</option>
                </select>
              </label>
              <span className="dashboard-inline-chip dashboard-inline-chip--ok">
                <Circle size="0.7rem" weight="fill" />
                Live environments only
              </span>
            </section>

            <section className="dashboard-primary-grid">
              <article className="dashboard-panel dashboard-hero">
                <div className="dashboard-hero-head">
                  <p className="dashboard-kpi-label">Token burn rate</p>
                  <h2 className="dashboard-section-title">Pulse by day</h2>
                  <p className="dashboard-subtitle">
                    {topTeam.team} is driving the largest budget pressure this week.
                  </p>
                </div>

                <div className="dashboard-pulse-grid" aria-label="Weekly token burn and budget usage">
                  {tokenTrend.map((point) => {
                    const budgetHeight = `${point.budget}%`;
                    const usageHeight = `${point.usage}%`;
                    return (
                      <div key={point.day} className="dashboard-pulse-col">
                        <div className="dashboard-pulse-track">
                          <span
                            className="dashboard-pulse-budget"
                            style={{ height: budgetHeight }}
                            aria-hidden="true"
                          />
                          <span
                            className={`dashboard-pulse-actual ${point.usage >= point.budget ? "dashboard-pulse-actual--warn" : ""}`}
                            style={{ height: usageHeight }}
                            aria-hidden="true"
                          />
                        </div>
                        <span className="dashboard-chart-day">{point.day}</span>
                        <span className="dashboard-chart-sub">{point.cost}M</span>
                      </div>
                    );
                  })}
                </div>

                <div className="dashboard-hero-footer">
                  <p>
                    Total usage today: <strong>{formatCompact(294420)} tokens</strong>
                  </p>
                  <p className="dashboard-kpi-label">Budget utilization: 62% · 21 sessions/day trend</p>
                </div>
              </article>

              <div className="dashboard-stack">
                <article className="dashboard-panel">
                  <p className="dashboard-kpi-label">Department watchlist</p>
                  <div className="dashboard-stack" style={{ gap: "0.7rem" }}>
                    {departments.slice(0, 2).map((item) => (
                      <div key={item.team} className="department-card">
                        <div>
                          <p className="dashboard-kpi-label">{item.team}</p>
                          <p className="dashboard-kpi-value">{formatCompact(item.tokens)} tokens</p>
                        </div>
                        <span
                          className={`dashboard-status ${
                            item.trend === "warning" ? "dashboard-status--warn" : "dashboard-status--ok"
                          }`}
                        >
                          {item.pace}
                        </span>
                      </div>
                    ))}
                  </div>
                </article>

                <article className="dashboard-panel">
                  <p className="dashboard-kpi-label">Model shift</p>
                  <div className="dashboard-model-list">
                    {modelSnapshot.map((model, idx) => (
                      <div key={model.model} className="model-row">
                        <div className="model-icon">
                          <Gauge size="1rem" />
                        </div>
                        <div>
                          <p className="dashboard-kpi-label">{model.model}</p>
                          <p className="dashboard-subtitle">Median tokens: {model.median}</p>
                        </div>
                        <div className="model-row-meta">
                          <p>{model.spend}</p>
                          <span
                            className={`dashboard-status ${
                              model.pace.startsWith("-") ? "dashboard-status--ok" : "dashboard-status--warn"
                            }`}
                          >
                            {model.pace}
                          </span>
                        </div>
                        {idx !== modelSnapshot.length - 1 ? <div className="model-sep" /> : null}
                      </div>
                    ))}
                  </div>
                </article>
              </div>
            </section>

            <section className="dashboard-kpi-grid">
              {kpis.map((metric) => (
                <article key={metric.label} className="dashboard-panel dashboard-kpi-card">
                  <p className="dashboard-kpi-label">{metric.label}</p>
                  <p className="dashboard-kpi-value">{metric.value}</p>
                  <div className="dashboard-kpi-foot">
                    <span
                      className={`dashboard-kpi-delta ${
                        metric.tone === "up"
                          ? "dashboard-status--warn"
                          : metric.tone === "down"
                            ? "dashboard-status--ok"
                            : "dashboard-status--muted"
                      }`}
                    >
                      {metric.tone === "up" ? (
                        <TrendUp size="1rem" />
                      ) : metric.tone === "down" ? (
                        <TrendDown size="1rem" />
                      ) : (
                        <Circle size="0.75rem" weight="fill" />
                      )}
                      {metric.delta}
                    </span>
                    <span className="dashboard-subtitle">{metric.detail}</span>
                  </div>
                </article>
              ))}
            </section>

            <section className="dashboard-duo-grid">
              <article className="dashboard-panel dashboard-feature">
                <div className="dashboard-duo-head">
                  <div>
                    <p className="dashboard-kpi-label">Risk / budget pacing</p>
                    <h2 className="dashboard-section-title">Which team needs action now</h2>
                  </div>
                  <CurrencyDollar size="1rem" />
                </div>
                <ul className="dashboard-stack">
                  {departments.map((team) => {
                    const share = Math.max(0, Math.min(100, (team.budget / 60) * 100));
                    return (
                      <li key={team.team} className="dashboard-stack">
                        <div className="risk-head">
                          <span className="dashboard-kpi-label">{team.team}</span>
                          <span className="dashboard-subtitle">{team.budget}% budget share</span>
                        </div>
                        <div className="dashboard-ratio-track">
                          <span
                            className={`dashboard-ratio-fill ${
                              team.trend === "warning" ? "dashboard-ratio-fill--warn" : "dashboard-ratio-fill--ok"
                            }`}
                            style={{ width: `${share}%` }}
                          />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </article>

              <article className="dashboard-panel dashboard-feature">
                <div className="dashboard-duo-head">
                  <div>
                    <p className="dashboard-kpi-label">Narrative</p>
                    <h2 className="dashboard-section-title">What changed this week</h2>
                  </div>
                  <ChartLineUp size="1rem" />
                </div>
                <p className="dashboard-subtitle">
                  Usage peaked over the weekend while query complexity increased. The strongest signal is Research and Sales
                  both overshooting spend forecasts. Recommend lowering max token caps for ad-hoc prompts and routing repetitive
                  tasks to cached responses.
                </p>

                <div className="dashboard-stack" style={{ marginTop: "0.75rem" }}>
                  <div className="dashboard-row-mini">
                    <CaretUp size="1rem" />
                    <span>Weekend experimentation rose +16% week-over-week.</span>
                  </div>
                  <div className="dashboard-row-mini">
                    <CaretDown size="1rem" />
                    <span>Average cost/token improved 6% from recent prompt trims.</span>
                  </div>
                  <div className="dashboard-row-mini">
                    {topTeam.trend === "warning" ? <TrendUp size="1rem" /> : <TrendDown size="1rem" />}
                    <span>Top team drift: {topTeam.team} at {formatCompact(topTeam.tokens)} tokens.</span>
                  </div>
                </div>
              </article>
            </section>

            <section className="dashboard-panel">
              <div className="dashboard-table-head">
                <h2 className="dashboard-section-title">Live request operations</h2>
                <button className="dashboard-inline-chip dashboard-inline-chip--plain" type="button">
                  Export rows
                </button>
              </div>

              <div className="dashboard-table-wrap">
                <table className="dashboard-table">
                  <thead>
                    <tr>
                      <th>Request</th>
                      <th>Employee</th>
                      <th>Team</th>
                      <th>Model</th>
                      <th>Tokens</th>
                      <th>Tokens/min</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row) => (
                      <tr key={row.requestId}>
                        <td>{row.requestId}</td>
                        <td>{row.employee}</td>
                        <td>{row.team}</td>
                        <td>
                          <span className="model-pill">{row.model}</span>
                        </td>
                        <td>{row.tokens}</td>
                        <td>{row.tokensPerMinute}</td>
                        <td>
                          <span
                            className={`dashboard-status ${
                              row.state === "healthy"
                                ? "dashboard-status--ok"
                                : row.state === "warning"
                                  ? "dashboard-status--warn"
                                  : "dashboard-status--danger"
                            }`}
                          >
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
