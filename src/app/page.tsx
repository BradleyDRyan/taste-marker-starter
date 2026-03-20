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

const qualityAreas = [
  {
    name: "Signal clarity",
    score: 92,
    weight: "30%",
    summary: "Primary KPI, supporting trend, and benchmark context resolve in a single scan.",
    icon: Target,
    badgeClass: "bg-[#7cf2c9]/12 text-[#7cf2c9]",
  },
  {
    name: "Information density",
    score: 84,
    weight: "20%",
    summary: "Secondary detail is rich, but one module still competes too hard with the hero signal.",
    icon: Funnel,
    badgeClass: "bg-[#44d4ff]/12 text-[#44d4ff]",
  },
  {
    name: "Decision readiness",
    score: 88,
    weight: "35%",
    summary: "The dashboard exposes what to do next, who owns it, and the business impact of delay.",
    icon: Lightning,
    badgeClass: "bg-[#ffcf74]/14 text-[#ffcf74]",
  },
  {
    name: "Trust & provenance",
    score: 79,
    weight: "15%",
    summary: "Source freshness is present, but confidence bands need stronger placement near top-level numbers.",
    icon: CompassTool,
    badgeClass: "bg-[#ff7a7a]/12 text-[#ff9d9d]",
  },
];

const laneScores = [
  { label: "Readability", score: 94, detail: "Headline hierarchy and spacing lead the eye cleanly." },
  { label: "Comparability", score: 81, detail: "Benchmarks exist, but cross-filter parity could be clearer." },
  { label: "Actionability", score: 89, detail: "Operators can move from signal to next step without hunting." },
  { label: "Narrative continuity", score: 86, detail: "Charts and annotations reinforce the same story." },
];

const issueQueue = [
  {
    title: "Benchmark labels are one click too deep",
    severity: "Medium",
    detail: "Users can spot movement, but not immediately see whether it clears the target guardrail.",
    owner: "Expose target delta beside the primary KPI and chart subtitle.",
    toneClass: "bg-[#ffcf74]/14 text-[#ffcf74]",
  },
  {
    title: "Tertiary cards dilute the first-screen decision",
    severity: "Low",
    detail: "All modules are well designed, but the lower-left cluster competes with the hero narrative on desktop.",
    owner: "Collapse one secondary panel into a compact trend strip.",
    toneClass: "bg-[#44d4ff]/12 text-[#44d4ff]",
  },
  {
    title: "Freshness signal lacks a confidence frame",
    severity: "High",
    detail: "Recency is visible, though the dashboard does not show whether all upstream sources refreshed successfully.",
    owner: "Pair sync timestamp with a pipeline health badge and anomaly fallback state.",
    toneClass: "bg-[#ff7a7a]/12 text-[#ff9d9d]",
  },
];

const reviewSteps = [
  {
    label: "Parse layout map",
    detail: "Hero, KPI strip, filters, trend visuals, ownership cues, and utility actions.",
    meta: "6 view zones",
    icon: Sparkle,
  },
  {
    label: "Score weighted rubric",
    detail: "Readability, density control, trust, and decision velocity are evaluated independently.",
    meta: "4 rubric lanes",
    icon: ListChecks,
  },
  {
    label: "Draft operator notes",
    detail: "Findings are translated into concrete interface moves instead of abstract design language.",
    meta: "3 critical recommendations",
    icon: Notification,
  },
];

const recentRuns = [
  {
    name: "Executive revenue board",
    score: 91,
    delta: "+4",
    stamp: "09:12 UTC",
  },
  {
    name: "Lifecycle health monitor",
    score: 86,
    delta: "+1",
    stamp: "08:48 UTC",
  },
  {
    name: "Partner pipeline cockpit",
    score: 78,
    delta: "-3",
    stamp: "08:03 UTC",
  },
];

const evidenceSignals = [
  {
    label: "Decision path",
    value: "12 sec",
    detail: "Time to identify the primary KPI, trend direction, and required owner action.",
    icon: ClockCountdown,
  },
  {
    label: "KPI confidence",
    value: "0.84",
    detail: "Composite confidence after freshness, labeling quality, and comparison framing checks.",
    icon: CurrencyCircleDollar,
  },
  {
    label: "Ownership clarity",
    value: "3 / 3",
    detail: "Every recommended action resolves to a named team or operator without ambiguity.",
    icon: UsersThree,
  },
];

const modelTraits = [
  "Claude Sonnet 4.6",
  "High reasoning",
  "Dashboard quality scoring",
];

export default function Page() {
  return (
    <main className="dashboard-shell quality-shell min-h-screen px-4 py-6 text-white md:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-7xl flex-col gap-6 rounded-[32px] p-3 md:p-5">
        <section className="glass-panel-strong aurora overflow-hidden rounded-[32px]">
          <div className="fine-grid grid gap-8 p-6 md:p-8 xl:grid-cols-[1.16fr_0.84fr]">
            <div className="space-y-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs uppercase tracking-[0.24em] text-[#90a3c5]">
                    <Sparkle size={14} weight="fill" className="text-[#7cf2c9]" />
                    Dashboard scoring agent
                  </div>
                  <div className="space-y-4">
                    <p className="max-w-xl text-sm leading-6 text-[#90a3c5]">
                      Friday, March 20 · Evaluation run for executive-facing analytics surfaces
                    </p>
                    <div className="space-y-3">
                      <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.05em] text-white md:text-6xl">
                        Score dashboard quality like an operator, not a style guide.
                      </h1>
                      <p className="max-w-2xl text-base leading-7 text-[#c3d2ef] md:text-lg">
                        This review console highlights whether a dashboard helps someone make the
                        next business decision fast, with enough trust, context, and ownership to
                        act.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="glass-panel rounded-[24px] px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-[#90a3c5]">
                    Current window
                  </p>
                  <div className="mt-2 flex items-center gap-2 text-sm font-medium text-white">
                    <CalendarDots size={18} className="text-[#44d4ff]" />
                    Last 24 hours
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {modelTraits.map((trait) => (
                  <span
                    key={trait}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-[#dbe8ff]"
                  >
                    {trait}
                  </span>
                ))}
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {qualityAreas.map(({ name, score, weight, summary, icon: Icon, badgeClass }) => (
                  <article key={name} className="glass-panel rounded-[26px] p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className={`rounded-2xl p-3 ${badgeClass}`}>
                        <Icon size={22} weight="duotone" />
                      </div>
                      <span className="rounded-full border border-white/10 px-2.5 py-1 text-xs uppercase tracking-[0.18em] text-[#90a3c5]">
                        Weight {weight}
                      </span>
                    </div>
                    <div className="mt-6">
                      <p className="text-sm text-[#90a3c5]">{name}</p>
                      <div className="mt-2 flex items-end justify-between gap-3">
                        <p className="text-4xl font-semibold tracking-[-0.05em] text-white">
                          {score}
                        </p>
                        <span className="inline-flex items-center gap-1 rounded-full bg-white/6 px-2.5 py-1 text-sm text-white">
                          <ArrowUpRight size={14} className="text-[#7cf2c9]" />
                          weighted
                        </span>
                      </div>
                      <p className="mt-4 text-sm leading-6 text-[#b9cae8]">{summary}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <aside className="score-panel rounded-[30px] p-5 md:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-[#90a3c5]">Composite quality score</p>
                  <h2 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-white">
                    86 / 100
                  </h2>
                </div>
                <span className="rounded-full bg-[#7cf2c9]/12 px-3 py-1 text-sm text-[#7cf2c9]">
                  Ready for review
                </span>
              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-[0.88fr_1.12fr] md:items-center">
                <div className="flex justify-center">
                  <div
                    className="score-ring"
                    style={{
                      background:
                        "conic-gradient(#7cf2c9 0 86%, rgba(255,255,255,0.08) 86% 100%)",
                    }}
                  >
                    <div className="score-ring__inner">
                      <p className="text-5xl font-semibold tracking-[-0.06em] text-white">86</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.24em] text-[#90a3c5]">
                        strong
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {laneScores.map((lane) => (
                    <div key={lane.label} className="rounded-[22px] border border-white/8 bg-white/[0.03] p-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-medium text-white">{lane.label}</p>
                        <span className="text-sm text-[#dbe8ff]">{lane.score}</span>
                      </div>
                      <div className="impact-track mt-3">
                        <div
                          className="impact-track__fill"
                          style={{ width: `${lane.score}%` }}
                        />
                      </div>
                      <p className="mt-3 text-sm leading-6 text-[#aebfdf]">{lane.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid gap-3 md:grid-cols-3">
                <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-[#90a3c5]">Primary risk</p>
                  <p className="mt-2 text-base font-medium text-white">Trust framing</p>
                </div>
                <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-[#90a3c5]">Best trait</p>
                  <p className="mt-2 text-base font-medium text-white">Clear action path</p>
                </div>
                <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-[#90a3c5]">Confidence</p>
                  <p className="mt-2 text-base font-medium text-white">High reasoning pass</p>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
          <article className="glass-panel rounded-[30px] p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm text-[#90a3c5]">Weighted rubric</p>
                <h2 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-white">
                  How the score was earned
                </h2>
              </div>
              <span className="rounded-full border border-white/10 px-3 py-1 text-sm text-[#90a3c5]">
                4 scoring lanes
              </span>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {laneScores.map((lane, index) => (
                <div key={lane.label} className="signal-card rounded-[26px] p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-[#90a3c5]">Lane 0{index + 1}</p>
                      <p className="mt-2 text-xl font-semibold text-white">{lane.label}</p>
                    </div>
                    <div className="rounded-full border border-white/10 px-3 py-1 text-sm text-white">
                      {lane.score}
                    </div>
                  </div>
                  <div className="impact-track mt-5">
                    <div className="impact-track__fill" style={{ width: `${lane.score}%` }} />
                  </div>
                  <p className="mt-4 text-sm leading-6 text-[#b9cae8]">{lane.detail}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-[28px] border border-white/10 bg-white/[0.03] p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-[#90a3c5]">Recommendation</p>
                  <h3 className="mt-1 text-xl font-semibold tracking-[-0.03em] text-white">
                    Ship after strengthening trust cues above the fold
                  </h3>
                </div>
                <div className="rounded-full bg-[#7cf2c9]/12 px-3 py-1 text-sm text-[#7cf2c9]">
                  +5 score upside
                </div>
              </div>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-[#c3d2ef]">
                The dashboard already supports fast decision-making. The highest-leverage change is
                to make freshness and benchmark confidence visible at the same level as the primary
                KPI so operators do not need to infer reliability.
              </p>
            </div>
          </article>

          <div className="grid gap-6">
            <article className="glass-panel rounded-[30px] p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-[#90a3c5]">Evaluation pulse</p>
                  <h2 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-white">
                    Run context
                  </h2>
                </div>
                <span className="rounded-full bg-[#44d4ff]/12 px-3 py-1 text-sm text-[#44d4ff]">
                  Live
                </span>
              </div>

              <div className="mt-8 grid gap-4">
                {evidenceSignals.map(({ label, value, detail, icon: Icon }) => (
                  <div
                    key={label}
                    className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="rounded-2xl bg-white/6 p-3 text-[#44d4ff]">
                        <Icon size={22} weight="duotone" />
                      </div>
                      <p className="text-3xl font-semibold tracking-[-0.05em] text-white">
                        {value}
                      </p>
                    </div>
                    <p className="mt-5 text-sm text-[#90a3c5]">{label}</p>
                    <p className="mt-2 text-sm leading-6 text-[#c3d2ef]">{detail}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="glass-panel rounded-[30px] p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-[#90a3c5]">Recent scoring runs</p>
                  <h2 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-white">
                    Comparative output
                  </h2>
                </div>
                <div className="rounded-full border border-white/10 px-3 py-1 text-sm text-[#90a3c5]">
                  3 projects
                </div>
              </div>

              <div className="mt-8 space-y-3">
                {recentRuns.map((run) => (
                  <div
                    key={run.name}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-[24px] border border-white/8 bg-white/[0.03] p-4"
                  >
                    <div>
                      <p className="font-medium text-white">{run.name}</p>
                      <p className="mt-1 text-sm text-[#90a3c5]">{run.stamp}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-white/6 px-3 py-1 text-sm text-white">
                        {run.score}
                      </span>
                      <span className="rounded-full bg-[#7cf2c9]/12 px-3 py-1 text-sm text-[#7cf2c9]">
                        {run.delta}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[0.94fr_1.06fr]">
          <article className="glass-panel rounded-[30px] p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm text-[#90a3c5]">Triage queue</p>
                <h2 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-white">
                  Findings to address next
                </h2>
              </div>
              <div className="rounded-full border border-white/10 px-3 py-1 text-sm text-[#90a3c5]">
                1 high, 1 medium, 1 low
              </div>
            </div>

            <div className="mt-8 space-y-4">
              {issueQueue.map((issue) => (
                <article
                  key={issue.title}
                  className="rounded-[26px] border border-white/8 bg-white/[0.03] p-5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="max-w-md text-lg font-medium text-white">{issue.title}</p>
                    <span className={`rounded-full px-3 py-1 text-sm ${issue.toneClass}`}>
                      {issue.severity}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-[#bfd0ee]">{issue.detail}</p>
                  <div className="mt-5 rounded-[20px] border border-white/8 bg-white/[0.02] p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-[#90a3c5]">
                      Suggested fix
                    </p>
                    <p className="mt-2 text-sm leading-6 text-white">{issue.owner}</p>
                  </div>
                </article>
              ))}
            </div>
          </article>

          <article className="glass-panel rounded-[30px] p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm text-[#90a3c5]">Review flow</p>
                <h2 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-white">
                  What the scoring agent actually does
                </h2>
              </div>
              <div className="rounded-full bg-[#ffcf74]/14 px-3 py-1 text-sm text-[#ffcf74]">
                Thorough evaluation
              </div>
            </div>

            <div className="mt-8 grid gap-4">
              {reviewSteps.map(({ label, detail, meta, icon: Icon }) => (
                <div key={label} className="review-step rounded-[26px] p-5">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="rounded-2xl bg-white/6 p-3 text-[#7cf2c9]">
                        <Icon size={22} weight="duotone" />
                      </div>
                      <div>
                        <p className="text-lg font-medium text-white">{label}</p>
                        <p className="mt-2 max-w-2xl text-sm leading-7 text-[#bfd0ee]">{detail}</p>
                      </div>
                    </div>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-sm text-[#90a3c5]">
                      {meta}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="mesh-card rounded-[24px] p-5">
                <TrendUp size={24} className="text-[#7cf2c9]" />
                <p className="mt-5 text-sm text-[#90a3c5]">Most improved</p>
                <p className="mt-2 text-xl font-semibold text-white">Narrative continuity</p>
              </div>
              <div className="mesh-card rounded-[24px] p-5">
                <Notification size={24} className="text-[#44d4ff]" />
                <p className="mt-5 text-sm text-[#90a3c5]">Needs attention</p>
                <p className="mt-2 text-xl font-semibold text-white">Confidence labeling</p>
              </div>
              <div className="mesh-card rounded-[24px] p-5">
                <Target size={24} className="text-[#ffcf74]" />
                <p className="mt-5 text-sm text-[#90a3c5]">Target state</p>
                <p className="mt-2 text-xl font-semibold text-white">90+ launch threshold</p>
              </div>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
