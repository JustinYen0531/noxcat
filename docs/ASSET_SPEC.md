# NOXCAT 披薩時鐘 — 遊戲視覺資產需求文件（Asset Specification）

版本：2026-09-04 v1 ｜ 對應程式版本：v0.6（橫向）
Visual Theme：**Cyber Hell Ruins** ｜ Art Style：**全息線框呈現（方案 2）× 厚塗暗黑科幻材質（方案 3）**

> 本文件用途：盤點所有要正式生成的資產，並給每一項足夠的規格與 Prompt。

> ⚠️ **2026-09-04 更新：Prompt 格式已改。** 專案改用 Meowa `game-assets` skill 生成，該工具**禁止** diffusion 式 prompt（關鍵字堆疊、`Negative:` 區塊、重複品質詞）。
> 本文件第 0.3 節的 `[STYLE]` / `[NEG]` 字串**不再使用**，改用簡短自然語言，一致性靠 `--reference-image` 鎖定。
> 各資產條目底下的舊 Prompt 請當作**內容描述**參考，實際下指令時改寫成一到三句自然語言。
> 實際指令、參數與逐批流程見 **`ASSET_PIPELINE.md`**。
> 以下第 1～9 節的資產清單、尺寸、優先級、共用策略**全部仍然有效**。

---

## 0. 全域規則 — 即 D. Prompt Consistency Rules
（0.1、0.2、0.4～0.7 仍有效；0.3、0.8 的 prompt 格式已被 `ASSET_PIPELINE.md` 取代）

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
| Nox | Nox Cyan | `#5fe3e8` | Noxcat 相關（是玩家陣營的科技分支，偏青） |
| 魔王 | Overlord Red | `#ff3b3b` / 亮 `#ff8a66` | 魔王餅皮、辣椒、眼睛、矛尖、技能 |
| 中立 | Crust Bone | `#d9cfb4` / 暗 `#8e8468` | 無主餅皮、盤面基底 |
| 金 | Fate Gold | `#ffbf47` | 只用於「南方操作框」與「確認／主按鈕」，代表玩家的選擇權 |

象徵：藍＝清醒／控制；紅＝被控制／污染。**背景絕不使用藍或紅**，藍紅只出現在 gameplay 元素。

### 0.3 角色鎖定（每張角色圖都要帶）

**[BOSS-LOCK]**
`the Overlord: a giant black cat-demon seen only from the waist up, lower body dissolving into a black hole abyss; tall pointed ears, crown of jagged spikes, layered tattered cape edges; body is matte black with thin terminal-green glyph seams and dissolving pixel fragments at the edges; a red glowing diamond gem on the chest; narrow slit eyes glowing hard red; holding a long black spear with a red glowing blade in one hand; front three-quarter view, slight low angle`

**[NOX-LOCK]**
`Noxcat: A cute chibi black cat character closely matching the provided NOXCAT IP design, with a large head and small body, oversized bright lime-green eyes, tall pointed ears, and a friendly expressive face. The cat wears silver-and-black aviator goggles with translucent green lenses resting on its forehead, a black high-collar utility vest over a white short-sleeve shirt, and a small round lime-green cat emblem hanging from the front zipper. Black fur with subtle dark-gray highlights and lime-green accent details. Soft clean cel-shaded solid body, bold black outlines, slightly cartoonish game-character proportions, not realistic, not wireframe. Front view, eye level.`

**[STYLE]**（每個 Prompt 開頭）
`holographic wireframe rendering combined with painterly dark sci-fi textures; cyber hell ruins; deep void black background; thin terminal-green wire lines, glyphs and data points as air decoration; painterly volumetric fog; solid objects have matte painted surfaces with hard clean silhouettes; distant objects are translucent wireframes fading into darkness; high precision details against vast empty void; game-art readability, clean edges, no clutter on focal elements`

**[NEG]**（每個 Prompt 的負面詞）
`photorealistic, photo, blurry, low contrast, watermark, signature, text, letters, numbers, logo, extra limbs, deformed hands, neon rainbow, purple, pink, matrix rain, lens flare, glossy, oily, dripping cheese, food photography, cartoon food, clutter on focal element`

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
- 實體與半虛化層資產需要真透明：生成時指定 `on flat solid magenta background`（`#ff00ff`），後製去色鍵，或用生成工具的去背功能。
- 所有資產 PNG，尺寸為 2 的冪或指定值；圖示集合成 atlas。
- 不在圖片內生成任何文字、數字；所有文字由程式渲染。

### 0.8 每個 Prompt 的固定格式
```
[STYLE] + [角色鎖定(若有)] + 資產描述 + 構圖/鏡頭 + 背景指示 + 尺寸比例
Negative: [NEG] + 該資產額外負面詞
```

---

## 1. Environment Assets（環境）

### E-01 深空虛無底層
- 類型：靜態背景（全畫面）
- 使用位置：所有畫面最底層（取代目前 `#app` 的 CSS 星點）
- 功能：世界基底，不承載遊戲資訊
- 視覺：99% Void Black，極稀疏的白綠光點、極遠的月面弧線、一條斜向的稀薄綠霧帶，右上角隱約有廢棄軌道站剪影。留白要大。
- 尺寸：2560×1440（中央 1600×900 為安全區，四周可被裁）
- 透明：否
- 狀態版本：無
- 動畫：程式（視差 2%、星點 CSS 閃爍）
- Prompt：`[STYLE], vast empty deep space void, almost entirely black, a few sparse tiny white-green light points, a faint distant lunar horizon arc at the bottom right, a thin diagonal band of dim green fog, an abandoned orbital station silhouette far top right as translucent wireframe, extreme emptiness and loneliness, wide 16:9 composition, no focal object in the center. Negative: [NEG], busy, crowded, bright, nebula colors`
- 重用：所有畫面共用
- 優先級：**Must Have**

### E-02 遠景廢墟／月球基地剪影層
- 類型：靜態、寬幅、透明（可水平平移）
- 使用位置：底層之上、桌面之後，貼在畫面下半部水平線
- 功能：建立「遼闊 ↔ 精密」對比，遠景精密區
- 視覺：地平線上的廢墟基地群：斷裂的環形結構、天線、管線塔，全部是半虛化線框加薄霧，越遠越淡。中央 30% 寬度刻意留空（披薩在那裡）。
- 尺寸：3072×768，透明；左右邊緣可接續
- 透明：是
- 狀態版本：無
- 動畫：程式（視差 5%）
- Prompt：`[STYLE], distant horizon line of cyber hell ruins: broken ring structures, antenna towers, pipe stacks, a ruined lunar base, all rendered as translucent terminal-green wireframes with painterly dark fog inside, fading to nothing toward the far distance, the central third of the image left empty, ultra wide panoramic strip, on flat solid magenta background. Negative: [NEG], foreground objects, characters`
- 重用：左右鏡射可再用一次
- 優先級：**Must Have**

### E-03 中景機械結構（左、右）
- 類型：靜態、透明 ×2
- 使用位置：畫面左右邊緣，HUD 欄位後方
- 功能：高精密度區；框住畫面、把視線推向中央
- 視覺：斷裂的管線、閥門、纜線束、發光終端窗、一株人造發光植物。實體層厚塗，局部線框。左右不對稱。
- 尺寸：各 768×1440，透明
- 透明：是
- 狀態版本：無
- 動畫：程式（終端窗 CSS 閃爍）
- Prompt：`[STYLE], a vertical stack of ruined machinery at the left edge of frame: broken pipes, valves, cable bundles, a small glowing terminal window, an artificial bioluminescent green plant growing from a crack, matte painted solid surfaces with subtle wireframe details, dark, precise, right side of image empty, tall portrait strip, on flat solid magenta background. Negative: [NEG], symmetry, characters`（右側版本把 left 換成 right）
- 重用：可鏡射；小螢幕隱藏
- 優先級：Should Have

### E-04 玩家軌道／桌面
- 類型：靜態、透明
- 使用位置：披薩下方向遠方延伸，介於背景與披薩之間
- 功能：玩家的「桌面」；提供透視深度與立體感
- 視覺：從畫面底邊向上收窄的半透明平台，表面有細格線與流動資料槽，近處實體厚塗、遠處線框淡出，**不收斂為單點**，最後化為稀疏的點。邊緣有藍色細光帶（玩家側）。
- 尺寸：2048×1152，透明
- 透明：是
- 狀態版本：無
- 動畫：程式（格線向遠方流動的 CSS 位移、藍光帶呼吸）
- Prompt：`[STYLE], a floating player platform seen in strong perspective, wide at the bottom edge of the frame and narrowing toward the upper middle, surface with fine grid lines and shallow data channels, solid matte painted near the viewer, becoming translucent wireframe and dissolving into scattered points in the distance, never converging to a single vanishing point, a thin player-blue light strip along the near edge only, upper part of the image empty, on flat solid magenta background. Negative: [NEG], vanishing point, road, highway, rhythm game notes`
- 重用：唯一
- 優先級：**Must Have**

### E-05 黑洞靜態底座
- 類型：靜態、黑底（screen 疊圖）
- 使用位置：披薩正下方，比披薩大 1.6 倍
- 功能：披薩懸浮其上；魔王從此浮現
- 視覺：向內旋的深淵，環狀線框漩渦，內圈越暗、外圈綠白細線越密，邊緣有崩解的碎片與符號被拉向中心。中心純黑。
- 尺寸：1536×1536，純黑底
- 透明：否（screen 混合）
- 狀態版本：無
- 動畫：程式旋轉兩層（外環慢、內環快、反向），粒子見 V-05
- Prompt：`[STYLE], a top-down black hole vortex made of concentric spiraling terminal-green wire rings, rings denser and brighter toward the outer edge, pitch black at the center, small square fragments and glyph-like points being pulled inward along the spiral, painterly dark fog between the rings, perfectly centered, square composition, on pure black background. Negative: [NEG], bright center, sun, lens, orange`
- 重用：分成兩張（外環／內環）以程式反向旋轉
- 優先級：**Must Have**

### E-06 空氣裝飾資料流圖磚
- 類型：可平鋪圖磚、黑底
- 使用位置：背景中層、HUD 面板內、牢籠周圍
- 功能：高精密度空氣裝飾
- 視覺：稀疏的 0/1、原創符號、短線、節點、微型幾何，密度不均（有空洞區）。
- 尺寸：1024×1024，四方連續，純黑底
- 透明：否（screen）
- 狀態版本：兩張密度版本（疏／密）
- 動畫：程式（緩慢向上位移、局部閃爍）
- Prompt：`[STYLE], seamless tileable texture of sparse floating data glyphs: original abstract symbols, short dashes, small nodes, micro geometry, a few 0 and 1 shapes, uneven density with large empty gaps, thin 1–2px terminal-green lines and points only, on pure black background, seamless edges. Negative: [NEG], dense, matrix rain, readable words`
- 重用：全遊戲共用
- 優先級：Should Have

### E-07 魔王出現處的深淵開口
- 類型：靜態、黑底
- 使用位置：畫面頂部中央，魔王立繪後方
- 功能：交代魔王「從深淵長出來」；讓角色與背景接合
- 視覺：畫面上緣一道裂開的空間，裂縫內是黑洞邊緣的旋線，向下滴落符號碎片。
- 尺寸：1536×768，純黑底
- 透明：否（screen）
- 狀態版本：無
- 動畫：程式（碎片下落）
- Prompt：`[STYLE], a horizontal tear in space at the top center of frame, the rift edges made of dissolving pixel fragments and thin green wire, inside the rift a glimpse of a spiraling abyss, small glyph fragments dripping downward, the rest of the image black, wide composition, on pure black background. Negative: [NEG], character, face`
- 重用：唯一
- 優先級：Should Have

---

## 2. Character Assets（角色）

### 魔王資產策略
- 身體固定一張（C-01），**表情用頭部替換**（C-02～C-08），**動作用整張上半身替換**（C-09～C-13）。
- 所有魔王圖：畫布 2048×2048，角色置中偏上，腰部以下裁切，透明。頭部圖 1024×1024。
- 預設姿勢：**左手掌壓在桌面邊緣（畫面左下），右手在桌外持矛豎立（畫面右側）**，矛尖朝上超出畫面頂部。

### C-01 魔王 Default／待機（全身）
- 類型：角色立繪、透明
- 使用位置：取代 `.slot-boss`；置於 E-07 之前、披薩之後
- 功能：魔王常駐狀態
- 視覺：見 [BOSS-LOCK]；身體下緣崩解成碎片沉入黑洞；左手壓桌、右手持矛；表情平靜俯視。
- 尺寸：2048×2048，透明
- 狀態版本：見 C-02～C-13
- 動畫：程式（呼吸縮放 1%、縫隙符號用 E-06 遮罩流動、眼睛亮度呼吸）
- Prompt：`[STYLE], [BOSS-LOCK], default idle pose: left palm pressed on the edge of a floating table at the lower left, right arm outside the table holding the spear upright at the right side with the red blade exceeding the top of frame, calm dominant expression looking slightly down at the viewer, lower body dissolving into pixel fragments and dark fog below the waist, character centered slightly high, on flat solid magenta background. Negative: [NEG], legs, feet, full body, smiling, cute`
- Animation Prompt（選用，生成 4 秒無縫循環影片）：`seamless loop, static camera, [BOSS-LOCK] idle: very slow breathing, green glyph seams slowly flowing upward across the body, pixel fragments at the lower edge drifting down and fading, red eyes pulsing gently, cape edges barely swaying, no pose change, black background`
- 重用：所有頭部替換的底
- 優先級：**Must Have**

### C-02～C-08 魔王表情頭部（7 張）
共同規格：頭部＋頸部，1024×1024，透明，角度與 C-01 完全一致，替換時對齊耳尖。
Prompt 共同前綴：`[STYLE], [BOSS-LOCK], head and neck only, same angle as reference, cropped below the neck, on flat solid magenta background.`

| ID | 狀態 | 視覺 | 觸發時機（程式） | 優先級 |
| --- | --- | --- | --- | --- |
| C-02 | 思考 | 眼睛半瞇、一側眉角上抬、頭微側 | 每步魔王判定前 0.3s | Should |
| C-03 | 觀察玩家 | 眼睛正視鏡頭、瞳孔收細 | 玩家操作南方切片時 | Should |
| C-04 | 得意 | 嘴角上揚、眼睛彎、輕微仰頭 | 辣椒滲透成功、奪取餅皮 | **Must** |
| C-05 | 不滿 | 眉壓低、眼光變窄、耳後折 | 玩家清除辣椒、削弱餅皮 | **Must** |
| C-06 | 驚訝 | 眼睛放大、耳直立、嘴微張 | 玩家奪回魔王餅皮、Nox 解除危機 | Should |
| C-07 | 發怒 | 眼睛爆亮、尖刺放大、縫隙光轉紅 | 玩家領地 ≥ 7 或連續反制 | **Must** |
| C-08 | 嘲諷 | 半閉眼、歪嘴、頭略偏 | 玩家錢不足、餅皮被侵蝕歸零 | Should |

各自 Prompt 尾巴（接在共同前綴後）：
- C-02 `thinking: eyes half closed, one brow ridge raised, head slightly tilted, faint glyphs orbiting the temple`
- C-03 `observing the viewer: eyes fully open and locked forward, pupils narrowed to thin slits, still and predatory`
- C-04 `smug: corners of the mouth raised, eyes curved, chin slightly lifted, red gem brighter`
- C-05 `displeased: brow pressed down, eyes narrowed to thin lines, ears folded back, a few fragments flaking off`
- C-06 `surprised: eyes wide and round, ears straight up, mouth slightly open, glyph seams flickering`
- C-07 `furious: eyes blazing wide red, head spikes enlarged, all body seams turned red, fragments bursting outward`
- C-08 `mocking: one eye half closed, crooked grin, head tilted away, dismissive`

- 動畫：程式切換（交叉淡入 120ms）；C-07 加畫面紅邊震動（V-08）

### C-09～C-13 魔王動作（整張上半身，5 張）
共同規格：同 C-01 畫布與裁切，透明。

| ID | 狀態 | 姿勢 | 觸發 | 優先級 |
| --- | --- | --- | --- | --- |
| C-09 | 準備行動 | 右手矛微抬、左手離桌半握 | 魔王將撒辣椒的前 0.5s（北方切片預警） | Should |
| C-10 | 執行技能 | 左手掌向下壓向披薩、掌心紅色符文 | 撒辣椒、奪取、抽走整片 | **Must** |
| C-11 | 受到反制 | 上身後仰、左手抬起護身、碎片噴散 | Nox 解除、餅皮崩解、奪回 | **Must** |
| C-12 | 結算：勝利 | 雙手張開、矛橫舉、俯視 | 結局 lose | Should |
| C-13 | 結算：落敗 | 身體大半崩解成碎片、矛垂下、眼光暗 | 結局 great／win | Should |

Prompt 尾巴（接 `[STYLE], [BOSS-LOCK],` 之後，並加 `same canvas framing as the idle pose, on flat solid magenta background`）：
- C-09 `preparing to act: spear slightly raised, left hand lifted off the table and half closed, leaning forward`
- C-10 `casting: left palm pressed downward toward the viewer with a red glowing rune circle in the palm, spear planted, eyes blazing`
- C-11 `hit reaction: upper body recoiling backward, left arm raised defensively, body fragments bursting outward, seams flickering`
- C-12 `dominant victory: both arms spread wide, spear held horizontally, looking down triumphantly, gem blazing`
- C-13 `defeated: most of the body dissolved into drifting fragments, spear drooping, eyes dim, hunched`

- 動畫：C-10 配 V-06 符文圈；C-11 配位移震動；C-12／C-13 靜態
- Animation Prompt（C-11 選用）：`seamless 2 second clip, static camera, [BOSS-LOCK] recoils backward as if struck, fragments burst outward from the chest and fade, green seams flicker to red then back, black background`

### C-14 魔王從黑洞浮現（開場）
- 類型：生成影片或 8 幀序列，黑底
- 使用位置：遊戲開始前 2 秒過場（新增），之後定格為 C-01
- 功能：交代「魔王本身就是從深淵長出來的存在」
- 尺寸：1536×1536，8 幀或 3 秒影片
- 優先級：Nice to Have（可用程式：C-01 從下方位移淡入＋E-05 加速旋轉替代）
- Animation Prompt：`3 second clip, static camera, [BOSS-LOCK] rising from a top-down black hole vortex: first only two red eyes in the dark, then the spiked head, then the spear and both hands emerging and gripping the table edge, fragments streaming off the body, ends in the idle pose, black background`

### Noxcat 資產策略
- 螢幕上很小（牢籠內約 90–140px），所以**全部做整隻小圖**，不做頭部替換。
- 1024×1024，透明，正面平視，四周留白 15%。
- 表情狀態 8 張，其中打字類用同一張＋程式抖動做「快速輸入」。

### C-20～C-27 Noxcat 狀態（8 張）
共同 Prompt 前綴：`[STYLE], [NOX-LOCK], full body, sitting, centered with 15% margin, on flat solid magenta background.`

| ID | 狀態 | 視覺 | 觸發 | 優先級 |
| --- | --- | --- | --- | --- |
| C-20 | Default／看玩家 | 抱著全息筆電，看向鏡頭，微笑 | 常駐 | **Must** |
| C-21 | 擔心 | 眉下垂、耳後折、盯著披薩方向 | 玩家餅皮被侵蝕、錢 < 20 | **Must** |
| C-22 | 開心／得意 | 瞇眼笑、舉一隻手 | 餅皮轉換為玩家、結算加分 | Should |
| C-23 | 使用科技／敲鍵盤 | 低頭打字、螢幕發青光 | 採購階段（製作甜料）、Nox 處理前 | **Must** |
| C-24 | 打瞌睡 | 閉眼、頭點、zzz 用程式畫 | 連續 6 步玩家無操作 | Nice |
| C-25 | 被吵醒／發現問題 | 眼睛瞪大、耳直立、驚嘆 | 魔王撒技術摩擦到玩家餅皮 | Should |
| C-26 | 成功解除危機 | 比讚、螢幕彈出青色勾號 | Nox 處理成功 | **Must** |
| C-27 | 結算：開心舉筆電 | 舉高筆電、跳起 | 結局 great／win | Nice |

Prompt 尾巴：
- C-20 `holding a holographic laptop, looking at the viewer with a small friendly smile`
- C-21 `worried: brows drooping, ears folded back, looking off to the side, paws clutching the laptop`
- C-22 `happy and smug: eyes closed in a smile, one paw raised`
- C-23 `typing intently on the holographic laptop, head down, cyan screen light on the face`
- C-24 `dozing: eyes closed, head tilted, laptop sliding off the lap`
- C-25 `startled alert: eyes wide, ears straight up, mouth open, leaning forward`
- C-26 `triumphant thumbs up, laptop screen showing a glowing cyan check mark shape (no text)`
- C-27 `jumping with the laptop raised overhead, joyful`

- 動畫：全部程式（切換淡入、C-23 打字上下抖動 6fps、C-24 緩慢點頭）
- Animation Prompt（C-23 選用，2 幀）：`two-frame typing loop, [NOX-LOCK] typing on holographic laptop, paws alternate up and down, screen glyphs flicker, identical pose otherwise`

### C-30 玩家標記（取代 `.slot-cat`）
- 類型：圖示、黑底（screen）
- 使用位置：披薩南方外側
- 功能：標示玩家所在方位；第一人稱視角，不做角色
- 視覺：一個藍色符文三角＋兩條向披薩指去的細線，像瞄準標記
- 尺寸：256×256，純黑底
- 動畫：程式呼吸
- Prompt：`[STYLE], a small player-blue rune marker: an upward pointing triangle glyph with two thin converging lines, clean 2px lines, centered, on pure black background. Negative: [NEG], character`
- 優先級：Should Have

---

## 3. Pizza / Gameplay Assets（披薩與機制）

### 實作方式（先讀）
- 盤面（P-01）與所有扇形（P-02、P-03）是**純俯視**圖，程式用 `perspective(1400px) rotateX(15deg) rotate(θ)` 傾斜並旋轉。
- 盤緣厚度與底座（P-04）是**已傾斜視角**的靜態圖，不旋轉，放在盤面下方。
- 扇形圖統一在 1024×1024 畫布，圓心在畫布正中、扇形朝正上方（北），程式用 `rotate(-i×30°)` 排 12 片。

### P-01 盤面基底
- 類型：靜態、透明
- 使用位置：披薩旋轉層最底
- 功能：轉盤本體；12 片無主餅皮的基底
- 視覺：像賭場輪盤與時鐘的合體：外圈是霧面深色金屬環帶（Ruin Grey）刻 12 個細槽與 60 個小刻度，內圈是 Crust Bone 色的圓盤，12 條細分隔線。**工整、乾淨、無食物質感**，只在盤緣有一圈烤色暗示它曾是披薩。
- 尺寸：2048×2048，透明
- 狀態版本：無
- 動畫：程式旋轉
- Prompt：`[STYLE], top-down orthographic view of a circular game wheel that is a stylized pizza: outer matte dark grey metal rim band with 12 thin slots and 60 tiny tick marks like a roulette wheel, inner disc in pale bone-beige matte painted surface divided into 12 equal wedges by thin dark lines, a faint baked-brown ring at the rim edge, perfectly clean and geometric, no toppings, no cheese, no food texture, centered, square, on flat solid magenta background. Negative: [NEG], food, cheese, tomato, greasy, perspective, tilt, shadow`
- 重用：唯一
- 優先級：**Must Have**

### P-02 餅皮扇形（4 態）
- 類型：扇形覆蓋圖 ×4，透明
- 使用位置：疊在 P-01 上，每片依所有權切換
- 功能：領地辨識（核心資訊）
- 視覺：
  - P-02a 無主：透明（不需資產，露出 P-01）
  - P-02b 玩家：Player Blue 半透明厚塗填充，邊緣一條亮藍細線，內部極淡六角格
  - P-02c 魔王：Overlord Red 暗紅填充，邊緣紅線，內部極淡裂紋
  - P-02d 被抽走：純黑洞，邊緣崩解碎片，看得到下方黑洞
- 尺寸：1024×1024（扇形 30°，半徑 450px，圓心置中）
- 狀態版本：3 張（b/c/d）
- 動畫：程式（切換時用 V-04 閃光；被抽走時扇形向中心縮入）
- Prompt（b）：`[STYLE], a single 30-degree pie wedge pointing straight up, apex at the exact center of the canvas, radius 450px, filled with matte painted player-blue at 70% opacity with a faint hexagonal micro-grid, a thin bright blue edge line, clean hard edges, everything else transparent, on flat solid magenta background. Negative: [NEG], circle, full pizza, glow spill outside the wedge`
- Prompt（c）：同上，`dark red (#7a1010) with a faint crack texture, thin bright red edge line`
- Prompt（d）：`... wedge filled with pitch black, the edges crumbling into small square fragments, a few green wire spiral lines visible inside as if looking down into a black hole`
- 重用：12 片共用同一張，程式旋轉
- 優先級：**Must Have**

### P-03 調料圖騰（6 張）
- 類型：扇形覆蓋圖，**黑底 screen 疊圖**
- 使用位置：疊在 P-02 上
- 功能：短期事件辨識；等級用密度區分
- 內容關係：本項 6 張是三級玩家甜料／三級魔王辣料的**共用主圖騰**；`CONTENT_CATALOG.md` 的 30 種具體事件以名稱、說明與可選小符號區分，不需要各生成一張大型扇形圖。
- 視覺：不填滿扇形，只佔扇形外側 55%～85% 的環帶區，留出餅皮。
  - 玩家甜料（藍）：Lv1 三個發光節點連一條線；Lv2 五個節點成星狀網；Lv3 節點網＋外圈符文弧＋中心六芒微幾何
  - 魔王辣椒（紅）：Lv1 三道尖刺裂痕；Lv2 裂痕網＋紅色碎片；Lv3 裂痕佈滿環帶＋紅色荊棘弧＋中心紅色眼形符號
- 尺寸：1024×1024（扇形對齊 P-02），純黑底
- 狀態版本：6 張
- 動畫：程式（Lv3 節點閃爍；升級時 V-01／V-02）
- Prompt（玩家 Lv1）：`[STYLE], inside a 30-degree upward wedge zone between radius 250px and 400px from the canvas center, three small player-blue glowing nodes connected by one thin line, minimal, 2px lines, the rest of the canvas pure black. Negative: [NEG], filled shape, food`
- Prompt（玩家 Lv2）：`... five blue glowing nodes forming a small star-shaped network ...`
- Prompt（玩家 Lv3）：`... a dense blue node network, an outer rune arc, and a tiny hexagonal geometry at the wedge center, brightest ...`
- Prompt（魔王 Lv1）：`... three sharp red crack lines radiating outward ...`
- Prompt（魔王 Lv2）：`... a web of red cracks with a few red square fragments ...`
- Prompt（魔王 Lv3）：`... red cracks filling the band, a red thorn arc along the outer edge, a small red eye-shaped glyph at the center ...`
- 重用：12 片共用
- 優先級：**Must Have**

### P-04 盤緣厚度與底座（已傾斜視角）
- 類型：靜態、透明
- 使用位置：披薩旋轉層下方，不旋轉
- 功能：3D 感；讓盤面像實體放在桌上
- 視覺：從 15° 仰視看到的橢圓盤緣側面（深色金屬帶、下緣一圈微弱綠光），底下是懸浮支架的碎片，再往下接黑洞。
- 尺寸：2048×1280，透明（上半部留空給盤面）
- 動畫：程式（隨披薩旋轉時，側面刻痕用 CSS 背景位移模擬轉動）
- Prompt：`[STYLE], the side view of a thick circular game wheel seen from a low 15-degree angle: an elliptical dark matte metal rim showing its thickness with vertical groove marks, a faint terminal-green light line along the bottom edge, below it a few floating dissolving support fragments, the top face of the wheel is NOT shown (left empty), on flat solid magenta background. Negative: [NEG], top face, toppings`
- 優先級：**Must Have**

### P-05 指針
- 類型：靜態、透明
- 使用位置：披薩上方靜態層，指向北
- 功能：目前時間；魔王作用區的指示
- 視覺：像輪盤指針與時鐘分針的合體，霧面骨白色，尖端一點紅（魔王方向），根部圓形軸心
- 尺寸：256×1024，透明
- 動畫：程式（披薩每步停靠時指針輕微回彈）
- Prompt：`[STYLE], a slim game wheel pointer needle, matte bone white with painted texture, sharp tip with a tiny red glow at the top end, round dark hub at the bottom end, vertical, centered, on flat solid magenta background. Negative: [NEG], clock face`
- 優先級：**Must Have**

### P-06 南方玩家操作框
- 類型：扇形框 + 弧形倒數槽，黑底 screen
- 使用位置：南方位置靜態層
- 功能：玩家唯一可操作區；倒數
- 視覺：Fate Gold 扇形框線（2 條線，外粗內細），外側一條分段的弧形能量槽（12 段），程式依時間熄滅段數
- 尺寸：1024×1024，純黑底（扇形朝上，程式旋轉 180°）
- 動畫：程式（倒數段熄滅、停靠時整框閃一次）
- Prompt：`[STYLE], a 30-degree wedge frame pointing up, apex at center, made of two gold lines (outer 4px, inner 1px), outside the wedge arc a segmented 12-piece gold energy gauge arc, clean glowing gold, pure black background. Negative: [NEG], fill, blue, red`
- 優先級：**Must Have**

### P-07 北方魔王影響區
- 類型：扇形，黑底 screen
- 功能：魔王作用區的預警
- 視覺：紅色半透明扇形霧，邊緣紅色虛線，內部細碎裂紋
- 尺寸：1024×1024
- 動畫：程式（魔王準備行動時亮度上升）
- Prompt：`[STYLE], a 30-degree upward wedge filled with dim red fog and thin red dashed edge lines, faint crack lines inside, pure black background. Negative: [NEG], gold, blue`
- 優先級：Should Have（可用 CSS 漸層替代）

### P-08 西方結算區標記
- 類型：弧線＋符號，黑底 screen
- 視覺：綠白色點狀弧線＋一個小天平／齒輪符文
- 尺寸：512×512
- 動畫：程式（結算時符文旋轉一圈）
- Prompt：`[STYLE], a dotted terminal-green arc segment with a tiny abstract balance-scale rune at its middle, minimal, pure black background`
- 優先級：Nice to Have（可 CSS）

### P-09 小時刻度環
- 類型：靜態環，透明
- 功能：時鐘感；讀時間
- 視覺：12 個主刻度（菱形符文而非數字，數字由程式疊字）、60 個細刻度，Ruin Grey 上刻淡綠
- 尺寸：2048×2048，透明（環寬約 80px，內徑對齊 P-01 外緣）
- 動畫：無（不旋轉）
- Prompt：`[STYLE], a thin circular dial ring with 12 diamond-shaped rune marks and 60 tiny tick marks, matte dark grey metal with faint green engraved lines, inner area fully transparent, top-down, centered, on flat solid magenta background. Negative: [NEG], numbers, letters`
- 優先級：Should Have

### P-10 中心軸心
- 類型：靜態，透明
- 視覺：小圓形金屬軸＋中央紅綠雙色微光
- 尺寸：256×256
- 優先級：Nice to Have（可與 P-05 合併）

### P-11 餅皮價值徽章框
- 類型：小框 ×2（藍／紅），透明
- 功能：扇形上顯示價值數字的底框
- 尺寸：128×64
- 優先級：Nice to Have（CSS 即可）

---

## 4. UI / HUD Assets（介面）

### UI 系統定義
- 語言：**浮空投影面板**（純光層線框框線）＋**實體按鈕**（厚塗霧面板，像從廢墟拆下的控制鍵）。
- 所有框用 **9-slice** 切片，一張圖適用所有尺寸。
- 三種勢力變體透過 CSS `filter: hue-rotate` 由一張基底換色：基底做成**青色 (Nox Cyan)**，藍與紅由程式換色；金色版單獨出一張。
- 圖示一律單色線稿（白），程式上色。

### U-01 浮空面板框（9-slice）
- 類型：9-slice，透明
- 使用位置：左欄 HUD、右欄操作面板、採購面板、事件記錄
- 視覺：四角有符文角件、邊線 1px 加內側 0.5px 副線、頂邊中央一個小缺口作標題座，內部 6% 不透明深綠
- 尺寸：512×512（切片邊界 96px）
- 狀態版本：基底 1 張（程式換色）
- 動畫：程式（出現時掃描線由上而下）
- Prompt：`[STYLE], a holographic UI panel frame for a 9-slice: thin 1px cyan outer line with a 0.5px inner parallel line, small rune ornaments at the four corners, a small notch at the top center, interior filled with 6% opacity dark green, corners and edges designed to stretch, square, on flat solid magenta background. Negative: [NEG], text, icons inside`
- 重用：全部面板
- 優先級：**Must Have**

### U-02 數值框（9-slice）
- 類型：9-slice，透明
- 使用位置：DAY／TIME／CASH／NOX 四格、餅皮價值、採購摘要
- 視覺：細長膠囊，左端有圖示座，內部有軌道式細線刻度
- 尺寸：512×128
- 狀態版本：基底 1（換色）
- 優先級：**Must Have**

### U-03 HUD 圖示集
- 類型：atlas，透明，白色單色線稿
- 圖示：天數（月相符文）、時間（指針符文）、現金（菱形幣）、Nox 能量格、餅皮價值（層疊扇形）、領地數（12 格圓環）、生活成本（下箭頭鎖鏈）、庫存（方塊堆）
- 尺寸：每格 256×256，atlas 1024×512
- Prompt：`[STYLE], a set of 8 minimal white line icons on a grid, 2px strokes, game HUD style with rune-like geometry: a moon-phase symbol, a pointer needle symbol, a diamond coin, a three-cell energy bar, stacked pie wedges, a 12-segment ring, a downward arrow with a chain link, a stack of cubes; consistent stroke weight, on flat solid magenta background. Negative: [NEG], color, shading`
- 優先級：**Must Have**

### U-04 主按鈕（Fate Gold，9-slice，4 態）
- 使用位置：開始這一週、第 N 天、再過一週、繼續
- 視覺：厚塗霧面深色底、金色雙線框、左右兩端斜切、底部一條金色能量線
- 尺寸：512×160，切片 64px
- 狀態版本：normal / hover（能量線亮）/ pressed（整體下沉 2px、變暗）/ disabled（去飽和）→ 生成 normal 與 hover 兩張，其餘 CSS
- 動畫：程式（hover 能量線流動、點擊時金色閃）
- Prompt：`[STYLE], a wide game button for 9-slice: matte dark painted plate with chamfered left and right ends, a double gold outline, a thin gold energy line along the bottom edge, no text, on flat solid magenta background. Negative: [NEG], text, round`
- 優先級：**Must Have**

### U-05 次要按鈕（Ruin Grey，9-slice）
- 使用位置：暫停、回到開始畫面、關閉
- 視覺：同 U-04 結構但單線灰框、無能量線
- 尺寸：512×160
- 優先級：**Must Have**

### U-06 操作按鈕（6 個功能，同一框＋圖示）
- 類型：按鈕框 9-slice ×1（基底青色，程式換色）＋ 圖示 ×6
- 使用位置：右欄六顆操作鍵；商店三顆甜料鍵共用圖示
- 圖示：甜料Ⅰ（1 節點）、甜料Ⅱ（3 節點網）、甜料Ⅲ（節點網＋符文弧）、餅皮（扇形加上箭頭）、處理辣椒（Nox 青色掃描弧劃過紅裂紋）、賣出（扇形轉菱形幣）
- 尺寸：框 512×256；圖示 256×256
- 狀態版本：框 normal／hover 兩張；disabled 用 CSS
- 動畫：程式（觸發時圖示放大＋對應 VFX）
- Prompt（圖示）：`[STYLE], six minimal white line icons on a grid, 2px strokes: one glowing node; three nodes in a small network; a node network with an outer rune arc; a pie wedge with an upward arrow; a scan arc sweeping over crack lines; a pie wedge turning into a diamond coin; consistent style, on flat solid magenta background. Negative: [NEG], color`
- 優先級：**Must Have**

### U-07 商店品項卡（9-slice）＋餅皮圖示
- 使用位置：採購階段 7 個品項
- 視覺：直式小卡，頂部圖示座、中段價格座、底部庫存刻度（4 格）
- 圖示：餅皮（一張，四個等級用程式疊 1～4 個層疊線）
- 尺寸：卡 256×384；圖示 256×256
- 優先級：Should Have

### U-08 狀態 chip
- 目前的小標籤（無主／你的／魔王／辣椒／甜料）
- 建議：**不出圖**，用 CSS 膠囊＋色彩系統
- 優先級：Nice（CSS）

### U-09 提示行／Tooltip 框（9-slice）
- 視覺：極細框、左側一個小三角指示
- 尺寸：512×128
- 優先級：Should Have

### U-10 Nox 對話框
- 使用位置：採購階段的 Nox 台詞、Nox 處理成功時的短句
- 視覺：青色投影框，左下角一段折線尾巴指向牢籠，右上角小型 Nox 頭像座（用 C-20 縮圖）
- 尺寸：768×256，9-slice
- 動畫：程式（打字機出現、出現時輕微 glitch）
- 優先級：Should Have

### U-11 事件記錄面板
- 建議：用 U-01 換色 + CSS，**不單獨出圖**
- 優先級：CSS

### U-12 採購階段標題框＋倒數環
- 標題框：U-01 的頂邊缺口即標題座，不另出圖
- 倒數：**弧形進度條**，半圓 15 段，Fate Gold
- 尺寸：512×256，黑底 screen
- Prompt：`[STYLE], a semicircular segmented gold gauge with 15 segments, thin outer arc line, pure black background. Negative: [NEG]`
- 優先級：Should Have

### U-13 回合／時間顯示（半圓形時間刻度）
- 建議：由 P-09 小時刻度環與 P-05 指針承擔，HUD 內只放數字（U-02）。**不另出圖**。

### U-14 魔王狀態框
- 使用位置：畫面頂部中央，魔王立繪下緣（新增）
- 功能：顯示魔王「意圖」圖示（撒辣椒／奪取／抽走／突發支出）與領地數
- 視覺：紅色投影框、左右兩端向下的尖刺、中央圖示座
- 尺寸：768×128，9-slice
- 圖示：意圖 ×4（256×256 白線稿：裂紋、抓取的手、消失的扇形、破裂的幣）
- 優先級：Should Have

### U-15 Noxcat 狀態框（能量格）
- 使用位置：牢籠下方；HUD NOX 格
- 功能：Nox 今日剩餘處理次數（3 格）
- 視覺：三個青色六角能量格串成一列，滿格發光、空格只剩線框
- 尺寸：384×128，黑底 screen（滿／空各一張）
- 動畫：程式（消耗時該格閃滅）
- Prompt：`[STYLE], three hexagonal cyan energy cells in a row connected by thin lines, all filled and glowing, pure black background`（空格版：`all empty, outline only`）
- 優先級：**Must Have**

### U-16 玩家狀態框
- 由 U-02 承擔，不另出圖。

### U-17 對話框／Modal 框（暫停、確認）
- 由 U-01 放大承擔＋U-04／U-05 按鈕。不另出圖。

### U-18 結算畫面框
- 由 U-01 承擔；加一個**幸福指數表盤**（見 R-02）。

### U-19 勝／敗標題橫幅（3 張）
- 使用位置：結局標題後方
- 視覺：橫幅式能量帶，great＝藍金雙色、win＝藍、lose＝紅；兩端崩解成碎片；**不含文字**
- 尺寸：1536×256，黑底 screen
- Prompt：`[STYLE], a horizontal ceremonial energy banner made of thin glowing lines, both ends dissolving into fragments, no text, {blue and gold | blue | red} color, pure black background`
- 優先級：Should Have

### U-20 HUD 裝飾角件／符文框線
- 已包含在 U-01 角件內；額外出一組**獨立角件**（4 個）供螢幕四角裝飾
- 尺寸：256×256 ×1（程式鏡射四角）
- 優先級：Nice to Have

### U-21 標題 LOGO
- 使用位置：開始畫面
- 功能：品牌
- 視覺：「披薩時鐘」四字由**程式字型**渲染；資產只做 LOGO 圖形：一個傾斜的輪盤披薩被一根指針貫穿，下方黑洞旋線，上方兩點紅眼
- 尺寸：1024×1024，透明
- Prompt：`[STYLE], a game logo emblem without any text: a tilted stylized pizza wheel pierced by a long pointer needle, a small black hole spiral beneath it, two tiny red eyes glowing above it, gold and terminal-green lines, painterly matte disc, centered, on flat solid magenta background. Negative: [NEG], text`
- 優先級：**Must Have**

### U-22 開始畫面主視覺
- 建議：**不另出圖**，用 E-01 + E-05 + P 系列 + C-01 + C-20 程式合成，省一張大圖且風格必然一致。
- 優先級：Nice（若有時間再出一張 Key Art）

### U-23 PC 游標
- 視覺：藍色小三角符文＋一點
- 尺寸：64×64 ×2（normal／pointer）
- 優先級：Nice to Have

---

## 5. VFX Assets（特效）

VFX 一律生成在**純黑底**，用 screen 疊圖；序列圖用 4×4 sprite sheet。

| ID | 名稱 | 使用時機 | 視覺 | 尺寸 | 優先級 |
| --- | --- | --- | --- | --- | --- |
| V-01 | 甜料放置爆光 | 玩家放甜料／升級 | 藍色節點由中心擴散成短暫網格，0.4s | 1024×1024 sheet 4×4 | Should |
| V-02 | 辣椒污染擴散 | 魔王撒辣椒／升級 | 紅色裂紋從中心向外爬，末端碎片，0.5s | 1024×1024 sheet 4×4 | Should |
| V-03 | Nox 淨化掃描 | Nox 處理成功 | 青色掃描弧由左掃到右，紅裂紋被抹除，尾端青色碎光 | 1024×1024 sheet 4×4 | **Must** |
| V-04 | 餅皮轉換閃光 | 所有權改變 | 扇形整片白光一閃再轉為新色，邊緣線由內向外描 | 1024×1024 sheet 2×4 | Should |
| V-05 | 黑洞吸入粒子集 | 常駐 | 12 種小元素：方形碎片、短線、點、0/1、原創符號、細長光絲 | 512×512 atlas | **Must** |
| V-06 | 魔王技能符文圈 | 魔王執行技能 | 紅色雙環符文圈展開再收縮 | 1024×1024 sheet 4×4 | Should |
| V-07 | 金錢變化飄字底光 | 現金增減 | 程式文字＋一個小光斑 | 128×128 | Nice（程式） |
| V-08 | 警告紅邊 | 魔王發怒、餅皮即將歸零 | 畫面四邊紅色暈影脈動 | CSS | CSS |
| V-09 | 結算光柱 | 進入結局 | 一道由下而上的綠白光柱與符號上升 | 512×1536 sheet 1×8 | Nice |
| V-10 | 切片停靠震波 | 每步停靠 | 南方框一圈極細金色環擴散 | CSS | CSS |

Prompt 範例（V-03）：`[STYLE], sprite sheet 4x4 frames, a cyan holographic scan arc sweeping from left to right across a 30-degree wedge area, red crack lines beneath it being erased frame by frame, trailing cyan light fragments, consistent framing every cell, pure black background. Negative: [NEG], text, grid lines between cells`

Prompt（V-05）：`[STYLE], an atlas of 12 tiny separate elements on a grid: small square fragments, short dashes, dots, a 0 shape, a 1 shape, four original abstract glyphs, two thin light filaments; terminal green and white, 2–3px strokes, pure black background`

---

## 6. Animation Assets（動畫需求清單）

原則：**能用程式做的全部用程式**。只有「形狀本身要變」的才用生成動畫或幀序列。

### 魔王
| 動畫 | 做法 | 資產 | Animation Prompt |
| --- | --- | --- | --- |
| 待機呼吸／符號流動 | 程式：縮放 1%、E-06 遮罩在身體內向上流動、眼睛亮度 sin | C-01 + E-06 | （選用）見 C-01 |
| 思考 | 程式：頭部切 C-02＋幾個符號繞頭旋轉（V-05 元素） | C-02 | — |
| 抬手／準備 | 程式：切 C-09＋北方框 P-07 亮起 | C-09 | — |
| 放下調料 | 程式：切 C-10、掌心 V-06、北方切片播 V-02 | C-10 | — |
| 嘲諷 | 程式：切 C-08＋輕微左右搖 | C-08 | — |
| 發怒 | 程式：切 C-07、V-08、整體震動 6px 0.3s | C-07 | — |
| 受到反制 | 程式：切 C-11、後退 20px 回彈、碎片噴散（V-05） | C-11 | 見 C-11（選用） |
| 從黑洞浮現 | 生成影片或程式（C-01 自下方淡入＋E-05 加速） | C-14 | 見 C-14 |

### Noxcat
| 動畫 | 做法 | 資產 |
| --- | --- | --- |
| 待機 | 程式：上下浮動 3px | C-20 |
| 敲鍵盤／快速輸入 | 程式：C-23 上下抖動 6fps／12fps；螢幕青光閃 | C-23 |
| 打瞌睡／驚醒 | 程式：C-24 緩慢點頭 → 切 C-25 放大 1.15 回彈 | C-24、C-25 |
| 高興／啟動科技／成功解除 | 程式：切 C-22／C-23／C-26＋牢籠 glitch | 對應圖 |

### 披薩
| 動畫 | 做法 |
| --- | --- |
| 持續旋轉 | 程式：`rotateX(15°) rotate(θ)`，每步 +30°，緩動 0.5s；P-04 側面刻痕背景位移 |
| 停靠 | 程式：到位時回彈 2°、南方框 V-10 |
| 被污染 | 程式：P-02c 淡入＋V-02 |
| 被淨化 | 程式：V-03 → 移除 P-03 |
| 餅皮轉換 | 程式：V-04 → 換 P-02 |
| 調料生成／升級 | 程式：新 P-03 由 0 放大到 1＋V-01／V-02 |
| 被抽走 | 程式：扇形向圓心縮小 → 換 P-02d |

### 黑洞
| 動畫 | 做法 |
| --- | --- |
| 旋轉 | 程式：E-05 外環 60s／圈、內環 20s／圈反向 |
| 粒子／資料吸入 | 程式：V-05 元素從盤外隨機生成，沿螺旋向中心加速縮小消失 |
| 空間扭曲 | 程式：CSS `filter: blur` 漸層遮罩＋輕微 `scale` 呼吸；不出圖 |

### 牢籠
| 動畫 | 做法 |
| --- | --- |
| 微幅搖晃 | 程式：以懸掛點為軸 ±2° 4s 週期 |
| 符號流動 | 程式：E-06 遮罩在籠體內向下流 |
| 荊棘波動 | 程式：D-02 荊棘層 scale 呼吸 |
| 被科技干擾 | 程式：glitch 位移＋色偏 0.3s |

### UI
全部程式：hover 能量線流動、點擊下沉、購買時品項卡閃青、技能觸發圖示放大、數值變化滾動、結算數字計數、警告紅邊。

**需要生成式動畫的只有**：C-14（魔王浮現，Nice）、C-01 待機影片（選用）、C-11 受擊（選用）、C-23 打字兩幀（選用）。

---

## 7. Decorative Assets（裝飾）

### D-01 Noxcat 牢籠（懸掛封印）
- 類型：兩層：後層（濃密）透明、前層（稀疏）黑底 screen
- 使用位置：畫面右上，取代 `.slot-nox`
- 功能：交代 Nox 被囚；不得遮住 Nox 表情
- 視覺：懸掛在一條崩解鎖鏈下的幾何封印：六角形線框骨架、綠色符號在骨架上流動、外圍虛化尖刺與扭曲線條、頂端一枚紅色封印符文（魔王的）。**前層只有 3–4 條細線與幾個節點**。
- 尺寸：後層 1024×1280 透明；前層 1024×1280 黑底；鎖鏈 256×768 透明
- 狀態版本：常態／被科技干擾（前層 glitch 用程式）
- 動畫：程式（見上）
- Prompt（後層）：`[STYLE], a hanging geometric seal-cage seen from the front: hexagonal wireframe skeleton, terminal-green glyphs flowing along the bars, ethereal thorn spikes and warped lines around the outside, a red seal rune at the top, a dissolving chain rising from the top, the front face open and empty (nothing in front of the center), painterly dark fog behind the bars, on flat solid magenta background. Negative: [NEG], iron bars, prison, character inside, solid front bars`
- Prompt（前層）：`[STYLE], only 3 to 4 thin green wire lines and a few glowing nodes forming the sparse front face of a hexagonal cage, very minimal, pure black background`
- 優先級：**Must Have**

### D-02 荊棘／尖刺層
- 包含於 D-01 後層；若需獨立波動可另出 1024×1280 黑底
- 優先級：Nice

### D-03 漂浮碎片組
- 類型：atlas，透明
- 使用位置：魔王周圍、黑洞邊緣、牢籠周圍
- 視覺：8 種厚塗小碎片（石塊、金屬片、線框方塊）
- 尺寸：512×512 atlas
- 優先級：Should Have

### D-04 遠景模組件（天線／管線／終端）
- 4 個可重複擺放的模組，透明
- 尺寸：各 512×1024
- 優先級：Nice（E-02／E-03 已含）

### D-05 人造發光植物
- 2 株，透明，深綠＋終端綠光
- 尺寸：512×768
- 優先級：Nice

### D-06 漂浮終端螢幕
- 小型全息螢幕，黑底 screen，內容由程式填 E-06
- 尺寸：512×384
- 優先級：Nice

---

## 8. Ending / Result Assets（結局）

### R-01 結局構圖
- 建議：**不出獨立插圖**，用程式合成：
  - great：C-13（魔王崩解）＋ C-27（Nox 舉筆電）＋ 披薩全藍 ＋ U-19 藍金橫幅
  - win：C-05（不滿頭部）＋ C-22 ＋ U-19 藍
  - lose：C-12（魔王勝利）＋ C-21 ＋ 披薩全紅 ＋ U-19 紅 ＋ V-08
- 優先級：Should（合成）

### R-02 幸福指數表盤
- 類型：半圓表盤，黑底 screen
- 視覺：左紅右藍的半圓刻度，指針由程式旋轉，中央數字由程式渲染
- 尺寸：1024×512
- Prompt：`[STYLE], a semicircular gauge dial: left half red segments, right half blue segments, thin outer arc, tick marks, no needle, no numbers, pure black background`
- 優先級：Should Have

### R-03 結算數據列圖示
- 由 U-03 承擔。

### R-04 結局標題字
- 程式字型＋U-19 橫幅。不出圖。

---

## 9. Optional Polish Assets（加分）

| ID | 名稱 | 說明 | 優先級 |
| --- | --- | --- | --- |
| O-01 | 開場三格 | 披薩店→拋向太空→魔王現身，三張 1536×864 | Nice |
| O-02 | Key Art | 一張完整宣傳圖（若 U-22 合成不夠用） | Nice |
| O-03 | 每日 Nox 台詞頭像變體 | C-20～C-27 縮圖即可，不另出 | — |
| O-04 | 觸控回饋光點 | 手機點擊處藍色小漣漪，CSS | CSS |
| O-05 | 自訂字型 | 建議用現成開源字型（Noto Serif TC 標題、Noto Sans TC 內文），不生成 | — |
| O-06 | 載入畫面 | E-01 + LOGO + 黑洞旋轉，程式 | 程式 |
| O-07 | 魔王台詞框 | U-14 換色，程式 | 程式 |

---

## A. Master Asset Checklist

| ☐ | ID | 名稱 | 類別 | 優先 |
| --- | --- | --- | --- | --- |
| ☐ | E-01 | 深空虛無底層 | Env | Must |
| ☐ | E-02 | 遠景廢墟剪影層 | Env | Must |
| ☐ | E-03 | 中景機械結構 ×2 | Env | Should |
| ☐ | E-04 | 玩家軌道／桌面 | Env | Must |
| ☐ | E-05 | 黑洞靜態底座（外環／內環） | Env | Must |
| ☐ | E-06 | 資料流圖磚 ×2 | Env | Should |
| ☐ | E-07 | 深淵開口 | Env | Should |
| ☐ | C-01 | 魔王 Default | Char | Must |
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
| ☐ | P-01 | 盤面基底 | Pizza | Must |
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
| ☐ | U-01 | 浮空面板框 | UI | Must |
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

## B. Priority Production Order（Game Jam 實際生成順序）

**第一批：讓遊戲「換皮」立刻成立（1 天）**
1. P-01 盤面基底 → 2. P-02 餅皮扇形 ×3 → 3. P-03 調料圖騰 ×6 → 4. P-04 盤緣底座 → 5. P-05 指針 → 6. P-06 南方框
7. E-05 黑洞 → 8. E-01 深空底層 → 9. E-04 玩家軌道
10. C-01 魔王 Default → 11. C-20 Nox Default → 12. D-01 牢籠

到這裡遊戲畫面已經完全脫離 placeholder。

**第二批：UI 系統（半天）**
13. U-01 面板框 → 14. U-02 數值框 → 15. U-03 圖示集 → 16. U-04 主按鈕 → 17. U-06 操作按鈕框＋圖示 → 18. U-05 次要按鈕 → 19. U-15 Nox 能量格 → 20. U-21 LOGO

**第三批：角色會動（半天）**
21. C-04、C-05、C-07 魔王三個核心頭部 → 22. C-10、C-11 兩個核心動作 → 23. C-21、C-23、C-26 Nox 三個核心狀態 → 24. V-03 淨化、V-05 粒子

**第四批：氛圍（半天）**
25. E-02 遠景 → 26. E-06 資料流 → 27. E-07 深淵開口 → 28. E-03 中景 → 29. D-03 碎片 → 30. P-09 刻度環、P-07 北方區

**第五批：剩餘表情、商店、結局（有時間再做）**
31. 其餘魔王頭部與動作 → 32. 其餘 Nox 狀態 → 33. U-07、U-09、U-10、U-12、U-14 → 34. V-01、V-02、V-04、V-06 → 35. U-19、R-02 → 36. Nice 全部

---

## C. Reusable Asset Strategy（共用／換色／模組化）

| 策略 | 適用 |
| --- | --- |
| **一張扇形，12 片共用** | P-02、P-03、P-06、P-07 全部只畫「朝上的一片」，程式旋轉 |
| **基底青色 + hue-rotate 換色** | U-01、U-02、U-06 框、U-14：青→藍（-20°）、青→紅（+160°）；金色單獨出圖（hue-rotate 出不了乾淨的金） |
| **黑底 screen 疊圖** | 所有純光層：不需去背、可任意疊、可用 CSS 調亮度 |
| **頭部替換** | 魔王 7 個表情共用一具身體 |
| **9-slice** | 所有框、按鈕、卡片；一張圖適用所有尺寸與螢幕 |
| **atlas** | 圖示、粒子、碎片各一張 |
| **鏡射** | E-02 左右、E-03 左右、U-20 四角 |
| **分層旋轉** | E-05 拆外環／內環反向轉，比生成影片省且無縫 |
| **遮罩流動** | E-06 圖磚同時當背景、魔王身體符號流、牢籠符號流、面板內紋 |
| **程式合成結局** | R-01 不出圖，用既有角色狀態拼 |
| **程式渲染所有文字與數字** | 圖片內零文字，換語言與改數值不用重出圖 |

---

## D. Prompt Consistency Rules
見第 0 節（0.1～0.8）。所有生成一律：`[STYLE]` 開頭、角色圖帶 `[BOSS-LOCK]`／`[NOX-LOCK]`、`[NEG]` 結尾、指定背景（magenta 或 black）、指定鏡頭（0.4）、不含文字。批量生成時**固定同一個 seed 家族與相同的取樣參數**，並先生成 C-01 與 P-01 作為後續所有圖的風格參考圖（image reference）。

---

## 附：對應目前程式的替換點

| 資產 | 目前程式位置 | 替換方式 |
| --- | --- | --- |
| E-01 | `#app` background | `<img>` 底層 |
| E-04、E-05、E-07 | 無 | 新增 `.stage` 前後的圖層 |
| P-01～P-06 | `buildPizza()` 內的 SVG | 改為 `<div class="wheel">` 疊 `<img>`，保留 `renderPizza()` 的資料→顯示邏輯 |
| C-01～C-13 | `.slot-boss` | `<img id="boss-body">` + `<img id="boss-head">` |
| C-20～C-27、D-01 | `.slot-nox` | 三層 `<img>`（籠後、Nox、籠前） |
| C-30 | `.slot-cat` | `<img>` |
| U-01～U-06 | `.col-left` `.col-right` `.actions button` | CSS `border-image` 9-slice |
| U-15 | `#hud-nox` | 三格圖 |
| V-* | 無 | `<div class="fx">` sprite 動畫 |
