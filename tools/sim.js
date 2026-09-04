/* 模擬整局遊戲，檢查流程能跑完、數值大致合理。
 * 用法：node tools/sim.js [runs]
 */
var Core = require('../core.js');

function mulberry32(a) {
  return function () {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    var t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

var strategies = {
  idle: function () {},
  // 模擬「反應不及」的人類：每片只有 55% 機率來得及操作，且只用簡單直覺
  human: function (g, r) {
    if (r() > 0.55) return;
    var sl = g.southSlice();
    if (sl.topping && sl.topping.side === 'boss') { if (g.clearInfo().ok) g.clearSpicy(); return; }
    if (sl.owner === 'none' && g.canCrust() && g.S.money > 80) { g.buildCrust(); return; }
    if (!sl.topping && g.canTopping(1)) g.addTopping(1);
  },
  cautious: function (g) {
    var sl = g.southSlice();
    if (sl.topping && sl.topping.side === 'boss' && g.clearInfo().ok && g.clearInfo().free) g.clearSpicy();
    else if (sl.owner === 'player' && !sl.topping && g.canTopping(1)) g.addTopping(1);
  },
  greedy: function (g) {
    var sl = g.southSlice();
    var ci = g.clearInfo();
    if (sl.topping && sl.topping.side === 'boss') { if (ci.ok) g.clearSpicy(); return; }
    if (sl.owner === 'none' && g.canCrust() && g.S.money > 60) { g.buildCrust(); return; }
    if (sl.owner === 'boss' && !sl.topping) { if (g.canTopping(2)) g.addTopping(2); else if (g.canTopping(1)) g.addTopping(1); return; }
    if (sl.owner === 'player' && !sl.topping) { if (g.canTopping(2) && g.S.money > 50) g.addTopping(2); else if (g.canTopping(1)) g.addTopping(1); return; }
    if (sl.owner === 'none' && !sl.topping && g.canTopping(1)) g.addTopping(1);
  }
};

function runOne(strategy, seed) {
  var g = Core.createGame({ rng: mulberry32(seed) });
  var botRng = mulberry32(seed + 100000);
  var guard = 0;
  while (g.S.phase !== 'result' && guard++ < 10000) {
    if (g.S.phase === 'play') {
      strategy(g, botRng);
      var r = g.nextStep();
      if (r.dayEnded) g.continueDay();
    } else if (g.S.phase === 'dayend') {
      g.continueDay();
    }
  }
  if (g.S.phase !== 'result') throw new Error('game did not finish');
  return g.S.result;
}

var runs = parseInt(process.argv[2] || '200', 10);
Object.keys(strategies).forEach(function (name) {
  var agg = { great: 0, win: 0, lose: 0, ps: 0, bs: 0, money: 0, happy: 0, pv: 0 };
  for (var s = 1; s <= runs; s++) {
    var r = runOne(strategies[name], s);
    agg[r.verdict]++;
    agg.ps += r.playerSlices; agg.bs += r.bossSlices; agg.money += r.money; agg.happy += r.happiness; agg.pv += r.playerValue;
  }
  console.log(
    name.padEnd(9),
    'great', (100 * agg.great / runs).toFixed(0) + '%',
    'win', (100 * agg.win / runs).toFixed(0) + '%',
    'lose', (100 * agg.lose / runs).toFixed(0) + '%',
    '| avg slices you/boss', (agg.ps / runs).toFixed(1) + '/' + (agg.bs / runs).toFixed(1),
    'value', (agg.pv / runs).toFixed(0),
    'money', (agg.money / runs).toFixed(0),
    'happy', (agg.happy / runs).toFixed(0)
  );
});
console.log('OK: all games finished (', runs, 'runs × 3 strategies )');
