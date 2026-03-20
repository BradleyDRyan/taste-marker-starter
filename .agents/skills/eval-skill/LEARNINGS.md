# Learnings

## 2026-03-20

- The provided checkout did not include an existing `.agents/skills/eval-skill` directory, so I created the skill package from scratch in `/app` rather than editing absent files.
- I anchored the guidance to the only concrete experiment feedback available: oversized page component, sortable headers missing active direction and `aria-sort`, and controls that looked interactive without changing state.
- I kept the skill concise and principle-driven. The strongest additions are explicit decomposition thresholds, sortable table accessibility rules, and a requirement that nav and header controls perform visible state changes instead of acting as static decoration.
- I also added layout, spacing, token, and typography recipes so the skill transfers beyond this single dashboard while still matching the taste-marker-starter visual system.
