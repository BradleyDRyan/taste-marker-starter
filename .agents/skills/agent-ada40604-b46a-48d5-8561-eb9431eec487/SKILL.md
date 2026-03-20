---
name: Consumer Aesthetic
description: >
  Build a polished small-business dashboard UI for "Bloom & Co" with clear
  hierarchy, readable metrics, and a usable Recent Orders table.
---

# Consumer Aesthetic

Goal:
Build one complete dashboard page in `src/app/page.tsx` (App Router) using
React 19, Next.js 15, Tailwind v4, `@phosphor-icons/react`,
`@base-ui/react`, and `framer-motion` only when it materially improves the UI.

Output must be production-lean: no placeholder layouts, no lorem ipsum, and no
empty or fake states.

Critical reminder:
If the page still shows `Hello`, `Lorem`, lorem placeholders, or blank shell
states, it fails immediately. This skill exists to prevent placeholder-first output.

### Mandatory layout contract
- Build exactly one page component in `src/app/page.tsx`.
- Render these required landmarks: one `<aside>`, one `<header>`, one `<main>`, and at least one `<section>`.
- Use a two-tier shell:
  - `md+`: sidebar + main side-by-side
  - `<md`: stacked, sidebar first.
- Sidebar must be visibly a shell, not just another panel.
- Include exactly these sidebar items in order: `Overview`, `Orders`, `Products`,
  `Customers`, `Settings`.
- Show brand text `Bloom & Co` once and only once.
- Include one search `<input>` and one filter control (`<select>`). Above the fold,
  keep interactive controls to 2 unless additional controls are clearly non-primary.
- Add exactly 4 metric cards with titles: `Revenue`, `Orders`, `Customers`,
  `Avg Order Value`.
- Add one `Recent Orders` section with exactly 5 `<tr>` rows in `<tbody>` inside one
  `<table>`.
- Use static in-file data constants only.

### Hard visual rules
- Use a strict neutral base and only these semantic accents:
  - neutral: `slate` only for chrome and surfaces.
  - `indigo`: brand links, selected nav, active controls, focus rings.
  - `emerald`: positive trend and success badges.
  - `amber`: warnings only.
- Do not add other hue families for default neutrals.
- Set at least 4 distinct depth layers:
  1. shell,
  2. header/control strip,
  3. metric cards,
  4. table panel.
- A layer is valid only if it has at least two of these:
  - `border`
  - `shadow` (or shadow-like tone)
  - contrast via background variation.
- Card-like panels must be intentional (not flat):
  `rounded-xl`, background fill, border, and soft shadow.
- Sidebar and main must be clearly separated by spacing or border.
- Active/selected sidebar item must use obvious visual state:
  color shift + indicator line/dot + weight.
- At most one subtle decorative background gradient zone is allowed, and it
  must be on an outer shell, never on individual cards or tables.
- Do not use `overflow-hidden` on root containers that clip shadows.

### Typography and hierarchy
- Use exactly one font family across all text for consistency (no mixed heading/body families).
- Mandatory sizes:
  - page title: `text-2xl md:text-3xl lg:text-4xl font-semibold`
  - section title: `text-sm font-semibold uppercase tracking-[0.08em]`
  - metric label: `text-sm font-medium`
  - metric value: `text-2xl sm:text-3xl font-bold`
  - table body: `text-sm`
  - metadata: `text-xs sm:text-sm`
- Section titles must appear lighter than the page title but heavier than row text.
- Use generous line-height; never rely on letter-spacing for main body readability.
- Keep text legible on 320px-wide screens.
- Numeric values should not be tracking-tight/condensed; use default tabular figures only if explicitly needed.

### Spacing and rhythm
- Required shell padding:
  - `px-4` on mobile
  - `px-8` on `md`
  - `px-10` on `xl`
- Use `gap-4` for horizontal siblings inside same hierarchy level; `gap-6` between major bands.
- Metric cluster must be a responsive grid with explicit column rhythm:
  - 1 col on mobile
  - 2 cols on `md`
  - 4 cols on `lg`.
- Metric card rhythm:
  - `p-4` on mobile
  - `p-5` on `lg+`.
- Table rows must separate with `border-t`.
- Use `min-h-screen` for page wrapper.
- Use `max-w` container to prevent content stretching too wide on ultra-large viewports.

### Interaction and accessibility
- Every interactive control must have visible:
  - hover,
  - active/selected,
  - focus-visible.
- Use `cursor-pointer` on actionable chips/buttons/icons.
- Include accessible names for icon-only controls via `aria-label`.
- Target minimum size at least `h-9` and width that is practical for touch.
- Do not ship disabled controls unless genuinely disabled by state.
- Focus rings should use the `indigo` accent and be visible on all interactive controls.

### Composition and polish
- Ensure three visual zones are obvious:
  1. navigation shell,
  2. analysis/controls,
  3. table/report content.
- No content block should compete in visual weight with the page title.
- Add at least one subtle hierarchy anchor per zone (eg. left nav accent,
  section divider, inset border).
- If chart blocks are added, include labels/legend and caption text.

### Anti-patterns to reject
- Full-page noisy gradients, animated blobs, particle effects, or dramatic blur.
- Fake table content using non-table structures.
- Excess visual "noise": too many cards, too many panels, too many accent colors.
- Missing hierarchy where all cards look equally important.
- Inconsistent border radii or shadows between sibling cards.
- Mixed heading families.
- Repeating `Bloom & Co` in footer/header/masthead.

### Explicit acceptance checks
- No placeholder text is allowed: anything like `Hello`, `lorem`, `placeholder`, `TODO`.
- Exactly 4 metric cards are rendered.
- Exactly 5 rows exist in `Recent Orders` tbody.
- Sidebar has exactly 5 items in required order.
- `Bloom & Co` appears exactly once.
- Required landmarks (`aside`, `header`, `main`, `section`) are present.
- Search + filter controls are present and functional.
- At least 4 depth layers are visibly distinct.
- Positive/negative states only use the assigned accent families.
- There are at most 5 interactive controls visible before scroll (to avoid crammed controls).
- Metric section and table section each include a dedicated heading.
- Spacing tokens from the spacing section are applied at their required breakpoints.

### Rules dropped / tightened from prior guidance
- `Do not use full-page prose.` removed; replace with clear, structured UI copy.
- “Prefer calm, operational polish over novelty effects.” kept as style spirit, but enforcement should be via anti-patterns above.
