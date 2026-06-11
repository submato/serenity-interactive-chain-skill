---
name: serenity-interactive-chain
description: Creates a Serenity-style interactive research workflow for industries, companies, groups, and ecosystems: first split a company into business domains when needed, then produce a self-contained interactive HTML page (default) that maps each domain's supply chain, bottleneck layers, evidence grades, public/private companies, catalysts, and falsification tests. Use when the user asks for 产业链交互文档, 可交互产业链, Serenity 工作流, 卡脖子地图, 公司业务拆解, or asks to click/query any supply-chain环节.
---
# Serenity Interactive Chain

Use this skill to turn a theme, company, group, or ecosystem into an interactive research artifact first, then support domain-by-domain and node-by-node follow-up questions.

## Trigger
Use when the user wants a Serenity-style workflow, an interactive industry-chain document, a bottleneck map, company business-domain decomposition, or the ability to ask about any domain/layer/node in a supply chain.

## Required workflow
1. **Load research lens.** Use `serenity-skill` for broad cross-market scans or `ai-supply-chain-bottleneck-hunter` for a stricter stack-first workflow.
2. **Choose output format. Default to a self-contained interactive HTML page.** Produce a single `.html` file in the project directory (all data + CSS + JS inline, no build, no network). Only create or edit a Cursor `.canvas.tsx` when the user explicitly asks for a Cursor Canvas; in that case read the canvas skill and follow its constraints. Reasons HTML is default: it opens in any browser, text is selectable/copyable/searchable, it lives as one file in the project (not split between `.cursor` and the repo), and it can be hosted later.
3. **Scope.** Infer or ask briefly for: input type, theme/company/ecosystem, geography (global/A股/港股/美股), horizon, and whether the user wants names now or only the chain map. Default: AI infrastructure, global + A股对应, 6-18 months.
4. **If the input is a company/group/ecosystem, split business domains first.** Do not flatten a multi-business company into one chain. Build a top-level domain map before supply-chain nodes:
   - `domainId`: short stable id, e.g. `D1-starlink`, `D2-launch`, `D3-starshield`
   - `domain`: business domain name
   - `owner`: company/subsidiary/ecosystem owner
   - `product`: what is being sold or deployed
   - `revenueDriver`: what makes demand grow
   - `supplyChainStart`: where the physical chain begins
   - `keyBottleneck`: likely highest-priority constraint in that domain
   - `boundary`: whether this belongs to the company, a sibling company, or a broader ecosystem
   Examples:
   - SpaceX should be split into Starlink, Launch/Falcon, Starship, Dragon/Human Spaceflight, Starshield/Government, Ground Infrastructure, and Terafab/compute if relevant.
   - Tesla should be split into EVs, Energy storage, Supercharging, FSD/AI compute, Optimus, batteries, and manufacturing automation.
   - "Musk ecosystem" can include SpaceX, Tesla/Optimus, xAI, Neuralink, and Boring, but clearly mark cross-company boundaries.
5. **Research the stack.** For each domain, build 4-9 layers from terminal demand down to materials/consumables. Every supply-chain node must include a `domainId` and:
   - `id`: short stable id, e.g. `L3-cw-laser`
   - `domainId`: parent business domain
   - `layer`: layer name and order
   - `summary`: required. Write 2-4 detailed plain-Chinese sentences, not a one-line label. Explain the physical object/process/software layer, where it sits upstream/downstream, what it connects to, and what it is not. Use the same depth as a good "glass substrate / TGV" explanation: definition, value-chain position, and boundary versus nearby concepts.
   - `role`: required. What this node does in the system. Explain its practical function in demand release, performance, yield, cost, reliability, integration, or deployment speed.
   - `replaces`: required. What it replaces, supplements, or competes with. If there is no direct substitute, say so. If replacement is conditional, state whether it is a near-term supplement, partial replacement, long-term architecture shift, or only a route option.
   - `constraint`: why it may become a bottleneck
   - `evidence`: `confirmed`, `management-claim`, `inferred`, or `needs-verification`
   - `companies`: overseas, A股/港股, private names if relevant
   - `status`: consensus/crowded, repricing, underfollowed, too early
   - `catalysts`: what could make the market reprice it
   - `falsification`: what would prove the thesis weak
   - `nextQuestions`: 2-4 clickable/user-facing follow-up prompts
6. **Support recursive drilldown.** Any selected domain or node can become a new root for deeper decomposition. When the user says a level is not detailed enough, expand that selected item into a second-level stack using:
   - `L0`: terminal demand / deployment scenario
   - `L1`: system or module
   - `L2`: core mechanism / actuator / chip / process
   - `L3`: precision subcomponent
   - `L4`: materials / consumables
   - `L5`: equipment / testing / qualification
   - `L6`: assembly / integration / yield
   - `L7`: infrastructure / energy / logistics
   Omit levels that do not apply, but preserve the numbered level labels visible in the canvas. Example: selecting `D4-tesla-optimus` should reveal sublayers such as actuator module, harmonic reducer, roller screw, frameless motor, bearings, force sensors, dexterous hand, battery/thermal, control PCB/harness, and final assembly/testing.
7. **Create the interactive page.** The self-contained HTML page (or canvas, only if explicitly requested) must be the primary deliverable. See the "HTML interactive page standard" section below for the concrete structure, controls, and styling. It should include:
   - **default to a mindmap navigation layout** for complex company/group/ecosystem maps. The preferred layout is three columns: left = expandable mindmap tree, middle = sibling/peer nodes at the current level, right = selected node detail and action buttons.
   - mindmap navigation nodes must display compact labels next to the node name: node type (`生态`/`业务域`/`节点`/`子层`), market status (`已拥挤`/`重估中`/`仍冷门`/`过早`), evidence grade (`强证据`/`报道披露`/`推断`/`待核实`), and current chokepoint state (`当下卡点`/`候选卡点`/`已定价卡点`/`远期卡点`). These labels should also appear in sibling/peer comparison cards.
   - node detail panels must explain nodes as research objects, not ticker labels. By default every node should render:
     - `它是什么`: detailed definition of the layer/object/process, including where it sits in the value chain and what it is not.
     - `它的作用`: the practical system role, such as enabling throughput, bandwidth, yield, power delivery, reliability, cost reduction, or deployment speed.
     - `替代 / 补充谁`: direct substitute, partial substitute, complementary route, or no direct replacement. If adoption depends on customer architecture/qualification, say that explicitly.
     - `为什么可能卡脖子`: the scarce-layer mechanism, preferably tied to physics, process control, equipment, materials, certification, or capacity.
     - `关联A股近期涨跌幅`: when `A股 / 港股映射` names public stocks, show `3个月`, `半年`, and `1年` price performance, plus `数据截至日期`, `行情来源`, and adjustment basis (`前复权`/`后复权`/`未复权`). Treat performance as context, not as a recommendation.
   - for emerging architecture shifts such as glass substrates/TGV, CPO, silicon photonics, HBM4, advanced substrates, or new power/cooling routes, be explicit about timing: current bottleneck, candidate bottleneck, future route option, or narrative-only.
   - market data source priority for A股/港股 performance:
     - Prefer GitHub/open-source libraries when available: `AKShare` (`ak.stock_zh_a_hist(..., adjust="qfq")`) or `efinance` (`ef.stock.get_quote_history(..., fqt=1)`).
     - If those fail due to network/proxy/source instability, use a direct public source such as Sina daily K line as a fallback, but label it clearly as `未复权`.
     - Do not let market-data retries block the canvas. If a batch request stalls, times out repeatedly, or a background retry produces no usable rows, stop that attempt, switch data source, and mark any still-missing ticker as `待查`.
     - Never invent missing performance data. If all sources fail for a ticker, write `待查` and include the source path to retry.
   - define market status consistently:
     - `仍冷门`: the node is plausibly important but not yet broadly priced or discussed.
     - `重估中`: the market has started noticing and repricing the node, but the thesis may not be fully reflected yet; verify whether the move is backed by orders, margins, capacity, or filings.
     - `已拥挤`: the node is consensus or narrative-heavy; use it as demand proof, not necessarily as the best entry point.
     - `过早`: the node may matter later, but commercialization, evidence, or timing is not ready.
   - a top-level business-domain map when the input is a company/group/ecosystem;
   - a layer map or graph-like layout under each selected domain;
   - filters/tabs for business domain;
   - filters/tabs for domain-level layer, evidence grade, and market status;
   - **domain-scoped layer filters only**: when a domain is selected, the layer filter must show that domain's own internal levels, not unrelated global levels from other domains;
   - clickable/selectable nodes with detail panel;
   - domain IDs and node IDs visible so the user can ask follow-ups by ID;
   - after drilldown, show the selected domain/node's internal levels as filter pills or tabs;
   - node detail panels may include a "continue drilling" subsection; if a selected node has meaningful sublayers, render child subnodes with stable IDs and a child-detail area;
   - node detail panels should include action buttons:
     - `生成子层` / `继续细化`: deepen this node and update the current file.
     - `补证据`: strengthen evidence, source grade, validation path, and falsification.
     - `找A股映射`: add or refine A股/港股 mappings and verification checks.
     - `重新评估`: re-check whether the node is still a current chokepoint, whether market status/evidence grade/chokepoint state should change, and whether mappings remain accurate.
   - **Action button behavior depends on the output format.** In a Cursor `.canvas.tsx`, buttons open a new composer chat via the canvas SDK. In an HTML page (the default), the SDK is unavailable, so buttons must **copy a high-quality prompt to the clipboard** instead; the prompt names the absolute file path, the `domainId`/`nodeId`/node title (and stock code when relevant), and the exact task, so the user can paste it back into Cursor. Label the action area so users know the button copies a prompt.
   - action buttons must pass the selected `domainId`, `nodeId`, node title, and the instruction to update the current file, so the user does not need to copy IDs manually.
   - tables only where comparison helps;
   - swimlane/heatmap/table views are auxiliary comparison views, not the default primary navigation, unless the user explicitly asks for them.
   - no network calls; embed data inline.
8. **Follow-up handling.** When the user asks about any domain/node/layer/company from the canvas:
   - map their wording to the domain id, node id, layer, or company;
   - answer with a focused underwrite sheet: position in chain, why it bottlenecks, evidence, companies, what is already priced, what to verify next, and what would break it;
   - if new evidence changes the map, update the canvas and mention the link.
   - if the user says the decomposition is not detailed enough, treat it as a product requirement: update the canvas to add the missing nested levels and update this skill if the behavior should persist.
9. **Investment boundary.** Keep all output as research support. Do not issue direct buy/sell commands or guaranteed returns.

## HTML interactive page standard
The default deliverable is one self-contained `.html` file in the project directory. Keep it to a single document (never leave a duplicate `<!doctype html>`/`</html>` block appended at the end — after edits, verify only one document remains). Embed all data, CSS, and JS inline. Required structure and behavior:

- **Layout:** header with a global node search box, market-status filter, and tree 全部展开/折叠 controls; then a two-column main area: left = expandable navigation tree, right = selected node detail. Persist `selectedId` and `expanded` state in `localStorage` so reloads keep position.
- **Tree rows** show the same compact labels as the canvas spec (node type, market status, evidence grade). Global search filters nodes (and keeps ancestors of matches visible).
- **Node detail** renders the same research sections as the canvas spec (`它是什么`, `它的作用`, `替代 / 补充谁`, `为什么可能卡脖子`, `海外 / 私有标的`, `A股 / 港股映射`, `关联A股近期涨跌幅`, `怎么验证`), plus the research-action buttons and a `下一层` child list.
- **Stock rows** under `关联A股近期涨跌幅` show `3个月 / 半年 / 1年` pills, source/date, a `分析个股` button (copies a per-stock analysis prompt), and a `查看分析` button **only when that stock has a card in the bottom section** (jumps to it).
- **Bottom "个股分析详情" section** is the home for written per-stock conclusions. It must be:
  - **searchable** (its own search box filtering by name/code/node/conclusion text) with a match-count label;
  - **per-card collapsible** (each stock card has its own 收起/展开 toggle) plus section-level `全部展开` / `全部收起`, because many stocks accumulate here;
  - each card holds: title (name + code), path, 结论, 对应环节, 已有证据, 缺失证据, 行情, 证伪条件, 下一步查 3 个来源；
  - each card has `重新评估`, `下钻`, and `交叉验证` buttons (copy prompts). `交叉验证` asks the agent to confirm the thesis with at least 3 independent source types and compare against peers.
  - `查看分析` from a stock row clears the search, expands and scrolls to that card, and briefly highlights it.
- **Premium button styling.** Define a small button system in CSS: a refined base button (subtle surface, hover lightens border/background, `:active` slight translate, `:focus-visible` accent ring), a `.btn-primary` accent variant for the main action in each group (e.g. `生成子层`, `查看分析`, `交叉验证`), and a `.btn-ghost` variant for secondary/utility actions (toggles, 全部展开/收起). Inputs get a matching focus ring. Avoid heavy gradients, rainbow color, and box-shadow stacks; keep it flat and minimal.
- **Reusability.** Drive the bottom section from a `stockDetails` array and render with a function, so adding more stocks needs only a new data entry.

After writing or editing the HTML, open it for the user (e.g. `open <file>`), and tell them to hard-refresh (`Cmd+Shift+R`) if a cached version shows.

## Canvas content standard
The first page should stand alone without chat context. It needs a clear title, thesis sentence, top-level domain map when applicable, source/evidence notes, and a disclaimer: `仅作产业链研究，不构成投资建议。`

## Default final message after creating a page
Keep it short: link the HTML file (or canvas), say it is interactive and opens in the browser, name 2-3 highest-priority layers, and invite the user to ask by node ID or company name.
