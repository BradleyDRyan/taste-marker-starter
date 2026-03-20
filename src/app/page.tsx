"use client";

import {
  ArrowRight,
  Brain,
  CheckCircle,
  ClockCounterClockwise,
  FileCode,
  GitBranch,
  ShieldCheck,
  Sparkle,
} from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { startTransition, useDeferredValue, useState } from "react";

type ExperimentStatus = "Promoted" | "Observed" | "Rolled back";
type Focus = "prompting" | "evaluation" | "guardrails";

type Metric = {
  label: string;
  value: string;
  delta: string;
  detail: string;
};

type Experiment = {
  id: string;
  title: string;
  date: string;
  objective: string;
  outcome: string;
  status: ExperimentStatus;
  score: number;
  confidence: number;
  lift: string;
  lessons: string[];
  sources: string[];
  patch: string[];
};

type SkillCard = {
  path: string;
  owner: string;
  readiness: string;
  change: string;
  bullets: string[];
};

type FocusPanel = {
  eyebrow: string;
  title: string;
  summary: string;
  rules: string[];
  snippet: string[];
};

const metrics: Metric[] = [
  {
    label: "Experiments parsed",
    value: "148",
    delta: "+19 this week",
    detail: "Runs from prompt trials, evaluator passes, and rollout postmortems are merged into one ledger.",
  },
  {
    label: "Recurring failure motifs",
    value: "6",
    delta: "2 newly stable",
    detail: "The agent only promotes guidance once the same fix resolves multiple independent regressions.",
  },
  {
    label: "Skill patches proposed",
    value: "14",
    delta: "9 ready to merge",
    detail: "Candidate edits stay attached to the experiments that justified them, not free-floating intuition.",
  },
  {
    label: "Adoption confidence",
    value: "92%",
    delta: "+7 pts",
    detail: "Claude Sonnet 4.6 high-reasoning synthesis is producing tighter, lower-churn skill updates.",
  },
];

const experiments: Experiment[] = [
  {
    id: "exp-148",
    title: "Tool-use planning regression sweep",
    date: "20 Mar 2026",
    objective: "Reduce premature implementation when users are still in design mode.",
    outcome: "The agent now pauses earlier, asks tighter scoping questions, and preserves momentum on code tasks.",
    status: "Promoted",
    score: 96,
    confidence: 94,
    lift: "+11 guidance quality",
    lessons: [
      "Separate brainstorming requests from build requests before selecting a workflow.",
      "When a plan is warranted, keep it short and directly connected to the next irreversible action.",
      "Do not spend tokens narrating intent the code does not execute.",
    ],
    sources: ["61 conversation turns", "3 failed handoffs", "2 accepted skill patches"],
    patch: [
      "+ Detect design-mode language before defaulting into implementation.",
      "+ Prefer one blocking clarification over speculative scaffolding.",
      "- Avoid broad plans when the next edit is already obvious.",
    ],
  },
  {
    id: "exp-143",
    title: "Frontend polish benchmark",
    date: "18 Mar 2026",
    objective: "Increase visual ambition without breaking established product language.",
    outcome: "The model produced stronger hierarchy and motion, but one branch overfit the prompt and ignored local patterns.",
    status: "Observed",
    score: 89,
    confidence: 83,
    lift: "+6 visual consistency",
    lessons: [
      "Inspect the live entry point before inventing new page structure.",
      "Preserve existing design systems when the repo already expresses one.",
      "Treat animation as communication, not decoration.",
    ],
    sources: ["24 UI diffs", "7 review comments", "1 rollback"],
    patch: [
      "+ Require a repo-style read before editing visual components.",
      "+ Name the intended visual direction before implementation begins.",
      "- Do not substitute an unrelated aesthetic just because the prompt is open-ended.",
    ],
  },
  {
    id: "exp-137",
    title: "Parallel agent delegation audit",
    date: "15 Mar 2026",
    objective: "Stop unnecessary delegation on tasks that block the immediate next step.",
    outcome: "Critical-path work stayed local more often, cutting wait time and reducing duplicate analysis.",
    status: "Promoted",
    score: 93,
    confidence: 91,
    lift: "+18 throughput",
    lessons: [
      "Do the blocking step locally before offloading sidecar research.",
      "Delegate only bounded tasks with disjoint ownership.",
      "Workers should be told explicitly not to revert peer edits.",
    ],
    sources: ["42 delegations", "11 merged worker patches", "0 merge reversions"],
    patch: [
      "+ Add a critical-path check before spawning workers.",
      "+ Require ownership notes for delegated code changes.",
      "- Stop using delegation as a substitute for local understanding.",
    ],
  },
  {
    id: "exp-129",
    title: "Skill-file summarization cleanup",
    date: "11 Mar 2026",
    objective: "Condense verbose SKILL.md guidance while keeping operational clarity.",
    outcome: "Compression improved scanability, but one edit removed a useful edge-case example and had to be rolled back.",
    status: "Rolled back",
    score: 78,
    confidence: 71,
    lift: "-4 recall precision",
    lessons: [
      "Shorter guidance is only better when edge cases remain executable.",
      "Examples should survive if they prevent a predictable failure mode.",
      "Compression needs a retained-risks check before merge.",
    ],
    sources: ["13 skill revisions", "4 confused follow-up turns", "1 restored example block"],
    patch: [
      "+ Preserve examples that stop recurring operator mistakes.",
      "+ Run a retained-risk pass after compression.",
      "- Do not optimize for brevity when the workflow becomes ambiguous.",
    ],
  },
];

const skillCards: SkillCard[] = [
  {
    path: "skills/frontend/SKILL.md",
    owner: "UI agent",
    readiness: "Ready to patch",
    change: "Tightens the requirement to inspect live entry points before designing a new surface.",
    bullets: [
      "Front-load repo pattern checks before visual ideation.",
      "Document the intended aesthetic in one sentence before coding.",
      "Preserve existing design systems unless the task is greenfield.",
    ],
  },
  {
    path: "skills/planning/SKILL.md",
    owner: "Core agent",
    readiness: "Ready to patch",
    change: "Clarifies when to switch from analysis to implementation and when to ask for a single blocker answer.",
    bullets: [
      "Detect design-mode requests before defaulting into edits.",
      "Avoid plans that do not change the next action.",
      "Treat one sharp clarification as better than speculative scaffolding.",
    ],
  },
  {
    path: "skills/delegation/SKILL.md",
    owner: "Orchestrator",
    readiness: "Needs review",
    change: "Hardens the rule that critical-path tasks stay local while sidecar work can fan out.",
    bullets: [
      "Run the blocking step locally first.",
      "Assign ownership for each delegated file or module.",
      "Tell workers they are not alone in the codebase.",
    ],
  },
  {
    path: "skills/summarization/SKILL.md",
    owner: "Learning agent",
    readiness: "Watch",
    change: "Adds a retained-risk checkpoint so compression does not erase protective examples.",
    bullets: [
      "Preserve examples tied to repeated confusion.",
      "Summarize only after checking edge-case survivability.",
      "Reject brevity that weakens execution.",
    ],
  },
];

const focusPanels: Record<Focus, FocusPanel> = {
  prompting: {
    eyebrow: "Prompt Discipline",
    title: "The agent is learning to separate user intent from user phrasing.",
    summary:
      "High-reasoning synthesis clusters experiment outcomes by hidden intent, then rewrites skill guidance around the real operating mode instead of surface wording.",
    rules: [
      "Detect whether the user is asking for design, implementation, review, or research before choosing a workflow.",
      "Favor one precise question when a missing answer would change the implementation path.",
      "Record intent-related failures as reusable heuristics, not one-off anecdotes.",
    ],
    snippet: [
      "IF request implies brainstorming or options, pause before editing files.",
      "IF next irreversible action is obvious, skip meta-planning and execute.",
      "WHEN uncertainty blocks execution, ask exactly one high-value clarifying question.",
    ],
  },
  evaluation: {
    eyebrow: "Experiment Triage",
    title: "Only repeatable wins become skill guidance.",
    summary:
      "The learning agent reads experiment history as evidence, weighting recurrence, blast radius, and merge acceptance before updating SKILL.md files.",
    rules: [
      "Promote advice only when the same fix resolves multiple runs or a high-severity failure.",
      "Keep the chain from experiment evidence to instruction text visible for reviewers.",
      "Prefer small patches that tighten behavior over abstract principle dumps.",
    ],
    snippet: [
      "score = recurrence * severity * merge_acceptance",
      "if score < threshold: retain as observation, not instruction",
      "if score >= threshold: generate patch + rationale + rollback note",
    ],
  },
  guardrails: {
    eyebrow: "Guardrails",
    title: "Compression is allowed. Ambiguity is not.",
    summary:
      "The agent now checks whether a proposed cleanup removes examples, caveats, or sequencing details that prevent repeated operator errors.",
    rules: [
      "Retain examples that stop a known failure mode.",
      "Reject stylistic cleanup that weakens operational clarity.",
      "Attach rollback reasons when a skill patch simplifies language too aggressively.",
    ],
    snippet: [
      "Before merge: compare removed text against known failures.",
      "If an example blocks a recurring mistake, keep it or replace it with an equally concrete one.",
      "Every compression patch needs a retained-risk note.",
    ],
  },
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.04,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

function statusClasses(status: ExperimentStatus): string {
  if (status === "Promoted") return "border-emerald-300/30 bg-emerald-300/12 text-emerald-100";
  if (status === "Observed") return "border-amber-300/30 bg-amber-300/12 text-amber-100";
  return "border-rose-300/30 bg-rose-300/12 text-rose-100";
}

export default function Page() {
  const [activeExperimentId, setActiveExperimentId] = useState(experiments[0].id);
  const [activeFocus, setActiveFocus] = useState<Focus>("prompting");
  const deferredExperimentId = useDeferredValue(activeExperimentId);
  const deferredFocus = useDeferredValue(activeFocus);

  const activeExperiment =
    experiments.find((experiment) => experiment.id === deferredExperimentId) ?? experiments[0];
  const activePanel = focusPanels[deferredFocus];

  return (
    <main className="learning-shell min-h-screen overflow-x-hidden px-4 py-6 text-stone-50 sm:px-6 lg:px-8">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto flex w-full max-w-7xl flex-col gap-6"
      >
        <motion.section
          variants={item}
          className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[rgba(12,16,20,0.82)] p-6 shadow-[0_38px_120px_-56px_rgba(12,179,158,0.55)] backdrop-blur-xl md:p-8"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,176,95,0.2),transparent_30%),radial-gradient(circle_at_82%_18%,rgba(39,190,173,0.16),transparent_22%),linear-gradient(135deg,rgba(255,255,255,0.06),transparent_42%)]" />
          <div className="relative grid gap-6 xl:grid-cols-[1.2fr_0.8fr] xl:items-start">
            <div>
              <div className="flex flex-wrap gap-2">
                {[
                  "Learning Agent",
                  "Claude Sonnet 4.6",
                  "Reasoning: High",
                  "Git-backed runtime",
                ].map((label) => (
                  <span
                    key={label}
                    className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-200"
                  >
                    {label}
                  </span>
                ))}
              </div>

              <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
                Reads experiment history and turns it into sharper skill-file guidance.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-300 sm:text-base">
                This learning agent reviews accepted patches, regressions, and rollout notes, then synthesizes the patterns into better
                `SKILL.md` instructions before the next run. The goal is lower churn, clearer workflows, and guidance that survives real
                operator pressure.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <article className="rounded-[1.45rem] border border-white/10 bg-white/6 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#ffb05f]/30 bg-[#ffb05f]/12 text-[#ffd6ab]">
                      <Brain size={22} weight="duotone" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-stone-400">Synthesis mode</p>
                      <p className="mt-1 text-lg font-semibold text-white">Feedback clustering</p>
                    </div>
                  </div>
                </article>

                <article className="rounded-[1.45rem] border border-white/10 bg-white/6 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#38b2a3]/30 bg-[#38b2a3]/12 text-[#a7f0e5]">
                      <GitBranch size={22} weight="duotone" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-stone-400">Patch target</p>
                      <p className="mt-1 text-lg font-semibold text-white">Skill-file diffs</p>
                    </div>
                  </div>
                </article>

                <article className="rounded-[1.45rem] border border-white/10 bg-white/6 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/8 text-white">
                      <ShieldCheck size={22} weight="duotone" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-stone-400">Promotion rule</p>
                      <p className="mt-1 text-lg font-semibold text-white">Repeatable evidence only</p>
                    </div>
                  </div>
                </article>
              </div>
            </div>

            <article className="relative overflow-hidden rounded-[1.85rem] border border-white/10 bg-[#121820]/85 p-5">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,178,163,0.15),transparent_42%),linear-gradient(180deg,rgba(255,176,95,0.08),transparent_26%)]" />
              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#a7f0e5]">Active synthesis</p>
                    <h2 className="mt-2 text-2xl font-semibold text-white">{activeExperiment.title}</h2>
                  </div>
                  <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusClasses(activeExperiment.status)}`}>
                    {activeExperiment.status}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-7 text-stone-300">{activeExperiment.outcome}</p>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-stone-400">Run score</p>
                    <p className="mt-2 text-3xl font-semibold text-white">{activeExperiment.score}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-stone-400">Confidence</p>
                    <p className="mt-2 text-3xl font-semibold text-white">{activeExperiment.confidence}%</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-stone-400">Observed lift</p>
                    <p className="mt-2 text-3xl font-semibold text-white">{activeExperiment.lift}</p>
                  </div>
                </div>

                <div className="mt-5 rounded-[1.4rem] border border-[#38b2a3]/20 bg-[#38b2a3]/10 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-white">Promotion confidence</p>
                    <p className="text-sm font-semibold text-[#c9fff7]">{activeExperiment.confidence}%</p>
                  </div>
                  <div className="mt-3 h-2.5 rounded-full bg-white/8">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#ffb05f] via-[#ffd39f] to-[#5de2d3]"
                      style={{ width: `${activeExperiment.confidence}%` }}
                    />
                  </div>
                </div>
              </div>
            </article>
          </div>
        </motion.section>

        <motion.section variants={item} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
            <article
              key={metric.label}
              className="rounded-[1.5rem] border border-white/10 bg-[rgba(17,21,27,0.74)] p-5 backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-white/20"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="max-w-[11rem] text-sm font-medium leading-6 text-stone-200">{metric.label}</p>
                <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs font-semibold text-stone-300">
                  {metric.delta}
                </span>
              </div>
              <p className="mt-6 text-4xl font-semibold tracking-[-0.04em] text-white">{metric.value}</p>
              <p className="mt-3 text-sm leading-6 text-stone-400">{metric.detail}</p>
            </article>
          ))}
        </motion.section>

        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <motion.section variants={item} className="rounded-[1.9rem] border border-white/10 bg-[rgba(14,18,23,0.76)] p-6 backdrop-blur-xl">
            <div className="flex flex-col gap-3 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#ffd6ab]">Experiment history</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Which runs are strong enough to teach from</h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-stone-400">
                The agent reads experiment history as evidence, not decoration. Each selection updates the synthesis and proposed patch.
              </p>
            </div>

            <div className="mt-5 grid gap-4">
              {experiments.map((experiment) => {
                const selected = experiment.id === activeExperimentId;

                return (
                  <button
                    key={experiment.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => {
                      startTransition(() => {
                        setActiveExperimentId(experiment.id);
                      });
                    }}
                    className={`group rounded-[1.5rem] border p-4 text-left transition ${
                      selected
                        ? "border-[#38b2a3]/35 bg-[#38b2a3]/10 shadow-[0_18px_50px_-32px_rgba(56,178,163,0.8)]"
                        : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/7"
                    }`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-lg font-semibold text-white">{experiment.title}</h3>
                          <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusClasses(experiment.status)}`}>
                            {experiment.status}
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-stone-400">{experiment.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs uppercase tracking-[0.22em] text-stone-500">Signal score</p>
                        <p className="mt-1 text-2xl font-semibold text-white">{experiment.score}</p>
                      </div>
                    </div>

                    <p className="mt-4 text-sm leading-6 text-stone-300">{experiment.objective}</p>

                    <div className="mt-5 grid gap-3 lg:grid-cols-[1.1fr_0.9fr]">
                      <div className="rounded-2xl border border-white/10 bg-black/15 p-3">
                        <p className="text-xs uppercase tracking-[0.24em] text-stone-500">Lessons extracted</p>
                        <ul className="mt-3 space-y-2">
                          {experiment.lessons.slice(0, 2).map((lesson) => (
                            <li key={lesson} className="flex gap-3 text-sm leading-6 text-stone-300">
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#5de2d3]" />
                              <span>{lesson}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-black/15 p-3">
                        <p className="text-xs uppercase tracking-[0.24em] text-stone-500">Evidence sources</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {experiment.sources.map((source) => (
                            <span
                              key={source}
                              className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs font-medium text-stone-300"
                            >
                              {source}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between gap-3 text-sm">
                      <span className="text-[#c9fff7]">{experiment.lift}</span>
                      <span className="inline-flex items-center gap-2 text-stone-300 transition group-hover:text-white">
                        Inspect synthesis
                        <ArrowRight size={16} />
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.section>

          <div className="grid gap-6">
            <motion.section variants={item} className="rounded-[1.9rem] border border-white/10 bg-[rgba(14,18,23,0.76)] p-6 backdrop-blur-xl">
              <div className="flex flex-col gap-3 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#a7f0e5]">Synthesis output</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">What Claude Sonnet 4.6 writes back into guidance</h2>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-3 py-2 text-xs font-medium text-stone-300">
                  <Sparkle size={15} />
                  High-reasoning pass
                </div>
              </div>

              <motion.div
                key={activeExperiment.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="mt-5"
              >
                <div className="rounded-[1.55rem] border border-[#ffb05f]/20 bg-[#ffb05f]/8 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#ffd6ab]">Synthesis summary</p>
                  <p className="mt-3 text-base leading-7 text-stone-200">{activeExperiment.outcome}</p>
                </div>

                <div className="mt-4 grid gap-4">
                  {activeExperiment.lessons.map((lesson) => (
                    <article key={lesson} className="rounded-[1.35rem] border border-white/10 bg-white/5 p-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl border border-[#38b2a3]/25 bg-[#38b2a3]/10 text-[#baf8f0]">
                          <CheckCircle size={20} weight="duotone" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-stone-500">Learned rule</p>
                          <p className="mt-2 text-sm leading-6 text-stone-300">{lesson}</p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </motion.div>
            </motion.section>

            <motion.section variants={item} className="rounded-[1.9rem] border border-white/10 bg-[rgba(14,18,23,0.76)] p-6 backdrop-blur-xl">
              <div className="flex flex-col gap-3 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#ffd6ab]">Patch preview</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">Candidate SKILL.md diff</h2>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-3 py-2 text-xs font-medium text-stone-300">
                  <ClockCounterClockwise size={15} />
                  Linked to experiment evidence
                </div>
              </div>

              <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-[#0b0f13] p-4">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/6 text-white">
                    <FileCode size={20} weight="duotone" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">`skills/learning/SKILL.md`</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.24em] text-stone-500">Proposed guidance delta</p>
                  </div>
                </div>

                <motion.div
                  key={`${activeExperiment.id}-patch`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.24 }}
                  className="mt-4 space-y-3 font-mono text-sm leading-6 text-stone-300"
                >
                  {activeExperiment.patch.map((line) => {
                    const positive = line.startsWith("+");
                    const negative = line.startsWith("-");

                    return (
                      <div
                        key={line}
                        className={`rounded-xl border px-3 py-2 ${
                          positive
                            ? "border-emerald-300/20 bg-emerald-300/8 text-emerald-100"
                            : negative
                              ? "border-rose-300/20 bg-rose-300/8 text-rose-100"
                              : "border-white/10 bg-white/5"
                        }`}
                      >
                        {line}
                      </div>
                    );
                  })}
                </motion.div>
              </div>
            </motion.section>
          </div>
        </div>

        <motion.section variants={item} className="rounded-[1.95rem] border border-white/10 bg-[rgba(14,18,23,0.78)] p-6 backdrop-blur-xl">
          <div className="flex flex-col gap-5 border-b border-white/10 pb-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#a7f0e5]">Improvement logic</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">The feedback loop that keeps skill files getting better</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {([
                { id: "prompting", label: "Prompting" },
                { id: "evaluation", label: "Evaluation" },
                { id: "guardrails", label: "Guardrails" },
              ] as Array<{ id: Focus; label: string }>).map((focus) => {
                const selected = focus.id === activeFocus;

                return (
                  <button
                    key={focus.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => {
                      startTransition(() => {
                        setActiveFocus(focus.id);
                      });
                    }}
                    className={`rounded-2xl border px-4 py-3 text-sm font-medium transition ${
                      selected
                        ? "border-[#ffb05f]/35 bg-[#ffb05f]/12 text-white"
                        : "border-white/10 bg-white/5 text-stone-300 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    {focus.label}
                  </button>
                );
              })}
            </div>
          </div>

          <motion.div
            key={deferredFocus}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]"
          >
            <article className="rounded-[1.6rem] border border-white/10 bg-white/5 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#ffd6ab]">{activePanel.eyebrow}</p>
              <h3 className="mt-3 text-2xl font-semibold text-white">{activePanel.title}</h3>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-300">{activePanel.summary}</p>

              <div className="mt-5 grid gap-3">
                {activePanel.rules.map((rule) => (
                  <div key={rule} className="rounded-[1.25rem] border border-white/10 bg-black/15 p-4">
                    <div className="flex gap-3">
                      <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#5de2d3]" />
                      <p className="text-sm leading-6 text-stone-300">{rule}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-[1.6rem] border border-white/10 bg-[#0d1218] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#a7f0e5]">Synthesized guidance</p>
              <div className="mt-4 space-y-3 font-mono text-sm leading-6 text-stone-300">
                {activePanel.snippet.map((line) => (
                  <div key={line} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                    {line}
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-[1.35rem] border border-[#38b2a3]/20 bg-[#38b2a3]/10 p-4">
                <p className="text-sm font-semibold text-white">Why this survives review</p>
                <p className="mt-2 text-sm leading-6 text-stone-300">
                  Each rule is justified by repeated experiment evidence, linked to a concrete patch, and scoped tightly enough that a
                  reviewer can accept or reject it without re-litigating the whole workflow.
                </p>
              </div>
            </article>
          </motion.div>
        </motion.section>

        <motion.section variants={item} className="rounded-[1.95rem] border border-white/10 bg-[rgba(14,18,23,0.78)] p-6 backdrop-blur-xl">
          <div className="flex flex-col gap-3 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#ffd6ab]">Skill file targets</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Where the next guidance improvements land</h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-stone-400">
              Patches stay narrow, attributable, and mergeable. The learning loop is only useful if maintainers can ship it cleanly.
            </p>
          </div>

          <div className="mt-5 grid gap-4 xl:grid-cols-2">
            {skillCards.map((card) => (
              <article key={card.path} className="rounded-[1.55rem] border border-white/10 bg-white/5 p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-stone-500">{card.owner}</p>
                    <h3 className="mt-2 text-xl font-semibold text-white">{card.path}</h3>
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs font-semibold text-stone-200">
                    {card.readiness}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-6 text-stone-300">{card.change}</p>

                <div className="mt-5 grid gap-3">
                  {card.bullets.map((bullet) => (
                    <div key={bullet} className="rounded-[1.2rem] border border-white/10 bg-black/15 p-3 text-sm leading-6 text-stone-300">
                      {bullet}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </motion.section>
      </motion.div>
    </main>
  );
}
