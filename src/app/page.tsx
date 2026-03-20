"use client";

import { Bell, Cube, GearSix, Package, SidebarSimple, SquaresFour, Users } from "@phosphor-icons/react";
import { useState } from "react";

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
    value: "$48,320",
    detail: "Up 12.4% from last month with spring bouquet bundles leading sales.",
    featured: true,
  },
  {
    label: "Orders",
    value: "368",
    detail: "27 orders are scheduled for pickup or delivery before noon tomorrow.",
  },
  {
    label: "Customers",
    value: "1,284",
    detail: "94 returning customers placed at least two orders in the last 30 days.",
  },
  {
    label: "Avg Order Value",
    value: "$131.30",
    detail: "Gift add-ons increased average basket size by $9.80 this week.",
  },
] as const;

const recentOrders = [
  { order: "#1048", customer: "Jane Smith", date: "Mar 19, 2026", amount: "$142.00", status: "Completed" },
  { order: "#1047", customer: "Marcus Reed", date: "Mar 19, 2026", amount: "$89.50", status: "Processing" },
  { order: "#1046", customer: "Ava Patel", date: "Mar 18, 2026", amount: "$214.00", status: "Pending" },
  { order: "#1045", customer: "Lena Brooks", date: "Mar 18, 2026", amount: "$64.25", status: "Shipped" },
  { order: "#1044", customer: "Chris Nguyen", date: "Mar 17, 2026", amount: "$118.75", status: "Cancelled" },
] as const;

const statusToneMap = {
  Completed: { bg: "var(--lui-status-success-bg)", fg: "var(--lui-status-success-fg)" },
  Shipped: { bg: "var(--lui-status-success-bg)", fg: "var(--lui-status-success-fg)" },
  Processing: { bg: "var(--lui-status-warning-bg)", fg: "var(--lui-status-warning-fg)" },
  Pending: { bg: "var(--lui-status-warning-bg)", fg: "var(--lui-status-warning-fg)" },
  Cancelled: { bg: "var(--lui-status-danger-bg)", fg: "var(--lui-status-danger-fg)" },
} as const;

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
          --lui-dashboard-feature-border: #1b1b1b;
        }

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          background: var(--lui-chrome);
        }

        .appnavToggle,
        .appnavItem,
        .headerBell {
          transition:
            background-color var(--lui-motion-duration-fast) var(--lui-motion-ease-standard),
            color var(--lui-motion-duration-fast) var(--lui-motion-ease-standard),
            box-shadow var(--lui-motion-duration-fast) var(--lui-motion-ease-standard);
        }

        .appnavToggle:hover,
        .appnavItem:hover,
        .headerBell:hover {
          background: var(--lui-appnav-states-hover-bg);
        }

        .appnavItem[data-active="true"] {
          background: var(--lui-appnav-states-active-bg);
          color: var(--lui-appnav-item-active-fg);
        }

        .appnavToggle:focus-visible,
        .appnavItem:focus-visible,
        .headerBell:focus-visible {
          outline: none;
          box-shadow: inset 0 0 0 var(--lui-focus-ring-width) var(--lui-focus-ring-color);
        }

        .navLabel,
        .navBrand {
          white-space: nowrap;
          overflow: hidden;
          transition:
            opacity var(--lui-motion-duration-fast) var(--lui-motion-ease-standard),
            padding var(--lui-motion-duration-fast) var(--lui-motion-ease-standard),
            max-width var(--lui-motion-duration-fast) var(--lui-motion-ease-standard);
        }

        .tableRow:last-child td {
          border-bottom: none;
        }

        @media (max-width: 1120px) {
          .metricsGrid {
            grid-template-columns: repeat(2, minmax(var(--lui-dashboard-card-min-width), 1fr)) !important;
          }
        }

        @media (max-width: 720px) {
          .contentShell {
            margin-right: 0;
            margin-bottom: 0;
            border-radius: 0;
          }

          .metricsGrid {
            grid-template-columns: 1fr !important;
          }
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
            width: expanded ? "var(--lui-appnav-width-expanded)" : "var(--lui-appnav-width)",
            flexShrink: 0,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            gap: "var(--lui-appnav-section-gap)",
            padding: "var(--lui-appnav-shell-padding-y) 0",
            background: "var(--lui-appnav-bg)",
            transition: "width var(--lui-motion-duration-fast) var(--lui-motion-ease-standard)",
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
              className="navBrand"
              aria-hidden={!expanded}
              style={{
                flex: 1,
                opacity: expanded ? 1 : 0,
                maxWidth: expanded ? "100%" : "0",
                paddingLeft: expanded ? "var(--lui-appnav-logo-padding-x)" : "0",
                paddingRight: expanded ? "var(--lui-appnav-logo-padding-x)" : "0",
                fontSize: "var(--lui-appnav-header-font)",
                fontWeight: "var(--lui-appnav-header-font-weight)",
                color: "var(--lui-appnav-header-color)",
              }}
            >
              Bloom and Co
            </div>
            <button
              type="button"
              aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
              className="appnavToggle"
              onClick={() => setExpanded((value) => !value)}
              style={{
                height: "var(--lui-appnav-item-size)",
                width: "var(--lui-appnav-item-size)",
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
              <SidebarSimple size={"var(--lui-appnav-icon-size)"} weight="regular" />
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
                  key={item.id}
                  type="button"
                  title={expanded ? undefined : item.label}
                  data-active={isActive}
                  className="appnavItem"
                  onClick={() => setActive(item.id)}
                  style={{
                    height: "var(--lui-appnav-item-size)",
                    border: "none",
                    borderRadius: "var(--lui-appnav-item-radius)",
                    background: isActive ? "var(--lui-appnav-states-active-bg)" : "transparent",
                    color: isActive ? "var(--lui-appnav-item-active-fg)" : "var(--lui-appnav-item-fg)",
                    display: "flex",
                    alignItems: "center",
                    padding: 0,
                    width: "100%",
                    cursor: "pointer",
                    textAlign: "left",
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
                      size={"var(--lui-appnav-icon-size)"}
                      weight={isActive ? "fill" : "regular"}
                    />
                  </span>
                  <span
                    className="navLabel"
                    aria-hidden={!expanded}
                    style={{
                      opacity: expanded ? 1 : 0,
                      maxWidth: expanded ? "100%" : "0",
                      fontSize: "var(--lui-appnav-item-font)",
                      fontWeight: "var(--lui-appnav-item-font-weight)",
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
          className="contentShell"
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
            className="headerBar"
            style={{
              height: "var(--lui-toolbar-height)",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 var(--lui-spacing-page-x)",
              borderBottom: "var(--lui-border-width-subtle) solid var(--lui-surface-stroke)",
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
              Bloom and Co
            </div>
            <button
              type="button"
              aria-label="Notifications"
              className="headerBell"
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
              <Bell size={"var(--lui-appnav-icon-size)"} weight="regular" />
            </button>
          </header>

          <main
            className="mainArea"
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
              className="metricsGrid"
              aria-label="Business metrics"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                gap: "var(--lui-dashboard-grid-gap)",
              }}
            >
              {METRICS.map((metric) => {
                const isFeatured = metric.featured;

                return (
                  <article
                    key={metric.label}
                    style={{
                      minWidth: "var(--lui-dashboard-card-min-width)",
                      padding: "var(--lui-dashboard-card-padding)",
                      borderRadius: "var(--lui-dashboard-card-radius)",
                      border: `var(--lui-border-width-subtle) solid ${
                        isFeatured ? "var(--lui-dashboard-feature-border)" : "var(--lui-surface-stroke)"
                      }`,
                      background: isFeatured ? "var(--lui-dashboard-feature-bg)" : "var(--lui-surface)",
                      color: isFeatured ? "var(--lui-dashboard-feature-fg)" : "var(--lui-text-primary)",
                      boxShadow: "var(--lui-shadow-elevated)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "var(--lui-dashboard-card-label-font)",
                        fontWeight: "var(--lui-dashboard-card-label-font-weight)",
                        color: isFeatured ? "var(--lui-dashboard-feature-muted)" : "var(--lui-text-muted)",
                      }}
                    >
                      {metric.label}
                    </div>
                    <div
                      style={{
                        marginTop: "var(--lui-dashboard-card-value-gap)",
                        fontSize: "var(--lui-dashboard-card-value-font)",
                        fontWeight: "var(--lui-dashboard-card-value-font-weight)",
                        color: isFeatured ? "var(--lui-dashboard-feature-fg)" : "var(--lui-text-primary)",
                      }}
                    >
                      {metric.value}
                    </div>
                    <p
                      style={{
                        margin: "var(--lui-dashboard-card-value-gap) 0 0",
                        fontSize: "var(--lui-dashboard-table-cell-font)",
                        color: isFeatured ? "var(--lui-dashboard-feature-muted)" : "var(--lui-text-secondary)",
                      }}
                    >
                      {metric.detail}
                    </p>
                  </article>
                );
              })}
            </section>

            <section
              aria-labelledby="recent-orders-heading"
              style={{
                background: "var(--lui-surface)",
                borderRadius: "var(--lui-dashboard-card-radius)",
                border: "var(--lui-border-width-subtle) solid var(--lui-surface-stroke)",
                overflow: "hidden",
                boxShadow: "var(--lui-shadow-elevated)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "var(--lui-dashboard-grid-gap)",
                  padding: "var(--lui-dashboard-table-section-padding)",
                  borderBottom: "var(--lui-border-width-subtle) solid var(--lui-surface-stroke)",
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
                      margin: "var(--lui-dashboard-status-padding-x) 0 0",
                      fontSize: "var(--lui-dashboard-table-cell-font)",
                      color: "var(--lui-text-secondary)",
                    }}
                  >
                    Latest purchases across delivery, pickup, and subscription orders.
                  </p>
                </div>
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
                    <tr style={{ borderBottom: "var(--lui-border-width-subtle) solid var(--lui-surface-stroke)" }}>
                      {["Order", "Customer", "Date", "Amount", "Status"].map((heading) => (
                        <th
                          key={heading}
                          scope="col"
                          style={{
                            padding: "var(--lui-dashboard-table-head-padding-y) var(--lui-dashboard-table-head-padding-x)",
                            fontSize: "var(--lui-dashboard-table-head-font)",
                            fontWeight: "var(--lui-dashboard-table-head-font-weight)",
                            color: "var(--lui-text-muted)",
                            textAlign: "left",
                          }}
                        >
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((row) => {
                      const tone = statusToneMap[row.status];

                      return (
                        <tr key={row.order} className="tableRow">
                          <td
                            style={{
                              padding: "var(--lui-dashboard-table-cell-padding-y) var(--lui-dashboard-table-cell-padding-x)",
                              fontSize: "var(--lui-dashboard-table-cell-font)",
                              fontWeight: "var(--lui-dashboard-table-emphasis-font-weight)",
                              color: "var(--lui-text-primary)",
                              borderBottom: "var(--lui-border-width-subtle) solid var(--lui-surface-stroke)",
                            }}
                          >
                            {row.order}
                          </td>
                          <td
                            style={{
                              padding: "var(--lui-dashboard-table-cell-padding-y) var(--lui-dashboard-table-cell-padding-x)",
                              fontSize: "var(--lui-dashboard-table-cell-font)",
                              color: "var(--lui-text-primary)",
                              borderBottom: "var(--lui-border-width-subtle) solid var(--lui-surface-stroke)",
                            }}
                          >
                            {row.customer}
                          </td>
                          <td
                            style={{
                              padding: "var(--lui-dashboard-table-cell-padding-y) var(--lui-dashboard-table-cell-padding-x)",
                              fontSize: "var(--lui-dashboard-table-cell-font)",
                              color: "var(--lui-text-secondary)",
                              borderBottom: "var(--lui-border-width-subtle) solid var(--lui-surface-stroke)",
                            }}
                          >
                            {row.date}
                          </td>
                          <td
                            style={{
                              padding: "var(--lui-dashboard-table-cell-padding-y) var(--lui-dashboard-table-cell-padding-x)",
                              fontSize: "var(--lui-dashboard-table-cell-font)",
                              fontWeight: "var(--lui-dashboard-table-emphasis-font-weight)",
                              color: "var(--lui-text-primary)",
                              borderBottom: "var(--lui-border-width-subtle) solid var(--lui-surface-stroke)",
                            }}
                          >
                            {row.amount}
                          </td>
                          <td
                            style={{
                              padding: "var(--lui-dashboard-table-cell-padding-y) var(--lui-dashboard-table-cell-padding-x)",
                              fontSize: "var(--lui-dashboard-table-cell-font)",
                              color: "var(--lui-text-secondary)",
                              borderBottom: "var(--lui-border-width-subtle) solid var(--lui-surface-stroke)",
                            }}
                          >
                            <span
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: "var(--lui-dashboard-status-padding-y) var(--lui-dashboard-status-padding-x)",
                                borderRadius: "var(--lui-dashboard-status-radius)",
                                fontSize: "var(--lui-dashboard-status-font)",
                                fontWeight: "var(--lui-dashboard-status-font-weight)",
                                background: tone.bg,
                                color: tone.fg,
                              }}
                            >
                              {row.status}
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
