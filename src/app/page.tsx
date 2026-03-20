"use client";

import {
  ArrowUpRight,
  Brain,
  ChatCenteredDots,
  CheckCircle,
  ClockCountdown,
  Eye,
  Gauge,
  MagicWand,
  Pulse,
  ShieldCheck,
  SlidersHorizontal,
  Sparkle,
  Target,
  TrendUp,
  Warning,
} from "@phosphor-icons/react";
import { motion } from "framer-motion";
import {
  Avatar,
  AvatarFallback,
  Button,
  Input,
  Separator,
  Switch,
  SwitchThumb,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components";

const summary = [
  {
    label: "Weighted quality score",
    value: "92.4",
    note: "+4.8 since last prompt revision",
    tone: "text-emerald-300",
  },
  {
    label: "Pass rate",
    value: "87%",
    note: "128 of 147 dashboard runs accepted",
    tone: "text-cyan-300",
  },
  {
    label: "Median review time",
    value: "3m 18s",
    note: "-42s after rubric cleanup",
    tone: "text-amber-200",
  },
];

const rubric = [
  {
    name: "Information hierarchy",
    score: 96,
    weight: "24%",
    detail: "The strongest runs create immediate scan paths and leave almost no dead space.",
    gradient: "from-emerald-300 via-teal-300 to-cyan-400",
  },
  {
    name: "Metric integrity",
    score: 91,
    weight: "21%",
    detail: "Most outputs keep relationships between KPIs coherent, but edge-case labels still drift.",
    gradient: "from-cyan-300 via-sky-300 to-blue-400",
  },
  {
    name: "Visual originality",
    score: 88,
    weight: "18%",
    detail: "Layouts feel deliberate instead of template-bound, with stronger typography choices this week.",
    gradient: "from-amber-200 via-orange-300 to-rose-400",
  },
  {
    name: "Decision usefulness",
    score: 94,
    weight: "22%",
    detail: "Claude surfaces practical next actions instead of generic praise or descriptive fluff.",
    gradient: "from-lime-200 via-emerald-300 to-teal-400",
  },
  {
    name: "Implementation safety",
    score: 89,
    weight: "15%",
    detail: "Most changes are production-safe; weak spots cluster around brittle empty states and spacing regressions.",
    gradient: "from-fuchsia-200 via-rose-300 to-orange-300",
  },
];

const queue = [
  {
    id: "RUN-147",
    app: "Revenue control center",
    state: "Accepted",
    stateTone: "bg-emerald-300/14 text-emerald-200",
    score: "94.1",
    note: "Clear command path, convincing chart cadence, strong CTA framing.",
  },
  {
    id: "RUN-146",
    app: "Field ops cockpit",
    state: "Needs edits",
    stateTone: "bg-amber-300/14 text-amber-100",
    score: "84.6",
    note: "Useful content, but top-third density collapses on mobile and trends lose contrast.",
  },
  {
    id: "RUN-145",
    app: "Client success monitor",
    state: "Escalated",
    stateTone: "bg-rose-400/14 text-rose-100",
    score: "73.9",
    note: "Executive summary reads well, but confidence signals are not backed by visible evidence.",
  },
];

const failureModes = [
  {
    title: "Beautiful but empty",
    count: "11 runs",
    description: "High-polish layouts that under-explain why the dashboard matters or what to do next.",
  },
  {
    title: "Metric clutter",
    count: "8 runs",
    description: "Too many adjacent cards with identical visual weight, flattening the reading order.",
  },
  {
    title: "Generic chart theater",
    count: "5 runs",
    description: "Bars and sparklines animate cleanly, but they are not tied to the actual operating story.",
  },
];

const promptHooks = [
  "Demand explicit ranking of what a user should notice first, second, and third.",
  "Score whether every major metric has a consequence, not just a label.",
  "Penalize dashboards that look premium but could belong to any product category.",
  "Require mobile-specific criticism whenever density or wrapping creates ambiguity.",
];

const reviewers = [
  {
    name: "Maya",
    role: "Prompt systems",
    focus: "Owns rubric calibration and score normalization.",
    badge: "Stable",
    badgeTone: "bg-emerald-300/14 text-emerald-100",
  },
  {
    name: "Jun",
    role: "Design QA",
    focus: "Flags visual sameness and weak hierarchy in top-of-fold layouts.",
    badge: "Reviewing",
    badgeTone: "bg-cyan-300/14 text-cyan-100",
  },
  {
    name: "Rae",
    role: "Frontend safety",
    focus: "Tracks implementation drift, fragile states, and component misuse.",
    badge: "Escalations",
    badgeTone: "bg-amber-300/14 text-amber-100",
  },
];

const timeline = [
  {
    time: "09:10 UTC",
    title: "Prompt pack v12 promoted",
    detail: "High-reasoning evaluation now weighs decision utility above decorative novelty.",
  },
  {
    time: "09:34 UTC",
    title: "Calibration batch closed",
    detail: "False-positive acceptance rate dropped after stricter checks on evidence-to-claim alignment.",
  },
  {
    time: "10:02 UTC",
    title: "Queue pressure normal",
    detail: "Average wait time is within target even with higher review depth enabled.",
  },
];

const trace = [
  {
    label: "Model",
    value: "Claude Sonnet 4.6",
    icon: Brain,
  },
  {
    label: "Reasoning mode",
    value: "High",
    icon: Sparkle,
  },
  {
    label: "Current lens",
    value: "Dashboard output quality",
    icon: Eye,
  },
];

const container = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function Page() {
  return (
    <main className="min-h-screen overflow-hidden bg-[var(--bg)] text-[var(--text)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(108,240,201,0.18),transparent_28%),radial-gradient(circle_at_82%_12%,rgba(255,176,92,0.14),transparent_24%),radial-gradient(circle_at_50%_100%,rgba(83,137,255,0.12),transparent_30%)]" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="glass-panel rounded-[30px] px-5 py-5 sm:px-6"
        >
          <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-3xl">
              <div className="eyebrow">
                <Sparkle size={14} weight="fill" />
                Scoring Agent
              </div>
              <h1 className="mt-4 max-w-2xl font-display text-4xl leading-none text-white sm:text-5xl lg:text-[3.6rem]">
                Evaluate dashboard output quality before polished noise ships to production.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--muted)] sm:text-base">
                This workspace grades hierarchy, originality, decision usefulness, and implementation safety across live dashboard runs. The
                active evaluator is tuned for thorough review, not fast approval.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:min-w-[340px]">
              <div className="panel-soft rounded-[24px] p-4">
                <div className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">Active model</div>
                <div className="mt-3 flex items-center gap-3 text-white">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/8 text-[var(--accent)]">
                    <Brain size={22} weight="duotone" />
                  </div>
                  <div>
                    <div className="font-semibold">Claude Sonnet 4.6</div>
                    <div className="text-sm text-[var(--muted)]">High reasoning enabled</div>
                  </div>
                </div>
              </div>

              <div className="panel-soft rounded-[24px] p-4">
                <div className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">Next calibration</div>
                <div className="mt-3 flex items-center gap-2 text-sm text-white">
                  <ClockCountdown size={18} className="text-[var(--accent)]" />
                  10:45 UTC in 28 min
                </div>
                <div className="mt-3 flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-emerald-200">
                  <span className="status-dot bg-emerald-300" />
                  Queue healthy
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-3 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="grid gap-3 sm:grid-cols-3">
              {summary.map((item) => (
                <div key={item.label} className="panel-soft rounded-[24px] p-4">
                  <div className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">{item.label}</div>
                  <div className="mt-3 text-3xl font-semibold text-white">{item.value}</div>
                  <div className={`mt-2 text-sm ${item.tone}`}>{item.note}</div>
                </div>
              ))}
            </div>

            <div className="panel-grid rounded-[26px] p-4 sm:p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">Operator note</div>
                  <div className="mt-2 text-lg font-semibold text-white">Approval quality is up, but visual safety still trails content quality.</div>
                </div>
                <div className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs font-semibold text-white">Batch 22</div>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110">
                  Open review brief
                  <ArrowUpRight size={16} weight="bold" />
                </Button>
                <Button className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                  Adjust rubric
                  <SlidersHorizontal size={16} weight="bold" />
                </Button>
              </div>
            </div>
          </div>
        </motion.header>

        <section className="mt-4 grid flex-1 gap-4 xl:grid-cols-[1.45fr_0.85fr]">
          <div className="grid gap-4">
            <motion.section
              variants={container}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
              className="glass-panel rounded-[30px] p-4 sm:p-5"
            >
              <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
                <div className="panel-grid rounded-[28px] p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="eyebrow text-cyan-100/78">
                        <Gauge size={14} weight="fill" />
                        Overall signal
                      </div>
                      <div className="mt-4 max-w-lg font-display text-3xl leading-tight text-white sm:text-[2.45rem]">
                        The agent is reliably identifying dashboards that communicate action instead of atmosphere.
                      </div>
                    </div>
                    <div className="hidden rounded-3xl border border-white/10 bg-white/6 p-4 text-white/80 sm:block">
                      <Target size={28} weight="duotone" />
                    </div>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    {[
                      ["Top issue", "Evidence gaps"],
                      ["Biggest gain", "Sharper mobile critique"],
                      ["Confidence", "High"],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-[22px] border border-white/10 bg-black/20 p-4">
                        <div className="text-xs uppercase tracking-[0.18em] text-cyan-50/58">{label}</div>
                        <div className="mt-3 text-xl font-semibold text-white">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="panel-soft rounded-[28px] p-5 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">Scoring mix</div>
                      <div className="mt-2 font-display text-3xl text-white">5 lenses</div>
                    </div>
                    <div className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                      Calibrated
                    </div>
                  </div>

                  <div className="mt-5 space-y-4">
                    {rubric.map((item, index) => (
                      <div key={item.name}>
                        <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                          <span className="text-[var(--muted)]">{item.name}</span>
                          <span className="font-semibold text-white">{item.score}</span>
                        </div>
                        <div className="h-2.5 overflow-hidden rounded-full bg-white/7">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${item.score}%` }}
                            transition={{ duration: 0.7, delay: 0.12 + index * 0.05, ease: "easeOut" }}
                            className={`h-full rounded-full bg-gradient-to-r ${item.gradient}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-[22px] border border-white/10 bg-black/20 p-4 text-sm leading-6 text-[var(--muted)]">
                    Runs scoring above <span className="font-semibold text-white">90</span> almost always tie metrics to an operational decision
                    within the first screen.
                  </div>
                </div>
              </div>
            </motion.section>

            <motion.section
              variants={container}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.5, delay: 0.16, ease: "easeOut" }}
              className="glass-panel rounded-[30px] p-4 sm:p-5"
            >
              <Tabs defaultValue="rubric" className="grid gap-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <div className="eyebrow">
                      <MagicWand size={14} weight="fill" />
                      Review surface
                    </div>
                    <h2 className="mt-3 font-display text-3xl text-white">Where the scoring agent is looking</h2>
                  </div>
                  <TabsList className="inline-flex w-full flex-wrap gap-2 rounded-2xl border border-white/10 bg-white/5 p-1 lg:w-auto">
                    <TabsTrigger
                      value="rubric"
                      className="rounded-xl px-4 py-2 text-sm text-[var(--muted)] transition data-[selected]:bg-white data-[selected]:text-slate-950"
                    >
                      Rubric
                    </TabsTrigger>
                    <TabsTrigger
                      value="failures"
                      className="rounded-xl px-4 py-2 text-sm text-[var(--muted)] transition data-[selected]:bg-white data-[selected]:text-slate-950"
                    >
                      Failures
                    </TabsTrigger>
                    <TabsTrigger
                      value="prompt"
                      className="rounded-xl px-4 py-2 text-sm text-[var(--muted)] transition data-[selected]:bg-white data-[selected]:text-slate-950"
                    >
                      Prompt hooks
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="rubric" className="grid gap-3">
                  {rubric.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: 0.06 * index + 0.2 }}
                      className="panel-soft rounded-[24px] p-4 sm:p-5"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="max-w-2xl">
                          <div className="flex flex-wrap items-center gap-3">
                            <div className="text-lg font-semibold text-white">{item.name}</div>
                            <div className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
                              Weight {item.weight}
                            </div>
                          </div>
                          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{item.detail}</p>
                        </div>
                        <div className="rounded-[20px] border border-white/10 bg-black/20 px-4 py-3 text-right">
                          <div className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">Score</div>
                          <div className="mt-1 text-3xl font-semibold text-white">{item.score}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </TabsContent>

                <TabsContent value="failures" className="grid gap-3 md:grid-cols-3">
                  {failureModes.map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: 0.06 * index + 0.2 }}
                      className="panel-soft rounded-[24px] p-5"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="rounded-2xl bg-rose-300/10 p-3 text-rose-100">
                          <Warning size={22} weight="fill" />
                        </div>
                        <div className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs font-semibold text-white">
                          {item.count}
                        </div>
                      </div>
                      <div className="mt-4 text-xl font-semibold text-white">{item.title}</div>
                      <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{item.description}</p>
                    </motion.div>
                  ))}
                </TabsContent>

                <TabsContent value="prompt" className="grid gap-3 md:grid-cols-2">
                  {promptHooks.map((hook, index) => (
                    <motion.div
                      key={hook}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: 0.06 * index + 0.2 }}
                      className="panel-soft rounded-[24px] p-5"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 rounded-full bg-white/8 p-2 text-[var(--accent)]">
                          <CheckCircle size={18} weight="fill" />
                        </div>
                        <p className="text-sm leading-6 text-white/90">{hook}</p>
                      </div>
                    </motion.div>
                  ))}
                </TabsContent>
              </Tabs>
            </motion.section>

            <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
              <motion.section
                variants={container}
                initial="hidden"
                animate="show"
                transition={{ duration: 0.5, delay: 0.22, ease: "easeOut" }}
                className="glass-panel rounded-[30px] p-4 sm:p-5"
              >
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <div className="eyebrow">
                      <Pulse size={14} weight="fill" />
                      Queue
                    </div>
                    <h2 className="mt-3 font-display text-3xl text-white">Recent review decisions</h2>
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white">147 runs</div>
                </div>

                <div className="mt-5 space-y-3">
                  {queue.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: 0.06 * index + 0.2 }}
                      className="panel-soft rounded-[24px] p-4"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="max-w-xl">
                          <div className="flex flex-wrap items-center gap-3">
                            <div className="text-sm font-semibold tracking-[0.14em] text-[var(--muted)]">{item.id}</div>
                            <div className={`rounded-full px-3 py-1 text-xs font-semibold ${item.stateTone}`}>{item.state}</div>
                          </div>
                          <div className="mt-2 text-lg font-semibold text-white">{item.app}</div>
                          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{item.note}</p>
                        </div>
                        <div className="rounded-[20px] border border-white/10 bg-black/20 px-4 py-3 text-right">
                          <div className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">Score</div>
                          <div className="mt-1 text-3xl font-semibold text-white">{item.score}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              <motion.section
                variants={container}
                initial="hidden"
                animate="show"
                transition={{ duration: 0.5, delay: 0.28, ease: "easeOut" }}
                className="glass-panel rounded-[30px] p-4 sm:p-5"
              >
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <div className="eyebrow">
                      <TrendUp size={14} weight="fill" />
                      Trace
                    </div>
                    <h2 className="mt-3 font-display text-3xl text-white">Current evaluation timeline</h2>
                  </div>
                  <div className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                    Live
                  </div>
                </div>

                <div className="mt-5 space-y-4">
                  {timeline.map((item) => (
                    <div key={item.title} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="status-dot mt-1 bg-[var(--accent)]" />
                        <div className="mt-2 h-full w-px bg-white/10" />
                      </div>
                      <div className="pb-4">
                        <div className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">{item.time}</div>
                        <div className="mt-2 font-semibold text-white">{item.title}</div>
                        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
            </div>
          </div>

          <div className="grid gap-4">
            <motion.aside
              variants={container}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.45, delay: 0.12, ease: "easeOut" }}
              className="glass-panel rounded-[30px] p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="eyebrow">
                    <ShieldCheck size={14} weight="fill" />
                    Run controls
                  </div>
                  <h2 className="mt-3 font-display text-3xl text-white">Current scoring session</h2>
                </div>
                <div className="rounded-full bg-emerald-300/14 px-3 py-1 text-xs font-semibold text-emerald-100">Guarded</div>
              </div>

              <div className="mt-5 grid gap-3">
                {trace.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.label} className="panel-soft rounded-[22px] p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/8 text-[var(--accent)]">
                          <Icon size={20} weight="duotone" />
                        </div>
                        <div>
                          <div className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">{item.label}</div>
                          <div className="mt-1 font-semibold text-white">{item.value}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <Separator className="my-5 h-px bg-white/10" />

              <div className="space-y-4">
                <label className="flex items-center justify-between gap-4 rounded-[22px] border border-white/10 bg-white/5 px-4 py-3">
                  <div>
                    <div className="font-semibold text-white">Strict calibration</div>
                    <div className="mt-1 text-sm text-[var(--muted)]">Reject borderline outputs when evidence does not support the story.</div>
                  </div>
                  <Switch
                    defaultChecked
                    className="flex h-8 w-14 items-center rounded-full bg-emerald-300/25 p-1 transition data-[checked]:bg-emerald-300/35"
                  >
                    <SwitchThumb className="block h-6 w-6 rounded-full bg-white transition data-[checked]:translate-x-6" />
                  </Switch>
                </label>

                <label className="flex items-center justify-between gap-4 rounded-[22px] border border-white/10 bg-white/5 px-4 py-3">
                  <div>
                    <div className="font-semibold text-white">Mobile-first penalties</div>
                    <div className="mt-1 text-sm text-[var(--muted)]">Increase score impact when layout density breaks at smaller widths.</div>
                  </div>
                  <Switch className="flex h-8 w-14 items-center rounded-full bg-white/10 p-1 transition data-[checked]:bg-emerald-300/35">
                    <SwitchThumb className="block h-6 w-6 rounded-full bg-white transition data-[checked]:translate-x-6" />
                  </Switch>
                </label>
              </div>

              <div className="mt-5">
                <label className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]" htmlFor="session-note">
                  Session note
                </label>
                <Input
                  id="session-note"
                  defaultValue="Prioritize evidence-to-claim alignment in hero summaries."
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
                />
              </div>
            </motion.aside>

            <motion.aside
              variants={container}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.45, delay: 0.18, ease: "easeOut" }}
              className="glass-panel rounded-[30px] p-5"
            >
              <div className="flex items-end justify-between gap-4">
                <div>
                  <div className="eyebrow">
                    <ChatCenteredDots size={14} weight="fill" />
                    Reviewer bench
                  </div>
                  <h2 className="mt-3 font-display text-3xl text-white">Who is shaping the score</h2>
                </div>
                <Button className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10">
                  Add reviewer
                </Button>
              </div>

              <div className="mt-5 space-y-3">
                {reviewers.map((person) => (
                  <div key={person.name} className="panel-soft rounded-[24px] p-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                        <AvatarFallback className="font-semibold text-white">{person.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <div className="font-semibold text-white">{person.name}</div>
                          <div className={`rounded-full px-3 py-1 text-xs font-semibold ${person.badgeTone}`}>{person.badge}</div>
                        </div>
                        <div className="mt-1 text-sm text-[var(--muted)]">{person.role}</div>
                        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{person.focus}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.aside>

            <motion.aside
              variants={container}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.45, delay: 0.24, ease: "easeOut" }}
              className="glass-panel rounded-[30px] p-5"
            >
              <div className="eyebrow">
                <Eye size={14} weight="fill" />
                Final check
              </div>
              <h2 className="mt-3 font-display text-3xl text-white">What must be true before approval</h2>

              <div className="mt-5 space-y-3">
                {[
                  "The top section explains what changed and why it matters without requiring chart interpretation first.",
                  "At least one metric leads directly to a decision or escalation path.",
                  "Visual treatment feels specific to the product context rather than a generic analytics template.",
                  "Responsive density holds up without truncating meaning or reducing contrast.",
                ].map((rule) => (
                  <div key={rule} className="flex gap-3 rounded-[22px] border border-white/10 bg-white/5 p-4">
                    <div className="mt-0.5 rounded-full bg-emerald-300/14 p-2 text-emerald-200">
                      <CheckCircle size={16} weight="fill" />
                    </div>
                    <p className="text-sm leading-6 text-[var(--muted)]">{rule}</p>
                  </div>
                ))}
              </div>
            </motion.aside>
          </div>
        </section>
      </div>
    </main>
  );
}
