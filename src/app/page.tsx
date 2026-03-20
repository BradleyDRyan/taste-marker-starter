"use client";

import { motion } from "framer-motion";
import { startTransition, useDeferredValue, useState } from "react";
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

type SkillKey = "prompting" | "tooling" | "escalation";
type ExperimentStatus = "accepted" | "watching" | "rejected";
type StageStatus = "complete" | "active" | "queued";
type AccentTone = "sky" | "emerald" | "amber";

type Experiment = {
  id: string;
  hypothesis: string;
  failureMode: string;
  evidence: string;
  lesson: string;
  impact: string;
  status: ExperimentStatus;
};

type SynthesisCluster = {
  label: string;
  share: number;
  confidence: string;
  note: string;
};

type PatchSection = {
  label: string;
  tone: AccentTone;
  lines: string[];
};

type TraceStep = {
  label: string;
  detail: string;
  duration: string;
  status: StageStatus;
};

type Safeguard = {
  title: string;
  detail: string;
};

type Reviewer = {
  name: string;
  role: string;
  initials: string;
};

type SkillPayload = {
  label: string;
  strapline: string;
  summary: string;
  score: number;
  delta: string;
  experimentsRead: number;
  acceptedSignals: number;
  regressionsBlocked: number;
  confidence: number;
  cycleTime: string;
  syncedAt: string;
  model: string;
  activeFile: string;
  focus: string[];
  accent: AccentTone;
  topLine: {
    title: string;
    detail: string;
    metric: string;
  };
  experiments: Experiment[];
  synthesis: SynthesisCluster[];
  patch: {
    title: string;
    detail: string;
    sections: PatchSection[];
    before: string[];
    after: string[];
  };
  trace: TraceStep[];
  safeguards: Safeguard[];
  reviewers: Reviewer[];
};

const skillData: Record<SkillKey, SkillPayload> = {
  prompting: {
    label: "Prompting",
    strapline: "Tightens instruction structure when experiments show agents drifting before they ground themselves.",
    summary:
      "This learning agent reads experiment history, clusters repeated prompt failures, and rewrites the skill file so the next run starts with sharper guardrails instead of vague advice.",
    score: 94,
    delta: "+12%",
    experimentsRead: 38,
    acceptedSignals: 9,
    regressionsBlocked: 4,
    confidence: 97,
    cycleTime: "2m 14s",
    syncedAt: "Synced 6 minutes ago",
    model: "Claude Sonnet 4.6 / high reasoning",
    activeFile: "skills/agent-prompting/SKILL.md",
    focus: ["Entry-point inspection", "Constraint ordering", "Example relevance"],
    accent: "sky",
    topLine: {
      title: "Entry-point misses became an explicit instruction, not a reviewer note.",
      detail:
        "Seven failed runs skipped repo inspection and proposed UI edits before reading the app structure. The patch now forces the agent to identify the real entry point before planning changes.",
      metric: "31% of failures",
    },
    experiments: [
      {
        id: "EXP-184",
        hypothesis: "Agents need a stronger repo-grounding step before they suggest UI work.",
        failureMode: "Runs jumped into component design before locating the live page entry.",
        evidence: "7 of 12 failed front-end trials skipped the main route or inferred it incorrectly.",
        lesson: "Convert 'inspect first' from a suggestion into an explicit required first action.",
        impact: "Reduced premature edits across the next three benchmark tasks.",
        status: "accepted",
      },
      {
        id: "EXP-177",
        hypothesis: "Generic examples are causing overly broad patches that do not match the task scope.",
        failureMode: "Responses copied abstract guidance into real work without translating it to the local file.",
        evidence: "Median patch size was 28% larger when examples were not tied to a concrete repo pattern.",
        lesson: "Examples now need to mirror the observed failure and name the exact file responsibility.",
        impact: "Patch precision improved while review time dropped.",
        status: "accepted",
      },
      {
        id: "EXP-169",
        hypothesis: "Long planning text is hiding the actual implementation sequence.",
        failureMode: "Agents narrated intent but delayed the file edit until late in the turn.",
        evidence: "Users needed follow-ups in 4 of 9 long-form runs to get the concrete change.",
        lesson: "Keep planning short and transition to edits once blocking context is collected.",
        impact: "Still monitored because longer investigative tasks may need exceptions.",
        status: "watching",
      },
    ],
    synthesis: [
      {
        label: "Skipped grounding",
        share: 31,
        confidence: "High confidence",
        note: "Front-end tasks failed most often when the app entry point was assumed.",
      },
      {
        label: "Loose examples",
        share: 24,
        confidence: "High confidence",
        note: "Template-like examples encouraged style transfer instead of repo-fit guidance.",
      },
      {
        label: "Planning drag",
        share: 18,
        confidence: "Medium confidence",
        note: "Verbose reasoning correlated with slower execution but not every failure.",
      },
    ],
    patch: {
      title: "Skill file now encodes the repeated prompt failure directly.",
      detail:
        "The patch moves repo inspection to the top of the workflow and narrows example usage so future runs anchor guidance to observed evidence.",
      sections: [
        {
          label: "Added requirement",
          tone: "sky",
          lines: [
            "Inspect the existing repo to identify the active UI entry point before drafting edits.",
            "State the located entry file in the first progress update so the next action is grounded.",
          ],
        },
        {
          label: "Rewritten guidance",
          tone: "emerald",
          lines: [
            "Turn experiment patterns into concrete guardrails instead of abstract quality advice.",
            "Keep examples narrow and structurally similar to the observed failure mode.",
          ],
        },
        {
          label: "Trimmed behavior",
          tone: "amber",
          lines: [
            "Removed broad 'brainstorm first' wording that encouraged long planning detours.",
          ],
        },
      ],
      before: [
        "- Review prior experiments and propose improved guidance.",
        "- Use examples when they seem helpful.",
        "- Offer a plan before making changes.",
      ],
      after: [
        "- Inspect the current repo and identify the live UI entry point before planning.",
        "- Translate repeated failures into explicit, testable instructions in the skill file.",
        "- Keep examples tightly scoped to the observed experiment pattern and target file.",
      ],
    },
    trace: [
      {
        label: "Read experiment ledger",
        detail: "Parsed failed and successful trials, then grouped them by repeated prompt failure.",
        duration: "34s",
        status: "complete",
      },
      {
        label: "Synthesize instruction delta",
        detail: "Turned the top failure cluster into new required wording and clearer sequencing.",
        duration: "51s",
        status: "active",
      },
      {
        label: "Prepare skill-file patch",
        detail: "Formatting the final rewrite so reviewers can merge it with minimal cleanup.",
        duration: "49s",
        status: "queued",
      },
    ],
    safeguards: [
      {
        title: "Evidence-gated edits",
        detail: "New guidance is only promoted when the same issue appears across multiple experiments.",
      },
      {
        title: "No generic inflation",
        detail: "The agent trims vague quality language unless it maps to a measurable failure.",
      },
      {
        title: "Regression memory",
        detail: "Archived mistakes stay visible so future rewrites do not remove hard-won constraints.",
      },
    ],
    reviewers: [
      { name: "Kira Sol", role: "Prompt systems", initials: "KS" },
      { name: "Dane Wu", role: "Benchmark analysis", initials: "DW" },
      { name: "Nia Cross", role: "Skill governance", initials: "NC" },
    ],
  },
  tooling: {
    label: "Tooling",
    strapline: "Improves when to search, inspect, patch, and verify so the agent uses the workspace with less waste.",
    summary:
      "Here the learning loop studies command history and patch outcomes, then sharpens tool-use instructions so the agent reaches the right file faster and avoids expensive or noisy commands.",
    score: 91,
    delta: "+9%",
    experimentsRead: 27,
    acceptedSignals: 7,
    regressionsBlocked: 3,
    confidence: 95,
    cycleTime: "1m 52s",
    syncedAt: "Synced 11 minutes ago",
    model: "Claude Sonnet 4.6 / high reasoning",
    activeFile: "skills/agent-tooling/SKILL.md",
    focus: ["Parallel reads", "Patch discipline", "Verification scope"],
    accent: "emerald",
    topLine: {
      title: "Search and read paths were tightened before touching the filesystem.",
      detail:
        "Experiment history showed agents reaching for broad commands or redundant file reads. The skill file now prioritizes targeted inspection, especially for entry files and adjacent dependencies.",
      metric: "22% faster context gathering",
    },
    experiments: [
      {
        id: "EXP-143",
        hypothesis: "Parallel file inspection will reduce idle time without increasing confusion.",
        failureMode: "Sequential reads delayed obvious context collection during UI tasks.",
        evidence: "Runs using targeted parallel reads reached the first edit 19 seconds faster on median.",
        lesson: "Promote grouped file inspection for page, layout, globals, and nearby components.",
        impact: "Adopted as the default read pattern for small Next.js surfaces.",
        status: "accepted",
      },
      {
        id: "EXP-132",
        hypothesis: "Patch discipline should be explicit when a workspace already contains user changes.",
        failureMode: "One benchmark reverted unrelated edits while cleaning up a target file.",
        evidence: "The failure only appeared once, but severity justified stronger wording.",
        lesson: "Never revert unowned changes and read carefully before editing touched files.",
        impact: "Conflict rate dropped to zero in the next validation batch.",
        status: "accepted",
      },
      {
        id: "EXP-127",
        hypothesis: "Lightweight verification should rely on source inspection when runtime checks are restricted.",
        failureMode: "Agents reached for build commands even when the environment explicitly prohibited them.",
        evidence: "3 of 8 failed trials ignored local constraints and attempted disallowed verification.",
        lesson: "Encode verification boundaries directly beside the tooling instructions.",
        impact: "Marked for continued monitoring until the behavior stays stable.",
        status: "watching",
      },
    ],
    synthesis: [
      {
        label: "Redundant reads",
        share: 28,
        confidence: "High confidence",
        note: "Context gathering improved when the first read batch was intentionally scoped.",
      },
      {
        label: "Unsafe cleanup",
        share: 17,
        confidence: "Medium confidence",
        note: "A single destructive recovery pattern justified a permanent guardrail.",
      },
      {
        label: "Over-verification",
        share: 16,
        confidence: "Medium confidence",
        note: "Some agents still defaulted to builds when source inspection was enough.",
      },
    ],
    patch: {
      title: "Tooling guidance now respects the workspace before it reaches for commands.",
      detail:
        "The rewrite prioritizes ripgrep-based discovery, parallel read batches, and source-only verification when the environment says builds or previews are off-limits.",
      sections: [
        {
          label: "Added workflow",
          tone: "emerald",
          lines: [
            "Use targeted parallel reads for entry points, layout, styles, and directly related components.",
            "Prefer ripgrep for discovery and keep command scope narrow enough to stay readable.",
          ],
        },
        {
          label: "Added safeguard",
          tone: "sky",
          lines: [
            "Respect verification boundaries from the task prompt and do not substitute a build for source inspection.",
          ],
        },
        {
          label: "Removed ambiguity",
          tone: "amber",
          lines: [
            "Dropped generic 'verify thoroughly' wording that encouraged disallowed runtime checks.",
          ],
        },
      ],
      before: [
        "- Inspect the repo and verify your changes.",
        "- Use commands as needed to gather context.",
        "- Clean up files if necessary.",
      ],
      after: [
        "- Use ripgrep and scoped parallel reads to inspect the live entry files before editing.",
        "- Verify within the explicit task boundaries; if builds are disallowed, validate through source inspection.",
        "- Never revert unrelated changes while cleaning up a file you did not fully own.",
      ],
    },
    trace: [
      {
        label: "Mine tool traces",
        detail: "Ranked command sequences by speed, accuracy, and conflict rate across prior runs.",
        duration: "29s",
        status: "complete",
      },
      {
        label: "Rewrite tool policy",
        detail: "Folded successful patterns into sharper discovery and verification instructions.",
        duration: "44s",
        status: "active",
      },
      {
        label: "Package review note",
        detail: "Preparing a summary that explains why broad verification language was removed.",
        duration: "39s",
        status: "queued",
      },
    ],
    safeguards: [
      {
        title: "Readable command traces",
        detail: "The skill prefers small, inspectable commands so reviewers can follow the path to each edit.",
      },
      {
        title: "Patch-only writes",
        detail: "Manual source edits route through patch application so the change set stays explicit.",
      },
      {
        title: "Constraint-aware verification",
        detail: "Validation strategy is chosen from task rules first, not from habit.",
      },
    ],
    reviewers: [
      { name: "Ivo Hart", role: "Runtime tooling", initials: "IH" },
      { name: "Mara Sloan", role: "Workspace safety", initials: "MS" },
      { name: "Tess Lane", role: "UI task benchmarks", initials: "TL" },
    ],
  },
  escalation: {
    label: "Escalation",
    strapline: "Learns when to ask, when to proceed, and how to keep collaboration crisp when the task has hidden risk.",
    summary:
      "This lane looks for costly hesitations and missed escalation points, then updates the skill file so the agent knows when to challenge assumptions, when to keep moving, and when to stop for user input.",
    score: 89,
    delta: "+7%",
    experimentsRead: 21,
    acceptedSignals: 5,
    regressionsBlocked: 2,
    confidence: 93,
    cycleTime: "1m 37s",
    syncedAt: "Synced 19 minutes ago",
    model: "Claude Sonnet 4.6 / high reasoning",
    activeFile: "skills/agent-escalation/SKILL.md",
    focus: ["Conflict handling", "Assumption checks", "User-facing brevity"],
    accent: "amber",
    topLine: {
      title: "Escalation is now tied to concrete blockers instead of vague caution.",
      detail:
        "Previous skill wording overused soft warnings and under-specified real stop conditions. The new patch distinguishes between resolvable ambiguity and direct conflicts with user changes.",
      metric: "2 blocker classes clarified",
    },
    experiments: [
      {
        id: "EXP-118",
        hypothesis: "Agents need clearer stop conditions when they encounter unexpected user edits.",
        failureMode: "One run silently overwrote a conflicting local change instead of pausing.",
        evidence: "The conflict occurred in a recently touched file with overlapping ownership.",
        lesson: "Stop and ask when unexpected edits directly conflict with the requested task.",
        impact: "Escalation language is now precise about file-level conflicts.",
        status: "accepted",
      },
      {
        id: "EXP-109",
        hypothesis: "Challenge weak assumptions early, but keep the wording brief.",
        failureMode: "Long cautionary replies slowed straightforward implementation tasks.",
        evidence: "User satisfaction fell when warnings were correct but bloated.",
        lesson: "Pair concise challenge language with immediate proposed action.",
        impact: "The updated skill preserves rigor without turning into a lecture.",
        status: "accepted",
      },
      {
        id: "EXP-101",
        hypothesis: "Exploratory tasks may need a longer plan before editing.",
        failureMode: "One agent edited too early on a multi-system migration request.",
        evidence: "The task needed cross-repo discovery that was not available from the first read.",
        lesson: "Retain a narrow exception for tasks that are clearly planning-first.",
        impact: "This stays in the watch queue because the context varies a lot.",
        status: "watching",
      },
    ],
    synthesis: [
      {
        label: "Missed conflict stop",
        share: 19,
        confidence: "High confidence",
        note: "Rare but severe, so it earned stronger skill-file language.",
      },
      {
        label: "Overlong caution",
        share: 18,
        confidence: "High confidence",
        note: "Correct objections performed better when paired with a direct next step.",
      },
      {
        label: "Early edit exceptions",
        share: 12,
        confidence: "Low confidence",
        note: "A smaller cluster suggested retaining a planning-first carveout.",
      },
    ],
    patch: {
      title: "Escalation guidance now separates true blockers from routine ambiguity.",
      detail:
        "The updated skill file tells the agent to keep moving through normal uncertainty, but pause when user edits conflict or when the requested scope becomes unsafe to infer.",
      sections: [
        {
          label: "Added stop condition",
          tone: "amber",
          lines: [
            "If unexpected local changes directly conflict with your target edit, stop and ask how to proceed.",
          ],
        },
        {
          label: "Rewritten collaboration rule",
          tone: "sky",
          lines: [
            "Challenge technical assumptions briefly and attach a concrete next action or alternative.",
          ],
        },
        {
          label: "Retained exception",
          tone: "emerald",
          lines: [
            "Planning-first behavior remains allowed for clearly exploratory or architecture-heavy tasks.",
          ],
        },
      ],
      before: [
        "- Escalate when a task feels risky or unclear.",
        "- Explain your concerns to the user.",
        "- Make a plan when appropriate.",
      ],
      after: [
        "- Keep moving through routine ambiguity; escalate only on direct conflicts, unsafe assumptions, or blocked access.",
        "- When you challenge a technical premise, do it briefly and propose the next action immediately.",
        "- Reserve long planning for requests that are explicitly investigative or architecture-first.",
      ],
    },
    trace: [
      {
        label: "Tag escalation failures",
        detail: "Split prior runs into silent conflict errors, soft-warning bloat, and valid planning exceptions.",
        duration: "27s",
        status: "complete",
      },
      {
        label: "Calibrate thresholds",
        detail: "Rewrote escalation rules so normal ambiguity does not trigger unnecessary pauses.",
        duration: "41s",
        status: "active",
      },
      {
        label: "Finalize reviewer note",
        detail: "Packaging examples that show the new stop conditions in practice.",
        duration: "29s",
        status: "queued",
      },
    ],
    safeguards: [
      {
        title: "Conflict-first escalation",
        detail: "Unexpected edits only trigger a pause when they materially overlap the requested change.",
      },
      {
        title: "Short challenge format",
        detail: "User-facing objections are constrained to the critical point and a proposed next step.",
      },
      {
        title: "Exception memory",
        detail: "The skill keeps an explicit carveout for planning-heavy tasks to avoid over-correcting.",
      },
    ],
    reviewers: [
      { name: "Rin Vale", role: "Collaboration design", initials: "RV" },
      { name: "Pavel Reed", role: "Agent safety", initials: "PR" },
      { name: "Uma Stone", role: "Evaluation ops", initials: "US" },
    ],
  },
};

const skillOrder: SkillKey[] = ["prompting", "tooling", "escalation"];

const statusStyles: Record<ExperimentStatus, string> = {
  accepted: "border-emerald-300/30 bg-emerald-300/15 text-emerald-100",
  watching: "border-amber-300/30 bg-amber-300/15 text-amber-100",
  rejected: "border-rose-300/30 bg-rose-300/15 text-rose-100",
};

const accentStyles: Record<
  AccentTone,
  {
    halo: string;
    badge: string;
    bar: string;
    glow: string;
    ring: string;
    activeCard: string;
  }
> = {
  sky: {
    halo: "from-sky-300/24 via-cyan-200/18 to-transparent",
    badge: "border-sky-300/30 bg-sky-300/12 text-sky-100",
    bar: "from-sky-300 via-cyan-200 to-blue-200",
    glow: "0 0 32px rgba(125, 211, 252, 0.22)",
    ring: "rgba(140,224,255,0.96)",
    activeCard: "border-sky-200/35 bg-sky-300/[0.12] shadow-[0_14px_34px_rgba(125,211,252,0.18)]",
  },
  emerald: {
    halo: "from-emerald-300/24 via-teal-200/18 to-transparent",
    badge: "border-emerald-300/30 bg-emerald-300/12 text-emerald-100",
    bar: "from-emerald-300 via-teal-200 to-cyan-200",
    glow: "0 0 32px rgba(110, 231, 183, 0.22)",
    ring: "rgba(110,231,183,0.96)",
    activeCard: "border-emerald-200/35 bg-emerald-300/[0.12] shadow-[0_14px_34px_rgba(110,231,183,0.18)]",
  },
  amber: {
    halo: "from-amber-200/24 via-orange-200/18 to-transparent",
    badge: "border-amber-300/30 bg-amber-300/12 text-amber-100",
    bar: "from-amber-200 via-orange-200 to-yellow-100",
    glow: "0 0 32px rgba(251, 191, 36, 0.2)",
    ring: "rgba(251,191,36,0.96)",
    activeCard: "border-amber-200/35 bg-amber-300/[0.12] shadow-[0_14px_34px_rgba(251,191,36,0.18)]",
  },
};

const traceStyles: Record<StageStatus, string> = {
  complete: "bg-emerald-300",
  active: "bg-sky-300",
  queued: "bg-white/30",
};

export default function Page() {
  const [selectedSkill, setSelectedSkill] = useState<SkillKey>("prompting");
  const deferredSkill = useDeferredValue(selectedSkill);
  const payload = skillData[deferredSkill];
  const accent = accentStyles[payload.accent];
  const selectedAccent = accentStyles[skillData[selectedSkill].accent];
  const isSwitching = deferredSkill !== selectedSkill;
  const strongestCluster = payload.synthesis[0];

  return (
    <main className="relative min-h-screen overflow-hidden px-4 pb-10 pt-6 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 fine-grid opacity-70" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,_rgba(137,216,255,0.18),_transparent_58%)]" />
      <div className="pointer-events-none absolute left-[-7rem] top-40 h-80 w-80 rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.1),_transparent_68%)] blur-3xl" />
      <div className="pointer-events-none absolute right-[-10rem] top-28 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,_rgba(245,201,119,0.16),_transparent_65%)] blur-3xl" />

      <div className="relative mx-auto flex max-w-7xl flex-col gap-6">
        <motion.header
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="surface-card-strong overflow-hidden rounded-[34px] p-5 sm:p-7"
        >
          <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accent.halo}`} />

          <div className="relative grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-white/12 bg-white/[0.06] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-100/90">
                  Learning Agent
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-[color:var(--color-muted)]">
                  {payload.model}
                </span>
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-medium ${accent.badge}`}
                >
                  {payload.activeFile}
                </span>
              </div>

              <div className="max-w-3xl">
                <h1 className="text-4xl leading-none tracking-[-0.05em] text-white sm:text-5xl lg:text-[3.6rem]">
                  Experiment history in.
                  <br />
                  Better skill files out.
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-6 text-[color:var(--color-muted)] sm:text-base">
                  {payload.summary}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {payload.focus.map((item) => (
                  <div
                    key={item}
                    className="rounded-[22px] border border-white/10 bg-white/[0.05] px-4 py-3"
                  >
                    <p className="text-[11px] uppercase tracking-[0.24em] text-[color:var(--color-muted)]">
                      Current focus
                    </p>
                    <p className="mt-2 text-sm font-medium text-white">{item}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                {skillOrder.map((key) => {
                  const item = skillData[key];
                  const active = key === selectedSkill;

                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => {
                        startTransition(() => setSelectedSkill(key));
                      }}
                      aria-pressed={active}
                      className={`rounded-[22px] border px-4 py-3 text-left transition duration-200 ${
                        active
                          ? selectedAccent.activeCard
                          : "border-white/10 bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.07]"
                      }`}
                    >
                      <p className="text-sm font-semibold text-white">{item.label}</p>
                      <p className="mt-1 text-xs text-[color:var(--color-muted)]">{item.strapline}</p>
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
                  <p className="text-sm font-medium text-white">Reviewers who approve promoted guidance</p>
                  <p className="text-xs text-[color:var(--color-muted)]">
                    {payload.reviewers.map((reviewer) => reviewer.role).join(" / ")}
                  </p>
                </div>
              </div>
            </div>

            <div className="surface-card relative overflow-hidden rounded-[30px] p-5 sm:p-6">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_48%),linear-gradient(180deg,_rgba(255,255,255,0.04),_rgba(255,255,255,0))]" />
              <div className={`pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-r ${accent.halo}`} />

              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.26em] text-[color:var(--color-muted)]">
                      Active learning lane
                    </p>
                    <h2 className="mt-2 text-2xl text-white">{payload.label}</h2>
                    <p className="mt-2 max-w-md text-sm leading-6 text-[color:var(--color-muted)]">
                      {payload.strapline}
                    </p>
                  </div>
                  <Button className="rounded-full border border-white/12 bg-white/[0.08] px-4 py-2 text-sm font-medium text-white transition hover:bg-white/[0.12]">
                    Promote patch
                  </Button>
                </div>

                <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center">
                  <div
                    className="relative grid h-40 w-40 shrink-0 place-items-center rounded-full border border-white/10"
                    style={{
                      background: `conic-gradient(from 210deg, ${accent.ring} 0 ${payload.score}%, rgba(255,255,255,0.14) ${payload.score}% 100%)`,
                    }}
                  >
                    <div className="grid h-28 w-28 place-items-center rounded-full border border-white/12 bg-[rgba(7,16,30,0.92)]">
                      <div className="text-center">
                        <p className="text-4xl font-semibold tracking-[-0.05em] text-white">{payload.score}</p>
                        <p className="text-[10px] uppercase tracking-[0.28em] text-[color:var(--color-muted)]">
                          skill score
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid flex-1 gap-3 sm:grid-cols-2">
                    <MetricCard label="Experiments read" value={`${payload.experimentsRead}`} note={payload.syncedAt} />
                    <MetricCard label="Accepted signals" value={`${payload.acceptedSignals}`} note="Patterns promoted into guidance" />
                    <MetricCard label="Blocked regressions" value={`${payload.regressionsBlocked}`} note="Known failures kept out of the patch" />
                    <MetricCard label="Confidence" value={`${payload.confidence}%`} note={`${payload.delta} improvement this cycle`} />
                  </div>
                </div>

                <div className="mt-6 rounded-[24px] border border-white/10 bg-[rgba(255,255,255,0.04)] p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.24em] text-[color:var(--color-muted)]">
                        Top synthesis
                      </p>
                      <p className="mt-2 text-lg font-medium text-white">{payload.topLine.title}</p>
                    </div>
                    <span className={`rounded-full border px-3 py-1 text-xs ${accent.badge}`}>
                      {payload.topLine.metric}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-[color:var(--color-muted)]">{payload.topLine.detail}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.header>

        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <motion.section
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="surface-card rounded-[28px] p-5 sm:p-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-[color:var(--color-muted)]">
                  Experiment ledger
                </p>
                <h2 className="mt-2 text-2xl text-white">What the agent actually learned from recent runs.</h2>
              </div>
              <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-[color:var(--color-muted)]">
                Cycle time <span className="font-medium text-white">{payload.cycleTime}</span>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {payload.experiments.map((experiment, index) => (
                <motion.article
                  key={experiment.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.04 * index }}
                  className="rounded-[24px] border border-white/10 bg-[rgba(255,255,255,0.03)] p-4 sm:p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[11px] uppercase tracking-[0.24em] text-[color:var(--color-muted)]">
                          {experiment.id}
                        </span>
                        <span
                          className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] ${statusStyles[experiment.status]}`}
                        >
                          {experiment.status}
                        </span>
                      </div>
                      <p className="mt-3 text-lg font-medium text-white">{experiment.hypothesis}</p>
                    </div>
                    <p className="max-w-xs text-sm text-[color:var(--color-muted)]">{experiment.impact}</p>
                  </div>

                  <div className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
                    <ExperimentDetail label="Failure mode" value={experiment.failureMode} />
                    <ExperimentDetail label="Evidence" value={experiment.evidence} />
                    <ExperimentDetail label="Lesson promoted" value={experiment.lesson} />
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.section>

          <motion.aside
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="surface-card rounded-[28px] p-5 sm:p-6"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-[color:var(--color-muted)]">
                  Synthesis stack
                </p>
                <h2 className="mt-2 text-2xl text-white">How the history collapses into guidance.</h2>
              </div>
              <span className={`rounded-full border px-3 py-1 text-xs ${accent.badge}`}>
                {strongestCluster.share}% dominant
              </span>
            </div>

            <div className="mt-5 space-y-3">
              {payload.synthesis.map((cluster) => (
                <article
                  key={cluster.label}
                  className="rounded-[22px] border border-white/10 bg-[rgba(255,255,255,0.03)] p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-white">{cluster.label}</p>
                      <p className="mt-1 text-xs text-[color:var(--color-muted)]">{cluster.confidence}</p>
                    </div>
                    <span className="text-2xl font-semibold tracking-[-0.04em] text-white">{cluster.share}%</span>
                  </div>
                  <Progress value={cluster.share} className="mt-4">
                    <ProgressTrack className="h-2 overflow-hidden rounded-full bg-white/[0.08]">
                      <ProgressIndicator
                        className={`h-full rounded-full bg-gradient-to-r ${accent.bar}`}
                        style={{ boxShadow: accent.glow }}
                      />
                    </ProgressTrack>
                  </Progress>
                  <p className="mt-3 text-sm leading-6 text-[color:var(--color-muted)]">{cluster.note}</p>
                </article>
              ))}
            </div>

            <div className="mt-5 rounded-[24px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-4">
              <p className="text-[11px] uppercase tracking-[0.24em] text-[color:var(--color-muted)]">
                Output rule
              </p>
              <p className="mt-2 text-lg text-white">Only repeated evidence graduates into the skill file.</p>
              <p className="mt-3 text-sm leading-6 text-[color:var(--color-muted)]">
                One-off mistakes stay in review notes. Multi-run patterns become durable instructions so the next agent gets sharper, not just longer.
              </p>
            </div>
          </motion.aside>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          className="surface-card rounded-[28px] p-5 sm:p-6"
        >
          <Tabs defaultValue="patch" key={payload.label}>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-[color:var(--color-muted)]">
                  Skill rewrite
                </p>
                <h2 className="mt-2 text-2xl text-white">The synthesis stays useful because it lands as an actual patch.</h2>
              </div>
              <TabsList className="inline-flex rounded-full border border-white/10 bg-white/[0.04] p-1">
                <TabsTrigger
                  value="patch"
                  className="rounded-full px-4 py-2 text-sm text-[color:var(--color-muted)] transition data-[active]:bg-white/10 data-[active]:text-white"
                >
                  Patch
                </TabsTrigger>
                <TabsTrigger
                  value="trace"
                  className="rounded-full px-4 py-2 text-sm text-[color:var(--color-muted)] transition data-[active]:bg-white/10 data-[active]:text-white"
                >
                  Trace
                </TabsTrigger>
                <TabsTrigger
                  value="safeguards"
                  className="rounded-full px-4 py-2 text-sm text-[color:var(--color-muted)] transition data-[active]:bg-white/10 data-[active]:text-white"
                >
                  Safeguards
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="patch" className="mt-6">
              <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="grid gap-4">
                  <article className="rounded-[24px] border border-white/10 bg-[rgba(255,255,255,0.03)] p-5">
                    <p className="text-[11px] uppercase tracking-[0.24em] text-[color:var(--color-muted)]">
                      Patch rationale
                    </p>
                    <h3 className="mt-2 text-2xl text-white">{payload.patch.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[color:var(--color-muted)]">{payload.patch.detail}</p>

                    <div className="mt-5 space-y-3">
                      {payload.patch.sections.map((section) => {
                        const sectionAccent = accentStyles[section.tone];

                        return (
                          <div
                            key={section.label}
                            className="rounded-[20px] border border-white/10 bg-black/10 p-4"
                          >
                            <div className="flex items-center justify-between gap-3">
                              <p className="text-sm font-medium text-white">{section.label}</p>
                              <span className={`rounded-full border px-3 py-1 text-[11px] ${sectionAccent.badge}`}>
                                {section.lines.length} change{section.lines.length > 1 ? "s" : ""}
                              </span>
                            </div>
                            <div className="mt-3 space-y-2">
                              {section.lines.map((line) => (
                                <p key={line} className="text-sm leading-6 text-[color:var(--color-muted)]">
                                  {line}
                                </p>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </article>
                </div>

                <div className="grid gap-4">
                  <article className="rounded-[24px] border border-white/10 bg-[rgba(255,255,255,0.03)] p-5">
                    <div className="grid gap-4 md:grid-cols-2">
                      <CodePanel label="Before" lines={payload.patch.before} />
                      <CodePanel label="After" lines={payload.patch.after} highlight />
                    </div>
                  </article>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <SummaryTile label="Active file" value={payload.activeFile} note="Target skill document receiving this cycle's patch" />
                    <SummaryTile label="Dominant cluster" value={strongestCluster.label} note={strongestCluster.note} />
                    <SummaryTile label="Switch state" value={isSwitching ? "Updating" : "Stable"} note="Deferred rendering keeps the lane change smooth" />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="trace" className="mt-6">
              <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
                <article className="rounded-[24px] border border-white/10 bg-[rgba(255,255,255,0.03)] p-5">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-[color:var(--color-muted)]">
                    Reasoning trace
                  </p>
                  <h3 className="mt-2 text-2xl text-white">Closed-loop learning sequence</h3>
                  <div className="mt-5 space-y-4">
                    {payload.trace.map((step) => (
                      <div key={step.label} className="flex gap-3">
                        <span className={`mt-1.5 h-2.5 w-2.5 rounded-full ${traceStyles[step.status]}`} />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-3">
                            <p className="text-sm font-medium text-white">{step.label}</p>
                            <span className="text-xs text-[color:var(--color-muted)]">{step.duration}</span>
                          </div>
                          <p className="mt-1 text-sm leading-6 text-[color:var(--color-muted)]">{step.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>

                <article className="rounded-[24px] border border-white/10 bg-[linear-gradient(135deg,rgba(245,201,119,0.08),rgba(255,255,255,0.03))] p-5">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-[color:var(--color-muted)]">
                    Cycle outcome
                  </p>
                  <h3 className="mt-2 text-2xl text-white">High reasoning is useful only if it resolves into better defaults.</h3>
                  <p className="mt-3 text-sm leading-6 text-[color:var(--color-muted)]">
                    This lane does not keep a private memo. It turns repeated experiment evidence into visible skill-file instructions, attaches a rationale, and keeps the safety boundary beside the rewrite.
                  </p>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <SummaryTile label="Learning gain" value={payload.delta} note="Net improvement since the previous accepted patch" />
                    <SummaryTile label="Cycle speed" value={payload.cycleTime} note="Time to move from logs to draft guidance" />
                    <SummaryTile label="Promotion bar" value={`${payload.confidence}%`} note="Confidence required before the patch is surfaced" />
                    <SummaryTile label="Reviewer model" value={payload.model} note="Reasoning profile used for synthesis" />
                  </div>
                </article>
              </div>
            </TabsContent>

            <TabsContent value="safeguards" className="mt-6">
              <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
                <article className="rounded-[24px] border border-white/10 bg-[rgba(255,255,255,0.03)] p-5">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-[color:var(--color-muted)]">
                    Safety rails
                  </p>
                  <h3 className="mt-2 text-2xl text-white">Guidance improves without forgetting why it was added.</h3>
                  <div className="mt-5 space-y-3">
                    {payload.safeguards.map((rule) => (
                      <div
                        key={rule.title}
                        className="rounded-[20px] border border-white/10 bg-black/10 p-4"
                      >
                        <p className="text-sm font-medium text-white">{rule.title}</p>
                        <p className="mt-2 text-sm leading-6 text-[color:var(--color-muted)]">{rule.detail}</p>
                      </div>
                    ))}
                  </div>
                </article>

                <article className="rounded-[24px] border border-white/10 bg-[rgba(255,255,255,0.03)] p-5">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-[color:var(--color-muted)]">
                    Human loop
                  </p>
                  <h3 className="mt-2 text-2xl text-white">Promotions are reviewed, not blindly merged.</h3>
                  <p className="mt-3 text-sm leading-6 text-[color:var(--color-muted)]">
                    Each accepted patch carries the experiment cluster, the proposed wording, and the reviewer set responsible for deciding whether the new instruction is durable enough to keep.
                  </p>

                  <div className="mt-5 space-y-3">
                    {payload.reviewers.map((reviewer) => (
                      <div
                        key={reviewer.name}
                        className="flex items-center gap-3 rounded-[20px] border border-white/10 bg-black/10 p-4"
                      >
                        <Avatar className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-[rgba(12,23,41,0.9)]">
                          <AvatarFallback className="inline-flex h-full w-full items-center justify-center rounded-full text-xs font-semibold text-white">
                            {reviewer.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-white">{reviewer.name}</p>
                          <p className="text-xs text-[color:var(--color-muted)]">{reviewer.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
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

function ExperimentDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[20px] border border-white/10 bg-black/10 px-4 py-4">
      <p className="text-[11px] uppercase tracking-[0.24em] text-[color:var(--color-muted)]">{label}</p>
      <p className="mt-2 leading-6 text-white/90">{value}</p>
    </div>
  );
}

function CodePanel({
  label,
  lines,
  highlight = false,
}: {
  label: string;
  lines: string[];
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-[20px] border p-4 ${
        highlight
          ? "border-sky-300/25 bg-sky-300/[0.08]"
          : "border-white/10 bg-black/10"
      }`}
    >
      <p className="text-[11px] uppercase tracking-[0.24em] text-[color:var(--color-muted)]">{label}</p>
      <pre className="mt-3 overflow-x-auto whitespace-pre-wrap text-sm leading-6 text-white/90">
        {lines.join("\n")}
      </pre>
    </div>
  );
}

function SummaryTile({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="rounded-[20px] border border-white/10 bg-white/[0.04] px-4 py-4">
      <p className="text-[11px] uppercase tracking-[0.24em] text-[color:var(--color-muted)]">{label}</p>
      <p className="mt-2 break-words text-lg font-semibold tracking-[-0.04em] text-white sm:text-xl">{value}</p>
      <p className="mt-1 text-xs leading-5 text-[color:var(--color-muted)]">{note}</p>
    </div>
  );
}
