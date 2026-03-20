"use client";

import {
  Bell,
  Cube,
  GearSix,
  Package,
  SidebarSimple,
  SquaresFour,
  Users,
} from "@phosphor-icons/react";
import { useState } from "react";

const NAV_ITEMS = [
  { id: "overview", label: "Overview", icon: SquaresFour },
  { id: "orders", label: "Orders", icon: Package },
  { id: "products", label: "Products", icon: Cube },
  { id: "customers", label: "Customers", icon: Users },
  { id: "settings", label: "Settings", icon: GearSix },
] as const;

const METRICS = [
  { label: "Revenue", value: "$18,420", change: "+12.4% vs last month" },
  { label: "Orders", value: "248", change: "+18 new this week" },
  { label: "Customers", value: "1,184", change: "+56 returning shoppers" },
  { label: "Avg Order Value", value: "$74.27", change: "+$6.12 from February" },
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
    customer: "Marcus Lee",
    date: "Mar 16, 2026",
    amount: "$89.50",
    status: "Processing",
  },
  {
    id: "#1003",
    customer: "Olivia Carter",
    date: "Mar 17, 2026",
    amount: "$214.20",
    status: "Pending",
  },
  {
    id: "#1004",
    customer: "Noah Patel",
    date: "Mar 18, 2026",
    amount: "$61.75",
    status: "Shipped",
  },
  {
    id: "#1005",
    customer: "Sophia Nguyen",
    date: "Mar 19, 2026",
    amount: "$37.99",
    status: "Cancelled",
  },
] as const;

function getStatusStyles(status: (typeof RECENT_ORDERS)[number]["status"]) {
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
  const [active, setActive] = useState("overview");

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
          --lui-appnav-width: 48px;
          --lui-appnav-width-expanded: 220px;
          --lui-appnav-item-size: 32px;
          --lui-appnav-icon-size: 18px;
          --lui-appnav-item-radius: 6px;
          --lui-appnav-rail-padding: 8px;
          --lui-appnav-shell-padding-y: 8px;
          --lui-appnav-item-gap: 1px;
          --lui-appnav-header-height: 32px;
          --lui-appnav-header-font: 14px;
          --lui-appnav-header-font-weight: 500;
          --lui-appnav-logo-padding-x: 6px;
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
          --lui-spacing-page-x: 16px;
          --lui-spacing-page-y: 24px;
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
          --lui-dashboard-table-strong-font-weight: 500;
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
        }

        .app-nav-toggle:hover,
        .app-nav-item:hover,
        .header-icon-button:hover {
          background: var(--lui-appnav-states-hover-bg);
          color: var(--lui-appnav-item-active-fg);
        }

        .app-nav-toggle:focus-visible,
        .app-nav-item:focus-visible,
        .header-icon-button:focus-visible {
          outline: 2px solid var(--lui-appnav-item-active-fg);
          outline-offset: -2px;
        }
      `}</style>
      <div
        style={{
          display: "flex",
          height: "100vh",
          overflow: "hidden",
          background: "var(--lui-chrome)",
          fontFamily: "var(--lui-font-sans)",
        }}
      >
        <nav
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
            padding: "var(--lui-appnav-shell-padding-y) 0",
            background: "var(--lui-appnav-bg)",
            transition: "width 200ms ease",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "var(--lui-appnav-header-height)",
              padding: `0 var(--lui-appnav-rail-padding)`,
            }}
          >
            <div
              style={{
                flex: 1,
                minWidth: 0,
                overflow: "hidden",
                whiteSpace: "nowrap",
                opacity: expanded ? 1 : 0,
                paddingLeft: expanded ? "var(--lui-appnav-logo-padding-x)" : "0",
                paddingRight: expanded ? "var(--lui-appnav-logo-padding-x)" : "0",
                color: "var(--lui-appnav-header-color)",
                fontSize: "var(--lui-appnav-header-font)",
                fontWeight: "var(--lui-appnav-header-font-weight)",
                transition: "opacity 200ms ease, padding 200ms ease",
              }}
            >
              Bloom and Co
            </div>
            <button
              className="app-nav-toggle"
              type="button"
              onClick={() => setExpanded((value) => !value)}
              aria-label={expanded ? "Collapse navigation" : "Expand navigation"}
              style={{
                width: "var(--lui-appnav-item-size)",
                height: "var(--lui-appnav-item-size)",
                border: "none",
                borderRadius: "var(--lui-appnav-item-radius)",
                background: "transparent",
                color: "var(--lui-appnav-toggle-fg)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              <SidebarSimple
                style={{
                  width: "var(--lui-appnav-icon-size)",
                  height: "var(--lui-appnav-icon-size)",
                }}
              />
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
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = active === item.id;

              return (
                <button
                  className="app-nav-item"
                  key={item.id}
                  type="button"
                  title={!expanded ? item.label : undefined}
                  onClick={() => setActive(item.id)}
                  style={{
                    height: "var(--lui-appnav-item-size)",
                    width: "100%",
                    border: "none",
                    borderRadius: "var(--lui-appnav-item-radius)",
                    background: isActive
                      ? "var(--lui-appnav-states-active-bg)"
                      : "transparent",
                    color: isActive
                      ? "var(--lui-appnav-item-active-fg)"
                      : "var(--lui-appnav-item-fg)",
                    display: "flex",
                    alignItems: "center",
                    padding: 0,
                    cursor: "pointer",
                    overflow: "hidden",
                    transition: "background 200ms ease, color 200ms ease",
                  }}
                >
                  <span
                    style={{
                      width: "var(--lui-appnav-item-size)",
                      minWidth: "var(--lui-appnav-item-size)",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon
                      weight={isActive ? "fill" : "regular"}
                      style={{
                        width: "var(--lui-appnav-icon-size)",
                        height: "var(--lui-appnav-icon-size)",
                      }}
                    />
                  </span>
                  <span
                    style={{
                      opacity: expanded ? 1 : 0,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      color: "inherit",
                      fontSize: "var(--lui-appnav-item-font)",
                      fontWeight: "var(--lui-appnav-item-font-weight)",
                      transition: "opacity 200ms ease",
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
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            marginTop: "var(--lui-app-content-inset)",
            marginRight: "var(--lui-app-content-inset)",
            marginBottom: "var(--lui-app-content-inset)",
            background: "var(--lui-content)",
            borderRadius: "var(--lui-app-content-radius)",
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
              borderBottom: "1px solid var(--lui-surface-stroke)",
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
              className="header-icon-button"
              type="button"
              aria-label="Notifications"
              style={{
                width: "var(--lui-appnav-item-size)",
                height: "var(--lui-appnav-item-size)",
                border: "none",
                borderRadius: "var(--lui-radius-md)",
                background: "transparent",
                color: "var(--lui-icon)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <Bell
                style={{
                  width: "var(--lui-appnav-icon-size)",
                  height: "var(--lui-appnav-icon-size)",
                }}
              />
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
              aria-label="Business metrics"
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
                    background: "var(--lui-surface)",
                    border: "1px solid var(--lui-surface-stroke)",
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
                      marginTop: "var(--lui-dashboard-card-value-gap)",
                      color: "var(--lui-text-primary)",
                      fontSize: "var(--lui-dashboard-card-value-font)",
                      fontWeight: "var(--lui-dashboard-card-value-font-weight)",
                    }}
                  >
                    {metric.value}
                  </div>
                  <div
                    style={{
                      marginTop: "var(--lui-dashboard-card-value-gap)",
                      color: "var(--lui-text-secondary)",
                      fontSize: "var(--lui-dashboard-table-cell-font)",
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
                borderRadius: "var(--lui-dashboard-card-radius)",
                overflow: "hidden",
                boxShadow: "var(--lui-shadow-elevated)",
              }}
            >
              <div
                style={{
                  padding: "var(--lui-dashboard-table-section-padding)",
                  borderBottom: "1px solid var(--lui-surface-stroke)",
                }}
              >
                <h2
                  id="recent-orders-heading"
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
                  style={{
                    width: "100%",
                    minWidth: "var(--lui-dashboard-table-min-width)",
                    borderCollapse: "collapse",
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        borderBottom: "1px solid var(--lui-surface-stroke)",
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
                    {RECENT_ORDERS.map((order, index) => (
                      <tr
                        key={order.id}
                        style={{
                          borderBottom:
                            index === RECENT_ORDERS.length - 1
                              ? "none"
                              : "1px solid var(--lui-surface-stroke)",
                        }}
                      >
                        <td
                          style={{
                            padding:
                              "var(--lui-dashboard-table-cell-padding-y) var(--lui-dashboard-table-cell-padding-x)",
                            color: "var(--lui-text-primary)",
                            fontSize: "var(--lui-dashboard-table-cell-font)",
                            fontWeight:
                              "var(--lui-dashboard-table-strong-font-weight)",
                          }}
                        >
                          {order.id}
                        </td>
                        <td
                          style={{
                            padding:
                              "var(--lui-dashboard-table-cell-padding-y) var(--lui-dashboard-table-cell-padding-x)",
                            color: "var(--lui-text-primary)",
                            fontSize: "var(--lui-dashboard-table-cell-font)",
                          }}
                        >
                          {order.customer}
                        </td>
                        <td
                          style={{
                            padding:
                              "var(--lui-dashboard-table-cell-padding-y) var(--lui-dashboard-table-cell-padding-x)",
                            color: "var(--lui-text-secondary)",
                            fontSize: "var(--lui-dashboard-table-cell-font)",
                          }}
                        >
                          {order.date}
                        </td>
                        <td
                          style={{
                            padding:
                              "var(--lui-dashboard-table-cell-padding-y) var(--lui-dashboard-table-cell-padding-x)",
                            color: "var(--lui-text-primary)",
                            fontSize: "var(--lui-dashboard-table-cell-font)",
                            fontWeight:
                              "var(--lui-dashboard-table-strong-font-weight)",
                          }}
                        >
                          {order.amount}
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
                              ...getStatusStyles(order.status),
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
