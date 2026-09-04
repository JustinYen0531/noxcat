#!/usr/bin/env python3
"""Prepare one generated PNG for use as a game asset.

The image service occasionally returns a visible checkerboard instead of alpha.
This utility removes that flat preview background, resizes to the specification,
and saves an optimized PNG. It intentionally does not invent or redraw pixels.
"""

from __future__ import annotations

import argparse
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw


MODES = ("preserve", "light-key-flood", "light-key-all", "dark-key", "opaque")


def _light_background(rgb: np.ndarray) -> np.ndarray:
    minimum = rgb.min(axis=2)
    chroma = rgb.max(axis=2) - minimum
    return (minimum > 205) & (chroma < 12)


def _border_connected(candidate: np.ndarray) -> np.ndarray:
    height, width = candidate.shape
    mask = Image.fromarray(np.where(candidate, 255, 0).astype(np.uint8), "L")
    draw = ImageDraw.Draw(mask)

    border_points = []
    step = max(1, min(width, height) // 64)
    for x in range(0, width, step):
        border_points.extend(((x, 0), (x, height - 1)))
    for y in range(0, height, step):
        border_points.extend(((0, y), (width - 1, y)))
    border_points.extend(((0, 0), (width - 1, 0), (0, height - 1), (width - 1, height - 1)))

    for point in border_points:
        if mask.getpixel(point) == 255:
            ImageDraw.floodfill(mask, point, 128, thresh=0)

    return np.asarray(mask) == 128


def prepare(source: Path, target: Path, width: int, height: int, mode: str) -> None:
    image = Image.open(source).convert("RGBA")
    pixels = np.asarray(image).copy()
    rgb = pixels[:, :, :3].astype(np.int16)

    if mode == "light-key-flood":
        background = _border_connected(_light_background(rgb))
        pixels[:, :, 3][background] = 0
    elif mode == "light-key-all":
        pixels[:, :, 3][_light_background(rgb)] = 0
    elif mode == "dark-key":
        maximum = rgb.max(axis=2)
        chroma = maximum - rgb.min(axis=2)
        pixels[:, :, 3][(maximum < 18) & (chroma < 8)] = 0
    elif mode == "opaque":
        pixels[:, :, 3] = 255
    elif mode == "preserve":
        if pixels[:, :, 3].min() == 255:
            raise ValueError(f"{source} does not contain transparent pixels")
    else:  # pragma: no cover - argparse constrains this
        raise ValueError(f"Unsupported mode: {mode}")

    prepared = Image.fromarray(pixels, "RGBA")
    prepared = prepared.resize((width, height), Image.Resampling.LANCZOS)
    target.parent.mkdir(parents=True, exist_ok=True)
    prepared.save(target, format="PNG", optimize=True)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("source", type=Path)
    parser.add_argument("target", type=Path)
    parser.add_argument("width", type=int)
    parser.add_argument("height", type=int)
    parser.add_argument("--mode", choices=MODES, default="preserve")
    args = parser.parse_args()
    prepare(args.source, args.target, args.width, args.height, args.mode)


if __name__ == "__main__":
    main()
