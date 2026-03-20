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
  {
    label: "Revenue",
    value: "$24,860",
    detail: "Up 12.4% from last month with spring arrangements leading sales.",
  },
  {
    label: "Orders",
    value: "318",
    detail: "26 orders are scheduled for delivery before the weekend rush.",
  },
  {
    label: "Customers",
    value: "184",
    detail: "42 returning shoppers placed repeat orders in the last 7 days.",
  },
  {
    label: "Avg Order Value",
    value: "$78.18",
    detail: "Gift bundles and add-on vases pushed basket size above target.",
  },
] as const;

const recentOrders = [
  {
    id: "#1048",
    customer: "Maya Patel",
    date: "Mar 19, 2026",
    amount: "$142.00",
    status: "Completed",
  },
  {
    id: "#1047",
    customer: "Jordan Lee",
    date: "Mar 19, 2026",
    amount: "$89.50",
    status: "Processing",
  },
  {
    id: "#1046",
    customer: "Ava Thompson",
    date: "Mar 18, 2026",
    amount: "$61.00",
    status: "Pending",
  },
  {
    id: "#1045",
    customer: "Noah Garcia",
    date: "Mar 18, 2026",
    amount: "$210.25",
    status: "Shipped",
  },
  {
    id: "#1044",
    customer: "Ella Nguyen",
    date: "Mar 17, 2026",
    amount: "$47.80",
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
  const [active, setActive] = useState<(typeof NAV_ITEMS)[number]["id"]>("overview");

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
        }

        .dashboardToggle,
        .dashboardNavItem,
        .dashboardBell {
          transition:
            background-color var(--lui-motion-duration-fast) var(--lui-motion-ease-standard),
            color var(--lui-motion-duration-fast) var(--lui-motion-ease-standard),
            box-shadow var(--lui-motion-duration-fast) var(--lui-motion-ease-standard);
        }

        .dashboardToggle:hover,
        .dashboardNavItem:hover,
        .dashboardBell:hover {
          background: var(--lui-appnav-states-hover-bg);
        }

        .dashboardToggle:hover,
        .dashboardBell:hover {
          color: var(--lui-appnav-item-active-fg);
        }

        .dashboardToggle:focus-visible,
        .dashboardNavItem:focus-visible,
        .dashboardBell:focus-visible {
          box-shadow: none;
          outline: var(--lui-focus-ring-width) solid var(--lui-focus-ring-color);
          outline-offset: var(--lui-focus-ring-offset-inset);
        }

        .dashboardNavItem[data-active="true"] {
          background: var(--lui-appnav-states-active-bg);
          color: var(--lui-appnav-item-active-fg);
        }

        .dashboardCard {
          min-width: var(--lui-dashboard-card-min-width);
        }

        .dashboardRow:last-child td {
          border-bottom: none;
        }
      `}</style>

      <div
        style={{
          background: "var(--lui-chrome)",
          display: "flex",
          fontFamily: "var(--lui-font-sans)",
          height: "var(--lui-viewport-app-height)",
          overflow: "hidden",
        }}
      >
        <nav
          aria-label="Primary"
          style={{
            background: "var(--lui-appnav-bg)",
            display: "flex",
            flexDirection: "column",
            flexShrink: 0,
            gap: "var(--lui-appnav-section-gap)",
            overflow: "hidden",
            paddingBlock: "var(--lui-appnav-shell-padding-y)",
            transition: `width var(--lui-motion-duration-fast) var(--lui-motion-ease-standard)`,
            width: expanded
              ? "var(--lui-appnav-width-expanded)"
              : "var(--lui-appnav-width)",
          }}
        >
          <div
            style={{
              alignItems: "center",
              display: "flex",
              gap: "var(--lui-appnav-item-gap)",
              height: "var(--lui-appnav-header-height)",
              paddingInline: "var(--lui-appnav-rail-padding)",
            }}
          >
            <div
              aria-hidden={!expanded}
              style={{
                color: "var(--lui-appnav-header-color)",
                flex: 1,
                fontSize: "var(--lui-appnav-header-font)",
                fontWeight: "var(--lui-appnav-header-font-weight)",
                opacity: expanded ? "1" : "0",
                overflow: "hidden",
                paddingInline: expanded
                  ? "var(--lui-appnav-logo-padding-x)"
                  : "0",
                transition:
                  "opacity var(--lui-motion-duration-fast) var(--lui-motion-ease-standard), padding var(--lui-motion-duration-fast) var(--lui-motion-ease-standard)",
                whiteSpace: "nowrap",
              }}
            >
              Bloom
            </div>

            <button
              aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
              className="dashboardToggle"
              onClick={() => setExpanded((value) => !value)}
              style={{
                alignItems: "center",
                background: "transparent",
                border: "none",
                borderRadius: "var(--lui-appnav-item-radius)",
                color: "var(--lui-appnav-toggle-fg)",
                cursor: "pointer",
                display: "flex",
                flexShrink: 0,
                height: "var(--lui-appnav-item-size)",
                justifyContent: "center",
                padding: "0",
                width: "var(--lui-appnav-item-size)",
              }}
              type="button"
            >
              <SidebarSimple
                size="var(--lui-appnav-icon-size)"
                weight="regular"
              />
            </button>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--lui-appnav-item-gap)",
              paddingInline: "var(--lui-appnav-rail-padding)",
            }}
          >
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = active === item.id;

              return (
                <button
                  key={item.id}
                  className="dashboardNavItem"
                  data-active={isActive}
                  onClick={() => setActive(item.id)}
                  style={{
                    alignItems: "center",
                    background: "transparent",
                    border: "none",
                    borderRadius: "var(--lui-appnav-item-radius)",
                    color: isActive
                      ? "var(--lui-appnav-item-active-fg)"
                      : "var(--lui-appnav-item-fg)",
                    cursor: "pointer",
                    display: "flex",
                    gap: "var(--lui-appnav-item-gap)",
                    height: "var(--lui-appnav-item-size)",
                    overflow: "hidden",
                    padding: "0",
                    textAlign: "left",
                    width: "100%",
                  }}
                  title={!expanded ? item.label : undefined}
                  type="button"
                >
                  <span
                    style={{
                      alignItems: "center",
                      display: "flex",
                      flexShrink: 0,
                      height: "var(--lui-appnav-item-size)",
                      justifyContent: "center",
                      width: "var(--lui-appnav-item-size)",
                    }}
                  >
                    <Icon
                      size="var(--lui-appnav-icon-size)"
                      weight={isActive ? "fill" : "regular"}
                    />
                  </span>
                  <span
                    style={{
                      fontSize: "var(--lui-appnav-item-font)",
                      fontWeight: "var(--lui-appnav-item-font-weight)",
                      opacity: expanded ? "1" : "0",
                      overflow: "hidden",
                      transition: `opacity var(--lui-motion-duration-fast) var(--lui-motion-ease-standard)`,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>

        <div
          style={{
            background: "var(--lui-content)",
            borderRadius: "var(--lui-app-content-radius)",
            boxShadow: "var(--lui-app-content-shadow)",
            display: "flex",
            flex: 1,
            flexDirection: "column",
            marginBottom: "var(--lui-app-content-inset)",
            marginLeft: "0",
            marginRight: "var(--lui-app-content-inset)",
            marginTop: "var(--lui-app-content-inset)",
            overflow: "hidden",
          }}
        >
          <header
            style={{
              alignItems: "center",
              background: "var(--lui-content)",
              borderBottom:
                "var(--lui-border-width-subtle) solid var(--lui-surface-stroke)",
              color: "var(--lui-text-primary)",
              display: "flex",
              flexShrink: 0,
              height: "var(--lui-toolbar-height)",
              justifyContent: "space-between",
              paddingInline: "var(--lui-spacing-page-x)",
            }}
          >
            <h1
              style={{
                fontSize: "var(--lui-toolbar-font)",
                fontWeight: "var(--lui-toolbar-font-weight)",
                margin: "0",
              }}
            >
              Bloom and Co
            </h1>

            <button
              aria-label="Notifications"
              className="dashboardBell"
              style={{
                alignItems: "center",
                background: "transparent",
                border: "none",
                borderRadius: "var(--lui-radius-md)",
                color: "var(--lui-icon)",
                cursor: "pointer",
                display: "flex",
                height: "var(--lui-appnav-item-size)",
                justifyContent: "center",
                padding: "0",
                width: "var(--lui-appnav-item-size)",
              }}
              type="button"
            >
              <Bell size="var(--lui-appnav-icon-size)" weight="regular" />
            </button>
          </header>

          <main
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              gap: "var(--lui-dashboard-section-gap)",
              overflowY: "auto",
              padding:
                "var(--lui-spacing-page-y) var(--lui-spacing-page-x)",
            }}
          >
            <section
              aria-label="Business metrics"
              style={{
                display: "grid",
                gap: "var(--lui-dashboard-grid-gap)",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(var(--lui-dashboard-card-min-width), 1fr))",
              }}
            >
              {METRICS.map((metric) => (
                <article
                  key={metric.label}
                  className="dashboardCard"
                  style={{
                    background: "var(--lui-surface)",
                    border:
                      "var(--lui-border-width-subtle) solid var(--lui-surface-stroke)",
                    borderRadius: "var(--lui-dashboard-card-radius)",
                    boxShadow: "var(--lui-shadow-elevated)",
                    padding: "var(--lui-dashboard-card-padding)",
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
                      color: "var(--lui-text-primary)",
                      fontSize: "var(--lui-dashboard-card-value-font)",
                      fontWeight: "var(--lui-dashboard-card-value-font-weight)",
                      marginTop: "var(--lui-dashboard-card-value-gap)",
                    }}
                  >
                    {metric.value}
                  </div>
                  <p
                    style={{
                      color: "var(--lui-text-secondary)",
                      fontSize: "var(--lui-dashboard-table-cell-font)",
                      margin: "var(--lui-dashboard-card-value-gap) 0 0",
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
                background: "var(--lui-surface)",
                border:
                  "var(--lui-border-width-subtle) solid var(--lui-surface-stroke)",
                borderRadius: "var(--lui-dashboard-card-radius)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  borderBottom:
                    "var(--lui-border-width-subtle) solid var(--lui-surface-stroke)",
                  padding: "var(--lui-dashboard-table-section-padding)",
                }}
              >
                <h2
                  id="recent-orders-title"
                  style={{
                    color: "var(--lui-text-primary)",
                    fontSize: "var(--lui-dashboard-table-title-font)",
                    fontWeight: "var(--lui-dashboard-table-title-font-weight)",
                    margin: "0",
                  }}
                >
                  Recent orders
                </h2>
              </div>

              <div style={{ overflowX: "auto" }}>
                <table
                  style={{
                    borderCollapse: "collapse",
                    minWidth: "var(--lui-dashboard-table-min-width)",
                    width: "100%",
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
                        (column) => (
                          <th
                            key={column}
                            scope="col"
                            style={{
                              color: "var(--lui-text-muted)",
                              fontSize: "var(--lui-dashboard-table-head-font)",
                              fontWeight:
                                "var(--lui-dashboard-table-head-font-weight)",
                              padding:
                                "var(--lui-dashboard-table-head-padding-y) var(--lui-dashboard-table-head-padding-x)",
                              textAlign: "left",
                            }}
                          >
                            {column}
                          </th>
                        ),
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => {
                      const statusColors = getStatusColors(order.status);

                      return (
                        <tr
                          key={order.id}
                          className="dashboardRow"
                          style={{
                            borderBottom:
                              "var(--lui-border-width-subtle) solid var(--lui-surface-stroke)",
                          }}
                        >
                          <td
                            style={{
                              color: "var(--lui-text-primary)",
                              fontSize: "var(--lui-dashboard-table-cell-font)",
                              fontWeight:
                                "var(--lui-dashboard-table-emphasis-font-weight)",
                              padding:
                                "var(--lui-dashboard-table-cell-padding-y) var(--lui-dashboard-table-cell-padding-x)",
                            }}
                          >
                            {order.id}
                          </td>
                          <td
                            style={{
                              color: "var(--lui-text-primary)",
                              fontSize: "var(--lui-dashboard-table-cell-font)",
                              padding:
                                "var(--lui-dashboard-table-cell-padding-y) var(--lui-dashboard-table-cell-padding-x)",
                            }}
                          >
                            {order.customer}
                          </td>
                          <td
                            style={{
                              color: "var(--lui-text-secondary)",
                              fontSize: "var(--lui-dashboard-table-cell-font)",
                              padding:
                                "var(--lui-dashboard-table-cell-padding-y) var(--lui-dashboard-table-cell-padding-x)",
                            }}
                          >
                            {order.date}
                          </td>
                          <td
                            style={{
                              color: "var(--lui-text-primary)",
                              fontSize: "var(--lui-dashboard-table-cell-font)",
                              fontWeight:
                                "var(--lui-dashboard-table-emphasis-font-weight)",
                              padding:
                                "var(--lui-dashboard-table-cell-padding-y) var(--lui-dashboard-table-cell-padding-x)",
                            }}
                          >
                            {order.amount}
                          </td>
                          <td
                            style={{
                              color: "var(--lui-text-secondary)",
                              fontSize: "var(--lui-dashboard-table-cell-font)",
                              padding:
                                "var(--lui-dashboard-table-cell-padding-y) var(--lui-dashboard-table-cell-padding-x)",
                            }}
                          >
                            <span
                              style={{
                                background: statusColors.background,
                                borderRadius: "var(--lui-dashboard-status-radius)",
                                color: statusColors.color,
                                display: "inline-flex",
                                fontSize: "var(--lui-dashboard-status-font)",
                                fontWeight:
                                  "var(--lui-dashboard-status-font-weight)",
                                padding:
                                  "var(--lui-dashboard-status-padding-y) var(--lui-dashboard-status-padding-x)",
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
    </>
  );
}
