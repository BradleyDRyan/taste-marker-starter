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

const BUSINESS_NAME = "Bloom and Co";

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
    detail: "Up 12.4% from last month with spring bundle sales leading.",
    featured: true,
  },
  {
    label: "Orders",
    value: "186",
    detail: "27 orders are queued for fulfillment before tomorrow noon.",
    featured: false,
  },
  {
    label: "Customers",
    value: "1,284",
    detail: "94 returning shoppers purchased again in the last 14 days.",
    featured: false,
  },
  {
    label: "Avg Order Value",
    value: "$133.66",
    detail: "Gift-ready add-ons kept basket size above the weekly target.",
    featured: false,
  },
] as const;

const ORDER_COLUMNS = ["Order", "Customer", "Date", "Amount", "Status"] as const;

const RECENT_ORDERS = [
  {
    order: "#1001",
    customer: "Avery Mitchell",
    date: "Mar 19, 2026",
    amount: "$142.00",
    status: "Completed",
  },
  {
    order: "#1002",
    customer: "Noah Bennett",
    date: "Mar 19, 2026",
    amount: "$89.50",
    status: "Processing",
  },
  {
    order: "#1003",
    customer: "Lila Carter",
    date: "Mar 18, 2026",
    amount: "$214.25",
    status: "Pending",
  },
  {
    order: "#1004",
    customer: "Mason Lee",
    date: "Mar 18, 2026",
    amount: "$167.80",
    status: "Shipped",
  },
  {
    order: "#1005",
    customer: "Sofia Ramirez",
    date: "Mar 17, 2026",
    amount: "$76.40",
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

  if (status === "Processing" || status === "Pending") {
    return {
      background: "var(--lui-status-warning-bg)",
      color: "var(--lui-status-warning-fg)",
    };
  }

  return {
    background: "var(--lui-status-danger-bg)",
    color: "var(--lui-status-danger-fg)",
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
          --lui-app-content-inset: 8px;
          --lui-app-content-radius: 8px;
          --lui-app-content-shadow: 0 0 0 1px #e1e1e1, 0px 3px 6px -2px rgb(0 0 0 / 0.02);
          --lui-content: #fcfcfd;
          --lui-surface: #ffffff;
          --lui-surface-stroke: #f0f0f0;
          --lui-surface-stroke-strong: #e1e1e1;
          --lui-chrome: #f3f3f4;
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
          --lui-shadow-elevated: 0 1px 2px 0 rgb(0 0 0 / 0.05);
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
          --lui-toolbar-height: 40px;
          --lui-toolbar-font: 14px;
          --lui-toolbar-font-weight: 500;
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
          --lui-spacing-page-x: 16px;
          --lui-spacing-page-y: 24px;
          --lui-dashboard-section-gap: 24px;
          --lui-dashboard-grid-gap: 16px;
          --lui-dashboard-card-padding: 16px;
          --lui-dashboard-card-radius: 8px;
          --lui-dashboard-card-value-gap: 6px;
          --lui-dashboard-copy-line-height: 1.5;
          --lui-dashboard-card-label-font: 12px;
          --lui-dashboard-card-label-font-weight: 500;
          --lui-dashboard-card-value-font: 24px;
          --lui-dashboard-card-value-font-weight: 600;
          --lui-dashboard-table-title-font: 14px;
          --lui-dashboard-table-title-font-weight: 600;
          --lui-dashboard-table-section-padding: 16px;
          --lui-dashboard-table-head-padding-y: 8px;
          --lui-dashboard-table-head-padding-x: 16px;
          --lui-dashboard-table-head-font: 12px;
          --lui-dashboard-table-head-font-weight: 500;
          --lui-dashboard-table-cell-padding-y: 12px;
          --lui-dashboard-table-cell-padding-x: 16px;
          --lui-dashboard-table-cell-font: 13px;
          --lui-dashboard-table-emphasis-font-weight: 500;
          --lui-dashboard-status-padding-y: 2px;
          --lui-dashboard-status-padding-x: 8px;
          --lui-dashboard-status-radius: 4px;
          --lui-dashboard-status-font: 11px;
          --lui-dashboard-status-font-weight: 500;
          --lui-dashboard-card-min-width: 180px;
          --lui-dashboard-table-min-width: 640px;
          --lui-dashboard-feature-bg: #1b1b1b;
          --lui-dashboard-feature-fg: #ffffff;
          --lui-dashboard-feature-muted: rgb(255 255 255 / 0.72);
          --lui-dashboard-feature-border: #1b1b1b;
        }

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
        }

        .appnavToggle,
        .appnavItem,
        .headerButton {
          transition:
            background-color var(--lui-motion-duration-fast) var(--lui-motion-ease-standard),
            color var(--lui-motion-duration-fast) var(--lui-motion-ease-standard),
            box-shadow var(--lui-motion-duration-fast) var(--lui-motion-ease-standard);
        }

        .appnavToggle:hover,
        .appnavItem:hover,
        .headerButton:hover {
          background: var(--lui-appnav-states-hover-bg);
        }

        .appnavItem[data-active="true"] {
          background: var(--lui-appnav-states-active-bg);
          color: var(--lui-appnav-item-active-fg);
        }

        .appnavToggle:focus-visible,
        .appnavItem:focus-visible,
        .headerButton:focus-visible {
          outline: none;
          box-shadow: inset 0 0 0 var(--lui-focus-ring-width) var(--lui-focus-ring-color);
        }

        .appnavLabel {
          transition:
            opacity var(--lui-motion-duration-fast) var(--lui-motion-ease-standard);
          white-space: nowrap;
          overflow: hidden;
        }

        .appnavBrand {
          transition:
            opacity var(--lui-motion-duration-fast) var(--lui-motion-ease-standard),
            padding var(--lui-motion-duration-fast) var(--lui-motion-ease-standard);
          white-space: nowrap;
          overflow: hidden;
        }

        .metricsGrid {
          display: grid;
          gap: var(--lui-dashboard-grid-gap);
          grid-template-columns: repeat(auto-fit, minmax(min(100%, var(--lui-dashboard-card-min-width)), 1fr));
        }

        .ordersTableWrap {
          overflow-x: auto;
        }
      `}</style>

      <div
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
          aria-label="Primary"
          style={{
            width: expanded
              ? "var(--lui-appnav-width-expanded)"
              : "var(--lui-appnav-width)",
            flexShrink: 0,
            overflow: "hidden",
            background: "var(--lui-appnav-bg)",
            padding: "var(--lui-appnav-shell-padding-y) var(--lui-appnav-rail-padding)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--lui-appnav-section-gap)",
            transition: "width var(--lui-motion-duration-fast) var(--lui-motion-ease-standard)",
          }}
        >
          <div
            style={{
              height: "var(--lui-appnav-header-height)",
              display: "flex",
              alignItems: "center",
              justifyContent: expanded ? "space-between" : "center",
              gap: "var(--lui-appnav-section-gap)",
            }}
          >
            <div
              className="appnavBrand"
              aria-hidden={!expanded}
              style={{
                flex: 1,
                opacity: expanded ? 1 : 0,
                paddingInline: expanded ? "var(--lui-appnav-logo-padding-x)" : 0,
                fontSize: "var(--lui-appnav-header-font)",
                fontWeight: "var(--lui-appnav-header-font-weight)",
                color: "var(--lui-appnav-header-color)",
              }}
            >
              {BUSINESS_NAME}
            </div>
            <button
              type="button"
              className="appnavToggle"
              aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
              onClick={() => setExpanded((value) => !value)}
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
                padding: 0,
                cursor: "pointer",
                flexShrink: 0,
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
            {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
              const isActive = active === id;

              return (
                <button
                  key={id}
                  type="button"
                  className="appnavItem"
                  data-active={isActive}
                  title={!expanded ? label : undefined}
                  onClick={() => setActive(id)}
                  style={{
                    width: "100%",
                    height: "var(--lui-appnav-item-size)",
                    border: "none",
                    borderRadius: "var(--lui-appnav-item-radius)",
                    background: "transparent",
                    color: isActive
                      ? "var(--lui-appnav-item-active-fg)"
                      : "var(--lui-appnav-item-fg)",
                    display: "flex",
                    alignItems: "center",
                    padding: 0,
                    cursor: "pointer",
                    overflow: "hidden",
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
                    className="appnavLabel"
                    style={{
                      opacity: expanded ? 1 : 0,
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
            minWidth: 0,
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
                fontSize: "var(--lui-toolbar-font)",
                fontWeight: "var(--lui-toolbar-font-weight)",
                color: "var(--lui-text-primary)",
              }}
            >
              {BUSINESS_NAME}
            </div>

            <button
              type="button"
              className="headerButton"
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
                padding: 0,
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
              aria-labelledby="metrics-heading"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--lui-dashboard-grid-gap)",
              }}
            >
              <div>
                <h1
                  id="metrics-heading"
                  style={{
                    margin: 0,
                    fontSize: "var(--lui-dashboard-card-value-font)",
                    fontWeight: "var(--lui-dashboard-card-value-font-weight)",
                    color: "var(--lui-text-primary)",
                  }}
                >
                  Overview
                </h1>
                <p
                  style={{
                    margin: "var(--lui-dashboard-card-value-gap) 0 0",
                    fontSize: "var(--lui-toolbar-font)",
                    color: "var(--lui-text-secondary)",
                  }}
                >
                  Today&apos;s storefront snapshot across sales, demand, and
                  repeat buyers.
                </p>
              </div>

              <div className="metricsGrid">
                {METRICS.map((metric) => (
                  <article
                    key={metric.label}
                    style={{
                      minWidth: "var(--lui-dashboard-card-min-width)",
                      padding: "var(--lui-dashboard-card-padding)",
                      borderRadius: "var(--lui-dashboard-card-radius)",
                      border: `var(--lui-border-width-subtle) solid ${
                        metric.featured
                          ? "var(--lui-dashboard-feature-border)"
                          : "var(--lui-surface-stroke)"
                      }`,
                      background: metric.featured
                        ? "var(--lui-dashboard-feature-bg)"
                        : "var(--lui-surface)",
                      boxShadow: "var(--lui-shadow-elevated)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "var(--lui-dashboard-card-label-font)",
                        fontWeight: "var(--lui-dashboard-card-label-font-weight)",
                        color: metric.featured
                          ? "var(--lui-dashboard-feature-muted)"
                          : "var(--lui-text-muted)",
                      }}
                    >
                      {metric.label}
                    </div>
                    <div
                      style={{
                        marginTop: "var(--lui-dashboard-card-value-gap)",
                        fontSize: "var(--lui-dashboard-card-value-font)",
                        fontWeight: "var(--lui-dashboard-card-value-font-weight)",
                        color: metric.featured
                          ? "var(--lui-dashboard-feature-fg)"
                          : "var(--lui-text-primary)",
                      }}
                    >
                      {metric.value}
                    </div>
                    <p
                      style={{
                        margin: "var(--lui-app-content-inset) 0 0",
                        fontSize: "var(--lui-toolbar-font)",
                        lineHeight: "var(--lui-dashboard-copy-line-height)",
                        color: metric.featured
                          ? "var(--lui-dashboard-feature-muted)"
                          : "var(--lui-text-secondary)",
                      }}
                    >
                      {metric.detail}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section
              aria-labelledby="recent-orders-heading"
              style={{
                background: "var(--lui-surface)",
                borderRadius: "var(--lui-radius-lg)",
                border:
                  "var(--lui-border-width-subtle) solid var(--lui-surface-stroke)",
                boxShadow: "var(--lui-shadow-elevated)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  padding: "var(--lui-dashboard-table-section-padding)",
                  borderBottom:
                    "var(--lui-border-width-subtle) solid var(--lui-surface-stroke)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "var(--lui-dashboard-grid-gap)",
                }}
              >
                <div>
                  <h2
                    id="recent-orders-heading"
                    style={{
                      margin: 0,
                      fontSize: "var(--lui-dashboard-table-title-font)",
                      fontWeight: "var(--lui-dashboard-table-title-font-weight)",
                      color: "var(--lui-text-primary)",
                    }}
                  >
                    Recent orders
                  </h2>
                  <p
                    style={{
                      margin: "var(--lui-appnav-section-gap) 0 0",
                      fontSize: "var(--lui-toolbar-font)",
                      color: "var(--lui-text-secondary)",
                    }}
                  >
                    Latest checkout activity requiring tracking, packing, or
                    follow-up.
                  </p>
                </div>
              </div>

              <div className="ordersTableWrap">
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
                      {ORDER_COLUMNS.map((column) => (
                        <th
                          key={column}
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
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {RECENT_ORDERS.map((order, index) => (
                      <tr
                        key={order.order}
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
                            fontWeight:
                              "var(--lui-dashboard-table-emphasis-font-weight)",
                            color: "var(--lui-text-primary)",
                          }}
                        >
                          {order.order}
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
                            fontWeight:
                              "var(--lui-dashboard-table-emphasis-font-weight)",
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
                              justifyContent: "center",
                              padding:
                                "var(--lui-dashboard-status-padding-y) var(--lui-dashboard-status-padding-x)",
                              borderRadius: "var(--lui-dashboard-status-radius)",
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
