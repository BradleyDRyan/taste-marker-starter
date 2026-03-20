"use client";

import { motion } from "framer-motion";
import { startTransition, useDeferredValue, useState } from "react";

type Accent = "cyan" | "emerald" | "amber" | "violet";

type SnapshotMetric = {
  label: string;
  value: string;
  change: string;
  supporting: string;
  accent: Accent;
};

type Breakdown = {
  label: string;
  score: number;
  weight: string;
  detail: string;
};

type Trace = {
  step: string;
  heading: string;
  summary: string;
  signal: string;
};

type Risk = {
  title: string;
  severity: "Elevated" | "Moderate" | "Low";
  detail: string;
};

type Run = {
  name: string;
  analyst: string;
  verdict: "Promoted" | "Needs review" | "Watch";
  score: number;
  delta: string;
};

type Panel = "verdict" | "risks" | "config";

const overallScore = 93;

const snapshotMetrics: SnapshotMetric[] = [
  {
    label: "Evaluator confidence",
    value: "94.8%",
    change: "+4.1",
    supporting: "Consensus is tight across evidence-backed checks.",
    accent: "cyan",
  },
  {
    label: "Signal density",
    value: "31 claims",
    change: "+9",
    supporting: "High-value findings remain above the fold.",
    accent: "emerald",
  },
  {
    label: "Failure risk",
    value: "2 flags",
    change: "-3",
    supporting: "Only one material issue still blocks promotion.",
    accent: "amber",
  },
  {
    label: "Actionability",
    value: "8.9/10",
    change: "+0.7",
    supporting: "Recommendations are specific enough for shipping teams.",
    accent: "violet",
  },
];

const scoreBreakdown: Breakdown[] = [
  {
    label: "Decision usefulness",
    score: 96,
    weight: "32%",
    detail: "Surfaced metrics answer the immediate operating question without digging.",
  },
  {
    label: "Evidence grounding",
    score: 91,
    weight: "26%",
    detail: "Narrative aligns with chart deltas, but one KPI summary lacks explicit provenance.",
  },
  {
    label: "Narrative sharpness",
    score: 89,
    weight: "22%",
    detail: "Concise and readable, with one section still too broad for a director handoff.",
  },
  {
    label: "Visual hierarchy",
    score: 95,
    weight: "20%",
    detail: "Primary insight lands immediately and secondary context stays scannable.",
  },
];

const traceLedger: Trace[] = [
  {
    step: "01",
    heading: "Schema sanity check",
    summary: "All critical cards resolve expected labels, time ranges, and source bindings.",
    signal: "No missing context fields detected.",
  },
  {
    step: "02",
    heading: "Claim-to-chart reconciliation",
    summary: "Trend statements were matched against visible series movement and benchmark markers.",
    signal: "1 narrative claim marked for stronger evidence.",
  },
  {
    step: "03",
    heading: "Operator usefulness test",
    summary: "Recommendations were scored for immediacy, ownership clarity, and next-action specificity.",
    signal: "3 items classified as ready for leadership review.",
  },
];

const flaggedRisks: Risk[] = [
  {
    title: "One insight compresses two causes into one conclusion",
    severity: "Elevated",
    detail: "The retention dip and launch lag are adjacent, but the dashboard treats them as a single driver.",
  },
  {
    title: "Benchmark label cadence is slightly inconsistent",
    severity: "Moderate",
    detail: "Weekly markers appear in the trend panel while the summary speaks in monthly terms.",
  },
  {
    title: "Recovery recommendation could name an owner",
    severity: "Low",
    detail: "The suggested response is correct, but it should point directly to the revenue ops team.",
  },
];

const recentRuns: Run[] = [
  {
    name: "Weekly GTM review",
    analyst: "S. Ibarra",
    verdict: "Promoted",
    score: 95,
    delta: "+3",
  },
  {
    name: "Customer health deck",
    analyst: "A. Bennett",
    verdict: "Needs review",
    score: 86,
    delta: "-4",
  },
  {
    name: "Board KPI draft",
    analyst: "N. Okafor",
    verdict: "Watch",
    score: 82,
    delta: "-1",
  },
];

const panels: Array<{ id: Panel; label: string; blurb: string }> = [
  {
    id: "verdict",
    label: "Verdict",
    blurb: "What the scorer would approve right now.",
  },
  {
    id: "risks",
    label: "Failure Modes",
    blurb: "Where quality can still fall apart before handoff.",
  },
  {
    id: "config",
    label: "Scoring Logic",
    blurb: "How the agent is weighting the review pass.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

function accentClasses(accent: Accent): string {
  if (accent === "emerald") return "border-emerald-400/25 bg-emerald-400/10 text-emerald-100";
  if (accent === "amber") return "border-amber-400/25 bg-amber-400/10 text-amber-100";
  if (accent === "violet") return "border-violet-400/25 bg-violet-400/10 text-violet-100";
  return "border-cyan-400/25 bg-cyan-400/10 text-cyan-100";
}

function severityClasses(severity: Risk["severity"]): string {
  if (severity === "Elevated") return "border-rose-400/30 bg-rose-400/10 text-rose-100";
  if (severity === "Moderate") return "border-amber-400/30 bg-amber-400/10 text-amber-100";
  return "border-emerald-400/30 bg-emerald-400/10 text-emerald-100";
}

function runClasses(verdict: Run["verdict"]): string {
  if (verdict === "Promoted") return "border-emerald-400/30 bg-emerald-400/10 text-emerald-100";
  if (verdict === "Needs review") return "border-amber-400/30 bg-amber-400/10 text-amber-100";
  return "border-fuchsia-400/30 bg-fuchsia-400/10 text-fuchsia-100";
}

function panelContent(panel: Panel) {
  if (panel === "risks") {
    return (
      <div className="grid gap-4">
        {flaggedRisks.map((risk) => (
          <article
            key={risk.title}
            className="rounded-[1.35rem] border border-white/10 bg-black/20 p-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="max-w-xl text-sm font-medium text-white sm:text-base">{risk.title}</h3>
              <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${severityClasses(risk.severity)}`}>
                {risk.severity}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-300">{risk.detail}</p>
          </article>
        ))}
      </div>
    );
  }

  if (panel === "config") {
    return (
      <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <article className="rounded-[1.35rem] border border-white/10 bg-black/20 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200/70">Prompt Frame</p>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
            Claude Sonnet 4.6 runs a high-reasoning pass that grades dashboards on usefulness, evidence quality, narrative precision,
            and whether an operator can take action immediately after reading the output.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Strict checks</p>
              <p className="mt-2 text-2xl font-semibold text-white">18</p>
              <p className="mt-1 text-sm text-slate-400">Blocking conditions before a run can be promoted.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Evidence anchors</p>
              <p className="mt-2 text-2xl font-semibold text-white">6</p>
              <p className="mt-1 text-sm text-slate-400">Minimum supporting references expected in the output.</p>
            </div>
          </div>
        </article>

        <article className="rounded-[1.35rem] border border-white/10 bg-black/20 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200/70">Weighting</p>
          <div className="mt-4 space-y-4">
            {scoreBreakdown.map((criterion) => (
              <div key={criterion.label}>
                <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                  <span>{criterion.label}</span>
                  <span>{criterion.weight}</span>
                </div>
                <div className="h-2 rounded-full bg-white/8">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-sky-400 to-emerald-300"
                    style={{ width: criterion.weight }}
                  />
                </div>
              </div>
            ))}
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
      <article className="rounded-[1.35rem] border border-white/10 bg-black/20 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200/70">Release Decision</p>
        <h3 className="mt-3 text-2xl font-semibold text-white">Ready for review with one narrative correction</h3>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
          The dashboard is strong enough for stakeholder review because it prioritizes the right metrics, reads quickly, and keeps most
          insights anchored to visible evidence. The only material fix is separating correlated causes before publishing the summary.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4">
            <p className="text-xs uppercase tracking-[0.22em] text-emerald-100/70">Pass</p>
            <p className="mt-2 text-lg font-semibold text-white">High signal density</p>
          </div>
          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4">
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-100/70">Pass</p>
            <p className="mt-2 text-lg font-semibold text-white">Clear visual hierarchy</p>
          </div>
          <div className="rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4">
            <p className="text-xs uppercase tracking-[0.22em] text-amber-100/70">Fix before publish</p>
            <p className="mt-2 text-lg font-semibold text-white">Separate causal claims</p>
          </div>
        </div>
      </article>

      <article className="rounded-[1.35rem] border border-white/10 bg-black/20 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200/70">Promotion Gates</p>
        <ul className="mt-4 space-y-3">
          {[
            "All executive claims map to visible chart evidence.",
            "Each recommendation names a likely owner or next action.",
            "Time windows remain consistent between cards and summary text.",
            "Risk framing distinguishes trend from hypothesis.",
          ].map((gate) => (
            <li key={gate} className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/5 p-3">
              <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-300" />
              <span className="text-sm leading-6 text-slate-300">{gate}</span>
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
}

export default function Page() {
  const [activePanel, setActivePanel] = useState<Panel>("verdict");
  const deferredPanel = useDeferredValue(activePanel);

  return (
    <main className="dashboard-shell min-h-screen overflow-x-hidden px-4 py-6 text-slate-50 sm:px-6 lg:px-8">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto flex w-full max-w-7xl flex-col gap-6"
      >
        <motion.section
          variants={item}
          className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-[0_40px_120px_-48px_rgba(34,211,238,0.55)] backdrop-blur md:p-8"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(129,140,248,0.16),transparent_24%),linear-gradient(135deg,rgba(255,255,255,0.04),transparent_42%)]" />
          <div className="relative">
            <div className="flex flex-col gap-5 border-b border-white/10 pb-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-100">
                    Scoring Agent
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-slate-300">
                    Claude Sonnet 4.6
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-slate-300">
                    Reasoning: High
                  </span>
                </div>
                <div>
                  <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                    Evaluating dashboard output quality before it reaches decision-makers.
                  </h1>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                    A reviewer console for scoring whether a dashboard is evidence-backed, operator-useful, and clean enough to ship into
                    planning or executive review.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-slate-100 transition hover:border-cyan-300/30 hover:bg-white/8">
                  View rubric version
                </button>
                <button className="rounded-2xl bg-cyan-300 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">
                  Promote this scorer
                </button>
              </div>
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
              <div className="grid gap-4 sm:grid-cols-2">
                {snapshotMetrics.map((metric) => (
                  <article
                    key={metric.label}
                    className="rounded-[1.5rem] border border-white/10 bg-white/6 p-4 backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-white/20"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="max-w-[13rem] text-sm font-medium leading-6 text-slate-200">{metric.label}</p>
                      <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${accentClasses(metric.accent)}`}>
                        {metric.change}
                      </span>
                    </div>
                    <p className="mt-5 text-3xl font-semibold tracking-tight text-white">{metric.value}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{metric.supporting}</p>
                  </article>
                ))}
              </div>

              <article className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#071120] p-5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(103,232,249,0.12),transparent_40%),linear-gradient(160deg,rgba(15,23,42,0.2),rgba(2,6,23,0.7))]" />
                <div className="relative flex h-full flex-col gap-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-100/70">Current Evaluation</p>
                      <h2 className="mt-2 text-xl font-semibold text-white">Dashboard output QA pass</h2>
                    </div>
                    <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-100">
                      Stable
                    </span>
                  </div>

                  <div className="grid flex-1 gap-5 sm:grid-cols-[0.95fr_1.05fr] sm:items-center">
                    <div className="flex justify-center">
                      <div
                        className="relative flex h-52 w-52 items-center justify-center rounded-full p-[1px]"
                        style={{
                          background: `conic-gradient(#67e8f9 0deg ${overallScore * 3.6}deg, rgba(148,163,184,0.16) ${
                            overallScore * 3.6
                          }deg 360deg)`,
                        }}
                      >
                        <div className="absolute inset-3 rounded-full bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.18),rgba(2,6,23,0.96)_58%)]" />
                        <div className="relative text-center">
                          <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Overall score</p>
                          <p className="mt-3 text-6xl font-semibold tracking-tight text-white">{overallScore}</p>
                          <p className="mt-2 text-sm text-slate-400">out of 100</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {[
                        ["Pass threshold", "88"],
                        ["Evidence-backed claims", "92%"],
                        ["Ready-to-act recommendations", "89%"],
                      ].map(([label, value]) => (
                        <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-sm text-slate-300">{label}</span>
                            <span className="text-lg font-semibold text-white">{value}</span>
                          </div>
                        </div>
                      ))}
                      <p className="rounded-2xl border border-cyan-300/12 bg-cyan-300/8 p-4 text-sm leading-6 text-slate-300">
                        Strong enough to publish after correcting one causal summary and aligning the benchmark language to the chart cadence.
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </motion.section>

        <div className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
          <motion.section variants={item} className="rounded-[1.85rem] border border-white/10 bg-slate-950/65 p-6 backdrop-blur">
            <div className="flex flex-col gap-2 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-100/70">Rubric Breakdown</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Where the score comes from</h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-slate-400">
                Weighted criteria emphasize decision quality first, then grounding, then communication polish.
              </p>
            </div>

            <div className="mt-5 grid gap-4">
              {scoreBreakdown.map((criterion) => (
                <article
                  key={criterion.label}
                  className="rounded-[1.4rem] border border-white/10 bg-white/5 p-4 transition duration-300 hover:border-white/20"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{criterion.label}</h3>
                      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">{criterion.detail}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Weight</p>
                      <p className="mt-1 text-lg font-semibold text-cyan-100">{criterion.weight}</p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                      <span>Score</span>
                      <span>{criterion.score}/100</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-white/8">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-sky-400 to-emerald-300"
                        style={{ width: `${criterion.score}%` }}
                      />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </motion.section>

          <div className="grid gap-6">
            <motion.section variants={item} className="rounded-[1.85rem] border border-white/10 bg-slate-950/65 p-6 backdrop-blur">
              <div className="flex flex-col gap-2 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-100/70">Trace Ledger</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">How the reasoning pass was built</h2>
                </div>
                <p className="text-sm leading-6 text-slate-400">Every stage leaves a compact audit trail for reviewers.</p>
              </div>

              <div className="mt-5 space-y-4">
                {traceLedger.map((trace) => (
                  <article key={trace.step} className="rounded-[1.35rem] border border-white/10 bg-white/5 p-4">
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-sm font-semibold text-cyan-100">
                        {trace.step}
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-base font-semibold text-white">{trace.heading}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-300">{trace.summary}</p>
                        <p className="mt-3 text-xs font-medium uppercase tracking-[0.24em] text-cyan-100/70">{trace.signal}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </motion.section>

            <motion.section variants={item} className="rounded-[1.85rem] border border-white/10 bg-slate-950/65 p-6 backdrop-blur">
              <div className="flex items-end justify-between border-b border-white/10 pb-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-100/70">Recent Runs</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">Benchmark snapshots</h2>
                </div>
                <p className="text-sm text-slate-400">Last 24 hours</p>
              </div>

              <div className="mt-5 space-y-3">
                {recentRuns.map((run) => (
                  <article key={run.name} className="rounded-[1.35rem] border border-white/10 bg-white/5 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h3 className="text-base font-semibold text-white">{run.name}</h3>
                        <p className="mt-1 text-sm text-slate-400">Reviewer: {run.analyst}</p>
                      </div>
                      <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${runClasses(run.verdict)}`}>{run.verdict}</span>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-sm text-slate-300">
                      <span>Quality score: {run.score}</span>
                      <span className="text-cyan-100">{run.delta} vs baseline</span>
                    </div>
                  </article>
                ))}
              </div>
            </motion.section>
          </div>
        </div>

        <motion.section variants={item} className="rounded-[1.95rem] border border-white/10 bg-slate-950/65 p-6 backdrop-blur">
          <div className="flex flex-col gap-5 border-b border-white/10 pb-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-100/70">Review Workspace</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Promotion notes, failure modes, and scoring logic</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {panels.map((panel) => {
                const active = activePanel === panel.id;

                return (
                  <button
                    key={panel.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => {
                      startTransition(() => {
                        setActivePanel(panel.id);
                      });
                    }}
                    className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                      active
                        ? "border-cyan-300/30 bg-cyan-300/12 text-white"
                        : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    <span className="block font-semibold">{panel.label}</span>
                    <span className="mt-1 block text-xs leading-5 text-inherit/80">{panel.blurb}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <motion.div
            key={deferredPanel}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6"
          >
            {panelContent(deferredPanel)}
          </motion.div>
        </motion.section>
      </motion.div>
    </main>
  );
}
