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
  { label: "Revenue", value: "$18,420", detail: "+12.4% from last month" },
  { label: "Orders", value: "324", detail: "48 awaiting fulfillment" },
  { label: "Customers", value: "1,284", detail: "73 new this week" },
  { label: "Avg Order Value", value: "$56.85", detail: "+4.1% vs prior period" },
] as const;

const RECENT_ORDERS = [
  { id: "#1001", customer: "Jane Smith", date: "Mar 15, 2026", amount: "$142.00", status: "Completed" },
  { id: "#1002", customer: "Carlos Reyes", date: "Mar 16, 2026", amount: "$89.50", status: "Processing" },
  { id: "#1003", customer: "Ava Johnson", date: "Mar 17, 2026", amount: "$210.25", status: "Pending" },
  { id: "#1004", customer: "Mina Patel", date: "Mar 18, 2026", amount: "$64.75", status: "Shipped" },
  { id: "#1005", customer: "Lucas Brown", date: "Mar 19, 2026", amount: "$37.20", status: "Cancelled" },
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
  const [active, setActive] = useState<(typeof NAV_ITEMS)[number]["id"]>("overview");

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
          --lui-appnav-toggle-fg: #9e9ea1;
          --lui-appnav-header-color: #1b1b1b;
          --lui-appnav-item-fg: #5d5d5f;
          --lui-appnav-item-active-fg: #1b1b1b;
          --lui-appnav-states-hover-bg: #e1e1e1;
          --lui-appnav-states-active-bg: #e1e1e1;
          --lui-appnav-header-height: 32px;
          --lui-appnav-logo-padding-x: 6px;
          --lui-appnav-header-font: 14px;
          --lui-appnav-header-font-weight: 500;
          --lui-appnav-width: 48px;
          --lui-appnav-width-expanded: 220px;
          --lui-appnav-item-size: 32px;
          --lui-appnav-icon-size: 18px;
          --lui-appnav-shell-padding-y: 8px;
          --lui-appnav-section-gap: 4px;
          --lui-appnav-rail-padding: 8px;
          --lui-appnav-item-radius: 6px;
          --lui-appnav-item-gap: 1px;
          --lui-appnav-item-font: 13px;
          --lui-appnav-item-font-weight: 400;
          --lui-shadow-elevated: 0 1px 2px 0 rgb(0 0 0 / 0.05);
          --lui-toolbar-height: 40px;
          --lui-toolbar-font: 14px;
          --lui-toolbar-font-weight: 500;
          --lui-font-sans: Inter, ui-sans-serif, system-ui, sans-serif;
          --lui-radius-md: 6px;
          --lui-radius-lg: 8px;
          --lui-size-zero: 0px;
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
            transition: [
              "width var(--lui-motion-duration-fast) var(--lui-motion-ease-standard)",
            ].join(""),
            background: "var(--lui-appnav-bg)",
            overflow: "hidden",
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            paddingTop: "var(--lui-appnav-shell-padding-y)",
            paddingBottom: "var(--lui-appnav-shell-padding-y)",
            gap: "var(--lui-appnav-section-gap)",
          }}
        >
          <div
            style={{
              height: "var(--lui-appnav-header-height)",
              display: "flex",
              alignItems: "center",
              paddingLeft: "var(--lui-appnav-rail-padding)",
              paddingRight: "var(--lui-appnav-rail-padding)",
            }}
          >
            <div
              aria-hidden={!expanded}
              style={{
                flex: 1,
                minWidth: "var(--lui-size-zero)",
                opacity: expanded ? 1 : 0,
                overflow: "hidden",
                whiteSpace: "nowrap",
                paddingLeft: expanded ? "var(--lui-appnav-logo-padding-x)" : "var(--lui-size-zero)",
                paddingRight: expanded ? "var(--lui-appnav-logo-padding-x)" : "var(--lui-size-zero)",
                transition: [
                  "opacity var(--lui-motion-duration-fast) var(--lui-motion-ease-standard)",
                  "padding var(--lui-motion-duration-fast) var(--lui-motion-ease-standard)",
                ].join(", "),
                color: "var(--lui-appnav-header-color)",
                fontSize: "var(--lui-appnav-header-font)",
                fontWeight: "var(--lui-appnav-header-font-weight)",
              }}
            >
              Bloom and Co
            </div>

            <button
              type="button"
              onClick={() => setExpanded((value) => !value)}
              aria-label={expanded ? "Collapse navigation" : "Expand navigation"}
              style={{
                width: "var(--lui-appnav-item-size)",
                height: "var(--lui-appnav-item-size)",
                borderRadius: "var(--lui-appnav-item-radius)",
                border: "none",
                background: "transparent",
                color: "var(--lui-appnav-toggle-fg)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                cursor: "pointer",
                boxShadow: "none",
                transition: [
                  "background-color var(--lui-motion-duration-fast) var(--lui-motion-ease-standard)",
                  "color var(--lui-motion-duration-fast) var(--lui-motion-ease-standard)",
                  "box-shadow var(--lui-motion-duration-fast) var(--lui-motion-ease-standard)",
                ].join(", "),
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.background = "var(--lui-appnav-states-hover-bg)";
                event.currentTarget.style.color = "var(--lui-appnav-item-active-fg)";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.background = "transparent";
                event.currentTarget.style.color = "var(--lui-appnav-toggle-fg)";
              }}
              onFocus={(event) => {
                event.currentTarget.style.outline =
                  "var(--lui-focus-ring-width) solid var(--lui-focus-ring-color)";
                event.currentTarget.style.outlineOffset = "var(--lui-focus-ring-offset-inset)";
              }}
              onBlur={(event) => {
                event.currentTarget.style.outline = "none";
                event.currentTarget.style.outlineOffset = "var(--lui-focus-ring-offset-inset)";
              }}
            >
              <SidebarSimple size="var(--lui-appnav-icon-size)" weight="regular" />
            </button>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--lui-appnav-item-gap)",
              paddingLeft: "var(--lui-appnav-rail-padding)",
              paddingRight: "var(--lui-appnav-rail-padding)",
            }}
          >
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = item.id === active;

              return (
                <button
                  key={item.id}
                  type="button"
                  title={expanded ? undefined : item.label}
                  onClick={() => setActive(item.id)}
                  style={{
                    height: "var(--lui-appnav-item-size)",
                    width: "100%",
                    border: "none",
                    borderRadius: "var(--lui-appnav-item-radius)",
                    background: isActive ? "var(--lui-appnav-states-active-bg)" : "transparent",
                    color: isActive ? "var(--lui-appnav-item-active-fg)" : "var(--lui-appnav-item-fg)",
                    display: "flex",
                    alignItems: "center",
                    padding: "var(--lui-size-zero)",
                    cursor: "pointer",
                    overflow: "hidden",
                    boxShadow: "none",
                    transition: [
                      "background-color var(--lui-motion-duration-fast) var(--lui-motion-ease-standard)",
                      "color var(--lui-motion-duration-fast) var(--lui-motion-ease-standard)",
                      "box-shadow var(--lui-motion-duration-fast) var(--lui-motion-ease-standard)",
                    ].join(", "),
                  }}
                  onMouseEnter={(event) => {
                    if (!isActive) {
                      event.currentTarget.style.background = "var(--lui-appnav-states-hover-bg)";
                    }
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.background = isActive
                      ? "var(--lui-appnav-states-active-bg)"
                      : "transparent";
                  }}
                  onFocus={(event) => {
                    event.currentTarget.style.outline =
                      "var(--lui-focus-ring-width) solid var(--lui-focus-ring-color)";
                    event.currentTarget.style.outlineOffset = "var(--lui-focus-ring-offset-inset)";
                  }}
                  onBlur={(event) => {
                    event.currentTarget.style.outline = "none";
                    event.currentTarget.style.outlineOffset = "var(--lui-focus-ring-offset-inset)";
                  }}
                >
                  <span
                    style={{
                      width: "var(--lui-appnav-item-size)",
                      minWidth: "var(--lui-appnav-item-size)",
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
                    style={{
                      opacity: expanded ? 1 : 0,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      transition: "opacity var(--lui-motion-duration-fast) var(--lui-motion-ease-standard)",
                      fontSize: "var(--lui-appnav-item-font)",
                      fontWeight: "var(--lui-appnav-item-font-weight)",
                      paddingRight: "var(--lui-appnav-logo-padding-x)",
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
            minWidth: "var(--lui-size-zero)",
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
              paddingLeft: "var(--lui-spacing-page-x)",
              paddingRight: "var(--lui-spacing-page-x)",
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
              style={{
                width: "var(--lui-appnav-item-size)",
                height: "var(--lui-appnav-item-size)",
                borderRadius: "var(--lui-radius-md)",
                border: "none",
                background: "transparent",
                color: "var(--lui-icon)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "none",
                transition: [
                  "background-color var(--lui-motion-duration-fast) var(--lui-motion-ease-standard)",
                  "color var(--lui-motion-duration-fast) var(--lui-motion-ease-standard)",
                  "box-shadow var(--lui-motion-duration-fast) var(--lui-motion-ease-standard)",
                ].join(", "),
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.background = "var(--lui-appnav-states-hover-bg)";
                event.currentTarget.style.color = "var(--lui-text-primary)";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.background = "transparent";
                event.currentTarget.style.color = "var(--lui-icon)";
              }}
              onFocus={(event) => {
                event.currentTarget.style.outline =
                  "var(--lui-focus-ring-width) solid var(--lui-focus-ring-color)";
                event.currentTarget.style.outlineOffset = "var(--lui-focus-ring-offset-inset)";
              }}
              onBlur={(event) => {
                event.currentTarget.style.outline = "none";
                event.currentTarget.style.outlineOffset = "var(--lui-focus-ring-offset-inset)";
              }}
            >
              <Bell size="var(--lui-appnav-icon-size)" weight="regular" />
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
                gridTemplateColumns: "repeat(auto-fit, minmax(var(--lui-dashboard-card-min-width), 1fr))",
                gap: "var(--lui-dashboard-grid-gap)",
              }}
            >
              {METRICS.map((metric) => (
                <article
                  key={metric.label}
                  style={{
                    minWidth: "var(--lui-size-zero)",
                    background: "var(--lui-surface)",
                    borderRadius: "var(--lui-dashboard-card-radius)",
                    border: "var(--lui-border-width-subtle) solid var(--lui-surface-stroke)",
                    boxShadow: "var(--lui-shadow-elevated)",
                    padding: "var(--lui-dashboard-card-padding)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "var(--lui-dashboard-card-label-font)",
                      fontWeight: "var(--lui-dashboard-card-label-font-weight)",
                      color: "var(--lui-text-muted)",
                    }}
                  >
                    {metric.label}
                  </div>
                  <div
                    style={{
                      marginTop: "var(--lui-dashboard-card-value-gap)",
                      fontSize: "var(--lui-dashboard-card-value-font)",
                      fontWeight: "var(--lui-dashboard-card-value-font-weight)",
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
                  padding: "var(--lui-dashboard-table-section-padding)",
                  borderBottom: "var(--lui-border-width-subtle) solid var(--lui-surface-stroke)",
                }}
              >
                <h2
                  id="recent-orders-heading"
                  style={{
                    margin: "var(--lui-size-zero)",
                    fontSize: "var(--lui-dashboard-table-title-font)",
                    fontWeight: "var(--lui-dashboard-table-title-font-weight)",
                    color: "var(--lui-text-primary)",
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
                    <tr style={{ borderBottom: "var(--lui-border-width-subtle) solid var(--lui-surface-stroke)" }}>
                      {["Order", "Customer", "Date", "Amount", "Status"].map((heading) => (
                        <th
                          key={heading}
                          scope="col"
                          style={{
                            textAlign: "left",
                            padding:
                              "var(--lui-dashboard-table-head-padding-y) var(--lui-dashboard-table-head-padding-x)",
                            fontSize: "var(--lui-dashboard-table-head-font)",
                            fontWeight: "var(--lui-dashboard-table-head-font-weight)",
                            color: "var(--lui-text-muted)",
                          }}
                        >
                          {heading}
                        </th>
                      ))}
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
                            fontWeight: "var(--lui-dashboard-table-emphasis-font-weight)",
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
                            fontWeight: "var(--lui-dashboard-table-emphasis-font-weight)",
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
                              fontWeight: "var(--lui-dashboard-status-font-weight)",
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
