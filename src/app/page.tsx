const summaryMetrics = [
  {
    title: "Team Tokens Consumed",
    value: "1.83 M",
    delta: "+8.4% vs yesterday",
    trend: "+",
    palette: "from-cyan-400 via-sky-400 to-indigo-500",
    icon: "🧠",
  },
  {
    title: "Avg Spend / Employee",
    value: "$2,940",
    delta: "-3.2% this week",
    trend: "-",
    palette: "from-fuchsia-500 via-rose-500 to-orange-500",
    icon: "💸",
  },
  {
    title: "Active AI Assistants",
    value: "37 / 42",
    delta: "88% of team engaged",
    trend: "+",
    palette: "from-emerald-400 to-cyan-400",
    icon: "🚀",
  },
  {
    title: "Quota Risk",
    value: "12%",
    delta: "2 departments nearing cap",
    trend: "-",
    palette: "from-amber-400 via-yellow-300 to-red-400",
    icon: "⚠️",
  },
];

const departmentUsage = [
  { department: "Research", used: 438_000, budget: 520_000, trend: "+12%" },
  { department: "Engineering", used: 374_000, budget: 440_000, trend: "+9%" },
  { department: "Support", used: 261_000, budget: 340_000, trend: "+5%" },
  { department: "Sales", used: 198_000, budget: 260_000, trend: "-2%" },
  { department: "Marketing", used: 136_000, budget: 160_000, trend: "-6%" },
];

const modelUsage = [
  { model: "GPT-4o", used: "620k", share: 34, color: "bg-cyan-300" },
  { model: "Claude Sonnet", used: "430k", share: 24, color: "bg-violet-300" },
  { model: "Gemini Pro", used: "285k", share: 16, color: "bg-amber-300" },
  { model: "Mixtral", used: "240k", share: 13, color: "bg-emerald-300" },
  { model: "Other", used: "255k", share: 13, color: "bg-rose-300" },
];

const usageByHour = [45, 51, 64, 72, 58, 63, 70, 86, 92, 79, 88, 110, 122, 118, 134, 145, 130, 132, 127, 146, 138, 124, 100, 66];

const employeeRows = [
  {
    name: "Ava Thompson",
    role: "Senior ML Engineer",
    dept: "Research",
    tokens: "74,210",
    budget: "120k",
    status: "High",
    growth: "+18%",
    flag: "over-avg",
  },
  {
    name: "Leo Mercado",
    role: "Product Engineer",
    dept: "Engineering",
    tokens: "61,800",
    budget: "110k",
    status: "Balanced",
    growth: "+6%",
    flag: "normal",
  },
  {
    name: "Mina Patel",
    role: "Support Lead",
    dept: "Support",
    tokens: "59,940",
    budget: "75k",
    status: "Watch",
    growth: "+14%",
    flag: "watch",
  },
  {
    name: "Zoe Chen",
    role: "Sales Architect",
    dept: "Sales",
    tokens: "44,300",
    budget: "70k",
    status: "Stable",
    growth: "-3%",
    flag: "normal",
  },
];

const alerts = [
  "Research team hit 84% of weekly token budget before Thursday.",
  "Engineering model-switching lowered average context waste by 11%.",
  "Support desk has 3 sessions with unusually long prompts flagged for review.",
  "Two sales pods completed a full-day pilot with 0.8M token carry-over reduction.",
];

function levelForUsage(used: number, budget: number) {
  return Math.round((used / budget) * 100);
}

function statusClass(flag: string) {
  if (flag === "over-avg") return "bg-rose-500/15 text-rose-200 ring-rose-400/40";
  if (flag === "watch") return "bg-amber-500/15 text-amber-200 ring-amber-400/40";
  return "bg-emerald-500/15 text-emerald-200 ring-emerald-400/40";
}

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-950 p-6 text-slate-100 md:p-10">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl ring-1 ring-white/10 backdrop-blur-2xl md:p-10">
        <div className="pointer-events-none absolute -top-24 right-10 h-72 w-72 rounded-full bg-gradient-to-br from-cyan-500/30 via-fuchsia-500/15 to-transparent blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-20 h-60 w-60 rounded-full bg-gradient-to-tr from-indigo-500/25 to-transparent blur-[72px]" />

        <header className="relative mb-8 flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-300">
              AI Operations Dashboard
            </p>
            <h1 className="mt-4 text-3xl font-black tracking-tight md:text-5xl">
              Employee Token Usage Monitor
            </h1>
            <p className="mt-2 text-sm text-slate-300">
              Synthetic executive view — usage health, budgets, and behavior insights.
            </p>
          </div>
          <div className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-slate-900/50 px-4 py-3 text-sm font-medium">
            Last 14 days • Updated 09:42 AM
          </div>
        </header>

        <section className="relative grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {summaryMetrics.map((card) => (
            <article
              key={card.title}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 p-5 transition duration-500 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${card.palette}`} />
              <p className="text-sm text-slate-400">{card.title}</p>
              <p className="mt-4 text-4xl font-black">{card.value}</p>
              <p className="mt-2 inline-flex items-center text-xs font-semibold text-slate-200">
                <span className={`mr-2 ${card.trend === "+" ? "text-emerald-300" : "text-rose-300"}`}>{card.trend}</span>
                {card.delta}
              </p>
              <p className="absolute right-5 top-5 text-3xl opacity-80">{card.icon}</p>
            </article>
          ))}
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[2fr_1fr]">
          <article className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 md:p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">Hourly Token Stream</h2>
              <span className="rounded-full border border-white/15 px-3 py-1 text-xs text-slate-300">
                24h pulse
              </span>
            </div>
            <div className="grid h-72 grid-cols-24 gap-1.5">
              {usageByHour.map((value, index) => {
                const height = (value / 150) * 100;
                return (
                  <div key={`${value}-${index}`} className="flex h-full flex-col justify-end">
                    <div
                      className="rounded-t-md bg-gradient-to-t from-cyan-400 to-fuchsia-400 transition-transform duration-300 hover:scale-y-105"
                      style={{ height: `${height}%` }}
                      title={`${index}:00 - ${value}k tokens`}
                    />
                    <span className="mt-1 text-[10px] text-slate-500">{String(index).padStart(2, "0")}</span>
                  </div>
                );
              })}
            </div>
          </article>

          <article className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 md:p-6">
            <h2 className="mb-4 text-lg font-bold">Model Distribution</h2>
            <div className="space-y-4">
              {modelUsage.map((model) => (
                <div key={model.model}>
                  <div className="mb-2 flex items-center justify-between text-xs text-slate-300">
                    <span>{model.model}</span>
                    <span>{model.used}</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-slate-800">
                    <div
                      className={`h-full rounded-full ${model.color}`}
                      style={{ width: `${model.share}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4 text-xs text-slate-300">
              Model mix is shifting toward lower-cost models after prompt templates were updated.
            </div>
          </article>
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_1.5fr]">
          <article className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 md:p-6">
            <h2 className="mb-4 text-lg font-bold">Department Health</h2>
            <div className="space-y-4">
              {departmentUsage.map((dept) => {
                const percent = levelForUsage(dept.used, dept.budget);
                return (
                  <div key={dept.department} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <p className="font-semibold">{dept.department}</p>
                      <p className="text-slate-300">
                        {dept.used.toLocaleString()} / {dept.budget.toLocaleString()}
                      </p>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                      <div
                        className={`h-full rounded-full ${percent > 85 ? "bg-gradient-to-r from-rose-400 to-orange-400" : "bg-gradient-to-r from-emerald-400 to-cyan-400"}`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <p className="text-xs text-slate-400">Utilization {percent}% • Trend {dept.trend}</p>
                  </div>
                );
              })}
            </div>
          </article>

          <article className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 md:p-6">
            <h2 className="mb-4 text-lg font-bold">Top Employee Usage</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-slate-400">
                    <th className="pb-3 pr-4">Employee</th>
                    <th className="pb-3 pr-4">Department</th>
                    <th className="pb-3 pr-4">Tokens</th>
                    <th className="pb-3 pr-4">Budget</th>
                    <th className="pb-3 pr-4">Status</th>
                    <th className="pb-3">Delta</th>
                  </tr>
                </thead>
                <tbody>
                  {employeeRows.map((emp, index) => (
                    <tr key={emp.name} className={`border-t border-white/10 ${index === employeeRows.length - 1 ? "" : "border-b"} border-white/10`}>
                      <td className="py-3 pr-4">
                        <p className="font-semibold">{emp.name}</p>
                        <p className="text-xs text-slate-400">{emp.role}</p>
                      </td>
                      <td className="py-3 pr-4 text-slate-300">{emp.dept}</td>
                      <td className="py-3 pr-4 font-semibold">{emp.tokens}</td>
                      <td className="py-3 pr-4 text-slate-300">{emp.budget}</td>
                      <td className="py-3 pr-4">
                        <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${statusClass(emp.flag)}`}>
                          {emp.status}
                        </span>
                      </td>
                      <td className="py-3 text-slate-300">{emp.growth}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        </section>

        <section className="mt-6 rounded-2xl border border-white/10 bg-slate-900/60 p-5 md:p-6">
          <h2 className="mb-4 text-lg font-bold">Operational Signals</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {alerts.map((alert) => (
              <li key={alert} className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
                {alert}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
