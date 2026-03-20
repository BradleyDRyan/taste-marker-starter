export default function Page() {
  const heroPoints = [
    { day: "Mon", value: 22.4 },
    { day: "Tue", value: 24.1 },
    { day: "Wed", value: 20.8 },
    { day: "Thu", value: 26.7 },
    { day: "Fri", value: 29.3 },
    { day: "Sat", value: 24.9 },
    { day: "Sun", value: 18.8 },
  ];

  const peak = Math.max(...heroPoints.map((item) => item.value));
  const normalizedMax = Math.max(peak, 1);

  const teamCards = [
    {
      label: "AI Support",
      spend: 41,
      delta: "+6.2%",
      status: "on-track",
    },
    {
      label: "Research Agents",
      spend: 26,
      delta: "+18.4%",
      status: "watch",
    },
    {
      label: "Operations",
      spend: 17,
      delta: "-3.1%",
      status: "steady",
    },
    {
      label: "Design Automation",
      spend: 13,
      delta: "-1.2%",
      status: "on-track",
    },
  ];

  const topSignals = [
    {
      metric: "Budget burn rate",
      detail: "3.2% above forecast",
      tone: "warning",
    },
    {
      metric: "Prompt failures",
      detail: "2 incident spikes this week",
      tone: "positive",
    },
    {
      metric: "Cache hit rate",
      detail: "Up 11.4% versus prior week",
      tone: "positive",
    },
    {
      metric: "P95 latency",
      detail: "4.7s, within SLA",
      tone: "steady",
    },
  ];

  const operations = [
    {
      team: "Acme Sales",
      model: "gpt-4o",
      requests: 18420,
      cost: "$18,420",
      trend: "up",
    },
    {
      team: "Nova Support",
      model: "claude-sonnet",
      requests: 11840,
      cost: "$11,280",
      trend: "flat",
    },
    {
      team: "Atlas Labs",
      model: "gpt-4.1",
      requests: 9400,
      cost: "$9,960",
      trend: "down",
    },
    {
      team: "Pilot QA",
      model: "gemini-2.0",
      requests: 7210,
      cost: "$7,120",
      trend: "up",
    },
    {
      team: "Field Ops",
      model: "gpt-4o",
      requests: 5020,
      cost: "$4,860",
      trend: "down",
    },
  ];

  const statusStyles: Record<string, string> = {
    "on-track": "bg-emerald-50 text-emerald-700 border-emerald-200",
    watch: "bg-amber-50 text-amber-700 border-amber-200",
    steady: "bg-slate-50 text-slate-700 border-slate-200",
  };

  const signalStyles: Record<string, string> = {
    warning: "border-amber-300 text-amber-700 bg-amber-50",
    positive: "border-emerald-300 text-emerald-700 bg-emerald-50",
    steady: "border-slate-300 text-slate-700 bg-slate-50",
  };

  const trendStyles: Record<string, string> = {
    up: "text-rose-600",
    down: "text-emerald-600",
    flat: "text-slate-600",
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <header className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/5 sm:p-6">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Executive Dashboard</p>
              <h1 className="text-2xl font-semibold sm:text-3xl">AI token spend &amp; throughput</h1>
              <p className="max-w-3xl text-sm leading-relaxed text-slate-500">
                Week-over-week view of token usage, cost pacing, and model reliability signals for teams with
                highest operational impact.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 md:flex-nowrap">
              <button
                type="button"
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                7-day view
              </button>
              <button
                type="button"
                className="rounded-full border border-slate-900 bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Export report
              </button>
            </div>
          </div>
        </header>

        <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/5 sm:p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Primary insight</p>
                <h2 className="mt-1 text-lg font-semibold">Weekly token trend by day</h2>
              </div>
              <p className="text-xs text-slate-500">Last sync: 11:42 AM · Production dataset</p>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Spend this week</p>
                <p className="mt-3 text-3xl font-semibold">$98.1k</p>
                <p className="mt-2 text-sm text-emerald-700">-8.4% variance versus forecast</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Pacing health</p>
                <p className="mt-3 text-3xl font-semibold">87%</p>
                <p className="mt-2 text-sm text-slate-600">At current rate, budget reaches 71% in 6 days</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Model mix shift</p>
                <p className="mt-3 text-3xl font-semibold">gpt-4o +9%</p>
                <p className="mt-2 text-sm text-slate-600">Most requests moved from legacy models</p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">Daily usage bars</p>
                <p className="text-xs text-slate-400">Higher is better control point</p>
              </div>
              <div className="grid grid-cols-7 gap-3">
                {heroPoints.map((item) => (
                  <div key={item.day} className="flex min-h-28 flex-col justify-end gap-2">
                    <span
                      className="block rounded-lg bg-slate-900/85 transition-all duration-200"
                      style={{
                        height: `${Math.round((item.value / normalizedMax) * 100)}%`,
                        minHeight: "12px",
                      }}
                    />
                    <span className="text-center text-xs text-slate-500">{item.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </article>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
            {teamCards.map((team) => (
              <article
                key={team.label}
                className={`rounded-2xl border p-4 ${statusStyles[team.status as keyof typeof statusStyles]}`}
              >
                <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{team.label}</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">{team.spend}% budget</p>
                <p className={`mt-3 text-sm font-medium ${team.spend > 30 ? "text-amber-600" : "text-slate-700"}`}>
                  {team.delta} from prior week
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-3">
          <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/5 lg:col-span-2">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-500">Department comparison</p>
                <h2 className="mt-2 text-xl font-semibold">Where token usage is accelerating</h2>
              </div>
              <button
                type="button"
                className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700"
              >
                Compare teams
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {topSignals.map((signal) => (
                <div
                  key={signal.metric}
                  className={`rounded-xl border bg-white px-4 py-3 ${signalStyles[signal.tone as keyof typeof signalStyles]}`}
                >
                  <p className="text-sm font-medium">{signal.metric}</p>
                  <p className="mt-1 text-sm text-slate-700">{signal.detail}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/5">
            <p className="text-sm font-medium text-slate-500">Execution pacing</p>
            <h2 className="mt-2 text-xl font-semibold">Top outliers vs threshold</h2>
            <p className="mt-2 text-sm text-slate-600">
              Teams that consume above expected run-rate are highlighted and reviewed each morning.
            </p>
            <ul className="mt-5 space-y-3">
              <li className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-sm font-medium text-slate-700">Research Agents</p>
                <p className="text-xs text-slate-500">43k token surge, likely model fallback event</p>
              </li>
              <li className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-sm font-medium text-slate-700">Acme Sales</p>
                <p className="text-xs text-slate-500">Retry loop introduced in customer QA pipeline</p>
              </li>
              <li className="rounded-xl border border-amber-300 bg-amber-50 p-3">
                <p className="text-sm font-medium text-amber-700">Immediate action</p>
                <p className="text-xs text-amber-700">Pause low-value rerank on the new model alias before Friday cutoff</p>
              </li>
            </ul>
          </article>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-slate-500">Operations table</p>
              <h2 className="mt-1 text-xl font-semibold">Team requests and cost by model</h2>
            </div>
            <p className="text-xs text-slate-500">Sorted by request volume</p>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left text-slate-500">
                  <th className="px-3 py-3 font-medium">Team</th>
                  <th className="px-3 py-3 font-medium">Model</th>
                  <th className="px-3 py-3 font-medium">Requests</th>
                  <th className="px-3 py-3 font-medium">Weekly cost</th>
                  <th className="px-3 py-3 font-medium">Trend</th>
                </tr>
              </thead>
              <tbody>
                {operations.map((row) => (
                  <tr key={row.team} className="border-b border-slate-100 last:border-0">
                    <td className="px-3 py-3 font-medium text-slate-800">{row.team}</td>
                    <td className="px-3 py-3 text-slate-700">{row.model}</td>
                    <td className="px-3 py-3 text-slate-700">{row.requests.toLocaleString()}</td>
                    <td className="px-3 py-3 text-slate-700">{row.cost}</td>
                    <td className="px-3 py-3">
                      <span className={`text-sm font-semibold ${trendStyles[row.trend as keyof typeof trendStyles]}`}>
                        {row.trend === "up" ? "▲ up" : row.trend === "down" ? "▼ down" : "◌ flat"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
