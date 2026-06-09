# Serenity Interactive Chain Skill

**English** | [中文](#中文)

Serenity Interactive Chain is an Agent Skill for turning industries, companies, groups, and ecosystems into interactive supply-chain chokepoint maps.

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
    └── minimal-mindmap.canvas.tsx
```

## Disclaimer

This project is for information tracking and research support only.

It does not provide investment advice, trading instructions, personalized financial advice, or guaranteed outcomes. Always verify current filings, contracts, financials, market prices, customer relationships, and regulatory constraints independently.

---

# 中文

Serenity Interactive Chain 是一个 Agent Skill，用来把行业、公司、集团、生态系统拆成可交互的供应链卡点地图。

它的核心不是“直接报股票”，而是先看真实的物理系统：业务怎么运转、钱流向哪里、哪一层最难扩产、证据强不强、市场有没有定价，最后才映射到公司。

这是一个**研究工作流**，不是投资建议工具。

## 为什么需要这个 Skill

很多投研会太快从叙事跳到标的：

```text
AI 很强 -> 买 AI 股
SpaceX 要上市 -> 买航天概念
机器人来了 -> 买机器人零部件
```

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

## 推荐交互：脑图导航

默认视图应该是脑图，而不是表格。

推荐三栏布局：

```text
左侧 = 可展开脑图树
中间 = 当前层级的同层/兄弟节点
右侧 = 选中节点详情和动作按钮
```

推荐结构：

```text
生态
├─ 业务域
│  ├─ 节点
│  │  ├─ 子层
│  │  └─ 子层
│  └─ 节点
└─ 业务域
```

每个节点都应该显示紧凑标签：

```text
[节点类型] [市场状态] [证据等级] [卡点状态]
```

例如：

```text
Megapack / 变压器
[节点] [仍冷门] [报道/披露] [当下卡点]
```

## 节点详情应该包含什么

右侧详情面板应该包含：

- 这个节点做什么
- 为什么可能卡脖子
- 海外/私有标的
- 本地市场映射，比如 A股/港股
- 可能催化
- 什么会证伪
- 怎么验证
- 已有子层
- 动作按钮或可复制 prompt

## 节点动作

每个节点可以有四个动作。

### 生成子层

当节点太粗时使用。

输出应该在当前节点下面增加子节点，并保持稳定 ID。

### 补证据

当结构对，但证据不够强时使用。

输出应该补证据等级、来源说明、验证路径和证伪条件。

### 找本地市场映射

当用户想看 A股、港股、美股、日股、韩股、台股或欧洲市场映射时使用。

输出应该说明映射关系是直接、相邻、弱相关，还是只是主题映射。

### 重新评估

当节点可能过时时使用。

输出应该重新检查：

- 是否仍然是当下卡点
- 市场状态是否变化
- 证据等级是否需要升降级
- 股票映射是否仍然准确

## 标签定义

### 节点类型

- `ecosystem`：最高层生态。
- `domain`：业务域或产品线。
- `node`：供应链层级或卡点候选。
- `subnode`：更深一层的部件、材料、设备或验证层。

### 市场状态

- `underfollowed`：可能重要，但还没被广泛讨论或定价。
- `repricing`：市场已经开始注意并重新定价，但不确定是否已经完全反映。要继续验证订单、利润率、产能或公告。
- `crowded`：共识度高或叙事拥挤。可以作为需求证明，但不一定是最好切入点。
- `too-early`：未来可能重要，但商业化、证据或时点还太早。

### 证据等级

- `strong-evidence`：公告、财报、公司披露、正式合同或多链交叉验证。
- `reported`：可信媒体、行业报告或管理层表述。
- `inferred`：从相邻证据推导出的供应链判断。
- `needs-verification`：只是线索，还需要验证。

### 卡点状态

- `current-chokepoint`：大概率是当下值得优先研究的瓶颈。
- `candidate-chokepoint`：可能是卡点，但还需要更多证据或时点确认。
- `priced-chokepoint`：卡点是真的，但市场可能已经充分定价。
- `future-chokepoint`：未来可能重要，但现在还太早。

## Canvas 模式与通用模式

### Canvas 模式

在支持 Canvas 的环境里，这个 skill 可以生成 `.canvas.tsx` 交互文档：

- 可展开脑图导航
- 可点击节点
- 同层节点比较
- 节点详情面板
- 节点动作按钮

按钮可以打开新对话，并自动带上当前节点 ID、业务域 ID 和任务。

### 通用文本模式

在不支持 Canvas 的环境里，也可以通过稳定节点 ID 和可复制 prompt 使用：

```text
使用 serenity-interactive-chain，把 musk-ecosystem-map.canvas.tsx 里的
D5-N3-power-megapack 继续下钻，并更新当前文件。
```

这样可以兼容 Cursor、Claude Code、Codex 风格 agent，以及其他文本型 agent 环境。

## 示例：公司 / 生态拆解

对于公司或生态，不能直接压成一条供应链。

例如：

```text
Musk Ecosystem
├─ SpaceX / Starlink
│  ├─ 相控阵芯片
│  ├─ RF / GaN
│  └─ 星间激光
├─ SpaceX / Starship
│  ├─ Raptor 特种合金
│  └─ Stage 0 低温系统
├─ Tesla / Optimus
│  ├─ 执行器总成
│  ├─ 谐波减速器
│  ├─ 行星滚柱丝杠
│  └─ 力控 / 触觉传感
├─ xAI / AI 工厂
│  ├─ GPU / HBM
│  ├─ 液冷
│  └─ Megapack / 变压器
└─ Neuralink
   ├─ MEMS 柔性电极
   └─ 手术自动化
```

## 辅助视图

脑图导航是默认主视图。

如果需要，也可以生成辅助视图：

- 泳道热力图：最适合投研比较
- 地铁图：最适合看跨域复用节点
- 星系图：最适合展示
- 表格：最适合导出和压缩信息

## 仓库结构

```text
.
├── SKILL.md
├── README.md
├── LICENSE
├── docs/
│   └── interaction-model.md
└── examples/
    └── minimal-mindmap.canvas.tsx
```

## 免责声明

本项目仅用于信息跟踪和研究辅助。

它不提供投资建议、交易指令、个性化金融建议或收益承诺。所有财报、合同、价格、客户关系、监管约束和市场状态都应由使用者自行核实。
