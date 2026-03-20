---
name: eval-skill
description: Principles for polished analytics dashboards in the taste-marker-starter stack, with emphasis on section decomposition, meaningful interactions, accessible sortable tables, and strong visual hierarchy.
---

# Eval Skill

Use this skill when building or refining an analytics dashboard with a sidebar, KPI cards, a primary chart, and a transactions table.

## Workflow

1. Inspect the main app entry point and shared styling tokens before changing structure.
2. Keep the page file at composition level; move each major dashboard region into its own section component when the screen has 3 or more distinct regions.
3. Treat every visible control as a real interaction. If an element looks clickable, it must update state, reveal content, or change the current view.
4. Audit keyboard, screen-reader, and active-state behavior before considering the dashboard complete.

## Read Next

- For layout, spacing, typography, interaction, and table rules, read [references/analytics-dashboard.md](references/analytics-dashboard.md).
