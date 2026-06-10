# Serenity Interactive Chain Skill


[English version](#english)

与其他仓库不同，Serenity Interactive Chain 使用 Serenity 的逻辑输出一个可交互的 `.canvas.tsx` 文件，能够让你在与 AI 对话中持续完善整个投资地图。

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

## HTML Examples

- [AI Industry Serenity Map](examples/ai-industry-serenity-map.html)
- [Musk Ecosystem Mindmap](examples/musk-ecosystem-mindmap.html)

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
