"use client";

import { useState } from "react";
import {
  Bell,
  Cube,
  GearSix,
  Package,
  SidebarSimple,
  SquaresFour,
  Users,
  type Icon,
} from "@phosphor-icons/react";

const NAV_ITEMS = [
  { key: "overview", label: "Overview", icon: SquaresFour },
  { key: "orders", label: "Orders", icon: Package },
  { key: "products", label: "Products", icon: Cube },
  { key: "customers", label: "Customers", icon: Users },
  { key: "settings", label: "Settings", icon: GearSix },
] as const;

const METRICS = [
  {
    label: "Revenue",
    value: "$24,560",
    change: "+12.4% from last month",
  },
  {
    label: "Orders",
    value: "318",
    change: "+18 new today",
  },
  {
    label: "Customers",
    value: "1,284",
    change: "+7.1% returning rate",
  },
  {
    label: "Avg Order Value",
    value: "$77.23",
    change: "+$4.90 vs last month",
  },
] as const;

const recentOrders = [
  {
    id: "#1001",
    customer: "Jane Smith",
    date: "Mar 15, 2026",
    amount: "$142.00",
    status: "Completed",
  },
  {
    id: "#1002",
    customer: "Marcus Lee",
    date: "Mar 16, 2026",
    amount: "$89.50",
    status: "Processing",
  },
  {
    id: "#1003",
    customer: "Olivia Carter",
    date: "Mar 16, 2026",
    amount: "$214.75",
    status: "Pending",
  },
  {
    id: "#1004",
    customer: "Daniel Green",
    date: "Mar 17, 2026",
    amount: "$56.20",
    status: "Shipped",
  },
  {
    id: "#1005",
    customer: "Priya Patel",
    date: "Mar 18, 2026",
    amount: "$128.00",
    status: "Cancelled",
  },
] as const;

function getStatusStyle(status: string) {
  if (status === "Completed" || status === "Shipped") {
    return {
      background: "#dcfce7",
      color: "#15803d",
    };
  }

  if (status === "Processing" || status === "Pending") {
    return {
      background: "#fef3c7",
      color: "#a16207",
    };
  }

  return {
    background: "#fee2e2",
    color: "#dc2626",
  };
}

type NavItem = (typeof NAV_ITEMS)[number];

function NavButton({
  item,
  active,
  expanded,
  onClick,
}: {
  item: NavItem;
  active: boolean;
  expanded: boolean;
  onClick: () => void;
}) {
  const IconComponent: Icon = item.icon;

  return (
    <button
      aria-current={active ? "page" : undefined}
      onClick={onClick}
      title={expanded ? undefined : item.label}
      type="button"
      style={{
        alignItems: "center",
        background: active
          ? "var(--lui-appnav-states-active-bg)"
          : "transparent",
        border: "none",
        borderRadius: "var(--lui-appnav-item-radius)",
        color: active
          ? "var(--lui-appnav-item-active-fg)"
          : "var(--lui-appnav-item-fg)",
        cursor: "pointer",
        display: "flex",
        gap: expanded ? "10px" : "0px",
        height: "var(--lui-appnav-item-size)",
        overflow: "hidden",
        padding: 0,
        transition:
          "background 200ms ease, color 200ms ease, gap 200ms ease, transform 200ms ease",
        width: "100%",
      }}
    >
      <span
        style={{
          alignItems: "center",
          display: "inline-flex",
          flexShrink: 0,
          height: "var(--lui-appnav-item-size)",
          justifyContent: "center",
          width: "var(--lui-appnav-item-size)",
        }}
      >
        <IconComponent
          size={18}
          weight={active ? "fill" : "regular"}
          aria-hidden="true"
        />
      </span>
      <span
        style={{
          fontSize: "var(--lui-appnav-item-font)",
          fontWeight: "var(--lui-appnav-item-font-weight)",
          opacity: expanded ? 1 : 0,
          overflow: "hidden",
          textAlign: "left",
          transition: "opacity 200ms ease",
          whiteSpace: "nowrap",
        }}
      >
        {item.label}
      </span>
    </button>
  );
}

export default function Page() {
  const [expanded, setExpanded] = useState(true);
  const [active, setActive] = useState<NavItem["key"]>("overview");

  return (
    <div
      className="dashboard-root"
      style={{
        background: "var(--lui-chrome)",
        color: "var(--lui-text-primary)",
        display: "flex",
        fontFamily: "var(--lui-font-sans)",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <style>{`
        :root {
          --lui-chrome: #f3f3f4;
          --lui-content: #fcfcfd;
          --lui-surface: #ffffff;
          --lui-surface-stroke: #f0f0f0;
          --lui-surface-stroke-strong: #e1e1e1;
          --lui-text-primary: #1b1b1b;
          --lui-text-secondary: #5d5d5f;
          --lui-text-muted: #9e9ea1;
          --lui-icon: #9e9ea1;
          --lui-appnav-bg: transparent;
          --lui-appnav-header-color: #1b1b1b;
          --lui-appnav-item-fg: #5d5d5f;
          --lui-appnav-item-active-fg: #1b1b1b;
          --lui-appnav-states-hover-bg: #e1e1e1;
          --lui-appnav-states-active-bg: #e1e1e1;
          --lui-appnav-toggle-fg: #9e9ea1;
          --lui-appnav-width: 48px;
          --lui-appnav-width-expanded: 220px;
          --lui-appnav-item-size: 32px;
          --lui-appnav-icon-size: 18px;
          --lui-appnav-item-radius: 6px;
          --lui-appnav-rail-padding: 8px;
          --lui-appnav-shell-padding-y: 8px;
          --lui-appnav-item-gap: 1px;
          --lui-appnav-header-height: 32px;
          --lui-shadow-elevated: 0 1px 2px 0 rgb(0 0 0 / 0.05);
          --lui-app-content-inset: 8px;
          --lui-app-content-radius: 8px;
          --lui-app-content-shadow: 0 0 0 1px #e1e1e1, 0px 3px 6px -2px rgb(0 0 0 / 0.02);
          --lui-toolbar-height: 40px;
          --lui-font-sans: Inter, ui-sans-serif, system-ui, sans-serif;
          --lui-radius-md: 6px;
          --lui-radius-lg: 8px;
          --lui-appnav-logo-padding-x: 6px;
          --lui-appnav-header-font: 14px;
          --lui-appnav-header-font-weight: 500;
          --lui-appnav-section-gap: 4px;
          --lui-appnav-item-font: 13px;
          --lui-appnav-item-font-weight: 400;
          --lui-spacing-page-x: 16px;
          --lui-spacing-page-y: 24px;
          --lui-text-xs: 12px;
          --lui-text-sm: 14px;
          --lui-text-base: 16px;
          --lui-text-lg: 18px;
        }

        .dashboard-nav button:hover,
        .dashboard-bell:hover,
        .dashboard-toggle:hover {
          background: var(--lui-appnav-states-hover-bg);
          color: var(--lui-appnav-item-active-fg);
        }

        .metrics-grid {
          display: grid;
          gap: 16px;
          grid-template-columns: repeat(4, minmax(0, 1fr));
        }

        .orders-table {
          width: 100%;
          border-collapse: collapse;
        }

        .orders-table thead tr {
          border-bottom: 1px solid var(--lui-surface-stroke);
        }

        .orders-table tbody tr {
          border-bottom: 1px solid var(--lui-surface-stroke);
        }

        .orders-table tbody tr:last-child {
          border-bottom: none;
        }

        .orders-table th {
          color: var(--lui-text-muted);
          font-size: 12px;
          font-weight: 500;
          padding: 8px 16px;
          text-align: left;
        }

        .orders-table td {
          color: var(--lui-text-secondary);
          font-size: 13px;
          padding: 12px 16px;
        }

        .orders-table td[data-strong="true"] {
          color: var(--lui-text-primary);
          font-weight: 500;
        }

        @media (max-width: 1100px) {
          .metrics-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 760px) {
          .dashboard-root {
            flex-direction: column;
          }

          .dashboard-nav {
            width: 100% !important;
            padding-bottom: 0;
          }

          .dashboard-nav-inner {
            gap: 8px;
          }

          .dashboard-nav-items {
            display: grid;
            gap: 8px;
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .dashboard-content {
            margin: 0 8px 8px;
          }

          .metrics-grid {
            grid-template-columns: 1fr;
          }

          .orders-wrap {
            overflow-x: auto;
          }

          .orders-table {
            min-width: 640px;
          }
        }
      `}</style>

      <nav
        aria-label="Primary"
        className="dashboard-nav"
        style={{
          background: "var(--lui-appnav-bg)",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          overflow: "hidden",
          padding: "var(--lui-appnav-shell-padding-y) 0",
          transition: "width 200ms ease",
          width: expanded
            ? "var(--lui-appnav-width-expanded)"
            : "var(--lui-appnav-width)",
        }}
      >
        <div
          className="dashboard-nav-inner"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--lui-appnav-section-gap)",
            padding: `0 var(--lui-appnav-rail-padding)`,
          }}
        >
          <div
            style={{
              alignItems: "center",
              display: "flex",
              height: "var(--lui-appnav-header-height)",
            }}
          >
            <div
              aria-hidden={!expanded}
              style={{
                color: "var(--lui-appnav-header-color)",
                flex: 1,
                fontSize: "var(--lui-appnav-header-font)",
                fontWeight: "var(--lui-appnav-header-font-weight)",
                opacity: expanded ? 1 : 0,
                overflow: "hidden",
                paddingInline: expanded
                  ? "var(--lui-appnav-logo-padding-x)"
                  : "0px",
                transition: "opacity 200ms ease, padding 200ms ease",
                whiteSpace: "nowrap",
              }}
            >
              Bloom and Co
            </div>
            <button
              aria-label={expanded ? "Collapse navigation" : "Expand navigation"}
              className="dashboard-toggle"
              onClick={() => setExpanded((current) => !current)}
              type="button"
              style={{
                alignItems: "center",
                background: "transparent",
                border: "none",
                borderRadius: "var(--lui-appnav-item-radius)",
                color: "var(--lui-appnav-toggle-fg)",
                cursor: "pointer",
                display: "inline-flex",
                flexShrink: 0,
                height: "var(--lui-appnav-item-size)",
                justifyContent: "center",
                padding: 0,
                transition: "background 200ms ease, color 200ms ease",
                width: "var(--lui-appnav-item-size)",
              }}
            >
              <SidebarSimple
                aria-hidden="true"
                size={18}
                weight="regular"
              />
            </button>
          </div>

          <div
            className="dashboard-nav-items"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--lui-appnav-item-gap)",
            }}
          >
            {NAV_ITEMS.map((item) => (
              <NavButton
                key={item.key}
                item={item}
                active={active === item.key}
                expanded={expanded}
                onClick={() => setActive(item.key)}
              />
            ))}
          </div>
        </div>
      </nav>

      <div
        className="dashboard-content"
        style={{
          background: "var(--lui-content)",
          borderRadius: "var(--lui-app-content-radius)",
          boxShadow: "var(--lui-app-content-shadow)",
          display: "flex",
          flex: 1,
          flexDirection: "column",
          margin: "var(--lui-app-content-inset) var(--lui-app-content-inset) var(--lui-app-content-inset) 0",
          minWidth: 0,
          overflow: "hidden",
        }}
      >
        <header
          style={{
            alignItems: "center",
            background: "var(--lui-content)",
            borderBottom: "1px solid var(--lui-surface-stroke)",
            display: "flex",
            flexShrink: 0,
            height: "var(--lui-toolbar-height)",
            justifyContent: "space-between",
            padding: "0 16px",
          }}
        >
          <div
            style={{
              color: "var(--lui-text-primary)",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            Bloom and Co
          </div>
          <button
            aria-label="Notifications"
            className="dashboard-bell"
            type="button"
            style={{
              alignItems: "center",
              background: "transparent",
              border: "none",
              borderRadius: "var(--lui-radius-md)",
              color: "var(--lui-icon)",
              cursor: "pointer",
              display: "inline-flex",
              height: "32px",
              justifyContent: "center",
              padding: 0,
              transition: "background 200ms ease, color 200ms ease",
              width: "32px",
            }}
          >
            <Bell aria-hidden="true" size={18} weight="regular" />
          </button>
        </header>

        <main
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            gap: "24px",
            overflowY: "auto",
            padding: "24px 16px",
          }}
        >
          <section
            aria-label="Business metrics"
            className="metrics-grid"
          >
            {METRICS.map((metric) => (
              <article
                key={metric.label}
                style={{
                  background: "var(--lui-surface)",
                  border: "1px solid var(--lui-surface-stroke)",
                  borderRadius: "var(--lui-radius-lg)",
                  boxShadow: "var(--lui-shadow-elevated)",
                  padding: "16px",
                }}
              >
                <div
                  style={{
                    color: "var(--lui-text-muted)",
                    fontSize: "12px",
                    fontWeight: 500,
                  }}
                >
                  {metric.label}
                </div>
                <div
                  style={{
                    color: "var(--lui-text-primary)",
                    fontSize: "24px",
                    fontWeight: 600,
                    letterSpacing: "-0.03em",
                    marginTop: "6px",
                  }}
                >
                  {metric.value}
                </div>
                <div
                  style={{
                    color: "var(--lui-text-secondary)",
                    fontSize: "13px",
                    marginTop: "10px",
                  }}
                >
                  {metric.change}
                </div>
              </article>
            ))}
          </section>

          <section
            aria-labelledby="recent-orders-heading"
            style={{
              background: "var(--lui-surface)",
              border: "1px solid var(--lui-surface-stroke)",
              borderRadius: "var(--lui-radius-lg)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                alignItems: "center",
                borderBottom: "1px solid var(--lui-surface-stroke)",
                display: "flex",
                justifyContent: "space-between",
                padding: "16px",
              }}
            >
              <h2
                id="recent-orders-heading"
                style={{
                  color: "var(--lui-text-primary)",
                  fontSize: "14px",
                  fontWeight: 600,
                  margin: 0,
                }}
              >
                Recent Orders
              </h2>
              <span
                style={{
                  color: "var(--lui-text-muted)",
                  fontSize: "12px",
                }}
              >
                Last 5 transactions
              </span>
            </div>

            <div className="orders-wrap">
              <table className="orders-table">
                <thead>
                  <tr>
                    <th scope="col">Order</th>
                    <th scope="col">Customer</th>
                    <th scope="col">Date</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => {
                    const badgeStyle = getStatusStyle(order.status);

                    return (
                      <tr key={order.id}>
                        <td data-strong="true">{order.id}</td>
                        <td style={{ color: "var(--lui-text-primary)" }}>
                          {order.customer}
                        </td>
                        <td>{order.date}</td>
                        <td data-strong="true">{order.amount}</td>
                        <td>
                          <span
                            style={{
                              ...badgeStyle,
                              borderRadius: "4px",
                              display: "inline-flex",
                              fontSize: "11px",
                              fontWeight: 500,
                              padding: "2px 8px",
                            }}
                          >
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
