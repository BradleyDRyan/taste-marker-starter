"use client";

import {
  ArrowDownRight,
  ArrowUpRight,
  ChartLineUp,
  CirclesFour,
  ClockCounterClockwise,
  CreditCard,
  CurrencyDollar,
  FunnelSimple,
  GearSix,
  HouseLine,
  MagnifyingGlass,
  Package,
  Receipt,
  UsersThree,
} from "@phosphor-icons/react";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

type NavItem = {
  label: string;
  icon: React.ComponentType<{ size?: number; weight?: "fill" | "regular" }>;
  active?: boolean;
};

type Kpi = {
  label: string;
  value: string;
  change: string;
  positive: boolean;
  note: string;
  icon: React.ComponentType<{ size?: number; weight?: "fill" | "regular" }>;
};

type Transaction = {
  customer: string;
  company: string;
  amount: number;
  status: "Paid" | "Pending" | "Refunded";
  date: string;
  channel: string;
};

type SortKey = "customer" | "company" | "amount" | "status" | "date";

const navItems: NavItem[] = [
  { label: "Overview", icon: HouseLine, active: true },
  { label: "Performance", icon: ChartLineUp },
  { label: "Customers", icon: UsersThree },
  { label: "Orders", icon: Package },
  { label: "Billing", icon: CreditCard },
  { label: "Settings", icon: GearSix },
];

const kpis: Kpi[] = [
  {
    label: "Monthly revenue",
    value: "$184.2K",
    change: "+12.4%",
    positive: true,
    note: "vs. February",
    icon: CurrencyDollar,
  },
  {
    label: "Active subscriptions",
    value: "2,481",
    change: "+8.1%",
    positive: true,
    note: "healthy expansion",
    icon: CirclesFour,
  },
  {
    label: "Churn rate",
    value: "1.82%",
    change: "-0.6%",
    positive: true,
    note: "down week over week",
    icon: ClockCounterClockwise,
  },
  {
    label: "Outstanding invoices",
    value: "$24.9K",
    change: "+3.2%",
    positive: false,
    note: "needs attention",
    icon: Receipt,
  },
];

const chartData = [
  { month: "Jan", revenue: 84 },
  { month: "Feb", revenue: 96 },
  { month: "Mar", revenue: 92 },
  { month: "Apr", revenue: 118 },
  { month: "May", revenue: 126 },
  { month: "Jun", revenue: 121 },
  { month: "Jul", revenue: 139 },
  { month: "Aug", revenue: 148 },
  { month: "Sep", revenue: 156 },
  { month: "Oct", revenue: 168 },
  { month: "Nov", revenue: 164 },
  { month: "Dec", revenue: 182 },
];

const transactions: Transaction[] = [
  {
    customer: "Maya Patel",
    company: "Northstar Labs",
    amount: 14820,
    status: "Paid",
    date: "Mar 18, 2026",
    channel: "Invoice",
  },
  {
    customer: "Jordan Kim",
    company: "Harbor Health",
    amount: 9320,
    status: "Pending",
    date: "Mar 17, 2026",
    channel: "Card",
  },
  {
    customer: "Elena Rossi",
    company: "Aster Collective",
    amount: 6710,
    status: "Refunded",
    date: "Mar 16, 2026",
    channel: "ACH",
  },
  {
    customer: "Noah Williams",
    company: "Pioneer Freight",
    amount: 21540,
    status: "Paid",
    date: "Mar 15, 2026",
    channel: "Wire",
  },
  {
    customer: "Ava Johnson",
    company: "Cinder Studio",
    amount: 11880,
    status: "Pending",
    date: "Mar 14, 2026",
    channel: "Card",
  },
  {
    customer: "Leo Martinez",
    company: "Summit Bio",
    amount: 17460,
    status: "Paid",
    date: "Mar 12, 2026",
    channel: "Invoice",
  },
];

const statusClasses: Record<Transaction["status"], string> = {
  Paid: "bg-[var(--positive-soft)] text-[var(--positive)]",
  Pending: "bg-[rgba(173,124,31,0.14)] text-[var(--warning)]",
  Refunded: "bg-[var(--negative-soft)] text-[var(--negative)]",
};

function buildChartPath(values: typeof chartData, height: number, width: number) {
  const max = Math.max(...values.map((value) => value.revenue));
  const min = Math.min(...values.map((value) => value.revenue));
  const range = max - min || 1;

  const points = values.map((point, index) => {
    const x = (index / (values.length - 1)) * width;
    const normalized = (point.revenue - min) / range;
    const y = height - normalized * (height - 16) - 8;
    return [x, y] as const;
  });

  const line = points
    .map(([x, y], index) => `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`)
    .join(" ");

  const area = `${line} L ${width} ${height} L 0 ${height} Z`;

  return { points, line, area };
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

function sortValue(row: Transaction, key: SortKey) {
  if (key === "amount") return row.amount;
  if (key === "date") return new Date(row.date).getTime();
  return row[key].toLowerCase();
}

export function DashboardShell() {
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const { area, line, points } = useMemo(
    () => buildChartPath(chartData, 260, 760),
    [],
  );

  const sortedTransactions = useMemo(() => {
    const sorted = [...transactions].sort((left, right) => {
      const a = sortValue(left, sortKey);
      const b = sortValue(right, sortKey);

      if (a < b) return sortDirection === "asc" ? -1 : 1;
      if (a > b) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [sortDirection, sortKey]);

  function handleSort(nextKey: SortKey) {
    if (nextKey === sortKey) {
      setSortDirection((current) => (current === "asc" ? "desc" : "asc"));
      return;
    }

    setSortKey(nextKey);
    setSortDirection(nextKey === "date" || nextKey === "amount" ? "desc" : "asc");
  }

  return (
    <main className="min-h-screen p-4 text-[var(--text)] md:p-6">
      <div className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-[1500px] overflow-hidden rounded-[32px] border border-[var(--line)] bg-[var(--panel)] shadow-[var(--shadow)] backdrop-blur md:grid-cols-[260px_minmax(0,1fr)] md:p-2">
        <aside className="border-b border-[var(--line)] bg-[linear-gradient(180deg,rgba(255,250,243,0.92),rgba(246,240,232,0.88))] px-5 py-6 md:border-b-0 md:border-r md:px-6">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--text)] text-[var(--panel-strong)]">
              <ChartLineUp size={22} weight="fill" />
            </div>
            <div>
              <p className="text-[0.7rem] uppercase tracking-[0.24em] text-[var(--muted)]">
                Northstar OS
              </p>
              <h1 className="text-xl font-semibold tracking-[-0.04em]">
                Revenue cockpit
              </h1>
            </div>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  type="button"
                  className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition hover:bg-white/60 ${
                    item.active
                      ? "bg-[var(--text)] text-white shadow-lg"
                      : "text-[var(--muted)]"
                  }`}
                >
                  <Icon size={20} weight={item.active ? "fill" : "regular"} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="mt-8 rounded-[28px] border border-[var(--line)] bg-[rgba(255,255,255,0.68)] p-5">
            <p className="text-[0.7rem] uppercase tracking-[0.24em] text-[var(--muted)]">
              Weekly target
            </p>
            <p className="mt-3 text-3xl font-semibold tracking-[-0.05em]">$42.8K</p>
            <p className="mt-2 text-sm text-[var(--muted)]">
              You are at 87% of this week&apos;s forecasted collections.
            </p>
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-[var(--background-strong)]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "87%" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full rounded-full bg-[linear-gradient(90deg,#0f766e,#14b8a6)]"
              />
            </div>
          </div>
        </aside>

        <section className="min-w-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.6),rgba(255,250,243,0.78))] p-5 md:p-6">
          <header className="flex flex-col gap-4 border-b border-[var(--line)] pb-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[0.72rem] uppercase tracking-[0.24em] text-[var(--muted)]">
                Friday, March 20
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.06em] md:text-4xl">
                Analytics dashboard
              </h2>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <label className="flex items-center gap-3 rounded-2xl border border-[var(--line)] bg-white/70 px-4 py-3 text-sm text-[var(--muted)]">
                <MagnifyingGlass size={18} />
                <input
                  aria-label="Search transactions"
                  placeholder="Search reports"
                  className="w-full bg-transparent text-[var(--text)] outline-none placeholder:text-[color:var(--muted)] sm:min-w-52"
                />
              </label>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[var(--line)] bg-white/70 px-4 py-3 text-sm font-medium text-[var(--text)]"
              >
                <FunnelSimple size={18} />
                Filters
              </button>
            </div>
          </header>

          <section className="mt-6 grid gap-4 lg:grid-cols-4">
            {kpis.map((kpi, index) => {
              const Icon = kpi.icon;
              const positive = kpi.positive;
              return (
                <motion.article
                  key={kpi.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.45 }}
                  className="rounded-[28px] border border-[var(--line)] bg-[var(--panel-strong)] p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-[var(--muted)]">{kpi.label}</p>
                      <p className="mt-3 text-3xl font-semibold tracking-[-0.05em]">
                        {kpi.value}
                      </p>
                    </div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
                      <Icon size={22} weight="fill" />
                    </div>
                  </div>
                  <div className="mt-6 flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                        positive
                          ? "bg-[var(--positive-soft)] text-[var(--positive)]"
                          : "bg-[var(--negative-soft)] text-[var(--negative)]"
                      }`}
                    >
                      {positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                      {kpi.change}
                    </span>
                    <span className="text-sm text-[var(--muted)]">{kpi.note}</span>
                  </div>
                </motion.article>
              );
            })}
          </section>

          <section className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.8fr)]">
            <motion.article
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="overflow-hidden rounded-[30px] border border-[var(--line)] bg-[var(--panel-strong)]"
            >
              <div className="flex flex-col gap-3 border-b border-[var(--line)] px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[0.72rem] uppercase tracking-[0.24em] text-[var(--muted)]">
                    Revenue trajectory
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-[-0.05em]">
                    Growth across the last 12 months
                  </h3>
                </div>
                <div className="rounded-full bg-[var(--accent-soft)] px-3 py-1.5 text-sm font-medium text-[var(--accent)]">
                  +28.6% annualized
                </div>
              </div>

              <div className="p-5">
                <div className="mb-4 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-sm text-[var(--muted)]">Revenue</p>
                    <p className="text-4xl font-semibold tracking-[-0.06em]">$1.59M</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-[var(--muted)]">Forecast accuracy</p>
                    <p className="font-mono text-lg">96.4%</p>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-[28px] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(15,118,110,0.07),rgba(255,255,255,0.25))] p-4">
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.25),transparent_30%,transparent_70%,rgba(255,255,255,0.2))]" />
                  <svg
                    viewBox="0 0 760 260"
                    className="relative z-10 h-[260px] w-full"
                    role="img"
                    aria-label="Revenue area chart"
                  >
                    <defs>
                      <linearGradient id="areaFill" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#0f766e" stopOpacity="0.34" />
                        <stop offset="100%" stopColor="#0f766e" stopOpacity="0.03" />
                      </linearGradient>
                    </defs>

                    {[0, 1, 2, 3].map((lineIndex) => (
                      <line
                        key={lineIndex}
                        x1="0"
                        x2="760"
                        y1={32 + lineIndex * 56}
                        y2={32 + lineIndex * 56}
                        stroke="rgba(111, 90, 63, 0.12)"
                        strokeDasharray="6 8"
                      />
                    ))}

                    <path d={area} fill="url(#areaFill)" />
                    <path
                      d={line}
                      fill="none"
                      stroke="#0f766e"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />

                    {points.map(([x, y], index) => (
                      <g key={chartData[index].month}>
                        <circle cx={x} cy={y} r="7" fill="#fffaf3" stroke="#0f766e" strokeWidth="3" />
                        <text
                          x={x}
                          y="248"
                          textAnchor="middle"
                          fill="#6f5a3f"
                          fontSize="13"
                          fontFamily="var(--font-mono)"
                        >
                          {chartData[index].month}
                        </text>
                      </g>
                    ))}
                  </svg>
                </div>
              </div>
            </motion.article>

            <motion.aside
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22 }}
              className="space-y-6"
            >
              <div className="rounded-[30px] border border-[var(--line)] bg-[var(--panel-strong)] p-5">
                <p className="text-[0.72rem] uppercase tracking-[0.24em] text-[var(--muted)]">
                  Conversion mix
                </p>
                <div className="mt-4 space-y-4">
                  {[
                    { label: "Enterprise", share: "48%", width: "48%", color: "#0f766e" },
                    { label: "Growth", share: "31%", width: "31%", color: "#ea580c" },
                    { label: "Self-serve", share: "21%", width: "21%", color: "#7c3aed" },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="text-[var(--muted)]">{item.label}</span>
                        <span className="font-mono text-[var(--text)]">{item.share}</span>
                      </div>
                      <div className="h-2 rounded-full bg-[var(--background-strong)]">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: item.width }}
                          transition={{ duration: 0.7, ease: "easeOut" }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[30px] border border-[var(--line)] bg-[linear-gradient(180deg,#1f1a14,#2f2419)] p-5 text-white">
                <p className="text-[0.72rem] uppercase tracking-[0.24em] text-white/55">
                  Executive note
                </p>
                <p className="mt-4 text-xl font-semibold tracking-[-0.04em]">
                  Collections are accelerating faster than pipeline creation.
                </p>
                <p className="mt-3 text-sm leading-6 text-white/70">
                  Focus next week on new expansion deals to avoid over-reliance on late-quarter closes.
                </p>
              </div>
            </motion.aside>
          </section>

          <section className="mt-6 rounded-[30px] border border-[var(--line)] bg-[var(--panel-strong)]">
            <div className="flex flex-col gap-3 border-b border-[var(--line)] px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[0.72rem] uppercase tracking-[0.24em] text-[var(--muted)]">
                  Recent transactions
                </p>
                <h3 className="mt-2 text-2xl font-semibold tracking-[-0.05em]">
                  Cash movement and billing activity
                </h3>
              </div>
              <div className="rounded-full border border-[var(--line)] px-3 py-1.5 text-sm text-[var(--muted)]">
                Sorted by {sortKey} ({sortDirection})
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-[var(--line)] text-sm text-[var(--muted)]">
                    {[
                      ["customer", "Customer"],
                      ["company", "Company"],
                      ["amount", "Amount"],
                      ["status", "Status"],
                      ["date", "Date"],
                    ].map(([key, label]) => {
                      const typedKey = key as SortKey;
                      const active = typedKey === sortKey;

                      return (
                        <th key={key} className="px-5 py-4 font-medium">
                          <button
                            type="button"
                            onClick={() => handleSort(typedKey)}
                            className={`inline-flex items-center gap-2 rounded-full px-2 py-1 transition ${
                              active ? "bg-[var(--accent-soft)] text-[var(--accent)]" : ""
                            }`}
                          >
                            {label}
                            <span className="font-mono text-xs">
                              {active ? (sortDirection === "asc" ? "↑" : "↓") : "↕"}
                            </span>
                          </button>
                        </th>
                      );
                    })}
                    <th className="px-5 py-4 font-medium">Channel</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence initial={false}>
                    {sortedTransactions.map((transaction) => (
                      <motion.tr
                        key={`${transaction.customer}-${transaction.date}`}
                        layout
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.22 }}
                        className="border-b border-[var(--line)] last:border-b-0"
                      >
                        <td className="px-5 py-4">
                          <div className="font-medium">{transaction.customer}</div>
                        </td>
                        <td className="px-5 py-4 text-[var(--muted)]">{transaction.company}</td>
                        <td className="px-5 py-4 font-mono">{formatCurrency(transaction.amount)}</td>
                        <td className="px-5 py-4">
                          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusClasses[transaction.status]}`}>
                            {transaction.status}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-[var(--muted)]">{transaction.date}</td>
                        <td className="px-5 py-4 text-[var(--muted)]">{transaction.channel}</td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}
