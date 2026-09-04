# GPT Image 2 提示詞總表

配合 `ASSET_SPEC.md` 使用。這份是**可直接複製貼上**的版本。

---

## §0 使用方法

### 0.1 每張圖的組裝公式

```
[主體描述] + [§1 風格區塊] + [構圖與背景] + [§2 禁止區塊]
```

四段都要貼。風格區塊和禁止區塊每張都一樣，複製即可。

### 0.2 GPT Image 2 的注意事項

- 它讀**完整句子**比讀逗號堆疊的關鍵字更準。下面的提示詞都寫成句子，不要再拆成關鍵字。
- 否定要用**肯定句表達**。不要寫「no table」，要寫「The character is alone in the frame with nothing around him」。模型對肯定敘述的服從度高很多。
- 想要一致性，**一定要上傳參考圖**，然後在提示詞第一句寫 `Match the art style of the attached reference image exactly.` 光靠文字描述鎖不住風格。
- 要透明背景就直接寫 `Transparent background.`，並在設定裡選 PNG。
- **一張圖只畫一個東西**。要六個圖騰就分六次，或明確寫「六個各自獨立、彼此不接觸、周圍留大量空白」。

### 0.3 三條鐵律（違反就要重做）

1. 圖內不得有任何文字、數字、標誌、浮水印。全部交給程式渲染。
2. 每張圖都要標明**遊戲內實際顯示尺寸**，並要求為該尺寸設計。
3. 每張圖只有主體，沒有桌子、地板、場景、介面、裝飾框。

---

## §1 風格區塊（每張都貼）

```
Art style: bold outlined cel-shaded game illustration. Thick black outlines around every shape, flat colour fills with one or two shading steps, crisp hard edges, no soft airbrushing, no photorealism, no visible brush texture. Dark cyber-ruin fantasy mood. Lighting is low-key with a single cool rim light. Clean, high-contrast, designed to stay readable when scaled down.
```

## §2 禁止區塊（每張都貼）

```
Strict rules: The image contains no text, no letters, no numbers, no logos, no watermarks and no signature of any kind. Nothing is written on any surface. Only the subject described above appears in the frame; there is no table, no floor, no furniture, no scenery, no user interface, no buttons, no health bars, no decorative border and no extra props. The subject does not touch or rest on anything.
```

## §3 色彩區塊（需要指定顏色時貼）

```
Colour rules: The world is black, charcoal grey, off-white and deep green. Terminal green (#91D500) is the only bright accent on NOXCAT and the Overlord. Player-owned things are bright blue (#3FA9FF). Enemy-owned things are burnt red (#FF3B3B). Never put blue or red on a character; never put green on a territory tile.
```

---

## §4 角色鎖定

### 魔王 Overlord（上傳 `Overlord.png` 當參考圖）

```
Match the character design and art style of the attached reference image exactly.
Subject: the Overlord, a black cat demon shown from the waist up. He has tall pointed ears, a crown of jagged black spikes, and a layered tattered cape. His body is matte black with thin glowing green seams running through it. His narrow eyes glow bright green, and there are green diamond gems on his forehead and on his chest. Below the waist his body breaks apart into small drifting fragments and fades out.
```

### NOXCAT（四張官方圖全部上傳，另上傳 C-01 作畫風參考）

```
Images 1–4 are the official NOXCAT references and control every identity, anatomy, face, clothing, colour and accessory detail. Image 5 is C-01 and controls only the dark jagged Overlord rendering style. Never replace an official NOXCAT detail with a detail from Image 5.

Subject: NOXCAT, a chibi black cat with an oversized head and small body. Preserve every visible identity feature: two tall pointed ears; huge round lime-green irises with black pupils and large white catchlights; two separate thick light-grey teardrop-shaped eyebrows clearly visible below the goggles; a small light-grey triangular nose; three outward cheek-fur points on each side; silver-framed aviator goggles with two green lenses, centre bridge, hinges and black strap; a black high-collar sleeveless utility vest with centre zipper, two rectangular flap chest pockets and ribbed hem; a round silver-rimmed chest badge with a #91D500 face and the original black cat-head emblem with two white eyes; white long sleeves; black paws with light-grey pads; loose dark charcoal-blue jeans; black low-top sneakers with white soles and stripe details; and one long black tail ending in the same angular arrow/spade tip shown in the turnaround reference.

Style: keep NOXCAT cute, streetwise, exploratory and clever, while translating him into C-01's rough hand-inked black outlines, angular cel-shaded planes, deep matte shadows, weathered edges and restrained green energy glints. He must feel native to the Overlord's game world without becoming a generic demon cat.

Colour compliance: #91D500 is the only saturated accent hue, used for eyes, goggle lenses, badge and restrained technology glow. All other colours stay within #101820, #F6F6F6, #DAD9D7, #B2B2B2 and subdued charcoal denim. No cyan, blue, red, orange, purple, pink or brown accent.

Strict exclusions: no missing or hidden eyebrows, no tiny green pupils inside large white eyeballs, no changed goggles, clothing, chest badge or tail tip, no generic cat redesign, no clean vector mascot finish, no altered NOXCAT name or mark, no text, letters, numbers, watermark, adult content, gore, abuse, self-harm, gambling, politics, religion, race or nationality messaging, scams, investment or exchange interfaces, drugs, tobacco, alcohol, weapon promotion, defamation, token, NFT or blockchain asset imagery, endorsement claims, merchandise mockups or extra characters.
```

> 品牌規範：黑貓身形、螢光綠大眼、額前護目鏡、綠色為唯一強調色，四項缺一不可。灰色雙眉、服裝、胸章與尖角尾端也必須依官方四張參考圖保留。角色名稱一律用 NOXCAT，不可簡寫或改名。若與《NOXCAT 素材使用授權》衝突，以授權條款為準。

---

## §5 逐張提示詞

每條的開頭都先貼 §1，結尾都先貼 §2。「實際尺寸」那句直接寫進提示詞裡。

### P-01 披薩盤面（中立）｜2048×2048｜遊戲內約 600px

```
Subject: a round pizza built like a precision instrument dial, seen from directly above in a flat top-down view with no perspective. A thick golden-brown baked crust ring runs around the outside. Just inside it sits a narrow dark metal band engraved with fine tick marks. The inner disc is pale cheese-coloured and is divided into twelve equal slices by clean straight cut lines radiating from the exact centre. A small round metal hub sits at the centre. The surface of every slice is completely blank and empty.
Composition: perfectly centred and symmetrical, filling the frame, square image. This asset is displayed about 600 pixels wide in game, so keep the tick marks bold enough to read at that size.
Background: transparent.
```

### P-01b 玩家版｜P-01c 魔王版｜同上尺寸

先產出 P-01，**上傳 P-01 當參考圖**，再跑這兩條：

```
Match the attached reference image exactly: same size, same position, same twelve slices, same golden crust ring, same metal tick band, same centre hub. Change one thing only: every one of the twelve slices is now filled with glowing blue energy with a faint hexagonal pattern. The crust, the metal band and the hub are unchanged.
Background: transparent.
```

```
Match the attached reference image exactly: same size, same position, same twelve slices, same golden crust ring, same metal tick band, same centre hub. Change one thing only: every one of the twelve slices is now dark burnt red, scorched, with thin glowing red cracks running through it. The crust, the metal band and the hub are unchanged.
Background: transparent.
```

### P-04 盤緣側面｜2752×1536｜遊戲內約 600px 寬

```
Subject: the thick side edge of the same round pizza dial, seen from a low angle so the dial reads as a flattened ellipse. Show the golden crust and the dark metal band thickness, with vertical groove marks cut along the metal. A faint green light line runs along the bottom edge of the metal.
Composition: the dial sits in the lower half of the frame and the upper half is empty. Wide landscape image. Only the near side edge is shown; the flat top surface of the dial is not visible.
Background: transparent.
```

### P-05 指針｜512×2048｜遊戲內約 220px 高

```
Subject: a single slim clock pointer needle standing straight up and pointing to the top of the frame. It has a dark metal body with a bone-white face, a sharp tip that glows faintly green, and a small round dark hub at its base.
Composition: the needle is centred horizontally and runs almost the full height of a tall narrow image. This asset is displayed about 220 pixels tall in game, so keep it a simple bold shape.
Background: transparent.
```

### P-03 調料圖騰（六張，分六次生成）｜各 512×512｜遊戲內約 90px

六張共用這個開頭，替換掉「Subject」那一句：

```
Subject: <見下表>
Composition: one single emblem, centred, filling most of the square frame, with empty space around it. This asset is displayed only about 90 pixels wide in game, so use thick bold strokes and a simple silhouette with very little internal detail.
Background: solid pure black, completely flat, with no gradient and no coloured haze. (這張用 screen 疊圖，所以要黑底不要透明)
```

| 檔名 | Subject 那一句 |
| --- | --- |
| P-03a 甜料Ⅰ | `a single glowing blue node with a short line beneath it, like a simple energy pin` |
| P-03b 甜料Ⅱ | `a small network of five glowing blue nodes joined by straight lines` |
| P-03c 甜料Ⅲ | `a dense network of glowing blue nodes joined by lines, surrounded by a decorative glowing arc ring` |
| P-03d 辣料Ⅰ | `three sharp glowing red crack lines radiating outward from a single point` |
| P-03e 辣料Ⅱ | `a web of glowing red cracks with a few small broken fragments floating around it` |
| P-03f 辣料Ⅲ | `a dense mass of glowing red cracks with a ring of sharp thorns around the outside` |

### E-05 黑洞漩渦｜2048×2048｜遊戲內約 900px

```
Subject: a black hole vortex seen from directly above. Concentric spiralling arms of dark mist and glowing green light wind inward toward a pure black core at the exact centre. Small fragments and glowing specks are being pulled inward along the spiral arms.
Composition: perfectly centred and radially symmetrical, filling the square frame. It will be rotated by code, so the design must look correct at any rotation angle.
Background: solid pure black. (screen 疊圖用)
```

### C-01 魔王待機｜2048×2048｜遊戲內約 260px 高

貼 §4 魔王鎖定，然後：

```
Pose: he holds his long spear upright in the hand on the right side of the image. His other hand is raised in front of him, palm down and fingers spread, as if resting on something invisible.
Composition: centred, waist-up, filling most of the frame. This asset is displayed only about 260 pixels tall in game, so keep the silhouette bold and readable and avoid fine detail that will disappear.
Background: transparent.
```

### C-02～C-08 魔王表情（七張頭部）｜各 1024×1024｜遊戲內約 110px

先產出 C-01，**上傳 C-01 當參考圖**，七次各跑一條：

```
Match the attached reference image exactly: same character, same art style, same head angle, same colours. Crop to show only his head and neck. Change only his expression, as follows: <見下表>
Composition: head centred, filling the frame. This asset is displayed only about 110 pixels wide in game, so the expression must be readable from the eyes and ear position alone.
Background: transparent.
```

| 檔名 | 表情句 |
| --- | --- |
| C-02 思考 | `his eyes are half closed and his head is tilted slightly to one side` |
| C-03 觀察 | `his eyes are wide open and locked straight on the viewer, pupils narrowed to thin slits` |
| C-04 得意 | `the corners of his mouth are raised, his eyes are curved, and his chin is lifted` |
| C-05 不滿 | `his brow is pressed down, his eyes are narrowed to thin lines, and his ears are folded back` |
| C-06 驚訝 | `his eyes are wide and round, his ears are straight up, and his mouth is slightly open` |
| C-07 發怒 | `his eyes blaze wide and bright, his head spikes are enlarged, and every seam on him glows fiercely` |
| C-08 嘲諷 | `one eye is half closed, he wears a crooked grin, and his head is tilted away dismissively` |

### C-09～C-13 魔王動作（五張全身）｜各 2048×2048｜遊戲內約 260px

同樣上傳 C-01 當參考圖：

```
Match the attached reference image exactly: same character, same art style, same colours, same framing and same canvas position. Change only his pose, as follows: <見下表>
Composition: centred, waist-up. This asset is displayed only about 260 pixels tall in game, so keep the pose readable as a silhouette.
Background: transparent.
```

| 檔名 | 姿勢句 |
| --- | --- |
| C-09 準備行動 | `he leans forward, his spear is raised slightly, and his open hand is lifted and half closed` |
| C-10 執行技能 | `he presses his open palm downward toward the viewer, and a glowing rune circle burns in that palm` |
| C-11 受到反制 | `he recoils backward, his free arm raised defensively, and fragments burst outward off his body` |
| C-12 結算勝利 | `both arms are spread wide, his spear held out horizontally, and he looks down in triumph` |
| C-13 結算落敗 | `most of his body has dissolved into drifting fragments, his spear droops, and his glow is dim` |

### C-20 NOXCAT 待機｜1024×1024｜遊戲內約 120px ⚠️ 最小的角色

貼 §4 NOXCAT 鎖定，然後：

```
Pose: he sits cross-legged holding a small glowing green laptop on his lap, looking at the viewer with a friendly confident smile.
Composition: the character alone, centred, filling most of the frame. This asset is displayed only about 120 pixels tall in game, which is very small. Design it like an icon: use a very thick black outline around the whole character, big simple shapes, almost no small internal detail, and a bright pale rim light along the top of his head and shoulders so he separates clearly from a dark background. His eyes should be large enough to still read as green at that size.
Background: transparent.
```

### C-21～C-27 NOXCAT 狀態（七張）｜各 1024×1024｜遊戲內約 120px

上傳 C-20 與四張官方 NOXCAT 圖當參考圖：

```
Match the attached reference image exactly: same character, same art style, same thick outline, same colours, same framing. Change only his pose and expression, as follows: <見下表>
Identity lock: keep the two separate light-grey eyebrows visible in every expression; keep the official huge green eye construction, goggles, cheek fur, grey nose, vest, zipper, two pockets, round chest badge, white sleeves, paw pads, jeans, shoes and angular-tipped tail. #91D500 remains the only saturated hue. A startled expression may open the eyelids wider but must never shrink the green irises into tiny pupils inside large white eyeballs.
Composition: same as the reference. This asset is displayed only about 120 pixels tall in game, so keep it icon-simple and readable.
Background: transparent.
```

| 檔名 | 動作句 |
| --- | --- |
| C-21 擔心 | `his brows droop, his ears fold back, and he clutches the laptop while looking off to the side` |
| C-22 開心 | `his eyes are closed in a happy smile and one paw is raised in the air` |
| C-23 敲鍵盤 | `he leans over the laptop typing with both paws, head down, his face lit green by the screen` |
| C-24 打瞌睡 | `his eyes are closed, his head tilts to one side, and the laptop slides off his lap` |
| C-25 驚醒 | `his eyes are wide, his ears shoot straight up, his mouth is open and he leans forward in alarm` |
| C-26 成功解除 | `he gives a confident thumbs up, and a large glowing check mark shape fills the laptop screen` |
| C-27 結算開心 | `he jumps into the air holding the laptop raised above his head, delighted` |

### D-01 NOXCAT 牢籠｜1024×1280｜遊戲內約 160px

**要分兩張生成，否則會擋住角色的臉。**

後層（畫在角色背後）：
```
Subject: a hanging hexagonal cage made of glowing green wire and floating symbols, with ethereal thorn spikes and warped lines around its outside, a red seal mark at the top, and a broken chain rising from its top point.
Composition: seen from the front. The entire front face of the cage is left completely open and empty, so that a character placed in front of this image is never covered. All the structure sits at the back, the sides and the top. Tall portrait image.
Background: transparent.
```

前層（畫在角色前面）：
```
Subject: only three or four thin glowing green wire lines and a handful of small glowing nodes, forming an extremely sparse front face of a hexagonal cage. Almost the entire image is empty.
Composition: tall portrait image, the same proportions as the back layer.
Background: solid pure black. (screen 疊圖用)
```

### E-01 深空背景｜2560×1440｜滿版

```
Subject: an almost completely empty deep-space background. A few sparse tiny white-green stars, a faint pale arc of a distant lunar horizon low on the right, and one thin diagonal band of dim green fog.
Composition: wide landscape. The centre of the image must stay empty and very dark, because gameplay elements sit on top of it. Extreme emptiness and loneliness.
Background: not transparent; the background is the artwork.
```

### E-02 遠景廢墟｜3072×768｜橫向平鋪

```
Subject: a distant horizon line of ruined machinery: broken ring structures, antenna towers, pipe stacks and a collapsed lunar base, all drawn as faint translucent green wireframes that fade into darkness the further away they are.
Composition: an ultra-wide horizontal strip. The middle third of the image is left completely empty. The left and right edges should be able to tile against each other.
Background: transparent.
```

### E-04 玩家軌道｜2048×1152

```
Subject: a floating platform seen in strong perspective, wide across the bottom edge of the frame and narrowing as it recedes toward the upper middle. Fine grid lines and shallow data channels run along its surface. It is solid and matte near the viewer, and becomes a translucent wireframe that dissolves into scattered points in the distance. A thin blue light strip runs along the near edge only.
Composition: the platform occupies the lower half; the upper half is empty. Important: the receding lines never meet at a single vanishing point, they simply fade out into nothing.
Background: transparent.
```

### U-01 面板框｜512×512｜9-slice

```
Subject: a holographic user-interface panel frame. A thin green outer line with a second finer line just inside it, small angular rune ornaments at the four corners, and a small notch at the top centre. The interior is filled with a very faint dark green tint and is otherwise completely empty.
Composition: square, the frame touching the edges of the image. It will be sliced into nine pieces and stretched, so the corners must be distinct and the straight edges must be uniform and repeatable.
Background: transparent.
```

### U-04 主按鈕｜512×160｜9-slice

```
Subject: a wide game button plate made of dark matte material, with chamfered left and right ends, a double gold outline, and a thin gold energy line running along its bottom edge. The face of the button is completely blank.
Composition: wide and short, the plate touching the left and right edges. It will be sliced into nine pieces and stretched horizontally, so the two ends must be distinct and the middle must be uniform.
Background: transparent.
```

### U-03 HUD 圖示集｜1024×512｜每個約 40px ⚠️ 非常小

```
Subject: eight simple white line icons for a science-fiction game interface, laid out evenly in two rows of four on a grid, all sharing the same stroke weight: a crescent moon; a pointer needle; a diamond-shaped coin; a three-cell battery bar; three stacked pie wedges; a ring divided into twelve segments; a downward arrow with a chain link; and a stack of cubes.
Composition: each icon sits alone in its own cell with clear empty space around it and never touches another icon. Each icon is displayed only about 40 pixels wide in game, so each must be an extremely simple bold shape with no fine detail.
Background: transparent.
```

### U-21 LOGO｜1024×1024

```
Subject: a game logo emblem with no text at all. A tilted round pizza dial is pierced through by a long pointer needle. A small spiral vortex sits beneath it, and two small glowing green eyes watch from above it. Rendered in gold and green lines over a dark matte disc.
Composition: centred, symmetrical, square.
Background: transparent.
```

---

## §6 驗收清單（每張生成完都跑一遍）

1. **縮到遊戲實際尺寸看**。把圖縮到上面標的像素數，貼在 `#0A0912` 深色底上看。糊掉就退回重做，不要拿 2048px 的預覽當標準。
2. **檢查有沒有文字數字**。有就重做。
3. **檢查有沒有多餘物件**。桌子、地板、介面、外框，有就重做。
4. **檢查透明度**。該透明的要真的透明，不能是深色方塊。
5. **並排比對風格**。跟 C-01 魔王擺在一起，線條粗細與上色方式要同一套。

縮圖檢查可以直接跑：

```bash
python -c "from PIL import Image; im=Image.open('你的圖.png').convert('RGBA'); im.thumbnail((120,120)); bg=Image.new('RGBA',(240,240),(10,9,18,255)); bg.alpha_composite(im,(60,60)); bg.convert('RGB').save('check.png')"
```

---

## §7 生成順序

1. **C-01 魔王** — 先做，它是所有圖的風格參考
2. **P-01 披薩中立** — 再做，之後 P-01b／P-01c 都拿它當參考
3. P-01b 玩家藍、P-01c 魔王紅、P-04 盤緣、P-05 指針、E-05 黑洞
4. C-20 NOXCAT、D-01 牢籠兩層
5. P-03 調料六張
6. E-01 背景、E-04 軌道、E-02 遠景
7. U-01 面板框、U-04 按鈕、U-03 圖示、U-21 LOGO
8. C-02～C-08 魔王表情、C-21～C-27 NOXCAT 狀態
