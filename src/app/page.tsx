import {
  BellSimple,
  MagnifyingGlass,
  FunnelSimple,
  Circle,
  ArrowUpRight,
  ArrowDownLeft,
} from "@phosphor-icons/react";

const navItems = ["Overview", "Orders", "Products", "Customers", "Settings"];

const metrics = [
  {
    title: "Revenue",
    value: "$184,240",
    sub: "AI token bill this week",
    delta: "+12.6%",
    trend: "up",
  },
  {
    title: "Orders",
    value: "4,893",
    sub: "Completion requests",
    delta: "+8.1%",
    trend: "up",
  },
  {
    title: "Customers",
    value: "1,247",
    sub: "Active internal teams",
    delta: "+5.4%",
    trend: "up",
  },
  {
    title: "Avg Order Value",
    value: "$37.71",
    sub: "Mean token spend/order",
    delta: "-2.1%",
    trend: "down",
  },
];

const filters = ["All models", "GPT-5", "Claude Opus", "Gemini", "Llama 4"];

const orders = [
  {
    id: "AI-2047",
    employee: "Lena Ortiz",
    department: "Research",
    model: "gpt-5-turbo",
    tokens: "42,310",
    cost: "$11.52",
    status: "Completed",
  },
  {
    id: "AI-2048",
    employee: "Noah Patel",
    department: "Support",
    model: "Claude Opus 4",
    tokens: "27,905",
    cost: "$7.93",
    status: "Review",
  },
  {
    id: "AI-2049",
    employee: "Maya Chen",
    department: "Marketing",
    model: "Gemini 1.5",
    tokens: "61,122",
    cost: "$16.49",
    status: "Queued",
  },
  {
    id: "AI-2050",
    employee: "David Kim",
    department: "Legal",
    model: "GPT-4.1",
    tokens: "19,740",
    cost: "$5.11",
    status: "In Progress",
  },
  {
    id: "AI-2051",
    employee: "Sara López",
    department: "Finance",
    model: "Llama 4 Maverick",
    tokens: "33,664",
    cost: "$8.94",
    status: "Completed",
  },
];

export default function Page() {
  return (
    <div
      className="min-h-screen bg-[#f4f7ff] px-4 py-5 sm:px-6 md:px-8"
      style={{ fontFamily: "'Manrope', 'Inter', 'Avenir Next', 'Segoe UI', sans-serif" }}
    >
      <div className="grid gap-5 lg:grid-cols-[16rem_1fr]">
        <aside className="lg:sticky lg:top-6 lg:h-[calc(100vh-1.5rem)] rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur-sm">
          <div className="mb-8 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-500 p-4 text-white shadow-md">
            <p className="text-xs font-medium uppercase tracking-[0.22em]">Workspace</p>
            <p className="mt-2 text-xl font-semibold">Bloom & Co</p>
            <p className="mt-1 text-xs text-indigo-100">Employee AI Token Ops</p>
          </div>
          <nav aria-label="Main navigation">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className={`block rounded-xl px-4 py-3 text-sm font-medium transition ${
                      item === "Overview"
                        ? "bg-indigo-50 text-indigo-700"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className="space-y-6 pb-8">
          <header className="rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-600">
                  Dashboard
                </p>
                <h1 className="mt-1 text-2xl font-semibold text-slate-900 sm:text-3xl">
                  Bloom & Co
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                  Real-time AI token activity and cost visibility
                </p>
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700 transition hover:bg-indigo-100"
                aria-label="Notifications"
              >
                <BellSimple size={18} weight="bold" />
                Alerts
              </button>
            </div>
          </header>

          <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex flex-wrap items-center gap-3">
              <label
                htmlFor="search"
                className="relative flex min-w-[230px] flex-1 overflow-hidden rounded-xl border border-slate-200 bg-white px-3 py-2 focus-within:border-indigo-400"
              >
                <MagnifyingGlass size={18} className="mt-0.5 shrink-0 text-slate-400" />
                <input
                  id="search"
                  type="text"
                  placeholder="Search employees, order ID, department..."
                  className="w-full border-none bg-transparent px-2 text-sm outline-none placeholder:text-slate-400"
                />
              </label>

              <label
                htmlFor="filter"
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
              >
                <FunnelSimple size={16} className="text-slate-500" />
                <select
                  id="filter"
                  className="rounded-md border-none bg-transparent outline-none"
                  defaultValue={filters[0]}
                >
                  {filters.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>

              <div className="ml-auto flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600">
                <Circle size={8} weight="fill" className="text-emerald-500" />
                All environments live
              </div>
            </div>
          </section>

          <section
            className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
            aria-label="Key performance cards"
          >
            {metrics.map((metric) => (
              <article
                key={metric.title}
                className="rounded-3xl border border-slate-200 bg-white px-5 py-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  {metric.title}
                </p>
                <p className="mt-3 text-2xl font-semibold text-slate-900 sm:text-3xl">
                  {metric.value}
                </p>
                <p className="mt-2 text-sm text-slate-500">{metric.sub}</p>
                <p
                  className={`mt-4 inline-flex items-center gap-1 text-sm font-medium ${
                    metric.trend === "up" ? "text-emerald-600" : "text-rose-600"
                  }`}
                >
                  {metric.trend === "up" ? (
                    <ArrowUpRight size={16} weight="bold" />
                  ) : (
                    <ArrowDownLeft size={16} weight="bold" />
                  )}
                  {metric.delta} vs prior period
                </p>
              </article>
            ))}
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-slate-900">Recent Orders</h2>
              <button
                type="button"
                className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                View all
              </button>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-left">
                <thead>
                  <tr className="border-b border-slate-200 text-sm text-slate-500">
                    <th className="pb-3 pl-1 font-medium">Order</th>
                    <th className="pb-3 font-medium">Employee</th>
                    <th className="pb-3 font-medium">Department</th>
                    <th className="pb-3 font-medium">Model</th>
                    <th className="pb-3 font-medium">Tokens</th>
                    <th className="pb-3 font-medium">Cost</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-slate-100 last:border-b-0">
                      <td className="py-4 pl-1 text-sm text-slate-900">{order.id}</td>
                      <td className="py-4 text-sm text-slate-700">{order.employee}</td>
                      <td className="py-4 text-sm text-slate-700">{order.department}</td>
                      <td className="py-4 text-sm text-slate-700">{order.model}</td>
                      <td className="py-4 text-sm font-medium text-slate-900">{order.tokens}</td>
                      <td className="py-4 text-sm font-medium text-slate-900">{order.cost}</td>
                      <td className="py-4">
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${
                            order.status === "Completed"
                              ? "bg-emerald-100 text-emerald-700"
                              : order.status === "Queued"
                                ? "bg-amber-100 text-amber-700"
                                : order.status === "Review"
                                  ? "bg-indigo-100 text-indigo-700"
                                  : "bg-sky-100 text-sky-700"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
