# NOXCAT 披薩時鐘 — 遊戲視覺資產需求文件（Asset Specification）

版本：2026-09-04 v2 ｜ 對應程式版本：v0.6（橫向）
Visual Theme：**Cyber Hell Ruins** ｜ Art Style：**全息線框呈現（方案 2）× 厚塗暗黑科幻材質（方案 3）**

> 本文件用途：盤點所有要正式生成的資產，並給每一項足夠的規格與 Prompt。

## 兩套 Prompt，都保留

每項資產提供兩種寫法，依工具選用：

| 版本 | 標記 | 用在哪 |
| --- | --- | --- |
| **A. 自然語言** | `Prompt A` | **Meowa `game-assets` skill**。該工具禁止關鍵字堆疊與 Negative 區塊，只吃簡短自然語言，一致性靠 `--reference-image` |
| **B. 關鍵字堆疊** | `Prompt B` | Midjourney、Stable Diffusion、其他 diffusion 工具；也是本文件的**規格保存格式**，把美術要求寫死 |

兩者描述同一張圖。A 是精簡執行版，B 是完整規格版。修改設計時**兩份都要更新**，以免日後不同步。
實際指令與參數見 **`ASSET_PIPELINE.md`**。

---

## 0. 全域規則 — 即 D. Prompt Consistency Rules

### 0.1 風格定義

| 層 | 定義 | 適用 |
| --- | --- | --- |
| 實體層 Solid | 厚塗材質、霧面、明確體積、硬邊輪廓，**不發光**（最多一條邊緣光） | 披薩盤面、盤緣底座、桌面近處、UI 面板、Noxcat 身體、按鈕 |
| 半虛化層 Ethereal | 線框骨架 + 厚塗霧氣填充，30–70% 不透明，邊緣崩解為點線 | 魔王身體、牢籠、遠景廢墟、中景機械 |
| 純光層 Signal | 只有線、點、符號、粒子，純發光，無實體 | 資料流、黑洞粒子、UI 投影框線、技能特效、調料圖騰 |

原則：**同一畫面三層都要出現，但發光的只有純光層與少量點綴。**

### 0.2 色彩系統（兩套，不可混用）

| 用途 | 名稱 | HEX | 說明 |
| --- | --- | --- | --- |
| 世界 | Void Black | `#06070a` | 底色、虛無 |
| 世界 | Ruin Grey | `#1a1d22` | 實體暗面、廢墟 |
| 世界 | Deep Green | `#0f2a1e` | 霧氣、遠景 |
| 世界 | Terminal Green | `#39ff9a` | 資料流、符號、魔王身體縫隙光 |
| 世界 | Signal White | `#e8fff4` | 高光點、極少量 |
| 玩家 | Player Blue | `#3fa9ff` / 亮 `#8fd8ff` | 玩家餅皮、甜料、技能、HUD 玩家側 |
| Nox | Nox Lime | `#a4ff3f` | **NOXCAT IP 本身的萊姆綠**（眼睛、護目鏡鏡片、胸章） |
| Nox | Nox Cyan | `#5fe3e8` | Nox 的**科技效果**（掃描、淨化、能量格） |
| 魔王 | Overlord Red | `#ff3b3b` / 亮 `#ff8a66` | 魔王餅皮、辣椒、眼睛、矛尖、技能 |
| 中立 | Crust Bone | `#d9cfb4` / 暗 `#8e8468` | 無主餅皮、盤面基底 |
| 金 | Fate Gold | `#ffbf47` | 只用於「南方操作框」與「確認／主按鈕」，代表玩家的選擇權 |

象徵：藍＝清醒／控制；紅＝被控制／污染。**背景絕不使用藍或紅**，藍紅只出現在 gameplay 元素。

> Nox 有兩個綠：角色本體是 IP 的萊姆綠，他放出來的科技效果是青色。這樣角色與特效不會糊在一起。

### 0.3 角色鎖定字串（Prompt B 用；Prompt A 改用參考圖）

**[BOSS-LOCK]**
`the Overlord: a giant black cat-demon seen only from the waist up, lower body dissolving into a black hole abyss; tall pointed ears, crown of jagged spikes, layered tattered cape edges; body is matte black with thin terminal-green glyph seams and dissolving pixel fragments at the edges; a red glowing diamond gem on the chest; narrow slit eyes glowing hard red; holding a long black spear with a red glowing blade in one hand; front three-quarter view, slight low angle`

**[NOX-LOCK]**
`Noxcat: A cute chibi black cat character closely matching the provided NOXCAT IP design, with a large head and small body, oversized bright lime-green eyes, tall pointed ears, and a friendly expressive face. The cat wears silver-and-black aviator goggles with translucent green lenses resting on its forehead, a black high-collar utility vest over a white short-sleeve shirt, and a small round lime-green cat emblem hanging from the front zipper. Black fur with subtle dark-gray highlights and lime-green accent details. Soft clean cel-shaded solid body, bold black outlines, slightly cartoonish game-character proportions, not realistic, not wireframe. Front view, eye level.`

**[STYLE]**（Prompt B 每句開頭）
`holographic wireframe rendering combined with painterly dark sci-fi textures; cyber hell ruins; deep void black background; thin terminal-green wire lines, glyphs and data points as air decoration; painterly volumetric fog; solid objects have matte painted surfaces with hard clean silhouettes; distant objects are translucent wireframes fading into darkness; high precision details against vast empty void; game-art readability, clean edges, no clutter on focal elements`

**[NEG]**（Prompt B 每句結尾）
`photorealistic, photo, blurry, low contrast, watermark, signature, text, letters, numbers, logo, extra limbs, deformed hands, neon rainbow, purple, pink, matrix rain, lens flare, glossy, oily, dripping cheese, food photography, cartoon food, clutter on focal element`

### 0.3b 角色鎖定（Prompt A 用）

Prompt A **不寫**上面的長字串。改成：

- 魔王：`--reference-image assets/_ref/overlord.png` ＋ 一句 `same character as the reference`
- Noxcat：`--reference-image assets/_ref/noxcat.png` ＋ 一句 `same character as the reference`
- 風格：`--reference-image assets/pizza/P-01.png`（或 C-01、U-01 三張錨定圖之一）

### 0.4 鏡頭規則
- 披薩盤面：純正俯視、正交（無透視），中心對齊，畫面正方形。傾斜由程式完成。
- 魔王：正面 3/4、略仰角，畫面上方留空給頭頂尖刺與光暈，下緣裁在腰部以下（沉入黑洞）。
- Noxcat：正面、平視、置中，四周留 15% 空白給牢籠遮擋。
- 環境：水平線在畫面 38% 高度；透視消失方向在畫面中央偏上，但**不收斂成單點**。

### 0.5 光線規則
- 主光：**由下往上**的綠白光（黑洞）。
- 邊緣光：魔王側紅、玩家側藍，各只一條。
- 每個物件最多一種發光；實體層不發光。
- 陰影硬邊、偏 Ruin Grey，不用純黑影。

### 0.6 材質規則
- 實體：霧面、有筆觸感的厚塗、少量刮痕。
- 半虛化：線框可見、內部霧氣、邊緣崩解成 2–4px 方形碎片。
- 純光：1–2px 線、2–3px 點、無漸層填充。

### 0.7 輸出規則
- 純光層資產一律生成在**純黑底**，遊戲內用 `mix-blend-mode: screen` 疊圖，不需去背。
- 實體與半虛化層資產需要真透明：Meowa 用 `--remove-background`／`remove-background-run`；其他工具指定 `on flat solid magenta background`（`#ff00ff`）後製去色鍵。
- 所有資產 PNG，尺寸為 2 的冪或指定值；圖示集合成 atlas。
- 不在圖片內生成任何文字、數字；所有文字由程式渲染。

### 0.8 Prompt 格式
- **A**：一到三句自然語言。先寫最短版本，看結果，一次只加一個必要限制。一致性用 `--reference-image`。
- **B**：`[STYLE] + [角色鎖定(若有)] + 資產描述 + 構圖 + 背景 + 比例` ／ `Negative: [NEG] + 額外負面詞`

---

## 1. Environment Assets（環境）

### E-01 深空虛無底層
- 類型：靜態背景（全畫面）｜使用位置：所有畫面最底層（取代 `#app` 的 CSS 星點）｜功能：世界基底，不承載遊戲資訊
- 視覺：99% Void Black，極稀疏的白綠光點、極遠的月面弧線、一條斜向稀薄綠霧帶，右上角隱約有廢棄軌道站剪影。留白要大。
- 尺寸：2560×1440（中央 1600×900 安全區）｜透明：否｜狀態版本：無｜動畫：程式（視差 2%、星點閃爍）
- **Prompt A**：`A vast empty black space background. A few sparse tiny white-green stars, a faint lunar horizon arc at the bottom right, and a thin band of dim green fog crossing diagonally. Almost entirely empty, nothing in the center.`
- **Prompt B**：`[STYLE], vast empty deep space void, almost entirely black, a few sparse tiny white-green light points, a faint distant lunar horizon arc at the bottom right, a thin diagonal band of dim green fog, an abandoned orbital station silhouette far top right as translucent wireframe, extreme emptiness and loneliness, wide 16:9 composition, no focal object in the center. Negative: [NEG], busy, crowded, bright, nebula colors`
- 重用：所有畫面共用｜優先級：**Must Have**

### E-02 遠景廢墟／月球基地剪影層
- 類型：靜態、寬幅、透明（可水平平移）｜使用位置：底層之上、桌面之後，貼畫面下半部水平線｜功能：「遼闊 ↔ 精密」對比
- 視覺：地平線上的廢墟基地群：斷裂環形結構、天線、管線塔，半虛化線框加薄霧，越遠越淡。中央 30% 寬度留空。
- 尺寸：3072×768，透明｜動畫：程式（視差 5%）
- **Prompt A**：`A distant horizon of ruined machinery: broken ring structures, antenna towers and pipe stacks, drawn as faint translucent green wireframes fading into darkness. Ultra wide strip, the middle third left empty. Transparent background.`
- **Prompt B**：`[STYLE], distant horizon line of cyber hell ruins: broken ring structures, antenna towers, pipe stacks, a ruined lunar base, all rendered as translucent terminal-green wireframes with painterly dark fog inside, fading to nothing toward the far distance, the central third of the image left empty, ultra wide panoramic strip, on flat solid magenta background. Negative: [NEG], foreground objects, characters`
- 重用：左右鏡射可再用｜優先級：**Must Have**

### E-03 中景機械結構（左、右）
- 類型：靜態、透明 ×2｜使用位置：畫面左右邊緣，HUD 欄位後方｜功能：高精密度區、框住畫面
- 視覺：斷裂管線、閥門、纜線束、發光終端窗、一株人造發光植物。實體厚塗，局部線框。左右不對稱。
- 尺寸：各 768×1440，透明｜動畫：程式（終端窗閃爍）
- **Prompt A**：`A vertical stack of ruined machinery along the left edge: broken pipes, valves, cable bundles, one small glowing terminal screen, and a glowing green plant growing from a crack. Dark and precise. The right side of the image is empty. Transparent background.`
- **Prompt B**：`[STYLE], a vertical stack of ruined machinery at the left edge of frame: broken pipes, valves, cable bundles, a small glowing terminal window, an artificial bioluminescent green plant growing from a crack, matte painted solid surfaces with subtle wireframe details, dark, precise, right side of image empty, tall portrait strip, on flat solid magenta background. Negative: [NEG], symmetry, characters`
- （右側版本把 left／right 對調）｜重用：可鏡射；小螢幕隱藏｜優先級：Should Have

### E-04 玩家軌道／桌面
- 類型：靜態、透明｜使用位置：披薩下方向遠方延伸｜功能：玩家「桌面」；透視深度
- 視覺：從畫面底邊向上收窄的半透明平台，表面細格線與流動資料槽，近處實體厚塗、遠處線框淡出，**不收斂為單點**，最後化為稀疏的點。近緣一條藍色細光帶。
- 尺寸：2048×1152，透明｜動畫：程式（格線流動、藍光帶呼吸）
- **Prompt A**：`A floating platform seen in deep perspective, wide at the bottom of the frame and narrowing toward the upper middle. Fine grid lines on its surface. Solid near the viewer, dissolving into scattered points in the distance instead of meeting at a vanishing point. A thin blue light strip along the near edge. Transparent background.`
- **Prompt B**：`[STYLE], a floating player platform seen in strong perspective, wide at the bottom edge of the frame and narrowing toward the upper middle, surface with fine grid lines and shallow data channels, solid matte painted near the viewer, becoming translucent wireframe and dissolving into scattered points in the distance, never converging to a single vanishing point, a thin player-blue light strip along the near edge only, upper part of the image empty, on flat solid magenta background. Negative: [NEG], vanishing point, road, highway, rhythm game notes`
- 重用：唯一｜優先級：**Must Have**

### E-05 黑洞靜態底座
- 類型：靜態、黑底（screen 疊圖）｜使用位置：披薩正下方，比披薩大 1.6 倍｜功能：披薩懸浮其上；魔王從此浮現
- 視覺：向內旋的深淵，環狀線框漩渦，內圈越暗、外圈綠白細線越密，邊緣崩解碎片與符號被拉向中心。中心純黑。
- 尺寸：1536×1536，純黑底｜動畫：程式旋轉兩層（外環慢、內環快、反向）
- **Prompt A**：`A black hole seen from directly above: concentric spiraling green wire rings, brighter and denser toward the outer edge, pure black at the center. Small fragments are being pulled inward along the spiral. Centered, square, black background.`
- **Prompt B**：`[STYLE], a top-down black hole vortex made of concentric spiraling terminal-green wire rings, rings denser and brighter toward the outer edge, pitch black at the center, small square fragments and glyph-like points being pulled inward along the spiral, painterly dark fog between the rings, perfectly centered, square composition, on pure black background. Negative: [NEG], bright center, sun, lens, orange`
- 重用：拆外環／內環兩張，程式反向旋轉｜優先級：**Must Have**

### E-06 空氣裝飾資料流圖磚
- 類型：可平鋪圖磚、黑底｜使用位置：背景中層、HUD 面板內、牢籠周圍｜功能：高精密度空氣裝飾
- 視覺：稀疏的 0/1、原創符號、短線、節點、微型幾何，密度不均（有空洞區）。
- 尺寸：1024×1024 四方連續，純黑底｜狀態版本：疏／密兩張｜動畫：程式（緩慢上移、局部閃爍）
- **Prompt A**：`A seamless tileable pattern of sparse floating data symbols: small abstract glyphs, short dashes, dots and tiny geometry in thin green lines. Uneven spacing with large empty gaps. Black background, edges must tile seamlessly.`
- **Prompt B**：`[STYLE], seamless tileable texture of sparse floating data glyphs: original abstract symbols, short dashes, small nodes, micro geometry, a few 0 and 1 shapes, uneven density with large empty gaps, thin 1–2px terminal-green lines and points only, on pure black background, seamless edges. Negative: [NEG], dense, matrix rain, readable words`
- 重用：全遊戲共用｜優先級：Should Have

### E-07 魔王出現處的深淵開口
- 類型：靜態、黑底｜使用位置：畫面頂部中央，魔王立繪後方｜功能：交代魔王「從深淵長出來」
- 視覺：畫面上緣一道裂開的空間，裂縫內是黑洞邊緣的旋線，向下滴落符號碎片。
- 尺寸：1536×768，純黑底｜動畫：程式（碎片下落）
- **Prompt A**：`A horizontal tear in space across the top of the frame. Its edges crumble into small fragments, and a spiraling abyss is visible inside the gap. A few glyph fragments drip downward. The rest is black.`
- **Prompt B**：`[STYLE], a horizontal tear in space at the top center of frame, the rift edges made of dissolving pixel fragments and thin green wire, inside the rift a glimpse of a spiraling abyss, small glyph fragments dripping downward, the rest of the image black, wide composition, on pure black background. Negative: [NEG], character, face`
- 重用：唯一｜優先級：Should Have

---

## 2. Character Assets（角色）

### 魔王資產策略
身體固定一張（C-01），**表情用頭部替換**（C-02～C-08），**動作用整張上半身替換**（C-09～C-13）。
全身圖 2048×2048、頭部圖 1024×1024，角色置中偏上，腰部以下裁切，透明。
預設姿勢：**左手掌壓在桌面邊緣（畫面左下），右手在桌外持矛豎立（畫面右側）**，矛尖朝上超出畫面頂部。

### C-01 魔王 Default／待機（全身）
- 類型：角色立繪、透明｜使用位置：取代 `.slot-boss`｜功能：魔王常駐狀態
- 視覺：見 [BOSS-LOCK]；身體下緣崩解成碎片沉入黑洞；左手壓桌、右手持矛；表情平靜俯視。
- 尺寸：2048×2048，透明｜動畫：程式（呼吸縮放 1%、縫隙符號流動、眼睛亮度呼吸）
- **Prompt A**（配 `--reference-image overlord.png`）：`A giant black cat demon seen from the waist up, his lower body dissolving into a black hole beneath him. He rests one palm on the edge of a floating table and holds a long spear upright in his other hand, outside the table. Tall pointed ears, a crown of jagged spikes, a tattered cape, a red glowing gem on the chest, narrow red glowing eyes. His matte black body has thin green glowing seams and its edges break apart into small fragments. Calm and dominant, looking slightly down.`
- **Prompt B**：`[STYLE], [BOSS-LOCK], default idle pose: left palm pressed on the edge of a floating table at the lower left, right arm outside the table holding the spear upright at the right side with the red blade exceeding the top of frame, calm dominant expression looking slightly down at the viewer, lower body dissolving into pixel fragments and dark fog below the waist, character centered slightly high, on flat solid magenta background. Negative: [NEG], legs, feet, full body, smiling, cute`
- **Animation Prompt**（選用，4 秒無縫循環）：`seamless loop, static camera, idle: very slow breathing, green glyph seams slowly flowing upward across the body, pixel fragments at the lower edge drifting down and fading, red eyes pulsing gently, cape edges barely swaying, no pose change`
- 重用：所有頭部替換的底｜優先級：**Must Have**

### C-02～C-08 魔王表情頭部（7 張）
共同規格：頭部＋頸部，1024×1024，透明，角度與 C-01 完全一致，替換時對齊耳尖。
- **Prompt A 做法**：用 `one-click-upgrade-run`，`--reference-image` 指向 C-01，七個 `--variant-prompt` 一次產出（見下表 A 欄）。
- **Prompt B 共同前綴**：`[STYLE], [BOSS-LOCK], head and neck only, same angle as reference, cropped below the neck, on flat solid magenta background.`

| ID | 狀態 | 觸發時機 | Prompt A（variant） | Prompt B（接前綴） | 優先 |
| --- | --- | --- | --- | --- | --- |
| C-02 | 思考 | 魔王判定前 0.3s | `same character, thinking, eyes half closed, head slightly tilted` | `thinking: eyes half closed, one brow ridge raised, head slightly tilted, faint glyphs orbiting the temple` | Should |
| C-03 | 觀察玩家 | 玩家操作南方切片 | `same character, staring straight at the viewer, pupils narrowed` | `observing the viewer: eyes fully open and locked forward, pupils narrowed to thin slits, still and predatory` | Should |
| C-04 | 得意 | 辣椒滲透、奪取餅皮 | `same character, smug, mouth curved up, chin lifted` | `smug: corners of the mouth raised, eyes curved, chin slightly lifted, red gem brighter` | **Must** |
| C-05 | 不滿 | 玩家清除辣椒、削弱餅皮 | `same character, displeased, brow low, ears folded back` | `displeased: brow pressed down, eyes narrowed to thin lines, ears folded back, a few fragments flaking off` | **Must** |
| C-06 | 驚訝 | 玩家奪回餅皮、Nox 解危 | `same character, surprised, eyes wide, ears straight up` | `surprised: eyes wide and round, ears straight up, mouth slightly open, glyph seams flickering` | Should |
| C-07 | 發怒 | 玩家領地 ≥7 或連續反制 | `same character, furious, eyes blazing, seams glowing red` | `furious: eyes blazing wide red, head spikes enlarged, all body seams turned red, fragments bursting outward` | **Must** |
| C-08 | 嘲諷 | 玩家錢不足、餅皮歸零 | `same character, mocking, one eye closed, crooked grin` | `mocking: one eye half closed, crooked grin, head tilted away, dismissive` | Should |

動畫：程式切換（交叉淡入 120ms）；C-07 加畫面紅邊震動（V-08）

### C-09～C-13 魔王動作（整張上半身，5 張）
共同規格：同 C-01 畫布與裁切，透明。
- **Prompt B 前綴**：`[STYLE], [BOSS-LOCK], same canvas framing as the idle pose, on flat solid magenta background,`

| ID | 狀態 | 觸發 | Prompt A | Prompt B（接前綴） | 優先 |
| --- | --- | --- | --- | --- | --- |
| C-09 | 準備行動 | 撒辣椒前 0.5s | `same character, leaning forward, spear slightly raised, left hand lifted off the table` | `preparing to act: spear slightly raised, left hand lifted off the table and half closed, leaning forward` | Should |
| C-10 | 執行技能 | 撒辣椒、奪取、抽片 | `same character, pressing his left palm down toward the viewer with a glowing red rune circle in the palm` | `casting: left palm pressed downward toward the viewer with a red glowing rune circle in the palm, spear planted, eyes blazing` | **Must** |
| C-11 | 受到反制 | Nox 解除、餅皮崩解 | `same character, recoiling backward, left arm raised to defend, fragments bursting off his body` | `hit reaction: upper body recoiling backward, left arm raised defensively, body fragments bursting outward, seams flickering` | **Must** |
| C-12 | 結算勝利 | 結局 lose | `same character, both arms spread wide, spear held horizontally, looking down in triumph` | `dominant victory: both arms spread wide, spear held horizontally, looking down triumphantly, gem blazing` | Should |
| C-13 | 結算落敗 | 結局 great／win | `same character, most of his body dissolved into drifting fragments, spear drooping, eyes dim` | `defeated: most of the body dissolved into drifting fragments, spear drooping, eyes dim, hunched` | Should |

- 動畫：C-10 配 V-06 符文圈；C-11 配位移震動；C-12／C-13 靜態
- **Animation Prompt**（C-11 選用）：`2 second clip, static camera, the character recoils backward as if struck, fragments burst outward from the chest and fade, seams flicker red then back`

### C-14 魔王從黑洞浮現（開場）
- 類型：生成影片或 8 幀序列，黑底｜使用位置：開始前 2 秒過場｜尺寸：1536×1536
- 優先級：Nice to Have（可用程式：C-01 從下方位移淡入＋E-05 加速旋轉替代）
- **Animation Prompt**：`3 second clip, static camera, the cat demon rises from a black hole vortex: first only two red eyes in the dark, then the spiked head, then the spear and both hands emerging and gripping the table edge, fragments streaming off the body, ending in the idle pose`

### Noxcat 資產策略
螢幕上很小（牢籠內約 90–140px），**全部做整隻小圖**，不做頭部替換。1024×1024，透明，正面平視，四周留白 15%。
- **Prompt A 做法**：`one-click-upgrade-run`，`--reference-image` 指向 C-20，其餘七個狀態一次產出。
- **Prompt B 前綴**：`[STYLE], [NOX-LOCK], full body, sitting, centered with 15% margin, on flat solid magenta background,`

| ID | 狀態 | 觸發 | Prompt A | Prompt B（接前綴） | 優先 |
| --- | --- | --- | --- | --- | --- |
| C-20 | Default／看玩家 | 常駐 | `The NOXCAT character from the reference, sitting and holding a small holographic laptop, looking at the viewer with a friendly smile.` | `holding a holographic laptop, looking at the viewer with a small friendly smile` | **Must** |
| C-21 | 擔心 | 餅皮被侵蝕、錢<20 | `same cat, worried, brows drooping, ears folded back, clutching the laptop` | `worried: brows drooping, ears folded back, looking off to the side, paws clutching the laptop` | **Must** |
| C-22 | 開心／得意 | 餅皮轉換、結算加分 | `same cat, happy, eyes closed in a smile, one paw raised` | `happy and smug: eyes closed in a smile, one paw raised` | Should |
| C-23 | 使用科技／敲鍵盤 | 採購階段、Nox 處理前 | `same cat, typing on the laptop with its head down, screen light on its face` | `typing intently on the holographic laptop, head down, cyan screen light on the face` | **Must** |
| C-24 | 打瞌睡 | 連續 6 步無操作 | `same cat, dozing, eyes closed, head tilted, laptop sliding off its lap` | `dozing: eyes closed, head tilted, laptop sliding off the lap` | Nice |
| C-25 | 被吵醒／發現問題 | 技術摩擦落在玩家餅皮 | `same cat, startled, eyes wide, ears straight up, leaning forward` | `startled alert: eyes wide, ears straight up, mouth open, leaning forward` | Should |
| C-26 | 成功解除危機 | Nox 處理成功 | `same cat, giving a thumbs up, a glowing check mark on the laptop screen` | `triumphant thumbs up, laptop screen showing a glowing cyan check mark shape (no text)` | **Must** |
| C-27 | 結算開心 | 結局 great／win | `same cat, jumping with the laptop raised overhead` | `jumping with the laptop raised overhead, joyful` | Nice |

- 動畫：全部程式（切換淡入、C-23 打字上下抖動 6fps、C-24 緩慢點頭）
- **Animation Prompt**（C-23 選用）：`two frame typing loop, the cat's paws alternate up and down on the laptop, screen glyphs flicker, pose otherwise identical`

### C-30 玩家標記（取代 `.slot-cat`）
- 類型：圖示、黑底（screen）｜使用位置：披薩南方外側｜功能：標示玩家方位（第一人稱，不做角色）
- 尺寸：256×256，純黑底｜動畫：程式呼吸
- **Prompt A**：`A small blue rune marker: an upward pointing triangle with two thin lines converging toward it. Clean thin lines, centered, black background.`
- **Prompt B**：`[STYLE], a small player-blue rune marker: an upward pointing triangle glyph with two thin converging lines, clean 2px lines, centered, on pure black background. Negative: [NEG], character`
- 優先級：Should Have

---

## 3. Pizza / Gameplay Assets（披薩與機制）

### 實作方式（先讀）
- 盤面（P-01）與所有扇形（P-02、P-03）是**純俯視**圖，程式用 `perspective(1400px) rotateX(15deg) rotate(θ)` 傾斜並旋轉。
- 盤緣厚度與底座（P-04）是**已傾斜視角**的靜態圖，不旋轉，放盤面下方。
- 扇形圖統一 1024×1024 畫布，圓心在正中、扇形朝正上方（北），程式用 `rotate(-i×30°)` 排 12 片。

### P-01 盤面基底 ★錨定資產
- 類型：靜態、透明｜使用位置：披薩旋轉層最底｜功能：轉盤本體；12 片無主餅皮的基底
- 視覺：賭場輪盤與時鐘的合體：外圈霧面深色金屬環帶刻 12 個細槽與 60 個小刻度，內圈 Crust Bone 圓盤、12 條細分隔線。**工整、乾淨、無食物質感**，只在盤緣有一圈烤色暗示它曾是披薩。
- 尺寸：2048×2048，透明｜動畫：程式旋轉
- **Prompt A**：`A top-down view of a circular game wheel shaped like a clean geometric pizza. A dark matte metal outer rim with twelve slots and small tick marks like a roulette wheel, and a pale bone-colored inner disc divided into twelve equal wedges by thin lines. Clean and geometric, no toppings, no cheese.`
- **Prompt B**：`[STYLE], top-down orthographic view of a circular game wheel that is a stylized pizza: outer matte dark grey metal rim band with 12 thin slots and 60 tiny tick marks like a roulette wheel, inner disc in pale bone-beige matte painted surface divided into 12 equal wedges by thin dark lines, a faint baked-brown ring at the rim edge, perfectly clean and geometric, no toppings, no cheese, no food texture, centered, square, on flat solid magenta background. Negative: [NEG], food, cheese, tomato, greasy, perspective, tilt, shadow`
- 重用：唯一｜優先級：**Must Have**

### P-02 餅皮扇形（3 張）
- 類型：扇形覆蓋圖，透明｜使用位置：疊在 P-01 上，每片依所有權切換｜功能：領地辨識（核心資訊）
- 尺寸：1024×1024（扇形 30°，半徑 450px，圓心置中）｜動畫：程式（V-04 閃光；被抽走時向中心縮入）
- P-02a 無主：不需資產（露出 P-01）

| ID | 狀態 | Prompt A | Prompt B | 優先 |
| --- | --- | --- | --- | --- |
| P-02b | 玩家 | `A single pie wedge pointing straight up, filled with translucent blue and outlined by a bright blue edge line, in the same style as the reference wheel. Everything outside the wedge is empty.` | `[STYLE], a single 30-degree pie wedge pointing straight up, apex at the exact center of the canvas, radius 450px, filled with matte painted player-blue at 70% opacity with a faint hexagonal micro-grid, a thin bright blue edge line, clean hard edges, everything else transparent, on flat solid magenta background. Negative: [NEG], circle, full pizza, glow spill outside the wedge` | **Must** |
| P-02c | 魔王 | `Same wedge shape, filled with dark red and a faint crack texture, outlined by a bright red edge line.` | 同上，改 `dark red (#7a1010) with a faint crack texture, thin bright red edge line` | **Must** |
| P-02d | 被抽走 | `Same wedge shape, filled with pure black, its edges crumbling into small fragments, with faint green spiral lines visible inside as if looking down into a black hole.` | 同上，改 `filled with pitch black, edges crumbling into small square fragments, a few green wire spiral lines visible inside as if looking down into a black hole` | **Must** |

重用：12 片共用同一張，程式旋轉

### P-03 調料圖騰（6 張）
- 類型：扇形覆蓋圖，**黑底 screen 疊圖**｜使用位置：疊在 P-02 上｜功能：短期事件辨識；等級用密度區分
- 視覺：**不填滿扇形**，只佔扇形外側 55%～85% 的環帶區，留出餅皮
- 尺寸：1024×1024（對齊 P-02），純黑底｜動畫：程式（Lv3 閃爍；升級時 V-01／V-02）

| ID | 等級 | Prompt A | Prompt B | 優先 |
| --- | --- | --- | --- | --- |
| P-03a | 玩家 Lv1 | `Three small glowing blue nodes connected by one thin line, placed in a band near the outer edge of an upward pie wedge. The center of the wedge stays empty. Black background.` | `[STYLE], inside a 30-degree upward wedge zone between radius 250px and 400px from the canvas center, three small player-blue glowing nodes connected by one thin line, minimal, 2px lines, the rest of the canvas pure black. Negative: [NEG], filled shape, food` | **Must** |
| P-03b | 玩家 Lv2 | `Five glowing blue nodes forming a small star-shaped network in the same band.` | `... five blue glowing nodes forming a small star-shaped network ...` | **Must** |
| P-03c | 玩家 Lv3 | `A dense blue node network with an outer rune arc and a small hexagonal shape at the center of the band. Brightest of the three.` | `... a dense blue node network, an outer rune arc, and a tiny hexagonal geometry at the wedge center, brightest ...` | **Must** |
| P-03d | 魔王 Lv1 | `Three sharp red crack lines radiating outward in a band near the outer edge of an upward pie wedge. Black background.` | `... three sharp red crack lines radiating outward ...` | **Must** |
| P-03e | 魔王 Lv2 | `A web of red cracks with a few small red fragments in the same band.` | `... a web of red cracks with a few red square fragments ...` | **Must** |
| P-03f | 魔王 Lv3 | `Red cracks filling the band, a red thorn arc along the outer edge, and a small red eye-shaped mark at the center.` | `... red cracks filling the band, a red thorn arc along the outer edge, a small red eye-shaped glyph at the center ...` | **Must** |

重用：12 片共用

### P-04 盤緣厚度與底座（已傾斜視角）
- 類型：靜態、透明｜使用位置：披薩旋轉層下方，不旋轉｜功能：3D 感
- 尺寸：2048×1280，透明（上半部留空給盤面）｜動畫：程式（側面刻痕背景位移模擬轉動）
- **Prompt A**：`The thick side edge of a circular game wheel seen from a low angle: a dark metal elliptical rim showing its thickness with vertical grooves, a faint green light line along its bottom edge, and a few floating fragments beneath it. Do not show the top face of the wheel.`
- **Prompt B**：`[STYLE], the side view of a thick circular game wheel seen from a low 15-degree angle: an elliptical dark matte metal rim showing its thickness with vertical groove marks, a faint terminal-green light line along the bottom edge, below it a few floating dissolving support fragments, the top face of the wheel is NOT shown (left empty), on flat solid magenta background. Negative: [NEG], top face, toppings`
- 優先級：**Must Have**

### P-05 指針
- 類型：靜態、透明｜使用位置：披薩上方靜態層，指向北｜功能：目前時間；魔王作用區指示
- 尺寸：256×1024，透明｜動畫：程式（停靠時輕微回彈）
- **Prompt A**：`A slim game wheel pointer needle in matte bone white, with a sharp tip glowing faintly red at the top and a round dark hub at the bottom. Vertical, centered.`
- **Prompt B**：`[STYLE], a slim game wheel pointer needle, matte bone white with painted texture, sharp tip with a tiny red glow at the top end, round dark hub at the bottom end, vertical, centered, on flat solid magenta background. Negative: [NEG], clock face`
- 優先級：**Must Have**

### P-06 南方玩家操作框
- 類型：扇形框 + 弧形倒數槽，黑底 screen｜功能：玩家唯一可操作區；倒數
- 尺寸：1024×1024，純黑底（扇形朝上，程式旋轉 180°）｜動畫：程式（倒數段熄滅、停靠閃一次）
- **Prompt A**：`A gold wedge-shaped frame pointing up, drawn as two gold outlines with nothing filled inside, and a segmented gold gauge arc of twelve pieces just outside it. Black background.`
- **Prompt B**：`[STYLE], a 30-degree wedge frame pointing up, apex at center, made of two gold lines (outer 4px, inner 1px), outside the wedge arc a segmented 12-piece gold energy gauge arc, clean glowing gold, pure black background. Negative: [NEG], fill, blue, red`
- 優先級：**Must Have**

### P-07 北方魔王影響區
- 類型：扇形，黑底 screen｜功能：魔王作用區預警｜尺寸：1024×1024
- **Prompt A**：`An upward pie wedge filled with dim red fog, with a red dashed outline and faint cracks inside. Black background.`
- **Prompt B**：`[STYLE], a 30-degree upward wedge filled with dim red fog and thin red dashed edge lines, faint crack lines inside, pure black background. Negative: [NEG], gold, blue`
- 優先級：Should Have（可用 CSS 漸層替代）

### P-08 西方結算區標記
- 類型：弧線＋符號，黑底 screen｜尺寸：512×512｜動畫：結算時符文旋轉一圈
- **Prompt A**：`A dotted green arc with a tiny abstract balance-scale symbol at its middle. Minimal, black background.`
- **Prompt B**：`[STYLE], a dotted terminal-green arc segment with a tiny abstract balance-scale rune at its middle, minimal, pure black background`
- 優先級：Nice to Have（可 CSS）

### P-09 小時刻度環
- 類型：靜態環，透明｜功能：時鐘感；讀時間｜尺寸：2048×2048（環寬約 80px）｜動畫：無
- **Prompt A**：`A thin circular dial ring with twelve diamond marks and sixty small ticks, in dark metal with faint green engraving. The middle is completely empty. No numbers.`
- **Prompt B**：`[STYLE], a thin circular dial ring with 12 diamond-shaped rune marks and 60 tiny tick marks, matte dark grey metal with faint green engraved lines, inner area fully transparent, top-down, centered, on flat solid magenta background. Negative: [NEG], numbers, letters`
- 優先級：Should Have

### P-10 中心軸心
- 類型：靜態，透明｜視覺：小圓形金屬軸＋中央紅綠雙色微光｜尺寸：256×256
- **Prompt A**：`A small round dark metal hub with a faint red and green glow at its center.`
- **Prompt B**：`[STYLE], a small circular dark metal wheel hub, a faint red and green double glow at the very center, centered, on flat solid magenta background. Negative: [NEG], needle`
- 優先級：Nice to Have（可與 P-05 合併）

### P-11 餅皮價值徽章框
- 類型：小框 ×2（藍／紅），透明｜功能：扇形上顯示價值數字的底框｜尺寸：128×64
- **Prompt A**：`A tiny angular badge plate with a thin glowing outline, empty inside, no text.`
- **Prompt B**：`[STYLE], a tiny chamfered badge plate with a thin glowing outline, hollow interior, on flat solid magenta background. Negative: [NEG], text, numbers`
- 優先級：Nice to Have（CSS 即可）

---

## 4. UI / HUD Assets（介面）

### UI 系統定義
語言：**浮空投影面板**（純光層線框框線）＋**實體按鈕**（厚塗霧面板，像從廢墟拆下的控制鍵）。
所有框用 **9-slice** 切片，一張圖適用所有尺寸。
三種勢力變體由**一張青色基底** CSS `hue-rotate` 換色；金色版單獨出一張。圖示一律單色白線稿，程式上色。

### U-01 浮空面板框（9-slice）★錨定資產
- 使用位置：左欄 HUD、右欄操作面板、採購面板、事件記錄｜尺寸：512×512（切片邊界 96px）｜透明：是
- **Prompt A**：`A holographic sci-fi UI panel frame: a thin cyan outline with a second finer line just inside it, small rune ornaments at the four corners, a small notch at the top center, and a very faint dark green fill inside. Empty interior, no text.`
- **Prompt B**：`[STYLE], a holographic UI panel frame for a 9-slice: thin 1px cyan outer line with a 0.5px inner parallel line, small rune ornaments at the four corners, a small notch at the top center, interior filled with 6% opacity dark green, corners and edges designed to stretch, square, on flat solid magenta background. Negative: [NEG], text, icons inside`
- 動畫：程式（出現時掃描線由上而下）｜重用：全部面板｜優先級：**Must Have**

### U-02 數值框（9-slice）
- 使用位置：DAY／TIME／CASH／NOX 四格、餅皮價值、採購摘要｜尺寸：512×128
- **Prompt A**：`A slim holographic readout capsule with a small icon socket at the left end and fine tick marks along the inside. Empty, no text.`
- **Prompt B**：`[STYLE], a slim horizontal capsule readout frame for a 9-slice, a small icon socket at the left end, fine rail tick marks inside, thin cyan lines, hollow interior, on flat solid magenta background. Negative: [NEG], text, numbers`
- 優先級：**Must Have**

### U-03 HUD 圖示集（8 個）
- 類型：atlas，透明，白色單色線稿｜尺寸：每格 256×256，atlas 1024×512
- 圖示：天數（月相）、時間（指針）、現金（菱形幣）、Nox 能量格、餅皮價值（層疊扇形）、領地數（12 格圓環）、生活成本（下箭頭鎖鏈）、庫存（方塊堆）
- **Prompt A**（用 `ui-gen-run --split-components`）：`A set of eight simple white line icons for a sci-fi game HUD, evenly spaced on a grid with matching stroke weight: a moon phase, a pointer needle, a diamond coin, a three-cell energy bar, stacked pie wedges, a twelve-segment ring, a downward arrow with a chain link, and a stack of cubes.`
- **Prompt B**：`[STYLE], a set of 8 minimal white line icons on a grid, 2px strokes, game HUD style with rune-like geometry: a moon-phase symbol, a pointer needle symbol, a diamond coin, a three-cell energy bar, stacked pie wedges, a 12-segment ring, a downward arrow with a chain link, a stack of cubes; consistent stroke weight, on flat solid magenta background. Negative: [NEG], color, shading`
- 優先級：**Must Have**

### U-04 主按鈕（Fate Gold，9-slice）
- 使用位置：開始這一週、第 N 天、再過一週、繼續｜尺寸：512×160，切片 64px
- 狀態版本：生成 normal 與 hover 兩張，pressed／disabled 由 CSS
- **Prompt A**：`A wide game button plate in dark matte material with chamfered left and right ends, a double gold outline, and a thin gold energy line along the bottom edge. No text.`
- **Prompt B**：`[STYLE], a wide game button for 9-slice: matte dark painted plate with chamfered left and right ends, a double gold outline, a thin gold energy line along the bottom edge, no text, on flat solid magenta background. Negative: [NEG], text, round`
- 動畫：程式（hover 能量線流動、點擊金色閃）｜優先級：**Must Have**

### U-05 次要按鈕（Ruin Grey，9-slice）
- 使用位置：暫停、回到開始畫面、關閉｜尺寸：512×160
- **Prompt A**：`The same button plate shape but with a single thin grey outline and no energy line. No text.`
- **Prompt B**：`[STYLE], the same chamfered button plate as the primary button but with a single thin grey outline and no energy line, matte dark surface, no text, on flat solid magenta background. Negative: [NEG], text, gold`
- 優先級：**Must Have**

### U-06 操作按鈕（框 ×1 ＋ 圖示 ×6）
- 使用位置：右欄六顆操作鍵；商店甜料鍵共用圖示｜尺寸：框 512×256；圖示 256×256
- 圖示：甜料Ⅰ（1 節點）、甜料Ⅱ（3 節點網）、甜料Ⅲ（節點網＋符文弧）、餅皮（扇形加上箭頭）、處理辣椒（掃描弧劃過裂紋）、賣出（扇形轉菱形幣）
- **Prompt A**：`Six simple white line icons on a grid with matching stroke weight: one glowing node; three nodes in a small network; a node network with an outer arc; a pie wedge with an upward arrow; a scan arc sweeping over crack lines; a pie wedge turning into a diamond coin.`
- **Prompt B**：`[STYLE], six minimal white line icons on a grid, 2px strokes: one glowing node; three nodes in a small network; a node network with an outer rune arc; a pie wedge with an upward arrow; a scan arc sweeping over crack lines; a pie wedge turning into a diamond coin; consistent style, on flat solid magenta background. Negative: [NEG], color`
- 優先級：**Must Have**

### U-07 商店品項卡（9-slice）＋餅皮圖示
- 使用位置：採購階段 7 個品項｜尺寸：卡 256×384；圖示 256×256
- **Prompt A**：`A tall holographic item card frame with an icon socket at the top, a price slot in the middle and four small stock ticks at the bottom. Empty, no text.`
- **Prompt B**：`[STYLE], a tall holographic shop item card frame for a 9-slice, icon socket at top, a price slot in the middle, four small stock tick marks at the bottom, thin cyan lines, hollow, on flat solid magenta background. Negative: [NEG], text, price numbers`
- 優先級：Should Have

### U-08 狀態 chip
建議 **不出圖**，用 CSS 膠囊＋色彩系統。優先級：CSS

### U-09 提示行／Tooltip 框（9-slice）
- 尺寸：512×128
- **Prompt A**：`A very thin holographic tooltip frame with a small pointer triangle on its left side. Empty, no text.`
- **Prompt B**：`[STYLE], a very thin holographic tooltip frame for a 9-slice with a small pointer triangle on the left edge, hollow interior, thin cyan line, on flat solid magenta background. Negative: [NEG], text`
- 優先級：Should Have

### U-10 Nox 對話框
- 使用位置：採購階段 Nox 台詞、Nox 處理成功短句｜尺寸：768×256，9-slice
- **Prompt A**：`A cyan holographic speech panel with a small tail on its lower left corner and a round portrait socket at the top right. Empty, no text.`
- **Prompt B**：`[STYLE], a cyan holographic dialogue panel for a 9-slice, a small angled tail at the lower left corner, a round portrait socket at the top right, hollow interior, on flat solid magenta background. Negative: [NEG], text, face`
- 動畫：程式（打字機出現、輕微 glitch）｜優先級：Should Have

### U-11 事件記錄面板
用 U-01 換色 + CSS，**不單獨出圖**。

### U-12 採購倒數弧
- 尺寸：512×256，黑底 screen
- **Prompt A**：`A semicircular gauge made of fifteen gold segments with a thin outer arc. Black background.`
- **Prompt B**：`[STYLE], a semicircular segmented gold gauge with 15 segments, thin outer arc line, pure black background. Negative: [NEG], numbers`
- 優先級：Should Have

### U-13 回合／時間顯示
由 P-09 刻度環與 P-05 指針承擔，HUD 內只放數字（U-02）。**不另出圖**。

### U-14 魔王狀態框＋意圖圖示 ×4
- 使用位置：畫面頂部中央，魔王立繪下緣｜功能：魔王意圖與領地數｜尺寸：框 768×128；圖示 256×256
- **Prompt A**（框）：`A red holographic status bar frame with small downward spikes at both ends and an icon socket in the middle. Empty, no text.`
- **Prompt A**（圖示）：`Four simple white line icons with matching stroke weight: a crack pattern, a grabbing hand, a pie wedge fading away, and a cracked coin.`
- **Prompt B**（框）：`[STYLE], a red holographic status bar frame for a 9-slice, small downward spikes at both ends, an icon socket at the center, hollow, on flat solid magenta background. Negative: [NEG], text`
- **Prompt B**（圖示）：`[STYLE], four minimal white line icons on a grid, 2px strokes: a crack pattern, a grabbing clawed hand, a pie wedge dissolving away, a cracked coin; consistent style, on flat solid magenta background. Negative: [NEG], color`
- 優先級：Should Have

### U-15 Noxcat 能量格（滿／空 2 張）
- 使用位置：牢籠下方；HUD NOX 格｜功能：Nox 今日剩餘處理次數｜尺寸：384×128，黑底 screen
- **Prompt A**（滿）：`Three hexagonal cyan energy cells in a row connected by thin lines, all filled and glowing. Black background.`
- **Prompt A**（空）：`The same three hexagonal cells, all empty, showing only their outlines.`
- **Prompt B**：`[STYLE], three hexagonal cyan energy cells in a row connected by thin lines, all filled and glowing, pure black background`（空格版改 `all empty, outline only`）
- 動畫：程式（消耗時該格閃滅）｜優先級：**Must Have**

### U-16 玩家狀態框
由 U-02 承擔，不另出圖。

### U-17 對話框／Modal 框
由 U-01 放大承擔＋U-04／U-05 按鈕。不另出圖。

### U-18 結算畫面框
由 U-01 承擔；加 R-02 幸福指數表盤。

### U-19 勝／敗標題橫幅（3 張）
- 使用位置：結局標題後方｜尺寸：1536×256，黑底 screen
- **Prompt A**：`A horizontal ceremonial banner made of thin glowing lines, both ends dissolving into fragments. No text. Black background.`（三個版本分別 `blue and gold` / `blue` / `red`）
- **Prompt B**：`[STYLE], a horizontal ceremonial energy banner made of thin glowing lines, both ends dissolving into fragments, no text, {blue and gold | blue | red} color, pure black background. Negative: [NEG], text`
- 優先級：Should Have

### U-20 HUD 裝飾角件
- 尺寸：256×256 ×1（程式鏡射四角）
- **Prompt A**：`A single ornamental corner bracket made of thin glowing lines with a small rune. Black background.`
- **Prompt B**：`[STYLE], a single ornamental UI corner bracket of thin glowing lines with a small rune accent, designed to be mirrored to four corners, pure black background. Negative: [NEG], text, full frame`
- 優先級：Nice to Have

### U-21 標題 LOGO
- 使用位置：開始畫面｜功能：品牌｜「披薩時鐘」四字由程式字型渲染，資產只做圖形｜尺寸：1024×1024，透明
- **Prompt A**：`A game logo emblem with no text: a tilted pizza wheel pierced by a long pointer needle, a small black hole spiral beneath it, and two tiny red glowing eyes above it. Gold and green lines.`
- **Prompt B**：`[STYLE], a game logo emblem without any text: a tilted stylized pizza wheel pierced by a long pointer needle, a small black hole spiral beneath it, two tiny red eyes glowing above it, gold and terminal-green lines, painterly matte disc, centered, on flat solid magenta background. Negative: [NEG], text, letters`
- 優先級：**Must Have**

### U-22 開始畫面主視覺
**不另出圖**，用 E-01 + E-05 + P 系列 + C-01 + C-20 程式合成。優先級：Nice（有時間再出 Key Art）

### U-23 PC 游標
- 尺寸：64×64 ×2（normal／pointer）
- **Prompt A**：`A small blue arrow cursor made of thin lines with a single dot accent.`
- **Prompt B**：`[STYLE], a small player-blue line-art arrow cursor with a single dot accent, tiny, on flat solid magenta background. Negative: [NEG], hand, text`
- 優先級：Nice to Have

---

## 5. VFX Assets（特效）

一律生成在**純黑底**用 screen 疊圖；序列圖用 sprite sheet。

| ID | 名稱 | 時機 | 尺寸 | 優先 |
| --- | --- | --- | --- | --- |
| V-01 | 甜料放置爆光 | 放甜料／升級 | 1024×1024 sheet 4×4 | Should |
| V-02 | 辣椒污染擴散 | 撒辣椒／升級 | 1024×1024 sheet 4×4 | Should |
| V-03 | Nox 淨化掃描 | Nox 處理成功 | 1024×1024 sheet 4×4 | **Must** |
| V-04 | 餅皮轉換閃光 | 所有權改變 | 1024×1024 sheet 2×4 | Should |
| V-05 | 黑洞吸入粒子集 | 常駐 | 512×512 atlas | **Must** |
| V-06 | 魔王技能符文圈 | 魔王執行技能 | 1024×1024 sheet 4×4 | Should |
| V-07 | 金錢變化光斑 | 現金增減 | 128×128 | Nice（程式） |
| V-08 | 警告紅邊 | 發怒、餅皮將歸零 | CSS | CSS |
| V-09 | 結算光柱 | 進入結局 | 512×1536 sheet 1×8 | Nice |
| V-10 | 切片停靠震波 | 每步停靠 | CSS | CSS |

**V-01**
- A：`A sprite sheet of sixteen frames showing blue glowing nodes expanding outward from the center into a brief network, then fading. Black background.`
- B：`[STYLE], sprite sheet 4x4 frames, player-blue glowing nodes expanding outward from center into a brief network then fading, consistent framing every cell, pure black background. Negative: [NEG], text, grid lines between cells`

**V-02**
- A：`A sprite sheet of sixteen frames showing red cracks crawling outward from the center, shedding small fragments. Black background.`
- B：`[STYLE], sprite sheet 4x4 frames, red cracks crawling outward from the center with small fragments breaking off at the ends, consistent framing every cell, pure black background. Negative: [NEG], text, grid lines between cells`

**V-03**
- A：`A sprite sheet of sixteen frames showing a cyan scan arc sweeping from left to right across a wedge area, erasing red crack lines as it passes and leaving cyan sparks behind. Black background.`
- B：`[STYLE], sprite sheet 4x4 frames, a cyan holographic scan arc sweeping from left to right across a 30-degree wedge area, red crack lines beneath it being erased frame by frame, trailing cyan light fragments, consistent framing every cell, pure black background. Negative: [NEG], text, grid lines between cells`

**V-04**
- A：`A sprite sheet of eight frames showing a wedge flashing white then settling into a new color, with its outline drawing itself from the inside out. Black background.`
- B：`[STYLE], sprite sheet 2x4 frames, a 30-degree wedge flashing white then resolving into a new color, edge line drawing itself outward, consistent framing every cell, pure black background. Negative: [NEG], text, grid lines`

**V-05**
- A：`An atlas of twelve tiny separate elements on a grid: small square fragments, short dashes, dots, a 0 shape, a 1 shape, four abstract glyphs and two thin light filaments. Green and white thin strokes, black background.`
- B：`[STYLE], an atlas of 12 tiny separate elements on a grid: small square fragments, short dashes, dots, a 0 shape, a 1 shape, four original abstract glyphs, two thin light filaments; terminal green and white, 2–3px strokes, pure black background. Negative: [NEG], text, words`

**V-06**
- A：`A sprite sheet of sixteen frames showing a double ring of red runes expanding outward then contracting. Black background.`
- B：`[STYLE], sprite sheet 4x4 frames, a double ring of red runes expanding outward then contracting back, consistent framing every cell, pure black background. Negative: [NEG], text, readable letters`

**V-09**
- A：`A sprite sheet of eight frames showing a green-white light column rising from the bottom with symbols floating up inside it. Black background.`
- B：`[STYLE], sprite sheet 1x8 vertical frames, a terminal-green and white light column rising from the bottom, small glyphs floating upward inside it, pure black background. Negative: [NEG], text`

---

## 6. Animation Assets（動畫需求清單）

原則：**能用程式做的全部用程式。** 只有「形狀本身要變」的才用生成動畫或幀序列。

### 魔王
| 動畫 | 做法 | 資產 |
| --- | --- | --- |
| 待機呼吸／符號流動 | 程式：縮放 1%、E-06 遮罩流動、眼睛亮度 sin | C-01 + E-06 |
| 思考 | 程式：切 C-02＋符號繞頭旋轉（V-05） | C-02 |
| 抬手／準備 | 程式：切 C-09＋P-07 亮起 | C-09 |
| 放下調料 | 程式：切 C-10、掌心 V-06、北方切片播 V-02 | C-10 |
| 嘲諷 | 程式：切 C-08＋輕微左右搖 | C-08 |
| 發怒 | 程式：切 C-07、V-08、震動 6px 0.3s | C-07 |
| 受到反制 | 程式：切 C-11、後退回彈、碎片噴散 | C-11 |
| 從黑洞浮現 | 生成影片或程式替代 | C-14 |

### Noxcat
| 動畫 | 做法 | 資產 |
| --- | --- | --- |
| 待機 | 程式：上下浮動 3px | C-20 |
| 敲鍵盤／快速輸入 | 程式：C-23 抖動 6fps／12fps | C-23 |
| 打瞌睡／驚醒 | 程式：C-24 點頭 → 切 C-25 放大回彈 | C-24、C-25 |
| 高興／啟動科技／成功解除 | 程式：切圖＋牢籠 glitch | C-22、C-23、C-26 |

### 披薩
持續旋轉、停靠回彈、被污染、被淨化、餅皮轉換、調料生成升級、被抽走 — **全部程式**（配 V-01～V-04）。

### 黑洞
旋轉（外環 60s／內環 20s 反向）、粒子吸入（V-05 沿螺旋加速縮小）、空間扭曲（CSS blur + scale）— **全部程式**。

### 牢籠
微幅搖晃（±2° 4s）、符號流動（E-06 遮罩）、荊棘波動（scale 呼吸）、被干擾（glitch 位移色偏）— **全部程式**。

### UI
hover 能量線流動、點擊下沉、購買閃青、技能圖示放大、數值滾動、結算計數、警告紅邊 — **全部程式**。

**需要生成式動畫的只有**：C-14（Nice）、C-01 待機影片（選用）、C-11 受擊（選用）、C-23 打字兩幀（選用）。

---

## 7. Decorative Assets（裝飾）

### D-01 Noxcat 牢籠（懸掛封印）
- 類型：後層（濃密）透明、前層（稀疏）黑底 screen、鎖鏈透明｜使用位置：畫面右上，取代 `.slot-nox`
- 功能：交代 Nox 被囚；**不得遮住 Nox 表情**
- 尺寸：後層 1024×1280 透明；前層 1024×1280 黑底；鎖鏈 256×768 透明
- **Prompt A**（後層）：`A hanging hexagonal cage made of glowing green wire and symbols, with ethereal thorns and warped lines around the outside, a red seal mark at the top and a broken chain rising above it. The front face is completely open and empty. Transparent background.`
- **Prompt A**（前層）：`Only three or four thin green wire lines and a few glowing nodes, forming the very sparse front face of a hexagonal cage. Minimal. Black background.`
- **Prompt B**（後層）：`[STYLE], a hanging geometric seal-cage seen from the front: hexagonal wireframe skeleton, terminal-green glyphs flowing along the bars, ethereal thorn spikes and warped lines around the outside, a red seal rune at the top, a dissolving chain rising from the top, the front face open and empty (nothing in front of the center), painterly dark fog behind the bars, on flat solid magenta background. Negative: [NEG], iron bars, prison, character inside, solid front bars`
- **Prompt B**（前層）：`[STYLE], only 3 to 4 thin green wire lines and a few glowing nodes forming the sparse front face of a hexagonal cage, very minimal, pure black background. Negative: [NEG], dense bars, character`
- 優先級：**Must Have**

### D-02 荊棘／尖刺層
包含於 D-01 後層；若需獨立波動可另出 1024×1280 黑底。優先級：Nice

### D-03 漂浮碎片組
- 類型：atlas，透明｜使用位置：魔王周圍、黑洞邊緣、牢籠周圍｜尺寸：512×512 atlas
- **Prompt A**：`An atlas of eight separate small floating debris pieces on a grid: broken stone chunks, metal shards and hollow wireframe cubes. Transparent background.`
- **Prompt B**：`[STYLE], an atlas of 8 separate small floating debris pieces on a grid: broken stone chunks, metal shards, hollow wireframe cubes, matte painted, on flat solid magenta background. Negative: [NEG], text, single large object`
- 優先級：Should Have

### D-04 遠景模組件（天線／管線／終端 ×4）
- 尺寸：各 512×1024，透明
- **Prompt A**：`Four separate ruined structures side by side: an antenna mast, a pipe stack, a terminal box and a broken support truss. Dark and precise. Transparent background.`
- **Prompt B**：`[STYLE], four separate modular ruin structures side by side: an antenna mast, a pipe stack, a terminal box, a broken support truss, matte painted with wireframe details, on flat solid magenta background. Negative: [NEG], ground, background scene`
- 優先級：Nice（E-02／E-03 已含）

### D-05 人造發光植物 ×2
- 尺寸：512×768，透明
- **Prompt A**：`Two artificial glowing plants with angular geometric leaves, dark green with bright green light along the edges. Transparent background.`
- **Prompt B**：`[STYLE], two artificial bioluminescent plants with angular geometric leaves, deep green bodies with terminal-green light along the leaf edges, on flat solid magenta background. Negative: [NEG], realistic foliage, flowers, soil`
- 優先級：Nice

### D-06 漂浮終端螢幕
- 尺寸：512×384，黑底 screen（內容由程式填 E-06）
- **Prompt A**：`A small floating holographic screen frame, tilted slightly, made of thin green lines. The screen area is empty. Black background.`
- **Prompt B**：`[STYLE], a small floating holographic terminal screen frame, slightly tilted, thin terminal-green lines, screen area left empty, pure black background. Negative: [NEG], text, readable content`
- 優先級：Nice

---

## 8. Ending / Result Assets（結局）

### R-01 結局構圖
**不出獨立插圖**，程式合成：
- great：C-13（魔王崩解）＋ C-27（Nox 舉筆電）＋ 披薩全藍 ＋ U-19 藍金橫幅
- win：C-05 ＋ C-22 ＋ U-19 藍
- lose：C-12（魔王勝利）＋ C-21 ＋ 披薩全紅 ＋ U-19 紅 ＋ V-08

優先級：Should（合成）

### R-02 幸福指數表盤
- 類型：半圓表盤，黑底 screen｜尺寸：1024×512（指針與數字由程式）
- **Prompt A**：`A semicircular gauge dial with red segments on the left half and blue segments on the right half, a thin outer arc and tick marks. No needle, no numbers. Black background.`
- **Prompt B**：`[STYLE], a semicircular gauge dial: left half red segments, right half blue segments, thin outer arc, tick marks, no needle, no numbers, pure black background. Negative: [NEG], numbers, needle, text`
- 優先級：Should Have

### R-03 結算數據列圖示
由 U-03 承擔。

### R-04 結局標題字
程式字型＋U-19 橫幅。不出圖。

---

## 9. Optional Polish Assets（加分）

| ID | 名稱 | 說明 | 優先 |
| --- | --- | --- | --- |
| O-01 | 開場三格 | 披薩店→拋向太空→魔王現身，三張 1536×864 | Nice |
| O-02 | Key Art | 完整宣傳圖 | Nice |
| O-03 | Nox 台詞頭像 | C-20～C-27 縮圖即可，不另出 | — |
| O-04 | 觸控回饋光點 | CSS 藍色漣漪 | CSS |
| O-05 | 字型 | 用開源字型（Noto Serif TC／Noto Sans TC），不生成 | — |
| O-06 | 載入畫面 | E-01 + LOGO + 黑洞旋轉，程式 | 程式 |
| O-07 | 魔王台詞框 | U-14 換色，程式 | 程式 |

**O-01 Prompt A**：`Three separate wide illustrations in sequence: a cozy pizza restaurant interior at night; the same restaurant torn from the ground and flung into space, splitting in half; and a giant clawed hand reaching out of a black hole above the wreckage.`
**O-01 Prompt B**：`[STYLE], three wide cinematic panels: 1) a cozy pizza restaurant interior at night, warm light, 2) the same restaurant torn from the ground and hurled into space, splitting in half, debris trailing, 3) a giant clawed hand reaching out of a black hole above the wreckage, dramatic low angle. Negative: [NEG], text, panel borders`

---

## A. Master Asset Checklist

| ☐ | ID | 名稱 | 類別 | 優先 |
| --- | --- | --- | --- | --- |
| ☐ | E-01 | 深空虛無底層 | Env | Must |
| ☐ | E-02 | 遠景廢墟剪影層 | Env | Must |
| ☐ | E-03 | 中景機械結構 ×2 | Env | Should |
| ☐ | E-04 | 玩家軌道／桌面 | Env | Must |
| ☐ | E-05 | 黑洞底座（外環／內環） | Env | Must |
| ☐ | E-06 | 資料流圖磚 ×2 | Env | Should |
| ☐ | E-07 | 深淵開口 | Env | Should |
| ☐ | C-01 | 魔王 Default ★錨定 | Char | Must |
| ☐ | C-02 | 魔王頭：思考 | Char | Should |
| ☐ | C-03 | 魔王頭：觀察 | Char | Should |
| ☐ | C-04 | 魔王頭：得意 | Char | Must |
| ☐ | C-05 | 魔王頭：不滿 | Char | Must |
| ☐ | C-06 | 魔王頭：驚訝 | Char | Should |
| ☐ | C-07 | 魔王頭：發怒 | Char | Must |
| ☐ | C-08 | 魔王頭：嘲諷 | Char | Should |
| ☐ | C-09 | 魔王：準備行動 | Char | Should |
| ☐ | C-10 | 魔王：執行技能 | Char | Must |
| ☐ | C-11 | 魔王：受到反制 | Char | Must |
| ☐ | C-12 | 魔王：結算勝利 | Char | Should |
| ☐ | C-13 | 魔王：結算落敗 | Char | Should |
| ☐ | C-14 | 魔王浮現（動畫） | Char | Nice |
| ☐ | C-20 | Nox Default | Char | Must |
| ☐ | C-21 | Nox 擔心 | Char | Must |
| ☐ | C-22 | Nox 開心 | Char | Should |
| ☐ | C-23 | Nox 敲鍵盤 | Char | Must |
| ☐ | C-24 | Nox 打瞌睡 | Char | Nice |
| ☐ | C-25 | Nox 驚醒 | Char | Should |
| ☐ | C-26 | Nox 成功解除 | Char | Must |
| ☐ | C-27 | Nox 結算開心 | Char | Nice |
| ☐ | C-30 | 玩家標記 | Char | Should |
| ☐ | P-01 | 盤面基底 ★錨定 | Pizza | Must |
| ☐ | P-02 | 餅皮扇形 ×3 | Pizza | Must |
| ☐ | P-03 | 調料圖騰 ×6 | Pizza | Must |
| ☐ | P-04 | 盤緣厚度底座 | Pizza | Must |
| ☐ | P-05 | 指針 | Pizza | Must |
| ☐ | P-06 | 南方操作框＋倒數槽 | Pizza | Must |
| ☐ | P-07 | 北方魔王影響區 | Pizza | Should |
| ☐ | P-08 | 西方結算標記 | Pizza | Nice |
| ☐ | P-09 | 小時刻度環 | Pizza | Should |
| ☐ | P-10 | 中心軸心 | Pizza | Nice |
| ☐ | P-11 | 價值徽章框 | Pizza | Nice |
| ☐ | U-01 | 浮空面板框 ★錨定 | UI | Must |
| ☐ | U-02 | 數值框 | UI | Must |
| ☐ | U-03 | HUD 圖示集 ×8 | UI | Must |
| ☐ | U-04 | 主按鈕 ×2 態 | UI | Must |
| ☐ | U-05 | 次要按鈕 | UI | Must |
| ☐ | U-06 | 操作按鈕框＋圖示 ×6 | UI | Must |
| ☐ | U-07 | 商店品項卡＋餅皮圖示 | UI | Should |
| ☐ | U-09 | Tooltip 框 | UI | Should |
| ☐ | U-10 | Nox 對話框 | UI | Should |
| ☐ | U-12 | 倒數弧形進度 | UI | Should |
| ☐ | U-14 | 魔王狀態框＋意圖圖示 ×4 | UI | Should |
| ☐ | U-15 | Nox 能量格 ×2 態 | UI | Must |
| ☐ | U-19 | 勝敗橫幅 ×3 | UI | Should |
| ☐ | U-20 | 四角裝飾件 | UI | Nice |
| ☐ | U-21 | LOGO 圖形 | UI | Must |
| ☐ | U-23 | PC 游標 ×2 | UI | Nice |
| ☐ | V-01 | 甜料爆光 sheet | VFX | Should |
| ☐ | V-02 | 辣椒污染 sheet | VFX | Should |
| ☐ | V-03 | Nox 淨化 sheet | VFX | Must |
| ☐ | V-04 | 餅皮轉換 sheet | VFX | Should |
| ☐ | V-05 | 黑洞粒子 atlas | VFX | Must |
| ☐ | V-06 | 魔王符文圈 sheet | VFX | Should |
| ☐ | V-09 | 結算光柱 | VFX | Nice |
| ☐ | D-01 | 牢籠 後層／前層／鎖鏈 | Deco | Must |
| ☐ | D-03 | 漂浮碎片 atlas | Deco | Should |
| ☐ | D-04 | 遠景模組件 ×4 | Deco | Nice |
| ☐ | D-05 | 發光植物 ×2 | Deco | Nice |
| ☐ | D-06 | 漂浮終端螢幕 | Deco | Nice |
| ☐ | R-02 | 幸福指數表盤 | End | Should |
| ☐ | O-01 | 開場三格 | Opt | Nice |
| ☐ | O-02 | Key Art | Opt | Nice |

統計：Must 28 項、Should 27 項、Nice 16 項（以「張」計 Must 約 45 張）。

---

## B. Priority Production Order

**第 0 批 · 錨定（先做，等確認才往下）**
P-01 盤面 → C-01 魔王 → U-01 面板框。這三張決定全部風格，之後所有生成都拿它們當參考圖。

**第一批：讓遊戲「換皮」立刻成立**
P-02 餅皮扇形 ×3 → P-03 調料圖騰 ×6 → P-04 盤緣底座 → P-05 指針 → P-06 南方框 → E-05 黑洞 → E-01 深空底層 → E-04 玩家軌道 → C-20 Nox → D-01 牢籠

**第二批：UI 系統**
U-02 數值框 → U-03 圖示集 → U-04 主按鈕 → U-06 操作按鈕 → U-05 次要按鈕 → U-15 Nox 能量格 → U-21 LOGO

**第三批：角色會動**
C-04／C-05／C-07 魔王三個核心頭部（一次 upgrade 產出）→ C-10／C-11 兩個核心動作 → C-21／C-23／C-26 Nox 三個核心狀態 → V-03 淨化 → V-05 粒子

**第四批：氛圍**
E-02 遠景 → E-06 資料流 → E-07 深淵開口 → E-03 中景 → D-03 碎片 → P-09 刻度環 → P-07 北方區

**第五批：剩餘表情、商店、結局**
其餘魔王頭部與動作 → 其餘 Nox 狀態 → U-07／U-09／U-10／U-12／U-14 → V-01／V-02／V-04／V-06 → U-19／R-02 → Nice 全部

---

## C. Reusable Asset Strategy

| 策略 | 適用 |
| --- | --- |
| **一張扇形，12 片共用** | P-02、P-03、P-06、P-07 全部只畫「朝上的一片」，程式旋轉 |
| **基底青色 + hue-rotate 換色** | U-01、U-02、U-06 框、U-14：青→藍（-20°）、青→紅（+160°）；金色單獨出圖 |
| **黑底 screen 疊圖** | 所有純光層：不需去背、可任意疊、可用 CSS 調亮度 |
| **頭部替換** | 魔王 7 個表情共用一具身體 |
| **一次 upgrade 產 8 變體** | `one-click-upgrade-run` 用於魔王表情組、Nox 狀態組 |
| **9-slice** | 所有框、按鈕、卡片；一張圖適用所有尺寸與螢幕 |
| **atlas** | 圖示、粒子、碎片各一張 |
| **鏡射** | E-02 左右、E-03 左右、U-20 四角 |
| **分層旋轉** | E-05 拆外環／內環反向轉，比生成影片省且無縫 |
| **遮罩流動** | E-06 圖磚同時當背景、魔王身體符號流、牢籠符號流、面板內紋 |
| **程式合成結局** | R-01 不出圖，用既有角色狀態拼 |
| **程式渲染所有文字與數字** | 圖片內零文字，換語言與改數值不用重出圖 |

---

## D. Prompt Consistency Rules
見第 0 節。摘要：

- **Prompt A（Meowa）**：一到三句自然語言，無負面詞，一致性靠 `--reference-image`。先跑最短版本，一次只加一個限制。
- **Prompt B（其他工具）**：`[STYLE]` 開頭、角色圖帶 `[BOSS-LOCK]`／`[NOX-LOCK]`、`[NEG]` 結尾、指定背景與鏡頭。
- 兩者共同：**圖內不得有任何文字或數字**；背景指定 magenta（要去背）或 black（發光疊圖）；批量時固定同一組參數；先產錨定圖再當參考。

---

## 附：對應目前程式的替換點

| 資產 | 目前程式位置 | 替換方式 |
| --- | --- | --- |
| E-01 | `#app` background | `<img>` 底層 |
| E-04、E-05、E-07 | 無 | 新增 `.stage` 前後圖層 |
| P-01～P-06 | `buildPizza()` 內的 SVG | 改為 `<div class="wheel">` 疊 `<img>`，保留 `renderPizza()` 的資料→顯示邏輯 |
| C-01～C-13 | `.slot-boss` | `<img id="boss-body">` + `<img id="boss-head">` |
| C-20～C-27、D-01 | `.slot-nox` | 三層 `<img>`（籠後、Nox、籠前） |
| C-30 | `.slot-cat` | `<img>` |
| U-01～U-06 | `.col-left` `.col-right` `.actions button` | CSS `border-image` 9-slice |
| U-15 | `#hud-nox` | 三格圖 |
| V-* | 無 | `<div class="fx">` sprite 動畫 |
