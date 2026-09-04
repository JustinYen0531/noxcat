/* NOXCAT 披薩時鐘 — 核心遊戲邏輯（不依賴 DOM，可在 Node 模擬）
 *
 * 位置（每步 t = 0..11，披薩順時針轉）：
 *   北（魔王）= t         東 = (t+9)%12
 *   南（玩家）= (t+6)%12  西（結算）= (t+3)%12
 * 每片依序經過：魔王 → 玩家 → 結算 → 魔王 …
 * 一天 12 步後進入採購階段（phase = 'shop'），再進下一天；第 7 天結束直接結算。
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.PizzaCore = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var CFG = {
    SLICES: 12,
    DAYS: 7,
    STEP_MS: 3000,          // 每片停留時間
    SHOP_MS: 15000,         // 採購階段時間（可提早結束）
    START_MONEY: 100,
    DAILY_INCOME: 70,       // 每天開始的固定收入（第 2 天起）
    NOX_CHARGES: 3,         // Nox 每天可免費處理的技術摩擦次數
    NOX_GIFT_TIER: 1,       // Nox 每天採購階段送的甜料等級
    LIFE_CLEAR_COST: 20,    // 自己花錢處理生活壓力
    RUSH_MULT: 1.25,        // 白天沒庫存時「急買」加價倍率
    CRUST_TIERS: [10, 20, 30, 45],   // 採購階段可買的餅皮價值
    CRUST_COST_BASE: 25, CRUST_COST_PER: 1.5,   // 餅皮價格 = 25 + 1.5 × 價值
    CRUST_GROWTH: 1,        // 餅皮每次結算自然增值
    GONE_STEPS: 12,         // 被魔王抽走的披薩幾步後回來
    TOPPING: {              // convert = 在無主餅皮上結算幾次會變成你的
      1: { name: '小確幸', cost: 10, income: 3, growth: 2, dmg: 4, convert: 3 },
      2: { name: '好習慣', cost: 25, income: 7, growth: 4, dmg: 9, convert: 2 },
      3: { name: '生活自主', cost: 50, income: 15, growth: 8, dmg: 20, convert: 1 }
    },
    SPICY: {                // convert = 在無主餅皮上結算幾次會變成魔王的
      1: { power: 5, drain: 3, convert: 3 },
      2: { power: 9, drain: 5, convert: 2 },
      3: { power: 14, drain: 8, convert: 1 }
    },
    BOSS_START: [4, 5, 6, 7, 8],   // 08:00–16:00 屬於魔王（工作）
    BOSS_START_VALUE: 12,
    PLAYER_START: [11],            // 22:00 是你唯一的自由時間
    PLAYER_START_VALUE: 8
  };

  var SPICY_LABELS = {
    tech: ['Gas 手續費', '跨鏈成本', '駭客風險', '資產轉移摩擦', '錢包簽名失敗'],
    life: ['臨時加班', '突發支出', '主管深夜訊息', '家務責任', '失眠焦慮']
  };
  var NOX_LINES = [
    '技術問題交給我，你只要決定想怎麼過。',
    '快樂的開關一直都在你自己手裡。',
    'Feel Nothing, Do Everything。摩擦我處理，人生你選。',
    '魔王不會消失，但你可以決定哪些時間是你的。',
    '存一點錢，也留一點時間給自己。',
    '你今天的餅皮比昨天厚了一點。'
  ];

  function hourOf(i) { return (i * 2) % 24; }
  function hh(i) { var h = hourOf(i); return (h < 10 ? '0' + h : '' + h) + ':00'; }
  function crustCost(v) { return Math.round(CFG.CRUST_COST_BASE + CFG.CRUST_COST_PER * v); }
  function rush(c) { return Math.round(c * CFG.RUSH_MULT); }

  function createGame(opts) {
    opts = opts || {};
    var rng = opts.rng || Math.random;

    var S = {
      phase: 'play',       // play | shop | result
      day: 1, t: 0, rot: 0,
      money: CFG.START_MONEY,
      nox: CFG.NOX_CHARGES,
      upkeep: 0,           // 每日固定支出（魔王「增加生活成本」事件累積）
      inv: { toppings: { 1: 0, 2: 0, 3: 0 }, crusts: [] },
      slices: [], log: [],
      shopSummary: null, result: null,
      stats: { spent: 0, earned: 0, noxUsed: 0, spicyCleared: 0, spicyPlaced: 0, stolen: 0, seized: 0 }
    };
    for (var i = 0; i < CFG.SLICES; i++) S.slices.push({ i: i, owner: 'none', value: 0, topping: null, progress: 0, goneLeft: 0 });
    CFG.BOSS_START.forEach(function (i) { S.slices[i].owner = 'boss'; S.slices[i].value = CFG.BOSS_START_VALUE; });
    CFG.PLAYER_START.forEach(function (i) { S.slices[i].owner = 'player'; S.slices[i].value = CFG.PLAYER_START_VALUE; });

    function pick(arr) { return arr[Math.floor(rng() * arr.length)]; }
    function log(text, side) { S.log.push({ text: text, side: side || 'sys', day: S.day, t: S.t }); if (S.log.length > 80) S.log.shift(); }
    function pay(n) { S.money -= n; S.stats.spent += n; }
    function earn(n) { S.money += n; S.stats.earned += n; }
    function reset(sl, owner, value) { sl.owner = owner; sl.value = value; sl.progress = 0; }

    function north() { return S.t % 12; }
    function south() { return (S.t + 6) % 12; }
    function west() { return (S.t + 3) % 12; }
    function east() { return (S.t + 9) % 12; }
    function southSlice() { return S.slices[south()]; }

    // ---- 魔王（北方）----
    function bossAct(sl) {
      if (sl.owner === 'gone') return;
      // 改變資源：突發支出
      if (S.day >= 2 && rng() < 0.05) {
        var hit = Math.min(S.money, 10 + 3 * S.day);
        if (hit > 0) { pay(hit); log('魔王：突發支出，你損失了 $' + hit, 'boss'); return; }
      }
      // 增加新的生活成本
      if (S.day >= 3 && rng() < 0.04) {
        S.upkeep += 5;
        log('魔王提高了你的生活成本：每天 −$' + S.upkeep, 'boss');
        return;
      }
      var top = sl.topping;
      if (top && top.side === 'player') {
        if (sl.owner === 'boss' && rng() < 0.25) {
          sl.topping = null;
          log('魔王抽走了 ' + hh(sl.i) + ' 的「' + CFG.TOPPING[top.tier].name + '」', 'boss');
        }
        return; // 有你的甜料的時間，魔王動不了餅皮
      }
      if (top && top.side === 'boss') {
        if (S.day >= 4 && top.tier < 3 && rng() < 0.3) { top.tier += 1; log(hh(sl.i) + ' 的「' + top.label + '」變得更辣了', 'boss'); }
        return;
      }
      // 抽走整片披薩
      if (S.day >= 3 && rng() < 0.05 && (sl.owner === 'none' || (sl.owner === 'player' && sl.value < 15))) {
        reset(sl, 'gone', 0); sl.topping = null; sl.goneLeft = CFG.GONE_STEPS; S.stats.stolen++;
        log('魔王抽走了 ' + hh(sl.i) + ' 這片披薩！明天才會回來', 'boss');
        return;
      }
      // 奪取／替換玩家餅皮（新餅皮價值必須更高）
      if (S.day >= 3 && sl.owner === 'player' && sl.value < 8 + 4 * S.day && rng() < 0.15) {
        reset(sl, 'boss', sl.value + 3); S.stats.seized++;
        log('魔王用更高價值的餅皮換掉了 ' + hh(sl.i) + ' 的生活', 'boss');
        return;
      }
      // 撒辣椒
      if (rng() < 0.30 + 0.05 * S.day) {
        var tier = S.day <= 2 ? 1 : (S.day <= 5 ? 2 : 3);
        var kind = rng() < 0.55 ? 'tech' : 'life';
        sl.topping = { side: 'boss', tier: tier, kind: kind, label: pick(SPICY_LABELS[kind]) };
        S.stats.spicyPlaced++;
        log('魔王在 ' + hh(sl.i) + ' 加了「' + sl.topping.label + '」', 'boss');
        return;
      }
      // 後期：沒人經營的無主時間直接被生活填滿
      if (S.day >= 4 && sl.owner === 'none' && rng() < 0.12) {
        reset(sl, 'boss', CFG.CRUST_TIERS[0]);
        log('魔王直接把 ' + hh(sl.i) + ' 填滿了工作', 'boss');
      }
    }

    // ---- 結算（西方）----
    function settle(sl) {
      if (sl.owner === 'gone') return;
      if (sl.owner !== 'none') sl.value += CFG.CRUST_GROWTH;
      var top = sl.topping;
      if (!top) return;
      if (top.side === 'player') {
        var T = CFG.TOPPING[top.tier];
        if (sl.owner === 'player') { earn(T.income); sl.value += T.growth; }
        else if (sl.owner === 'none') {
          earn(T.income); sl.progress += 1;
          if (sl.progress >= T.convert) { reset(sl, 'player', CFG.CRUST_TIERS[0]); log(hh(sl.i) + ' 變成了你的生活領地！', 'player'); }
        } else {
          sl.value -= T.dmg;
          if (sl.value <= 0) { reset(sl, 'none', 0); sl.topping = null; log(hh(sl.i) + ' 的魔王餅皮崩解，回到無主狀態', 'player'); }
        }
      } else {
        var P = CFG.SPICY[top.tier];
        pay(Math.min(S.money, P.drain));
        if (sl.owner === 'player') {
          sl.value -= P.power;
          if (sl.value <= 0) { reset(sl, 'none', 0); sl.topping = null; log(hh(sl.i) + ' 被壓力侵蝕，失去了這片領地', 'boss'); }
        } else if (sl.owner === 'none') {
          sl.progress -= 1;
          if (sl.progress <= -P.convert) { reset(sl, 'boss', CFG.CRUST_TIERS[0]); log(hh(sl.i) + ' 變成了魔王的辛辣餅皮', 'boss'); }
        } else sl.value += 2;
      }
    }

    function runStepEvents() {
      S.slices.forEach(function (sl) {
        if (sl.owner === 'gone' && --sl.goneLeft <= 0) { reset(sl, 'none', 0); log(hh(sl.i) + ' 回來了，現在是無主狀態', 'sys'); }
      });
      bossAct(S.slices[north()]);
      settle(S.slices[west()]);
    }

    // ---- 流程 ----
    function startDay() {
      S.t = 0; S.nox = CFG.NOX_CHARGES;
      if (S.day > 1) {
        earn(CFG.DAILY_INCOME);
        if (S.upkeep) pay(Math.min(S.money, S.upkeep));
      }
      runStepEvents();
    }
    function nextStep() {
      if (S.phase !== 'play') return { changed: false };
      S.t += 1;
      if (S.t >= CFG.SLICES) {
        S.t = CFG.SLICES - 1;
        if (S.day >= CFG.DAYS) { S.phase = 'result'; S.result = computeResult(); return { gameOver: true }; }
        S.phase = 'shop';
        S.shopSummary = summary();
        S.shopSummary.noxLine = NOX_LINES[(S.day - 1) % NOX_LINES.length];
        S.inv.toppings[CFG.NOX_GIFT_TIER] += 1;
        log('Nox 替你做了一份「' + CFG.TOPPING[CFG.NOX_GIFT_TIER].name + '」甜料', 'nox');
        return { dayEnded: true };
      }
      S.rot += 30;
      runStepEvents();
      return { changed: true };
    }
    function continueDay() {
      if (S.phase !== 'shop') return;
      S.day += 1; S.rot += 30; S.phase = 'play';
      startDay();
    }

    function summary() {
      var p = 0, b = 0, n = 0, gone = 0, pv = 0, bv = 0, spicy = 0;
      S.slices.forEach(function (sl) {
        if (sl.owner === 'player') { p++; pv += sl.value; }
        else if (sl.owner === 'boss') { b++; bv += sl.value; }
        else if (sl.owner === 'gone') gone++;
        else n++;
        if (sl.topping && sl.topping.side === 'boss') spicy++;
      });
      return { day: S.day, playerSlices: p, bossSlices: b, neutral: n, gone: gone, playerValue: pv, bossValue: bv, money: S.money, spicy: spicy, upkeep: S.upkeep };
    }
    function computeResult() {
      var s = summary();
      s.happiness = s.playerSlices * 15 + s.playerValue + Math.round(s.money * 0.3) - s.bossSlices * 8 - s.spicy * 3;
      s.verdict = s.playerSlices >= 7 ? 'great' : (s.playerSlices > s.bossSlices ? 'win' : 'lose');
      s.stats = S.stats;
      return s;
    }

    // ---- 採購階段 ----
    function canBuyTopping(tier) { return S.phase === 'shop' && S.money >= CFG.TOPPING[tier].cost; }
    function buyTopping(tier) {
      if (!canBuyTopping(tier)) return false;
      pay(CFG.TOPPING[tier].cost); S.inv.toppings[tier] += 1; return true;
    }
    function canBuyCrust(v) { return S.phase === 'shop' && S.money >= crustCost(v); }
    function buyCrust(v) {
      if (!canBuyCrust(v)) return false;
      pay(crustCost(v)); S.inv.crusts.push(v); S.inv.crusts.sort(function (a, b) { return a - b; }); return true;
    }

    // ---- 白天操作（只能對南方切片）----
    function toppingPlan(tier) {
      var stock = S.inv.toppings[tier];
      return { stock: stock, rushCost: rush(CFG.TOPPING[tier].cost) };
    }
    function canTopping(tier) {
      var sl = southSlice();
      if (S.phase !== 'play' || sl.owner === 'gone') return false;
      if (sl.topping && (sl.topping.side === 'boss' || sl.topping.tier >= tier)) return false;
      var p = toppingPlan(tier);
      return p.stock > 0 || S.money >= p.rushCost;
    }
    function addTopping(tier) {
      if (!canTopping(tier)) return false;
      var sl = southSlice(), p = toppingPlan(tier);
      if (p.stock > 0) S.inv.toppings[tier] -= 1; else pay(p.rushCost);
      sl.topping = { side: 'player', tier: tier };
      log('你在 ' + hh(sl.i) + ' 加了「' + CFG.TOPPING[tier].name + '」' + (p.stock > 0 ? '' : '（急買）'), 'player');
      return true;
    }

    function clearInfo() {
      var sl = southSlice();
      if (!sl.topping || sl.topping.side !== 'boss') return { ok: false, reason: 'none' };
      if (sl.topping.kind === 'tech') return S.nox > 0 ? { ok: true, free: true } : { ok: false, reason: 'nox' };
      return S.money >= CFG.LIFE_CLEAR_COST ? { ok: true, free: false, cost: CFG.LIFE_CLEAR_COST } : { ok: false, reason: 'money' };
    }
    function clearSpicy() {
      if (S.phase !== 'play') return false;
      var info = clearInfo(); if (!info.ok) return false;
      var sl = southSlice();
      if (info.free) { S.nox -= 1; S.stats.noxUsed++; log('Nox 替你處理了「' + sl.topping.label + '」', 'nox'); }
      else { pay(info.cost); log('你花了 $' + info.cost + ' 處理「' + sl.topping.label + '」', 'player'); }
      sl.topping = null; S.stats.spicyCleared++;
      return true;
    }

    // 餅皮：優先用庫存裡「剛好夠高」的那片；沒有就急買剛好需要的價值
    function crustPlan(sl) {
      sl = sl || southSlice();
      if (sl.owner === 'gone') return { ok: false };
      var need = sl.owner === 'none' ? CFG.CRUST_TIERS[0] : sl.owner === 'boss' ? sl.value + 5 : sl.value + 8;
      var minOk = sl.owner === 'none' ? 1 : sl.value + 1;
      for (var k = 0; k < S.inv.crusts.length; k++) {
        if (S.inv.crusts[k] >= minOk) return { ok: true, fromStock: true, idx: k, value: S.inv.crusts[k], cost: 0 };
      }
      var cost = rush(crustCost(need));
      return { ok: S.money >= cost, fromStock: false, value: need, cost: cost };
    }
    function canCrust() { return S.phase === 'play' && crustPlan().ok; }
    function buildCrust() {
      if (!canCrust()) return false;
      var sl = southSlice(), p = crustPlan(sl);
      if (p.fromStock) S.inv.crusts.splice(p.idx, 1); else pay(p.cost);
      var was = sl.owner;
      reset(sl, 'player', p.value);
      log((was === 'boss' ? '你從魔王手中奪回了 ' : was === 'player' ? '你換上更好的餅皮，強化了 ' : '你把自己的生活放進了 ') + hh(sl.i) + '（價值 ' + p.value + '）', 'player');
      return true;
    }

    function canSell() { return S.phase === 'play' && southSlice().owner === 'player'; }
    function sellCrust() {
      if (!canSell()) return false;
      var sl = southSlice(), v = sl.value;
      earn(v); reset(sl, 'none', 0);
      log('你賣掉了 ' + hh(sl.i) + ' 的生活（+$' + v + '）', 'player');
      return true;
    }

    startDay();
    log('魔王：「來看看沒有我的話，你有什麼能耐吧。」', 'boss');

    return {
      S: S, CFG: CFG, hh: hh, hourOf: hourOf, crustCost: crustCost,
      north: north, south: south, west: west, east: east, southSlice: southSlice,
      nextStep: nextStep, continueDay: continueDay, summary: summary,
      canBuyTopping: canBuyTopping, buyTopping: buyTopping, canBuyCrust: canBuyCrust, buyCrust: buyCrust,
      toppingPlan: toppingPlan, canTopping: canTopping, addTopping: addTopping,
      clearInfo: clearInfo, clearSpicy: clearSpicy,
      crustPlan: crustPlan, canCrust: canCrust, buildCrust: buildCrust,
      canSell: canSell, sellCrust: sellCrust
    };
  }

  return { CFG: CFG, createGame: createGame, hh: hh, crustCost: crustCost };
});
