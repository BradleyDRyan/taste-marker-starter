# Environment

## Installed Packages

Dependencies:
- `@base-ui/react` (^1.0.0)
- `@phosphor-icons/react` (^2.1.10)
- `framer-motion` (^12.36.0)
- `next` (^15.3.3)
- `react` (^19.1.0)
- `react-dom` (^19.1.0)

Dev dependencies:
- `@tailwindcss/postcss` (^4.1.8)
- `tailwindcss` (^4.1.8)
- `typescript` (^5.8.3)

## Pre-built Components

The project includes pre-built component wrappers in `src/components/`. Import them from `@/components` (or `@/components/<name>`).

Available components:
- `Button` (from `@/components/button`)
- `Checkbox, CheckboxIndicator` (from `@/components/checkbox`)
- `Dialog, DialogTrigger, DialogPortal, DialogBackdrop, DialogContent, DialogTitle, DialogDescription, DialogClose` (from `@/components/dialog`)
- `Input` (from `@/components/input`)
- `Menu, MenuTrigger, MenuPortal, MenuContent, MenuItem, MenuSeparator, MenuGroup, MenuGroupLabel` (from `@/components/menu`)
- `Popover, PopoverTrigger, PopoverPortal, PopoverContent, PopoverArrow, PopoverTitle, PopoverDescription, PopoverClose` (from `@/components/popover`)
- `Progress, ProgressTrack, ProgressIndicator` (from `@/components/progress`)
- `Select, SelectTrigger, SelectValue, SelectPortal, SelectContent, SelectItem` (from `@/components/select`)
- `Separator` (from `@/components/separator`)
- `Switch, SwitchThumb` (from `@/components/switch`)
- `Tabs, TabsList, TabsTrigger, TabsContent` (from `@/components/tabs`)
- `Tooltip, TooltipTrigger, TooltipPortal, TooltipContent, TooltipArrow` (from `@/components/tooltip`)
- `Avatar, AvatarImage, AvatarFallback` (from `@/components/avatar`)

These are thin wrappers around `@base-ui/react` primitives with `"use client"` directives. Use them instead of importing from `@base-ui/react` directly.

## CSS Setup

`src/app/globals.css` is imported by `src/app/layout.tsx` and **must not be deleted**.
It imports Tailwind CSS — all Tailwind utility classes are available.

For Tailwind v4 tokenized colors:

- Put raw palette and semantic variables in `@layer base { :root { ... } }`.
- Expose token-backed utilities with `@theme inline` when the theme values reference CSS variables.
- Do not assume JSX class names are enough. If you add `bg-lui-*` or similar utilities, verify the served CSS actually contains the utility and that the browser applies the expected computed style.
- `tsc` can validate types, but it does not prove custom theme utilities are active in the browser.

## Framework

This is a **Next.js** app using the App Router (`src/app/`).
The dev server runs automatically — just edit files and they hot-reload.
