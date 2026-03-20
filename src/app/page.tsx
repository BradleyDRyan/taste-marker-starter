import {
  ArrowUpRight,
  CalendarDots,
  ClockCountdown,
  CompassTool,
  CurrencyCircleDollar,
  Funnel,
  Lightning,
  ListChecks,
  Notification,
  Sparkle,
  Target,
  TrendUp,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";

const kpis = [
  {
    label: "Pipeline health",
    value: "$2.84M",
    change: "+18.2%",
    detail: "Weighted opportunities closing this quarter",
    icon: CurrencyCircleDollar,
    tone: "text-[#7cf2c9]",
  },
  {
    label: "Active campaigns",
    value: "14",
    change: "+3",
    detail: "Launches running across paid, lifecycle, and partner channels",
    icon: Lightning,
    tone: "text-[#44d4ff]",
  },
  {
    label: "Team focus",
    value: "91%",
    change: "On track",
    detail: "Planned work completed against weekly operating cadence",
    icon: UsersThree,
    tone: "text-[#ffcf74]",
  },
];

const revenueBars = [
  { label: "Mon", value: 42 },
  { label: "Tue", value: 56 },
  { label: "Wed", value: 74 },
  { label: "Thu", value: 63 },
  { label: "Fri", value: 88 },
  { label: "Sat", value: 52 },
  { label: "Sun", value: 67 },
];

const initiatives = [
  {
    name: "Retention sprint",
    owner: "Lifecycle",
    progress: 82,
    status: "Ahead",
  },
  {
    name: "Pricing test",
    owner: "Growth",
    progress: 61,
    status: "Review",
  },
  {
    name: "Enterprise push",
    owner: "Sales",
    progress: 47,
    status: "Needs support",
  },
];

const activity = [
  {
    title: "Launch window approved",
    detail: "Creative v3 is scheduled for the April 2 rollout.",
    meta: "12 minutes ago",
    icon: Target,
  },
  {
    title: "Forecast raised",
    detail: "Mid-market pipeline increased by $180K after partner referrals.",
    meta: "39 minutes ago",
    icon: TrendUp,
  },
  {
    title: "Risk flagged",
    detail: "Two ads are underperforming CTR benchmark in the west region.",
    meta: "1 hour ago",
    icon: Notification,
  },
];

const tasks = [
  "Review paid social pacing against CAC ceiling",
  "Approve nurture sequence copy for dormant accounts",
  "Move onboarding diagnostics into the Tuesday ops sync",
];

export default function Page() {
  return (
    <main className="dashboard-shell min-h-screen px-4 py-6 text-white md:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-7xl flex-col gap-6 rounded-[32px] p-3 md:p-5">
        <section className="glass-panel-strong aurora overflow-hidden rounded-[28px]">
          <div className="fine-grid grid gap-10 p-6 md:p-8 xl:grid-cols-[1.45fr_0.95fr]">
            <div className="space-y-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.24em] text-[#90a3c5]">
                    <Sparkle size={14} weight="fill" className="text-[#7cf2c9]" />
                    Q2 operating cockpit
                  </div>
                  <div>
                    <p className="text-sm text-[#90a3c5]">Friday, March 20</p>
                    <h1 className="max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-white md:text-6xl">
                      Revenue is pacing above target. Focus the team on conversion lift.
                    </h1>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#c7d6f4]">
                  <div className="glass-panel rounded-2xl px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.18em] text-[#90a3c5]">Window</p>
                    <div className="mt-2 flex items-center gap-2 font-medium text-white">
                      <CalendarDots size={18} className="text-[#44d4ff]" />
                      Last 7 days
                    </div>
                  </div>
                  <button className="rounded-2xl bg-white px-4 py-3 font-medium text-[#07111f] transition hover:bg-[#dff7ff]">
                    Export brief
                  </button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {kpis.map(({ label, value, change, detail, icon: Icon, tone }) => (
                  <article key={label} className="glass-panel rounded-3xl p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm text-[#90a3c5]">{label}</p>
                        <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white">
                          {value}
                        </p>
                      </div>
                      <div className={`rounded-2xl bg-white/6 p-3 ${tone}`}>
                        <Icon size={24} weight="duotone" />
                      </div>
                    </div>
                    <div className="mt-6 flex items-center justify-between gap-3 text-sm">
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/6 px-2.5 py-1 text-white">
                        <ArrowUpRight size={14} className={tone} />
                        {change}
                      </span>
                      <span className="max-w-[14rem] text-right text-[#90a3c5]">{detail}</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <aside className="glass-panel rounded-[28px] p-5 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#90a3c5]">Weekly revenue pulse</p>
                  <h2 className="mt-1 text-2xl font-semibold tracking-[-0.04em]">
                    $486K booked
                  </h2>
                </div>
                <div className="rounded-2xl bg-[#7cf2c9]/12 px-3 py-2 text-sm text-[#7cf2c9]">
                  +12.4% vs target
                </div>
              </div>

              <div className="mt-8 flex h-52 items-end gap-3">
                {revenueBars.map((bar) => (
                  <div key={bar.label} className="flex flex-1 flex-col items-center gap-3">
                    <div className="flex h-full w-full items-end rounded-full bg-white/[0.04] p-1">
                      <div
                        className="bar-glow w-full rounded-full bg-gradient-to-t from-[#44d4ff] to-[#7cf2c9]"
                        style={{ height: `${bar.value}%` }}
                      />
                    </div>
                    <span className="text-xs uppercase tracking-[0.18em] text-[#90a3c5]">
                      {bar.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid gap-3 md:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-[#90a3c5]">Conv. rate</p>
                  <p className="mt-2 text-2xl font-semibold">6.8%</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-[#90a3c5]">CAC</p>
                  <p className="mt-2 text-2xl font-semibold">$124</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-[#90a3c5]">Payback</p>
                  <p className="mt-2 text-2xl font-semibold">3.7 mo</p>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
          <div className="grid gap-6">
            <article className="glass-panel rounded-[28px] p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-[#90a3c5]">Priority initiatives</p>
                  <h2 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-white">
                    Teams moving the number this week
                  </h2>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#90a3c5]">
                  <Funnel size={16} />
                  Sorted by business impact
                </div>
              </div>

              <div className="mt-8 space-y-4">
                {initiatives.map((initiative) => (
                  <div
                    key={initiative.name}
                    className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-lg font-medium text-white">{initiative.name}</p>
                        <p className="mt-1 text-sm text-[#90a3c5]">{initiative.owner}</p>
                      </div>
                      <div className="rounded-full bg-white/6 px-3 py-1 text-sm text-white">
                        {initiative.status}
                      </div>
                    </div>
                    <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/[0.06]">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#44d4ff] to-[#7cf2c9]"
                        style={{ width: `${initiative.progress}%` }}
                      />
                    </div>
                    <div className="mt-2 flex items-center justify-between text-sm text-[#90a3c5]">
                      <span>Execution progress</span>
                      <span>{initiative.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="glass-panel rounded-[28px] p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-[#90a3c5]">System loadout</p>
                  <h2 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-white">
                    Operating rhythm
                  </h2>
                </div>
                <div className="rounded-full border border-white/10 px-3 py-1 text-sm text-[#90a3c5]">
                  3 blockers need action
                </div>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
                  <ClockCountdown size={24} className="text-[#44d4ff]" />
                  <p className="mt-6 text-sm text-[#90a3c5]">Next review</p>
                  <p className="mt-2 text-2xl font-semibold text-white">14:30 UTC</p>
                </div>
                <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
                  <CompassTool size={24} className="text-[#7cf2c9]" />
                  <p className="mt-6 text-sm text-[#90a3c5]">Top channel</p>
                  <p className="mt-2 text-2xl font-semibold text-white">Partner referrals</p>
                </div>
                <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
                  <ListChecks size={24} className="text-[#ffcf74]" />
                  <p className="mt-6 text-sm text-[#90a3c5]">Ops completion</p>
                  <p className="mt-2 text-2xl font-semibold text-white">27 / 31</p>
                </div>
              </div>
            </article>
          </div>

          <div className="grid gap-6">
            <article className="glass-panel rounded-[28px] p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-[#90a3c5]">Live signal feed</p>
                  <h2 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-white">
                    What changed recently
                  </h2>
                </div>
                <span className="rounded-full bg-[#7cf2c9]/12 px-3 py-1 text-sm text-[#7cf2c9]">
                  Synced
                </span>
              </div>

              <div className="mt-8 space-y-4">
                {activity.map(({ title, detail, meta, icon: Icon }) => (
                  <div
                    key={title}
                    className="flex gap-4 rounded-[24px] border border-white/8 bg-white/[0.03] p-4"
                  >
                    <div className="rounded-2xl bg-white/6 p-3 text-[#44d4ff]">
                      <Icon size={20} weight="duotone" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="font-medium text-white">{title}</p>
                        <span className="text-sm text-[#90a3c5]">{meta}</span>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-[#b7c7e6]">{detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="glass-panel rounded-[28px] p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-[#90a3c5]">Operator checklist</p>
                  <h2 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-white">
                    Today&apos;s focus list
                  </h2>
                </div>
                <span className="text-sm text-[#90a3c5]">Updated 5 min ago</span>
              </div>

              <div className="mt-8 space-y-3">
                {tasks.map((task, index) => (
                  <div
                    key={task}
                    className="flex items-start gap-4 rounded-[22px] border border-white/8 bg-white/[0.03] p-4"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-sm font-semibold text-[#07111f]">
                      {index + 1}
                    </div>
                    <p className="pt-1 text-sm leading-6 text-[#d9e5fb]">{task}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}
