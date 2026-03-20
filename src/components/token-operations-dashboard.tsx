"use client";

import { useDeferredValue, useMemo, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  ClockCountdown,
  Cpu,
  FadersHorizontal,
  Fire,
  Gauge,
  MagnifyingGlass,
  ShieldCheck,
  Sparkle,
  TrendUp,
  UsersThree,
  WarningDiamond,
} from "@phosphor-icons/react";

type EmployeeUsage = {
  id: string;
  name: string;
  role: string;
  department: string;
  region: string;
  workflow: string;
  model: string;
  tokensUsed: number;
  tokenBudget: number;
  today: number;
  yesterday: number;
  activeMinutes: number;
  lastActiveMinutes: number;
};

type SortKey = "utilization" | "today" | "activity" | "recency";

const EMPLOYEES: EmployeeUsage[] = [
  {
    id: "e1",
    name: "Avery Monroe",
    role: "AI Product Analyst",
    department: "Analytics",
    region: "North America",
    workflow: "Weekly executive reporting",
    model: "Claude Sonnet 4.6",
    tokensUsed: 148_300,
    tokenBudget: 180_000,
    today: 9_800,
    yesterday: 8_200,
    activeMinutes: 470,
    lastActiveMinutes: 7,
  },
  {
    id: "e2",
    name: "Maya Chen",
    role: "Customer Success Lead",
    department: "Support",
    region: "APAC",
    workflow: "Escalation drafting",
    model: "GPT-4.1",
    tokensUsed: 61_120,
    tokenBudget: 90_000,
    today: 2_200,
    yesterday: 2_550,
    activeMinutes: 315,
    lastActiveMinutes: 15,
  },
  {
    id: "e3",
    name: "Daniel Ortiz",
    role: "Staff Engineer",
    department: "Engineering",
    region: "North America",
    workflow: "Release notes and code review",
    model: "GPT-5.4",
    tokensUsed: 204_900,
    tokenBudget: 220_000,
    today: 16_100,
    yesterday: 13_000,
    activeMinutes: 560,
    lastActiveMinutes: 3,
  },
  {
    id: "e4",
    name: "Priya Nair",
    role: "Data Scientist",
    department: "Research",
    region: "EMEA",
    workflow: "Experiment analysis",
    model: "Claude Sonnet 4.6",
    tokensUsed: 229_400,
    tokenBudget: 210_000,
    today: 18_000,
    yesterday: 14_300,
    activeMinutes: 620,
    lastActiveMinutes: 1,
  },
  {
    id: "e5",
    name: "Noah Brooks",
    role: "Engineering Manager",
    department: "Engineering",
    region: "North America",
    workflow: "Sprint review summaries",
    model: "GPT-4.1",
    tokensUsed: 82_300,
    tokenBudget: 110_000,
    today: 3_500,
    yesterday: 2_900,
    activeMinutes: 410,
    lastActiveMinutes: 22,
  },
  {
    id: "e6",
    name: "Lena Vogt",
    role: "Content Strategist",
    department: "Marketing",
    region: "EMEA",
    workflow: "Campaign brief generation",
    model: "Claude Sonnet 4.6",
    tokensUsed: 44_900,
    tokenBudget: 60_000,
    today: 1_450,
    yesterday: 1_620,
    activeMinutes: 255,
    lastActiveMinutes: 52,
  },
  {
    id: "e7",
    name: "Rafael Kim",
    role: "Operations Lead",
    department: "Operations",
    region: "North America",
    workflow: "Queue routing and approvals",
    model: "GPT-5.4",
    tokensUsed: 174_600,
    tokenBudget: 160_000,
    today: 12_900,
    yesterday: 11_100,
    activeMinutes: 488,
    lastActiveMinutes: 9,
  },
  {
    id: "e8",
    name: "Evelyn Reed",
    role: "Compliance Analyst",
    department: "Legal",
    region: "EMEA",
    workflow: "Policy redlines",
    model: "Claude Sonnet 4.6",
    tokensUsed: 37_200,
    tokenBudget: 50_000,
    today: 1_180,
    yesterday: 930,
    activeMinutes: 190,
    lastActiveMinutes: 60,
  },
  {
    id: "e9",
    name: "Tariq Ahmed",
    role: "Product Designer",
    department: "Design",
    region: "North America",
    workflow: "Prototype copy systems",
    model: "GPT-4.1",
    tokensUsed: 56_000,
    tokenBudget: 65_000,
    today: 2_900,
    yesterday: 2_600,
    activeMinutes: 333,
    lastActiveMinutes: 27,
  },
  {
    id: "e10",
    name: "Ivan Petrov",
    role: "Sales Operations",
    department: "Sales",
    region: "EMEA",
    workflow: "Deal desk narratives",
    model: "GPT-5.4",
    tokensUsed: 116_400,
    tokenBudget: 130_000,
    today: 4_000,
    yesterday: 3_700,
    activeMinutes: 404,
    lastActiveMinutes: 5,
  },
];

const WEEKLY_BURN = [
  { day: "Mon", value: 48 },
  { day: "Tue", value: 61 },
  { day: "Wed", value: 58 },
  { day: "Thu", value: 72 },
  { day: "Fri", value: 81 },
  { day: "Sat", value: 64 },
  { day: "Sun", value: 69 },
];

const SORT_OPTIONS: Record<SortKey, string> = {
  utilization: "Highest utilization",
  today: "Highest 24h burn",
  activity: "Most active",
  recency: "Latest active",
};

const compactNumber = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1,
});

function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function formatTokens(value: number) {
  return compactNumber.format(value);
}

function formatMinutes(minutes: number) {
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  return `${Math.floor(minutes / 60)}h ago`;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
}

function ratioFor(row: EmployeeUsage) {
  return row.tokensUsed / row.tokenBudget;
}

function trendFor(row: EmployeeUsage) {
  if (row.yesterday === 0) return 0;
  return ((row.today - row.yesterday) / row.yesterday) * 100;
}

function riskTone(ratio: number) {
  if (ratio >= 1) {
    return {
      label: "Critical",
      badge: "border-rose-300 bg-rose-50 text-rose-700",
      accent: "from-rose-500 via-orange-500 to-amber-400",
    };
  }
  if (ratio >= 0.85) {
    return {
      label: "Watch",
      badge: "border-amber-300 bg-amber-50 text-amber-800",
      accent: "from-amber-500 via-orange-400 to-yellow-300",
    };
  }
  return {
    label: "Healthy",
    badge: "border-emerald-300 bg-emerald-50 text-emerald-700",
    accent: "from-emerald-500 via-teal-400 to-cyan-300",
  };
}

function summarize(rows: EmployeeUsage[]) {
  const totalUsed = rows.reduce((sum, row) => sum + row.tokensUsed, 0);
  const totalBudget = rows.reduce((sum, row) => sum + row.tokenBudget, 0);
  const totalToday = rows.reduce((sum, row) => sum + row.today, 0);
  const critical = rows.filter((row) => ratioFor(row) >= 1).length;
  const atRisk = rows.filter((row) => ratioFor(row) >= 0.85).length;
  const avgTrend =
    rows.reduce((sum, row) => sum + Math.max(0, trendFor(row)), 0) / Math.max(rows.length, 1);
  const utilization = totalBudget === 0 ? 0 : totalUsed / totalBudget;
  const runwayDays =
    totalToday === 0 ? 0 : Math.max(0, Math.round((totalBudget - totalUsed) / totalToday));
  const healthScore = clamp(
    Math.round(95 - utilization * 28 - critical * 7 - atRisk * 2 - avgTrend * 0.22),
    41,
    97,
  );

  return {
    totalUsed,
    totalBudget,
    totalToday,
    utilization,
    critical,
    atRisk,
    runwayDays,
    projectedMonthly: totalToday * 30,
    healthScore,
  };
}

function buildLinePath(values: number[]) {
  const max = Math.max(...values);
  const width = 100;
  const height = 100;
  return values
    .map((value, index) => {
      const x = values.length === 1 ? 0 : (index / (values.length - 1)) * width;
      const y = height - (value / max) * height;
      return `${x},${y}`;
    })
    .join(" ");
}

function buildAreaPath(values: number[]) {
  const points = buildLinePath(values);
  return `M0,100 L${points.replace(/ /g, " L")} L100,100 Z`;
}

function Panel({
  eyebrow,
  title,
  description,
  className,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      className={cn(
        "rounded-[28px] border border-black/10 bg-white/75 p-5 shadow-[0_20px_70px_rgba(18,32,51,0.10)] backdrop-blur md:p-6",
        className,
      )}
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          {eyebrow ? (
            <p className="mb-2 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-slate-500">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="text-xl font-semibold text-slate-950">{title}</h2>
          {description ? <p className="mt-1 text-sm text-slate-600">{description}</p> : null}
        </div>
      </div>
      {children}
    </section>
  );
}

function MetricCard({
  icon,
  label,
  value,
  detail,
  tone,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  detail: string;
  tone: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.18 }}
      className="rounded-[24px] border border-black/10 bg-white/70 p-5 shadow-[0_16px_50px_rgba(18,32,51,0.08)] backdrop-blur"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-600">{label}</p>
          <p className="mt-3 text-3xl font-semibold text-slate-950">{value}</p>
          <p className="mt-2 text-sm text-slate-600">{detail}</p>
        </div>
        <div
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-2xl text-slate-950",
            tone,
          )}
        >
          {icon}
        </div>
      </div>
    </motion.div>
  );
}

function EmployeeCard({ employee }: { employee: EmployeeUsage }) {
  const ratio = ratioFor(employee);
  const trend = trendFor(employee);
  const risk = riskTone(ratio);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22 }}
      className="rounded-[24px] border border-black/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(247,243,235,0.82))] p-4 shadow-[0_14px_45px_rgba(18,32,51,0.06)]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-sm font-semibold text-white">
            {initials(employee.name)}
          </div>
          <div>
            <p className="font-semibold text-slate-950">{employee.name}</p>
            <p className="text-sm text-slate-600">{employee.role}</p>
          </div>
        </div>
        <span className={cn("rounded-full border px-3 py-1 text-xs font-semibold", risk.badge)}>
          {risk.label}
        </span>
      </div>

      <div className="mt-4 rounded-2xl border border-black/10 bg-white/60 p-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Workflow</p>
            <p className="mt-1 text-sm font-medium text-slate-900">{employee.workflow}</p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Last active</p>
            <p className="mt-1 text-sm font-medium text-slate-900">
              {formatMinutes(employee.lastActiveMinutes)}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl bg-slate-950 p-4 text-white">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-300">Spend</p>
          <p className="mt-2 text-2xl font-semibold">{formatTokens(employee.tokensUsed)}</p>
          <p className="mt-1 text-sm text-slate-300">
            of {formatTokens(employee.tokenBudget)} allocated
          </p>
        </div>
        <div className="rounded-2xl border border-black/10 bg-white/70 p-4">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500">24h burn</p>
          <div className="mt-2 flex items-center gap-2">
            <p className="text-2xl font-semibold text-slate-950">{formatTokens(employee.today)}</p>
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold",
                trend >= 0
                  ? "bg-rose-100 text-rose-700"
                  : "bg-emerald-100 text-emerald-700",
              )}
            >
              {trend >= 0 ? <ArrowUpRight size={14} weight="bold" /> : <ArrowDownRight size={14} weight="bold" />}
              {Math.abs(trend).toFixed(0)}%
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-600">{employee.activeMinutes} minutes active today</p>
        </div>
      </div>

      <div className="mt-4">
        <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
          <span>Budget pressure</span>
          <span>{(ratio * 100).toFixed(1)}%</span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-slate-200">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(ratio * 100, 100)}%` }}
            transition={{ duration: 0.4 }}
            className={cn("h-full rounded-full bg-gradient-to-r", risk.accent)}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {[
          employee.department,
          employee.region,
          employee.model,
        ].map((item) => (
          <span
            key={item}
            className="rounded-full border border-black/10 bg-white/75 px-3 py-1 text-xs font-medium text-slate-600"
          >
            {item}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

function DepartmentPressure({
  department,
  ratio,
  used,
  budget,
}: {
  department: string;
  ratio: number;
  used: number;
  budget: number;
}) {
  const risk = riskTone(ratio);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3 text-sm">
        <div className="flex items-center gap-2">
          <span className="font-medium text-slate-900">{department}</span>
          <span className={cn("rounded-full border px-2 py-0.5 text-[11px] font-semibold", risk.badge)}>
            {risk.label}
          </span>
        </div>
        <span className="text-slate-600">
          {formatTokens(used)} / {formatTokens(budget)}
        </span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-slate-200">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(ratio * 100, 100)}%` }}
          transition={{ duration: 0.45 }}
          className={cn("h-full rounded-full bg-gradient-to-r", risk.accent)}
        />
      </div>
    </div>
  );
}

function BurnChart({ values }: { values: number[] }) {
  return (
    <svg viewBox="0 0 100 100" className="h-64 w-full overflow-visible">
      <defs>
        <linearGradient id="burn-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="rgba(47,104,220,0.35)" />
          <stop offset="100%" stopColor="rgba(47,104,220,0)" />
        </linearGradient>
        <linearGradient id="burn-line" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#f26a4b" />
          <stop offset="50%" stopColor="#2f68dc" />
          <stop offset="100%" stopColor="#0e9270" />
        </linearGradient>
      </defs>

      {[20, 40, 60, 80].map((mark) => (
        <line
          key={mark}
          x1="0"
          x2="100"
          y1={mark}
          y2={mark}
          stroke="rgba(18,32,51,0.10)"
          strokeDasharray="1.5 3"
          vectorEffect="non-scaling-stroke"
        />
      ))}

      <path d={buildAreaPath(values)} fill="url(#burn-fill)" />
      <polyline
        points={buildLinePath(values)}
        fill="none"
        stroke="url(#burn-line)"
        strokeWidth="3"
        vectorEffect="non-scaling-stroke"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {buildLinePath(values)
        .split(" ")
        .map((point, index) => {
          const [cx, cy] = point.split(",");
          return (
            <circle
              key={WEEKLY_BURN[index]?.day ?? index}
              cx={cx}
              cy={cy}
              r="2.5"
              fill="#ffffff"
              stroke="#2f68dc"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          );
        })}
    </svg>
  );
}

export function TokenOperationsDashboard() {
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("All departments");
  const [model, setModel] = useState("All models");
  const [sort, setSort] = useState<SortKey>("utilization");
  const deferredQuery = useDeferredValue(query);

  const globalSummary = useMemo(() => summarize(EMPLOYEES), []);

  const departments = useMemo(
    () => ["All departments", ...Array.from(new Set(EMPLOYEES.map((row) => row.department))).sort()],
    [],
  );

  const models = useMemo(
    () => ["All models", ...Array.from(new Set(EMPLOYEES.map((row) => row.model))).sort()],
    [],
  );

  const filteredEmployees = useMemo(() => {
    const normalizedQuery = deferredQuery.trim().toLowerCase();

    return EMPLOYEES.filter((row) => {
      const matchesDepartment = department === "All departments" || row.department === department;
      const matchesModel = model === "All models" || row.model === model;
      const haystack = `${row.name} ${row.role} ${row.workflow} ${row.department} ${row.model}`.toLowerCase();
      const matchesQuery = normalizedQuery.length === 0 || haystack.includes(normalizedQuery);
      return matchesDepartment && matchesModel && matchesQuery;
    }).sort((left, right) => {
      if (sort === "today") return right.today - left.today;
      if (sort === "activity") return right.activeMinutes - left.activeMinutes;
      if (sort === "recency") return left.lastActiveMinutes - right.lastActiveMinutes;
      return ratioFor(right) - ratioFor(left);
    });
  }, [deferredQuery, department, model, sort]);

  const focusSummary = useMemo(() => summarize(filteredEmployees), [filteredEmployees]);

  const departmentPressure = useMemo(() => {
    const totals = new Map<string, { used: number; budget: number }>();

    for (const row of EMPLOYEES) {
      const current = totals.get(row.department) ?? { used: 0, budget: 0 };
      totals.set(row.department, {
        used: current.used + row.tokensUsed,
        budget: current.budget + row.tokenBudget,
      });
    }

    return Array.from(totals.entries())
      .map(([name, values]) => ({
        department: name,
        used: values.used,
        budget: values.budget,
        ratio: values.used / values.budget,
      }))
      .sort((left, right) => right.ratio - left.ratio);
  }, []);

  const modelMix = useMemo(() => {
    const totals = new Map<string, number>();

    for (const row of EMPLOYEES) {
      totals.set(row.model, (totals.get(row.model) ?? 0) + row.tokensUsed);
    }

    return Array.from(totals.entries())
      .map(([name, total]) => ({
        name,
        total,
        share: total / globalSummary.totalUsed,
      }))
      .sort((left, right) => right.total - left.total);
  }, [globalSummary.totalUsed]);

  const actionQueue = useMemo(() => {
    return [...EMPLOYEES]
      .map((row) => {
        const ratio = ratioFor(row);
        const trend = trendFor(row);
        const score = ratio * 100 + Math.max(0, trend) * 0.25;
        let action = "Observe for drift";

        if (ratio >= 1) {
          action = "Raise approval gate and reroute overflow prompts";
        } else if (ratio >= 0.92) {
          action = "Apply prompt compression before next sync";
        } else if (ratio >= 0.85) {
          action = "Tighten daily cap and review tool chain";
        }

        return {
          ...row,
          ratio,
          trend,
          score,
          action,
        };
      })
      .sort((left, right) => right.score - left.score)
      .slice(0, 4);
  }, []);

  const activeModelLead = modelMix[0];
  const burnValues = WEEKLY_BURN.map((point) => point.value);

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(47,104,220,0.14),transparent_30%),radial-gradient(circle_at_top_right,rgba(242,106,75,0.16),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.54),rgba(255,255,255,0))]" />

      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 md:px-8 md:py-8">
        <section className="grid gap-4 xl:grid-cols-[minmax(0,1.35fr)_380px]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="rounded-[32px] border border-black/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.9),rgba(247,243,235,0.8))] p-6 shadow-[0_24px_80px_rgba(18,32,51,0.10)] backdrop-blur md:p-8"
          >
            <div className="flex flex-wrap items-center gap-3">
              {["March cycle", `${EMPLOYEES.length} live workflows`, "Ops + research synced"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-black/10 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_260px]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Token Control Room
                </p>
                <h1 className="font-display mt-3 max-w-3xl text-4xl leading-none text-slate-950 sm:text-5xl xl:text-6xl">
                  Budget intelligence for human and agent workflows.
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                  A live operational view for burn velocity, department pressure, and the
                  interventions keeping prompt-heavy teams inside their monthly runway.
                </p>
              </div>

              <div className="rounded-[28px] border border-black/10 bg-slate-950 p-5 text-white">
                <p className="text-sm font-medium text-slate-300">Live signal</p>
                <div className="mt-4 grid gap-3">
                  <div className="rounded-2xl bg-white/10 p-4">
                    <div className="flex items-center gap-2 text-slate-300">
                      <ClockCountdown size={18} />
                      Runway
                    </div>
                    <p className="mt-3 text-3xl font-semibold">{globalSummary.runwayDays} days</p>
                    <p className="mt-1 text-sm text-slate-300">before current pool is exhausted</p>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-4">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Sparkle size={18} />
                      Model leader
                    </div>
                    <p className="mt-3 text-lg font-semibold">{activeModelLead?.name ?? "None"}</p>
                    <p className="mt-1 text-sm text-slate-300">
                      {activeModelLead ? `${Math.round(activeModelLead.share * 100)}% of spend` : "No data"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42 }}
            className="rounded-[32px] border border-black/10 bg-slate-950 p-6 text-white shadow-[0_24px_80px_rgba(18,32,51,0.16)]"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Operating score</p>
                <h2 className="mt-2 text-2xl font-semibold">Program health</h2>
              </div>
              <ShieldCheck size={28} className="text-emerald-300" weight="duotone" />
            </div>

            <div className="mt-6 flex items-center gap-5">
              <div
                className="relative flex h-32 w-32 items-center justify-center rounded-full"
                style={{
                  background: `conic-gradient(#2dd4bf 0 ${(globalSummary.healthScore / 100) * 240}deg, rgba(255,255,255,0.14) ${(globalSummary.healthScore / 100) * 240}deg 360deg)`,
                }}
              >
                <div className="flex h-[104px] w-[104px] flex-col items-center justify-center rounded-full bg-slate-950">
                  <span className="text-4xl font-semibold">{globalSummary.healthScore}</span>
                  <span className="text-xs uppercase tracking-[0.24em] text-slate-400">of 100</span>
                </div>
              </div>

              <div className="space-y-3 text-sm text-slate-300">
                <div className="rounded-2xl border border-white/10 bg-white/10 px-3 py-2">
                  {globalSummary.critical} teams already past hard budget.
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 px-3 py-2">
                  {globalSummary.atRisk} teams are inside the watch band.
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 px-3 py-2">
                  Daily burn projects to {formatTokens(globalSummary.projectedMonthly)} this month.
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-3">
              {[
                {
                  label: "Utilization",
                  value: `${(globalSummary.utilization * 100).toFixed(1)}%`,
                  icon: <Gauge size={18} />,
                },
                {
                  label: "Active operators",
                  value: `${EMPLOYEES.length}`,
                  icon: <UsersThree size={18} />,
                },
                {
                  label: "Critical review queue",
                  value: `${actionQueue.filter((item) => item.ratio >= 1).length}`,
                  icon: <WarningDiamond size={18} />,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-4 py-3"
                >
                  <div className="flex items-center gap-2 text-slate-300">
                    {item.icon}
                    {item.label}
                  </div>
                  <span className="font-semibold text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </motion.aside>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            icon={<Gauge size={22} weight="duotone" />}
            label="Pool utilization"
            value={`${(globalSummary.utilization * 100).toFixed(1)}%`}
            detail={`${formatTokens(globalSummary.totalUsed)} consumed of ${formatTokens(globalSummary.totalBudget)}`}
            tone="bg-cyan-100"
          />
          <MetricCard
            icon={<Fire size={22} weight="duotone" />}
            label="24h throughput"
            value={formatTokens(globalSummary.totalToday)}
            detail="Total token burn across all active workflows"
            tone="bg-orange-100"
          />
          <MetricCard
            icon={<Cpu size={22} weight="duotone" />}
            label="Protected budget"
            value={formatTokens(globalSummary.totalBudget - globalSummary.totalUsed)}
            detail="Remaining headroom before monthly caps tighten"
            tone="bg-emerald-100"
          />
          <MetricCard
            icon={<TrendUp size={22} weight="duotone" />}
            label="Projected month"
            value={formatTokens(globalSummary.projectedMonthly)}
            detail="Extrapolated from current 24-hour activity"
            tone="bg-indigo-100"
          />
        </section>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.9fr)]">
          <Panel
            eyebrow="Focus Slice"
            title="Operator roster"
            description="Search, filter, and review the people and workflows applying the most pressure to the budget pool."
          >
            <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_180px_180px]">
              <label className="flex items-center gap-3 rounded-2xl border border-black/10 bg-white/80 px-4 py-3">
                <MagnifyingGlass size={18} className="text-slate-500" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search name, workflow, model"
                  className="w-full bg-transparent text-sm text-slate-950 outline-none placeholder:text-slate-400"
                />
              </label>

              <label className="rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-sm text-slate-700">
                <span className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  <FadersHorizontal size={14} />
                  Department
                </span>
                <select
                  value={department}
                  onChange={(event) => setDepartment(event.target.value)}
                  className="w-full bg-transparent font-medium text-slate-950 outline-none"
                >
                  {departments.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>

              <label className="rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-sm text-slate-700">
                <span className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  <Sparkle size={14} />
                  Model
                </span>
                <select
                  value={model}
                  onChange={(event) => setModel(event.target.value)}
                  className="w-full bg-transparent font-medium text-slate-950 outline-none"
                >
                  {models.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              {Object.entries(SORT_OPTIONS).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSort(key as SortKey)}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition",
                    sort === key
                      ? "bg-slate-950 text-white"
                      : "border border-black/10 bg-white/80 text-slate-600 hover:bg-white",
                  )}
                >
                  {label}
                </button>
              ))}
              <div className="ml-auto rounded-full border border-black/10 bg-white/80 px-4 py-2 text-sm text-slate-600">
                {filteredEmployees.length} operators in focus
              </div>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {filteredEmployees.map((employee) => (
                <EmployeeCard key={employee.id} employee={employee} />
              ))}
            </div>

            {filteredEmployees.length === 0 ? (
              <div className="mt-5 rounded-[24px] border border-dashed border-black/15 bg-white/50 px-5 py-10 text-center text-slate-600">
                No operators match the current filters. Clear the search or switch the focus slice.
              </div>
            ) : null}

            <div className="mt-5 rounded-[24px] border border-black/10 bg-slate-950 px-5 py-4 text-white">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-slate-300">Focused slice summary</p>
                  <p className="mt-1 text-2xl font-semibold">{focusSummary.healthScore}/100 health</p>
                </div>
                <div className="grid gap-2 text-sm text-slate-300 sm:grid-cols-3">
                  <span>{formatTokens(focusSummary.totalToday)} in the last 24 hours</span>
                  <span>{focusSummary.atRisk} watch-listed operators</span>
                  <span>{formatTokens(focusSummary.totalBudget - focusSummary.totalUsed)} remaining budget</span>
                </div>
              </div>
            </div>
          </Panel>

          <div className="space-y-6">
            <Panel
              eyebrow="Program View"
              title="Department pressure map"
              description="A ranked view of which functions are closest to breaching their pooled cap."
            >
              <div className="space-y-4">
                {departmentPressure.map((item) => (
                  <DepartmentPressure key={item.department} {...item} />
                ))}
              </div>
            </Panel>

            <Panel
              eyebrow="Interventions"
              title="Immediate action queue"
              description="Recommended interventions generated from utilization, burn velocity, and recent activity."
            >
              <div className="space-y-3">
                {actionQueue.map((item) => {
                  const trend = trendFor(item);
                  return (
                    <div
                      key={item.id}
                      className="rounded-[22px] border border-black/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(247,243,235,0.85))] p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold text-slate-950">{item.name}</p>
                          <p className="mt-1 text-sm text-slate-600">
                            {item.department} · {item.workflow}
                          </p>
                        </div>
                        <span className={cn("rounded-full border px-3 py-1 text-xs font-semibold", riskTone(item.ratio).badge)}>
                          {riskTone(item.ratio).label}
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-slate-700">{item.action}</p>
                      <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
                        <span className="rounded-full bg-slate-950 px-3 py-1 font-semibold text-white">
                          {(item.ratio * 100).toFixed(1)}% utilized
                        </span>
                        <span className="rounded-full border border-black/10 bg-white/80 px-3 py-1">
                          {formatTokens(item.today)} today
                        </span>
                        <span className="rounded-full border border-black/10 bg-white/80 px-3 py-1">
                          {trend >= 0 ? "+" : "-"}
                          {Math.abs(trend).toFixed(0)}% vs yesterday
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Panel>

            <Panel
              eyebrow="Capacity Split"
              title="Model mix"
              description="Share of consumed tokens by model family across the program."
            >
              <div className="space-y-4">
                {modelMix.map((item, index) => (
                  <div key={item.name}>
                    <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "h-3 w-3 rounded-full",
                            index === 0
                              ? "bg-cyan-500"
                              : index === 1
                                ? "bg-orange-500"
                                : "bg-emerald-500",
                          )}
                        />
                        <span className="font-medium text-slate-900">{item.name}</span>
                      </div>
                      <span className="text-slate-600">
                        {Math.round(item.share * 100)}% · {formatTokens(item.total)}
                      </span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.share * 100}%` }}
                        transition={{ duration: 0.45, delay: index * 0.06 }}
                        className={cn(
                          "h-full rounded-full",
                          index === 0
                            ? "bg-cyan-500"
                            : index === 1
                              ? "bg-orange-500"
                              : "bg-emerald-500",
                        )}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        </section>

        <Panel
          eyebrow="Seven-Day Read"
          title="Burn velocity narrative"
          description="A weekly view of token pressure, paired with the signals that explain the current trajectory."
        >
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1.25fr)_320px]">
            <div>
              <BurnChart values={burnValues} />
              <div className="mt-4 grid grid-cols-7 gap-2 text-center text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                {WEEKLY_BURN.map((point) => (
                  <div key={point.day}>{point.day}</div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {[
                {
                  label: "Peak day",
                  value: "Friday",
                  detail: "Engineering and research batch jobs overlapped after release freeze lifted.",
                },
                {
                  label: "Best stabilizer",
                  value: "Claude Sonnet 4.6",
                  detail: "Highest spend share, but the flattest day-over-day growth across active teams.",
                },
                {
                  label: "Next move",
                  value: "Compress prompts",
                  detail: "Two over-cap teams can recover runway by shifting long reports into chunked generation.",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-[22px] border border-black/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(247,243,235,0.82))] p-4"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                    {item.label}
                  </p>
                  <p className="mt-2 text-xl font-semibold text-slate-950">{item.value}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </Panel>
      </div>
    </main>
  );
}
