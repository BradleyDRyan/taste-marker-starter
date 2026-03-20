"use client";

import { useState } from "react";
import {
  Bell,
  SidebarSimple,
  SquaresFour,
  Users,
  Package,
  Cube,
  GearSix,
} from "@phosphor-icons/react";

const BRAND = {
  name: "Northline AI Systems",
} as const;

const NAV_ITEMS = [
  { label: "Overview", icon: SquaresFour },
  { label: "Employees", icon: Users },
  { label: "Token Pools", icon: Package },
  { label: "Model Fleet", icon: Cube },
  { label: "Settings", icon: GearSix },
] as const;

const METRICS = [
  {
    key: "tokens",
    label: "Total Tokens Used",
    value: "1,284,320",
    detail: "Across all assistants and automation workflows.",
    delta: "+6.4% vs last week",
    featured: true,
    tone: "elevated",
  },
  {
    key: "employees",
    label: "Active Employees",
    value: "47",
    detail: "42 with API keys rotating today.",
    delta: "+3 new this month",
    tone: "neutral",
  },
  {
    key: "daily",
    label: "Daily Burn Rate",
    value: "62,410",
    detail: "Average daily spend in token-equivalent units.",
    delta: "+11% above target",
    tone: "neutral",
  },
  {
    key: "avg",
    label: "Avg Tokens / Employee",
    value: "27,332",
    detail: "Top decile is still the internal QA pod.",
    delta: "+2.1% in quality tasks",
    tone: "neutral",
  },
] as const;

const SECTION_COPY = {
  metricsSectionTitle: "Usage summary",
  tableSectionTitle: "Recent employee AI token usage",
  tableDescription: "Latest sessions, model choices, and cost health.",
  tableHeaders: ["Employee", "Session", "Model", "Date", "Tokens", "Status"] as const,
  statusSet: {
    completed: "Completed",
    processing: "Processing",
    pending: "Pending",
    shipped: "Shipped",
    cancelled: "Cancelled",
  },
} as const;

type Status = (typeof SECTION_COPY.statusSet)[keyof typeof SECTION_COPY.statusSet];

const recentOrders = [
  {
    employee: "Maya Ortiz",
    session: "#AI-10491",
    model: "gpt-4o-mini",
    date: "Mar 18, 2026 · 09:42",
    tokens: "12,480",
    status: SECTION_COPY.statusSet.completed,
  },
  {
    employee: "Dev Patel",
    session: "#AI-10490",
    model: "gpt-4o",
    date: "Mar 18, 2026 · 09:29",
    tokens: "21,320",
    status: SECTION_COPY.statusSet.processing,
  },
  {
    employee: "Lena Cho",
    session: "#AI-10488",
    model: "claude-3.5-sonnet",
    date: "Mar 18, 2026 · 08:57",
    status: SECTION_COPY.statusSet.pending,
    model: "gpt-4.1",
    tokens: "8,910",
  },
  {
    employee: "Noah Barnes",
    session: "#AI-10483",
    model: "gemini-1.5-pro",
    date: "Mar 18, 2026 · 08:16",
    tokens: "17,204",
    status: SECTION_COPY.statusSet.shipped,
  },
  {
    employee: "Ivy Morales",
    session: "#AI-10481",
    model: "gpt-4.1-mini",
    date: "Mar 18, 2026 · 07:44",
    tokens: "10,112",
    status: SECTION_COPY.statusSet.cancelled,
  },
] as const;

const STATUS_VARIANTS = {
  [SECTION_COPY.statusSet.completed]: "success",
  [SECTION_COPY.statusSet.processing]: "warning",
  [SECTION_COPY.statusSet.pending]: "warning",
  [SECTION_COPY.statusSet.shipped]: "success",
  [SECTION_COPY.statusSet.cancelled]: "danger",
} as const satisfies Record<Status, "success" | "warning" | "danger">;

export default function Page() {
  const [isNavExpanded, setIsNavExpanded] = useState(true);
  const [activeNav, setActiveNav] = useState(NAV_ITEMS[0].label);

  return (
    <>
      <style>{`
        :root {
          --lui-chrome: #f3f3f4;
          --lui-content: #fcfcfd;
          --lui-surface: #ffffff;
          --lui-surface-stroke: #f0f0f0;
          --lui-surface-stroke-strong: #e1e1e1;
          --lui-on-chrome-hover: #1b1b1b;
          --lui-on-chrome-selected: #1b1b1b;
          --lui-text-primary: #1b1b1b;
          --lui-text-secondary: #5d5d5f;
          --lui-text-muted: #9e9ea1;
          --lui-text-on: #ffffff;
          --lui-icon: #9e9ea1;
          --lui-focus-ring-color: #1b1b1b;

          --lui-status-success-bg: #dcfce7;
          --lui-status-success-fg: #166534;
          --lui-status-warning-bg: #fef3c7;
          --lui-status-warning-fg: #92400e;
          --lui-status-danger-bg: #fee2e2;
          --lui-status-danger-fg: #b91c1c;

          --lui-app-content-inset: 8px;
          --lui-app-content-radius: 8px;
          --lui-app-content-shadow: 0 0 0 1px #e1e1e1, 0px 3px 6px -2px rgb(0 0 0 / 0.02);
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
          --lui-appnav-item-font: 13px;
          --lui-appnav-item-font-weight: 400;
          --lui-appnav-header-font: 14px;
          --lui-appnav-header-font-weight: 500;
          --lui-appnav-section-gap: 4px;

          --lui-shadow-elevated: 0 1px 2px 0 rgb(0 0 0 / 0.05);
          --lui-toolbar-height: 40px;
          --lui-toolbar-font: 14px;
          --lui-toolbar-font-weight: 500;
          --lui-font-sans: Inter, ui-sans-serif, system-ui, sans-serif;

          --lui-radius-md: 6px;
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

          --lui-motion-duration-fast: 200ms;
          --lui-motion-ease-standard: ease;
          --lui-viewport-app-height: 100dvh;
          --lui-spacing-page-x: 16px;
          --lui-spacing-page-y: 24px;

          --lui-border-width-subtle: 1px;
          --lui-border-width-hairline: 0.5px;
          --lui-focus-ring-width: 2px;
          --lui-focus-ring-offset-inset: -2px;
        }

        .dashboardShell {
          display: flex;
          height: var(--lui-viewport-app-height);
          background: var(--lui-chrome);
          overflow: hidden;
          font-family: var(--lui-font-sans);
          color: var(--lui-text-primary);
        }

        .appNav {
          flex-shrink: 0;
          width: var(--lui-appnav-width);
          background: var(--lui-appnav-bg);
          padding: var(--lui-appnav-shell-padding-y) var(--lui-appnav-rail-padding);
          display: flex;
          flex-direction: column;
          gap: var(--lui-appnav-section-gap);
          overflow: hidden;
          transition: width var(--lui-motion-duration-fast) var(--lui-motion-ease-standard);
        }

        .appNav[data-expanded="true"] {
          width: var(--lui-appnav-width-expanded);
        }

        .appNavHeader {
          display: flex;
          align-items: center;
          height: var(--lui-appnav-header-height);
          gap: var(--lui-appnav-section-gap);
        }

        .appNavLogo {
          flex: 1;
          display: flex;
          align-items: center;
          color: var(--lui-appnav-header-color);
          font-size: var(--lui-appnav-header-font);
          font-weight: var(--lui-appnav-header-font-weight);
          padding-left: var(--lui-appnav-logo-padding-x);
          padding-right: 0;
          white-space: nowrap;
          overflow: hidden;
          opacity: 1;
          max-width: var(--lui-appnav-width-expanded);
          transition:
            opacity var(--lui-motion-duration-fast) var(--lui-motion-ease-standard),
            max-width var(--lui-motion-duration-fast) var(--lui-motion-ease-standard),
            padding-left var(--lui-motion-duration-fast) var(--lui-motion-ease-standard);
        }

        .appNav[data-expanded="false"] .appNavLogo {
          opacity: 0;
          max-width: 0;
          padding-left: 0;
        }

        .appNavToggle {
          width: var(--lui-appnav-item-size);
          height: var(--lui-appnav-item-size);
          border-radius: var(--lui-appnav-item-radius);
          border: none;
          background: transparent;
          color: var(--lui-appnav-toggle-fg);
          display: grid;
          place-items: center;
          flex-shrink: 0;
          cursor: pointer;
          transition: background-color var(--lui-motion-duration-fast) var(--lui-motion-ease-standard);
        }

        .appNavToggle:hover {
          background: var(--lui-appnav-states-hover-bg);
          color: var(--lui-appnav-item-active-fg);
        }

        .appNavToggle:focus-visible {
          outline: none;
          box-shadow: inset 0 0 0 var(--lui-focus-ring-width) var(--lui-focus-ring-color);
        }

        .appNavItems {
          display: flex;
          flex-direction: column;
          gap: var(--lui-appnav-item-gap);
        }

        .appNavItem {
          display: flex;
          align-items: center;
          height: var(--lui-appnav-item-size);
          width: 100%;
          border: none;
          background: transparent;
          border-radius: var(--lui-appnav-item-radius);
          color: var(--lui-appnav-item-fg);
          gap: var(--lui-appnav-rail-padding);
          padding: 0;
          text-align: left;
          cursor: pointer;
          transition:
            background-color var(--lui-motion-duration-fast) var(--lui-motion-ease-standard),
            color var(--lui-motion-duration-fast) var(--lui-motion-ease-standard);
        }

        .appNavItem:hover {
          background: var(--lui-appnav-states-hover-bg);
        }

        .appNavItem[data-active="true"] {
          background: var(--lui-appnav-states-active-bg);
          color: var(--lui-appnav-item-active-fg);
        }

        .appNavItem:focus-visible {
          outline: none;
          box-shadow: inset 0 0 0 var(--lui-focus-ring-width) var(--lui-focus-ring-color);
        }

        .appNavIconCell {
          width: var(--lui-appnav-item-size);
          min-width: var(--lui-appnav-item-size);
          display: grid;
          place-items: center;
          flex-shrink: 0;
        }

        .appNavIconGlyph {
          width: var(--lui-appnav-icon-size);
          height: var(--lui-appnav-icon-size);
        }

        .appNavItemLabel {
          font-size: var(--lui-appnav-item-font);
          font-weight: var(--lui-appnav-item-font-weight);
          color: inherit;
          white-space: nowrap;
          overflow: hidden;
          opacity: 1;
          transition:
            opacity var(--lui-motion-duration-fast) var(--lui-motion-ease-standard),
            max-width var(--lui-motion-duration-fast) var(--lui-motion-ease-standard);
          max-width: var(--lui-appnav-width-expanded);
        }

        .appNav[data-expanded="false"] .appNavItemLabel {
          opacity: 0;
          max-width: 0;
        }

        .appContent {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          margin-top: var(--lui-app-content-inset);
          margin-right: var(--lui-app-content-inset);
          margin-bottom: var(--lui-app-content-inset);
          margin-left: 0;
          background: var(--lui-content);
          border-radius: var(--lui-app-content-radius);
          box-shadow: var(--lui-app-content-shadow);
        }

        .appHeader {
          height: var(--lui-toolbar-height);
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: var(--lui-border-width-subtle) solid var(--lui-surface-stroke);
          padding: 0 var(--lui-spacing-page-x);
          background: var(--lui-content);
        }

        .appHeaderTitle {
          font-size: var(--lui-toolbar-font);
          font-weight: var(--lui-toolbar-font-weight);
          color: var(--lui-text-primary);
        }

        .appHeaderButton {
          width: var(--lui-appnav-item-size);
          height: var(--lui-appnav-item-size);
          border-radius: var(--lui-radius-md);
          border: none;
          background: transparent;
          display: grid;
          place-items: center;
          color: var(--lui-icon);
          cursor: pointer;
          transition: background-color var(--lui-motion-duration-fast) var(--lui-motion-ease-standard);
        }

        .appHeaderButton:hover {
          background: var(--lui-appnav-states-hover-bg);
          color: var(--lui-text-primary);
        }

        .appHeaderButton:focus-visible {
          outline: none;
          box-shadow: inset 0 0 0 var(--lui-focus-ring-width) var(--lui-focus-ring-color);
        }

        .appMain {
          flex: 1;
          overflow-y: auto;
          padding: var(--lui-spacing-page-y) var(--lui-spacing-page-x);
          display: flex;
          flex-direction: column;
          gap: var(--lui-dashboard-section-gap);
        }

        .metricsSection {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: var(--lui-dashboard-grid-gap);
        }

        .metricCard {
          background: var(--lui-surface);
          border-radius: var(--lui-dashboard-card-radius);
          border: var(--lui-border-width-subtle) solid var(--lui-surface-stroke);
          box-shadow: var(--lui-shadow-elevated);
          padding: var(--lui-dashboard-card-padding);
          min-width: var(--lui-dashboard-card-min-width);
          display: flex;
          flex-direction: column;
          gap: var(--lui-dashboard-card-value-gap);
          position: relative;
          overflow: hidden;
        }

        .metricCard[data-featured="true"] {
          background: var(--lui-dashboard-feature-bg);
          border-color: var(--lui-dashboard-feature-border);
          color: var(--lui-dashboard-feature-fg);
        }

        .metricCardLabel {
          font-size: var(--lui-dashboard-card-label-font);
          font-weight: var(--lui-dashboard-card-label-font-weight);
          color: var(--lui-text-muted);
        }

        .metricCard[data-featured="true"] .metricCardLabel {
          color: var(--lui-dashboard-feature-muted);
        }

        .metricCardValue {
          font-size: var(--lui-dashboard-card-value-font);
          font-weight: var(--lui-dashboard-card-value-font-weight);
          color: var(--lui-text-primary);
        }

        .metricCard[data-featured="true"] .metricCardValue {
          color: var(--lui-dashboard-feature-fg);
        }

        .metricCardDelta {
          font-size: var(--lui-dashboard-card-label-font);
          font-weight: var(--lui-dashboard-card-label-font-weight);
          color: var(--lui-text-secondary);
        }

        .metricCard[data-featured="true"] .metricCardDelta {
          color: var(--lui-dashboard-feature-muted);
        }

        .metricCardDetail {
          margin-top: auto;
          font-size: var(--lui-dashboard-card-label-font);
          color: var(--lui-text-secondary);
        }

        .metricCard[data-featured="true"] .metricCardDetail {
          color: color-mix(in srgb, var(--lui-dashboard-feature-muted) 90%, transparent);
        }

        .tableSection {
          background: var(--lui-surface);
          border: var(--lui-border-width-subtle) solid var(--lui-surface-stroke);
          border-radius: var(--lui-dashboard-card-radius);
          overflow: hidden;
        }

        .tableSectionHeader {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          padding: var(--lui-dashboard-table-section-padding);
          border-bottom: var(--lui-border-width-subtle) solid var(--lui-surface-stroke);
          gap: var(--lui-dashboard-card-padding);
        }

        .tableSectionTitle {
          margin: 0;
          font-size: var(--lui-dashboard-table-title-font);
          font-weight: var(--lui-dashboard-table-title-font-weight);
          color: var(--lui-text-primary);
        }

        .tableSectionDescription {
          margin: 0;
          font-size: var(--lui-dashboard-card-label-font);
          color: var(--lui-text-secondary);
        }

        .dashboardTable {
          width: 100%;
          min-width: var(--lui-dashboard-table-min-width);
          border-collapse: collapse;
          overflow-x: auto;
        }

        th,
        td {
          font-family: var(--lui-font-sans);
          text-align: left;
        }

        .dashboardTable thead {
          border-bottom: var(--lui-border-width-subtle) solid var(--lui-surface-stroke);
        }

        .dashboardTable th {
          padding: var(--lui-dashboard-table-head-padding-y) var(--lui-dashboard-table-head-padding-x);
          font-size: var(--lui-dashboard-table-head-font);
          font-weight: var(--lui-dashboard-table-head-font-weight);
          color: var(--lui-text-muted);
        }

        .dashboardTable tbody tr {
          border-bottom: var(--lui-border-width-subtle) solid var(--lui-surface-stroke);
        }

        .dashboardTable tbody tr:last-child {
          border-bottom: none;
        }

        .dashboardTable td {
          padding: var(--lui-dashboard-table-cell-padding-y) var(--lui-dashboard-table-cell-padding-x);
          font-size: var(--lui-dashboard-table-cell-font);
          color: var(--lui-text-primary);
          white-space: nowrap;
        }

        .dashboardSession,
        .dashboardAmount {
          font-weight: var(--lui-dashboard-table-emphasis-font-weight);
        }

        .dashboardDate,
        .dashboardModel,
        .dashboardStatus {
          color: var(--lui-text-secondary);
        }

        .statusBadge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: var(--lui-dashboard-status-padding-y) var(--lui-dashboard-status-padding-x);
          border-radius: var(--lui-dashboard-status-radius);
          font-size: var(--lui-dashboard-status-font);
          font-weight: var(--lui-dashboard-status-font-weight);
          border: var(--lui-border-width-hairline) solid transparent;
        }

        .statusBadge[data-variant="success"] {
          background: var(--lui-status-success-bg);
          color: var(--lui-status-success-fg);
        }

        .statusBadge[data-variant="warning"] {
          background: var(--lui-status-warning-bg);
          color: var(--lui-status-warning-fg);
        }

        .statusBadge[data-variant="danger"] {
          background: var(--lui-status-danger-bg);
          color: var(--lui-status-danger-fg);
        }
      `}</style>
      <div className="dashboardShell">
        <nav className="appNav" data-expanded={isNavExpanded}>
          <div className="appNavHeader">
            <div className="appNavLogo">
              <span>{BRAND.name}</span>
            </div>
            <button
              className="appNavToggle"
              type="button"
              aria-label={isNavExpanded ? "Collapse navigation" : "Expand navigation"}
              onClick={() => setIsNavExpanded((value) => !value)}
            >
              <SidebarSimple className="appNavIconGlyph" />
            </button>
          </div>
          <div className="appNavItems">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = item.label === activeNav;
              return (
                <button
                  key={item.label}
                  className="appNavItem"
                  type="button"
                  data-active={isActive}
                  onClick={() => setActiveNav(item.label)}
                  title={!isNavExpanded ? item.label : undefined}
                >
                  <span className="appNavIconCell">
                    <Icon
                      className="appNavIconGlyph"
                      weight={isActive ? "fill" : "regular"}
                    />
                  </span>
                  <span className="appNavItemLabel">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        <div className="appContent">
          <header className="appHeader">
            <strong className="appHeaderTitle">{BRAND.name}</strong>
            <button className="appHeaderButton" type="button" aria-label="Notifications">
              <Bell className="appNavIconGlyph" />
            </button>
          </header>

          <main className="appMain">
            <section className="metricsSection" aria-label={SECTION_COPY.metricsSectionTitle}>
              {METRICS.map((metric) => (
                <article className="metricCard" data-featured={metric.featured || undefined} key={metric.key}>
                  <p className="metricCardLabel">{metric.label}</p>
                  <p className="metricCardValue">{metric.value}</p>
                  <p className="metricCardDelta">{metric.delta}</p>
                  <p className="metricCardDetail">{metric.detail}</p>
                </article>
              ))}
            </section>

            <section className="tableSection">
              <header className="tableSectionHeader">
                <div>
                  <h2 className="tableSectionTitle">{SECTION_COPY.tableSectionTitle}</h2>
                  <p className="tableSectionDescription">{SECTION_COPY.tableDescription}</p>
                </div>
              </header>
              <table className="dashboardTable">
                <thead>
                  <tr>
                    {SECTION_COPY.tableHeaders.map((header) => (
                      <th key={header}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((item) => (
                    <tr key={item.session}>
                      <td>{item.employee}</td>
                      <td className="dashboardSession">{item.session}</td>
                      <td className="dashboardModel">{item.model}</td>
                      <td className="dashboardDate">{item.date}</td>
                      <td className="dashboardAmount">{item.tokens}</td>
                      <td className="dashboardStatus">
                        <span
                          className="statusBadge"
                          data-variant={STATUS_VARIANTS[item.status]}
                          aria-label={`Session ${item.status}`}
                        >
                          {item.status}
                        </span>
                      </td>
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
