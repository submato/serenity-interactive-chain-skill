# Serenity Interactive Chain Skill

An Agent Skill for building interactive supply-chain chokepoint maps from industries, companies, groups, and ecosystems.

It is inspired by the research habit of starting from the physical system, decomposing the value chain, finding scarce layers, grading evidence, and only then mapping public-company exposure. It is a research workflow, not an investment recommendation engine.

## What It Does

- Splits complex companies or ecosystems into business domains first.
- Maps each domain into supply-chain layers and bottleneck nodes.
- Defaults to an interactive mindmap layout for Cursor Canvas:
  - left: expandable mindmap tree
  - middle: sibling/peer nodes
  - right: selected node detail and action buttons
- Labels every node by:
  - node type
  - market status
  - evidence grade
  - current chokepoint state
- Supports recursive drilldown from any node.
- Provides action buttons or portable prompts for:
  - generating sublayers
  - adding evidence
  - mapping local stocks
  - re-evaluating a node

## Install

Copy the skill directory into your agent skills folder:

```bash
mkdir -p ~/.agents/skills/serenity-interactive-chain
cp SKILL.md ~/.agents/skills/serenity-interactive-chain/SKILL.md
```

For Claude Code:

```bash
mkdir -p ~/.claude/skills/serenity-interactive-chain
cp SKILL.md ~/.claude/skills/serenity-interactive-chain/SKILL.md
```

For Codex-style skill folders:

```bash
mkdir -p ~/.codex/skills/serenity-interactive-chain
cp SKILL.md ~/.codex/skills/serenity-interactive-chain/SKILL.md
```

## Example Prompts

```text
Use serenity-interactive-chain to map the Musk ecosystem as an interactive mindmap.
```

```text
Create a supply-chain chokepoint map for SpaceX. Split it into Starlink, Starship, Starshield, ground infrastructure, and compute first.
```

```text
Deepen node D5-N3-power-megapack and update the current canvas file.
```

```text
Re-evaluate whether the roller-screw node is still a current chokepoint and refine A-share mappings.
```

## Recommended Canvas UX

The default view is a mindmap, not a table.

```text
Ecosystem
├─ Business domain
│  ├─ Node
│  │  ├─ Subnode
│  │  └─ Subnode
│  └─ Node
└─ Business domain
```

Every node should show compact tags:

```text
[node type] [market status] [evidence grade] [chokepoint state]
```

The detail panel should contain:

- what the node does
- why it may become a bottleneck
- overseas/private names
- local-market mappings
- catalysts
- falsification
- verification path
- action buttons or portable prompts

## Status Labels

- `underfollowed`: plausibly important but not yet broadly priced or discussed.
- `repricing`: the market has started noticing and repricing the node, but the thesis may not be fully reflected yet.
- `crowded`: consensus or narrative-heavy. Use it as demand proof, not necessarily as the best entry point.
- `too-early`: may matter later, but commercialization, evidence, or timing is not ready.

## Chokepoint Labels

- `current-chokepoint`: likely a present bottleneck worth prioritizing.
- `candidate-chokepoint`: plausible but needs more evidence or timing confirmation.
- `priced-chokepoint`: real bottleneck, but likely already reflected in market attention.
- `future-chokepoint`: may become important later, but too early now.

## Notes

This skill supports research workflows across Cursor, Claude Code, and Codex-style agents. Cursor Canvas can provide richer buttons and visual interactions; non-Cursor environments can use the same node ids and portable prompts.

## Disclaimer

This project is for information tracking and research support only. It does not provide investment advice, trading instructions, or guaranteed outcomes.
