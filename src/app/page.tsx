"use client";

import { motion } from "framer-motion";
import {
  ArrowsDownUp,
  ArrowUpRight,
  ArrowDownRight,
  BellRinging,
  ChartLineUp,
  ClockCounterClockwise,
  CreditCard,
  CurrencyCircleDollar,
  HouseLine,
  Lightning,
  SignOut,
  Sparkle,
  UsersThree,
  Wallet,
} from "@phosphor-icons/react";
import { useMemo, useState } from "react";

type Metric = {
  label: string;
  value: string;
  delta: string;
  positive: boolean;
  detail: string;
  icon: typeof CurrencyCircleDollar;
  tone: string;
};

type RevenuePoint = {
  label: string;
  revenue: number;
  target: number;
};

type Transaction = {
  id: string;
  date: string;
  client: string;
  type: string;
  amount: number;
  status: "Cleared" | "Pending" | "Review";
};

type SortKey = "date" | "client" | "type" | "amount" | "status";

const metrics: Metric[] = [
  {
    label: "Net revenue",
    value: "$482.6K",
    delta: "+14.8%",
    positive: true,
    detail: "vs last month",
    icon: CurrencyCircleDollar,
    tone: "from-[#133a52] to-[#2d7b76]",
  },
  {
    label: "New customers",
    value: "1,284",
    delta: "+9.2%",
    positive: true,
    detail: "acquisition velocity",
    icon: UsersThree,
    tone: "from-[#2d7b76] to-[#7ba68a]",
  },
  {
    label: "Avg. order value",
    value: "$318",
    delta: "-2.4%",
    positive: false,
    detail: "pricing softness",
    icon: Wallet,
    tone: "from-[#d3a349] to-[#c96e5c]",
  },
  {
    label: "Conversion rate",
    value: "6.84%",
    delta: "+1.1%",
    positive: true,
    detail: "checkout completion",
    icon: Lightning,
    tone: "from-[#133a52] to-[#d3a349]",
  },
];

const revenueSeries: RevenuePoint[] = [
  { label: "Jan", revenue: 96, target: 86 },
  { label: "Feb", revenue: 124, target: 94 },
  { label: "Mar", revenue: 118, target: 102 },
  { label: "Apr", revenue: 146, target: 114 },
  { label: "May", revenue: 168, target: 126 },
  { label: "Jun", revenue: 182, target: 139 },
  { label: "Jul", revenue: 176, target: 148 },
  { label: "Aug", revenue: 208, target: 158 },
  { label: "Sep", revenue: 232, target: 176 },
  { label: "Oct", revenue: 226, target: 184 },
  { label: "Nov", revenue: 248, target: 196 },
  { label: "Dec", revenue: 274, target: 212 },
];

const transactions: Transaction[] = [
  {
    id: "TX-2048",
    date: "2026-03-19",
    client: "Northstar Retail",
    type: "Enterprise renewal",
    amount: 18420,
    status: "Cleared",
  },
  {
    id: "TX-2047",
    date: "2026-03-18",
    client: "Field Notes Co.",
    type: "Expansion seats",
    amount: 6240,
    status: "Pending",
  },
  {
    id: "TX-2046",
    date: "2026-03-18",
    client: "Atelier Forma",
    type: "Annual contract",
    amount: 12960,
    status: "Cleared",
  },
  {
    id: "TX-2045",
    date: "2026-03-17",
    client: "Cinder Health",
    type: "Invoice adjustment",
    amount: 2480,
    status: "Review",
  },
  {
    id: "TX-2044",
    date: "2026-03-16",
    client: "Hinterland Labs",
    type: "New onboarding",
    amount: 8640,
    status: "Cleared",
  },
  {
    id: "TX-2043",
    date: "2026-03-15",
    client: "Orbit Goods",
    type: "Usage overage",
    amount: 3180,
    status: "Pending",
  },
];

const chartWidth = 760;
const chartHeight = 320;
const chartPadding = 28;

function buildLinePath(values: number[], maxValue: number) {
  return values
    .map((value, index) => {
      const x =
        chartPadding +
        (index * (chartWidth - chartPadding * 2)) / (values.length - 1);
      const y =
        chartHeight -
        chartPadding -
        (value / maxValue) * (chartHeight - chartPadding * 2);
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");
}

function buildAreaPath(values: number[], maxValue: number) {
  const linePath = buildLinePath(values, maxValue);
  const lastX = chartWidth - chartPadding;
  const baseline = chartHeight - chartPadding;
  return `${linePath} L ${lastX} ${baseline} L ${chartPadding} ${baseline} Z`;
}

function currency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function shortDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}

export default function Page() {
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const sortedTransactions = useMemo(() => {
    const sorted = [...transactions].sort((left, right) => {
      if (sortKey === "amount") {
        return left.amount - right.amount;
      }
      if (sortKey === "date") {
        return (
          new Date(left.date).getTime() - new Date(right.date).getTime()
        );
      }
      return left[sortKey].localeCompare(right[sortKey]);
    });

    return sortDirection === "asc" ? sorted : sorted.reverse();
  }, [sortDirection, sortKey]);

  const revenueValues = revenueSeries.map((point) => point.revenue);
  const targetValues = revenueSeries.map((point) => point.target);
  const maxValue = Math.max(...revenueValues, ...targetValues) * 1.15;
  const areaPath = buildAreaPath(revenueValues, maxValue);
  const linePath = buildLinePath(revenueValues, maxValue);
  const targetPath = buildLinePath(targetValues, maxValue);

  function toggleSort(nextKey: SortKey) {
    if (nextKey === sortKey) {
      setSortDirection((current) => (current === "asc" ? "desc" : "asc"));
      return;
    }

    setSortKey(nextKey);
    setSortDirection(nextKey === "date" || nextKey === "amount" ? "desc" : "asc");
  }

  return (
    <main className="dashboard-shell overflow-hidden px-4 py-4 text-[#1c1914] sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-[1600px] gap-4 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="panel-strong relative flex flex-col overflow-hidden rounded-[32px] p-5 lg:p-6">
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-br from-[#133a52] via-[#2d7b76] to-transparent opacity-90" />
          <div className="relative flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/88 shadow-[0_18px_45px_rgba(19,58,82,0.18)]">
              <Sparkle className="h-6 w-6 text-[#133a52]" weight="fill" />
            </div>
            <div>
              <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#f8efe4]/80">
                Taste Marker
              </p>
              <h1 className="mt-1 text-xl font-semibold text-white">
                Pulseboard
              </h1>
            </div>
          </div>

          <nav className="relative mt-8 space-y-2">
            {[
              { label: "Overview", icon: HouseLine, active: true },
              { label: "Performance", icon: ChartLineUp, active: false },
              { label: "Transactions", icon: CreditCard, active: false },
              { label: "Activity", icon: ClockCounterClockwise, active: false },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition ${
                    item.active
                      ? "bg-[#133a52] text-white shadow-[0_18px_35px_rgba(19,58,82,0.22)]"
                      : "text-[#3d372f] hover:bg-white/55"
                  }`}
                  type="button"
                >
                  <Icon className="h-5 w-5" weight={item.active ? "fill" : "regular"} />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="relative mt-8 rounded-[28px] bg-[#f7efe3] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
            <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[#7a6b58]">
              Forecast pulse
            </p>
            <p className="mt-3 text-3xl font-semibold text-[#133a52]">$54.2K</p>
            <p className="mt-2 text-sm text-[#6e6558]">
              Projected lift from repeat accounts over the next 14 days.
            </p>
            <div className="mt-4 flex items-center gap-2 text-sm text-[#2d7b76]">
              <ArrowUpRight className="h-4 w-4" weight="bold" />
              18% ahead of target
            </div>
          </div>

          <div className="relative mt-auto flex items-center gap-3 rounded-[24px] border border-[#133a52]/10 bg-white/70 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#133a52] text-sm font-semibold text-white">
              AL
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">Ari Lennox</p>
              <p className="truncate text-xs text-[#6e6558]">Revenue operations</p>
            </div>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#f1e8db] text-[#133a52] transition hover:bg-[#e7ddcf]"
              aria-label="Sign out"
            >
              <SignOut className="h-5 w-5" />
            </button>
          </div>
        </aside>

        <section className="panel-strong relative rounded-[32px] p-5 sm:p-6 lg:p-7">
          <div className="flex flex-col gap-5 border-b border-[#133a52]/10 pb-6 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#7a6b58]">
                Revenue intelligence
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-[#1c1914] sm:text-4xl">
                Analytics dashboard
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6e6558]">
                Daily commercial pulse across acquisition, revenue quality, and
                payment activity.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                className="flex items-center gap-2 rounded-2xl border border-[#133a52]/10 bg-white/70 px-4 py-3 text-sm font-medium text-[#133a52] transition hover:bg-white"
              >
                <BellRinging className="h-5 w-5" />
                Alerts
              </button>
              <div className="rounded-2xl bg-[#133a52] px-4 py-3 text-sm font-medium text-white shadow-[0_18px_40px_rgba(19,58,82,0.2)]">
                Updated 6 minutes ago
              </div>
            </div>
          </div>

          <motion.div
            className="mt-6 grid gap-4 md:grid-cols-2 2xl:grid-cols-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.08,
                },
              },
            }}
          >
            {metrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <motion.article
                  key={metric.label}
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="panel rounded-[28px] p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-[#6e6558]">{metric.label}</p>
                      <p className="mt-3 text-3xl font-semibold tracking-[-0.03em]">
                        {metric.value}
                      </p>
                    </div>
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${metric.tone} text-white shadow-[0_16px_36px_rgba(19,58,82,0.16)]`}
                    >
                      <Icon className="h-6 w-6" weight="duotone" />
                    </div>
                  </div>
                  <div className="mt-6 flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                        metric.positive
                          ? "bg-[#dcefe8] text-[#1f6c67]"
                          : "bg-[#f6dfd8] text-[#a75442]"
                      }`}
                    >
                      {metric.positive ? (
                        <ArrowUpRight className="h-3.5 w-3.5" weight="bold" />
                      ) : (
                        <ArrowDownRight className="h-3.5 w-3.5" weight="bold" />
                      )}
                      {metric.delta}
                    </span>
                    <span className="text-xs uppercase tracking-[0.2em] text-[#7a6b58]">
                      {metric.detail}
                    </span>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>

          <div className="mt-6 grid gap-4 xl:grid-cols-[minmax(0,1.6fr)_minmax(320px,0.9fr)]">
            <section className="panel rounded-[30px] p-5 sm:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#7a6b58]">
                    Revenue over time
                  </p>
                  <div className="mt-3 flex flex-wrap items-end gap-x-4 gap-y-2">
                    <h3 className="text-3xl font-semibold tracking-[-0.03em]">
                      $2.4M
                    </h3>
                    <p className="pb-1 text-sm text-[#2d7b76]">
                      +12.6% year to date
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-[#6e6558]">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#133a52]" />
                    Revenue
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full border border-[#2d7b76] bg-transparent" />
                    Plan
                  </div>
                </div>
              </div>

              <div className="mt-6 overflow-hidden rounded-[24px] border border-[#133a52]/8 bg-[linear-gradient(180deg,rgba(19,58,82,0.03),rgba(255,255,255,0.45))] p-3 sm:p-4">
                <svg
                  viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                  className="h-[320px] w-full"
                  role="img"
                  aria-label="Area chart showing monthly revenue versus plan"
                >
                  <defs>
                    <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2d7b76" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#2d7b76" stopOpacity="0.02" />
                    </linearGradient>
                  </defs>

                  <g className="chart-grid">
                    {[0, 1, 2, 3].map((step) => {
                      const y =
                        chartPadding +
                        (step * (chartHeight - chartPadding * 2)) / 3;
                      return (
                        <line
                          key={step}
                          x1={chartPadding}
                          x2={chartWidth - chartPadding}
                          y1={y}
                          y2={y}
                        />
                      );
                    })}
                  </g>

                  <path d={areaPath} fill="url(#areaFill)" />
                  <path
                    d={targetPath}
                    fill="none"
                    stroke="#2d7b76"
                    strokeDasharray="7 7"
                    strokeLinecap="round"
                    strokeWidth="3"
                    opacity="0.55"
                  />
                  <path
                    d={linePath}
                    fill="none"
                    stroke="#133a52"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="4"
                  />

                  {revenueSeries.map((point, index) => {
                    const x =
                      chartPadding +
                      (index * (chartWidth - chartPadding * 2)) /
                        (revenueSeries.length - 1);
                    const y =
                      chartHeight -
                      chartPadding -
                      (point.revenue / maxValue) * (chartHeight - chartPadding * 2);

                    return (
                      <g key={point.label}>
                        <circle cx={x} cy={y} r="5.5" fill="#fbf6ee" />
                        <circle cx={x} cy={y} r="3.5" fill="#133a52" />
                      </g>
                    );
                  })}

                  <g className="chart-axis">
                    {revenueSeries.map((point, index) => {
                      const x =
                        chartPadding +
                        (index * (chartWidth - chartPadding * 2)) /
                          (revenueSeries.length - 1);
                      return (
                        <text
                          key={point.label}
                          x={x}
                          y={chartHeight - 6}
                          textAnchor="middle"
                        >
                          {point.label}
                        </text>
                      );
                    })}
                  </g>
                </svg>
              </div>
            </section>

            <section className="panel rounded-[30px] p-5 sm:p-6">
              <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#7a6b58]">
                Today&apos;s signal
              </p>
              <div className="mt-4 rounded-[28px] bg-[#133a52] p-5 text-white shadow-[0_24px_50px_rgba(19,58,82,0.22)]">
                <p className="text-sm text-white/70">Expected collections</p>
                <div className="mt-3 flex items-end justify-between gap-3">
                  <p className="text-4xl font-semibold tracking-[-0.04em]">
                    $87.4K
                  </p>
                  <span className="rounded-full bg-white/12 px-3 py-1 text-sm">
                    24h
                  </span>
                </div>
                <p className="mt-4 text-sm leading-6 text-white/72">
                  Payment confidence remains high across enterprise renewals,
                  but one invoice cluster is drifting into manual review.
                </p>
              </div>

              <div className="mt-5 space-y-4">
                {[
                  {
                    label: "Renewal health",
                    value: "93%",
                    accent: "bg-[#dcefe8] text-[#1f6c67]",
                  },
                  {
                    label: "Pending payouts",
                    value: "12",
                    accent: "bg-[#f5e6c9] text-[#94651c]",
                  },
                  {
                    label: "Risk watchlist",
                    value: "3 accounts",
                    accent: "bg-[#f6dfd8] text-[#a75442]",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between rounded-[22px] border border-[#133a52]/8 bg-white/72 px-4 py-4"
                  >
                    <div>
                      <p className="text-sm font-medium">{item.label}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#7a6b58]">
                        live benchmark
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1.5 text-sm font-semibold ${item.accent}`}
                    >
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <section className="panel mt-6 rounded-[30px] p-5 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#7a6b58]">
                  Recent transactions
                </p>
                <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">
                  Payment activity
                </h3>
              </div>
              <p className="text-sm text-[#6e6558]">
                Click a column to sort. Active sort:{" "}
                <span className="font-medium capitalize text-[#133a52]">
                  {sortKey} {sortDirection}
                </span>
              </p>
            </div>

            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-0 text-left">
                <thead>
                  <tr>
                    {[
                      { key: "date", label: "Date" },
                      { key: "client", label: "Client" },
                      { key: "type", label: "Type" },
                      { key: "amount", label: "Amount" },
                      { key: "status", label: "Status" },
                    ].map((column) => (
                      <th
                        key={column.key}
                        className="border-b border-[#133a52]/10 px-4 py-3 first:pl-0 last:pr-0"
                      >
                        <button
                          type="button"
                          onClick={() => toggleSort(column.key as SortKey)}
                          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#7a6b58] transition hover:text-[#133a52]"
                        >
                          {column.label}
                          <ArrowsDownUp className="h-3.5 w-3.5" />
                        </button>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sortedTransactions.map((transaction) => (
                    <tr key={transaction.id} className="table-row transition">
                      <td className="border-b border-[#133a52]/8 px-4 py-4 first:pl-0">
                        <div className="text-sm font-medium">
                          {shortDate(transaction.date)}
                        </div>
                        <div className="mt-1 font-mono text-xs text-[#7a6b58]">
                          {transaction.id}
                        </div>
                      </td>
                      <td className="border-b border-[#133a52]/8 px-4 py-4">
                        <div className="text-sm font-medium">
                          {transaction.client}
                        </div>
                      </td>
                      <td className="border-b border-[#133a52]/8 px-4 py-4 text-sm text-[#6e6558]">
                        {transaction.type}
                      </td>
                      <td className="border-b border-[#133a52]/8 px-4 py-4 text-sm font-semibold text-[#133a52]">
                        {currency(transaction.amount)}
                      </td>
                      <td className="border-b border-[#133a52]/8 px-4 py-4 pr-0">
                        <span
                          className={`inline-flex rounded-full px-3 py-1.5 text-sm font-semibold ${
                            transaction.status === "Cleared"
                              ? "bg-[#dcefe8] text-[#1f6c67]"
                              : transaction.status === "Pending"
                                ? "bg-[#f5e6c9] text-[#94651c]"
                                : "bg-[#f6dfd8] text-[#a75442]"
                          }`}
                        >
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}
