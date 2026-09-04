'use strict';

/* 玩法教學透明度檢查：確保公開公式與 core.js 的正式規則同步。 */
const fs = require('fs');
const path = require('path');
const Core = require('../core.js');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const source = fs.readFileSync(path.join(root, 'core.js'), 'utf8');
const C = Core.CFG;

function fail(message) {
  console.error('FAIL:', message);
  process.exitCode = 1;
}
function expectText(haystack, value, label) {
  if (!haystack.includes(String(value))) fail(`${label}：教學缺少「${value}」`);
}
function section(name) {
  const re = new RegExp(`<details[^>]*data-rule-section="${name}"[^>]*>([\\s\\S]*?)<\\/details>`);
  const match = html.match(re);
  if (!match) { fail(`缺少可核對的資料區：${name}`); return '';
  }
  return match[1];
}

const expectedSections = ['time', 'toppings', 'spicy', 'crusts', 'economy', 'boss', 'settlement', 'score'];
const parts = Object.fromEntries(expectedSections.map(name => [name, section(name)]));

expectText(parts.time, C.SLICES, '披薩片數');
expectText(parts.time, C.DAYS, '遊戲天數');
expectText(parts.time, C.STEP_MS / 1000, '每步秒數');
expectText(parts.time, C.SHOP_MS / 1000, '採購秒數');
expectText(parts.time, `$${C.START_MONEY}`, '起始現金');
expectText(parts.time, C.PLAYER_START_VALUE, '玩家起始價值');
expectText(parts.time, C.BOSS_START_VALUE, '魔王起始價值');

for (const tier of [1, 2, 3]) {
  const t = C.TOPPING[tier];
  for (const value of [t.name, `$${t.cost}`, `+$${t.income}`, `+${t.growth}`, `−${t.dmg}`, `結算 ${t.convert} 次`]) {
    expectText(parts.toppings, value, `甜料 ${tier}`);
  }
  expectText(parts.toppings, `$${Math.round(t.cost * C.RUSH_MULT)}`, `甜料 ${tier} 急買價`);
}

for (const tier of [1, 2, 3]) {
  const p = C.SPICY[tier];
  for (const value of [`−$${p.drain}`, `−${p.power}`, `−${p.power - C.CRUST_GROWTH}`, `結算 ${p.convert} 次`]) {
    expectText(parts.spicy, value, `辣椒 ${tier}`);
  }
}
expectText(parts.spicy, C.NOX_CHARGES, 'Nox 每日額度');
expectText(parts.spicy, `$${C.LIFE_CLEAR_COST}`, '生活壓力處理費');

for (const value of C.CRUST_TIERS) expectText(parts.crusts, value, '餅皮價值');
for (const value of C.CRUST_TIERS.map(Core.crustCost)) expectText(parts.crusts, `$${value}`, '餅皮採購價');
expectText(parts.crusts, C.CRUST_COST_BASE, '餅皮價格底價');
expectText(parts.crusts, C.CRUST_COST_PER, '餅皮單位價格');
expectText(parts.crusts, C.RUSH_MULT, '急買倍率');

expectText(parts.economy, `$${C.DAILY_INCOME}`, '每日收入');
expectText(parts.economy, `$${C.START_MONEY}`, '現金功能說明');
expectText(parts.economy, `$${C.LIFE_CLEAR_COST}`, '生活壓力成本');
expectText(parts.economy, `${Math.round((C.RUSH_MULT - 1) * 100)}%`, '急買溢價');

const sourceRules = [
  ['0.05', '突發支出機率'], ['10 + 3 * S.day', '突發支出公式'],
  ['0.04', '生活成本機率'], ['S.upkeep += 5', '生活成本增量'],
  ['0.25', '抽甜料機率'], ['0.3', '辣椒升級機率'],
  ['sl.value < 15', '抽片門檻'], ['0.15', '奪取機率'],
  ['8 + 4 * S.day', '奪取門檻'], ['0.30 + 0.05 * S.day', '撒辣椒公式'],
  ['0.12', '填滿無主機率'], ['rng() < 0.55', '技術摩擦比例']
];
for (const [needle, label] of sourceRules) {
  expectText(source, needle, `${label}（核心）`);
}
for (const value of ['5%', '10 + 3 × 天數', '4%', '+$5', '25%', '30%', '低於 15', '15%', '8 + 4 × 天數', '30% + 5% × 天數', '12%', '55%', '45%']) {
  expectText(parts.boss, value, '魔王規則');
}

for (const value of ['自然增值 +1', '玩家甜料', '魔王辣椒', '先扣現金']) expectText(parts.settlement, value, '結算順序');

expectText(source, 's.playerSlices * 15', '幸福公式（核心）');
expectText(source, 'Math.round(s.money * 0.3)', '現金權重（核心）');
expectText(source, 's.bossSlices * 8', '魔王領地扣分（核心）');
expectText(source, 's.spicy * 3', '辣椒扣分（核心）');
for (const value of ['× 15', '× 0.3', '× 8', '× 3', '7 片以上']) expectText(parts.score, value, '幸福與勝負公式');

// 雙頁版面契約：簡易教學固定一屏，完整公示由左側書籤切換。
for (const value of [
  'id="s-rules"', 'data-viewport-layout="fixed"', 'data-rules-page="disclosure"',
  'id="s-catalog"', 'data-catalog-page="events"',
  'id="btn-open-rules"', 'id="btn-rules-tutorial"', 'id="btn-open-catalog"',
  "['s-start', 's-tutorial', 's-rules', 's-catalog', 's-game', 's-result']"
]) expectText(html, value, '教學與公示分頁');

for (const value of [
  "$('btn-open-rules').addEventListener('click', function () { openManualPage('s-rules'); });",
  "$('btn-open-catalog').addEventListener('click', function () { openManualPage('s-catalog'); });",
  "$('btn-rules-catalog').addEventListener('click', function () { openManualPage('s-catalog'); });",
  "$('btn-catalog-rules').addEventListener('click', function () { openManualPage('s-rules'); });"
]) expectText(html, value, '左側書籤導覽接線');

const activeButtonRule = html.match(/button:active:not\(:disabled\)\s*\{([^}]*)\}/);
if (!activeButtonRule) fail('缺少按鈕按下時的回饋');
else if (/transform\s*:/.test(activeButtonRule[1])) fail('按鈕按下時不得改變位置，否則書籤會跳走並中斷點擊');

const tutorialStart = html.indexOf('<section id="s-tutorial"');
const rulesStart = html.indexOf('<section id="s-rules"');
const catalogStart = html.indexOf('<section id="s-catalog"');
const gameStart = html.indexOf('<!-- ===== 遊戲畫面', rulesStart);
const formulaStart = html.indexOf('<section class="formula-lab"');
if (!(tutorialStart >= 0 && rulesStart > tutorialStart && formulaStart > rulesStart && formulaStart < catalogStart && catalogStart > rulesStart && catalogStart < gameStart)) {
  fail('完整數據與事件圖鑑必須離開簡易教學，放在獨立頁面');
}
const catalogHtml = html.slice(catalogStart, gameStart);
const catalogItems = catalogHtml.match(/<li>/g) || [];
if (catalogItems.length !== 38) fail(`事件圖鑑應收錄 38 個事件概念，目前為 ${catalogItems.length} 個`);
if (!html.includes('#s-tutorial { overflow: hidden;')) fail('簡易教學頁必須固定一屏並禁止捲動');
if (!html.includes('.formula-group[open] .formula-preview { display: none; }')) fail('DATA 展開後必須隱藏簡介');
const previews = html.match(/class="formula-preview"/g) || [];
if (previews.length !== expectedSections.length) fail(`八個 DATA 各需一段收合簡介，目前為 ${previews.length} 段`);
for (const name of expectedSections) expectText(parts[name], 'class="formula-preview"', `${name} 收合簡介`);

for (const value of [
  '留白薄餅', '穩定節奏餅', '自主配置餅', '長期選擇餅',
  '被占用的時段', '固定運轉的日程', '抵押選擇的生活', '替你決定的人生',
  '好好吃完一頓飯', '替共同的未來投下一票', '通勤臨時延誤', '熟人的名字可能是冒充'
]) expectText(html, value, '事件圖鑑內容');

if (!process.exitCode) console.log('OK: 固定一屏教學、左側書籤、獨立公示、事件圖鑑與 8 組正式數值一致');
