type Metric = {
  title: string;
  value: string;
  delta: string;
  change: "up" | "down" | "flat";
};

type Project = {
  name: string;
  owner: string;
  progress: number;
  budget: string;
  eta: string;
  state: "On track" | "At risk" | "At review";
};

type Activity = {
  actor: string;
  action: string;
  target: string;
  time: string;
};

const metrics: Metric[] = [
  {
    title: "Revenue this month",
    value: "$248,920",
    delta: "+14.2%",
    change: "up",
  },
  {
    title: "Active customers",
    value: "8,914",
    delta: "+6.8%",
    change: "up",
  },
  {
    title: "Support SLA",
    value: "94.6%",
    delta: "-1.1%",
    change: "down",
  },
  {
    title: "Deployment success",
    value: "99.2%",
    delta: "±0.0%",
    change: "flat",
  },
];

const projectGrid: Project[] = [
  {
    name: "North Ridge onboarding",
    owner: "Priya",
    progress: 88,
    budget: "$94k",
    eta: "2 days",
    state: "On track",
  },
  {
    name: "Atlas migration",
    owner: "Theo",
    progress: 67,
    budget: "$130k",
    eta: "5 days",
    state: "At risk",
  },
  {
    name: "Checkout optimization",
    owner: "Lena",
    progress: 96,
    budget: "$44k",
    eta: "1 day",
    state: "On track",
  },
  {
    name: "Mobile experiments",
    owner: "Milo",
    progress: 44,
    budget: "$52k",
    eta: "3 days",
    state: "At review",
  },
];

const activityLog: Activity[] = [
  {
    actor: "Rina",
    action: "deployed a hotfix",
    target: "checkout-api v2.4.1",
    time: "just now",
  },
  {
    actor: "Devon",
    action: "approved",
    target: "Q1 analytics model",
    time: "11 min ago",
  },
  {
    actor: "Team Atlas",
    action: "finished sprint planning",
    target: "7 stories",
    time: "32 min ago",
  },
  {
    actor: "Ops",
    action: "closed",
    target: "infra escalation ticket #482",
    time: "47 min ago",
  },
];

const weeklySignal = [20, 34, 15, 45, 52, 30, 61];

function metricDeltaStyles(change: Metric["change"]): string {
  if (change === "up") return "text-emerald-300 bg-emerald-400/10 border-emerald-300/20";
  if (change === "down") return "text-rose-300 bg-rose-400/10 border-rose-300/20";
  return "text-sky-300 bg-sky-400/10 border-sky-300/20";
}

function projectStateStyles(state: Project["state"]): string {
  if (state === "On track") return "text-emerald-300 border-emerald-300/30 bg-emerald-400/10";
  if (state === "At risk") return "text-amber-300 border-amber-300/30 bg-amber-400/10";
  return "text-sky-300 border-sky-300/30 bg-sky-400/10";
}

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 md:px-10 md:py-12">
        <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 p-6 shadow-2xl shadow-indigo-900/20 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
                Operations Command
              </p>
              <h1 className="text-3xl font-semibold text-white md:text-4xl">Execution Dashboard</h1>
              <p className="max-w-xl text-sm leading-relaxed text-slate-300 md:text-base">
                High-signal view of business velocity, delivery health, and team activity for today&apos;s planning cycle.
              </p>
            </div>
            <div className="flex gap-3">
              <button className="rounded-xl border border-white/15 px-4 py-2.5 text-sm font-medium transition hover:border-emerald-400/40 hover:text-emerald-200">
                Export report
              </button>
              <button className="rounded-xl bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
                New initiative
              </button>
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {metrics.map((metric) => (
              <article
                key={metric.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 transition duration-200 hover:-translate-y-0.5 hover:border-white/30"
              >
                <p className="text-xs uppercase tracking-widest text-slate-400">{metric.title}</p>
                <p className="mt-2 text-2xl font-semibold text-white">{metric.value}</p>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs font-medium">
                  <span className={`rounded-full border px-2 py-0.5 ${metricDeltaStyles(metric.change)}`}>{metric.delta}</span>
                  <span className="text-slate-400">vs last month</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.45fr_1fr]">
          <article className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Delivery pipeline</h2>
              <p className="text-xs uppercase tracking-wider text-slate-400">Last 7 days</p>
            </div>
            <div className="mt-6 grid grid-cols-7 gap-3">
              {weeklySignal.map((value, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <div className="flex h-44 w-full items-end">
                    <div
                      className="w-full rounded-md bg-gradient-to-t from-cyan-500 via-cyan-300 to-sky-200"
                      style={{ height: `${value}%` }}
                    />
                  </div>
                  <span className="text-xs text-slate-400">D{index + 1}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-slate-300">
              Throughput improved steadily midweek; strongest delivery rate on Day 7 with a notable recovery in ticket throughput.
            </p>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Team health score</h2>
              <p className="text-xs uppercase tracking-wider text-slate-400">Real-time</p>
            </div>
            <div className="mt-6 space-y-4">
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-slate-300">Sprint confidence</span>
                  <span className="text-slate-200">89%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-800">
                  <div className="h-full w-[89%] rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" />
                </div>
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-slate-300">On-call load</span>
                  <span className="text-slate-200">61%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-800">
                  <div className="h-full w-[61%] rounded-full bg-gradient-to-r from-amber-400 to-orange-400" />
                </div>
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-slate-300">Incident pressure</span>
                  <span className="text-slate-200">18%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-800">
                  <div className="h-full w-[18%] rounded-full bg-gradient-to-r from-rose-400 to-red-400" />
                </div>
              </div>
            </div>
            <div className="mt-8 rounded-2xl border border-white/10 bg-slate-900/80 p-4">
              <p className="text-sm text-slate-300">Burnout watch</p>
              <p className="mt-2 text-3xl font-semibold text-white">Low</p>
              <p className="mt-1 text-xs text-slate-400">No escalations outside on-call rotation windows in last 72 hours.</p>
            </div>
          </article>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.2fr_1fr]">
          <article className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-semibold">Initiative progress</h2>
            <div className="mt-5 space-y-4">
              {projectGrid.map((project) => (
                <div
                  key={project.name}
                  className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 transition hover:border-white/30"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-medium">{project.name}</p>
                      <p className="text-xs text-slate-400">Owner: {project.owner}</p>
                    </div>
                    <span
                      className={`rounded-full border px-2.5 py-1 text-xs font-medium ${projectStateStyles(
                        project.state
                      )}`}
                    >
                      {project.state}
                    </span>
                  </div>

                  <div className="mt-4">
                    <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
                      <span>Completion</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-800">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-fuchsia-400 to-cyan-400"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                    <span>Budget allocation: {project.budget}</span>
                    <span>ETA: {project.eta}</span>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-semibold">Live activity</h2>
            <ul className="mt-5 space-y-3">
              {activityLog.map((activity) => (
                <li key={`${activity.actor}-${activity.target}`} className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-sm text-white">
                    <span className="font-medium text-cyan-200">{activity.actor}</span>{" "}
                    <span className="text-slate-300">{activity.action}</span>{" "}
                    <span className="font-semibold text-white">{activity.target}</span>
                  </p>
                  <p className="mt-1 text-xs text-slate-400">{activity.time}</p>
                </li>
              ))}
            </ul>
            <button className="mt-4 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium transition hover:border-white/30">
              Open full activity log
            </button>
          </article>
        </section>
      </div>
    </main>
  );
}
