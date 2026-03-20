const kpiCards = [
  {
    title: "Total AI Tokens",
    value: "12.4M",
    change: "+18.2%",
    trend: "up",
    note: "Across all employees, last 30 days",
    color: "from-cyan-400 via-sky-400 to-blue-500",
  },
  {
    title: "Model Cost",
    value: "$9,840",
    change: "+4.1%",
    trend: "up",
    note: "USD equivalent this period",
    color: "from-emerald-400 via-teal-400 to-cyan-400",
  },
  {
    title: "Budget Remaining",
    value: "$41,200",
    change: "-6.8%",
    trend: "down",
    note: "Of $50k monthly cap",
    color: "from-violet-500 via-indigo-500 to-fuchsia-500",
  },
  {
    title: "Peak Throughput",
    value: "1.9M/min",
    change: "+9.5%",
    trend: "up",
    note: "Highest observed minute load",
    color: "from-rose-400 via-orange-400 to-amber-400",
  },
];

const modelDistribution = [
  { model: "GPT-4o", usage: "4.8M", percent: 38, health: "steady", color: "bg-cyan-400" },
  { model: "Llama-4", usage: "3.2M", percent: 26, health: "rising", color: "bg-emerald-400" },
  { model: "Claude Opus", usage: "2.1M", percent: 17, health: "steady", color: "bg-violet-400" },
  { model: "Gemini Pro", usage: "1.6M", percent: 13, health: "cooldown", color: "bg-amber-400" },
  { model: "Legacy APIs", usage: "0.7M", percent: 6, health: "stable", color: "bg-sky-500" },
];

const employees = [
  { name: "Ari Patel", team: "Customer Success", spend: "$1,420", tokens: "1.81M", status: "over budget", bar: 84, growth: "+26%" },
  { name: "Mina Alvarez", team: "AI Enablement", spend: "$980", tokens: "1.25M", status: "steady", bar: 54, growth: "+7%" },
  { name: "Noah Kim", team: "Product", spend: "$1,190", tokens: "1.49M", status: "watchlist", bar: 68, growth: "+11%" },
  { name: "Elena Rossi", team: "Platform", spend: "$760", tokens: "970K", status: "stable", bar: 42, growth: "+2%" },
  { name: "Jules Ward", team: "Marketing", spend: "$640", tokens: "810K", status: "steady", bar: 38, growth: "+3%" },
];

const incidentFeed = [
  {
    time: "08:42",
    title: "Automation burst detected",
    text: "Agentic scripts in Support-Tools consumed 320K tokens in 11 minutes.",
    severity: "high",
  },
  {
    time: "09:16",
    title: "Cache miss surge",
    text: "Prompt cache hit rate dropped from 72% → 61% for GPT-4o prompts.",
    severity: "medium",
  },
  {
    time: "10:03",
    title: "Cost alert acknowledged",
    text: "Daily spend reached $3,200. Auto-budget guardrail now at warning threshold.",
    severity: "low",
  },
];

const sparkline = [12, 18, 15, 22, 17, 30, 26, 21, 34, 29, 38, 44, 39, 52, 47, 58, 61, 70, 75, 66, 80];

function StatusTag({ state }: { state: string }) {
  const map = {
    over: "border-rose-300/50 text-rose-100 bg-rose-500/20",
    watchlist: "border-amber-300/50 text-amber-100 bg-amber-500/20",
    steady: "border-emerald-300/50 text-emerald-100 bg-emerald-500/20",
    stable: "border-sky-300/50 text-sky-100 bg-sky-500/20",
  } as Record<string, string>;
  return (
    <span
      className={`rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] ${
        map[state] ?? "border-slate-400/40 text-slate-100 bg-slate-400/20"
      }`}
    >
      {state}
    </span>
  );
}

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 p-6 text-slate-100 sm:p-8">
      <div className="pointer-events-none absolute -left-24 top-0 h-96 w-96 rounded-full bg-cyan-400/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-24 h-[28rem] w-[28rem] rounded-full bg-fuchsia-500/20 blur-[110px]" />
      <div className="pointer-events-none absolute bottom-[-10rem] left-1/3 h-[24rem] w-[24rem] rounded-full bg-indigo-500/20 blur-[110px]" />
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="relative flex flex-wrap items-start justify-between gap-4 rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">AI Operations Desk</p>
            <h1 className="mt-3 bg-gradient-to-r from-cyan-200 via-sky-300 to-indigo-200 bg-clip-text text-4xl font-black leading-tight text-transparent md:text-5xl">
              Employee Token Command Center
            </h1>
            <p className="mt-2 max-w-xl text-sm text-slate-300">
              Monitor workforce AI usage patterns, cost intensity, and anomalies in one place with real-time-looking visuals.
            </p>
          </div>
          <div className="rounded-2xl border border-cyan-200/20 bg-slate-900/70 px-5 py-4 text-sm">
            <p className="text-slate-400">Live Window</p>
            <p className="mt-1 text-2xl font-bold text-cyan-200">March 20, 2026</p>
            <p className="mt-1 text-xs text-emerald-200">Refresh cycle: 60s</p>
          </div>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {kpiCards.map((item) => (
            <article
              key={item.title}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 p-5 transition-transform duration-300 hover:-translate-y-1 hover:border-cyan-200/40"
            >
              <div className={`absolute -left-10 -top-10 h-28 w-28 rounded-full bg-gradient-to-br ${item.color} opacity-40 blur-xl`} />
              <p className="text-sm text-slate-300">{item.title}</p>
              <p className="mt-3 text-3xl font-black text-white">{item.value}</p>
              <div className="mt-3 flex items-center gap-3">
                <p className={`rounded-full px-2 py-0.5 text-xs font-black ${
                  item.trend === "up"
                    ? "bg-emerald-500/20 text-emerald-200"
                    : "bg-rose-500/20 text-rose-200"
                }`}>
                  {item.change}
                </p>
                <p className="text-xs text-slate-400">vs previous period</p>
              </div>
              <p className="mt-2 text-xs text-slate-400">{item.note}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
          <article className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold">Model & Token Mix</h2>
                <p className="mt-1 text-sm text-slate-300">Distribution across providers and model families.</p>
              </div>
              <span className="rounded-full border border-white/10 bg-slate-800/60 px-3 py-1 text-xs text-slate-200">
                Last 30 days
              </span>
            </div>
            <div className="mt-6 space-y-4">
              {modelDistribution.map((model) => (
                <div key={model.model} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className={`h-2.5 w-2.5 rounded-full ${model.color}`} />
                      <span className="font-semibold text-slate-100">{model.model}</span>
                    </div>
                    <span className="text-slate-300">{model.usage} tokens</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-slate-800">
                    <div
                      className={`h-full rounded-full ${model.color} transition-all duration-700`}
                      style={{ width: `${model.percent}%` }}
                    />
                  </div>
                  <div className="text-xs text-slate-400">Forecast trend: {model.health}</div>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
            <h2 className="text-lg font-bold">Daily spike chart</h2>
            <p className="mt-1 text-sm text-slate-300">Token volume by hour (mock).</p>
            <div className="mt-6 flex h-64 items-end gap-1 rounded-xl border border-white/5 bg-slate-950/60 p-3">
              {sparkline.map((point, idx) => (
                <div key={`${idx}-${point}`} className="flex h-full flex-1 items-end">
                  <div
                    className="w-full rounded-md bg-gradient-to-t from-cyan-400 to-sky-300/30"
                    style={{ height: `${Math.max(point, 6)}%` }}
                  />
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-slate-400">Peak at 09:00 UTC / 80% normalized load</p>
          </article>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.45fr,1fr]">
          <article className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold">Employee spend leaderboard</h2>
                <p className="mt-1 text-sm text-slate-300">Top spenders and token pressure points today.</p>
              </div>
              <span className="rounded-full border border-white/10 bg-slate-800/60 px-3 py-1 text-xs text-slate-200">
                Mock snapshot
              </span>
            </div>
            <div className="mt-5 overflow-hidden rounded-2xl border border-white/10">
              <div className="grid grid-cols-[1.8fr,1fr,0.9fr,1fr,0.85fr] bg-slate-800/70 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.17em] text-slate-300">
                <div>Employee</div>
                <div>Team</div>
                <div>Spend</div>
                <div>Tokens</div>
                <div>Alert</div>
              </div>
              {employees.map((person) => (
                <div
                  key={person.name}
                  className="grid grid-cols-[1.8fr,1fr,0.9fr,1fr,0.85fr] items-center gap-3 border-t border-white/5 px-4 py-4"
                >
                  <div className="font-semibold text-slate-100">{person.name}</div>
                  <div className="text-sm text-slate-300">{person.team}</div>
                  <div>
                    <div className="font-semibold text-slate-100">{person.spend}</div>
                    <div className="text-xs text-slate-400">Growth {person.growth}</div>
                  </div>
                  <div className="text-sm text-slate-100">{person.tokens}</div>
                  <StatusTag state={person.status === "over budget" ? "over" : person.status} />
                  <div className="col-span-5 mt-2">
                    <div className="h-2 rounded-full bg-slate-800">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-blue-500"
                        style={{ width: `${person.bar}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
            <h2 className="text-lg font-bold">Incident monitor</h2>
            <p className="mt-1 text-sm text-slate-300">Anomalies and governance alerts.</p>
            <div className="mt-6 space-y-4">
              {incidentFeed.map((event, index) => (
                <div
                  key={event.title + index}
                  className="rounded-2xl border border-white/10 bg-slate-950/60 p-4"
                >
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>{event.time}</span>
                    <span
                      className={`rounded-full px-2 py-1 text-[10px] font-black uppercase tracking-[0.2em] ${
                        event.severity === "high"
                          ? "bg-rose-500/20 text-rose-200"
                          : event.severity === "medium"
                            ? "bg-amber-500/20 text-amber-200"
                            : "bg-sky-500/20 text-sky-200"
                      }`}
                    >
                      {event.severity}
                    </span>
                  </div>
                  <p className="mt-2 font-semibold text-slate-100">{event.title}</p>
                  <p className="mt-1 text-sm text-slate-300">{event.text}</p>
                </div>
              ))}
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
