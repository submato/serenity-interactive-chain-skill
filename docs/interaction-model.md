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

Each node can expose four actions:

- `Generate sublayers`: create the next level of child nodes.
- `Add evidence`: strengthen sources, source grades, validation paths, and falsification conditions.
- `Map local stocks`: refine local-market mappings and verification checks.
- `Re-evaluate`: re-check market status, evidence grade, chokepoint state, and mappings.

## Cursor Canvas Mode

When the canvas SDK supports actions, buttons can open a new composer/chat with a prompt that includes:

- current file
- domain id
- node id
- node title
- requested action
- instruction to update the current canvas file

## Portable Mode

For Claude Code, Codex, or other environments without canvas actions, render a copyable prompt:

```text
Use serenity-interactive-chain to deepen node <nodeId> in <file> and update the current file.
```

## Why Mindmap First

Tables are good for comparisons, but poor for navigation. A mindmap keeps the user oriented while allowing infinite drilldown:

```text
ecosystem -> business domain -> node -> subnode -> verification task
```

Use swimlanes, heatmaps, tables, subway maps, and galaxy views only as auxiliary views unless the user explicitly asks for them.
