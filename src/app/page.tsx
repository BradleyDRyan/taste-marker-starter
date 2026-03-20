"use client";

import {
  ArrowUpRight,
  ChartLineUp,
  ClockCountdown,
  CubeTransparent,
  Lightning,
  ShieldCheck,
  Sparkle,
} from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, Button, Tabs, TabsContent, TabsList, TabsTrigger } from "@/components";

const metrics = [
  {
    label: "Net revenue",
    value: "$128.4K",
    delta: "+18.2%",
    note: "vs last cycle",
  },
  {
    label: "Active automations",
    value: "42",
    delta: "+6",
    note: "deployed this week",
  },
  {
    label: "Risk events",
    value: "03",
    delta: "-41%",
    note: "down from yesterday",
  },
];

const pipeline = [
  { name: "Signal quality", value: 82, tone: "from-cyan-300 to-sky-500" },
  { name: "Flow coverage", value: 68, tone: "from-emerald-300 to-teal-500" },
  { name: "Team bandwidth", value: 54, tone: "from-amber-200 to-orange-500" },
  { name: "Recovery readiness", value: 91, tone: "from-fuchsia-300 to-rose-500" },
];

const activity = [
  {
    title: "Latency shield raised",
    description: "Inference queue rebalanced after a spike in East region traffic.",
    time: "4 min ago",
  },
  {
    title: "Forecast published",
    description: "Revenue confidence model pushed a new 14-day outlook to finance.",
    time: "26 min ago",
  },
  {
    title: "Vendor sync cleared",
    description: "Security review passed for two pending infrastructure vendors.",
    time: "1 hr ago",
  },
];

const squad = [
  { name: "Ava", role: "Growth systems", status: "Shipping", color: "bg-emerald-400" },
  { name: "Noah", role: "Risk controls", status: "Monitoring", color: "bg-cyan-400" },
  { name: "Mina", role: "Data quality", status: "Reviewing", color: "bg-amber-400" },
];

export default function Page() {
  return (
    <main className="min-h-screen overflow-hidden bg-[var(--bg)] text-[var(--text)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(120,255,214,0.14),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(248,180,80,0.16),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_28%)]" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="glass-panel mb-4 flex flex-col gap-4 rounded-[28px] px-5 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">
              <Sparkle size={14} weight="fill" />
              Northstar Command
            </div>
            <div className="max-w-2xl">
              <h1 className="font-display text-4xl leading-none sm:text-5xl">
                Operating dashboard for teams that move before the room does.
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--muted)] sm:text-base">
                Live view across growth, resilience, and execution. Tuned for decision velocity, not just reporting.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
              <div className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                Control window
              </div>
              <div className="mt-1 flex items-center gap-2 text-sm">
                <ClockCountdown size={18} className="text-[var(--accent)]" />
                09:30 UTC handoff in 42 min
              </div>
            </div>
            <Button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110">
              Open briefing
              <ArrowUpRight size={16} weight="bold" />
            </Button>
          </div>
        </motion.header>

        <section className="grid flex-1 gap-4 lg:grid-cols-[1.4fr_0.9fr]">
          <div className="grid gap-4">
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
              className="glass-panel rounded-[30px] p-4 sm:p-5"
            >
              <div className="grid gap-3 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="rounded-[26px] bg-[linear-gradient(135deg,rgba(6,29,43,0.92),rgba(18,58,74,0.78))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-cyan-100/70">
                        Strategic pulse
                      </div>
                      <div className="mt-3 max-w-sm font-display text-3xl leading-tight text-white sm:text-[2.35rem]">
                        Momentum is compounding across the highest-yield channels.
                      </div>
                    </div>
                    <div className="hidden rounded-2xl border border-white/10 bg-white/5 p-3 text-cyan-100/70 sm:block">
                      <ChartLineUp size={28} weight="duotone" />
                    </div>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    {metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                      >
                        <div className="text-xs uppercase tracking-[0.18em] text-cyan-50/58">{metric.label}</div>
                        <div className="mt-3 text-3xl font-semibold text-white">{metric.value}</div>
                        <div className="mt-1 text-sm text-emerald-300">{metric.delta}</div>
                        <div className="mt-2 text-sm text-cyan-50/62">{metric.note}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[26px] border border-white/10 bg-black/15 p-5 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">
                        Forecast spread
                      </div>
                      <div className="mt-2 font-display text-3xl text-white">71%</div>
                    </div>
                    <div className="rounded-full border border-emerald-300/30 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                      Stable
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    {pipeline.map((item) => (
                      <div key={item.name}>
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span className="text-[var(--muted)]">{item.name}</span>
                          <span className="font-semibold text-white">{item.value}%</span>
                        </div>
                        <div className="h-2.5 overflow-hidden rounded-full bg-white/8">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${item.value}%` }}
                            transition={{ duration: 0.7, delay: 0.18, ease: "easeOut" }}
                            className={`h-full rounded-full bg-gradient-to-r ${item.tone}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-[var(--muted)]">
                    Autonomous guardrails covered <span className="font-semibold text-white">96.4%</span> of critical routes over the last
                    24 hours.
                  </div>
                </div>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16, ease: "easeOut" }}
              className="glass-panel rounded-[30px] p-4 sm:p-5"
            >
              <Tabs defaultValue="ops" className="grid gap-5">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">
                      Scenario board
                    </div>
                    <h2 className="mt-2 font-display text-3xl text-white">Three views of the same machine</h2>
                  </div>
                  <TabsList className="inline-flex w-full flex-wrap gap-2 rounded-2xl border border-white/10 bg-white/5 p-1 md:w-auto">
                    <TabsTrigger
                      value="ops"
                      className="rounded-xl px-4 py-2 text-sm text-[var(--muted)] transition data-[selected]:bg-white data-[selected]:text-slate-950"
                    >
                      Operations
                    </TabsTrigger>
                    <TabsTrigger
                      value="revenue"
                      className="rounded-xl px-4 py-2 text-sm text-[var(--muted)] transition data-[selected]:bg-white data-[selected]:text-slate-950"
                    >
                      Revenue
                    </TabsTrigger>
                    <TabsTrigger
                      value="risk"
                      className="rounded-xl px-4 py-2 text-sm text-[var(--muted)] transition data-[selected]:bg-white data-[selected]:text-slate-950"
                    >
                      Risk
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="ops" className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                  <div className="rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-5">
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-cyan-400/12 p-3 text-cyan-200">
                        <Lightning size={24} weight="fill" />
                      </div>
                      <div>
                        <div className="text-sm text-[var(--muted)]">Operational recommendation</div>
                        <div className="mt-1 text-xl font-semibold text-white">Route premium demand through the assisted queue.</div>
                      </div>
                    </div>
                    <div className="mt-5 grid gap-3 sm:grid-cols-3">
                      {[
                        ["Decision lift", "+14%"],
                        ["Human touchpoints", "11"],
                        ["Rollback exposure", "Low"],
                      ].map(([label, value]) => (
                        <div key={label} className="rounded-2xl bg-black/20 p-4">
                          <div className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">{label}</div>
                          <div className="mt-2 text-2xl font-semibold text-white">{value}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[26px] border border-white/10 bg-black/15 p-5">
                    <div className="flex items-center gap-3">
                      <CubeTransparent size={20} className="text-[var(--accent)]" />
                      <div className="text-sm text-[var(--muted)]">Load contour</div>
                    </div>
                    <div className="mt-5 flex h-48 items-end gap-3">
                      {[28, 54, 43, 72, 61, 88, 70, 94].map((height, index) => (
                        <motion.div
                          key={index}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: `${height}%`, opacity: 1 }}
                          transition={{ duration: 0.45, delay: 0.04 * index + 0.18 }}
                          className="flex-1 rounded-t-[18px] bg-[linear-gradient(180deg,rgba(126,255,214,0.95),rgba(20,151,182,0.24))]"
                        />
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="revenue" className="grid gap-4 md:grid-cols-3">
                  {[
                    ["Upside unlocked", "$34.8K", "Enterprise renewals are pacing ahead of plan."],
                    ["Conversion velocity", "2.4x", "Priority nurture flows are shortening sales cycles."],
                    ["Expansion routes", "17", "Account signals suggest room for cross-sell this week."],
                  ].map(([label, value, note]) => (
                    <div key={label} className="rounded-[26px] border border-white/10 bg-white/5 p-5">
                      <div className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">{label}</div>
                      <div className="mt-3 font-display text-4xl text-white">{value}</div>
                      <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{note}</p>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="risk" className="grid gap-4 md:grid-cols-[0.95fr_1.05fr]">
                  <div className="rounded-[26px] border border-white/10 bg-[linear-gradient(145deg,rgba(82,17,17,0.45),rgba(17,24,39,0.35))] p-5">
                    <div className="flex items-center gap-3">
                      <ShieldCheck size={24} className="text-rose-200" />
                      <div className="text-lg font-semibold text-white">Guardrails holding</div>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-rose-50/78">
                      No critical compliance breaches detected. Two medium-severity anomalies remain under observation with automated fallback in
                      place.
                    </p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      ["Escalation depth", "02"],
                      ["Exposure radius", "7.1%"],
                      ["Systems patched", "18"],
                      ["Confidence score", "93"],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-[24px] border border-white/10 bg-black/20 p-5">
                        <div className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">{label}</div>
                        <div className="mt-2 text-3xl font-semibold text-white">{value}</div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </motion.section>
          </div>

          <div className="grid gap-4">
            <motion.aside
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.12, ease: "easeOut" }}
              className="glass-panel rounded-[30px] p-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">Live activity</div>
                  <h2 className="mt-2 font-display text-3xl text-white">What changed</h2>
                </div>
                <div className="rounded-full bg-emerald-300/14 px-3 py-1 text-xs font-semibold text-emerald-200">Synced</div>
              </div>

              <div className="mt-6 space-y-3">
                {activity.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.1 * index + 0.2 }}
                    className="rounded-[24px] border border-white/10 bg-white/5 p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="font-semibold text-white">{item.title}</div>
                        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{item.description}</p>
                      </div>
                      <div className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">{item.time}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.aside>

            <motion.aside
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.2, ease: "easeOut" }}
              className="glass-panel rounded-[30px] p-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">Crew readiness</div>
                  <h2 className="mt-2 font-display text-3xl text-white">Team pulse</h2>
                </div>
                <Button className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10">
                  Assign
                </Button>
              </div>

              <div className="mt-6 space-y-3">
                {squad.map((person) => (
                  <div key={person.name} className="flex items-center gap-4 rounded-[24px] border border-white/10 bg-white/5 p-4">
                    <Avatar className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-white/10">
                      <AvatarFallback className="font-semibold text-white">{person.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-white">{person.name}</div>
                      <div className="text-sm text-[var(--muted)]">{person.role}</div>
                    </div>
                    <div className="flex items-center gap-2 rounded-full bg-black/20 px-3 py-1.5 text-xs font-semibold text-white">
                      <span className={`h-2.5 w-2.5 rounded-full ${person.color}`} />
                      {person.status}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-[24px] border border-dashed border-white/14 bg-black/15 p-4 text-sm leading-6 text-[var(--muted)]">
                Coverage is strongest across growth and monitoring. Data quality becomes the constraint after 14:00 UTC if intake remains above
                baseline.
              </div>
            </motion.aside>
          </div>
        </section>
      </div>
    </main>
  );
}
