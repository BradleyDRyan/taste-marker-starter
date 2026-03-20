"use client";

import { Bell, Cube, GearSix, Package, SidebarSimple, SquaresFour, Users } from "@phosphor-icons/react";
import { useState } from "react";

const BUSINESS_NAME = "Bloom and Co";

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
    change: "+12.4% vs last month",
    accent: true,
  },
  {
    label: "Orders",
    value: "318",
    change: "24 fulfilled today",
  },
  {
    label: "Customers",
    value: "1,284",
    change: "86 returning this week",
  },
  {
    label: "Avg Order Value",
    value: "$78.18",
    change: "+4.2% vs last month",
  },
] as const;

const RECENT_ORDERS = [
  { id: "#1048", customer: "Ava Johnson", product: "Spring Candle Set", total: "$86.00", status: "Paid" },
  { id: "#1047", customer: "Mia Chen", product: "Botanical Diffuser", total: "$64.00", status: "Packed" },
  { id: "#1046", customer: "Noah Martinez", product: "Glass Vessel Trio", total: "$112.00", status: "Paid" },
  { id: "#1045", customer: "Sophia Patel", product: "Signature Reed Bundle", total: "$58.00", status: "Pending" },
  { id: "#1044", customer: "Liam Brown", product: "Lavender Room Spray", total: "$39.00", status: "Refunded" },
] as const;

function statusColors(status: string) {
  if (status === "Paid") {
    return {
      background: "var(--lui-status-success-bg)",
      color: "var(--lui-status-success-fg)",
    };
  }

  if (status === "Pending" || status === "Packed") {
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
          --lui-shadow-elevated: 0 1px 2px 0 rgb(0 0 0 / 0.05);
          --lui-app-content-inset: 8px;
          --lui-app-content-radius: 8px;
          --lui-app-content-shadow: 0 0 0 1px #e1e1e1, 0px 3px 6px -2px rgb(0 0 0 / 0.02);
          --lui-app-content-backdrop: rgb(255 255 255 / 0.7);
          --lui-app-content-blur: 8px;
          --lui-toolbar-height: 40px;
          --lui-toolbar-font: 14px;
          --lui-toolbar-font-weight: 500;
          --lui-font-sans: Inter, ui-sans-serif, system-ui, sans-serif;
          --lui-font-weight-regular: 400;
          --lui-font-weight-medium: 500;
          --lui-font-weight-semibold: 600;
          --lui-radius-md: 6px;
          --lui-radius-lg: 8px;
          --lui-radius-full: 9999px;
          --lui-border-width-subtle: 1px;
          --lui-border-width-hairline: 0.5px;
          --lui-focus-ring-width: 2px;
          --lui-focus-ring-offset-inset: -2px;
          --lui-motion-duration-fast: 200ms;
          --lui-motion-ease-standard: ease;
          --lui-viewport-app-height: 100dvh;
          --lui-space-0: 0;
          --lui-space-2: 2px;
          --lui-space-4: 4px;
          --lui-space-6: 6px;
          --lui-space-8: 8px;
          --lui-space-10: 10px;
          --lui-space-12: 12px;
          --lui-space-16: 16px;
          --lui-space-20: 20px;
          --lui-space-24: 24px;
          --lui-space-32: 32px;
          --lui-motion-lift-y: -1px;
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
          --lui-dashboard-feature-bg: #1b1b1b;
          --lui-dashboard-feature-fg: #ffffff;
          --lui-dashboard-feature-muted: rgb(255 255 255 / 0.72);
          --lui-dashboard-feature-soft-bg: rgb(255 255 255 / 0.12);
          --lui-dashboard-feature-border: #1b1b1b;
          --lui-dashboard-heading-font: 28px;
          --lui-dashboard-heading-letter-spacing: -0.03em;
          --lui-dashboard-inline-note-font: 12px;
          --lui-dashboard-body-font: 13px;
          --lui-dashboard-pill-padding-y: 6px;
          --lui-dashboard-pill-padding-x: 10px;
          --lui-dashboard-chip-font: 11px;
          --lui-dashboard-dot-size: 6px;
          --lui-dashboard-dot-offset: 7px;
          --lui-dashboard-card-gap: 20px;
          --lui-dashboard-header-gap: 12px;
        }

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
        }

        .appnav-button,
        .header-button,
        .metric-card,
        .table-row {
          transition:
            background-color var(--lui-motion-duration-fast) var(--lui-motion-ease-standard),
            color var(--lui-motion-duration-fast) var(--lui-motion-ease-standard),
            border-color var(--lui-motion-duration-fast) var(--lui-motion-ease-standard),
            box-shadow var(--lui-motion-duration-fast) var(--lui-motion-ease-standard),
            transform var(--lui-motion-duration-fast) var(--lui-motion-ease-standard);
        }

        .appnav-button:hover,
        .header-button:hover {
          background: var(--lui-appnav-states-hover-bg);
        }

        .appnav-button[data-active="true"] {
          background: var(--lui-appnav-states-active-bg);
          color: var(--lui-appnav-item-active-fg);
        }

        .appnav-button:focus-visible,
        .header-button:focus-visible {
          outline: none;
          box-shadow: inset 0 0 0 var(--lui-focus-ring-width) var(--lui-focus-ring-color);
        }

        .metric-card:hover {
          transform: translateY(var(--lui-motion-lift-y));
          box-shadow: var(--lui-shadow-elevated);
        }

        .table-row:hover {
          background: var(--lui-content);
        }

        @media (max-width: 980px) {
          .metrics-grid {
            grid-template-columns: repeat(2, minmax(var(--lui-dashboard-card-min-width), 1fr)) !important;
          }
        }

        @media (max-width: 720px) {
          .shell {
            flex-direction: column;
            height: auto;
            min-height: var(--lui-viewport-app-height);
          }

          .appnav {
            width: 100% !important;
            border-bottom: var(--lui-border-width-subtle) solid var(--lui-surface-stroke);
          }

          .content {
            margin-left: var(--lui-app-content-inset) !important;
          }

          .metrics-grid {
            grid-template-columns: minmax(0, 1fr) !important;
          }
        }
      `}</style>

      <div
        className="shell"
        style={{
          minHeight: "var(--lui-viewport-app-height)",
          height: "var(--lui-viewport-app-height)",
          display: "flex",
          overflow: "hidden",
          background: "var(--lui-chrome)",
          color: "var(--lui-text-primary)",
          fontFamily: "var(--lui-font-sans)",
        }}
      >
        <nav
          className="appnav"
          aria-label="Primary"
          style={{
            width: expanded ? "var(--lui-appnav-width-expanded)" : "var(--lui-appnav-width)",
            padding: "var(--lui-appnav-shell-padding-y) var(--lui-appnav-rail-padding)",
            background: "var(--lui-appnav-bg)",
            transition: "width var(--lui-motion-duration-fast) var(--lui-motion-ease-standard)",
            overflow: "hidden",
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            gap: "var(--lui-space-12)",
          }}
        >
          <div
            style={{
              height: "var(--lui-appnav-header-height)",
              display: "flex",
              alignItems: "center",
              justifyContent: expanded ? "space-between" : "center",
              gap: "var(--lui-space-8)",
            }}
          >
            {expanded ? (
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    fontSize: "var(--lui-toolbar-font)",
                    fontWeight: "var(--lui-font-weight-semibold)",
                    color: "var(--lui-appnav-header-color)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {BUSINESS_NAME}
                </div>
              </div>
            ) : null}
            <button
              type="button"
              className="header-button"
              aria-label={expanded ? "Collapse navigation" : "Expand navigation"}
              onClick={() => setExpanded((value) => !value)}
              style={{
                border: "none",
                background: "transparent",
                color: "var(--lui-appnav-toggle-fg)",
                width: "var(--lui-appnav-item-size)",
                height: "var(--lui-appnav-item-size)",
                borderRadius: "var(--lui-appnav-item-radius)",
                display: "grid",
                placeItems: "center",
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              <SidebarSimple size="var(--lui-appnav-icon-size)" weight="bold" />
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "var(--lui-appnav-item-gap)" }}>
            {NAV_ITEMS.map(({ label, icon: Icon }, index) => (
              <button
                key={label}
                type="button"
                className="appnav-button"
                data-active={index === 0}
                style={{
                  height: "var(--lui-appnav-item-size)",
                  borderRadius: "var(--lui-appnav-item-radius)",
                  border: "none",
                  background: index === 0 ? "var(--lui-appnav-states-active-bg)" : "transparent",
                  color: index === 0 ? "var(--lui-appnav-item-active-fg)" : "var(--lui-appnav-item-fg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: expanded ? "flex-start" : "center",
                  gap: "var(--lui-space-12)",
                  padding: expanded ? "0 var(--lui-space-10)" : "var(--lui-space-0)",
                  cursor: "pointer",
                  width: "100%",
                  textAlign: "left",
                  fontSize: "var(--lui-dashboard-table-cell-font)",
                  fontWeight: index === 0 ? "var(--lui-font-weight-medium)" : "var(--lui-font-weight-regular)",
                }}
              >
                <Icon size="var(--lui-appnav-icon-size)" weight={index === 0 ? "fill" : "regular"} />
                {expanded ? <span style={{ whiteSpace: "nowrap" }}>{label}</span> : null}
              </button>
            ))}
          </div>
        </nav>

        <div
          className="content"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            margin: "var(--lui-app-content-inset)",
            marginLeft: 0,
            background: "var(--lui-content)",
            borderRadius: "var(--lui-app-content-radius)",
            boxShadow: "var(--lui-app-content-shadow)",
            overflow: "hidden",
            minWidth: 0,
          }}
        >
          <header
            style={{
              height: "var(--lui-toolbar-height)",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "var(--lui-space-16)",
              padding: "0 var(--lui-space-16)",
              borderBottom: "var(--lui-border-width-subtle) solid var(--lui-surface-stroke)",
              background: "var(--lui-app-content-backdrop)",
              backdropFilter: "blur(var(--lui-app-content-blur))",
            }}
          >
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  fontSize: "var(--lui-toolbar-font)",
                  fontWeight: "var(--lui-toolbar-font-weight)",
                  color: "var(--lui-text-primary)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {BUSINESS_NAME}
              </div>
            </div>

            <button
              type="button"
              className="header-button"
              aria-label="Notifications"
              style={{
                position: "relative",
                width: "var(--lui-space-32)",
                height: "var(--lui-space-32)",
                borderRadius: "var(--lui-radius-md)",
                border: "var(--lui-border-width-subtle) solid var(--lui-surface-stroke)",
                background: "var(--lui-surface)",
                color: "var(--lui-text-secondary)",
                display: "grid",
                placeItems: "center",
                cursor: "pointer",
                boxShadow: "var(--lui-shadow-elevated)",
              }}
            >
              <Bell size="var(--lui-appnav-icon-size)" />
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: "var(--lui-dashboard-dot-offset)",
                  right: "var(--lui-dashboard-dot-offset)",
                  width: "var(--lui-dashboard-dot-size)",
                  height: "var(--lui-dashboard-dot-size)",
                  borderRadius: "var(--lui-radius-full)",
                  background: "var(--lui-dashboard-feature-bg)",
                }}
              />
            </button>
          </header>

          <main
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "var(--lui-space-24) var(--lui-space-16)",
              display: "flex",
              flexDirection: "column",
              gap: "var(--lui-dashboard-section-gap)",
            }}
          >
            <section style={{ display: "flex", flexDirection: "column", gap: "var(--lui-space-8)" }}>
              <div style={{ display: "flex", alignItems: "end", justifyContent: "space-between", gap: "var(--lui-dashboard-header-gap)", flexWrap: "wrap" }}>
                <div>
                  <h1
                    style={{
                      margin: "var(--lui-space-0)",
                      fontSize: "var(--lui-dashboard-heading-font)",
                      fontWeight: "var(--lui-font-weight-semibold)",
                      letterSpacing: "var(--lui-dashboard-heading-letter-spacing)",
                    }}
                  >
                    Overview
                  </h1>
                  <p style={{ margin: "var(--lui-space-4) 0 0", fontSize: "var(--lui-toolbar-font)", color: "var(--lui-text-secondary)" }}>
                    Daily pulse for orders, customer growth, and top-line sales.
                  </p>
                </div>
                <div
                  style={{
                    border: "var(--lui-border-width-subtle) solid var(--lui-surface-stroke)",
                    borderRadius: "var(--lui-radius-full)",
                    padding: "var(--lui-dashboard-pill-padding-y) var(--lui-dashboard-pill-padding-x)",
                    fontSize: "var(--lui-dashboard-inline-note-font)",
                    fontWeight: "var(--lui-font-weight-medium)",
                    color: "var(--lui-text-secondary)",
                    background: "var(--lui-surface)",
                  }}
                >
                  Updated 8 minutes ago
                </div>
              </div>

              <div
                className="metrics-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, minmax(var(--lui-dashboard-card-min-width), 1fr))",
                  gap: "var(--lui-dashboard-grid-gap)",
                }}
              >
                {METRICS.map((metric) => (
                  <article
                    key={metric.label}
                    className="metric-card"
                    style={{
                      minWidth: "var(--lui-dashboard-card-min-width)",
                      borderRadius: "var(--lui-dashboard-card-radius)",
                      padding: "var(--lui-dashboard-card-padding)",
                      border: `var(--lui-border-width-subtle) solid ${
                        metric.accent ? "var(--lui-dashboard-feature-border)" : "var(--lui-surface-stroke)"
                      }`,
                      background: metric.accent ? "var(--lui-dashboard-feature-bg)" : "var(--lui-surface)",
                      color: metric.accent ? "var(--lui-dashboard-feature-fg)" : "var(--lui-text-primary)",
                      boxShadow: metric.accent ? "var(--lui-shadow-elevated)" : "none",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      gap: "var(--lui-dashboard-card-gap)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                          gap: "var(--lui-dashboard-header-gap)",
                        }}
                      >
                      <span
                        style={{
                          fontSize: "var(--lui-dashboard-card-label-font)",
                          fontWeight: "var(--lui-dashboard-card-label-font-weight)",
                          color: metric.accent ? "var(--lui-dashboard-feature-muted)" : "var(--lui-text-secondary)",
                        }}
                      >
                        {metric.label}
                      </span>
                      <span
                        style={{
                          padding: "var(--lui-space-4) var(--lui-space-8)",
                          borderRadius: "var(--lui-radius-full)",
                          background: metric.accent ? "var(--lui-dashboard-feature-soft-bg)" : "var(--lui-content)",
                          fontSize: "var(--lui-dashboard-chip-font)",
                          fontWeight: "var(--lui-font-weight-semibold)",
                          color: metric.accent ? "var(--lui-dashboard-feature-fg)" : "var(--lui-text-secondary)",
                        }}
                      >
                        Live
                      </span>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "var(--lui-dashboard-card-value-gap)" }}>
                      <strong
                        style={{
                          fontSize: "var(--lui-dashboard-card-value-font)",
                          fontWeight: "var(--lui-dashboard-card-value-font-weight)",
                          letterSpacing: "var(--lui-dashboard-heading-letter-spacing)",
                        }}
                      >
                        {metric.value}
                      </strong>
                      <span
                        style={{
                          fontSize: "var(--lui-dashboard-body-font)",
                          color: metric.accent ? "var(--lui-dashboard-feature-muted)" : "var(--lui-text-secondary)",
                        }}
                      >
                        {metric.change}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section
              style={{
                background: "var(--lui-surface)",
                border: "var(--lui-border-width-subtle) solid var(--lui-surface-stroke)",
                borderRadius: "var(--lui-dashboard-card-radius)",
                boxShadow: "var(--lui-shadow-elevated)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "var(--lui-dashboard-header-gap)",
                  padding: "var(--lui-dashboard-table-section-padding)",
                  borderBottom: "var(--lui-border-width-subtle) solid var(--lui-surface-stroke)",
                }}
              >
                <div>
                  <h2
                    style={{
                      margin: "var(--lui-space-0)",
                      fontSize: "var(--lui-dashboard-table-title-font)",
                      fontWeight: "var(--lui-dashboard-table-title-font-weight)",
                    }}
                  >
                    Recent orders
                  </h2>
                  <p style={{ margin: "var(--lui-space-4) 0 0", fontSize: "var(--lui-dashboard-body-font)", color: "var(--lui-text-secondary)" }}>
                    Five most recent transactions across online and in-store checkout.
                  </p>
                </div>
              </div>

              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", minWidth: "var(--lui-dashboard-table-min-width)", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "var(--lui-content)" }}>
                      {["Order", "Customer", "Product", "Total", "Status"].map((heading) => (
                        <th
                          key={heading}
                          style={{
                            padding: "var(--lui-dashboard-table-head-padding-y) var(--lui-dashboard-table-head-padding-x)",
                            fontSize: "var(--lui-dashboard-table-head-font)",
                            fontWeight: "var(--lui-dashboard-table-head-font-weight)",
                            color: "var(--lui-text-secondary)",
                            textAlign: "left",
                            borderBottom: "var(--lui-border-width-subtle) solid var(--lui-surface-stroke)",
                          }}
                        >
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {RECENT_ORDERS.map((order) => (
                      <tr key={order.id} className="table-row">
                        <td
                          style={{
                            padding: "var(--lui-dashboard-table-cell-padding-y) var(--lui-dashboard-table-cell-padding-x)",
                            fontSize: "var(--lui-dashboard-table-cell-font)",
                            fontWeight: "var(--lui-dashboard-table-emphasis-font-weight)",
                            borderBottom: "var(--lui-border-width-subtle) solid var(--lui-surface-stroke)",
                          }}
                        >
                          {order.id}
                        </td>
                        <td
                          style={{
                            padding: "var(--lui-dashboard-table-cell-padding-y) var(--lui-dashboard-table-cell-padding-x)",
                            fontSize: "var(--lui-dashboard-table-cell-font)",
                            color: "var(--lui-text-primary)",
                            borderBottom: "var(--lui-border-width-subtle) solid var(--lui-surface-stroke)",
                          }}
                        >
                          {order.customer}
                        </td>
                        <td
                          style={{
                            padding: "var(--lui-dashboard-table-cell-padding-y) var(--lui-dashboard-table-cell-padding-x)",
                            fontSize: "var(--lui-dashboard-table-cell-font)",
                            color: "var(--lui-text-secondary)",
                            borderBottom: "var(--lui-border-width-subtle) solid var(--lui-surface-stroke)",
                          }}
                        >
                          {order.product}
                        </td>
                        <td
                          style={{
                            padding: "var(--lui-dashboard-table-cell-padding-y) var(--lui-dashboard-table-cell-padding-x)",
                            fontSize: "var(--lui-dashboard-table-cell-font)",
                            fontWeight: "var(--lui-dashboard-table-emphasis-font-weight)",
                            borderBottom: "var(--lui-border-width-subtle) solid var(--lui-surface-stroke)",
                          }}
                        >
                          {order.total}
                        </td>
                        <td
                          style={{
                            padding: "var(--lui-dashboard-table-cell-padding-y) var(--lui-dashboard-table-cell-padding-x)",
                            borderBottom: "var(--lui-border-width-subtle) solid var(--lui-surface-stroke)",
                          }}
                        >
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              borderRadius: "var(--lui-dashboard-status-radius)",
                              padding: "var(--lui-dashboard-status-padding-y) var(--lui-dashboard-status-padding-x)",
                              fontSize: "var(--lui-dashboard-status-font)",
                              fontWeight: "var(--lui-dashboard-status-font-weight)",
                              ...statusColors(order.status),
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
