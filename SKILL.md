---
name: serenity-interactive-chain
description: Creates a Serenity-style interactive research workflow for industries, companies, groups, and ecosystems: first split a company into business domains when needed, then produce an interactive Cursor canvas that maps each domain's supply chain, bottleneck layers, evidence grades, public/private companies, catalysts, and falsification tests. Use when the user asks for industry-chain interactive docs, mindmap navigation, supply-chain chokepoint maps, company business decomposition, or asks to click/query any domain/layer/node in a supply chain.
---

# Serenity Interactive Chain

Use this skill to turn a theme, company, group, or ecosystem into an interactive research artifact first, then support domain-by-domain and node-by-node follow-up questions.

## Trigger

Use when the user wants a Serenity-style workflow, an interactive industry-chain document, a bottleneck map, company business-domain decomposition, or the ability to ask about any domain/layer/node in a supply chain.

## Required Workflow

1. **Load research lens.** Use a source-backed supply-chain bottleneck workflow. Rank scarce layers before naming companies.
2. **Load canvas rules before writing.** If creating or editing a `.canvas.tsx`, follow the host canvas SDK rules. Import only from the canvas SDK, embed data inline, and do not fetch at runtime.
3. **Scope.** Infer or ask briefly for input type, theme/company/ecosystem, geography, horizon, and whether the user wants names now or only the chain map. Default: AI infrastructure, global plus local-market mappings, 6-18 months.
4. **If the input is a company/group/ecosystem, split business domains first.** Do not flatten a multi-business company into one chain. Build a top-level domain map before supply-chain nodes:
   - `domainId`: short stable id, e.g. `D1-starlink`, `D2-launch`, `D3-starshield`
   - `domain`: business domain name
   - `owner`: company/subsidiary/ecosystem owner
   - `product`: what is being sold or deployed
   - `revenueDriver`: what makes demand grow
   - `supplyChainStart`: where the physical chain begins
   - `keyBottleneck`: likely highest-priority constraint in that domain
   - `boundary`: whether this belongs to the company, a sibling company, or a broader ecosystem
5. **Research the stack.** For each domain, build 4-9 layers from terminal demand down to materials/consumables. Every supply-chain node must include:
   - `id`: short stable id
   - `domainId`: parent business domain
   - `layer`: layer name and order
   - `role`: what this node does in plain language
   - `constraint`: why it may become a bottleneck
   - `evidence`: `confirmed`, `management-claim`, `inferred`, or `needs-verification`
   - `companies`: overseas, local-market, and private names if relevant
   - `status`: consensus/crowded, repricing, underfollowed, or too early
   - `catalysts`: what could make the market reprice it
   - `falsification`: what would prove the thesis weak
   - `nextQuestions`: 2-4 user-facing follow-up prompts
6. **Support recursive drilldown.** Any selected domain or node can become a new root for deeper decomposition. When the user says a level is not detailed enough, expand that selected item into a second-level stack using:
   - `L0`: terminal demand / deployment scenario
   - `L1`: system or module
   - `L2`: core mechanism / actuator / chip / process
   - `L3`: precision subcomponent
   - `L4`: materials / consumables
   - `L5`: equipment / testing / qualification
   - `L6`: assembly / integration / yield
   - `L7`: infrastructure / energy / logistics

## Canvas Standard

For complex company/group/ecosystem maps, default to a **mindmap navigation layout**:

- Left: expandable mindmap tree.
- Middle: sibling/peer nodes at the current level.
- Right: selected node detail and action buttons.

Mindmap navigation nodes must display compact labels next to the node name:

- Node type: `ecosystem`, `domain`, `node`, `subnode`
- Market status: `crowded`, `repricing`, `underfollowed`, `too-early`
- Evidence grade: `strong-evidence`, `reported`, `inferred`, `needs-verification`
- Current chokepoint state: `current-chokepoint`, `candidate-chokepoint`, `priced-chokepoint`, `future-chokepoint`

Define market status consistently:

- `underfollowed`: plausibly important but not yet broadly priced or discussed.
- `repricing`: the market has started noticing and repricing the node, but the thesis may not be fully reflected yet. Verify orders, margins, capacity, or filings.
- `crowded`: consensus or narrative-heavy. Use as demand proof, not necessarily as the best entry point.
- `too-early`: may matter later, but commercialization, evidence, or timing is not ready.

Swimlane, heatmap, table, subway-map, and galaxy views are auxiliary comparison views, not the default primary navigation, unless the user explicitly asks for them.

## Node Detail Actions

Node detail panels should include action buttons when the host supports actions:

- `Generate sublayers` / `Deepen`: open a new composer/chat asking the agent to deepen this node and update the current canvas file.
- `Add evidence`: open a new composer/chat asking the agent to strengthen evidence, source grade, validation path, and falsification.
- `Map local stocks`: open a new composer/chat asking the agent to add or refine local-market mappings and verification checks.
- `Re-evaluate`: open a new composer/chat asking the agent to re-check whether the node is still a current chokepoint, whether market status/evidence grade/chokepoint state should change, and whether mappings remain accurate.

Action buttons must pass the selected `domainId`, `nodeId`, node title, and the instruction to update the current canvas file, so the user does not need to copy IDs manually.

For non-Cursor environments, provide a copyable portable prompt with the same target ids and instructions.

## Follow-Up Handling

When the user asks about any domain/node/layer/company from the canvas:

- Map their wording to the domain id, node id, layer, or company.
- Answer with a focused underwrite sheet: position in chain, why it bottlenecks, evidence, companies, what is already priced, what to verify next, and what would break it.
- If new evidence changes the map, update the canvas and mention the link.
- If the user says the decomposition is not detailed enough, treat it as a product requirement: update the canvas to add the missing nested levels and update this skill if the behavior should persist.

## Investment Boundary

Keep all output as research support. Do not issue direct buy/sell commands or guaranteed returns.
