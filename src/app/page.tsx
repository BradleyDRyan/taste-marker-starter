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
} from "@phosphor-icons/react";

const NAV_ITEMS = [
  { id: "overview", label: "Overview", icon: SquaresFour },
  { id: "orders", label: "Orders", icon: Package },
  { id: "products", label: "Products", icon: Cube },
  { id: "customers", label: "Customers", icon: Users },
  { id: "settings", label: "Settings", icon: GearSix },
] as const;

const METRICS = [
  { label: "Revenue", value: "$24,860", detail: "+12.4% from last month" },
  { label: "Orders", value: "318", detail: "+18 new orders today" },
  { label: "Customers", value: "1,284", detail: "+6.8% returning rate" },
  { label: "Avg Order Value", value: "$78.18", detail: "+4.1% from last month" },
] as const;

const RECENT_ORDERS = [
  {
    id: "#1001",
    customer: "Jane Smith",
    date: "Mar 15, 2026",
    amount: "$142.00",
    status: "Completed",
  },
  {
    id: "#1002",
    customer: "Carlos Diaz",
    date: "Mar 16, 2026",
    amount: "$89.50",
    status: "Processing",
  },
  {
    id: "#1003",
    customer: "Avery Johnson",
    date: "Mar 17, 2026",
    amount: "$214.20",
    status: "Pending",
  },
  {
    id: "#1004",
    customer: "Priya Patel",
    date: "Mar 18, 2026",
    amount: "$67.80",
    status: "Shipped",
  },
  {
    id: "#1005",
    customer: "Marcus Lee",
    date: "Mar 19, 2026",
    amount: "$156.40",
    status: "Cancelled",
  },
] as const;

function getStatusColors(status: (typeof RECENT_ORDERS)[number]["status"]) {
  if (status === "Completed" || status === "Shipped") {
    return {
      background: "var(--lui-status-success-bg)",
      color: "var(--lui-status-success-fg)",
    };
  }

  if (status === "Cancelled") {
    return {
      background: "var(--lui-status-danger-bg)",
      color: "var(--lui-status-danger-fg)",
    };
  }

  return {
    background: "var(--lui-status-warning-bg)",
    color: "var(--lui-status-warning-fg)",
  };
}

export default function Page() {
  const [expanded, setExpanded] = useState(true);
  const [active, setActive] =
    useState<(typeof NAV_ITEMS)[number]["id"]>("overview");

  return (
    <>
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
          --lui-status-success-bg: #dcfce7;
          --lui-status-success-fg: #166534;
          --lui-status-warning-bg: #fef3c7;
          --lui-status-warning-fg: #92400e;
          --lui-status-danger-bg: #fee2e2;
          --lui-status-danger-fg: #b91c1c;
          --lui-appnav-bg: transparent;
          --lui-appnav-header-color: #1b1b1b;
          --lui-appnav-item-fg: #5d5d5f;
          --lui-appnav-item-active-fg: #1b1b1b;
          --lui-appnav-states-hover-bg: #e1e1e1;
          --lui-appnav-states-active-bg: #e1e1e1;
          --lui-appnav-toggle-fg: #9e9ea1;
          --lui-shadow-elevated: 0 1px 2px 0 rgb(0 0 0 / 0.05);
          --lui-app-content-inset: 8px;
          --lui-app-content-radius: 8px;
          --lui-app-content-shadow: 0 0 0 1px #e1e1e1, 0px 3px 6px -2px rgb(0 0 0 / 0.02);
          --lui-toolbar-height: 40px;
          --lui-font-sans: Inter, ui-sans-serif, system-ui, sans-serif;
          --lui-radius-md: 6px;
          --lui-radius-lg: 8px;
          --lui-border-width-subtle: 1px;
          --lui-border-width-hairline: 0.5px;
          --lui-focus-ring-width: 2px;
          --lui-focus-ring-offset-inset: -2px;
          --lui-motion-duration-fast: 200ms;
          --lui-motion-ease-standard: ease;
          --lui-viewport-app-height: 100dvh;
          --lui-dashboard-section-gap: 24px;
          --lui-dashboard-grid-gap: 16px;
          --lui-dashboard-card-padding: 16px;
          --lui-dashboard-card-radius: 8px;
          --lui-dashboard-card-value-gap: 6px;
          --lui-dashboard-card-label-font: 12px;
          --lui-dashboard-card-label-font-weight: 500;
          --lui-dashboard-card-value-font: 24px;
          --lui-dashboard-card-value-font-weight: 600;
          --lui-dashboard-table-title-font: 14px;
          --lui-dashboard-table-title-font-weight: 600;
          --lui-dashboard-table-head-font: 12px;
          --lui-dashboard-table-head-font-weight: 500;
          --lui-dashboard-table-cell-font: 13px;
          --lui-dashboard-status-font: 11px;
          --lui-dashboard-status-font-weight: 500;
          --lui-dashboard-table-section-padding: 16px;
          --lui-dashboard-table-head-padding-y: 8px;
          --lui-dashboard-table-head-padding-x: 16px;
          --lui-dashboard-table-cell-padding-y: 12px;
          --lui-dashboard-table-cell-padding-x: 16px;
          --lui-dashboard-status-padding-y: 2px;
          --lui-dashboard-status-padding-x: 8px;
          --lui-dashboard-status-radius: 4px;
          --lui-dashboard-card-min-width: 180px;
          --lui-dashboard-table-min-width: 640px;
          --lui-appnav-width: 48px;
          --lui-appnav-width-expanded: 220px;
          --lui-appnav-item-size: 32px;
          --lui-appnav-icon-size: 18px;
          --lui-appnav-item-radius: 6px;
          --lui-appnav-rail-padding: 8px;
          --lui-appnav-shell-padding-y: 8px;
          --lui-appnav-item-gap: 1px;
          --lui-appnav-header-height: 32px;
          --lui-appnav-logo-padding-x: 6px;
          --lui-appnav-header-font: 14px;
          --lui-appnav-header-font-weight: 500;
          --lui-appnav-section-gap: 4px;
          --lui-appnav-item-font: 13px;
          --lui-appnav-item-font-weight: 400;
          --lui-spacing-page-x: 16px;
          --lui-spacing-page-y: 24px;
          --lui-toolbar-font: 14px;
        }

        * {
          box-sizing: border-box;
        }

        button {
          font: inherit;
        }

        .dashboard-metrics {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: var(--lui-dashboard-grid-gap);
        }

        .orders-shell {
          overflow-x: auto;
        }

        .focusable:focus-visible {
          outline: none;
          box-shadow: inset 0 0 0 calc(var(--lui-focus-ring-width) - var(--lui-focus-ring-offset-inset)) var(--lui-text-primary);
        }

        .nav-button:hover,
        .icon-button:hover {
          background: var(--lui-appnav-states-hover-bg);
          color: var(--lui-appnav-item-active-fg);
        }

        @media (max-width: 1100px) {
          .dashboard-metrics {
            grid-template-columns: repeat(2, minmax(var(--lui-dashboard-card-min-width), 1fr));
          }
        }

        @media (max-width: 720px) {
          .dashboard-shell {
            display: block;
            height: auto;
            min-height: var(--lui-viewport-app-height);
          }

          .dashboard-nav {
            width: 100% !important;
            border-bottom: var(--lui-border-width-subtle) solid var(--lui-surface-stroke);
            padding-bottom: var(--lui-appnav-shell-padding-y);
          }

          .dashboard-content {
            margin-left: var(--lui-app-content-inset);
          }

          .dashboard-metrics {
            grid-template-columns: minmax(0, 1fr);
          }
        }
      `}</style>
      <div
        className="dashboard-shell"
        style={{
          display: "flex",
          height: "var(--lui-viewport-app-height)",
          overflow: "hidden",
          background: "var(--lui-chrome)",
          fontFamily: "var(--lui-font-sans)",
          color: "var(--lui-text-primary)",
        }}
      >
        <nav
          className="dashboard-nav"
          aria-label="Primary"
          style={{
            width: expanded
              ? "var(--lui-appnav-width-expanded)"
              : "var(--lui-appnav-width)",
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            gap: "var(--lui-appnav-section-gap)",
            overflow: "hidden",
            background: "var(--lui-appnav-bg)",
            padding: "var(--lui-appnav-shell-padding-y) 0",
            transition:
              "width var(--lui-motion-duration-fast) var(--lui-motion-ease-standard)",
          }}
        >
          <div
            style={{
              height: "var(--lui-appnav-header-height)",
              display: "flex",
              alignItems: "center",
              padding: `0 var(--lui-appnav-rail-padding)`,
            }}
          >
            <div
              aria-hidden={!expanded}
              style={{
                flex: 1,
                overflow: "hidden",
                whiteSpace: "nowrap",
                opacity: expanded ? 1 : 0,
                paddingInline: expanded
                  ? "var(--lui-appnav-logo-padding-x)"
                  : "0",
                color: "var(--lui-appnav-header-color)",
                fontSize: "var(--lui-appnav-header-font)",
                fontWeight: "var(--lui-appnav-header-font-weight)",
                transition:
                  "opacity var(--lui-motion-duration-fast) var(--lui-motion-ease-standard), padding var(--lui-motion-duration-fast) var(--lui-motion-ease-standard)",
              }}
            >
              Bloom and Co
            </div>
            <button
              type="button"
              className="focusable icon-button"
              aria-label={expanded ? "Collapse navigation" : "Expand navigation"}
              onClick={() => setExpanded((value) => !value)}
              style={{
                width: "var(--lui-appnav-item-size)",
                height: "var(--lui-appnav-item-size)",
                flexShrink: 0,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                border: "none",
                borderRadius: "var(--lui-appnav-item-radius)",
                background: "transparent",
                color: "var(--lui-appnav-toggle-fg)",
                cursor: "pointer",
              }}
            >
              <SidebarSimple size="var(--lui-appnav-icon-size)" />
            </button>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--lui-appnav-item-gap)",
              padding: `0 var(--lui-appnav-rail-padding)`,
            }}
          >
            {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
              const isActive = active === id;

              return (
                <button
                  key={id}
                  type="button"
                  className="focusable nav-button"
                  title={!expanded ? label : undefined}
                  onClick={() => setActive(id)}
                  style={{
                    height: "var(--lui-appnav-item-size)",
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    overflow: "hidden",
                    border: "none",
                    borderRadius: "var(--lui-appnav-item-radius)",
                    background: isActive
                      ? "var(--lui-appnav-states-active-bg)"
                      : "transparent",
                    color: isActive
                      ? "var(--lui-appnav-item-active-fg)"
                      : "var(--lui-appnav-item-fg)",
                    cursor: "pointer",
                    transition:
                      "background var(--lui-motion-duration-fast) var(--lui-motion-ease-standard), color var(--lui-motion-duration-fast) var(--lui-motion-ease-standard)",
                  }}
                >
                  <span
                    style={{
                      width: "var(--lui-appnav-item-size)",
                      height: "var(--lui-appnav-item-size)",
                      flexShrink: 0,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon
                      size="var(--lui-appnav-icon-size)"
                      weight={isActive ? "fill" : "regular"}
                    />
                  </span>
                  <span
                    style={{
                      opacity: expanded ? 1 : 0,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      fontSize: "var(--lui-appnav-item-font)",
                      fontWeight: "var(--lui-appnav-item-font-weight)",
                      transition:
                        "opacity var(--lui-motion-duration-fast) var(--lui-motion-ease-standard)",
                    }}
                  >
                    {label}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>

        <div
          className="dashboard-content"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            marginTop: "var(--lui-app-content-inset)",
            marginRight: "var(--lui-app-content-inset)",
            marginBottom: "var(--lui-app-content-inset)",
            marginLeft: 0,
            borderRadius: "var(--lui-app-content-radius)",
            background: "var(--lui-content)",
            boxShadow: "var(--lui-app-content-shadow)",
          }}
        >
          <header
            style={{
              height: "var(--lui-toolbar-height)",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 var(--lui-spacing-page-x)",
              borderBottom:
                "var(--lui-border-width-subtle) solid var(--lui-surface-stroke)",
              background: "var(--lui-content)",
            }}
          >
            <div
              style={{
                fontSize: "var(--lui-toolbar-font)",
                fontWeight: 500,
                color: "var(--lui-text-primary)",
              }}
            >
              Bloom and Co
            </div>
            <button
              type="button"
              className="focusable icon-button"
              aria-label="Notifications"
              style={{
                width: "var(--lui-appnav-item-size)",
                height: "var(--lui-appnav-item-size)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                border: "none",
                borderRadius: "var(--lui-radius-md)",
                background: "transparent",
                color: "var(--lui-icon)",
                cursor: "pointer",
              }}
            >
              <Bell size="var(--lui-appnav-icon-size)" />
            </button>
          </header>

          <main
            style={{
              flex: 1,
              overflowY: "auto",
              padding:
                "var(--lui-spacing-page-y) var(--lui-spacing-page-x)",
              display: "flex",
              flexDirection: "column",
              gap: "var(--lui-dashboard-section-gap)",
            }}
          >
            <section
              aria-label="Business metrics"
              className="dashboard-metrics"
            >
              {METRICS.map((metric) => (
                <article
                  key={metric.label}
                  style={{
                    minWidth: "var(--lui-dashboard-card-min-width)",
                    padding: "var(--lui-dashboard-card-padding)",
                    borderRadius: "var(--lui-dashboard-card-radius)",
                    border:
                      "var(--lui-border-width-subtle) solid var(--lui-surface-stroke)",
                    background: "var(--lui-surface)",
                    boxShadow: "var(--lui-shadow-elevated)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "var(--lui-dashboard-card-label-font)",
                      fontWeight:
                        "var(--lui-dashboard-card-label-font-weight)",
                      color: "var(--lui-text-muted)",
                    }}
                  >
                    {metric.label}
                  </div>
                  <div
                    style={{
                      marginTop: "var(--lui-dashboard-card-value-gap)",
                      fontSize: "var(--lui-dashboard-card-value-font)",
                      fontWeight:
                        "var(--lui-dashboard-card-value-font-weight)",
                      color: "var(--lui-text-primary)",
                    }}
                  >
                    {metric.value}
                  </div>
                  <div
                    style={{
                      marginTop: "var(--lui-dashboard-card-value-gap)",
                      fontSize: "var(--lui-dashboard-table-cell-font)",
                      color: "var(--lui-text-secondary)",
                    }}
                  >
                    {metric.detail}
                  </div>
                </article>
              ))}
            </section>

            <section
              aria-labelledby="recent-orders-title"
              style={{
                background: "var(--lui-surface)",
                borderRadius: "var(--lui-dashboard-card-radius)",
                border:
                  "var(--lui-border-width-subtle) solid var(--lui-surface-stroke)",
                overflow: "hidden",
                boxShadow: "var(--lui-shadow-elevated)",
              }}
            >
              <div
                style={{
                  padding: "var(--lui-dashboard-table-section-padding)",
                  borderBottom:
                    "var(--lui-border-width-subtle) solid var(--lui-surface-stroke)",
                }}
              >
                <h2
                  id="recent-orders-title"
                  style={{
                    margin: 0,
                    fontSize: "var(--lui-dashboard-table-title-font)",
                    fontWeight:
                      "var(--lui-dashboard-table-title-font-weight)",
                    color: "var(--lui-text-primary)",
                  }}
                >
                  Recent Orders
                </h2>
              </div>
              <div className="orders-shell">
                <table
                  style={{
                    width: "100%",
                    minWidth: "var(--lui-dashboard-table-min-width)",
                    borderCollapse: "collapse",
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        borderBottom:
                          "var(--lui-border-width-subtle) solid var(--lui-surface-stroke)",
                      }}
                    >
                      {["Order", "Customer", "Date", "Amount", "Status"].map(
                        (heading) => (
                          <th
                            key={heading}
                            scope="col"
                            style={{
                              padding:
                                "var(--lui-dashboard-table-head-padding-y) var(--lui-dashboard-table-head-padding-x)",
                              textAlign: "left",
                              fontSize: "var(--lui-dashboard-table-head-font)",
                              fontWeight:
                                "var(--lui-dashboard-table-head-font-weight)",
                              color: "var(--lui-text-muted)",
                            }}
                          >
                            {heading}
                          </th>
                        ),
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {RECENT_ORDERS.map((order, index) => (
                      <tr
                        key={order.id}
                        style={{
                          borderBottom:
                            index === RECENT_ORDERS.length - 1
                              ? "none"
                              : "var(--lui-border-width-subtle) solid var(--lui-surface-stroke)",
                        }}
                      >
                        <td
                          style={{
                            padding:
                              "var(--lui-dashboard-table-cell-padding-y) var(--lui-dashboard-table-cell-padding-x)",
                            fontSize: "var(--lui-dashboard-table-cell-font)",
                            fontWeight: 500,
                            color: "var(--lui-text-primary)",
                          }}
                        >
                          {order.id}
                        </td>
                        <td
                          style={{
                            padding:
                              "var(--lui-dashboard-table-cell-padding-y) var(--lui-dashboard-table-cell-padding-x)",
                            fontSize: "var(--lui-dashboard-table-cell-font)",
                            color: "var(--lui-text-primary)",
                          }}
                        >
                          {order.customer}
                        </td>
                        <td
                          style={{
                            padding:
                              "var(--lui-dashboard-table-cell-padding-y) var(--lui-dashboard-table-cell-padding-x)",
                            fontSize: "var(--lui-dashboard-table-cell-font)",
                            color: "var(--lui-text-secondary)",
                          }}
                        >
                          {order.date}
                        </td>
                        <td
                          style={{
                            padding:
                              "var(--lui-dashboard-table-cell-padding-y) var(--lui-dashboard-table-cell-padding-x)",
                            fontSize: "var(--lui-dashboard-table-cell-font)",
                            fontWeight: 500,
                            color: "var(--lui-text-primary)",
                          }}
                        >
                          {order.amount}
                        </td>
                        <td
                          style={{
                            padding:
                              "var(--lui-dashboard-table-cell-padding-y) var(--lui-dashboard-table-cell-padding-x)",
                            fontSize: "var(--lui-dashboard-table-cell-font)",
                            color: "var(--lui-text-secondary)",
                          }}
                        >
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              padding:
                                "var(--lui-dashboard-status-padding-y) var(--lui-dashboard-status-padding-x)",
                              borderRadius:
                                "var(--lui-dashboard-status-radius)",
                              fontSize: "var(--lui-dashboard-status-font)",
                              fontWeight:
                                "var(--lui-dashboard-status-font-weight)",
                              ...getStatusColors(order.status),
                            }}
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
    </>
  );
}
