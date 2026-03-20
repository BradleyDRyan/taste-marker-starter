---
name: dashboard-style
description: Use when building a dashboard-style app with a chrome shell, collapsible navigation rail, and token-driven design system. Use even if the user just says "build a dashboard" or "create an admin panel."
---
# Dashboard Style

Build dashboard apps with stronger visual hierarchy and sharper token discipline. Typography, spacing, state, and surfaces should be explicit and reviewable from one file.

## Task discipline (required)

When the user gives a dashboard request, immediately convert it into concrete requirements:

- Inspect the entry point first: open `src/app/page.tsx` before editing. Confirm the current shell state and preserve existing structure only where appropriate.
- Where the starter exists, adapt in place. Otherwise replace the placeholder scaffold in one pass with the full dashboard structure.
- Start with shape and semantics first: nav, header, metrics section, table section. Add polish only after that structure exists.
- If the prompt asks for exact counts or exact labels, encode them as canonical constants and render from those constants.
- Use a single file strategy if the request limits edits to `page.tsx`; inject all dashboard tokens in one inline `<style>` block and keep all colors/spacing in tokens.
- Do not use imperative JS events to change presentation for hover/focus/selected states. Use `:hover`, `:focus-visible`, and data-state selectors.
- Keep `src/app/page.tsx` and `src/app/layout.tsx` as the primary references for integration.

## Visual quality hardening pass

This section is required for dashboard outputs.

- Typography must create immediate hierarchy. Every dashboard text family, scale, and weight must be token-backed.
- Color needs depth and intent. Primary layers stay neutral, but secondary accents should be deliberate and reusable.
- Layout rhythm should be predictable, not accidental: shell, toolbar, content, cards, then table.
- Component rules should be specific, reusable, and not free-form.

## CSS token injection (single-file requirement)

When constrained to `src/app/page.tsx`, define these tokens (from `theme-default.md`) in `<style><:root>`:

- `--lui-chrome`, `--lui-content`, `--lui-surface`, `--lui-surface-stroke`, `--lui-surface-stroke-strong`, `--lui-chrome-hover`, `--lui-chrome-selected`, `--lui-seam`
- `--lui-text-primary`, `--lui-text-secondary`, `--lui-text-muted`, `--lui-icon`, `--lui-focus-ring-color`
- `--lui-primary`, `--lui-secondary`, `--lui-on-secondary`, `--lui-surface-stroke`, `--lui-shadow-elevated`
- `--lui-status-success-bg`, `--lui-status-success-fg`, `--lui-status-warning-bg`, `--lui-status-warning-fg`, `--lui-status-danger-bg`, `--lui-status-danger-fg`
- `--lui-appnav-bg`, `--lui-appnav-header-color`, `--lui-appnav-item-fg`, `--lui-appnav-item-active-fg`, `--lui-appnav-states-hover-bg`, `--lui-appnav-states-active-bg`, `--lui-appnav-toggle-fg`
- `--lui-appnav-width`, `--lui-appnav-width-expanded`, `--lui-appnav-item-size`, `--lui-appnav-icon-size`, `--lui-appnav-item-radius`, `--lui-appnav-rail-padding`, `--lui-appnav-shell-padding-y`, `--lui-appnav-item-gap`, `--lui-appnav-header-height`, `--lui-appnav-header-font`, `--lui-appnav-header-font-weight`, `--lui-appnav-item-font`, `--lui-appnav-item-font-weight`, `--lui-appnav-section-gap`
- `--lui-app-content-inset`, `--lui-app-content-radius`, `--lui-app-content-shadow`
- `--lui-toolbar-height`, `--lui-toolbar-font`, `--lui-toolbar-font-weight`
- `--lui-font-sans`, `--lui-font-mono`, `--lui-text-xs`, `--lui-text-sm`, `--lui-text-base`, `--lui-text-lg`
- `--lui-radius-md`, `--lui-radius-lg`, `--lui-border-width-subtle`, `--lui-border-width-hairline`, `--lui-focus-ring-width`, `--lui-focus-ring-offset-inset`
- `--lui-motion-duration-fast`, `--lui-motion-ease-standard`, `--lui-viewport-app-height`
- `--lui-dashboard-section-gap`, `--lui-dashboard-grid-gap`, `--lui-dashboard-card-padding`, `--lui-dashboard-card-radius`, `--lui-dashboard-card-value-gap`, `--lui-dashboard-card-min-width`, `--lui-dashboard-table-min-width`
- `--lui-dashboard-table-section-padding`, `--lui-dashboard-table-head-padding-y`, `--lui-dashboard-table-head-padding-x`, `--lui-dashboard-table-cell-padding-y`, `--lui-dashboard-table-cell-padding-x`
- `--lui-dashboard-card-label-font`, `--lui-dashboard-card-label-font-weight`, `--lui-dashboard-card-value-font`, `--lui-dashboard-card-value-font-weight`, `--lui-dashboard-table-title-font`, `--lui-dashboard-table-title-font-weight`, `--lui-dashboard-table-head-font`, `--lui-dashboard-table-head-font-weight`, `--lui-dashboard-table-cell-font`, `--lui-dashboard-table-emphasis-font-weight`, `--lui-dashboard-status-padding-y`, `--lui-dashboard-status-padding-x`, `--lui-dashboard-status-radius`, `--lui-dashboard-status-font`, `--lui-dashboard-status-font-weight`, `--lui-dashboard-feature-bg`, `--lui-dashboard-feature-fg`, `--lui-dashboard-feature-muted`, `--lui-dashboard-feature-border`

### Additional dashboard polish tokens (define only if absent)

If the existing token set is missing stronger rhythm, add these names once and use them everywhere:

- `--lui-dashboard-line-height-dense` (for metric values, default 1.12)
- `--lui-dashboard-line-height-body` (for descriptive copy, default 1.45)
- `--lui-dashboard-id-font` (usually `var(--lui-font-mono)`)
- `--lui-dashboard-soft-surface` (warm/cool neutral accent surface)
- `--lui-dashboard-soft-surface-strong` (hover or emphasis panel tint)

## Tighter typography rules

- Keep one global face for UI prose and one optional face for identifiers.
- Use `fontFamily: "var(--lui-font-sans)"` on the root wrapper.
- Use `fontFamily: "var(--lui-dashboard-id-font)"` only for narrow technical text such as IDs, timestamps, model names, and hash-like values.
- Metric block:
  - Label: `--lui-dashboard-card-label-font`, `--lui-dashboard-card-label-font-weight`, `--lui-text-sm` is not a substitute.
  - Value: `--lui-dashboard-card-value-font`, `--lui-dashboard-card-value-font-weight`, `--lui-dashboard-line-height-dense`.
  - Trend/copy: card label size with `--lui-dashboard-line-height-body`.
- Header:
  - Content title uses `--lui-toolbar-font` and `--lui-toolbar-font-weight`.
  - Section titles use `--lui-dashboard-table-title-font` and `--lui-dashboard-table-title-font-weight`.
- Table:
  - Header row uses `--lui-dashboard-table-head-font` and `--lui-dashboard-table-head-font-weight`.
  - Body cells use `--lui-dashboard-table-cell-font` and `--lui-dashboard-table-emphasis-font-weight` on ID, amount, or employee names.
- Status badge typography uses `--lui-dashboard-status-font` and `--lui-dashboard-status-font-weight`.
- Do not use hardcoded sizes and do not use font-weight `700` in dashboard outputs.

## Color guidance (secondary accents included)

- Preserve the canonical layer order: `chrome` → `content` → `surface`.
- Keep non-focused cards on `--lui-surface` to avoid flat clutter.
- Use `--lui-chrome`, `--lui-surface-stroke`, and `--lui-surface-stroke-strong` for shell edges and separators.
- Use one deliberate secondary accent lane:
  - `--lui-dashboard-soft-surface`: neutral hover and card backfill (recommended: `var(--lui-secondary)`).
  - `--lui-dashboard-soft-surface-strong`: small panel lift and active row contrast (recommended: `var(--lui-chrome-selected)`).
- Use status tokens for status chips and trend context; never invent semantic colors for state.
- Keep featured card contrast strong, but limit it to one surface per dashboard to maintain a clear focal point.
- Never use raw hex values in style or JSX.

## Layout patterns (clear and consistent)

- App shell:
  - `height: var(--lui-viewport-app-height)`, `display: flex`, `overflow: hidden`.
  - Side nav fixed/expanding behavior with animated width transition.
- Nav internals:
  - Header with brand and toggle at top.
  - Item stack below header.
  - Collapsed width and expanded width transitions via `--lui-appnav-width` and `--lui-appnav-width-expanded`.
- Content pane:
  - Top header is `display: flex`, fixed toolbar height, `flex-shrink: 0`.
  - Main content is `flex: 1`, `overflow-y: auto`, and `padding` from spacing tokens.
- Metrics:
  - 4-column minimum intent; use `repeat(auto-fit, minmax(var(--lui-dashboard-card-min-width), 1fr))`.
  - Card min width and section gap are token-based, not literal.
- Table:
  - Wrap with horizontal overflow container.
  - `thead` as sticky row when appropriate.
  - `tbody tr` hover state exists and is token-backed.

## Component-level styling requirements

- Nav item:
  - Default state uses `--lui-appnav-item-fg`.
  - Active state uses `--lui-appnav-item-active-fg` and `--lui-appnav-states-active-bg`.
  - Title text, icon, and spacing use token values only.
- Metrics cards:
  - Border, radius, padding, elevation from dashboard card tokens.
  - Featured treatment uses the four feature tokens and must remain singular.
  - Don’t stack large typography all in same size/weight.
- Table section:
  - Section wrapper border/radius/background/elevation all token-driven.
  - Table head uses header tokens and distinct separator border.
  - Status chips must map one-to-one to status tokens.
- Header actions:
  - Notification/button controls need a focus-visible treatment from ring tokens and a hover background from hover token.
- Motion:
  - Use only `--lui-motion-duration-fast` / `--lui-motion-ease-standard`.

## Assembly order (single-file dashboard)

1. `"use client"` directive
2. Single import statement from `@phosphor-icons/react`
3. Constants: `COPY`, `NAV_ITEMS`, `METRICS`, and `recentOrders`
4. `<style>` block with the token inventory
5. Collapsible app shell with nav
6. Content container with header and main
7. Metrics section and orders table
8. Focus/hover data-state selectors and semantic status mapping

## Required icon set

- For this dashboard, include `SidebarSimple`, `Bell`, `SquaresFour`, `Package`, `Cube`, `Users`, `GearSix` in one import.

## Acceptance checklist

1. Entry points checked: `src/app/page.tsx`, `src/app/layout.tsx`, and any token sources used.
2. Full dashboard shape exists before visual polishing.
3. Canonical constants are used for all labels/strings.
4. Typography scales map to explicit token families/sizes/weights.
5. Color layer order is respected and status chips map only to status tokens.
6. Secondary accent system exists (`--lui-dashboard-soft-surface` + `--lui-dashboard-soft-surface-strong`) with at most one featured card.
7. Nav and content layout follow the shell/header/main pattern.
8. No one-off numeric or color literals for dashboard structure or typography.
9. All referenced tokens appear in the local `:root` block.
10. Exact-count sections and rows render from arrays when requested.

## Learn sequence

1. Step 1: Check token setup files
2. Step 2: Set up token map before layout
3. Step 3: Build shell, nav, content, cards, table
4. Step 4: Apply state styles and motion

## Supporting references

- `theme-default.md`
- `theme-space.md`
- `app-shell.md`
- `appnav.md`
- `page-layout.md`
- `color.md`
- `typography.md`
- `phosphor-icons.md`
