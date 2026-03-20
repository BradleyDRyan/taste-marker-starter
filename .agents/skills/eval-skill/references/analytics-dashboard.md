# Analytics Dashboard Principles

## Composition

- The page component should compose sections, not contain the full dashboard implementation. For this pattern, extract at least `SidebarNav`, `MetricsRow`, `RevenueChartCard`, and `TransactionsTable`.
- Keep shared formatting helpers with the section that owns them, or in a small dashboard utility file, instead of accumulating everything in the top-level page.
- When a dashboard grows past 3 major regions or roughly 200 lines of mixed layout and behavior, split it into focused sections before adding more polish.

## Layout Recipe

- Use a 2-column desktop shell: 260px fixed sidebar and one flexible main column.
- Outer shell max width: 1600px. Outer page padding: 16px mobile, 24px tablet, 32px desktop.
- Primary panel radius: 30px to 32px. Secondary card radius: 22px to 28px.
- Main region spacing: 24px between major sections, 16px between cards inside a section.
- KPI cards fill the full available width in a 1-column mobile grid, 2-column medium grid, and 4-column large grid.
- The revenue chart card is the dominant module in the content area and should take more width than any secondary insight card on desktop.

## Visual System

- Use existing semantic tokens for surfaces and text: `--bg`, `--bg-strong`, `--panel`, `--panel-strong`, `--line`, `--text`, `--muted`.
- Use accent tokens for meaning, not decoration: `--navy` for primary emphasis, `--teal` for positive performance, `--gold` for caution, `--rose` for negative or risk states.
- Headings and main UI labels use the sans display font token. Reserve the mono font token for IDs, compact metadata, and tabular identifiers.
- Dashboard eyebrow labels are compact and uppercase with wide tracking. Primary numbers should read as the visual anchor of each card.

## KPI Card Recipe

- Each KPI card contains 4 layers in order: label, primary value, trend pill, and short supporting context.
- Trend pills must include both direction and magnitude, not color alone. Show an arrow plus signed percentage.
- Positive and negative trend treatments need distinct background and text colors with sufficient contrast in both states.
- Icon chips belong in the upper-right corner and should not compete with the metric value for emphasis.

## Chart Recipe

- The main chart card should start with a title block, a large headline metric, and a compact legend before the graphic.
- Reserve at least 320px chart height so the visualization feels primary rather than decorative.
- SVG charts need `role="img"` and a concise `aria-label`.
- Axis labels and grid lines should stay visually quiet; the revenue line and active data markers carry the emphasis.
- Use motion to reveal chart cards and KPI cards, but keep it short and structural: 120ms to 220ms entry motion and stagger under 100ms between siblings.

## Sidebar And Header Interactions

- Sidebar navigation needs a real selected state. Exactly one destination is active at a time, and the active item must be visually distinct from hover-only items.
- If sidebar items are not navigating yet, they should still switch the visible dashboard subsection, filter the data view, or update the highlighted module.
- Header action buttons must open a panel, reveal a menu, change a filter, or refresh visible data state. Avoid chrome that looks clickable but does nothing.
- Supporting status chips such as "Updated 6 minutes ago" should either refresh from state or be styled as static status text rather than an action.

## Sortable Table Rules

- Every sortable header uses a real `button` inside the `th`.
- The owning `th` must expose `aria-sort` with `ascending`, `descending`, or `none`.
- The active sort column needs a stronger label color and a directional icon that changes with sort order. Do not use the same neutral icon for active and inactive columns.
- Default sort direction should match the data type: descending for dates and amounts, ascending for names and labels.
- Include a visible sort summary or screen-reader announcement so the current table order is explicit.
- Keep row hover states subtle; sorting clarity matters more than decorative row motion.

## Completion Bar

- Do not leave a dashboard as one oversized page file when the design clearly breaks into reusable regions.
- Do not ship presentational controls without keyboard focus styles and a visible state change.
- Do not treat accessibility as a final pass item. Sorting semantics, button labels, and active-state clarity are part of the core implementation quality.
