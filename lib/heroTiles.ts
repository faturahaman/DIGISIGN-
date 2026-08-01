/**
 * Hero tiling-background data (Hyprland §8.1, ported).
 *
 * A faux tiling-WM desktop sits behind the hero: two tilted columns of
 * "workspaces", each a nested grid of colored bordered rounded rects. Most
 * tiles are just glowing outlines; ~1 in 3 hides a real project image that
 * fades in + zooms when hovered.
 *
 * The tree is generated from a SEEDED PRNG (not Math.random) so the server and
 * client produce identical markup — no hydration mismatch, and the mosaic is
 * stable across renders. Generated once at module load.
 */

export interface HeroTile {
  color: string;
  /** Absolute path under /public, only present on ~30% of tiles. */
  image?: string;
}

/** One vertical stack of 1–2 tiles. */
export type TileGroup = HeroTile[];
/** A workspace = a row of 1–3 tile groups. */
export type Workspace = TileGroup[];
/** A column = a vertical run of 4 workspaces. */
export type Column = Workspace[];

// Brand-tinted tile outline colours (amber / orange / violet family).
const COLORS = ["#F59E0B", "#FB923C", "#8B5CF6", "#A78BFA", "#F97316"];

// Real project imagery already in /public — shown on image tiles.
const IMAGES = [
  "/portfolio-img/companyprofile.png",
  "/portfolio-img/kominfo.png",
  "/fotoModalLayanan/poster.jpg",
  "/fotoModalLayanan/landingpage.jpg",
  "/fotoModalLayanan/desainBaner.png",
  "/fotoModalLayanan/banerdesain.jpg",
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
  const workspaces: Workspace = [] as unknown as Workspace;
  const column: Column = [];

  // 4 workspaces per column.
  for (let w = 0; w < 4; w++) {
    const groups: Workspace = [];
    // 1–3 tile-groups (random gates, matching the reference's organic feel).
    const groupCount = 1 + (rand() > 0.4 ? 1 : 0) + (rand() > 0.7 ? 1 : 0);

    for (let g = 0; g < groupCount; g++) {
      const tiles: TileGroup = [];
      // 1–2 tiles stacked.
      const tileCount = rand() > 0.5 ? 2 : 1;

      for (let ti = 0; ti < tileCount; ti++) {
        const color = COLORS[Math.floor(rand() * COLORS.length)];
        const hasImage = rand() > 0.7;
        tiles.push({
          color,
          image: hasImage ? IMAGES[Math.floor(rand() * IMAGES.length)] : undefined,
        });
      }
      groups.push(tiles);
    }
    column.push(groups);
  }
  void workspaces;
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
    left: [makeColumn(rand), makeColumn(rand), makeColumn(rand)],
    right: [makeColumn(rand), makeColumn(rand), makeColumn(rand)],
  };
}
