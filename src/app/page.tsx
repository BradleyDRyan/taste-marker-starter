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
  { label: "Overview", icon: SquaresFour },
  { label: "Orders", icon: Package },
  { label: "Products", icon: Cube },
  { label: "Customers", icon: Users },
  { label: "Settings", icon: GearSix },
] as const;

const METRICS = [
  {
    label: "Revenue",
    value: "$24,860",
    detail: "Up 12% from last month with spring bouquet subscriptions leading growth.",
  },
  {
    label: "Orders",
    value: "318",
    detail: "27 orders are queued for same-day delivery before 4 PM pickup closes.",
  },
  {
    label: "Customers",
    value: "184",
    detail: "42 returning customers placed a second order in the last two weeks.",
  },
  {
    label: "Avg Order Value",
    value: "$78.18",
    detail: "Gift bundles and add-on candles pushed basket size above target this week.",
  },
] as const;

const recentOrders = [
  {
    order: "#1048",
    customer: "Maya Patel",
    date: "Mar 20, 2026",
    amount: "$142.00",
    status: "Completed",
  },
  {
    order: "#1047",
    customer: "Jordan Lee",
    date: "Mar 20, 2026",
    amount: "$68.50",
    status: "Processing",
  },
  {
    order: "#1046",
    customer: "Avery Nguyen",
    date: "Mar 19, 2026",
    amount: "$91.25",
    status: "Pending",
  },
  {
    order: "#1045",
    customer: "Sofia Ramirez",
    date: "Mar 19, 2026",
    amount: "$156.80",
    status: "Shipped",
  },
  {
    order: "#1044",
    customer: "Noah Bennett",
    date: "Mar 18, 2026",
    amount: "$47.00",
    status: "Cancelled",
  },
] as const;

function getStatusColors(status: (typeof recentOrders)[number]["status"]) {
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
    useState<(typeof NAV_ITEMS)[number]["label"]>("Overview");

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
          --lui-focus-ring-color: #1b1b1b;
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
          --lui-shadow-elevated: 0 1px 2px 0 rgb(0 0 0 / 0.05);
          --lui-app-content-inset: 8px;
          --lui-app-content-radius: 8px;
          --lui-app-content-shadow: 0 0 0 1px #e1e1e1, 0px 3px 6px -2px rgb(0 0 0 / 0.02);
          --lui-toolbar-height: 40px;
          --lui-toolbar-font: 14px;
          --lui-toolbar-font-weight: 500;
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
          --lui-dashboard-table-emphasis-font-weight: 500;
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
          --lui-spacing-page-x: 16px;
          --lui-spacing-page-y: 24px;
          --lui-line-height-tight: 1.1;
          --lui-line-height-body: 1.5;
        }

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
        }

        .appnavToggle,
        .appnavItem,
        .headerBell {
          border: 0;
          transition:
            background var(--lui-motion-duration-fast) var(--lui-motion-ease-standard),
            color var(--lui-motion-duration-fast) var(--lui-motion-ease-standard),
            box-shadow var(--lui-motion-duration-fast) var(--lui-motion-ease-standard);
        }

        .appnavToggle:hover,
        .appnavItem:hover,
        .headerBell:hover {
          background: var(--lui-appnav-states-hover-bg);
          color: var(--lui-appnav-item-active-fg);
        }

        .appnavToggle:focus-visible,
        .appnavItem:focus-visible,
        .headerBell:focus-visible {
          outline: none;
          box-shadow: inset 0 0 0 var(--lui-focus-ring-width) var(--lui-focus-ring-color);
        }

        .appnavItem[data-active="true"] {
          background: var(--lui-appnav-states-active-bg);
          color: var(--lui-appnav-item-active-fg);
        }

        .navLabel,
        .navBrand {
          overflow: hidden;
          white-space: nowrap;
          transition:
            opacity var(--lui-motion-duration-fast) var(--lui-motion-ease-standard),
            padding var(--lui-motion-duration-fast) var(--lui-motion-ease-standard);
        }

        .ordersTable tbody tr:last-child {
          border-bottom: 0;
        }
      `}</style>

      <div
        style={{
          display: "flex",
          height: "var(--lui-viewport-app-height)",
          overflow: "hidden",
          background: "var(--lui-chrome)",
          fontFamily: "var(--lui-font-sans)",
        }}
      >
        <nav
          aria-label="Primary"
          style={{
            flexShrink: 0,
            width: expanded
              ? "var(--lui-appnav-width-expanded)"
              : "var(--lui-appnav-width)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            gap: "var(--lui-appnav-section-gap)",
            padding:
              "var(--lui-appnav-shell-padding-y) var(--lui-appnav-rail-padding)",
            background: "var(--lui-appnav-bg)",
            transition: "width var(--lui-motion-duration-fast) var(--lui-motion-ease-standard)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: expanded ? "space-between" : "center",
              minHeight: "var(--lui-appnav-header-height)",
              gap: "var(--lui-appnav-item-gap)",
            }}
          >
            <div
              className="navBrand"
              style={{
                flex: expanded ? 1 : 0,
                opacity: expanded ? 1 : 0,
                paddingInline: expanded ? "var(--lui-appnav-logo-padding-x)" : 0,
                color: "var(--lui-appnav-header-color)",
                fontSize: "var(--lui-appnav-header-font)",
                fontWeight: "var(--lui-appnav-header-font-weight)",
              }}
            >
              Bloom and Co
            </div>
            <button
              type="button"
              className="appnavToggle"
              aria-label={expanded ? "Collapse navigation" : "Expand navigation"}
              onClick={() => setExpanded((value) => !value)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "var(--lui-appnav-item-size)",
                height: "var(--lui-appnav-item-size)",
                flexShrink: 0,
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
            }}
          >
            {NAV_ITEMS.map(({ label, icon: Icon }) => {
              const isActive = active === label;

              return (
                <button
                  key={label}
                  type="button"
                  className="appnavItem"
                  data-active={isActive}
                  title={expanded ? undefined : label}
                  onClick={() => setActive(label)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    height: "var(--lui-appnav-item-size)",
                    padding: 0,
                    borderRadius: "var(--lui-appnav-item-radius)",
                    background: "transparent",
                    color: isActive
                      ? "var(--lui-appnav-item-active-fg)"
                      : "var(--lui-appnav-item-fg)",
                    cursor: "pointer",
                  }}
                >
                  <span
                    style={{
                      width: "var(--lui-appnav-item-size)",
                      height: "var(--lui-appnav-item-size)",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon
                      size="var(--lui-appnav-icon-size)"
                      weight={isActive ? "fill" : "regular"}
                    />
                  </span>
                  <span
                    className="navLabel"
                    style={{
                      opacity: expanded ? 1 : 0,
                      color: "currentColor",
                      fontSize: "var(--lui-appnav-item-font)",
                      fontWeight: "var(--lui-appnav-item-font-weight)",
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
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            marginTop: "var(--lui-app-content-inset)",
            marginRight: "var(--lui-app-content-inset)",
            marginBottom: "var(--lui-app-content-inset)",
            borderRadius: "var(--lui-app-content-radius)",
            background: "var(--lui-content)",
            boxShadow: "var(--lui-app-content-shadow)",
          }}
        >
          <header
            style={{
              flexShrink: 0,
              height: "var(--lui-toolbar-height)",
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
                color: "var(--lui-text-primary)",
                fontSize: "var(--lui-toolbar-font)",
                fontWeight: "var(--lui-toolbar-font-weight)",
              }}
            >
              Bloom and Co
            </div>
            <button
              type="button"
              className="headerBell"
              aria-label="Notifications"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "var(--lui-appnav-item-size)",
                height: "var(--lui-appnav-item-size)",
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
              padding: "var(--lui-spacing-page-y) var(--lui-spacing-page-x)",
              display: "flex",
              flexDirection: "column",
              gap: "var(--lui-dashboard-section-gap)",
            }}
          >
            <section
              aria-label="Metrics"
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(var(--lui-dashboard-card-min-width), 1fr))",
                gap: "var(--lui-dashboard-grid-gap)",
              }}
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
                      color: "var(--lui-text-muted)",
                      fontSize: "var(--lui-dashboard-card-label-font)",
                      fontWeight: "var(--lui-dashboard-card-label-font-weight)",
                    }}
                  >
                    {metric.label}
                  </div>
                  <div
                    style={{
                      marginTop: "var(--lui-dashboard-card-value-gap)",
                      color: "var(--lui-text-primary)",
                      fontSize: "var(--lui-dashboard-card-value-font)",
                      fontWeight: "var(--lui-dashboard-card-value-font-weight)",
                      lineHeight: "var(--lui-line-height-tight)",
                    }}
                  >
                    {metric.value}
                  </div>
                  <p
                    style={{
                      margin: "var(--lui-dashboard-card-value-gap) 0 0",
                      color: "var(--lui-text-secondary)",
                      fontSize: "var(--lui-dashboard-table-cell-font)",
                      lineHeight: "var(--lui-line-height-body)",
                    }}
                  >
                    {metric.detail}
                  </p>
                </article>
              ))}
            </section>

            <section
              aria-labelledby="recent-orders-title"
              style={{
                borderRadius: "var(--lui-dashboard-card-radius)",
                border:
                  "var(--lui-border-width-subtle) solid var(--lui-surface-stroke)",
                background: "var(--lui-surface)",
                overflow: "hidden",
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
                    color: "var(--lui-text-primary)",
                    fontSize: "var(--lui-dashboard-table-title-font)",
                    fontWeight: "var(--lui-dashboard-table-title-font-weight)",
                  }}
                >
                  Recent orders
                </h2>
              </div>

              <div style={{ overflowX: "auto" }}>
                <table
                  className="ordersTable"
                  style={{
                    width: "100%",
                    minWidth: "var(--lui-dashboard-table-min-width)",
                    borderCollapse: "collapse",
                  }}
                >
                  <thead
                    style={{
                      borderBottom:
                        "var(--lui-border-width-subtle) solid var(--lui-surface-stroke)",
                    }}
                  >
                    <tr>
                      {["Order", "Customer", "Date", "Amount", "Status"].map(
                        (heading) => (
                          <th
                            key={heading}
                            scope="col"
                            style={{
                              padding:
                                "var(--lui-dashboard-table-head-padding-y) var(--lui-dashboard-table-head-padding-x)",
                              textAlign: "left",
                              color: "var(--lui-text-muted)",
                              fontSize: "var(--lui-dashboard-table-head-font)",
                              fontWeight:
                                "var(--lui-dashboard-table-head-font-weight)",
                            }}
                          >
                            {heading}
                          </th>
                        ),
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((row) => (
                      <tr
                        key={row.order}
                        style={{
                          borderBottom:
                            "var(--lui-border-width-subtle) solid var(--lui-surface-stroke)",
                        }}
                      >
                        <td
                          style={{
                            padding:
                              "var(--lui-dashboard-table-cell-padding-y) var(--lui-dashboard-table-cell-padding-x)",
                            color: "var(--lui-text-primary)",
                            fontSize: "var(--lui-dashboard-table-cell-font)",
                            fontWeight:
                              "var(--lui-dashboard-table-emphasis-font-weight)",
                          }}
                        >
                          {row.order}
                        </td>
                        <td
                          style={{
                            padding:
                              "var(--lui-dashboard-table-cell-padding-y) var(--lui-dashboard-table-cell-padding-x)",
                            color: "var(--lui-text-primary)",
                            fontSize: "var(--lui-dashboard-table-cell-font)",
                          }}
                        >
                          {row.customer}
                        </td>
                        <td
                          style={{
                            padding:
                              "var(--lui-dashboard-table-cell-padding-y) var(--lui-dashboard-table-cell-padding-x)",
                            color: "var(--lui-text-secondary)",
                            fontSize: "var(--lui-dashboard-table-cell-font)",
                          }}
                        >
                          {row.date}
                        </td>
                        <td
                          style={{
                            padding:
                              "var(--lui-dashboard-table-cell-padding-y) var(--lui-dashboard-table-cell-padding-x)",
                            color: "var(--lui-text-primary)",
                            fontSize: "var(--lui-dashboard-table-cell-font)",
                            fontWeight:
                              "var(--lui-dashboard-table-emphasis-font-weight)",
                          }}
                        >
                          {row.amount}
                        </td>
                        <td
                          style={{
                            padding:
                              "var(--lui-dashboard-table-cell-padding-y) var(--lui-dashboard-table-cell-padding-x)",
                            color: "var(--lui-text-secondary)",
                            fontSize: "var(--lui-dashboard-table-cell-font)",
                          }}
                        >
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              padding:
                                "var(--lui-dashboard-status-padding-y) var(--lui-dashboard-status-padding-x)",
                              borderRadius: "var(--lui-dashboard-status-radius)",
                              fontSize: "var(--lui-dashboard-status-font)",
                              fontWeight:
                                "var(--lui-dashboard-status-font-weight)",
                              ...getStatusColors(row.status),
                            }}
                          >
                            {row.status}
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
