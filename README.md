# Serenity Interactive Chain Skill


**English** | [中文](#中文)

The workflow starts from a physical system, splits it into business domains, maps the value chain, identifies scarce layers, grades the evidence, and only then maps public/private company exposure. It is designed for research, not for trading instructions.

## Why This Exists

Most market research jumps too quickly from a narrative to tickers:

```text
AI is growing -> buy AI stocks
SpaceX is going public -> buy space suppliers
Robots are coming -> buy robot parts
```

This skill forces a slower and cleaner path:

```text
system change -> business domains -> supply-chain layers -> bottleneck nodes
-> evidence grade -> market status -> company mappings -> verification path
```

The goal is to answer a better question:

> Which small or underfollowed layer can physically constrain a much larger system?

## Core Features

- Splits complex companies or ecosystems into business domains before drawing a supply chain.
- Maps each domain into nested supply-chain nodes.
- Defaults to a mindmap-based interactive document.
- Supports recursive drilldown from any node.
- Labels every node by:
  - node type
  - market status
  - evidence grade
  - current chokepoint state
- Adds node-level actions:
  - generate sublayers
  - add evidence
  - map local stocks
  - re-evaluate the node
- Works in rich Canvas environments and in portable text-only agent environments.

## HTML Examples

- [AI Industry Serenity Map](examples/ai-industry-serenity-map.html)
- [Musk Ecosystem Mindmap](examples/musk-ecosystem-mindmap.html)

## When To Use

Use this skill for prompts like:

```text
Map the Musk ecosystem as an interactive supply-chain mindmap.
```

```text
Create a chokepoint map for SpaceX. Split it into Starlink, Starship, Starshield, ground infrastructure, and compute first.
```

```text
Build an interactive AI data-center power supply chain map and identify underfollowed bottlenecks.
```

```text
Deepen node D5-N3-power-megapack and update the current canvas file.
```

```text
Re-evaluate whether the roller-screw node is still a current chokepoint and refine A-share mappings.
```

## Install

Clone this repository:

```bash
git clone https://github.com/submato/serenity-interactive-chain-skill.git
cd serenity-interactive-chain-skill
```

Install for Agent-style skill folders:

```bash
mkdir -p ~/.agents/skills/serenity-interactive-chain
cp SKILL.md ~/.agents/skills/serenity-interactive-chain/SKILL.md
```

Install for Claude Code:

```bash
mkdir -p ~/.claude/skills/serenity-interactive-chain
cp SKILL.md ~/.claude/skills/serenity-interactive-chain/SKILL.md
```

Install for Codex-style skill folders:

```bash
mkdir -p ~/.codex/skills/serenity-interactive-chain
cp SKILL.md ~/.codex/skills/serenity-interactive-chain/SKILL.md
```

## Recommended Output: Mindmap Navigation

The default view should be a mindmap, not a static table.

Recommended layout:

```text
left   = expandable mindmap tree
middle = sibling / peer nodes at the current level
right  = selected node detail and action buttons
```

Recommended structure:

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

Example:

```text
Megapack / Transformer
[node] [underfollowed] [reported] [current-chokepoint]
```

## Node Detail Panel

The detail panel should include:

- what the node does
- why it may become a bottleneck
- overseas/private companies
- local-market mappings
- catalysts
- falsification
- verification path
- child nodes if already drilled down
- action buttons or portable prompts

## Node Actions

Each node can expose four actions.

### Generate sublayers

Use when the node is still too coarse.

Output should add child nodes under the selected node, preserving stable ids.

### Add evidence

Use when the structure is good but weakly sourced.

Output should improve evidence grade, source notes, validation path, and falsification.

### Map local stocks

Use when the user wants A-share, Hong Kong, US, Japan, Korea, Taiwan, or Europe mappings.

Output should explain whether the mapping is direct, adjacent, weak, or only thematic.

### Re-evaluate

Use when a node may be outdated.

Output should re-check:

- whether it is still a current chokepoint
- whether market status changed
- whether evidence grade should be upgraded or downgraded
- whether stock mappings remain accurate

## Label Definitions

### Node Type

- `ecosystem`: the top-level map.
- `domain`: a business domain or product line.
- `node`: a supply-chain layer or bottleneck candidate.
- `subnode`: a deeper component, material, equipment, or validation layer.

### Market Status

- `underfollowed`: plausibly important but not yet broadly priced or discussed.
- `repricing`: the market has started noticing and repricing the node, but the thesis may not be fully reflected yet. Verify orders, margins, capacity, or filings.
- `crowded`: consensus or narrative-heavy. Use it as demand proof, not necessarily as the best entry point.
- `too-early`: may matter later, but commercialization, evidence, or timing is not ready.

### Evidence Grade

- `strong-evidence`: filings, company disclosures, official contracts, or direct cross-chain proof.
- `reported`: credible media, industry reports, or management statements.
- `inferred`: supply-chain inference from adjacent evidence.
- `needs-verification`: lead only.

### Chokepoint State

- `current-chokepoint`: likely a present bottleneck worth prioritizing.
- `candidate-chokepoint`: plausible but needs more evidence or timing confirmation.
- `priced-chokepoint`: real bottleneck, but likely already reflected in market attention.
- `future-chokepoint`: may become important later, but too early now.

## Canvas Mode vs Portable Mode

### Canvas Mode

In rich Canvas environments, the skill can produce interactive `.canvas.tsx` documents with:

- expandable mindmap navigation
- clickable nodes
- sibling comparisons
- node detail panels
- action buttons

Buttons can open a new chat with the selected node id, domain id, and task instruction.

### Portable Mode

In text-only environments, the same workflow still works through stable node ids and copyable prompts:

```text
Use serenity-interactive-chain to deepen node D5-N3-power-megapack
in musk-ecosystem-map.canvas.tsx and update the current file.
```

This makes the workflow usable across Cursor, Claude Code, Codex-style agents, and other agent environments.

## Example: Company / Ecosystem Decomposition

For a company or ecosystem, do not flatten everything into one chain.

Example:

```text
Musk Ecosystem
├─ SpaceX / Starlink
│  ├─ phased-array chips
│  ├─ RF / GaN
│  └─ optical inter-satellite links
├─ SpaceX / Starship
│  ├─ Raptor superalloys
│  └─ Stage 0 cryogenic systems
├─ Tesla / Optimus
│  ├─ actuator modules
│  ├─ harmonic reducers
│  ├─ roller screws
│  └─ force / tactile sensors
├─ xAI / AI factories
│  ├─ GPU / HBM
│  ├─ liquid cooling
│  └─ Megapack / transformers
└─ Neuralink
   ├─ MEMS flexible electrodes
   └─ surgical automation
```

## Auxiliary Views

Mindmap navigation is the default.

Other views can be generated when useful:

- swimlane heatmap: best for investment comparison
- subway map: best for cross-domain shared nodes
- galaxy map: best for presentations
- table view: best for compact exports

## Repository Contents

```text
.
├── SKILL.md
├── README.md
├── LICENSE
├── docs/
│   └── interaction-model.md
└── examples/
    ├── minimal-mindmap.canvas.tsx
    ├── ai-industry-serenity-map.html
    └── musk-ecosystem-mindmap.html
```

## Disclaimer

This project is for information tracking and research support only.

It does not provide investment advice, trading instructions, personalized financial advice, or guaranteed outcomes. Always verify current filings, contracts, financials, market prices, customer relationships, and regulatory constraints independently.

---

# 中文

Serenity Interactive Chain 是一个 Agent Skill，用来把行业、公司、集团、生态系统拆成可交互的供应链卡点地图。

它的核心不是“直接报股票”，而是先看真实的物理系统：业务怎么运转、钱流向哪里、哪一层最难扩产、证据强不强、市场有没有定价，最后才映射到公司。


<img width="1804" height="1266" alt="image" src="https://github.com/user-attachments/assets/d55ff20a-838b-4c65-8642-9d07a13b37d2" />
<img width="1796" height="1357" alt="image" src="https://github.com/user-attachments/assets/4d894daa-4604-41a0-942a-db55f1162fa6" />

这个 skill 强制走更慢但更干净的路径：

```text
系统变化 -> 业务域拆解 -> 供应链层级 -> 卡点节点
-> 证据等级 -> 市场状态 -> 公司映射 -> 验证路径
```

它想回答的问题是：

> 哪个小而关键的环节，可能卡住更大的下游系统？

## 核心能力

- 先把复杂公司或生态拆成业务域。
- 再把每个业务域拆成供应链层级。
- 默认生成脑图式交互文档。
- 支持从任意节点继续递归下钻。
- 每个节点都有标签：
  - 节点类型
  - 市场状态
  - 证据等级
  - 是否为当下卡点
- 每个节点可以继续触发动作：
  - 生成子层
  - 补证据
  - 找本地市场映射
  - 重新评估
- 既适合 Cursor Canvas，也能在 Claude Code / Codex 这类文本环境中使用。

## HTML 示例

- [AI Industry Serenity Map](examples/ai-industry-serenity-map.html)
- [Musk Ecosystem Mindmap](examples/musk-ecosystem-mindmap.html)

## 什么时候使用

适合这类需求：

```text
用 serenity-interactive-chain 拆一下 Musk ecosystem，做成可交互脑图。
```

```text
拆解 SpaceX 产业链，但要先分 Starlink、Starship、Starshield、地面基础设施和算力。
```

```text
做一张 AI 数据中心电力供应链卡点图，找还没被充分定价的环节。
```

```text
把 D5-N3-power-megapack 继续下钻，并更新当前 canvas 文件。
```

```text
重新评估行星滚柱丝杠是不是仍然是当下卡点，并补 A股映射。
```

## 安装

克隆仓库：

```bash
git clone https://github.com/submato/serenity-interactive-chain-skill.git
cd serenity-interactive-chain-skill
```

安装到 Agent skill 目录：

```bash
mkdir -p ~/.agents/skills/serenity-interactive-chain
cp SKILL.md ~/.agents/skills/serenity-interactive-chain/SKILL.md
```

安装到 Claude Code：

```bash
mkdir -p ~/.claude/skills/serenity-interactive-chain
cp SKILL.md ~/.claude/skills/serenity-interactive-chain/SKILL.md
```

安装到 Codex 风格 skill 目录：

```bash
mkdir -p ~/.codex/skills/serenity-interactive-chain
cp SKILL.md ~/.codex/skills/serenity-interactive-chain/SKILL.md
```


## 免责声明

本项目仅用于信息跟踪和研究辅助。

它不提供投资建议、交易指令、个性化金融建议或收益承诺。所有财报、合同、价格、客户关系、监管约束和市场状态都应由使用者自行核实。

---

# English

Serenity Interactive Chain is an Agent Skill for turning companies, industries, and ecosystems into interactive supply-chain chokepoint maps.

Unlike one-shot research outputs, this skill uses the Serenity-style supply-chain logic to generate an interactive `.canvas.tsx` file. The map can then be refined through follow-up conversations with an AI agent, node by node, until the whole investment map becomes sharper.

It deliberately avoids jumping straight from a narrative to tickers. Instead, it follows a slower and cleaner path:

```text
system change -> business-domain breakdown -> supply-chain layers -> chokepoint nodes
-> evidence grade -> market status -> company mapping -> verification path
```

The core question is:

> Which small but critical layer could physically constrain a much larger downstream system?

## Core Features

- Splits complex companies or ecosystems into business domains first.
- Maps each domain into supply-chain layers.
- Defaults to an interactive mindmap-style document.
- Supports recursive drilldown from any node.
- Labels every node by:
  - node type
  - market status
  - evidence grade
  - chokepoint state
- Each node can trigger follow-up actions:
  - generate sublayers
  - add evidence
  - map local-market stocks
  - re-evaluate the node
- Works in Cursor Canvas and can also be used in text-first environments such as Claude Code or Codex-style agents.

## When To Use

Use it for prompts like:

```text
Use serenity-interactive-chain to map the Musk ecosystem as an interactive mindmap.
```

```text
Break down the SpaceX supply chain, but split Starlink, Starship, Starshield, ground infrastructure, and compute first.
```

```text
Create an AI data-center power supply-chain chokepoint map and identify underpriced layers.
```

```text
Deepen node D5-N3-power-megapack and update the current canvas file.
```

```text
Re-evaluate whether the planetary roller screw node is still a current chokepoint and add A-share mappings.
```

## Installation

Clone the repository:

```bash
git clone https://github.com/submato/serenity-interactive-chain-skill.git
cd serenity-interactive-chain-skill
```

Install to an Agent skill folder:

```bash
mkdir -p ~/.agents/skills/serenity-interactive-chain
cp SKILL.md ~/.agents/skills/serenity-interactive-chain/SKILL.md
```

Install for Claude Code:

```bash
mkdir -p ~/.claude/skills/serenity-interactive-chain
cp SKILL.md ~/.claude/skills/serenity-interactive-chain/SKILL.md
```

Install for Codex-style skill folders:

```bash
mkdir -p ~/.codex/skills/serenity-interactive-chain
cp SKILL.md ~/.codex/skills/serenity-interactive-chain/SKILL.md
```

## Disclaimer

This project is for information tracking and research support only.

It does not provide investment advice, trading instructions, personalized financial advice, or guaranteed outcomes. Always verify current filings, contracts, market prices, customer relationships, regulatory constraints, and market status independently.
