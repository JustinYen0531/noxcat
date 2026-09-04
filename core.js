/* NOXCAT 披薩時鐘 — 核心遊戲邏輯（不依賴 DOM，可在 Node 模擬）
 *
 * 位置定義（每步 t = 0..11，披薩順時針轉）：
 *   北（魔王）= t         東 = (t+9)%12
 *   南（玩家）= (t+6)%12  西（結算）= (t+3)%12
 * 每片披薩依序經過：魔王 → 玩家 → 結算 → 魔王 …
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.PizzaCore = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var CFG = {
    SLICES: 12,
    DAYS: 7,
    STEP_MS: 3200,          // 每片停留時間
    DAY_END_MS: 6000,       // 每日結算畫面自動繼續時間
    START_MONEY: 100,
    DAILY_INCOME: 70,       // 每天開始的固定收入（第 2 天起）
    NOX_CHARGES: 3,         // Nox 每天可免費處理的技術摩擦次數
    LIFE_CLEAR_COST: 20,    // 自己花錢處理生活壓力
    CRUST_BASE_COST: 40,    // 改造無主餅皮
    CRUST_BASE_VALUE: 10,
    CRUST_TAKEOVER_MULT: 2, // 奪取魔王餅皮：40 + 2 × 價值
    CRUST_UPGRADE_COST: 20, // 強化自家餅皮
    CRUST_UPGRADE_VALUE: 8,
    CONVERT_STEPS: 2,       // 調料在無主餅皮上結算幾次後改變餅皮
    CRUST_GROWTH: 1,        // 餅皮每次結算自然增值
    TOPPING: {
      1: { name: '小確幸', cost: 10, income: 3, growth: 2, dmg: 4 },
      2: { name: '好習慣', cost: 25, income: 7, growth: 4, dmg: 9 },
      3: { name: '生活自主', cost: 50, income: 15, growth: 8, dmg: 20 }
    },
    SPICY: {
      1: { power: 5, drain: 3 },
      2: { power: 9, drain: 5 },
      3: { power: 14, drain: 8 }
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

  function createGame(opts) {
    opts = opts || {};
    var rng = opts.rng || Math.random;

    var S = {
      phase: 'play',       // play | dayend | result
      day: 1,
      t: 0,
      rot: 0,              // 累計旋轉角度（度）
      money: CFG.START_MONEY,
      nox: CFG.NOX_CHARGES,
      slices: [],
      log: [],
      daySummary: null,
      result: null,
      stats: { spent: 0, earned: 0, noxUsed: 0, spicyCleared: 0, spicyPlaced: 0 }
    };

    for (var i = 0; i < CFG.SLICES; i++) {
      S.slices.push({ i: i, owner: 'none', value: 0, topping: null, progress: 0 });
    }
    CFG.BOSS_START.forEach(function (i) { S.slices[i].owner = 'boss'; S.slices[i].value = CFG.BOSS_START_VALUE; });
    CFG.PLAYER_START.forEach(function (i) { S.slices[i].owner = 'player'; S.slices[i].value = CFG.PLAYER_START_VALUE; });

    function pick(arr) { return arr[Math.floor(rng() * arr.length)]; }
    function log(text, side) {
      S.log.push({ text: text, side: side || 'sys', day: S.day, t: S.t });
      if (S.log.length > 60) S.log.shift();
    }

    // ---- 位置 ----
    function north() { return S.t % 12; }
    function south() { return (S.t + 6) % 12; }
    function west() { return (S.t + 3) % 12; }
    function east() { return (S.t + 9) % 12; }
    function southSlice() { return S.slices[south()]; }

    // ---- 魔王 AI（北方）----
    function bossAct(sl) {
      var top = sl.topping;
      if (top && top.side === 'player') {
        // 魔王餅皮上的玩家調料：有機會被抽走
        if (sl.owner === 'boss' && rng() < 0.25) {
          sl.topping = null;
          log('魔王抽走了 ' + hh(sl.i) + ' 的「' + CFG.TOPPING[top.tier].name + '」', 'boss');
        }
        return;
      }
      if (top && top.side === 'boss') {
        if (S.day >= 4 && top.tier < 3 && rng() < 0.3) {
          top.tier += 1;
          log(hh(sl.i) + ' 的「' + top.label + '」變得更辣了', 'boss');
        }
        return;
      }
      var p = 0.30 + 0.04 * S.day;
      if (rng() < p) {
        var tier = S.day <= 2 ? 1 : (S.day <= 5 ? 2 : 3);
        var kind = rng() < 0.55 ? 'tech' : 'life';
        sl.topping = { side: 'boss', tier: tier, kind: kind, label: pick(SPICY_LABELS[kind]) };
        S.stats.spicyPlaced++;
        log('魔王在 ' + hh(sl.i) + ' 加了「' + sl.topping.label + '」', 'boss');
      }
    }

    // ---- 結算（西方）----
    function settle(sl) {
      if (sl.owner !== 'none') sl.value += CFG.CRUST_GROWTH;
      var top = sl.topping;
      if (!top) return;

      if (top.side === 'player') {
        var T = CFG.TOPPING[top.tier];
        if (sl.owner === 'player') {
          S.money += T.income; S.stats.earned += T.income;
          sl.value += T.growth;
        } else if (sl.owner === 'none') {
          S.money += T.income; S.stats.earned += T.income;
          sl.progress += 1;
          if (sl.progress >= CFG.CONVERT_STEPS) {
            sl.owner = 'player'; sl.value = CFG.CRUST_BASE_VALUE; sl.progress = 0;
            log(hh(sl.i) + ' 變成了你的生活領地！', 'player');
          }
        } else { // boss crust
          sl.value -= T.dmg;
          if (sl.value <= 0) {
            sl.owner = 'none'; sl.value = 0; sl.progress = 0; sl.topping = null;
            log(hh(sl.i) + ' 的魔王餅皮崩解，回到無主狀態', 'player');
          }
        }
      } else {
        var P = CFG.SPICY[top.tier];
        var drain = Math.min(S.money, P.drain);
        S.money -= drain; S.stats.spent += drain;
        if (sl.owner === 'player') {
          sl.value -= P.power;
          if (sl.value <= 0) {
            sl.owner = 'none'; sl.value = 0; sl.progress = 0; sl.topping = null;
            log(hh(sl.i) + ' 被壓力侵蝕，失去了這片領地', 'boss');
          }
        } else if (sl.owner === 'none') {
          sl.progress -= 1;
          if (sl.progress <= -CFG.CONVERT_STEPS) {
            sl.owner = 'boss'; sl.value = CFG.CRUST_BASE_VALUE; sl.progress = 0;
            log(hh(sl.i) + ' 變成了魔王的辛辣餅皮', 'boss');
          }
        } else {
          sl.value += 2;
        }
      }
    }

    function runStepEvents() {
      bossAct(S.slices[north()]);
      settle(S.slices[west()]);
    }

    // ---- 流程 ----
    function startDay() {
      S.t = 0;
      S.nox = CFG.NOX_CHARGES;
      if (S.day > 1) { S.money += CFG.DAILY_INCOME; S.stats.earned += CFG.DAILY_INCOME; }
      runStepEvents();
    }

    function nextStep() {
      if (S.phase !== 'play') return { changed: false };
      S.t += 1;
      if (S.t >= CFG.SLICES) {
        S.t = CFG.SLICES - 1;
        S.phase = 'dayend';
        S.daySummary = summary();
        S.daySummary.noxLine = NOX_LINES[(S.day - 1) % NOX_LINES.length];
        return { dayEnded: true };
      }
      S.rot += 30;
      runStepEvents();
      return { changed: true };
    }

    function continueDay() {
      if (S.phase !== 'dayend') return;
      if (S.day >= CFG.DAYS) {
        S.phase = 'result';
        S.result = computeResult();
        return;
      }
      S.day += 1;
      S.rot += 30;
      S.phase = 'play';
      startDay();
    }

    function summary() {
      var p = 0, b = 0, n = 0, pv = 0, bv = 0, spicy = 0;
      S.slices.forEach(function (sl) {
        if (sl.owner === 'player') { p++; pv += sl.value; }
        else if (sl.owner === 'boss') { b++; bv += sl.value; }
        else n++;
        if (sl.topping && sl.topping.side === 'boss') spicy++;
      });
      return { day: S.day, playerSlices: p, bossSlices: b, neutral: n, playerValue: pv, bossValue: bv, money: S.money, spicy: spicy };
    }

    function computeResult() {
      var s = summary();
      s.happiness = s.playerSlices * 15 + s.playerValue + Math.round(s.money * 0.3) - s.bossSlices * 8 - s.spicy * 3;
      if (s.playerSlices >= 7) s.verdict = 'great';
      else if (s.playerSlices > s.bossSlices) s.verdict = 'win';
      else s.verdict = 'lose';
      s.stats = S.stats;
      return s;
    }

    // ---- 玩家操作（只能對南方切片）----
    function costCrust(sl) {
      if (sl.owner === 'none') return CFG.CRUST_BASE_COST;
      if (sl.owner === 'boss') return CFG.CRUST_BASE_COST + CFG.CRUST_TAKEOVER_MULT * sl.value;
      return CFG.CRUST_UPGRADE_COST;
    }

    function canTopping(tier) {
      var sl = southSlice();
      if (S.phase !== 'play') return false;
      if (S.money < CFG.TOPPING[tier].cost) return false;
      if (!sl.topping) return true;
      if (sl.topping.side === 'boss') return false;
      return sl.topping.tier < tier;
    }
    function addTopping(tier) {
      if (!canTopping(tier)) return false;
      var sl = southSlice();
      S.money -= CFG.TOPPING[tier].cost; S.stats.spent += CFG.TOPPING[tier].cost;
      sl.topping = { side: 'player', tier: tier };
      log('你在 ' + hh(sl.i) + ' 加了「' + CFG.TOPPING[tier].name + '」', 'player');
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
      var info = clearInfo();
      if (!info.ok) return false;
      var sl = southSlice();
      if (info.free) { S.nox -= 1; S.stats.noxUsed++; log('Nox 替你處理了「' + sl.topping.label + '」', 'nox'); }
      else { S.money -= info.cost; S.stats.spent += info.cost; log('你花了 $' + info.cost + ' 處理「' + sl.topping.label + '」', 'player'); }
      sl.topping = null; S.stats.spicyCleared++;
      return true;
    }

    function canCrust() {
      if (S.phase !== 'play') return false;
      return S.money >= costCrust(southSlice());
    }
    function buildCrust() {
      if (!canCrust()) return false;
      var sl = southSlice();
      var cost = costCrust(sl);
      S.money -= cost; S.stats.spent += cost;
      if (sl.owner === 'player') {
        sl.value += CFG.CRUST_UPGRADE_VALUE;
        log('你強化了 ' + hh(sl.i) + ' 的餅皮（+' + CFG.CRUST_UPGRADE_VALUE + '）', 'player');
      } else {
        var wasBoss = sl.owner === 'boss';
        sl.value = wasBoss ? sl.value + 5 : CFG.CRUST_BASE_VALUE;
        sl.owner = 'player'; sl.progress = 0;
        log(wasBoss ? '你從魔王手中奪回了 ' + hh(sl.i) : '你把 ' + hh(sl.i) + ' 改造成自己的生活', 'player');
      }
      return true;
    }

    function canSell() { return S.phase === 'play' && southSlice().owner === 'player'; }
    function sellCrust() {
      if (!canSell()) return false;
      var sl = southSlice();
      var v = sl.value;
      S.money += v; S.stats.earned += v;
      sl.owner = 'none'; sl.value = 0; sl.progress = 0;
      log('你賣掉了 ' + hh(sl.i) + ' 的生活（+$' + v + '）', 'player');
      return true;
    }

    // 初始化第一天
    startDay();
    log('魔王：「來看看沒有我的話，你有什麼能耐吧。」', 'boss');

    return {
      S: S, CFG: CFG, hh: hh, hourOf: hourOf,
      north: north, south: south, west: west, east: east, southSlice: southSlice,
      nextStep: nextStep, continueDay: continueDay, summary: summary,
      canTopping: canTopping, addTopping: addTopping,
      clearInfo: clearInfo, clearSpicy: clearSpicy,
      costCrust: costCrust, canCrust: canCrust, buildCrust: buildCrust,
      canSell: canSell, sellCrust: sellCrust
    };
  }

  return { CFG: CFG, createGame: createGame, hh: hh };
});
