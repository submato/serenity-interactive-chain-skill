# Interaction Model

This skill treats supply-chain research as an expandable knowledge graph.

## Default Layout

Use a three-column mindmap interface for complex company, group, or ecosystem maps:

1. **Mindmap navigation**
   - Expandable tree.
   - Stable ids for every node.
   - Compact tags for node type, market status, evidence grade, and chokepoint state.

2. **Sibling comparison**
   - Shows peer nodes at the selected level.
   - Helps compare which layer is more constrained, more crowded, or better evidenced.

3. **Node detail**
   - What it does.
   - Why it may become a bottleneck.
   - Overseas/private names.
   - Local-market mappings.
   - Catalysts.
   - Falsification.
   - Verification path.
   - Actions.

## Node Tags

### Node Type

- `ecosystem`
- `domain`
- `node`
- `subnode`

### Market Status

- `underfollowed`: important but not broadly priced or discussed.
- `repricing`: the market has started noticing and repricing the node, but the thesis may not be fully reflected yet.
- `crowded`: consensus or narrative-heavy.
- `too-early`: may matter later, but evidence or timing is not ready.

### Evidence Grade

- `strong-evidence`: filings, company disclosures, official contracts, or direct cross-chain proof.
- `reported`: credible media, industry reports, or management statements.
- `inferred`: supply-chain inference from adjacent evidence.
- `needs-verification`: lead only.

### Chokepoint State

- `current-chokepoint`
- `candidate-chokepoint`
- `priced-chokepoint`
- `future-chokepoint`

## Actions

Each node can expose these actions:

- `Generate sublayers`: create the next level of child nodes.
- `Add evidence`: strengthen sources, source grades, validation paths, and falsification conditions.
- `Map local stocks`: refine local-market mappings and verification checks.
- `Re-evaluate`: re-check market status, evidence grade, chokepoint state, and mappings.

Each stock card in the stock-analysis section also exposes:

- `Drill down`: break a stock's chain position into finer sub-environments with evidence and falsifiers.
- `Cross-validate`: confirm the thesis with at least 3 independent source types and compare against peers.

## Output Modes

### HTML page (default)

Produce a single self-contained `.html` file in the project directory (inline data/CSS/JS, no build, no network). Keep one document only. Persist `selectedId`/`expanded` in `localStorage`. Because the browser cannot call the Cursor SDK, every action button copies a ready-to-paste prompt that includes the file path, domain id, node id, node title, stock code (when relevant), the requested action, and the instruction to update the current file.

### Cursor Canvas (on request)

Only when the user explicitly asks for a Cursor Canvas. Then buttons use the canvas SDK to open a new composer/chat with the same prompt fields.

## Stock Analysis Section (HTML)

A bottom section holds written per-stock conclusions, driven by a `stockDetails` array so new stocks need only a data entry. It must be:

- searchable (filter by name/code/node/conclusion text) with a match-count label;
- per-card collapsible, plus section-level expand/collapse all;
- each card: title, path, conclusion, chain position, existing evidence, missing evidence, price context, falsification, next 3 sources;
- each card buttons: re-evaluate, drill down, cross-validate;
- a `view analysis` button on each node-detail stock row that clears search, expands, scrolls to, and briefly highlights that card.

## Button Styling

Use a small premium button system: a refined base button (subtle surface, hover lightens border/background, `:active` slight translate, `:focus-visible` accent ring), a `.btn-primary` accent variant for the main action in a group, and a `.btn-ghost` variant for utility/toggle actions. Inputs get a matching focus ring. Keep it flat — avoid heavy gradients, rainbow color, and box-shadow stacks.

## Why Mindmap First

Tables are good for comparisons, but poor for navigation. A mindmap keeps the user oriented while allowing infinite drilldown:

```text
ecosystem -> business domain -> node -> subnode -> verification task
```

Use swimlanes, heatmaps, tables, subway maps, and galaxy views only as auxiliary views unless the user explicitly asks for them.
