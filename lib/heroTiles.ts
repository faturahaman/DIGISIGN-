/**
 * Hero tiling-background data (Hyprland §8.1, ported).
 *
 * A faux tiling-WM desktop sits behind the hero: two tilted columns of
 * "workspaces", each a nested grid of colored bordered rounded rects. Most
 * tiles are just glowing outlines; the rest hide an image that fades in +
 * zooms when hovered.
 *
 * The tree is generated from a SEEDED PRNG (not Math.random) so the server and
 * client produce identical markup — no hydration mismatch, and the mosaic is
 * stable across renders. Generated once at module load.
 */

export interface HeroTile {
  color: string;
  /** Absolute path under /public. Only present on some tiles. */
  image?: string;
  /**
   * How the image should sit in its tile. Brand marks are square and get
   * `contain` so the logo stays whole; screenshots are wide and get `cover` so
   * they fill. Cropping a square logo to a rectangle cuts the mark in half,
   * which is the one thing a logo must never do.
   */
  fit?: "contain" | "cover";
}

/** One vertical stack of 1–2 tiles. */
export type TileGroup = HeroTile[];
/** A workspace = a row of 1–2 tile groups. */
export type Workspace = TileGroup[];
/** A column = a vertical run of workspaces. */
export type Column = Workspace[];

// Brand-tinted tile outline colours (amber / orange / violet family).
const COLORS = ["#F59E0B", "#FB923C", "#8B5CF6", "#A78BFA", "#F97316"];

/**
 * Brand marks, weighted to dominate the reveal. These are what the hero is
 * actually advertising, and they read instantly at tile size where a cropped
 * screenshot reads as noise.
 */
const LOGOS = ["/arvion.png", "/arvionmaskot.png"];

/**
 * Project imagery, kept as the occasional variation so the wall isn't only
 * logos. Two of the originals were dropped here: landingpage.jpg (300x168) and
 * banerdesain.jpg (275x183) are smaller than a tile is now wide, so they'd be
 * upscaled into a blur.
 */
const SHOTS = [
  "/portfolio-img/companyprofile.png",
  "/portfolio-img/kominfo.png",
  "/fotoModalLayanan/desainBaner.png",
  "/fotoModalLayanan/poster.jpg",
  "/cover.png",
];

/** Deterministic mulberry32 PRNG — same sequence every run for a given seed. */
function mulberry32(seed: number): () => number {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeColumn(rand: () => number): Column {
  const column: Column = [];

  // 3 workspaces per column, down from 4. Every count in this function was
  // reduced so the surviving tiles could grow — the wall read as busy because
  // it was subdividing the same area three levels deep.
  for (let w = 0; w < 3; w++) {
    const groups: Workspace = [];
    // 1–2 tile-groups, down from 1–3. Three groups split a column into slivers.
    const groupCount = 1 + (rand() > 0.55 ? 1 : 0);

    for (let g = 0; g < groupCount; g++) {
      const tiles: TileGroup = [];
      // Usually one tall tile; occasionally split in two.
      const tileCount = rand() > 0.65 ? 2 : 1;

      for (let ti = 0; ti < tileCount; ti++) {
        const color = COLORS[Math.floor(rand() * COLORS.length)];
        const hasImage = rand() > 0.55;
        // Drawn unconditionally to keep the PRNG sequence easy to reason about.
        // The threshold is low because the sample is small — only a handful of
        // tiles carry an image, so a nominal 75/25 split lands nowhere near it.
        // The seed is fixed, so the realised split is what actually ships and
        // was tuned against the generated output rather than the probability.
        const isLogo = rand() > 0.12;
        const pool = isLogo ? LOGOS : SHOTS;
        const image = pool[Math.floor(rand() * pool.length)];

        tiles.push({
          color,
          image: hasImage ? image : undefined,
          fit: hasImage ? (isLogo ? "contain" : "cover") : undefined,
        });
      }
      groups.push(tiles);
    }
    column.push(groups);
  }
  return column;
}

export interface HeroTileData {
  left: Column[];
  right: Column[];
}

/** Build the full left/right tile tree from a fixed seed (stable per build). */
export function getHeroTiles(): HeroTileData {
  const rand = mulberry32(0x9e3779b9);
  return {
    left: [makeColumn(rand), makeColumn(rand)],
    right: [makeColumn(rand), makeColumn(rand)],
  };
}
