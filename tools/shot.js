/* 用 headless Chrome 截圖或傾印 DOM，方便沒有手機時檢查畫面。
 * 用法：node tools/shot.js <screenshot|dom> <query> <width> <height> <virtualTimeMs> <outFile>
 * 例：node tools/shot.js screenshot "?autostart=1" 390 844 6000 out/game.png
 */
var path = require('path'), fs = require('fs'), os = require('os');
var cp = require('child_process');

var mode = process.argv[2] || 'screenshot';
var query = process.argv[3] || '';
var w = process.argv[4] || '390', h = process.argv[5] || '844';
var budget = process.argv[6] || '5000';
var out = process.argv[7] || ('out/' + mode + '.png');

var chrome = ['C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].filter(function (p) { return fs.existsSync(p); })[0];
if (!chrome) { console.error('no chrome/edge found'); process.exit(1); }

var useFrame = process.argv[8] === 'frame'; // 用 iframe 模擬真實手機寬度（headless 視窗最小約 500px）
var index = path.resolve(__dirname, '..', 'index.html');
var url = 'file:///' + encodeURI(index.replace(/\\/g, '/')) + query;
if (useFrame) {
  var frame = path.resolve(__dirname, 'frame.html');
  url = 'file:///' + encodeURI(frame.replace(/\\/g, '/')) + '?w=' + w + '&h=' + h + '&q=' + encodeURIComponent(query);
}
var profile = fs.mkdtempSync(path.join(os.tmpdir(), 'pz-'));
fs.mkdirSync(path.dirname(path.resolve(out)), { recursive: true });

var winW = useFrame ? Math.max(520, +w) : w, winH = useFrame ? +h : h;
var args = ['--headless=new', '--disable-gpu', '--no-first-run', '--hide-scrollbars',
  '--user-data-dir=' + profile, '--window-size=' + winW + ',' + winH, '--virtual-time-budget=' + budget];
if (mode === 'screenshot') args.push('--screenshot=' + path.resolve(out));
else args.push('--dump-dom');
args.push(url);

var r = cp.spawnSync(chrome, args, { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 });
if (mode === 'dom') {
  fs.writeFileSync(out, r.stdout);
  var m = r.stdout.match(/<div id="err" hidden="">([\s\S]*?)<\/div>/);
  var errs = m ? m[1].trim() : '';
  console.log('dom saved:', out, '| JS errors:', errs ? '\n' + errs : 'none');
} else {
  console.log('screenshot saved:', out, r.status === 0 ? '' : ('(exit ' + r.status + ')'));
}
try { fs.rmSync(profile, { recursive: true, force: true }); } catch (e) {}
