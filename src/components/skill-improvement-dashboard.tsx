"use client";

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { motion } from "framer-motion";
import {
  BellSimpleRinging,
  Brain,
  CheckCircle,
  ClockCountdown,
  FadersHorizontal,
  Gauge,
  GitBranch,
  MagnifyingGlass,
  RocketLaunch,
  ShieldCheck,
  SidebarSimple,
  Sparkle,
  Target,
  TrendUp,
  WarningDiamond,
} from "@phosphor-icons/react";
import {
  startTransition,
  useDeferredValue,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

type Lane = "all" | "triage" | "rewriting" | "ready" | "shipped";
type SkillLane = Exclude<Lane, "all">;

type FeedbackBucket = {
  label: string;
  count: number;
};

type ScoreSection = {
  label: string;
  score: number;
};

type EvalNote = {
  suite: string;
  score: number;
  delta: number;
  note: string;
};

type RevisionChange = {
  before: string;
  after: string;
};

type SkillDoc = {
  id: string;
  name: string;
  owner: string;
  lane: SkillLane;
  summary: string;
  lastRun: string;
  score: number;
  targetScore: number;
  delta: number;
  feedbackItems: number;
  docVersion: string;
  shipWindow: string;
  branch: string;
  focus: string[];
  sections: ScoreSection[];
  evaluatorNotes: EvalNote[];
  scoreHistory: number[];
  feedbackBuckets: FeedbackBucket[];
  revisionPlan: RevisionChange[];
};

type Release = {
  skill: string;
  status: "Monitoring" | "Staged" | "Queued";
  window: string;
  lift: number;
  note: string;
};

type NavItem = {
  id: string;
  label: string;
  hint: string;
  icon: ElementType;
};

type Metric = {
  label: string;
  value: string;
  detail: string;
  icon: ElementType;
  tone: string;
};

const DASHBOARD_THEME: CSSProperties = {
  ["--loop-shell" as string]: "rgba(255, 250, 243, 0.8)",
  ["--loop-panel" as string]: "rgba(255, 255, 255, 0.78)",
  ["--loop-panel-strong" as string]: "#fff8ef",
  ["--loop-panel-dark" as string]: "#17263f",
  ["--loop-panel-dark-soft" as string]: "#24395b",
  ["--loop-ink" as string]: "#122033",
  ["--loop-ink-muted" as string]: "#607089",
  ["--loop-border" as string]: "rgba(18, 32, 51, 0.11)",
  ["--loop-border-strong" as string]: "rgba(18, 32, 51, 0.18)",
  ["--loop-blue" as string]: "#4e7af2",
  ["--loop-coral" as string]: "#e86d54",
  ["--loop-gold" as string]: "#efb86a",
  ["--loop-teal" as string]: "#54a394",
  ["--loop-mint" as string]: "#dff3e7",
  ["--loop-rose" as string]: "#fbe1da",
  ["--loop-shadow" as string]: "0 28px 90px rgba(18, 32, 51, 0.16)",
};

const BRAND_NAME = "Skill Foundry";

const NAV_ITEMS: NavItem[] = [
  { id: "overview", label: "Overview", hint: "Loop health", icon: Gauge },
  { id: "feedback", label: "Feedback Queue", hint: "Packet intake", icon: Sparkle },
  { id: "experiments", label: "Experiments", hint: "Live rewrites", icon: Brain },
  { id: "docs", label: "Skill Docs", hint: "Canonical prompts", icon: GitBranch },
  { id: "releases", label: "Releases", hint: "Ship + monitor", icon: RocketLaunch },
];

const LANE_OPTIONS: Array<{ id: Lane; label: string }> = [
  { id: "all", label: "All docs" },
  { id: "triage", label: "Needs triage" },
  { id: "rewriting", label: "Rewriting" },
  { id: "ready", label: "Ready to ship" },
  { id: "shipped", label: "Monitoring" },
];

const SKILL_DOCS: SkillDoc[] = [
  {
    id: "dashboard-style",
    name: "dashboard-style",
    owner: "Maya Patel",
    lane: "rewriting",
    summary:
      "Moves rubric-first assembly ahead of visual polish so the agent lands the full dashboard shape before it starts tuning tokens.",
    lastRun: "3 minutes ago",
    score: 83.4,
    targetScore: 92,
    delta: 4.8,
    feedbackItems: 28,
    docVersion: "v1.18",
    shipWindow: "Re-score in 42 min",
    branch: "skills/dashboard-style/rewrite-118",
    focus: [
      "Promote exact-count checks before styling notes.",
      "Tighten copy-fidelity language for symbols and punctuation.",
      "Surface the single-file fallback earlier in the workflow.",
    ],
    sections: [
      { label: "Task discipline", score: 76 },
      { label: "Assembly order", score: 88 },
      { label: "Copy fidelity", score: 94 },
      { label: "Verification", score: 81 },
    ],
    evaluatorNotes: [
      {
        suite: "Rubric fidelity",
        score: 79,
        delta: 6,
        note: "Still misses exact item counts when the prompt mixes prose guidance with explicit structure.",
      },
      {
        suite: "Editing discipline",
        score: 86,
        delta: 4,
        note: "Good on preserving entry-point inspection, but the source-edit validation step needs stronger emphasis.",
      },
      {
        suite: "Visual hierarchy",
        score: 85,
        delta: 3,
        note: "Improved hero prioritization after placing shell and metric regions first.",
      },
    ],
    scoreHistory: [71, 74, 78, 80, 83.4],
    feedbackBuckets: [
      { label: "Exact output shape", count: 12 },
      { label: "Verification order", count: 7 },
      { label: "Copy drift", count: 5 },
      { label: "Token fallback", count: 4 },
    ],
    revisionPlan: [
      {
        before: "Styling guidance competes with rubric requirements near the top of the file.",
        after: "Move rubric-first instructions above visual refinement so the agent clears core regions in one pass.",
      },
      {
        before: "Symbol-preservation advice is present but easy to skip.",
        after: "Add a literal copy audit step that explicitly checks ampersands, slashes, and abbreviations.",
      },
      {
        before: "Single-file dashboard constraint is buried in a longer list.",
        after: "Promote the fallback token technique into the main task discipline section.",
      },
    ],
  },
  {
    id: "openai-docs",
    name: "openai-docs",
    owner: "Elliot Hart",
    lane: "shipped",
    summary:
      "Routes product questions through official OpenAI documentation and forces citations from primary sources before broader browsing.",
    lastRun: "19 minutes ago",
    score: 94.8,
    targetScore: 96,
    delta: 3.2,
    feedbackItems: 14,
    docVersion: "v2.07",
    shipWindow: "Monitoring for 24h",
    branch: "skills/openai-docs/ship-207",
    focus: [
      "Protect domain restrictions on fallback search.",
      "Clarify model-upgrade guidance for GPT-5.4 migrations.",
      "Keep insufficiency summaries brief when docs are incomplete.",
    ],
    sections: [
      { label: "Source selection", score: 98 },
      { label: "Citation discipline", score: 96 },
      { label: "Fallback browsing", score: 93 },
      { label: "Failure reporting", score: 92 },
    ],
    evaluatorNotes: [
      {
        suite: "Primary-source compliance",
        score: 98,
        delta: 2,
        note: "Official-domain routing is now consistent across product-support queries.",
      },
      {
        suite: "Answer clarity",
        score: 93,
        delta: 3,
        note: "Better at separating quoted policy from model recommendations.",
      },
      {
        suite: "Fallback discipline",
        score: 94,
        delta: 4,
        note: "Skill now explains when official docs are insufficient instead of silently speculating.",
      },
    ],
    scoreHistory: [86, 89, 91, 93, 94.8],
    feedbackBuckets: [
      { label: "Citations", count: 6 },
      { label: "Fallback boundaries", count: 4 },
      { label: "Upgrade guidance", count: 2 },
      { label: "Failure summaries", count: 2 },
    ],
    revisionPlan: [
      {
        before: "Fallback search rules were implied by description text.",
        after: "Explicitly gate fallback browsing to official OpenAI domains unless the user requests otherwise.",
      },
      {
        before: "Upgrade guidance referenced older model families.",
        after: "Center current GPT-5.4 migration and prompt-upgrade pathways.",
      },
      {
        before: "Insufficiency wording was inconsistent.",
        after: "Add a short required closeout line when an answer cannot be completed from official sources.",
      },
    ],
  },
  {
    id: "review-mode-auditor",
    name: "review-mode-auditor",
    owner: "Noah Brooks",
    lane: "triage",
    summary:
      "Turns vague review requests into a strict findings-first audit with file references, severity ordering, and explicit residual risk.",
    lastRun: "7 minutes ago",
    score: 68.3,
    targetScore: 88,
    delta: -1.7,
    feedbackItems: 31,
    docVersion: "v0.91",
    shipWindow: "Needs rewrite plan",
    branch: "skills/review-mode-auditor/triage-091",
    focus: [
      "Stop drifting into summaries before findings.",
      "Force line-referenced defects before any overview text.",
      "Add a no-findings fallback that still calls out testing gaps.",
    ],
    sections: [
      { label: "Severity ordering", score: 61 },
      { label: "File references", score: 72 },
      { label: "No-findings fallback", score: 69 },
      { label: "Residual risk framing", score: 71 },
    ],
    evaluatorNotes: [
      {
        suite: "Review posture",
        score: 63,
        delta: -3,
        note: "Still opens with change summaries too often when the user asks for a review.",
      },
      {
        suite: "Evidence quality",
        score: 70,
        delta: 1,
        note: "References files but often misses the most actionable line-level defect.",
      },
      {
        suite: "Risk framing",
        score: 72,
        delta: 0,
        note: "Residual testing gaps are present but not consistently separated from findings.",
      },
    ],
    scoreHistory: [74, 73, 72, 70, 68.3],
    feedbackBuckets: [
      { label: "Findings order", count: 14 },
      { label: "Missing line refs", count: 9 },
      { label: "Testing gaps", count: 5 },
      { label: "Tone drift", count: 3 },
    ],
    revisionPlan: [
      {
        before: "Review guidance mixes defect reporting with optional overviews.",
        after: "Lead with a hard findings-first contract and postpone summaries to the end.",
      },
      {
        before: "Line references are implied rather than required.",
        after: "Mandate file-and-line citations on each material finding.",
      },
      {
        before: "No-findings path is underspecified.",
        after: "Add an explicit branch for clean reviews that still documents residual verification risk.",
      },
    ],
  },
  {
    id: "parallel-worker-handbook",
    name: "parallel-worker-handbook",
    owner: "Iris Almeida",
    lane: "ready",
    summary:
      "Teaches the main agent when to delegate, how to assign disjoint file ownership, and how to integrate worker output without duplicate effort.",
    lastRun: "11 minutes ago",
    score: 90.2,
    targetScore: 93,
    delta: 2.9,
    feedbackItems: 19,
    docVersion: "v1.04",
    shipWindow: "Awaiting sign-off",
    branch: "skills/parallel-worker-handbook/ready-104",
    focus: [
      "Make critical-path delegation language more explicit.",
      "Require disjoint write scopes in worker prompts.",
      "Shorten wait-loop guidance for blocked states only.",
    ],
    sections: [
      { label: "Delegation threshold", score: 92 },
      { label: "Ownership clarity", score: 95 },
      { label: "Wait strategy", score: 84 },
      { label: "Integration hygiene", score: 90 },
    ],
    evaluatorNotes: [
      {
        suite: "Worker prompting",
        score: 95,
        delta: 4,
        note: "Ownership and non-revert constraints are now clear and consistently honored.",
      },
      {
        suite: "Critical path reasoning",
        score: 88,
        delta: 2,
        note: "Improved local-first decision making, but the wait guidance can still be shorter.",
      },
      {
        suite: "Parallelism quality",
        score: 89,
        delta: 3,
        note: "Agent decomposition now avoids duplicate read-only exploration.",
      },
    ],
    scoreHistory: [80, 84, 86, 88, 90.2],
    feedbackBuckets: [
      { label: "Critical path", count: 7 },
      { label: "Wait behavior", count: 5 },
      { label: "Write ownership", count: 4 },
      { label: "Integration", count: 3 },
    ],
    revisionPlan: [
      {
        before: "Delegation rules mention the critical path but leave the threshold ambiguous.",
        after: "Call out immediate blockers explicitly and instruct the main agent to keep them local.",
      },
      {
        before: "Wait guidance spreads across multiple paragraphs.",
        after: "Condense waiting into one rule: block only when the next critical-path action truly depends on the result.",
      },
      {
        before: "Ownership instructions are strong but easy to skim past.",
        after: "Bold the disjoint write-scope requirement in the worker section.",
      },
    ],
  },
  {
    id: "skill-installer",
    name: "skill-installer",
    owner: "Harper Singh",
    lane: "rewriting",
    summary:
      "Guides installation from curated lists or GitHub repos while preserving authentication boundaries and minimizing unnecessary repo scans.",
    lastRun: "26 minutes ago",
    score: 81.8,
    targetScore: 89,
    delta: 1.6,
    feedbackItems: 24,
    docVersion: "v1.31",
    shipWindow: "Patch queued",
    branch: "skills/skill-installer/rewrite-131",
    focus: [
      "Clarify private-repo fallback behavior.",
      "Reduce context-loading when reading remote skill folders.",
      "Tighten the install-vs-list branching logic.",
    ],
    sections: [
      { label: "Repo auth handling", score: 84 },
      { label: "Context hygiene", score: 79 },
      { label: "Install branching", score: 82 },
      { label: "Post-install checks", score: 82 },
    ],
    evaluatorNotes: [
      {
        suite: "Auth boundaries",
        score: 86,
        delta: 2,
        note: "Private-repo handling is safer, but remote-path assumptions still need sharper wording.",
      },
      {
        suite: "Context hygiene",
        score: 78,
        delta: 1,
        note: "The agent still over-reads repo content when a single skill file would be enough.",
      },
      {
        suite: "Branching logic",
        score: 81,
        delta: 2,
        note: "User intent separation is improved but not yet deterministic for mixed requests.",
      },
    ],
    scoreHistory: [74, 76, 79, 80, 81.8],
    feedbackBuckets: [
      { label: "Private repo flow", count: 8 },
      { label: "Context size", count: 7 },
      { label: "Intent branching", count: 5 },
      { label: "Verification", count: 4 },
    ],
    revisionPlan: [
      {
        before: "Private-repo instructions rely on broad wording around credentials.",
        after: "Add an explicit branch for private installs and keep the scope narrow to the requested skill path.",
      },
      {
        before: "Repo scanning defaults are too eager.",
        after: "Require reading only the directly relevant skill files unless blocked.",
      },
      {
        before: "Install and list flows share the same narrative.",
        after: "Split them into distinct task branches with separate completion checks.",
      },
    ],
  },
  {
    id: "prompt-diff-surgeon",
    name: "prompt-diff-surgeon",
    owner: "Jun Park",
    lane: "triage",
    summary:
      "Converts evaluator comments into minimal, targeted prompt diffs instead of broad rewrites that disturb already-correct behavior.",
    lastRun: "41 minutes ago",
    score: 73.5,
    targetScore: 87,
    delta: 0.9,
    feedbackItems: 17,
    docVersion: "v0.74",
    shipWindow: "Needs narrower patch",
    branch: "skills/prompt-diff-surgeon/triage-074",
    focus: [
      "Stop rewriting unaffected sections.",
      "Tie every edit to a concrete evaluator complaint.",
      "Keep before-and-after examples short and auditable.",
    ],
    sections: [
      { label: "Patch minimalism", score: 67 },
      { label: "Evidence linkage", score: 75 },
      { label: "Example quality", score: 78 },
      { label: "Regression control", score: 74 },
    ],
    evaluatorNotes: [
      {
        suite: "Patch scope",
        score: 66,
        delta: -1,
        note: "The doc still encourages large rewrites even when only one instruction is broken.",
      },
      {
        suite: "Traceability",
        score: 75,
        delta: 2,
        note: "Examples now cite evaluator language, but the mapping is not required for every change.",
      },
      {
        suite: "Regression control",
        score: 79,
        delta: 1,
        note: "Better at preserving good instructions, though unchanged regions should be named explicitly.",
      },
    ],
    scoreHistory: [69, 70, 71, 72, 73.5],
    feedbackBuckets: [
      { label: "Patch scope", count: 7 },
      { label: "Traceability", count: 4 },
      { label: "Regression risk", count: 4 },
      { label: "Example quality", count: 2 },
    ],
    revisionPlan: [
      {
        before: "Prompt updates are described as rewrites rather than bounded diffs.",
        after: "Require the smallest viable edit that addresses the failing evaluator observation.",
      },
      {
        before: "Evaluator complaints are used as inspiration instead of evidence.",
        after: "Map every instruction change to the exact failing behavior or critique.",
      },
      {
        before: "Examples are verbose and hard to audit.",
        after: "Replace them with compact before-and-after snippets that isolate the changed rule.",
      },
    ],
  },
];

const RELEASES: Release[] = [
  {
    skill: "openai-docs",
    status: "Monitoring",
    window: "Mar 19, 15:40 UTC",
    lift: 3.2,
    note: "Official-source routing now holds under mixed product and policy questions.",
  },
  {
    skill: "parallel-worker-handbook",
    status: "Staged",
    window: "Mar 20, 12:10 UTC",
    lift: 2.9,
    note: "Delegation prompts are cleaner after disjoint write-scope language.",
  },
  {
    skill: "dashboard-style",
    status: "Queued",
    window: "Mar 20, 13:00 UTC",
    lift: 4.8,
    note: "Rubric-first rewrite is ready for the next evaluation batch.",
  },
  {
    skill: "skill-installer",
    status: "Queued",
    window: "Mar 20, 14:20 UTC",
    lift: 1.6,
    note: "Private-repo flow still needs one tighter verification pass.",
  },
];

const compactNumber = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1,
});

function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

function average(values: number[]) {
  return values.reduce((total, value) => total + value, 0) / Math.max(values.length, 1);
}

function formatScore(score: number) {
  return score.toFixed(1);
}

function formatLift(delta: number) {
  return `${delta > 0 ? "+" : ""}${delta.toFixed(1)} pts`;
}

function buildSparkline(values: number[]) {
  const height = 56;
  const width = 100;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = Math.max(max - min, 1);

  return values
    .map((value, index) => {
      const x = values.length === 1 ? 0 : (index / (values.length - 1)) * width;
      const y = height - ((value - min) / range) * (height - 8) - 4;
      return `${x},${y}`;
    })
    .join(" ");
}

function laneMeta(lane: SkillLane) {
  switch (lane) {
    case "triage":
      return {
        label: "Needs triage",
        badge: "border-[var(--loop-border-strong)] bg-[var(--loop-rose)] text-[var(--loop-ink)]",
        dot: "bg-[var(--loop-coral)]",
      };
    case "rewriting":
      return {
        label: "Rewriting",
        badge:
          "border-[var(--loop-border-strong)] bg-[rgba(239,184,106,0.24)] text-[var(--loop-ink)]",
        dot: "bg-[var(--loop-gold)]",
      };
    case "ready":
      return {
        label: "Ready to ship",
        badge:
          "border-[var(--loop-border-strong)] bg-[rgba(78,122,242,0.14)] text-[var(--loop-ink)]",
        dot: "bg-[var(--loop-blue)]",
      };
    case "shipped":
      return {
        label: "Monitoring",
        badge: "border-[var(--loop-border-strong)] bg-[var(--loop-mint)] text-[var(--loop-ink)]",
        dot: "bg-[var(--loop-teal)]",
      };
  }
}

function releaseTone(status: Release["status"]) {
  switch (status) {
    case "Monitoring":
      return "bg-[var(--loop-mint)] text-[var(--loop-ink)]";
    case "Staged":
      return "bg-[rgba(78,122,242,0.14)] text-[var(--loop-ink)]";
    case "Queued":
      return "bg-[rgba(239,184,106,0.24)] text-[var(--loop-ink)]";
  }
}

function aggregateFeedback() {
  const counts = new Map<string, number>();

  for (const skill of SKILL_DOCS) {
    for (const bucket of skill.feedbackBuckets) {
      counts.set(bucket.label, (counts.get(bucket.label) ?? 0) + bucket.count);
    }
  }

  return [...counts.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((left, right) => right.count - left.count)
    .slice(0, 6);
}

const totalFeedback = SKILL_DOCS.reduce((total, skill) => total + skill.feedbackItems, 0);
const meanScore = average(SKILL_DOCS.map((skill) => skill.score));
const activeDocs = SKILL_DOCS.filter((skill) => skill.lane !== "shipped").length;
const releaseLift = average(RELEASES.map((release) => release.lift));
const aggregateBuckets = aggregateFeedback();

const METRICS: Metric[] = [
  {
    label: "Feedback packets",
    value: compactNumber.format(totalFeedback),
    detail: "Grouped into 24 recurring failure clusters across the current batch.",
    icon: Sparkle,
    tone: "bg-[rgba(232,109,84,0.14)] text-[var(--loop-coral)]",
  },
  {
    label: "Active rewrites",
    value: `${activeDocs}`,
    detail: "Two skills are still in triage and need tighter patch boundaries.",
    icon: FadersHorizontal,
    tone: "bg-[rgba(239,184,106,0.18)] text-[var(--loop-gold)]",
  },
  {
    label: "Mean evaluator score",
    value: formatScore(meanScore),
    detail: "The current median still trails the shipping bar by 7.8 points.",
    icon: TrendUp,
    tone: "bg-[rgba(78,122,242,0.14)] text-[var(--loop-blue)]",
  },
  {
    label: "Released lift",
    value: formatLift(releaseLift),
    detail: "Recent shipped updates are holding their gains in monitoring.",
    icon: ShieldCheck,
    tone: "bg-[rgba(84,163,148,0.18)] text-[var(--loop-teal)]",
  },
];

function SectionCard({
  eyebrow,
  title,
  description,
  action,
  className,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      className={cn(
        "rounded-[28px] border border-[var(--loop-border)] bg-[var(--loop-panel)] p-5 shadow-[0_18px_50px_rgba(18,32,51,0.08)] backdrop-blur md:p-6",
        className,
      )}
    >
      <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-2xl">
          {eyebrow ? (
            <p className="mb-2 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[var(--loop-ink-muted)]">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="text-xl font-semibold text-[var(--loop-ink)]">{title}</h2>
          {description ? (
            <p className="mt-1.5 text-sm leading-6 text-[var(--loop-ink-muted)]">{description}</p>
          ) : null}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function MetricCard({ icon: Icon, label, value, detail, tone }: Metric) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.18 }}
      className="rounded-[24px] border border-[var(--loop-border)] bg-[var(--loop-panel)] p-5 shadow-[0_16px_40px_rgba(18,32,51,0.07)] backdrop-blur"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-[var(--loop-ink-muted)]">{label}</p>
          <p className="mt-3 text-3xl font-semibold text-[var(--loop-ink)]">{value}</p>
        </div>
        <div className={cn("flex h-12 w-12 items-center justify-center rounded-[18px]", tone)}>
          <Icon size={24} weight="duotone" />
        </div>
      </div>
      <p className="mt-3 text-sm leading-6 text-[var(--loop-ink-muted)]">{detail}</p>
    </motion.article>
  );
}

function QueueCard({
  skill,
  selected,
  onSelect,
}: {
  skill: SkillDoc;
  selected: boolean;
  onSelect: () => void;
}) {
  const meta = laneMeta(skill.lane);

  return (
    <motion.button
      type="button"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.18 }}
      onClick={onSelect}
      className={cn(
        "w-full rounded-[22px] border p-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--loop-blue)] focus-visible:ring-offset-2",
        selected
          ? "border-[var(--loop-border-strong)] bg-[var(--loop-panel-strong)] shadow-[0_18px_40px_rgba(18,32,51,0.09)]"
          : "border-[var(--loop-border)] bg-white/60 hover:border-[var(--loop-border-strong)] hover:bg-white/75",
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className={cn("h-2.5 w-2.5 rounded-full", meta.dot)} />
            <p className="font-semibold text-[var(--loop-ink)]">{skill.name}</p>
          </div>
          <p className="mt-1 text-sm text-[var(--loop-ink-muted)]">
            {skill.owner} · {skill.docVersion}
          </p>
        </div>
        <span
          className={cn(
            "rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]",
            meta.badge,
          )}
        >
          {meta.label}
        </span>
      </div>

      <p className="mt-4 text-sm leading-6 text-[var(--loop-ink-muted)]">{skill.summary}</p>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-[18px] bg-[var(--loop-panel)] p-3">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--loop-ink-muted)]">
            Score
          </p>
          <p className="mt-2 text-xl font-semibold text-[var(--loop-ink)]">{formatScore(skill.score)}</p>
        </div>
        <div className="rounded-[18px] bg-[var(--loop-panel)] p-3">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--loop-ink-muted)]">
            Last run
          </p>
          <p className="mt-2 text-sm font-medium text-[var(--loop-ink)]">{skill.lastRun}</p>
        </div>
        <div className="rounded-[18px] bg-[var(--loop-panel)] p-3">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--loop-ink-muted)]">
            Feedback
          </p>
          <p className="mt-2 text-sm font-medium text-[var(--loop-ink)]">
            {skill.feedbackItems} items
          </p>
        </div>
      </div>
    </motion.button>
  );
}

function Sparkline({ values }: { values: number[] }) {
  const points = buildSparkline(values);

  return (
    <svg viewBox="0 0 100 56" className="h-20 w-full overflow-visible">
      <path
        d="M0 52 H100"
        fill="none"
        stroke="rgba(255,255,255,0.18)"
        strokeDasharray="4 4"
        strokeWidth="1"
      />
      <polyline
        points={points}
        fill="none"
        stroke="var(--loop-gold)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {points.split(" ").map((point) => {
        const [cx, cy] = point.split(",");

        return <circle key={point} cx={cx} cy={cy} r="2.8" fill="#fff8ef" stroke="var(--loop-gold)" strokeWidth="2" />;
      })}
    </svg>
  );
}

export function SkillImprovementDashboard() {
  const [activeLane, setActiveLane] = useState<Lane>("all");
  const [selectedSkillId, setSelectedSkillId] = useState<string>(SKILL_DOCS[0].id);
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  const visibleSkills = SKILL_DOCS.filter((skill) => {
    const matchesLane = activeLane === "all" || skill.lane === activeLane;
    const haystack = `${skill.name} ${skill.owner} ${skill.summary}`.toLowerCase();
    const matchesQuery = deferredQuery.length === 0 || haystack.includes(deferredQuery);
    return matchesLane && matchesQuery;
  });

  const selectedSkill =
    visibleSkills.find((skill) => skill.id === selectedSkillId) ??
    visibleSkills[0] ??
    SKILL_DOCS[0];

  const scoreGap = Math.max(selectedSkill.targetScore - selectedSkill.score, 0);
  const selectedMeta = laneMeta(selectedSkill.lane);
  const sectionAverage = average(selectedSkill.sections.map((section) => section.score));

  return (
    <div style={DASHBOARD_THEME} className="min-h-screen p-3 sm:p-4 md:p-6">
      <div className="mx-auto flex min-h-[calc(100dvh-1.5rem)] max-w-[1600px] overflow-hidden rounded-[32px] border border-[var(--loop-border)] bg-[var(--loop-shell)] shadow-[var(--loop-shadow)] backdrop-blur">
        <aside className="hidden w-[290px] shrink-0 border-r border-[var(--loop-border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.58),rgba(255,248,238,0.86))] p-5 lg:flex lg:flex-col">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-[var(--loop-panel-dark)] text-white shadow-[0_14px_30px_rgba(18,32,51,0.22)]">
              <Brain size={26} weight="duotone" />
            </div>
            <div>
              <p className="font-display text-2xl text-[var(--loop-ink)]">{BRAND_NAME}</p>
              <p className="text-sm text-[var(--loop-ink-muted)]">Learning agent control room</p>
            </div>
          </div>

          <nav className="mt-8 space-y-2">
            {NAV_ITEMS.map(({ id, label, hint, icon: Icon }) => {
              const active = id === "docs";

              return (
                <button
                  key={id}
                  type="button"
                  className={cn(
                    "flex w-full items-center gap-3 rounded-[20px] border px-4 py-3 text-left transition",
                    active
                      ? "border-[var(--loop-border-strong)] bg-white/[0.85] shadow-[0_16px_30px_rgba(18,32,51,0.08)]"
                      : "border-transparent bg-transparent hover:border-[var(--loop-border)] hover:bg-white/60",
                  )}
                >
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-[14px]",
                      active ? "bg-[var(--loop-panel-dark)] text-white" : "bg-white/70 text-[var(--loop-ink)]",
                    )}
                  >
                    <Icon size={20} weight="duotone" />
                  </div>
                  <div>
                    <p className="font-medium text-[var(--loop-ink)]">{label}</p>
                    <p className="text-sm text-[var(--loop-ink-muted)]">{hint}</p>
                  </div>
                </button>
              );
            })}
          </nav>

          <div className="mt-auto rounded-[28px] bg-[linear-gradient(180deg,var(--loop-panel-dark),var(--loop-panel-dark-soft))] p-5 text-white shadow-[0_24px_40px_rgba(18,32,51,0.24)]">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-white/[0.55]">
                  Autopilot
                </p>
                <p className="mt-2 text-lg font-semibold">Reading evaluator deltas</p>
              </div>
              <Sparkle size={22} weight="fill" className="text-[var(--loop-gold)]" />
            </div>
            <div className="mt-5 space-y-4">
              <div>
                <div className="mb-2 flex items-center justify-between text-sm text-white/70">
                  <span>Feedback clustered</span>
                  <span>91%</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[91%] rounded-full bg-[linear-gradient(90deg,var(--loop-gold),#fff1c6)]" />
                </div>
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between text-sm text-white/70">
                  <span>Patch safety</span>
                  <span>84%</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[84%] rounded-full bg-[linear-gradient(90deg,#7fa2ff,#dce6ff)]" />
                </div>
              </div>
            </div>
            <div className="mt-5 rounded-[20px] border border-white/10 bg-white/[0.08] p-4">
              <p className="text-sm font-medium text-white">Next ship gate</p>
              <p className="mt-1 text-sm leading-6 text-white/[0.72]">
                `dashboard-style` can ship once verification guidance is promoted above token polish.
              </p>
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <header className="flex shrink-0 items-center justify-between border-b border-[var(--loop-border)] bg-white/[0.55] px-4 py-3 backdrop-blur md:px-6">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-[16px] border border-[var(--loop-border)] bg-white/70 text-[var(--loop-ink)] lg:hidden"
                aria-label="Open navigation"
              >
                <SidebarSimple size={22} weight="duotone" />
              </button>
              <div>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[var(--loop-ink-muted)]">
                  Learning agent
                </p>
                <p className="font-display text-[1.7rem] text-[var(--loop-ink)]">Scoring feedback to skill docs</p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <Button className="hidden h-11 rounded-full border border-[var(--loop-border)] bg-white/80 px-4 text-sm font-medium text-[var(--loop-ink)] shadow-[0_10px_24px_rgba(18,32,51,0.06)] sm:inline-flex">
                Open rubric
              </Button>
              <Button className="h-11 rounded-full bg-[var(--loop-panel-dark)] px-4 text-sm font-medium text-white shadow-[0_16px_26px_rgba(18,32,51,0.18)]">
                Ship candidate
              </Button>
              <button
                type="button"
                aria-label="Notifications"
                className="flex h-11 w-11 items-center justify-center rounded-[16px] border border-[var(--loop-border)] bg-white/80 text-[var(--loop-ink)] shadow-[0_10px_24px_rgba(18,32,51,0.06)] transition hover:-translate-y-0.5 hover:bg-white"
              >
                <BellSimpleRinging size={20} weight="duotone" />
              </button>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-4 md:p-6 xl:p-7">
            <div className="flex flex-col gap-5">
              <section className="grid gap-5 xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.9fr)]">
                <motion.article
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28 }}
                  className="overflow-hidden rounded-[30px] border border-[var(--loop-border)] bg-[linear-gradient(135deg,var(--loop-panel-dark),#23365a)] p-6 text-white shadow-[0_24px_56px_rgba(18,32,51,0.18)] md:p-7"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="max-w-2xl">
                      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-white/[0.55]">
                        Feedback to patch loop
                      </p>
                      <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight sm:text-[3.35rem]">
                        Score feedback becomes targeted skill revisions.
                      </h1>
                      <p className="mt-4 max-w-2xl text-sm leading-7 text-white/[0.74] sm:text-base">
                        The learning agent reads evaluator packets, collapses them into recurring
                        failure patterns, edits the skill document, and stages the next run without
                        disturbing instructions that already score well.
                      </p>
                    </div>
                    <div className="rounded-[22px] border border-white/10 bg-white/[0.08] px-4 py-3 text-sm text-white/[0.75]">
                      <p className="font-medium text-white">Current focus</p>
                      <p className="mt-1">{selectedSkill.name}</p>
                      <p className="mt-3 text-white/[0.55]">{selectedSkill.branch}</p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button className="h-11 rounded-full bg-white px-5 text-sm font-semibold text-[var(--loop-panel-dark)] shadow-[0_16px_26px_rgba(0,0,0,0.14)]">
                      Review branch
                    </Button>
                    <Button className="h-11 rounded-full border border-white/[0.14] bg-white/[0.08] px-5 text-sm font-medium text-white">
                      Inspect evaluator notes
                    </Button>
                  </div>

                  <div className="mt-8 grid gap-4 md:grid-cols-3">
                    <div className="rounded-[24px] border border-white/10 bg-white/[0.08] p-4">
                      <p className="text-[0.68rem] uppercase tracking-[0.24em] text-white/50">Score gap</p>
                      <p className="mt-3 text-3xl font-semibold">{formatScore(scoreGap)}</p>
                      <p className="mt-2 text-sm text-white/[0.68]">points still needed to clear the shipping bar</p>
                    </div>
                    <div className="rounded-[24px] border border-white/10 bg-white/[0.08] p-4">
                      <p className="text-[0.68rem] uppercase tracking-[0.24em] text-white/50">Feedback promoted</p>
                      <p className="mt-3 text-3xl font-semibold">{selectedSkill.feedbackItems}</p>
                      <p className="mt-2 text-sm text-white/[0.68]">packet items tied directly to this revision pass</p>
                    </div>
                    <div className="rounded-[24px] border border-white/10 bg-white/[0.08] p-4">
                      <p className="text-[0.68rem] uppercase tracking-[0.24em] text-white/50">Section average</p>
                      <p className="mt-3 text-3xl font-semibold">{formatScore(sectionAverage)}</p>
                      <p className="mt-2 text-sm text-white/[0.68]">coverage quality across the document sections under edit</p>
                    </div>
                  </div>
                </motion.article>

                <div className="grid gap-5">
                  <SectionCard
                    eyebrow="Selected skill"
                    title={selectedSkill.name}
                    description={selectedSkill.summary}
                    className="bg-[rgba(255,255,255,0.74)]"
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className={cn(
                          "rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]",
                          selectedMeta.badge,
                        )}
                      >
                        {selectedMeta.label}
                      </span>
                      <span className="rounded-full border border-[var(--loop-border)] bg-white/70 px-3 py-1 text-xs font-medium text-[var(--loop-ink-muted)]">
                        {selectedSkill.docVersion}
                      </span>
                      <span className="rounded-full border border-[var(--loop-border)] bg-white/70 px-3 py-1 text-xs font-medium text-[var(--loop-ink-muted)]">
                        {selectedSkill.shipWindow}
                      </span>
                    </div>
                    <div className="mt-5 rounded-[24px] bg-[linear-gradient(180deg,var(--loop-panel-dark),#223456)] p-5 text-white">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-[0.68rem] uppercase tracking-[0.24em] text-white/[0.55]">
                            Score heartbeat
                          </p>
                          <p className="mt-2 text-3xl font-semibold">{formatScore(selectedSkill.score)}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[0.68rem] uppercase tracking-[0.24em] text-white/[0.55]">Delta</p>
                          <p className="mt-2 text-xl font-semibold text-[var(--loop-gold)]">
                            {formatLift(selectedSkill.delta)}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Sparkline values={selectedSkill.scoreHistory} />
                      </div>
                    </div>
                    <div className="mt-5 space-y-3">
                      {selectedSkill.focus.map((item) => (
                        <div
                          key={item}
                          className="flex items-start gap-3 rounded-[18px] border border-[var(--loop-border)] bg-white/70 p-3"
                        >
                          <Target size={18} weight="duotone" className="mt-0.5 text-[var(--loop-blue)]" />
                          <p className="text-sm leading-6 text-[var(--loop-ink-muted)]">{item}</p>
                        </div>
                      ))}
                    </div>
                  </SectionCard>

                  <SectionCard
                    eyebrow="Ship gates"
                    title="Autopilot release checks"
                    description="The loop only advances when the patch is narrow, evidence-linked, and measurably better on the next run."
                    className="bg-[rgba(255,255,255,0.72)]"
                  >
                    <div className="space-y-3">
                      {[
                        {
                          label: "Evaluator evidence linked to every edit",
                          status: "pass",
                          icon: CheckCircle,
                        },
                        {
                          label: "Unaffected instructions preserved",
                          status: selectedSkill.lane === "triage" ? "warn" : "pass",
                          icon: selectedSkill.lane === "triage" ? WarningDiamond : CheckCircle,
                        },
                        {
                          label: "Score target cleared in staging",
                          status: selectedSkill.lane === "ready" || selectedSkill.lane === "shipped" ? "pass" : "warn",
                          icon:
                            selectedSkill.lane === "ready" || selectedSkill.lane === "shipped"
                              ? CheckCircle
                              : ClockCountdown,
                        },
                      ].map(({ label, status, icon: Icon }) => (
                        <div
                          key={label}
                          className="flex items-center justify-between gap-3 rounded-[20px] border border-[var(--loop-border)] bg-white/70 px-4 py-3"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={cn(
                                "flex h-10 w-10 items-center justify-center rounded-[14px]",
                                status === "pass"
                                  ? "bg-[var(--loop-mint)] text-[var(--loop-teal)]"
                                  : "bg-[var(--loop-rose)] text-[var(--loop-coral)]",
                              )}
                            >
                              <Icon size={20} weight="duotone" />
                            </div>
                            <p className="text-sm font-medium text-[var(--loop-ink)]">{label}</p>
                          </div>
                          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--loop-ink-muted)]">
                            {status === "pass" ? "Ready" : "Blocked"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </SectionCard>
                </div>
              </section>

              <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {METRICS.map((metric) => (
                  <MetricCard key={metric.label} {...metric} />
                ))}
              </section>

              <section className="grid gap-5 xl:grid-cols-[minmax(0,1.1fr)_minmax(340px,0.9fr)]">
                <SectionCard
                  eyebrow="Revision queue"
                  title="Skill documents under active learning"
                  description="Filter the current batch by lane, then open the document that needs the next edit pass."
                  action={
                    <div className="relative w-full max-w-xs">
                      <MagnifyingGlass
                        size={18}
                        weight="duotone"
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--loop-ink-muted)]"
                      />
                      <Input
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Search skill docs"
                        className="h-11 w-full rounded-full border border-[var(--loop-border)] bg-white/75 pl-11 pr-4 text-sm text-[var(--loop-ink)] outline-none placeholder:text-[var(--loop-ink-muted)]"
                      />
                    </div>
                  }
                >
                  <div className="mb-4 flex flex-wrap gap-2">
                    {LANE_OPTIONS.map((option) => {
                      const count =
                        option.id === "all"
                          ? SKILL_DOCS.length
                          : SKILL_DOCS.filter((skill) => skill.lane === option.id).length;
                      const selected = activeLane === option.id;

                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => {
                            startTransition(() => {
                              setActiveLane(option.id);
                            });
                          }}
                          className={cn(
                            "rounded-full border px-4 py-2 text-sm font-medium transition",
                            selected
                              ? "border-[var(--loop-panel-dark)] bg-[var(--loop-panel-dark)] text-white"
                              : "border-[var(--loop-border)] bg-white/75 text-[var(--loop-ink)] hover:bg-white",
                          )}
                        >
                          {option.label} <span className="text-[0.82em] opacity-70">{count}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="grid gap-4">
                    {visibleSkills.length > 0 ? (
                      visibleSkills.map((skill) => (
                        <QueueCard
                          key={skill.id}
                          skill={skill}
                          selected={skill.id === selectedSkill.id}
                          onSelect={() => {
                            startTransition(() => {
                              setSelectedSkillId(skill.id);
                            });
                          }}
                        />
                      ))
                    ) : (
                      <div className="rounded-[24px] border border-dashed border-[var(--loop-border-strong)] bg-white/60 p-8 text-center">
                        <p className="text-base font-semibold text-[var(--loop-ink)]">No matching skill docs</p>
                        <p className="mt-2 text-sm text-[var(--loop-ink-muted)]">
                          Clear the search or switch lanes to reopen the current learning batch.
                        </p>
                      </div>
                    )}
                  </div>
                </SectionCard>

                <SectionCard
                  eyebrow="Focused revision"
                  title="Patch plan and evaluator evidence"
                  description="Each document keeps the failing behavior, the narrow patch, and the next ship gate in the same view."
                >
                  <div className="rounded-[24px] border border-[var(--loop-border)] bg-[var(--loop-panel-strong)] p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-[var(--loop-ink)]">{selectedSkill.name}</p>
                        <p className="mt-1 text-sm text-[var(--loop-ink-muted)]">
                          Owned by {selectedSkill.owner} · {selectedSkill.branch}
                        </p>
                      </div>
                      <span
                        className={cn(
                          "rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]",
                          selectedMeta.badge,
                        )}
                      >
                        {selectedMeta.label}
                      </span>
                    </div>

                    <div className="mt-5 space-y-4">
                      {selectedSkill.sections.map((section) => (
                        <div key={section.label}>
                          <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                            <span className="font-medium text-[var(--loop-ink)]">{section.label}</span>
                            <span className="text-[var(--loop-ink-muted)]">{formatScore(section.score)}</span>
                          </div>
                          <div className="h-2.5 overflow-hidden rounded-full bg-[rgba(18,32,51,0.08)]">
                            <div
                              className="h-full rounded-full bg-[linear-gradient(90deg,var(--loop-coral),var(--loop-gold),var(--loop-blue))]"
                              style={{ width: `${section.score}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3">
                    {selectedSkill.revisionPlan.map((change, index) => (
                      <div
                        key={`${change.before}-${index}`}
                        className="grid gap-3 rounded-[22px] border border-[var(--loop-border)] bg-white/[0.72] p-4"
                      >
                        <div className="rounded-[18px] border border-[var(--loop-border)] bg-[rgba(251,225,218,0.42)] p-3">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--loop-coral)]">
                            Before
                          </p>
                          <p className="mt-2 text-sm leading-6 text-[var(--loop-ink-muted)]">{change.before}</p>
                        </div>
                        <div className="rounded-[18px] border border-[var(--loop-border)] bg-[rgba(223,243,231,0.52)] p-3">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--loop-teal)]">
                            After
                          </p>
                          <p className="mt-2 text-sm leading-6 text-[var(--loop-ink-muted)]">{change.after}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-[24px] border border-[var(--loop-border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(255,248,239,0.76))] p-5">
                    <p className="text-sm font-semibold text-[var(--loop-ink)]">Latest evaluator notes</p>
                    <div className="mt-4 space-y-3">
                      {selectedSkill.evaluatorNotes.map((note) => (
                        <div
                          key={note.suite}
                          className="rounded-[18px] border border-[var(--loop-border)] bg-white/80 p-4"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                              <p className="font-medium text-[var(--loop-ink)]">{note.suite}</p>
                              <p className="mt-1 text-sm text-[var(--loop-ink-muted)]">{note.note}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-semibold text-[var(--loop-ink)]">{formatScore(note.score)}</p>
                              <p
                                className={cn(
                                  "text-xs font-semibold uppercase tracking-[0.18em]",
                                  note.delta >= 0 ? "text-[var(--loop-teal)]" : "text-[var(--loop-coral)]",
                                )}
                              >
                                {note.delta >= 0 ? "+" : ""}
                                {note.delta} this run
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </SectionCard>
              </section>

              <section className="grid gap-5 xl:grid-cols-[minmax(320px,0.9fr)_minmax(0,1.1fr)]">
                <SectionCard
                  eyebrow="Signals"
                  title="What the scorers are flagging most"
                  description="Recurring evaluator comments are collapsed into reusable buckets so the patch plan stays specific instead of drifting into broad rewrites."
                >
                  <div className="space-y-4">
                    {aggregateBuckets.map((bucket, index) => {
                      const width = (bucket.count / aggregateBuckets[0].count) * 100;

                      return (
                        <div key={bucket.label}>
                          <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                            <span className="font-medium text-[var(--loop-ink)]">{bucket.label}</span>
                            <span className="text-[var(--loop-ink-muted)]">{bucket.count}</span>
                          </div>
                          <div className="h-3 overflow-hidden rounded-full bg-[rgba(18,32,51,0.08)]">
                            <div
                              className={cn(
                                "h-full rounded-full",
                                index % 3 === 0
                                  ? "bg-[var(--loop-coral)]"
                                  : index % 3 === 1
                                    ? "bg-[var(--loop-gold)]"
                                    : "bg-[var(--loop-blue)]",
                              )}
                              style={{ width: `${width}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </SectionCard>

                <SectionCard
                  eyebrow="Release lane"
                  title="Recent ships and staged revisions"
                  description="Shipping only happens when the next scoring pass confirms the patch fixed the failing behavior without pulling good instructions backward."
                >
                  <div className="overflow-hidden rounded-[24px] border border-[var(--loop-border)] bg-white/[0.72]">
                    <div className="grid grid-cols-[1.2fr_0.8fr_0.8fr] gap-4 border-b border-[var(--loop-border)] px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--loop-ink-muted)] md:grid-cols-[1fr_0.7fr_0.7fr_1.1fr]">
                      <span>Skill</span>
                      <span>Status</span>
                      <span>Lift</span>
                      <span className="hidden md:block">Ship note</span>
                    </div>
                    <div>
                      {RELEASES.map((release) => (
                        <div
                          key={`${release.skill}-${release.window}`}
                          className="grid grid-cols-[1.2fr_0.8fr_0.8fr] gap-4 border-b border-[var(--loop-border)] px-5 py-4 last:border-b-0 md:grid-cols-[1fr_0.7fr_0.7fr_1.1fr]"
                        >
                          <div>
                            <p className="font-medium text-[var(--loop-ink)]">{release.skill}</p>
                            <p className="mt-1 text-sm text-[var(--loop-ink-muted)]">{release.window}</p>
                          </div>
                          <div>
                            <span
                              className={cn(
                                "inline-flex rounded-full px-3 py-1 text-xs font-semibold",
                                releaseTone(release.status),
                              )}
                            >
                              {release.status}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-[var(--loop-ink)]">{formatLift(release.lift)}</p>
                          </div>
                          <div className="hidden md:block">
                            <p className="text-sm leading-6 text-[var(--loop-ink-muted)]">{release.note}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </SectionCard>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
