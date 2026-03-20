"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

type EmployeeUsage = {
  id: string;
  name: string;
  role: string;
  department: string;
  model: string;
  tokensUsed: number;
  tokenBudget: number;
  today: number;
  yesterday: number;
  activeMinutes: number;
  lastActiveMinutes: number;
  lastActive: string;
};

const EMPLOYEES: EmployeeUsage[] = [
  {
    id: "e1",
    name: "Avery Monroe",
    role: "AI Product Analyst",
    department: "Analytics",
    model: "gpt-4.1",
    tokensUsed: 148_300,
    tokenBudget: 180_000,
    today: 9_800,
    yesterday: 8_200,
    activeMinutes: 470,
    lastActiveMinutes: 7,
    lastActive: "7 min ago",
  },
  {
    id: "e2",
    name: "Maya Chen",
    role: "Customer Success",
    department: "Support",
    model: "gpt-4.1",
    tokensUsed: 61_120,
    tokenBudget: 90_000,
    today: 2_200,
    yesterday: 2_550,
    activeMinutes: 315,
    lastActiveMinutes: 15,
    lastActive: "15 min ago",
  },
  {
    id: "e3",
    name: "Daniel Ortiz",
    role: "Staff Engineer",
    department: "Engineering",
    model: "gpt-5.4",
    tokensUsed: 204_900,
    tokenBudget: 220_000,
    today: 16_100,
    yesterday: 13_000,
    activeMinutes: 560,
    lastActiveMinutes: 3,
    lastActive: "3 min ago",
  },
  {
    id: "e4",
    name: "Priya Nair",
    role: "Data Scientist",
    department: "Research",
    model: "gpt-5.4",
    tokensUsed: 229_400,
    tokenBudget: 210_000,
    today: 18_000,
    yesterday: 14_300,
    activeMinutes: 620,
    lastActiveMinutes: 1,
    lastActive: "1 min ago",
  },
  {
    id: "e5",
    name: "Noah Brooks",
    role: "Engineering Manager",
    department: "Engineering",
    model: "gpt-4.1",
    tokensUsed: 82_300,
    tokenBudget: 110_000,
    today: 3_500,
    yesterday: 2_900,
    activeMinutes: 410,
    lastActiveMinutes: 22,
    lastActive: "22 min ago",
  },
  {
    id: "e6",
    name: "Lena Vogt",
    role: "Content Strategist",
    department: "Marketing",
    model: "gpt-4.1",
    tokensUsed: 44_900,
    tokenBudget: 60_000,
    today: 1_450,
    yesterday: 1_620,
    activeMinutes: 255,
    lastActiveMinutes: 52,
    lastActive: "52 min ago",
  },
  {
    id: "e7",
    name: "Rafael Kim",
    role: "Operations Lead",
    department: "Operations",
    model: "gpt-5.4",
    tokensUsed: 174_600,
    tokenBudget: 160_000,
    today: 12_900,
    yesterday: 11_100,
    activeMinutes: 488,
    lastActiveMinutes: 9,
    lastActive: "9 min ago",
  },
  {
    id: "e8",
    name: "Evelyn Reed",
    role: "Compliance Analyst",
    department: "Legal",
    model: "gpt-4.1",
    tokensUsed: 37_200,
    tokenBudget: 50_000,
    today: 1_180,
    yesterday: 930,
    activeMinutes: 190,
    lastActiveMinutes: 60,
    lastActive: "1h ago",
  },
  {
    id: "e9",
    name: "Tariq Ahmed",
    role: "Product Designer",
    department: "Design",
    model: "gpt-4.1",
    tokensUsed: 56_000,
    tokenBudget: 65_000,
    today: 2_900,
    yesterday: 2_600,
    activeMinutes: 333,
    lastActiveMinutes: 27,
    lastActive: "27 min ago",
  },
  {
    id: "e10",
    name: "Lila Morgan",
    role: "Recruiter",
    department: "HR",
    model: "gpt-4.1",
    tokensUsed: 31_600,
    tokenBudget: 40_000,
    today: 860,
    yesterday: 1_070,
    activeMinutes: 140,
    lastActiveMinutes: 120,
    lastActive: "2h ago",
  },
  {
    id: "e11",
    name: "Ivan Petrov",
    role: "Sales Operations",
    department: "Sales",
    model: "gpt-5.4",
    tokensUsed: 116_400,
    tokenBudget: 130_000,
    today: 4_000,
    yesterday: 3_700,
    activeMinutes: 404,
    lastActiveMinutes: 5,
    lastActive: "5 min ago",
  },
  {
    id: "e12",
    name: "Sofia Almeida",
    role: "Finance Analyst",
    department: "Finance",
    model: "gpt-4.1",
    tokensUsed: 52_100,
    tokenBudget: 95_000,
    today: 1_780,
    yesterday: 1_920,
    activeMinutes: 271,
    lastActiveMinutes: 44,
    lastActive: "44 min ago",
  },
];

const DAILY_SPARKLINE = [48, 70, 62, 78, 84, 74, 88];

const SORT_OPTIONS = {
  utilization: "Highest Utilization",
  tokens: "Highest Tokens",
  activity: "Most Active",
  recency: "Latest Active",
} as const;

type SortKey = keyof typeof SORT_OPTIONS;

function formatTokens(value: number): string {
  return `${(value / 1000).toFixed(1)}k`;
}

function utilizationColor(ratio: number): string {
  if (ratio >= 0.95) return "from-rose-500 to-red-400";
  if (ratio >= 0.8) return "from-amber-400 to-orange-400";
  return "from-emerald-400 to-lime-300";
}

function statusFromRatio(ratio: number): { label: string; tone: string } {
  if (ratio >= 0.95) return { label: "Critical", tone: "text-rose-200 bg-rose-950/80 border-rose-500/60" };
  if (ratio >= 0.85) return { label: "Watch", tone: "text-amber-200 bg-amber-950/80 border-amber-500/60" };
  return { label: "Healthy", tone: "text-emerald-200 bg-emerald-950/80 border-emerald-500/60" };
}

function percentTrend(now: number, then: number): number {
  const delta = now - then;
  return then === 0 ? 0 : (delta / then) * 100;
}

function trendColor(trend: number): string {
  return trend >= 0 ? "text-rose-200" : "text-emerald-200";
}

function formatRecency(minutes: number): string {
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} min ago`;
  return `${Math.floor(minutes / 60)}h ago`;
}

export default function EmployeeTokenDashboard() {
  const [departmentFilter, setDepartmentFilter] = useState<string>("All");
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<SortKey>("utilization");

  const departments = useMemo(() => {
    const unique = new Set(EMPLOYEES.map((employee) => employee.department));
    return ["All", ...Array.from(unique).sort((a, b) => a.localeCompare(b))];
  }, []);

  const employees = useMemo(() => {
    const rows = EMPLOYEES.filter((employee) => {
      const matchesDepartment =
        departmentFilter === "All" || employee.department === departmentFilter;
      const matchesSearch = `${employee.name} ${employee.role} ${employee.department}`
        .toLowerCase()
        .includes(search.trim().toLowerCase());
      return matchesDepartment && matchesSearch;
    }).sort((a, b) => {
      if (sort === "utilization") {
        return b.tokensUsed / b.tokenBudget - a.tokensUsed / a.tokenBudget;
      }
      if (sort === "tokens") {
        return b.tokensUsed - a.tokensUsed;
      }
      if (sort === "activity") {
        return b.activeMinutes - a.activeMinutes;
      }
      return a.lastActiveMinutes - b.lastActiveMinutes;
    });
    return rows;
  }, [departmentFilter, search, sort]);

  const summary = useMemo(() => {
    const totalUsed = EMPLOYEES.reduce((acc, row) => acc + row.tokensUsed, 0);
    const totalBudget = EMPLOYEES.reduce((acc, row) => acc + row.tokenBudget, 0);
    const totalToday = EMPLOYEES.reduce((acc, row) => acc + row.today, 0);
    const utilization = totalUsed / totalBudget;
    const atRisk = EMPLOYEES.filter(
      (row) => row.tokensUsed / row.tokenBudget >= 0.85,
    ).length;
    const critical = EMPLOYEES.filter(
      (row) => row.tokensUsed / row.tokenBudget >= 0.95,
    ).length;
    const projectedMonthly = totalToday * 30;
    return {
      totalUsed,
      totalBudget,
      utilization,
      atRisk,
      critical,
      projectedMonthly,
      totalEmployees: EMPLOYEES.length,
    };
  }, []);

  const departmentUsage = useMemo(() => {
    const totals = new Map<string, { used: number; budget: number }>();
    for (const row of EMPLOYEES) {
      const bucket = totals.get(row.department) ?? { used: 0, budget: 0 };
      totals.set(row.department, {
        used: bucket.used + row.tokensUsed,
        budget: bucket.budget + row.tokenBudget,
      });
    }
    return Array.from(totals.entries())
      .map(([department, value]) => ({
        department,
        ratio: value.used / value.budget,
        used: value.used,
        budget: value.budget,
      }))
      .sort((a, b) => b.ratio - a.ratio);
  }, []);

  const topRisks = [...EMPLOYEES]
    .map((employee) => ({
      ...employee,
      ratio: employee.tokensUsed / employee.tokenBudget,
      trend: percentTrend(employee.today, employee.yesterday),
    }))
    .sort((a, b) => b.ratio - a.ratio)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-6 px-4 py-8 md:px-8">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="rounded-3xl border border-slate-700/40 bg-slate-900/90 p-6 shadow-2xl backdrop-blur md:p-8"
        >
          <p className="mb-2 inline-flex rounded-full border border-indigo-400/50 bg-indigo-500/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-indigo-200">
            Token Operations
          </p>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold text-white sm:text-4xl">
                Employee Token Usage Dashboard
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-300">
                Monitor real-time spend, identify risks, and keep model usage within
                department-level thresholds with one operational view.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-700/60 bg-slate-950/80 px-4 py-2 text-xs text-slate-200">
              <p className="text-slate-400">Status</p>
              <p className="text-lg font-semibold text-emerald-300">
                All systems monitoring
              </p>
            </div>
          </div>
        </motion.section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              title: "Pool Utilization",
              value: `${(summary.utilization * 100).toFixed(1)}%`,
              description: `${formatTokens(summary.totalUsed)} / ${formatTokens(summary.totalBudget)} tokens`,
              tone: "from-cyan-400/30 to-cyan-600/10",
            },
            {
              title: "Daily Throughput",
              value: `${formatTokens(summary.totalToday)}`,
              description: "Used in current 24h window",
              tone: "from-indigo-400/30 to-indigo-600/10",
            },
            {
              title: "Projected Month",
              value: `${formatTokens(summary.projectedMonthly)}`,
              description: "Extrapolated from today",
              tone: "from-violet-400/30 to-violet-600/10",
            },
            {
              title: "Risk Employees",
              value: `${summary.atRisk} / ${summary.totalEmployees}`,
              description: `${summary.critical} critical threshold`,
              tone: "from-amber-400/30 to-amber-600/10",
            },
          ].map((card) => (
            <motion.div
              key={card.title}
              whileHover={{ y: -4 }}
              className={`rounded-2xl border border-slate-700/60 bg-gradient-to-br ${card.tone} p-5`}
            >
              <p className="text-sm text-slate-300">{card.title}</p>
              <p className="mt-3 text-3xl font-semibold text-white">{card.value}</p>
              <p className="mt-1 text-xs text-slate-200">{card.description}</p>
            </motion.div>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(0,.9fr)]">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
            className="rounded-3xl border border-slate-700/50 bg-slate-900/75 p-5"
          >
            <header className="mb-4 flex flex-wrap gap-3">
              <h2 className="text-lg font-semibold text-white">Employee Utilization</h2>
              <p className="ml-auto text-xs text-slate-300">
                Showing {employees.length} filtered employees
              </p>
            </header>
            <div className="flex flex-wrap items-center gap-3">
              <label className="inline-flex min-w-52 flex-1 items-center rounded-xl border border-slate-700/60 bg-slate-950/80 px-3 py-2 text-sm text-slate-200">
                <span className="mr-2 text-slate-400">🔎</span>
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search name, role, department"
                  className="w-full border-none bg-transparent outline-none placeholder:text-slate-400"
                />
              </label>
              <select
                value={departmentFilter}
                onChange={(event) => setDepartmentFilter(event.target.value)}
                className="rounded-xl border border-slate-700/60 bg-slate-950/80 px-3 py-2 text-sm text-slate-100 outline-none"
              >
                {departments.map((department) => (
                  <option value={department} key={department}>
                    {department}
                  </option>
                ))}
              </select>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value as SortKey)}
                className="rounded-xl border border-slate-700/60 bg-slate-950/80 px-3 py-2 text-sm text-slate-100 outline-none"
              >
                {Object.entries(SORT_OPTIONS).map(([value, label]) => (
                  <option value={value} key={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-800 text-left text-slate-400">
                    <th className="px-2 py-2 font-medium">Employee</th>
                    <th className="px-2 py-2 font-medium">Department</th>
                    <th className="px-2 py-2 font-medium">Model</th>
                    <th className="px-2 py-2 font-medium">Usage</th>
                    <th className="px-2 py-2 font-medium">Utilization</th>
                    <th className="px-2 py-2 font-medium">24h Trend</th>
                    <th className="px-2 py-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => {
                    const ratio = employee.tokensUsed / employee.tokenBudget;
                    const status = statusFromRatio(ratio);
                    const trend = percentTrend(employee.today, employee.yesterday);
                    return (
                      <tr
                        key={employee.id}
                        className="border-b border-slate-800/80 hover:bg-slate-800/20"
                      >
                        <td className="px-2 py-3">
                          <div>
                            <p className="font-medium text-slate-100">{employee.name}</p>
                            <p className="text-xs text-slate-400">{employee.role}</p>
                          </div>
                        </td>
                        <td className="px-2 py-3 text-slate-300">{employee.department}</td>
                        <td className="px-2 py-3 text-slate-300">{employee.model}</td>
                        <td className="px-2 py-3">
                          <p>{formatTokens(employee.tokensUsed)} / {formatTokens(employee.tokenBudget)}</p>
                          <p className="text-xs text-slate-400">
                            {formatRecency(employee.lastActiveMinutes)}
                          </p>
                        </td>
                        <td className="w-56 px-2 py-3">
                          <div className="mb-1 flex items-center justify-between text-xs text-slate-300">
                            <span>{(ratio * 100).toFixed(1)}%</span>
                            <span>{employee.activeMinutes}m active</span>
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${Math.min(100, ratio * 100)}%` }}
                              transition={{ duration: 0.55 }}
                              className={`h-full rounded-full bg-gradient-to-r ${utilizationColor(ratio)}`}
                            />
                          </div>
                        </td>
                        <td className={`px-2 py-3 ${trendColor(trend)}`}>
                          <span className="inline-flex items-center rounded-full border border-slate-700/40 px-2 py-1">
                            {trend >= 0 ? `▲ +${trend.toFixed(0)}%` : `▼ ${trend.toFixed(0)}%`}
                          </span>
                        </td>
                        <td className="px-2 py-3">
                          <span className={`rounded-full border px-2 py-1 text-xs ${status.tone}`}>
                            {status.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45 }}
              className="rounded-3xl border border-slate-700/50 bg-slate-900/75 p-5"
            >
              <h2 className="text-lg font-semibold text-white">Department risk by utilization</h2>
              <p className="mt-1 text-xs text-slate-300">
                Budget pressure by function over pooled monthly allocation.
              </p>
              <div className="mt-4 space-y-3">
                {departmentUsage.map((item) => {
                  const utilizationPct = Math.round(item.ratio * 100);
                  return (
                    <div key={item.department}>
                      <div className="mb-1 flex justify-between text-xs text-slate-300">
                        <span>{item.department}</span>
                        <span>{formatTokens(item.used)} / {formatTokens(item.budget)}</span>
                      </div>
                      <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(100, utilizationPct)}%` }}
                          transition={{ duration: 0.5 }}
                          className={`h-full rounded-full bg-gradient-to-r ${utilizationColor(item.ratio)}`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55 }}
              className="rounded-3xl border border-slate-700/50 bg-slate-900/75 p-5"
            >
              <h2 className="text-lg font-semibold text-white">7-day token burn</h2>
              <div className="mt-6 flex h-40 items-end justify-between gap-2">
                {DAILY_SPARKLINE.map((value, index) => (
                  <div key={index} className="flex-1">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${value}%` }}
                      transition={{ duration: 0.35, delay: index * 0.03 }}
                      className="w-full rounded-md bg-gradient-to-t from-blue-500 to-cyan-300"
                    />
                  </div>
                ))}
              </div>
              <p className="mt-2 text-xs text-slate-400">
                Relative daily spend index (Mon to Sun)
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65 }}
              className="rounded-3xl border border-slate-700/50 bg-slate-900/75 p-5"
            >
              <h2 className="text-lg font-semibold text-white">Top 3 risk highlights</h2>
              <ul className="mt-3 space-y-3">
                {topRisks.map((employee) => (
                  <li
                    key={employee.id}
                    className="rounded-xl border border-slate-700/50 bg-slate-950/60 p-3"
                  >
                    <p className="text-sm text-slate-100">{employee.name}</p>
                    <p className="text-xs text-slate-400">
                      {employee.department} · {(employee.ratio * 100).toFixed(1)}%
                    </p>
                    <p className="mt-1 text-xs text-amber-200">
                      Consumed {formatTokens(employee.tokensUsed)} • Today {formatTokens(employee.today)}
                    </p>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  );
}
