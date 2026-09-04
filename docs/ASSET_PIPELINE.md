# 資產生成流程（Meowa game-assets skill）

搭配 `ASSET_SPEC.md` 使用。**規格看 SPEC，實際指令看這份。**

狀態：指令與參數已對照 runner v2026.09.03.1 的 `--help` 確認；**尚未實際生成過**（缺 API key）。

---

## 0. 一次性設定

### 0.1 建立並設定 API key（只有你能做）

1. 到 https://meowa.ai/#/api-keys 建立 key（`ma_live_` 開頭）。
2. 在專案根目錄 `C:\Users\閻星澄\Desktop\NOX CAT` 建立 `.env`，內容一行：

```dotenv
MEOWART_API_KEY="ma_live_你的key"
```

`.env` 已加進 `.gitignore`，不會進版控。**不要把 key 貼到對話、指令參數或截圖裡。**

或只設定當前 PowerShell 工作階段（關掉視窗就失效）：

```powershell
$env:MEOWART_API_KEY = "ma_live_你的key"
```

### 0.2 驗證

```bash
python .agents/skills/game-assets/meowart_api.py credits-balance
```

看到餘額就成功。`total_credits` 是總可用積分。

### 0.3 環境現況

| 項目 | 狀態 |
| --- | --- |
| Python | 3.11.15（用 `python`，不是 `python3`） |
| requests / Pillow | 已安裝（2.33.0 / 12.2.0） |
| runner 版本 | 2026.09.03.1 |
| 安全掃描 | Gen Safe、Socket 0 alerts、Snyk Low Risk |
| 認證 | **未設定** |

---

## 1. 用哪一份 Prompt

`ASSET_SPEC.md` 每個資產都有兩份提示詞，**兩份都保留**：

| 版本 | 用途 |
| --- | --- |
| **Prompt A（自然語言）** | **這條流程用這份。** Meowa 禁止關鍵字堆疊 |
| **Prompt B（關鍵字堆疊）** | 規格保存格式；改用 Midjourney、SD 等其他工具時用這份 |

下面說明的是 A 為什麼長那樣。這個 skill 明確禁止傳統 diffusion 式 prompt，關鍵字堆疊會干擾模型判讀、降低一致性。

| 舊寫法（棄用） | 新寫法 |
| --- | --- |
| 長關鍵字串接、重複品質詞 | 一到三句自然語言 |
| 獨立的 `Negative:` 區塊 | 沒有負面 prompt；用正面描述說清楚要什麼 |
| `masterpiece, 8k, highly detailed` | 不寫 |
| 用文字重複描述角色來鎖定一致性 | 用 `--reference-image` 鎖定 |
| 相機、採樣器術語 | 只在真的影響畫面時寫視角 |

原則：**先寫最短的 prompt，看結果，再一次只加一個必要限制。**

一致性改由參考圖負責，不由文字負責。`nano-banana-run`、`image-edit-run`、`one-click-upgrade-run` 都吃 `--reference-image`，最多 8 張。

---

## 2. 錨定資產優先（Anchor-first）

先做三張「錨」，之後所有圖都拿它們當 `--reference-image`，風格才不會散：

| 錨 | 資產 | 決定了什麼 |
| --- | --- | --- |
| A1 | P-01 盤面基底 | 材質質感、線條粗細、金屬與霧面的比例 |
| A2 | C-01 魔王 | 角色畫法、發光強度、崩解碎片的樣子 |
| A3 | U-01 面板框 | UI 語言、框線密度 |

**A1、A2 產出後先給你看，你點頭才往下做。** 錨定錯了後面全部要重來。

魔王的 OVERLORD 設定圖也要當參考圖傳進去（放 `assets/_ref/overlord.png`）。

---

## 3. 指令對照表

| 資產類別 | 指令 | 關鍵參數 |
| --- | --- | --- |
| 背景、場景、盤面、角色 | `nano-banana-run` | `--resolution 2K` `--aspect-ratio` `--reference-image` |
| UI 框、按鈕、圖示集 | `ui-gen-run` | `--remove-background` `--split-components` `--background-color` |
| 魔王表情組、Nox 狀態組 | `one-click-upgrade-run` | `--reference-image` + 最多 8 個 `--variant-prompt` |
| 單張精修 | `image-edit-run` | `--reference-image` `--prompt` |
| 補去背 | `remove-background-run` | `--image-file` `--mode hd` |
| 動畫 | `animate-run` / `meowa-animation-run` | 先定稿靜態圖再做 |
| 音效／音樂 | `sound-run` / `music-run` | 最後階段 |

比例對應：E-02 遠景長條用 `--aspect-ratio 21:9` 或 `4:1`；扇形與盤面用 `1:1`；魔王用 `1:1`；軌道用 `16:9`。

---

## 4. 逐批指令（複製即用）

每個指令都給新的 `--output-dir`。產出先落在 `assets/_raw/`（不進版控），挑選過的成品才複製到 `assets/<類別>/`。

### 第一批 · 錨定（先跑這兩個，等我確認）

```bash
python .agents/skills/game-assets/meowart_api.py nano-banana-run \
  --output-dir assets/_raw/p01-wheel \
  --resolution 2K --aspect-ratio 1:1 \
  --prompt "A top-down view of a circular game wheel shaped like a clean geometric pizza. A dark matte metal outer rim with twelve slots and small tick marks like a roulette wheel, and a pale bone-colored inner disc divided into twelve equal wedges by thin lines. Clean and geometric, no toppings, no cheese. Dark background."
```

```bash
python .agents/skills/game-assets/meowart_api.py nano-banana-run \
  --output-dir assets/_raw/c01-boss \
  --resolution 2K --aspect-ratio 1:1 \
  --reference-image assets/_ref/overlord.png \
  --prompt "A giant black cat demon seen from the waist up, his lower body dissolving into a black hole below him. He rests one palm on the edge of a floating table and holds a long spear upright in the other hand, outside the table. Tall pointed ears, a crown of jagged spikes, a tattered cape, a red glowing gem on the chest, narrow red glowing eyes. His body is matte black with thin green glowing seams, and the edges break apart into small fragments. Calm and dominant, looking slightly down."
```

### 第二批 · 披薩機制層（錨定通過後）

盤緣底座、指針、扇形、圖騰，全部帶 `--reference-image assets/pizza/P-01.png`。

```bash
# P-02 玩家餅皮扇形
python .agents/skills/game-assets/meowart_api.py nano-banana-run \
  --output-dir assets/_raw/p02-player --resolution 2K --aspect-ratio 1:1 \
  --reference-image assets/pizza/P-01.png \
  --prompt "A single pie wedge pointing straight up, filled with translucent blue, a bright blue edge line, matching the style of the reference wheel. Everything outside the wedge is empty black."
```

魔王版把 blue 換 red、玩家版與魔王版各一次。調料圖騰六張同理，描述改成節點網／裂紋，並寫明「只佔扇形外側的環帶，中間留空」。

### 第三批 · 角色狀態組（一次八個變體）

魔王七個表情用**一個指令**產出，共用 C-01 當參考：

```bash
python .agents/skills/game-assets/meowart_api.py one-click-upgrade-run \
  --output-dir assets/_raw/boss-faces \
  --mode hd --resolution 2K --remove-bg-method advanced \
  --reference-image assets/char/C-01-boss.png \
  --variant-prompt "same character, thinking, eyes half closed, head slightly tilted" \
  --variant-prompt "same character, staring straight at the viewer, pupils narrowed" \
  --variant-prompt "same character, smug, mouth curved up, chin lifted" \
  --variant-prompt "same character, displeased, brow low, ears folded back" \
  --variant-prompt "same character, surprised, eyes wide, ears straight up" \
  --variant-prompt "same character, furious, eyes blazing, seams glowing red" \
  --variant-prompt "same character, mocking, one eye closed, crooked grin"
```

Nox 八個狀態同樣一個指令，參考圖用 C-20，`--variant-prompt` 寫「同一隻貓，擔心／打字／舉大拇指…」。

### 第四批 · UI（自動去背 + 元件切分）

```bash
python .agents/skills/game-assets/meowart_api.py ui-gen-run \
  --output-dir assets/_raw/ui-icons \
  --resolution 2K --aspect-ratio 1:1 --quality detailed \
  --remove-background --split-components --remove-bg-method advanced \
  --prompt "A set of eight simple white line icons for a sci-fi game HUD: a moon phase, a pointer needle, a diamond coin, a three-cell energy bar, stacked pie wedges, a twelve-segment ring, a downward arrow with a chain link, and a stack of cubes. Even spacing on a grid, matching stroke weight."
```

`--split-components` 會回傳元件切分資料，圖示不用自己切。

### 第五批 · 環境

背景、遠景、軌道、黑洞用 `nano-banana-run`，比例分別 `16:9`、`21:9`、`16:9`、`1:1`。

---

## 5. 每次生成後必做

1. 打開 `final_outputs.json` 確認實際尺寸與 alpha。
2. **在遊戲實際尺寸下檢視**，不要只看大圖。披薩在手機上只有約 300px，盤面刻度可能糊掉。
3. 通過的才複製進 `assets/<類別>/`，用 SPEC 的 ID 命名（`P-01-wheel.png`）。
4. `assets/_raw/` 不進版控，成品進。

## 6. 中斷復原

指令付費後若中途斷掉，**不要重跑**，用對應的 `*-poll` 加原本的 job id：

```bash
python .agents/skills/game-assets/meowart_api.py nano-banana-poll --job-id <原job id> --output-dir <同一個目錄>
```

`nano-banana-poll`、`image-2-poll`、`ui-gen-poll`、`hd-gen-poll`、`animate-poll` 等都只輪詢原任務，不會重複扣款。

## 7. 成本控制

- 先用 `--quality standard` 或 `--generation-speed fast` 試 prompt，定案後才用 `detailed` / `ultimate` 重跑。
- 迭代 prompt 時**先關去背**（`--remove-bg-method none`），滿意的那張再單獨跑 `remove-background-run`，避免替丟棄的圖付去背費。
- 表情、變體一律用 `one-click-upgrade-run` 批次，不要一張一張下指令。
