"use client";

import { useState } from "react";
import {
  Bell,
  SidebarSimple,
  SquaresFour,
  Package,
  Cube,
  Users,
  GearSix,
} from "@phosphor-icons/react";

const BUSINESS_NAME = "Aureon AI Operations";

const NAV_ITEMS = [
  { id: "overview", label: "Overview", Icon: SquaresFour },
  { id: "usage", label: "Employees", Icon: Users },
  { id: "projects", label: "Projects", Icon: Package },
  { id: "models", label: "Models", Icon: Cube },
  { id: "settings", label: "Settings", Icon: GearSix },
] as const;

const REQUIREMENTS = {
  sectionTitle: "Recent employee token activity",
  metricLabels: [
    "Daily Tokens",
    "Active Employees",
    "Models in Use",
    "Avg Tokens / Employee",
  ],
  tableHeaders: [
    "Employee",
    "Department",
    "Model",
    "Tokens (7d)",
    "Status",
    "Updated",
  ],
  statusLabels: {
    healthy: "Healthy",
    review: "Review",
    breach: "Breach Risk",
  },
} as const;

const METRICS = [
  {
    label: REQUIREMENTS.metricLabels[0],
    value: "1,842,900",
    delta: "+8.7% this week",
    featured: true,
  },
  {
    label: REQUIREMENTS.metricLabels[1],
    value: "47",
    delta: "28 employees in active sessions",
  },
  {
    label: REQUIREMENTS.metricLabels[2],
    value: "9",
    delta: "2 new model deployments",
  },
  {
    label: REQUIREMENTS.metricLabels[3],
    value: "39,200",
    delta: "3.1% above target",
  },
] as const;

const RECENT_TOKEN_ACTIVITY = [
  {
    employee: "Maya Chen",
    department: "Sales Enablement",
    model: "GPT-5.4",
    tokens: "86,120",
    status: REQUIREMENTS.statusLabels.healthy,
    updated: "09:14 • Today",
  },
  {
    employee: "Noah Rivera",
    department: "Product Strategy",
    model: "Claude 4 Opus",
    tokens: "72,940",
    status: REQUIREMENTS.statusLabels.review,
    updated: "10:02 • Today",
  },
  {
    employee: "Lena Torres",
    department: "Support Automation",
    model: "Gemini 2.0",
    tokens: "61,310",
    status: REQUIREMENTS.statusLabels.healthy,
    updated: "08:47 • Today",
  },
  {
    employee: "Ibrahim Shah",
    department: "Research Ops",
    model: "GPT-5.4",
    tokens: "54,670",
    status: REQUIREMENTS.statusLabels.breach,
    updated: "Yesterday",
  },
  {
    employee: "Amelia Brooks",
    department: "Marketing",
    model: "Claude 4 Sonnet",
    tokens: "48,205",
    status: REQUIREMENTS.statusLabels.review,
    updated: "11:31 • Today",
  },
] as const;

type StatusTone = "success" | "warning" | "danger";

const STATUS_TONES: Record<string, StatusTone> = {
  [REQUIREMENTS.statusLabels.healthy]: "success",
  [REQUIREMENTS.statusLabels.review]: "warning",
  [REQUIREMENTS.statusLabels.breach]: "danger",
};

function statusTone(status: string): StatusTone {
  return STATUS_TONES[status] ?? "warning";
}

export default function Page() {
  const [expanded, setExpanded] = useState(true);
  const [activeNav, setActiveNav] = useState(NAV_ITEMS[0].id);

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
          --lui-shadow-elevated: 0 1px 2px 0 rgb(0 0 0 / 0.05);
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
          --lui-appnav-section-gap: 4px;
          --lui-appnav-item-font: 13px;
          --lui-appnav-item-font-weight: 400;
          --lui-appnav-header-font: 14px;
          --lui-appnav-header-font-weight: 500;
          --lui-appnav-logo-padding-x: 6px;
          --lui-app-content-inset: 8px;
          --lui-app-content-radius: 8px;
          --lui-app-content-shadow: 0 0 0 1px var(--lui-surface-stroke-strong), 0px 3px 6px -2px rgb(0 0 0 / 0.02);
          --lui-viewport-app-height: 100dvh;
          --lui-border-width-subtle: 1px;
          --lui-border-width-hairline: 0.5px;
          --lui-focus-ring-width: 2px;
          --lui-focus-ring-offset-inset: -2px;
          --lui-motion-duration-fast: 200ms;
          --lui-motion-ease-standard: ease;
          --lui-toolbar-height: 40px;
          --lui-toolbar-font: 14px;
          --lui-toolbar-font-weight: 500;
          --lui-font-sans: Inter, ui-sans-serif, system-ui, sans-serif;
          --lui-radius-md: 6px;
          --lui-radius-lg: 8px;
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
          --lui-spacing-page-x: 16px;
          --lui-spacing-page-y: 24px;
        }

        .dashboard-shell {
          display: flex;
          height: var(--lui-viewport-app-height);
          overflow: hidden;
          background: var(--lui-chrome);
          color: var(--lui-text-primary);
          font-family: var(--lui-font-sans);
        }

        .dashboard-shell * {
          box-sizing: border-box;
        }

        .app-nav {
          flex-shrink: 0;
          width: var(--lui-appnav-width);
          background: var(--lui-appnav-bg);
          padding: var(--lui-appnav-shell-padding-y) 0;
          overflow: hidden;
          transition:
            width var(--lui-motion-duration-fast) var(--lui-motion-ease-standard),
            opacity var(--lui-motion-duration-fast) var(--lui-motion-ease-standard);
          display: flex;
          flex-direction: column;
          gap: var(--lui-appnav-section-gap);
        }

        .app-nav[data-expanded="true"] {
          width: var(--lui-appnav-width-expanded);
        }

        .app-navHeader {
          height: var(--lui-appnav-header-height);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-inline: var(--lui-appnav-rail-padding);
          gap: var(--lui-appnav-item-gap);
        }

        .app-navLogo {
          flex: 1;
          min-width: 0;
          max-width: 0;
          display: flex;
          align-items: center;
          height: 100%;
          color: var(--lui-appnav-header-color);
          font-size: var(--lui-appnav-header-font);
          font-weight: var(--lui-appnav-header-font-weight);
          letter-spacing: 0;
          padding-left: 0;
          padding-right: 0;
          opacity: 1;
          white-space: nowrap;
          overflow: hidden;
          transition:
            opacity var(--lui-motion-duration-fast) var(--lui-motion-ease-standard),
            max-width var(--lui-motion-duration-fast) var(--lui-motion-ease-standard),
            padding var(--lui-motion-duration-fast) var(--lui-motion-ease-standard);
        }

        .app-nav[data-expanded="false"] .app-navLogo {
          opacity: 0;
          max-width: 0;
          padding-left: 0;
          padding-right: 0;
          pointer-events: none;
        }

        .app-nav[data-expanded="true"] .app-navLogo {
          max-width: var(--lui-appnav-width-expanded);
          padding-left: var(--lui-appnav-logo-padding-x);
          padding-right: var(--lui-appnav-logo-padding-x);
        }

        .app-navToggle {
          width: var(--lui-appnav-item-size);
          height: var(--lui-appnav-item-size);
          border: none;
          border-radius: var(--lui-appnav-item-radius);
          background: transparent;
          color: var(--lui-appnav-toggle-fg);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          cursor: pointer;
          transition:
            color var(--lui-motion-duration-fast) var(--lui-motion-ease-standard),
            background-color var(--lui-motion-duration-fast) var(--lui-motion-ease-standard);
        }

        .app-navToggle:hover,
        .app-navToggle:focus-visible {
          color: var(--lui-appnav-item-active-fg);
          background: var(--lui-appnav-states-hover-bg);
          outline: none;
          box-shadow: inset 0 0 0 var(--lui-focus-ring-width) var(--lui-focus-ring-color);
        }

        .app-navList {
          display: flex;
          flex-direction: column;
          gap: var(--lui-appnav-item-gap);
          padding: 0 var(--lui-appnav-rail-padding);
        }

        .app-navItem {
          width: 100%;
          display: flex;
          align-items: center;
          gap: var(--lui-appnav-item-gap);
          height: var(--lui-appnav-item-size);
          border: none;
          border-radius: var(--lui-appnav-item-radius);
          background: transparent;
          color: var(--lui-appnav-item-fg);
          cursor: pointer;
          padding: 0;
          text-align: left;
          transition: background-color var(--lui-motion-duration-fast) var(--lui-motion-ease-standard);
        }

        .app-navItem:hover {
          background: var(--lui-appnav-states-hover-bg);
        }

        .app-navItem:focus-visible {
          outline: none;
          box-shadow: inset 0 0 0 var(--lui-focus-ring-width) var(--lui-focus-ring-color);
        }

        .app-navItem[data-active="true"] {
          background: var(--lui-appnav-states-active-bg);
          color: var(--lui-appnav-item-active-fg);
        }

        .app-navItemIconWrap {
          width: var(--lui-appnav-item-size);
          height: var(--lui-appnav-item-size);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .app-navItemIcon {
          width: var(--lui-appnav-icon-size);
          height: var(--lui-appnav-icon-size);
        }

        .app-navItemLabel {
          font-size: var(--lui-appnav-item-font);
          font-weight: var(--lui-appnav-item-font-weight);
          color: inherit;
          white-space: nowrap;
          overflow: hidden;
            opacity: 1;
            transition:
            opacity var(--lui-motion-duration-fast) var(--lui-motion-ease-standard),
            max-width var(--lui-motion-duration-fast) var(--lui-motion-ease-standard);
        }

        .app-nav[data-expanded="false"] .app-navItemLabel {
          opacity: 0;
          max-width: 0;
        }

        .app-content {
          flex: 1;
          margin: var(--lui-app-content-inset) var(--lui-app-content-inset) var(--lui-app-content-inset) 0;
          border-radius: var(--lui-app-content-radius);
          background: var(--lui-content);
          box-shadow: var(--lui-app-content-shadow);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .app-contentHeader {
          height: var(--lui-toolbar-height);
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 var(--lui-spacing-page-x);
          border-bottom: var(--lui-border-width-subtle) solid var(--lui-surface-stroke);
        }

        .app-contentHeaderTitle {
          font-size: var(--lui-toolbar-font);
          font-weight: var(--lui-toolbar-font-weight);
          color: var(--lui-text-primary);
        }

        .notificationButton {
          width: var(--lui-appnav-item-size);
          height: var(--lui-appnav-item-size);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: none;
          border-radius: var(--lui-radius-md);
          background: transparent;
          color: var(--lui-icon);
          cursor: pointer;
          transition:
            color var(--lui-motion-duration-fast) var(--lui-motion-ease-standard),
            background-color var(--lui-motion-duration-fast) var(--lui-motion-ease-standard);
        }

        .notificationButton:hover,
        .notificationButton:focus-visible {
          color: var(--lui-text-primary);
          background: var(--lui-appnav-states-hover-bg);
          outline: none;
          box-shadow: inset 0 0 0 var(--lui-focus-ring-width) var(--lui-focus-ring-color);
        }

        .pageMain {
          flex: 1;
          overflow-y: auto;
          padding: var(--lui-spacing-page-y) var(--lui-spacing-page-x);
          display: flex;
          flex-direction: column;
          gap: var(--lui-dashboard-section-gap);
          min-width: 0;
        }

        .metricsGrid {
          display: grid;
          grid-template-columns: repeat(4, minmax(var(--lui-dashboard-card-min-width), 1fr));
          gap: var(--lui-dashboard-grid-gap);
        }

        .metricCard {
          padding: var(--lui-dashboard-card-padding);
          border-radius: var(--lui-dashboard-card-radius);
          border: var(--lui-border-width-subtle) solid var(--lui-surface-stroke);
          background: var(--lui-surface);
          box-shadow: var(--lui-shadow-elevated);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .metricCardLabel {
          font-size: var(--lui-dashboard-card-label-font);
          font-weight: var(--lui-dashboard-card-label-font-weight);
          color: var(--lui-text-muted);
          display: block;
        }

        .metricCardValue {
          font-size: var(--lui-dashboard-card-value-font);
          font-weight: var(--lui-dashboard-card-value-font-weight);
          color: var(--lui-text-primary);
          margin-top: var(--lui-dashboard-card-value-gap);
        }

        .metricCardValueFeature {
          color: var(--lui-dashboard-feature-fg);
        }

        .metricCardDelta {
          margin-top: var(--lui-dashboard-card-value-gap);
          color: var(--lui-text-secondary);
          font-size: var(--lui-dashboard-status-font);
          font-weight: var(--lui-dashboard-card-label-font-weight);
        }

        .metricCardDeltaFeature {
          color: var(--lui-dashboard-feature-muted);
        }

        .metricCardFeature {
          background: var(--lui-dashboard-feature-bg);
          border-color: var(--lui-dashboard-feature-border);
          position: relative;
          overflow: hidden;
        }

        .ordersSection {
          background: var(--lui-surface);
          border: var(--lui-border-width-subtle) solid var(--lui-surface-stroke);
          border-radius: var(--lui-dashboard-card-radius);
          box-shadow: var(--lui-shadow-elevated);
          overflow: hidden;
        }

        .ordersSectionHead {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--lui-dashboard-table-section-padding);
          border-bottom: var(--lui-border-width-subtle) solid var(--lui-surface-stroke);
        }

        .ordersSectionTitle {
          margin: 0;
          font-size: var(--lui-dashboard-table-title-font);
          font-weight: var(--lui-dashboard-table-title-font-weight);
          color: var(--lui-text-primary);
        }

        .ordersSectionCount {
          color: var(--lui-text-muted);
          font-size: var(--lui-dashboard-status-font);
          font-weight: var(--lui-dashboard-status-font-weight);
        }

        .ordersTable {
          width: 100%;
          min-width: var(--lui-dashboard-table-min-width);
          border-collapse: collapse;
        }

        .ordersTable thead th {
          text-align: left;
          padding: var(--lui-dashboard-table-head-padding-y) var(--lui-dashboard-table-head-padding-x);
          font-size: var(--lui-dashboard-table-head-font);
          font-weight: var(--lui-dashboard-table-head-font-weight);
          color: var(--lui-text-muted);
          border-bottom: var(--lui-border-width-subtle) solid var(--lui-surface-stroke);
        }

        .ordersTable tbody td {
          padding: var(--lui-dashboard-table-cell-padding-y) var(--lui-dashboard-table-cell-padding-x);
          font-size: var(--lui-dashboard-table-cell-font);
          border-bottom: var(--lui-border-width-subtle) solid var(--lui-surface-stroke);
        }

        .ordersTable tbody tr:last-child td {
          border-bottom: none;
        }

        .ordersTableCellHighlight {
          font-weight: var(--lui-dashboard-table-emphasis-font-weight);
          color: var(--lui-text-primary);
        }

        .ordersTableCellMuted {
          color: var(--lui-text-secondary);
        }

        .statusBadge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--lui-dashboard-status-radius);
          padding: var(--lui-dashboard-status-padding-y) var(--lui-dashboard-status-padding-x);
          font-size: var(--lui-dashboard-status-font);
          font-weight: var(--lui-dashboard-status-font-weight);
          border: var(--lui-border-width-hairline) solid transparent;
        }

        .statusBadge-success {
          color: var(--lui-status-success-fg);
          background: var(--lui-status-success-bg);
        }

        .statusBadge-warning {
          color: var(--lui-status-warning-fg);
          background: var(--lui-status-warning-bg);
        }

        .statusBadge-danger {
          color: var(--lui-status-danger-fg);
          background: var(--lui-status-danger-bg);
        }
      `}</style>
      <div className="dashboard-shell">
        <nav className="app-nav" aria-label="Primary navigation" data-expanded={expanded}>
          <div className="app-navHeader">
            <div className="app-navLogo">{BUSINESS_NAME}</div>
            <button
              type="button"
              className="app-navToggle"
              onClick={() => setExpanded((prev) => !prev)}
              aria-expanded={expanded}
              aria-label="Toggle navigation"
            >
              <SidebarSimple weight="regular" className="app-navItemIcon" />
            </button>
          </div>
          <div className="app-navList">
            {NAV_ITEMS.map((item) => {
              const isActive = activeNav === item.id;
              const Icon = item.Icon;
              return (
                <button
                  type="button"
                  key={item.id}
                  className="app-navItem"
                  onClick={() => setActiveNav(item.id)}
                  data-active={isActive}
                  title={item.label}
                  aria-label={item.label}
                >
                  <span className="app-navItemIconWrap">
                    <Icon weight={isActive ? "fill" : "regular"} className="app-navItemIcon" />
                  </span>
                  <span className="app-navItemLabel">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
        <div className="app-content">
          <header className="app-contentHeader">
            <span className="app-contentHeaderTitle">{BUSINESS_NAME}</span>
            <button type="button" className="notificationButton" aria-label="Notifications">
              <Bell />
            </button>
          </header>
          <main className="pageMain">
            <section>
              <div className="metricsGrid">
                {METRICS.map((metric) => {
                  const isFeatured = metric.featured || false;
                  return (
                    <article
                      key={metric.label}
                      className={`metricCard ${isFeatured ? "metricCardFeature" : ""}`}
                    >
                      <span className="metricCardLabel">{metric.label}</span>
                      <span className={`metricCardValue ${isFeatured ? "metricCardValueFeature" : ""}`}>
                        {metric.value}
                      </span>
                      <span className={`metricCardDelta ${isFeatured ? "metricCardDeltaFeature" : ""}`}>
                        {metric.delta}
                      </span>
                    </article>
                  );
                })}
              </div>
            </section>

            <section className="ordersSection">
              <div className="ordersSectionHead">
                <h2 className="ordersSectionTitle">{REQUIREMENTS.sectionTitle}</h2>
                <span className="ordersSectionCount">{RECENT_TOKEN_ACTIVITY.length} rows</span>
              </div>
              <table className="ordersTable">
                <thead>
                  <tr>
                    {REQUIREMENTS.tableHeaders.map((header) => (
                      <th key={header}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {RECENT_TOKEN_ACTIVITY.map((row) => (
                    <tr key={row.employee}>
                      <td className="ordersTableCellHighlight">{row.employee}</td>
                      <td>{row.department}</td>
                      <td>{row.model}</td>
                      <td className="ordersTableCellHighlight">{row.tokens}</td>
                      <td>
                        <span className={`statusBadge statusBadge-${statusTone(row.status)}`}>{row.status}</span>
                      </td>
                      <td className="ordersTableCellMuted">{row.updated}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
