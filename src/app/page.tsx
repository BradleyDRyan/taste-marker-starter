"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import {
  Avatar,
  AvatarFallback,
  Button,
  Progress,
  ProgressIndicator,
  ProgressTrack,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components";

type ScenarioKey = "executive" | "operations" | "growth";
type Severity = "high" | "medium" | "low";
type Tone = "sky" | "emerald" | "amber" | "rose";
type TraceStatus = "complete" | "active" | "queued";

type Pillar = {
  label: string;
  score: number;
  detail: string;
  note: string;
  tone: Tone;
};

type Finding = {
  title: string;
  severity: Severity;
  detail: string;
  owner: string;
  eta: string;
};

type Benchmark = {
  label: string;
  score: number;
  note: string;
};

type Trace = {
  step: string;
  summary: string;
  duration: string;
  status: TraceStatus;
};

type Reviewer = {
  name: string;
  role: string;
  initials: string;
};

type ReviewPayload = {
  name: string;
  strapline: string;
  summary: string;
  score: number;
  delta: number;
  confidence: number;
  latency: string;
  lastRun: string;
  model: string;
  focus: string[];
  pillars: Pillar[];
  findings: Finding[];
  benchmarks: Benchmark[];
  traces: Trace[];
  reviewers: Reviewer[];
  callout: {
    title: string;
    metric: string;
    detail: string;
  };
};

const reviews: Record<ScenarioKey, ReviewPayload> = {
  executive: {
    name: "Executive KPI deck",
    strapline: "Board-facing summary tuned for fast readouts and confident decisions.",
    summary:
      "Claude Sonnet 4.6 runs a high-reasoning pass over narrative clarity, chart hierarchy, metric trust, and executive actionability before anything ships upstream.",
    score: 92.4,
    delta: 3.2,
    confidence: 97,
    latency: "18.4s",
    lastRun: "Updated 3 minutes ago",
    model: "Claude Sonnet 4.6 / high reasoning",
    focus: ["Story hierarchy", "Metric provenance", "Decision cues"],
    pillars: [
      {
        label: "Narrative clarity",
        score: 95,
        detail: "Top-line message lands in the first viewport with minimal noise.",
        note: "Best performing pillar this run",
        tone: "sky",
      },
      {
        label: "Trust signals",
        score: 91,
        detail: "Benchmarks, timestamps, and source context are present and easy to verify.",
        note: "Small gap in confidence copy",
        tone: "emerald",
      },
      {
        label: "Visual hierarchy",
        score: 88,
        detail: "Most chart weights are correct, but secondary labels still compete with the score.",
        note: "Needs one more contrast pass",
        tone: "amber",
      },
      {
        label: "Actionability",
        score: 96,
        detail: "Next steps are explicit, owned, and linked to measurable business impact.",
        note: "Clear owner mapping",
        tone: "rose",
      },
    ],
    findings: [
      {
        title: "Comparative trend labels collapse on medium widths",
        severity: "high",
        detail: "Quarter-over-quarter labels start wrapping before the score card does, which weakens executive scanning.",
        owner: "Design systems",
        eta: "Today",
      },
      {
        title: "Confidence band needs stronger explanation",
        severity: "medium",
        detail: "Users can see 97% confidence, but not what inputs raised or lowered it.",
        owner: "Evaluation UX",
        eta: "4h",
      },
      {
        title: "Callout copy could trim one sentence",
        severity: "low",
        detail: "The lead insight is accurate, but reads more like a memo than a dashboard summary.",
        owner: "Content design",
        eta: "Backlog",
      },
    ],
    benchmarks: [
      { label: "Peer cohort median", score: 84, note: "+8.4 vs cohort" },
      { label: "Internal release bar", score: 90, note: "Clears shipping threshold" },
      { label: "Leadership digest target", score: 94, note: "1.6 points to target" },
    ],
    traces: [
      {
        step: "Layout pass",
        summary: "Scanned first-view information density and card priority.",
        duration: "5.1s",
        status: "complete",
      },
      {
        step: "Metric integrity",
        summary: "Cross-checked labels, deltas, and timestamp framing against rubric.",
        duration: "8.7s",
        status: "complete",
      },
      {
        step: "Action synthesis",
        summary: "Drafted remediation for hierarchy and explanation gaps.",
        duration: "4.6s",
        status: "active",
      },
    ],
    reviewers: [
      { name: "Mara Chen", role: "Evaluation lead", initials: "MC" },
      { name: "Jon Park", role: "Data QA", initials: "JP" },
      { name: "Lina Ortiz", role: "Narrative systems", initials: "LO" },
    ],
    callout: {
      title: "Score is strong enough to ship with one hierarchy fix",
      metric: "1 blocking issue",
      detail: "The layout is credible and decisive, but the benchmark labels need a tighter medium-breakpoint treatment before executive review.",
    },
  },
  operations: {
    name: "Ops command center",
    strapline: "High-density monitoring surface for shifts, incidents, and service health.",
    summary:
      "The scoring agent focuses on scan speed under pressure: incident visibility, escalation paths, anomaly emphasis, and whether operators can act without reading twice.",
    score: 88.9,
    delta: 1.4,
    confidence: 95,
    latency: "21.2s",
    lastRun: "Updated 8 minutes ago",
    model: "Claude Sonnet 4.6 / high reasoning",
    focus: ["Incident salience", "Escalation design", "Load management"],
    pillars: [
      {
        label: "Incident salience",
        score: 93,
        detail: "Critical signals stand apart quickly, even when the panel gets crowded.",
        note: "Response path is obvious",
        tone: "rose",
      },
      {
        label: "Operational density",
        score: 86,
        detail: "The view is efficient, but one cluster of tertiary metrics still competes for attention.",
        note: "Reduce visual chatter",
        tone: "amber",
      },
      {
        label: "Escalation clarity",
        score: 90,
        detail: "Owners and ETAs are visible, though one queue state needs a stronger treatment.",
        note: "Good command framing",
        tone: "sky",
      },
      {
        label: "Historical context",
        score: 87,
        detail: "Recent history is present, but long-range comparison needs clearer contrast.",
        note: "Trend memory is adequate",
        tone: "emerald",
      },
    ],
    findings: [
      {
        title: "Warning state chips read too close to neutral on first glance",
        severity: "high",
        detail: "Shift leads can miss degradation when the board is viewed from a distance.",
        owner: "Frontend",
        eta: "2h",
      },
      {
        title: "Historical sparkline lacks incident annotations",
        severity: "medium",
        detail: "Operators can see trend shape, but not what caused the last two spikes.",
        owner: "Monitoring UX",
        eta: "Tomorrow",
      },
      {
        title: "Sidebar queue could group by owner",
        severity: "low",
        detail: "Current ordering works, but ownership sorting would cut scan time further.",
        owner: "Operations design",
        eta: "Backlog",
      },
    ],
    benchmarks: [
      { label: "Night-shift baseline", score: 82, note: "+6.9 vs baseline" },
      { label: "Incident board target", score: 89, note: "On threshold" },
      { label: "Recovery-readiness bar", score: 92, note: "3.1 points short" },
    ],
    traces: [
      {
        step: "Critical signal sweep",
        summary: "Ranked incident affordances and escalation prominence.",
        duration: "7.2s",
        status: "complete",
      },
      {
        step: "Queue pressure review",
        summary: "Measured density, label load, and owner discoverability.",
        duration: "8.1s",
        status: "active",
      },
      {
        step: "Recovery guidance",
        summary: "Drafting the next-pass recommendation for warning and history states.",
        duration: "5.9s",
        status: "queued",
      },
    ],
    reviewers: [
      { name: "Rhea Moss", role: "Incident command", initials: "RM" },
      { name: "Theo Lang", role: "Systems telemetry", initials: "TL" },
      { name: "Nico Vale", role: "Shift operations", initials: "NV" },
    ],
    callout: {
      title: "Operationally useful, but warning semantics need more force",
      metric: "2 remediations",
      detail: "The board is close to ready for live shifts, but its warning state needs stronger visual urgency and annotated trend history.",
    },
  },
  growth: {
    name: "Growth experiment cockpit",
    strapline: "Experiment dashboard balancing pace, confidence, and commercial signal.",
    summary:
      "This pass weights decision confidence, experiment hygiene, and whether insights remain trustworthy when multiple tests compete in the same surface.",
    score: 90.7,
    delta: 2.6,
    confidence: 96,
    latency: "19.8s",
    lastRun: "Updated 11 minutes ago",
    model: "Claude Sonnet 4.6 / high reasoning",
    focus: ["Experiment hygiene", "Commercial confidence", "Readability at pace"],
    pillars: [
      {
        label: "Experiment framing",
        score: 94,
        detail: "Hypothesis, sample quality, and holdout logic are easy to trace.",
        note: "Very strong statistical framing",
        tone: "emerald",
      },
      {
        label: "Commercial signal",
        score: 89,
        detail: "Revenue context is visible, though one metric pairing should be closer together.",
        note: "Good but improvable",
        tone: "sky",
      },
      {
        label: "Readability under load",
        score: 86,
        detail: "The dashboard gets busy once more than four tests are active at once.",
        note: "Main compression risk",
        tone: "amber",
      },
      {
        label: "Decision readiness",
        score: 94,
        detail: "Recommendations are specific and tied to acceptable confidence thresholds.",
        note: "Strong launch discipline",
        tone: "rose",
      },
    ],
    findings: [
      {
        title: "Variant comparison table needs row striping",
        severity: "medium",
        detail: "Eye tracking is slower than expected when five or more variants are visible.",
        owner: "Experiment UX",
        eta: "Today",
      },
      {
        title: "Revenue lift and confidence sit too far apart",
        severity: "medium",
        detail: "Users read them as separate stories instead of one decision pair.",
        owner: "Growth analytics",
        eta: "6h",
      },
      {
        title: "Holdout explanation can move behind disclosure",
        severity: "low",
        detail: "The content is useful but not needed in the primary scan path.",
        owner: "Content systems",
        eta: "Backlog",
      },
    ],
    benchmarks: [
      { label: "Experiment review median", score: 83, note: "+7.7 vs median" },
      { label: "Promotion threshold", score: 88, note: "Above threshold" },
      { label: "Launch-confidence target", score: 92, note: "1.3 points short" },
    ],
    traces: [
      {
        step: "Test hygiene sweep",
        summary: "Checked experimental controls, labels, and confidence framing.",
        duration: "6.8s",
        status: "complete",
      },
      {
        step: "Signal pairing review",
        summary: "Measured whether confidence and revenue effects are read together.",
        duration: "7.4s",
        status: "complete",
      },
      {
        step: "Presentation tuning",
        summary: "Preparing layout fixes for table scan speed and information grouping.",
        duration: "5.6s",
        status: "active",
      },
    ],
    reviewers: [
      { name: "Asha Bell", role: "Growth systems", initials: "AB" },
      { name: "Cory Pike", role: "Experiment QA", initials: "CP" },
      { name: "Mina Holt", role: "Commercial insights", initials: "MH" },
    ],
    callout: {
      title: "Strong decision support with one readability bottleneck",
      metric: "0 blockers",
      detail: "The cockpit supports confident decisions already, but the comparison table and metric grouping should be tightened before scale increases again.",
    },
  },
};

const scenarioOptions: Array<{ key: ScenarioKey; label: string; detail: string }> = [
  { key: "executive", label: "Executive", detail: "Narrative and business clarity" },
  { key: "operations", label: "Operations", detail: "Incident scan speed and control" },
  { key: "growth", label: "Growth", detail: "Experiment trust and pacing" },
];

const severityStyles: Record<Severity, string> = {
  high: "border-rose-300/30 bg-rose-400/15 text-rose-100",
  medium: "border-amber-300/30 bg-amber-300/15 text-amber-100",
  low: "border-sky-300/30 bg-sky-300/15 text-sky-100",
};

const toneStyles: Record<Tone, { pill: string; glow: string; bar: string }> = {
  sky: {
    pill: "bg-sky-300/15 text-sky-100 border-sky-300/25",
    glow: "0 0 30px rgba(125, 211, 252, 0.22)",
    bar: "from-sky-300 via-cyan-200 to-blue-300",
  },
  emerald: {
    pill: "bg-emerald-300/15 text-emerald-100 border-emerald-300/25",
    glow: "0 0 30px rgba(110, 231, 183, 0.22)",
    bar: "from-emerald-300 via-teal-200 to-cyan-200",
  },
  amber: {
    pill: "bg-amber-300/15 text-amber-100 border-amber-300/25",
    glow: "0 0 30px rgba(251, 191, 36, 0.2)",
    bar: "from-amber-200 via-orange-200 to-yellow-100",
  },
  rose: {
    pill: "bg-rose-300/15 text-rose-100 border-rose-300/25",
    glow: "0 0 30px rgba(251, 113, 133, 0.2)",
    bar: "from-rose-300 via-pink-200 to-orange-100",
  },
};

const traceStyles: Record<TraceStatus, string> = {
  complete: "bg-emerald-300",
  active: "bg-sky-300",
  queued: "bg-white/30",
};

export default function Page() {
  const [scenario, setScenario] = useState<ScenarioKey>("executive");
  const payload = reviews[scenario];

  const criticalCount = useMemo(
    () => payload.findings.filter((item) => item.severity === "high").length,
    [payload]
  );
  const averageBenchmark = useMemo(
    () =>
      Math.round(
        payload.benchmarks.reduce((sum, item) => sum + item.score, 0) / payload.benchmarks.length
      ),
    [payload]
  );
  const strongestPillar = useMemo(
    () => payload.pillars.reduce((best, item) => (item.score > best.score ? item : best), payload.pillars[0]),
    [payload]
  );
  const weakestPillar = useMemo(
    () => payload.pillars.reduce((worst, item) => (item.score < worst.score ? item : worst), payload.pillars[0]),
    [payload]
  );

  return (
    <main className="relative min-h-screen overflow-hidden px-4 pb-10 pt-6 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 fine-grid opacity-70" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top,_rgba(137,216,255,0.18),_transparent_58%)]" />
      <div className="pointer-events-none absolute right-[-8rem] top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(245,201,119,0.18),_transparent_65%)] blur-3xl" />

      <div className="relative mx-auto flex max-w-7xl flex-col gap-6">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="surface-card-strong overflow-hidden rounded-[32px] px-5 py-5 sm:px-7 sm:py-7"
        >
          <div className="grid gap-6 xl:grid-cols-[1.2fr_0.85fr]">
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-white/12 bg-white/[0.06] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-100/90">
                  Dashboard Quality Lab
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-[color:var(--color-muted)]">
                  {payload.model}
                </span>
              </div>

              <div className="max-w-3xl">
                <h1 className="text-4xl leading-none tracking-[-0.04em] text-white sm:text-5xl">
                  Scoring console for dashboard output quality.
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[color:var(--color-muted)] sm:text-base">
                  {payload.summary}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {payload.focus.map((item) => (
                  <div
                    key={item}
                    className="rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/90"
                  >
                    <p className="text-[11px] uppercase tracking-[0.24em] text-[color:var(--color-muted)]">
                      Current focus
                    </p>
                    <p className="mt-2 font-medium">{item}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                {scenarioOptions.map((option) => {
                  const active = option.key === scenario;

                  return (
                    <button
                      key={option.key}
                      type="button"
                      onClick={() => setScenario(option.key)}
                      aria-pressed={active}
                      className={`rounded-[22px] border px-4 py-3 text-left transition duration-200 ${
                        active
                          ? "border-sky-200/35 bg-sky-300/[0.12] shadow-[0_12px_32px_rgba(125,211,252,0.18)]"
                          : "border-white/10 bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.07]"
                      }`}
                    >
                      <p className="text-sm font-semibold text-white">{option.label}</p>
                      <p className="mt-1 text-xs text-[color:var(--color-muted)]">{option.detail}</p>
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex -space-x-2">
                  {payload.reviewers.map((reviewer) => (
                    <Avatar
                      key={reviewer.name}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-[rgba(12,23,41,0.9)] shadow-lg shadow-black/20"
                    >
                      <AvatarFallback className="inline-flex h-full w-full items-center justify-center rounded-full text-xs font-semibold text-white">
                        {reviewer.initials}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Human spot-checkers in the loop</p>
                  <p className="text-xs text-[color:var(--color-muted)]">
                    {payload.reviewers.map((reviewer) => reviewer.role).join(" / ")}
                  </p>
                </div>
              </div>
            </div>

            <div className="surface-card relative overflow-hidden rounded-[30px] p-5 sm:p-6">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(137,216,255,0.18),_transparent_52%),linear-gradient(180deg,_rgba(255,255,255,0.05),_rgba(255,255,255,0))]" />
              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.26em] text-[color:var(--color-muted)]">
                      Active review
                    </p>
                    <h2 className="mt-2 text-2xl text-white">{payload.name}</h2>
                    <p className="mt-2 max-w-md text-sm leading-6 text-[color:var(--color-muted)]">
                      {payload.strapline}
                    </p>
                  </div>
                  <Button className="rounded-full border border-white/12 bg-white/[0.08] px-4 py-2 text-sm font-medium text-white transition hover:bg-white/[0.12]">
                    Promote rubric
                  </Button>
                </div>

                <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center">
                  <div
                    className="relative grid h-40 w-40 shrink-0 place-items-center rounded-full border border-white/10"
                    style={{
                      background: `conic-gradient(from 210deg, #8ce0ff 0 ${payload.score}%, rgba(140,224,255,0.14) ${payload.score}% 100%)`,
                    }}
                  >
                    <div className="grid h-28 w-28 place-items-center rounded-full border border-white/12 bg-[rgba(7,16,30,0.92)]">
                      <div className="text-center">
                        <p className="text-4xl font-semibold tracking-[-0.05em] text-white">
                          {payload.score.toFixed(1)}
                        </p>
                        <p className="text-[10px] uppercase tracking-[0.28em] text-[color:var(--color-muted)]">
                          quality
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid flex-1 gap-3 sm:grid-cols-2">
                    <MetricCard
                      label="Confidence"
                      value={`${payload.confidence}%`}
                      note={`${payload.delta > 0 ? "+" : ""}${payload.delta.toFixed(1)} vs last rubric`}
                    />
                    <MetricCard label="Latency" value={payload.latency} note={payload.lastRun} />
                    <MetricCard label="High severity" value={`${criticalCount}`} note="Requires explicit owner" />
                    <MetricCard label="Benchmarks" value={`${averageBenchmark}`} note="Average comparator score" />
                  </div>
                </div>

                <div className="mt-6 rounded-[24px] border border-white/10 bg-[rgba(255,255,255,0.04)] p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.24em] text-[color:var(--color-muted)]">
                        Lead recommendation
                      </p>
                      <p className="mt-2 text-lg font-medium text-white">{payload.callout.title}</p>
                    </div>
                    <span className="rounded-full border border-sky-300/20 bg-sky-300/10 px-3 py-1 text-xs text-sky-100">
                      {payload.callout.metric}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-[color:var(--color-muted)]">{payload.callout.detail}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.header>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <motion.section
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="surface-card rounded-[28px] p-5 sm:p-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-[color:var(--color-muted)]">
                  Pillar scorecard
                </p>
                <h2 className="mt-2 text-2xl text-white">What the model rewarded, and what still drags.</h2>
              </div>
              <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-[color:var(--color-muted)]">
                Strongest: <span className="font-medium text-white">{strongestPillar.label}</span>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {payload.pillars.map((pillar) => {
                const tone = toneStyles[pillar.tone];

                return (
                  <motion.article
                    key={pillar.label}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.18 }}
                    className="rounded-[24px] border border-white/10 bg-[rgba(255,255,255,0.03)] p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-lg font-medium text-white">{pillar.label}</p>
                        <p className="mt-2 text-sm leading-6 text-[color:var(--color-muted)]">{pillar.detail}</p>
                      </div>
                      <span className={`rounded-full border px-3 py-1 text-sm font-semibold ${tone.pill}`}>
                        {pillar.score}
                      </span>
                    </div>

                    <Progress value={pillar.score} className="mt-5">
                      <ProgressTrack className="h-2 overflow-hidden rounded-full bg-white/[0.08]">
                        <ProgressIndicator
                          className={`h-full rounded-full bg-gradient-to-r ${tone.bar}`}
                          style={{ boxShadow: tone.glow }}
                        />
                      </ProgressTrack>
                    </Progress>

                    <div className="mt-4 flex items-center justify-between gap-3 text-xs">
                      <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-white/90">
                        {pillar.note}
                      </span>
                      <span className="text-[color:var(--color-muted)]">
                        {pillar.score >= 90 ? "Release-ready signal" : "Needs one more pass"}
                      </span>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </motion.section>

          <motion.aside
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="surface-card rounded-[28px] p-5 sm:p-6"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-[color:var(--color-muted)]">
                  Risk queue
                </p>
                <h2 className="mt-2 text-2xl text-white">Findings that change the score.</h2>
              </div>
              <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-sm text-white">
                {payload.findings.length} open
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {payload.findings.map((finding) => (
                <article
                  key={finding.title}
                  className="rounded-[22px] border border-white/10 bg-[rgba(255,255,255,0.03)] p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="max-w-[18rem] text-sm font-medium leading-6 text-white">{finding.title}</p>
                    <span
                      className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] ${severityStyles[finding.severity]}`}
                    >
                      {finding.severity}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-[color:var(--color-muted)]">{finding.detail}</p>
                  <div className="mt-4 flex items-center justify-between gap-3 text-xs text-[color:var(--color-muted)]">
                    <span>{finding.owner}</span>
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-white/85">
                      ETA {finding.eta}
                    </span>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-5 rounded-[24px] border border-white/10 bg-[linear-gradient(135deg,rgba(137,216,255,0.1),rgba(255,255,255,0.03))] p-4">
              <p className="text-[11px] uppercase tracking-[0.24em] text-[color:var(--color-muted)]">
                Weakest pillar
              </p>
              <p className="mt-2 text-xl text-white">{weakestPillar.label}</p>
              <p className="mt-2 text-sm leading-6 text-[color:var(--color-muted)]">{weakestPillar.detail}</p>
            </div>
          </motion.aside>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="surface-card rounded-[28px] p-5 sm:p-6"
        >
          <Tabs defaultValue="overview">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-[color:var(--color-muted)]">
                  Review depth
                </p>
                <h2 className="mt-2 text-2xl text-white">Benchmarks, rationale, and audit trace.</h2>
              </div>
              <TabsList className="inline-flex rounded-full border border-white/10 bg-white/[0.04] p-1">
                <TabsTrigger
                  value="overview"
                  className="rounded-full px-4 py-2 text-sm text-[color:var(--color-muted)] transition data-[active]:bg-white/10 data-[active]:text-white"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="findings"
                  className="rounded-full px-4 py-2 text-sm text-[color:var(--color-muted)] transition data-[active]:bg-white/10 data-[active]:text-white"
                >
                  Findings
                </TabsTrigger>
                <TabsTrigger
                  value="trace"
                  className="rounded-full px-4 py-2 text-sm text-[color:var(--color-muted)] transition data-[active]:bg-white/10 data-[active]:text-white"
                >
                  Trace
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="mt-6">
              <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="grid gap-4">
                  {payload.benchmarks.map((item) => (
                    <article
                      key={item.label}
                      className="rounded-[22px] border border-white/10 bg-[rgba(255,255,255,0.03)] p-4"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-medium text-white">{item.label}</p>
                          <p className="mt-1 text-xs text-[color:var(--color-muted)]">{item.note}</p>
                        </div>
                        <span className="text-2xl font-semibold tracking-[-0.04em] text-white">{item.score}</span>
                      </div>
                      <Progress value={item.score} className="mt-4">
                        <ProgressTrack className="h-2 overflow-hidden rounded-full bg-white/[0.08]">
                          <ProgressIndicator className="h-full rounded-full bg-gradient-to-r from-sky-300 via-cyan-200 to-amber-200" />
                        </ProgressTrack>
                      </Progress>
                    </article>
                  ))}
                </div>

                <div className="rounded-[24px] border border-white/10 bg-[rgba(255,255,255,0.03)] p-5">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-[color:var(--color-muted)]">
                    Release summary
                  </p>
                  <h3 className="mt-2 text-2xl text-white">Why this score is credible.</h3>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-[color:var(--color-muted)]">
                    The model is not just grading aesthetics. It is grading whether the dashboard tells the right story,
                    exposes enough evidence to trust the story, and turns that story into an action the team can own.
                  </p>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <SummaryTile label="Shipping threshold" value="90+" note="Current release bar for scored dashboards" />
                    <SummaryTile label="Current result" value={payload.score.toFixed(1)} note="Composite quality score" />
                    <SummaryTile label="Confidence floor" value="92%" note="Minimum accepted confidence for publish" />
                    <SummaryTile label="Auditability" value="Full trace" note="Every run records rationale and remediation" />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="findings" className="mt-6">
              <div className="grid gap-4 lg:grid-cols-3">
                {payload.findings.map((finding, index) => (
                  <article
                    key={finding.title}
                    className="rounded-[24px] border border-white/10 bg-[rgba(255,255,255,0.03)] p-5"
                  >
                    <p className="text-[11px] uppercase tracking-[0.24em] text-[color:var(--color-muted)]">
                      Finding {index + 1}
                    </p>
                    <p className="mt-3 text-lg font-medium text-white">{finding.title}</p>
                    <p className="mt-3 text-sm leading-6 text-[color:var(--color-muted)]">{finding.detail}</p>
                    <div className="mt-5 flex items-center justify-between gap-3">
                      <span
                        className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] ${severityStyles[finding.severity]}`}
                      >
                        {finding.severity}
                      </span>
                      <span className="text-xs text-[color:var(--color-muted)]">{finding.owner}</span>
                    </div>
                  </article>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="trace" className="mt-6">
              <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="rounded-[24px] border border-white/10 bg-[rgba(255,255,255,0.03)] p-5">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-[color:var(--color-muted)]">
                    Trace status
                  </p>
                  <h3 className="mt-2 text-2xl text-white">Reasoning pipeline</h3>
                  <div className="mt-5 space-y-4">
                    {payload.traces.map((trace) => (
                      <div key={trace.step} className="flex gap-3">
                        <span className={`mt-1.5 h-2.5 w-2.5 rounded-full ${traceStyles[trace.status]}`} />
                        <div className="min-w-0">
                          <div className="flex items-center justify-between gap-3">
                            <p className="text-sm font-medium text-white">{trace.step}</p>
                            <span className="text-xs text-[color:var(--color-muted)]">{trace.duration}</span>
                          </div>
                          <p className="mt-1 text-sm leading-6 text-[color:var(--color-muted)]">{trace.summary}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[24px] border border-white/10 bg-[linear-gradient(135deg,rgba(245,201,119,0.08),rgba(255,255,255,0.03))] p-5">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-[color:var(--color-muted)]">
                    Audit note
                  </p>
                  <h3 className="mt-2 text-2xl text-white">Every score is attached to a fix path.</h3>
                  <p className="mt-3 text-sm leading-6 text-[color:var(--color-muted)]">
                    High reasoning is only useful if it resolves into concrete next actions. This run preserved the exact
                    rationale behind the score, identified the weakest pillar, and translated that weakness into an
                    owner, an ETA, and a releasability judgment.
                  </p>

                  <div className="mt-5 rounded-[22px] border border-white/10 bg-black/10 p-4">
                    <p className="text-sm font-medium text-white">Latest judgment</p>
                    <p className="mt-2 text-sm leading-6 text-[color:var(--color-muted)]">
                      Ship after the current highest-severity issue is resolved. Keep the benchmark explanation and weak
                      pillar note visible so reviewers do not confuse a strong overall score with zero remaining risk.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.section>
      </div>
    </main>
  );
}

function MetricCard({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-3">
      <p className="text-[11px] uppercase tracking-[0.24em] text-[color:var(--color-muted)]">{label}</p>
      <p className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white">{value}</p>
      <p className="mt-1 text-xs text-[color:var(--color-muted)]">{note}</p>
    </div>
  );
}

function SummaryTile({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="rounded-[20px] border border-white/10 bg-white/[0.04] px-4 py-4">
      <p className="text-[11px] uppercase tracking-[0.24em] text-[color:var(--color-muted)]">{label}</p>
      <p className="mt-2 text-xl font-semibold tracking-[-0.04em] text-white">{value}</p>
      <p className="mt-1 text-xs leading-5 text-[color:var(--color-muted)]">{note}</p>
    </div>
  );
}
