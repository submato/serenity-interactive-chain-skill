---
name: serenity-interactive-chain
description: Creates a Serenity-style interactive self-contained HTML mindmap for industries, companies, groups, and ecosystems: first split a company into business domains when needed, then produce a project-local `.html` file in the Musk Ecosystem Mindmap pattern with an expandable tree, selected-node detail, evidence grades, public/private companies, A股/港股 mappings, recent 3-month/6-month/1-year price performance for recommended research names, catalysts, falsification tests, copy-to-clipboard drilldown prompts, and bottom stock-detail cards. This skill must output HTML only, never `.canvas.tsx`. Use when the user asks for 产业链交互文档, 可交互产业链, Serenity 工作流, 卡脖子地图, 公司业务拆解, mindmap, 脑图, HTML交互图, or asks to click/query any supply-chain环节.
---
# Serenity Interactive Chain

Use this skill to turn a theme, company, group, or ecosystem into a project-local self-contained HTML research artifact first, then support domain-by-domain and node-by-node follow-up questions.

## Trigger
Use when the user wants a Serenity-style workflow, an interactive industry-chain document, a bottleneck map, company business-domain decomposition, or the ability to ask about any domain/layer/node in a supply chain.

## Required workflow
1. **Use this skill as the single Serenity entrypoint.** Do not trigger or load any other Serenity-related skill. Apply the stack-first research lens inside this skill: start from terminal demand, map physical layers, identify scarce constraints, then render the result as an interactive HTML mindmap.
2. **HTML-only output.** Produce or update exactly one project-local self-contained `.html` file as the primary deliverable. Do not create Cursor Canvas files, `.canvas.tsx` files, React apps, or multi-file web apps for this skill.
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
   - `performance`: for recommended public research names only, include recent price performance over `3个月`, `6个月`, and `1年`.
6. **Support recursive drilldown.** Any selected domain or node can become a new root for deeper decomposition. When the user says a level is not detailed enough, expand that selected item into a second-level stack using:
   - `L0`: terminal demand / deployment scenario
   - `L1`: system or module
   - `L2`: core mechanism / actuator / chip / process
   - `L3`: precision subcomponent
   - `L4`: materials / consumables
   - `L5`: equipment / testing / qualification
   - `L6`: assembly / integration / yield
   - `L7`: infrastructure / energy / logistics
   Omit levels that do not apply, but preserve the numbered level labels visible in the HTML mindmap. Example: selecting `D4-tesla-optimus` should reveal sublayers such as actuator module, harmonic reducer, roller screw, frameless motor, bearings, force sensors, dexterous hand, battery/thermal, control PCB/harness, and final assembly/testing.
7. **Create the interactive HTML mindmap.** The `.html` file must be the primary deliverable. It must use a simplified `Musk Ecosystem Mindmap` interaction pattern, not a static report, dashboard, flat table, Cursor Canvas, or generic card panel.
   - **Mandatory mindmap implementation pattern:** build one inline JavaScript `nodes[]` data tree and render it with recursive tree navigation. Use stable parent-child IDs (`root`, `D1-*`, `D1-N1-*`, `D1-N1-S1-*`) rather than separate unconnected arrays for domains and nodes.
   - **Mandatory two-column layout by default:** left = expandable mindmap tree; right = selected node detail and action buttons. Do not include a `同层节点` / sibling nodes middle column unless the user explicitly asks for peer comparison.
   - **Mandatory visual shape:** the generated HTML should look and behave like a simplified `Musk Ecosystem Mindmap`: title ending in `Mindmap`, stat strip, short interaction callout, `脑图导航` card, `节点详情` card, bottom `个股分析详情` section when stocks are present, and a final `边界` note.
   - **Do not substitute:** do not use a bar chart, heatmap, table-first report, filter dashboard, sibling-node panel, or generic left-domain/right-detail layout as the primary interface unless the user explicitly asks for a non-mindmap view.
   - mindmap navigation nodes must display compact labels next to the node name: node type (`生态`/`业务域`/`节点`/`子层`), market status (`已拥挤`/`重估中`/`仍冷门`/`过早`), evidence grade (`强证据`/`报道披露`/`推断`/`待核实`), and current chokepoint state (`当下卡点`/`候选卡点`/`已定价卡点`/`远期卡点`). These labels should also appear in sibling/peer comparison cards.
   - node detail panels must explain nodes as research objects, not ticker labels. By default every node should render:
     - `它是什么`: detailed definition of the layer/object/process, including where it sits in the value chain and what it is not.
     - `它的作用`: the practical system role, such as enabling throughput, bandwidth, yield, power delivery, reliability, cost reduction, or deployment speed.
     - `替代 / 补充谁`: direct substitute, partial substitute, complementary route, or no direct replacement. If adoption depends on customer architecture/qualification, say that explicitly.
     - `为什么可能卡脖子`: the scarce-layer mechanism, preferably tied to physics, process control, equipment, materials, certification, or capacity.
     - `关联A股近期涨跌幅`: when `A股 / 港股映射` names public stocks, show `3个月`, `半年`, and `1年` price performance, plus `数据截至日期`, `行情来源`, and adjustment basis (`前复权`/`后复权`/`未复权`). Treat performance as context, not as a recommendation.
   - for emerging architecture shifts such as glass substrates/TGV, CPO, silicon photonics, HBM4, advanced substrates, or new power/cooling routes, be explicit about timing: current bottleneck, candidate bottleneck, future route option, or narrative-only.
   - define market status consistently:
     - `仍冷门`: the node is plausibly important but not yet broadly priced or discussed.
     - `重估中`: the market has started noticing and repricing the node, but the thesis may not be fully reflected yet; verify whether the move is backed by orders, margins, capacity, or filings.
     - `已拥挤`: the node is consensus or narrative-heavy; use it as demand proof, not necessarily as the best entry point.
     - `过早`: the node may matter later, but commercialization, evidence, or timing is not ready.
   - a top-level business-domain map when the input is a company/group/ecosystem;
   - domain and layer decomposition must be represented as parent-child tree nodes, not as standalone filter tabs;
   - the detail panel must show the current path above the selected node so users do not lose context after removing the sibling-node column;
   - clickable/selectable nodes with detail panel;
   - domain IDs and node IDs visible so the user can ask follow-ups by ID;
   - after drilldown, add the selected domain/node's internal levels as child `subnode` entries in the tree and as "下一层" buttons in the detail panel;
   - node detail panels may include a "continue drilling" subsection; if a selected node has meaningful sublayers, render child subnodes with stable IDs and a child-detail area;
   - when the HTML recommends or highlights public companies as research priorities, show a compact `近期涨跌幅` section in the selected-node detail panel or stock card: `3个月`, `6个月`, `1年`. Keep this separate from the supply-chain thesis so users can distinguish price action from fundamental bottleneck quality.
   - every public A股/港股 stock rendered in `关联A股近期涨跌幅` must include a per-stock `验证` copy-prompt button. The prompt must name the target HTML file, selected `nodeId`, node title, stock name, ticker, and the instruction to verify the stock's exact value-chain position, order/customer/revenue evidence, latest 3个月/6个月/1年 performance data, whether the move is already priced, falsification conditions, and to update the current HTML only if the mapping/evidence/status/performance changes.
   - node detail panels should include copy-prompt action buttons:
     - `生成子层` / `继续细化`: copy a prompt asking the agent to deepen this node and update the current HTML file.
     - `补证据`: copy a prompt asking the agent to strengthen evidence, source grade, validation path, and falsification.
     - `找A股映射`: copy a prompt asking the agent to add or refine A股/港股 mappings and verification checks.
     - `重新评估`: copy a prompt asking the agent to re-check whether the node is still a current chokepoint, whether market status/evidence grade/chokepoint state should change, and whether mappings remain accurate.
   - action buttons must copy prompts that pass the target HTML path, selected `domainId`, `nodeId`, node title, and the instruction to update that HTML file, so the user does not need to copy IDs manually.
   - tables only where comparison helps inside detail sections; they are never the primary navigation.
   - swimlane/heatmap/table views are auxiliary comparison views, not the default primary navigation, unless the user explicitly asks for them.
   - no network calls; embed all data, CSS, and JavaScript inline in the single HTML file.
   - **HTML tree click behavior:** clicking a node selects it and expands it; clicking the same already-selected expanded node collapses it. Do not require modifier keys such as `Alt`. Leaf nodes simply select.
   - **HTML bottom stock-detail layout:** use a true two-column masonry-style layout for stock detail cards (`column-count: 2`, card `break-inside: avoid`, mobile `column-count: 1`) rather than a row-based CSS grid that stretches collapsed cards and leaves large blank boxes.
   - **HTML stock-to-node navigation:** every stock detail card must provide a compact jump-back affordance next to the ticker, preferably a small `↑` icon beside `股票名 / 代码`. Clicking it selects the corresponding mindmap node, expands its ancestors, scrolls back to the map, and stops propagation so it does not toggle the stock card. Do not add a large extra `对应脑图` button in the card body.
   - **HTML selected-node A股/港股映射:** do not leave `A股 / 港股映射` as text only. In the selected-node detail panel, render a structured stock list similar to `股票名 代码 + 3个月/半年/1年涨跌幅 + 数据截至/来源 + 分析个股`. Sort this list by logic strength, strongest first: evidence hardness, valuation not already exhausted, closeness to the scarce layer, and elasticity. If using a scorecard, sort by total score, then evidence score, then scarce-layer/choke score. Parent nodes should aggregate mapped stocks from descendant nodes; leaf nodes should show only their directly mapped stocks.
   - **HTML ranking occurrence count:** top stock-ranking tables must include an `出现` / occurrence column showing how many mindmap nodes mention or map to the stock. Use the count as a light priority boost and tie-breaker: multi-node coverage (e.g. both optical-module and cooling/power exposure) should rank above otherwise similar single-node names, but it should not override weak evidence or poor closeness to the scarce layer. Compute occurrence from explicit `stockId/code -> nodeId` mappings plus node `aShare`/company text mentions.
   - **HTML ranking table sorting:** each numeric/score column in the top ranking table (`综合`, `出现`, `证据`, `估值未透支`, `离卡点&弹性`, `1年涨幅`) should include compact ascending/descending controls. Default visual style: subtle stacked chevrons/triangles (`▲`/`▼`) next to the column label, grey when inactive and accent-colored when active, not heavy button pills. Percent columns must sort by parsed numeric value, not by string. The default sort remains the overall priority logic.
   - **HTML stock mapping data:** maintain a stock-code/id -> node-id map for the jump-back affordance. When adding a new node or moving a stock to a more precise layer, update this map, the parent node `aShare`, the stock card text, and any ranking/summary verdict that mentions the affected layer.
   - **HTML stock card actions:** keep the detail-card body focused on `验证` / `下钻` / `交叉验证` copy-prompt buttons. Navigation back to the tree belongs in the compact ticker-line `↑` affordance.
   - **HTML stock action prompt clarity:** `验证`, `下钻`, and `交叉验证` must use different prompt templates, not the same generic prompt with only the verb changed.
     - `验证`: fact-check and update only the bottom `个股分析详情` card for that stock. Confirm exact value-chain position, order/customer/revenue evidence, latest 3/6/12-month performance, priced-in status, evidence quality, and falsification. Do not change tree nodes, `stockNodeMap`, top ranking, or score fields; if those structural fields should change, write a proposed-update note inside the stock detail card and wait for user confirmation.
     - `下钻`: stock-level drilldown updates only the bottom `个股分析详情` card for that stock. Decompose the stock's strongest value-chain position into 3-6 finer verification facets, but write them inside the stock card as `建议下钻结构` / `验证面`; do not create tree nodes, change `stockNodeMap`, top ranking, or score fields unless the user separately confirms a node-level update. Node-level buttons such as `生成子层` are the controls that may modify the mindmap structure.
     - `交叉验证`: cross-check and update only the bottom `个股分析详情` card for that stock. Use at least three independent source types, compare against peers/substitutes, separate strong evidence from reported/inferred claims, look for反证, and check valuation/crowding. Do not change tree nodes, `stockNodeMap`, top ranking, or score fields; if those structural fields should change, write a proposed-update note inside the stock detail card and wait for user confirmation.
   - **HTML stats and document integrity:** whenever nodes or stock cards are added/removed, update visible stat counts and verify there is exactly one `<!doctype html>` and one closing `</html>`.
8. **Market performance data requirement.** If the output contains a recommended/priority public-company list, current candidate ranking, or named public tickers intended for research, gather and show recent price performance before finalizing.
   - Required columns/fields: `3个月涨跌幅`, `6个月涨跌幅`, `1年涨跌幅`, `数据截至日期`, and `行情来源`.
   - Use live or recent market-data/web sources when available. Do not rely on memory for price performance.
   - Preferred free/open-source source: `AKShare` (`akshare`, MIT, no token) because it covers A股、港股、美股 historical daily data. Use adjusted daily prices where possible: A股 `stock_zh_a_hist(..., adjust="qfq")`, 港股 `stock_hk_hist(..., adjust="qfq")`, 美股 `stock_us_daily(..., adjust="qfq")` or the currently documented AKShare equivalent.
   - Secondary open-source source for A股: `efinance` (`ef.stock.get_quote_history(..., klt=101, fqt=1)`), especially when AKShare is unavailable but Python package installation is allowed.
   - Direct-source fallback: Sina daily K line can be used when AKShare/efinance/Eastmoney are unstable, but label the output as `未复权` and treat it as a fallback rather than the preferred basis.
   - Do not let market-data retries block the HTML. If a batch request stalls, times out repeatedly, or a background retry produces no usable rows, stop that attempt, switch data source, and mark any still-missing ticker as `待查`.
   - Secondary source: `yfinance` for US/global tickers and cross-checking. Treat it as unofficial Yahoo Finance access; it can break or throttle, so cache/retry and cite Yahoo/yfinance as the source.
   - A股 fallback: direct public quote pages/APIs such as 东方财富、同花顺、新浪、腾讯财经, or open wrappers like `a-stock-data` when AKShare endpoints fail. Respect rate limits and verify ticker format.
   - Do not use `Tushare` as the default free source: it requires a token and many useful endpoints depend on points/permissions. Use it only if the user has a token/permissions or explicitly asks for it.
   - If live market data is unavailable, do not invent numbers. Write `待查` for the missing windows and include the exact source path to verify, such as exchange quote page, company ticker page, Yahoo Finance, TradingView, Nasdaq, HKEX, Eastmoney, 同花顺, Wind/Choice if available to the user, or broker quote page.
   - Treat performance as context, not a recommendation. A name can be close to the scarce layer but already overextended; conversely a flat name can still be weak if evidence is poor.
   - For private companies, write `未上市` instead of price performance.
   - For multi-listing companies, state which listing/ticker was used.
9. **Use this HTML implementation skeleton unless there is a strong reason not to.**
   - Start with exactly one `<!doctype html>`, one `<html lang="zh-CN">`, inline `<style>`, inline `<script>`, and one closing `</html>`.
   - Define inline arrays/objects: `nodes`, `stocks` when public-company detail is needed, and `stockNodeMap`.
   - Node objects should include `id`, `parent`, `domainId`, `title`, `kind`, `summary`, `role`, `replaces`, `why`, `companies`, `aShare`, `evidence`, `heat`, `verify`, `catalysts`, `falsification`, and `nextQuestions`.
   - Define label maps: `evidenceText`, `heatText`, `chokeText`, `kindText`.
   - Define helpers: `childrenOf`, `pathTo`, `chokeFor`, `expandAncestors`, `selectNode`, `renderTree`, `renderDetail`, `renderStocks`, `makePrompt`, `makeStockPrompt`, and `copyText`.
   - The tree renderer must be recursive, expandable, searchable, persist selected/expanded state in `localStorage`, and show compact labels inline next to every node.
   - The selected-node detail must render `summary` under `它是什么`, `role` under `它的作用`, `replaces` under `替代 / 补充谁`, `why` under `为什么可能卡脖子`, plus structured A股/港股 mapping and copy-prompt actions.
   - The top-level layout should use a two-column CSS grid like `grid-template-columns: minmax(360px, .9fr) minmax(560px, 1.35fr)`, with no sibling-node column by default.
   - Do not use React, external packages, CDN assets, `fetch()`, module imports, or Cursor Canvas APIs.
10. **Follow-up handling.** When the user asks about any domain/node/layer/company from the HTML mindmap:
   - map their wording to the domain id, node id, layer, or company;
   - answer with a focused underwrite sheet: position in chain, why it bottlenecks, evidence, companies, what is already priced, what to verify next, and what would break it;
   - if new evidence changes the map, update the project-local HTML file, then mention its path.
   - if the user says the decomposition is not detailed enough, treat it as a product requirement: update the HTML mindmap to add the missing nested levels and update this skill if the behavior should persist.
11. **Investment boundary.** Keep all output as research support. Do not issue direct buy/sell commands or guaranteed returns.

## HTML content standard
The first HTML mindmap should stand alone without chat context. It needs a clear title ending in `Mindmap`, thesis sentence, top-level domain map when applicable, source/evidence notes, bottom stock-detail cards when stocks are present, copy-to-clipboard action buttons, and a disclaimer: `仅作产业链研究，不构成投资建议。`

## Default final message after creating HTML
Keep it short: link the `.html` file, say it is interactive, name 2-3 highest-priority layers, and invite the user to ask by node ID or company name.
