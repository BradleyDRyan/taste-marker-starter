 "use client";

import { useMemo, useState } from "react";

type RangeKey = "7D" | "30D" | "90D";

type KPIItem = {
  title: string;
  value: string;
  delta: number;
  detail: string;
  accent: string;
};

type UtilizationPoint = {
  label: string;
  value: number;
};

type WorkstreamItem = {
  team: string;
  action: string;
  impact: string;
  status: "healthy" | "warning" | "critical";
  eta: string;
};

type DashboardPayload = {
  kpis: KPIItem[];
  utilization: UtilizationPoint[];
  workstreams: WorkstreamItem[];
};

const dashboardData: Record<RangeKey, DashboardPayload> = {
  "7D": {
    kpis: [
      {
        title: "Revenue",
        value: "$124.8k",
        delta: 12.4,
        detail: "vs previous week",
        accent: "from-emerald-400 via-green-300 to-cyan-200",
      },
      {
        title: "New users",
        value: "3,240",
        delta: 8.3,
        detail: "first-time onboarding",
        accent: "from-indigo-300 via-blue-300 to-sky-200",
      },
      {
        title: "Conversion",
        value: "4.9%",
        delta: -2.1,
        detail: "click-to-purchase",
        accent: "from-violet-300 via-fuchsia-300 to-rose-200",
      },
      {
        title: "Uptime",
        value: "99.97%",
        delta: 0.02,
        detail: "platform availability",
        accent: "from-amber-300 via-orange-200 to-rose-200",
      },
    ],
    utilization: [
      { label: "Mon", value: 62 },
      { label: "Tue", value: 71 },
      { label: "Wed", value: 67 },
      { label: "Thu", value: 74 },
      { label: "Fri", value: 88 },
      { label: "Sat", value: 81 },
      { label: "Sun", value: 76 },
    ],
    workstreams: [
      {
        team: "Payments",
        action: "Chargeback review automation",
        impact: "−6 min avg response time",
        status: "healthy",
        eta: "Now",
      },
      {
        team: "Search",
        action: "Re-index high-traffic categories",
        impact: "+14% CTR on long-tail terms",
        status: "healthy",
        eta: "45m",
      },
      {
        team: "Ops",
        action: "Retry policy tuning for webhooks",
        impact: "Backlog dropped from 21 to 8",
        status: "warning",
        eta: "1h",
      },
      {
        team: "Support",
        action: "Regional escalation routing",
        impact: "1 SLA incident open",
        status: "critical",
        eta: "Ongoing",
      },
    ],
  },
  "30D": {
    kpis: [
      {
        title: "Revenue",
        value: "$512.2k",
        delta: 18.1,
        detail: "vs previous 30 days",
        accent: "from-emerald-400 via-green-300 to-cyan-200",
      },
      {
        title: "New users",
        value: "14,981",
        delta: 9.6,
        detail: "product trials started",
        accent: "from-indigo-300 via-blue-300 to-sky-200",
      },
      {
        title: "Conversion",
        value: "5.6%",
        delta: 1.1,
        detail: "checkout completion",
        accent: "from-violet-300 via-fuchsia-300 to-rose-200",
      },
      {
        title: "Uptime",
        value: "99.95%",
        delta: -0.03,
        detail: "infra + app stack",
        accent: "from-amber-300 via-orange-200 to-rose-200",
      },
    ],
    utilization: [
      { label: "W1", value: 58 },
      { label: "W2", value: 64 },
      { label: "W3", value: 72 },
      { label: "W4", value: 84 },
      { label: "W5", value: 77 },
      { label: "W6", value: 81 },
      { label: "W7", value: 86 },
      { label: "W8", value: 90 },
      { label: "W9", value: 88 },
      { label: "W10", value: 85 },
      { label: "W11", value: 89 },
      { label: "W12", value: 92 },
    ],
    workstreams: [
      {
        team: "Growth",
        action: "A/B test for checkout messaging",
        impact: "2.8% conversion uplift",
        status: "healthy",
        eta: "Updated",
      },
      {
        team: "Data",
        action: "Daily anomaly detection on events",
        impact: "12 false-positive alerts removed",
        status: "healthy",
        eta: "2d",
      },
      {
        team: "Security",
        action: "Audit of OAuth rotation",
        impact: "2 sessions pending review",
        status: "warning",
        eta: "3h",
      },
      {
        team: "Billing",
        action: "Tax rule reconciliation",
        impact: "1 reconciliation exception",
        status: "warning",
        eta: "5h",
      },
    ],
  },
  "90D": {
    kpis: [
      {
        title: "Revenue",
        value: "$1.54M",
        delta: 21.7,
        detail: "vs trailing quarter",
        accent: "from-emerald-400 via-green-300 to-cyan-200",
      },
      {
        title: "New users",
        value: "47,302",
        delta: 16.8,
        detail: "onboarding growth",
        accent: "from-indigo-300 via-blue-300 to-sky-200",
      },
      {
        title: "Conversion",
        value: "5.3%",
        delta: 4.2,
        detail: "trial-to-paid conversion",
        accent: "from-violet-300 via-fuchsia-300 to-rose-200",
      },
      {
        title: "Uptime",
        value: "99.99%",
        delta: 0.04,
        detail: "service-level trend",
        accent: "from-amber-300 via-orange-200 to-rose-200",
      },
    ],
    utilization: [
      { label: "Jan", value: 64 },
      { label: "Feb", value: 69 },
      { label: "Mar", value: 71 },
      { label: "Apr", value: 77 },
      { label: "May", value: 82 },
      { label: "Jun", value: 84 },
      { label: "Jul", value: 90 },
      { label: "Aug", value: 87 },
      { label: "Sep", value: 91 },
      { label: "Oct", value: 93 },
    ],
    workstreams: [
      {
        team: "Platform",
        action: "Global cache tier rollout",
        impact: "−11% P95 API latency",
        status: "healthy",
        eta: "Complete",
      },
      {
        team: "Support",
        action: "Customer care playbook refresh",
        impact: "CSAT improved 6 points",
        status: "healthy",
        eta: "1d",
      },
      {
        team: "QA",
        action: "Chaos test wave for edge regions",
        impact: "2 test failures pending fix",
        status: "warning",
        eta: "4h",
      },
      {
        team: "Infra",
        action: "DB failover rehearsal",
        impact: "Recovery path validated",
        status: "critical",
        eta: "Now",
      },
    ],
  },
};

const rangeOptions: Array<{ key: RangeKey; label: string }> = [
  { key: "7D", label: "7 Days" },
  { key: "30D", label: "30 Days" },
  { key: "90D", label: "90 Days" },
];

const statusStyles: Record<
  WorkstreamItem["status"],
  {
    pill: string;
    text: string;
    badge: string;
  }
> = {
  healthy: {
    pill: "bg-emerald-500/20 text-emerald-200 border-emerald-300/30",
    text: "text-emerald-200",
    badge: "bg-emerald-500",
  },
  warning: {
    pill: "bg-amber-500/20 text-amber-200 border-amber-300/30",
    text: "text-amber-200",
    badge: "bg-amber-500",
  },
  critical: {
    pill: "bg-rose-500/20 text-rose-200 border-rose-300/30",
    text: "text-rose-200",
    badge: "bg-rose-500",
  },
};

export default function Page() {
  const [range, setRange] = useState<RangeKey>("7D");
  const payload = dashboardData[range];

  const maxUtilization = useMemo(
    () => Math.max(...payload.utilization.map((point) => point.value), 1),
    [payload.utilization]
  );

  const totalWorkstreamImpact = payload.workstreams.filter((item) => item.status === "critical").length;
  const warningWorkstreamImpact = payload.workstreams.filter((item) => item.status === "warning").length;

  return (
    <main className="min-h-screen bg-slate-950 px-4 pb-10 pt-6 text-slate-100 sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <header className="rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(56,_189,_248,_0.2),_transparent_45%),linear-gradient(140deg,_rgba(88,_28,_135,_0.6),_rgba(8,_47,_73,_0.95))] px-6 py-7 shadow-2xl shadow-indigo-900/30 sm:px-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-cyan-200/80">Operations Dashboard</p>
              <h1 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">
                Real-time business signal board
              </h1>
              <p className="mt-3 max-w-3xl text-sm text-slate-200/85">
                Overview of growth, revenue, and service health with drill-down-ready trend snapshots for weekly,
                monthly, and quarterly windows.
              </p>
            </div>
            <div className="inline-flex flex-wrap gap-2">
              {rangeOptions.map((option) => (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => setRange(option.key)}
                  className={`rounded-full border px-3 py-2 text-sm font-semibold transition ${
                    range === option.key
                      ? "border-cyan-200/40 bg-cyan-200/20 text-cyan-100"
                      : "border-white/15 bg-white/5 text-slate-200 hover:border-white/30 hover:bg-white/10"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-6 grid gap-3 text-sm sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-slate-300">Signals to watch</p>
              <p className="mt-1 text-lg font-bold text-white">
                {totalWorkstreamImpact} critical, {warningWorkstreamImpact} warning
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-slate-300">Range</p>
              <p className="mt-1 text-lg font-bold text-white">{optionLabel(range)}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-slate-300">Updated</p>
              <p className="mt-1 text-lg font-bold text-white">Just now</p>
            </div>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {payload.kpis.map((kpi) => (
            <article
              key={kpi.title}
              className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] p-5"
            >
              <p className="text-sm text-slate-300">{kpi.title}</p>
              <p className="mt-3 text-3xl font-black text-white">{kpi.value}</p>
              <div className="mt-3 flex items-center gap-2">
                <span
                  className={`rounded-full px-2 py-1 text-xs font-bold ${
                    kpi.delta >= 0 ? "text-emerald-200 bg-emerald-500/20" : "text-rose-200 bg-rose-500/20"
                  }`}
                >
                  {kpi.delta >= 0 ? "+" : ""}
                  {kpi.delta}%
                </span>
                <p className="text-xs text-slate-300">{kpi.detail}</p>
              </div>
              <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-slate-800">
                <div className={`h-full rounded-full bg-gradient-to-r ${kpi.accent}`} />
              </div>
            </article>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-white">Utilization trend</h2>
              <p className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-xs text-slate-100">
                Resource saturation index
              </p>
            </div>
            <div className="mt-6 h-72">
              <div className="flex h-[88%] items-end gap-3 rounded-xl bg-slate-900/70 p-4">
                {payload.utilization.map((point) => {
                  const percent = Math.max(18, Math.round((point.value / maxUtilization) * 100));

                  return (
                    <div key={`${point.label}-${point.value}`} className="flex min-w-0 flex-1 flex-col justify-end">
                      <div className="relative w-full">
                        <div
                          className="rounded-xl bg-gradient-to-t from-cyan-500 to-indigo-400 shadow-[0_0_30px_rgba(56,189,248,0.35)]"
                          style={{
                            height: `${percent}%`,
                          }}
                        />
                      </div>
                      <span className="mt-2 text-center text-[11px] tracking-wide text-slate-300">{point.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-lg font-semibold text-white">Workstream pulse</h2>
            <p className="mt-1 text-sm text-slate-300">
              Prioritized backlog status by team, with impact and ETA.
            </p>
            <ul className="mt-5 space-y-3">
              {payload.workstreams.map((item) => (
                <li key={item.team} className="rounded-xl border border-white/10 bg-slate-900/60 p-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-white">{item.team}</p>
                    <span
                      className={`rounded-full border px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${
                        statusStyles[item.status].pill
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-200">{item.action}</p>
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <p className={`font-medium ${statusStyles[item.status].text}`}>{item.impact}</p>
                    <span className="rounded-full border border-white/15 bg-white/10 px-2 py-1 text-slate-200">
                      ETA {item.eta}
                    </span>
                  </div>
                  <div className="mt-3 h-1.5 rounded-full bg-slate-800">
                    <span
                      className={`block h-full w-1/2 rounded-full ${statusStyles[item.status].badge}`}
                      role="presentation"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </article>
        </section>
      </div>
    </main>
  );
}

function optionLabel(range: RangeKey) {
  return rangeOptions.find((item) => item.key === range)?.label ?? "Unknown";
}
