import { motion } from "framer-motion";

const kpis = [
  {
    title: "Total AI Tokens",
    value: "1,842,190",
    delta: "+18.7% vs. last week",
    tone: "from-cyan-400 to-blue-500",
    amount: "↗ 342,500",
  },
  {
    title: "Estimated Spend",
    value: "$21,460",
    delta: "Down 4.1% from budget cap",
    tone: "from-sky-300 to-teal-400",
    amount: "83% budget",
  },
  {
    title: "Active Agents",
    value: "29 / 34",
    delta: "5 idle, 2 throttling",
    tone: "from-indigo-300 to-cyan-400",
    amount: "11k req/hr",
  },
  {
    title: "Model Errors",
    value: "0.82%",
    delta: "Target under 1.2%",
    tone: "from-emerald-300 to-lime-400",
    amount: "13 incidents",
  },
];

const departments = [
  { name: "Product", budget: 380_000, used: 286_000, target: 300_000 },
  { name: "Support", budget: 260_000, used: 229_000, target: 240_000 },
  { name: "Engineering", budget: 210_000, used: 188_000, target: 200_000 },
  { name: "Sales", budget: 150_000, used: 98_000, target: 120_000 },
];

const employees = [
  {
    name: "Ava Patel",
    team: "Support",
    tokens: "284k",
    trend: "+11%",
    cost: "$3,420",
    health: "steady",
  },
  {
    name: "Marco Diaz",
    team: "Product",
    tokens: "251k",
    trend: "+22%",
    cost: "$2,990",
    health: "surge",
  },
  {
    name: "Chen Li",
    team: "Engineering",
    tokens: "199k",
    trend: "+8%",
    cost: "$2,110",
    health: "steady",
  },
  {
    name: "Maya Romero",
    team: "Sales",
    tokens: "176k",
    trend: "+4%",
    cost: "$1,740",
    health: "down",
  },
  {
    name: "Noah Briggs",
    team: "Research",
    tokens: "169k",
    trend: "+27%",
    cost: "$1,900",
    health: "surge",
  },
  {
    name: "Priya Singh",
    team: "Support",
    tokens: "148k",
    trend: "+2%",
    cost: "$1,420",
    health: "stable",
  },
];

const hourlyUsage = [48, 58, 52, 64, 67, 82, 91, 74, 66, 82, 96, 120, 132, 128, 95, 77, 83, 91, 86, 72, 54, 41, 36, 29, 34];

const incidents = [
  { time: "08:17", message: "Batch summarizer retried after token timeout", severity: "notice" },
  { time: "09:42", message: "Model routing shifted 18% traffic to GPT-4.2", severity: "info" },
  { time: "10:05", message: "Token burst spike detected in support escalation flow", severity: "warn" },
  { time: "10:44", message: "Latency drop after cache warm-up completed", severity: "success" },
  { time: "11:21", message: "Policy guardrail blocked 12 high-risk completions", severity: "warn" },
];

const cardAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut", delay: i * 0.06 },
  }),
};

const formatAmount = (value: number, budget: number) =>
  `${Math.round((value / budget) * 100)}%`;

const healthBadge = (state: string) => {
  if (state === "surge") return "bg-amber-500/20 text-amber-200 border-amber-300/40";
  if (state === "down") return "bg-blue-500/20 text-blue-200 border-blue-300/40";
  if (state === "stable") return "bg-emerald-500/20 text-emerald-200 border-emerald-300/40";
  return "bg-slate-600/20 text-slate-200 border-slate-400/40";
};

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] text-slate-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="aurora one" />
        <div className="aurora two" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col gap-6 p-6 md:p-8">
        <motion.header
          initial="hidden"
          animate="visible"
          variants={cardAnimation}
          className="glass-panel rounded-3xl p-6 md:p-8"
        >
          <div className="mb-5 flex flex-wrap items-start justify-between gap-5">
            <div>
              <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-sm font-semibold text-cyan-100">
                AI Operations Command
              </p>
              <h1 className="text-3xl font-black tracking-tight text-slate-50 md:text-5xl">
                Employee AI Token Command Center
              </h1>
            </div>
            <div className="mt-2 flex items-center gap-4 rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-slate-200 shadow-[0_0_0_1px_rgba(14,165,233,0.15)]">
              <span className="text-slate-400">Live window:</span>
              <span className="font-bold tracking-wide text-cyan-200">Last 24 hours</span>
              <span className="rounded-full bg-emerald-400/20 px-3 py-0.5 text-emerald-200">Operational</span>
            </div>
          </div>

          <div className="grid gap-4 text-sm text-slate-300 md:grid-cols-3">
            <p>Monitoring model spend, usage heat, and quality regressions across teams.</p>
            <p className="md:pl-6 md:border-l md:border-cyan-300/20">
              Data is synthetic and visually simulated for interface evaluation only.
            </p>
            <p className="md:pl-6 md:border-l md:border-cyan-300/20">
              Refresh cadence: every 30 seconds · All panels are hover-responsive.
            </p>
          </div>
        </motion.header>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {kpis.map((item, index) => (
            <motion.div
              key={item.title}
              initial="hidden"
              animate="visible"
              variants={cardAnimation}
              custom={index}
              className="glass-panel rounded-2xl p-5"
            >
              <p className="mb-5 text-sm font-medium text-slate-300">{item.title}</p>
              <p className="mb-4 text-3xl font-black tracking-tight text-slate-50">{item.value}</p>
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-200">{item.delta}</p>
                <p className="rounded-full border border-white/10 bg-slate-900/80 px-3 py-1 text-[11px] font-bold text-slate-100">
                  {item.amount}
                </p>
              </div>
              <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-slate-800">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${item.tone}`}
                  style={{ width: `${index === 2 ? 74 : index === 3 ? 18 : 91}%` }}
                />
              </div>
            </motion.div>
          ))}
        </section>

        <section className="grid gap-4 xl:grid-cols-[2fr_1fr]">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={cardAnimation}
            custom={5}
            className="glass-panel rounded-3xl p-6"
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-300">Hourly Token Load</p>
                <p className="text-xs text-slate-400">Smoothed proxy for team demand curves</p>
              </div>
              <p className="rounded-full border border-cyan-300/25 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-200">
                Peak: 132k tokens
              </p>
            </div>
            <div className="flex h-60 items-end gap-2 rounded-2xl border border-white/10 bg-slate-900/60 p-4">
              {hourlyUsage.map((value, i) => (
                <div key={`bar-${i}`} className="group relative flex h-full flex-1 items-end">
                  <motion.span
                    initial={{ height: 0 }}
                    animate={{ height: `${(value / 145) * 100}%` }}
                    transition={{ duration: 0.8, delay: i * 0.03 }}
                    className="block w-full rounded-md bg-gradient-to-t from-cyan-500/90 to-blue-300/80"
                  >
                    <span className="sr-only">{value}</span>
                  </motion.span>
                  <span className="invisible absolute -top-6 left-1/2 -translate-x-1/2 rounded-md border border-cyan-200/30 bg-slate-900 px-2 py-1 text-[11px] text-cyan-100 transition group-hover:visible">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={cardAnimation}
            custom={6}
            className="glass-panel rounded-3xl p-6"
          >
            <div className="mb-4">
              <p className="text-sm font-semibold text-slate-300">Team burn by department</p>
              <p className="text-xs text-slate-400">Monthly quotas and drift against forecast</p>
            </div>
            <div className="space-y-4">
              {departments.map((dept) => (
                <div key={dept.name}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-semibold text-slate-100">{dept.name}</span>
                    <span className="text-xs text-slate-300">
                      {formatAmount(dept.used, dept.budget)} of quota used
                    </span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-sky-500"
                      style={{ width: `${(dept.used / dept.budget) * 100}%` }}
                    />
                  </div>
                  <div className="mt-1 flex justify-between text-[11px] text-slate-400">
                    <span>{dept.used.toLocaleString()} / {dept.budget.toLocaleString()}</span>
                    <span>Target {dept.target.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={cardAnimation}
            custom={7}
            className="glass-panel rounded-3xl p-6"
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-200">Top employees by token usage</p>
                <p className="text-xs text-slate-400">Includes simulated 7-day moving average context</p>
              </div>
              <button type="button" className="rounded-lg border border-white/10 bg-slate-900/70 px-3 py-2 text-xs text-slate-200">
                Export snapshot
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[620px] text-sm">
                <thead>
                  <tr className="border-b border-slate-700 text-left text-slate-400">
                    <th className="pb-3 font-medium">Employee</th>
                    <th className="pb-3 font-medium">Team</th>
                    <th className="pb-3 font-medium">Tokens</th>
                    <th className="pb-3 font-medium">Cost</th>
                    <th className="pb-3 font-medium">Trend</th>
                    <th className="pb-3 font-medium">State</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((person) => (
                    <tr key={person.name} className="border-b border-slate-800">
                      <td className="py-3 font-medium text-slate-100">{person.name}</td>
                      <td className="py-3 text-slate-300">{person.team}</td>
                      <td className="py-3 text-slate-100 font-semibold">{person.tokens}</td>
                      <td className="py-3 text-cyan-200">{person.cost}</td>
                      <td className="py-3">
                        <span className="rounded-full border border-cyan-200/30 bg-cyan-300/15 px-2 py-1 text-xs text-cyan-100">{person.trend}</span>
                      </td>
                      <td className="py-3">
                        <span className={`rounded-full border px-2 py-1 text-[11px] ${healthBadge(person.health)}`}>
                          {person.health}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={cardAnimation}
            custom={8}
            className="glass-panel rounded-3xl p-6"
          >
            <div className="mb-4">
              <p className="text-sm font-semibold text-slate-200">Operational feed</p>
              <p className="text-xs text-slate-400">Auto-generated anomaly and governance stream</p>
            </div>
            <ul className="space-y-4">
              {incidents.map((item, index) => (
                <li
                  key={`${item.time}-${index}`}
                  className="rounded-xl border border-slate-800 bg-slate-900/40 p-3"
                >
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-200">{item.time}</span>
                    <span
                      className={`rounded-full px-2 py-1 text-[11px] ${
                        item.severity === "warn"
                          ? "border border-amber-300/30 bg-amber-400/15 text-amber-100"
                          : item.severity === "success"
                            ? "border border-emerald-300/30 bg-emerald-400/15 text-emerald-100"
                            : item.severity === "info"
                              ? "border border-cyan-300/30 bg-cyan-400/15 text-cyan-100"
                              : "border border-slate-300/30 bg-slate-400/15 text-slate-100"
                      }`}
                    >
                      {item.severity}
                    </span>
                  </div>
                  <p className="text-sm text-slate-200">{item.message}</p>
                </li>
              ))}
            </ul>
            <div className="mt-5 rounded-xl border border-cyan-300/20 bg-gradient-to-r from-cyan-300/20 to-sky-300/15 p-4 text-xs text-cyan-100">
              Model governance alert policy is set to “Conservative” for customer-facing workflows and “Adaptive” for internal research.
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
