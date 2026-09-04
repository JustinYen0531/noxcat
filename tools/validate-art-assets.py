#!/usr/bin/env python3
"""Static QA for the GPT Image 2 delivery listed in PROMPTS_GPT_IMAGE_2.md."""

from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
REVIEW_DIR = ROOT / "assets" / "review"
REVIEW_BG = (10, 9, 18, 255)


@dataclass(frozen=True)
class Asset:
    path: str
    size: tuple[int, int]
    transparent: bool
    preview_box: tuple[int, int]


ASSETS = (
    Asset("assets/char/C-01-boss-v2.png", (2048, 2048), True, (260, 260)),
    *(
        Asset(f"assets/char/C-{index:02d}-boss-{name}.png", (1024, 1024), True, (110, 110))
        for index, name in (
            (2, "thinking"), (3, "observing"), (4, "smug"), (5, "displeased"),
            (6, "surprised"), (7, "angry"), (8, "mocking"),
        )
    ),
    *(
        Asset(f"assets/char/C-{index:02d}-boss-{name}.png", (2048, 2048), True, (260, 260))
        for index, name in (
            (9, "ready"), (10, "casting"), (11, "countered"),
            (12, "victory"), (13, "defeat"),
        )
    ),
    Asset("assets/char/C-20-noxcat-v2.png", (1024, 1024), True, (120, 120)),
    *(
        Asset(f"assets/char/C-{index:02d}-noxcat-{name}.png", (1024, 1024), True, (120, 120))
        for index, name in (
            (21, "worried"), (22, "happy"), (23, "typing"), (24, "sleeping"),
            (25, "startled"), (26, "success"), (27, "celebrating"),
        )
    ),
    Asset("assets/pizza/P-01-wheel-v2.png", (2048, 2048), True, (240, 240)),
    Asset("assets/pizza/P-01b-player-v2.png", (2048, 2048), True, (240, 240)),
    Asset("assets/pizza/P-01c-boss-v2.png", (2048, 2048), True, (240, 240)),
    *(
        Asset(f"assets/pizza/P-03{letter}-{name}.png", (512, 512), False, (90, 90))
        for letter, name in (
            ("a", "sweet1"), ("b", "sweet2"), ("c", "sweet3"),
            ("d", "spicy1"), ("e", "spicy2"), ("f", "spicy3"),
        )
    ),
    Asset("assets/pizza/P-04-rim-v2.png", (2752, 1536), True, (360, 200)),
    Asset("assets/pizza/P-05-pointer-v2.png", (512, 2048), True, (55, 220)),
    Asset("assets/env/E-01-deep-space.png", (2560, 1440), False, (400, 225)),
    Asset("assets/env/E-02-distant-ruins.png", (3072, 768), True, (480, 120)),
    Asset("assets/env/E-04-player-platform.png", (2048, 1152), True, (400, 225)),
    Asset("assets/env/E-05-vortex.png", (2048, 2048), False, (240, 240)),
    Asset("assets/deco/D-01-cage-back.png", (1024, 1280), True, (128, 160)),
    Asset("assets/deco/D-01-cage-front.png", (1024, 1280), False, (128, 160)),
    Asset("assets/ui/U-01-panel-frame.png", (512, 512), True, (200, 200)),
    Asset("assets/ui/U-03-hud-icons.png", (1024, 512), True, (400, 200)),
    Asset("assets/ui/U-04-primary-button.png", (512, 160), True, (320, 100)),
    Asset("assets/ui/U-21-logo.png", (1024, 1024), True, (240, 240)),
)


def _validate_noxcat_palette(path: Path) -> str | None:
    """Reject vivid non-green accents in NOXCAT sprites.

    Low-saturation denim, greys and antialiasing are intentionally allowed.
    """
    with Image.open(path).convert("RGBA") as image:
        rgba = np.asarray(image)
        hsv = np.asarray(Image.fromarray(rgba[:, :, :3], "RGB").convert("HSV"))
    vivid = (hsv[:, :, 1] >= 100) & (hsv[:, :, 2] >= 50) & (rgba[:, :, 3] > 32)
    green = (hsv[:, :, 0] >= 30) & (hsv[:, :, 0] <= 105)
    vivid_count = int(vivid.sum())
    off_brand_count = int((vivid & ~green).sum())
    tolerance = max(16, vivid_count // 1000)
    if off_brand_count > tolerance:
        return f"palette: {path.relative_to(ROOT)} has {off_brand_count} vivid non-green pixels"
    return None


def validate() -> list[str]:
    errors: list[str] = []
    for asset in ASSETS:
        path = ROOT / asset.path
        if not path.exists():
            errors.append(f"missing: {asset.path}")
            continue
        with Image.open(path) as image:
            if image.size != asset.size:
                errors.append(f"size: {asset.path} is {image.size}, expected {asset.size}")
            alpha = image.convert("RGBA").getchannel("A")
            low, high = alpha.getextrema()
            if asset.transparent and not (low == 0 and high > 0):
                errors.append(f"alpha: {asset.path} has range {(low, high)}, expected transparency")
            if not asset.transparent and (low, high) != (255, 255):
                errors.append(f"alpha: {asset.path} has range {(low, high)}, expected opaque artwork")
        if "noxcat" in asset.path:
            palette_error = _validate_noxcat_palette(path)
            if palette_error:
                errors.append(palette_error)

    ruins = ROOT / "assets/env/E-02-distant-ruins.png"
    if ruins.exists():
        with Image.open(ruins).convert("RGBA") as image:
            left = image.width // 3
            right = image.width * 2 // 3
            if image.getchannel("A").crop((left, 0, right, image.height)).getextrema()[1] > 8:
                errors.append("layout: E-02 middle third is not fully empty")
    return errors


def _thumbnail(asset: Asset) -> Image.Image:
    image = Image.open(ROOT / asset.path).convert("RGBA")
    image.thumbnail(asset.preview_box, Image.Resampling.LANCZOS)
    return image


def make_review_sheet(assets: tuple[Asset, ...], target: Path, columns: int, cell: tuple[int, int]) -> None:
    font = ImageFont.load_default()
    rows = (len(assets) + columns - 1) // columns
    sheet = Image.new("RGBA", (columns * cell[0], rows * cell[1]), REVIEW_BG)
    draw = ImageDraw.Draw(sheet)
    for index, asset in enumerate(assets):
        x = (index % columns) * cell[0]
        y = (index // columns) * cell[1]
        thumb = _thumbnail(asset)
        px = x + (cell[0] - thumb.width) // 2
        py = y + 24 + (cell[1] - 34 - thumb.height) // 2
        sheet.alpha_composite(thumb, (px, py))
        label = Path(asset.path).stem
        draw.text((x + 8, y + 8), label, fill=(235, 240, 230, 255), font=font)
    target.parent.mkdir(parents=True, exist_ok=True)
    sheet.convert("RGB").save(target, format="PNG", optimize=True)


def main() -> None:
    errors = validate()
    if errors:
        for error in errors:
            print(f"FAIL {error}")
        raise SystemExit(1)

    character_assets = tuple(asset for asset in ASSETS if "/char/" in asset.path)
    other_assets = tuple(asset for asset in ASSETS if "/char/" not in asset.path)
    make_review_sheet(character_assets, REVIEW_DIR / "characters-at-game-size.png", 5, (300, 310))
    make_review_sheet(other_assets, REVIEW_DIR / "environment-ui-pizza-overview.png", 4, (520, 300))
    print(f"PASS {len(ASSETS)} prompt-table assets")
    print(f"review: {REVIEW_DIR / 'characters-at-game-size.png'}")
    print(f"review: {REVIEW_DIR / 'environment-ui-pizza-overview.png'}")


if __name__ == "__main__":
    main()
