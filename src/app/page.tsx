const departmentStats = [
  {
    team: "Research & Strategy",
    model: "o4-mini + code-assist",
    used: 1_285_000,
    budget: 1_500_000,
    growth: "+18.3%",
    heat: "from-rose-500/30 to-amber-400/40",
  },
  {
    team: "Support & Ops",
    model: "GPT-4.1",
    used: 934_000,
    budget: 1_050_000,
    growth: "+7.4%",
    heat: "from-emerald-400/30 to-cyan-400/40",
  },
  {
    team: "Marketing Intelligence",
    model: "Claude Opus",
    used: 712_000,
    budget: 850_000,
    growth: "+22.1%",
    heat: "from-violet-500/30 to-sky-400/40",
  },
  {
    team: "Finance Automation",
    model: "Gemini 2.5",
    used: 498_000,
    budget: 650_000,
    growth: "+11.9%",
    heat: "from-teal-400/30 to-lime-400/40",
  },
  {
    team: "Product Engineering",
    model: "o4-mini",
    used: 392_000,
    budget: 620_000,
    growth: "+4.8%",
    heat: "from-blue-500/30 to-cyan-300/40",
  },
] as const;

const employeeLeaders = [
  {
    name: "Ari Singh",
    role: "AI Ops Engineer",
    used: 214_700,
    p95Latency: 312,
    budgetLeft: "14.8%",
    health: "Balanced",
    status: "Healthy",
    cost: "$6,842",
    utilization: 81,
  },
  {
    name: "Mia Torres",
    role: "Data Analyst",
    used: 182_900,
    p95Latency: 291,
    budgetLeft: "21.3%",
    health: "Efficient",
    status: "Optimal",
    cost: "$5,401",
    utilization: 71,
  },
  {
    name: "Jae Kim",
    role: "Product Strategist",
    used: 174_300,
    p95Latency: 344,
    budgetLeft: "17.6%",
    health: "Watch",
    status: "Rising",
    cost: "$5,121",
    utilization: 66,
  },
  {
    name: "Taylor Chen",
    role: "Automation Lead",
    used: 158_600,
    p95Latency: 329,
    budgetLeft: "8.4%",
    health: "Alert",
    status: "High-volume",
    cost: "$4,768",
    utilization: 89,
  },
  {
    name: "Noah Patel",
    role: "Support Specialist",
    used: 142_100,
    p95Latency: 262,
    budgetLeft: "9.9%",
    health: "Stable",
    status: "Steady",
    cost: "$4,203",
    utilization: 74,
  },
];

const hourlyActivity = [
  { hour: "06:00", tokens: 18000 },
  { hour: "09:00", tokens: 62000 },
  { hour: "12:00", tokens: 87000 },
  { hour: "15:00", tokens: 74000 },
  { hour: "18:00", tokens: 41000 },
  { hour: "21:00", tokens: 23000 },
];

const policyAlerts = [
  {
    tag: "Critical",
    message: "Token spend burst detected in Research cluster.",
    detail: "2.7M tokens in 14 minutes; auto-throttle recommendations enabled.",
  },
  {
    tag: "Info",
    message: "Budget rollover synchronized for all teams.",
    detail: "New daily caps effective for next payroll cycle.",
  },
  {
    tag: "Watch",
    message: "Marketing prompt lengths trending upward after new templates.",
    detail: "Avg. prompt size up 31% in last 24h.",
  },
];

const formatter = new Intl.NumberFormat("en-US");

function formatNumber(value: number) {
  return formatter.format(value);
}

function budgetProgress(used: number, budget: number) {
  return Math.min(100, Math.round((used / budget) * 100));
}

function activityHeight(tokens: number) {
  const max = Math.max(...hourlyActivity.map((item) => item.tokens));
  return `${Math.round((tokens / max) * 100)}%`;
}

export default function Page() {
  const totalUsed = departmentStats.reduce((acc, item) => acc + item.used, 0);
  const totalBudget = departmentStats.reduce((acc, item) => acc + item.budget, 0);
  const utilization = budgetProgress(totalUsed, totalBudget);
  const avgPerEmployee = totalUsed / employeeLeaders.length;
  const alertTone =
    utilization > 85
      ? "text-rose-200 border-rose-300/50 from-rose-600/10 to-transparent"
      : "text-emerald-200 border-emerald-300/50 from-emerald-600/10 to-transparent";

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#1c1b4a,_#080914_40%,_#06060f_75%)] p-5 text-slate-100 sm:p-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <header className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-[1px] sm:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#7c3aed22_0%,transparent_40%),radial-gradient(circle_at_10%_80%,#06b6d422_0%,transparent_35%)]" />
          <div className="relative">
            <p className="text-sm uppercase tracking-[0.25em] text-violet-200/80">Operations Console</p>
            <div className="mt-2 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
                  Employee AI Token Command Center
                </h1>
                <p className="mt-3 max-w-2xl text-slate-300">
                  Real-time-styled operational overview of token usage, spend pressure, and budget health for all teams.
                </p>
              </div>
              <div className="grid w-full grid-cols-2 gap-3 text-right md:w-auto">
                <div className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3">
                  <p className="text-xs text-slate-300">System Clock</p>
                  <p className="mt-1 text-lg font-black text-white">Mon, 20 Mar 2026 · 14:20 UTC</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3">
                  <p className="text-xs text-slate-300">Live State</p>
                  <p className="mt-1 text-lg font-black text-emerald-200">Ingestion Stable</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-4">
          <article className="rounded-2xl border border-indigo-300/15 bg-gradient-to-br from-indigo-500/30 to-fuchsia-500/15 p-5 shadow-xl">
            <p className="text-sm text-indigo-100/80">Total Monthly Tokens</p>
            <p className="mt-3 text-3xl font-black tracking-tight text-white">{formatNumber(totalUsed)} / {formatNumber(totalBudget)}</p>
            <p className="mt-2 text-xs text-indigo-100/90">Global usage cap utilization: {utilization}%</p>
            <div className="mt-4 h-2 rounded-full bg-white/20">
              <div className="h-2 rounded-full bg-gradient-to-r from-indigo-300 via-cyan-200 to-emerald-300" style={{ width: `${utilization}%` }} />
            </div>
          </article>
          <article className="rounded-2xl border border-sky-300/15 bg-gradient-to-br from-sky-500/30 to-cyan-500/15 p-5 shadow-xl">
            <p className="text-sm text-sky-100/85">Avg / Employee</p>
            <p className="mt-3 text-3xl font-black tracking-tight text-white">{formatNumber(Math.round(avgPerEmployee))}</p>
            <p className="mt-2 text-xs text-sky-100/85">Across 5 high-load squads this cycle</p>
            <p className="mt-6 text-xs text-sky-200">Forecast trend: +9.6% next 48h</p>
          </article>
          <article className="rounded-2xl border border-fuchsia-300/15 bg-gradient-to-br from-fuchsia-500/30 to-rose-500/15 p-5 shadow-xl">
            <p className="text-sm text-fuchsia-100/80">Projected Spend</p>
            <p className="mt-3 text-3xl font-black tracking-tight text-white">$142.6k</p>
            <p className="mt-2 text-xs text-fuchsia-100/85">If current burn-rate persists</p>
            <div className="mt-4 rounded-xl bg-black/25 p-2 text-xs text-fuchsia-100/90">
              +$8.9k vs budgeted baseline
            </div>
          </article>
          <article className="rounded-2xl border border-emerald-300/15 bg-gradient-to-br from-emerald-500/25 to-teal-500/20 p-5 shadow-xl">
            <p className="text-sm text-emerald-100/80">Open Cases</p>
            <p className="mt-3 text-3xl font-black tracking-tight text-white">3</p>
            <p className="mt-2 text-xs text-emerald-100/85">2 policy advisories · 1 budget override</p>
            <div className="mt-4 inline-flex rounded-full border border-emerald-200/50 px-4 py-2 text-xs font-semibold text-emerald-100">
              Monitoring auto-mitigation mode
            </div>
          </article>
        </section>

        <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
          <article className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-sm text-slate-300">Department Quotas</p>
                <h2 className="mt-1 text-xl font-semibold text-white">Live utilization by team</h2>
              </div>
              <span className="rounded-full border border-violet-300/40 px-3 py-1 text-xs font-medium text-violet-100">
                SLA target: below 85%
              </span>
            </div>
            <div className="mt-6 space-y-4">
              {departmentStats.map((item) => {
                const usedPercent = budgetProgress(item.used, item.budget);
                const isHigh = usedPercent > 90;
                return (
                  <div key={item.team} className="rounded-2xl border border-white/10 bg-black/15 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-semibold text-white">{item.team}</p>
                      <p className="text-sm text-slate-300">{item.model}</p>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-sm">
                      <span className="text-slate-200">
                        {formatNumber(item.used)} / {formatNumber(item.budget)}
                      </span>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${isHigh ? "bg-rose-500/20 text-rose-100" : "bg-emerald-500/20 text-emerald-100"}`}>
                        {usedPercent}% Used
                      </span>
                    </div>
                    <div className={`mt-3 h-2 rounded-full bg-white/20`}>
                      <div
                        className={`h-2 rounded-full bg-gradient-to-r ${item.heat}`}
                        style={{ width: `${usedPercent}%` }}
                      />
                    </div>
                    <p className="mt-2 text-xs text-slate-300">vs last week: {item.growth}</p>
                  </div>
                );
              })}
            </div>
          </article>

          <article className="rounded-3xl border border-amber-300/15 bg-white/5 p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-300">Hourly Burn Rhythm</p>
                <h2 className="mt-1 text-lg font-semibold text-white">Token flow curve</h2>
              </div>
              <span className={`rounded-full border border-white/20 px-3 py-1 text-xs ${alertTone}`}>Auto-scaling active</span>
            </div>
            <div className="mt-6 grid h-64 grid-cols-6 gap-3">
              {hourlyActivity.map((entry) => (
                <div key={entry.hour} className="flex flex-col-reverse items-center justify-end">
                  <div className="relative w-full">
                    <div className="absolute inset-x-0 -top-7 text-center text-[11px] text-slate-300">{formatNumber(entry.tokens)}</div>
                    <div className="mx-auto w-full rounded-md bg-gradient-to-t from-fuchsia-500/40 to-violet-400/70" style={{ height: activityHeight(entry.tokens) }} />
                  </div>
                  <span className="mt-2 text-xs text-slate-400">{entry.hour}</span>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
          <article className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-300">Top Consumers</p>
                <h2 className="mt-1 text-xl font-semibold text-white">Employees by token throughput</h2>
              </div>
              <button className="rounded-full border border-indigo-300/40 px-4 py-1.5 text-xs font-semibold text-indigo-100 hover:bg-indigo-300/10">
                Export report
              </button>
            </div>
            <div className="mt-5 overflow-hidden rounded-2xl border border-white/10">
              <table className="w-full text-sm">
                <thead className="bg-black/20 text-xs uppercase text-slate-300">
                  <tr>
                    <th className="px-4 py-3 text-left">Employee</th>
                    <th className="px-4 py-3 text-right">Tokens</th>
                    <th className="px-4 py-3 text-right">Cost</th>
                    <th className="px-4 py-3 text-right">Utilization</th>
                    <th className="px-4 py-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {employeeLeaders.map((employee, index) => (
                    <tr
                      key={employee.name}
                      className={`${index % 2 === 0 ? "bg-white/[0.03]" : ""} border-t border-white/10`}
                    >
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-semibold text-white">{employee.name}</p>
                          <p className="text-xs text-slate-400">{employee.role}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right text-slate-200">{formatNumber(employee.used)}</td>
                      <td className="px-4 py-3 text-right text-slate-200">{employee.cost}</td>
                      <td className="px-4 py-3">
                        <div className="ml-auto h-2 w-28 rounded-full bg-white/20">
                          <div
                            className="h-2 rounded-full bg-gradient-to-r from-emerald-300 to-cyan-300"
                            style={{ width: `${employee.utilization}%` }}
                          />
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-right">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold ${
                              employee.health === "Alert"
                                ? "bg-rose-400/20 text-rose-100"
                                : employee.health === "Watch"
                                  ? "bg-amber-300/20 text-amber-100"
                                  : "bg-emerald-300/20 text-emerald-100"
                            }`}
                          >
                            {employee.health}
                          </span>
                          <p className="mt-1 text-xs text-slate-400">budget left {employee.budgetLeft}</p>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          <article className="rounded-3xl border border-amber-300/15 bg-gradient-to-b from-amber-400/10 via-transparent to-black/30 p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-300">Policy & Alerts</p>
              <span className="rounded-full bg-black/35 px-3 py-1 text-xs text-amber-100">3 active alerts</span>
            </div>
            <ul className="mt-5 space-y-4">
              {policyAlerts.map((alert) => (
                <li key={alert.message} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="mb-2 inline-flex rounded-full px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-amber-100">
                    {alert.tag}
                  </p>
                  <h3 className="text-sm font-semibold text-white">{alert.message}</h3>
                  <p className="mt-2 text-xs text-slate-300">{alert.detail}</p>
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-2xl border border-emerald-200/25 bg-emerald-500/10 p-4">
              <p className="text-sm font-semibold text-emerald-100">Health Summary</p>
              <p className="mt-2 text-xs text-emerald-100/90">
                Overall compliance is healthy with minor hotspots in Marketing and Research. Auto-holds are pre-approved for spikes over 2.5σ.
              </p>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
