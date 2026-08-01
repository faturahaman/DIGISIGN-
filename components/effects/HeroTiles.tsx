import Image from "next/image";
import { getHeroTiles, type Column } from "@/lib/heroTiles";

/**
 * Hero hover-reveal tiling background (Hyprland §8.1) — the signature effect.
 *
 * Two tilted 3D columns of "workspaces" recede toward a vanishing point. Every
 * tile is a dim glowing outline; hover lights it up neon, and image tiles fade
 * + zoom a real project screenshot into view. All CSS-driven (see .hero-tile*
 * in globals.css) so it's a Server Component shipping ZERO JS.
 *
 * PERF: tiles are only ~200px wide, so images go through next/image with
 * sizes="220px" + low quality — the optimizer serves ~10–20KB WebP/AVIF instead
 * of the original 1–2MB source, and lazy-loads them (they're hidden until hover).
 * Disabled visually on small screens via the parent's `hidden md:block`.
 */

function TileColumns({ columns, side }: { columns: Column[]; side: "left" | "right" }) {
  return (
    <div
      className="flex gap-3"
      style={{
        transform: side === "left" ? "rotateY(10deg)" : "rotateY(-10deg)",
        transformOrigin: side === "left" ? "left center" : "right center",
      }}
    >
      {columns.map((column, ci) => (
        <div key={ci} className="flex w-40 shrink-0 flex-col gap-3 lg:w-52">
          {column.map((workspace, wi) => (
            <div key={wi} className="flex h-40 gap-2 lg:h-52">
              {workspace.map((group, gi) => (
                <div key={gi} className="flex flex-1 flex-col gap-2">
                  {group.map((tile, ti) => (
                    <div
                      key={ti}
                      className={`hero-tile flex-1 ${tile.image ? "has-image" : ""}`}
                      style={{ ["--tile-color" as string]: tile.color }}
                    >
                      {tile.image && (
                        <Image
                          src={tile.image}
                          alt=""
                          aria-hidden="true"
                          fill
                          loading="lazy"
                          quality={45}
                          sizes="220px"
                          className="hero-tile-img !h-full !w-full object-cover"
                        />
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function HeroTiles() {
  const { left, right } = getHeroTiles();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* 3D perspective wall of tiles. pointer-events re-enabled per-tile so
          hovering reveals imagery without blocking hero buttons. */}
      <div
        className="absolute inset-0 flex items-start justify-between"
        style={{ perspective: "1000px" }}
      >
        <div
          className="pointer-events-none flex -translate-y-12 gap-3 opacity-90"
          style={{ transformStyle: "preserve-3d" }}
        >
          <TileColumns columns={left} side="left" />
        </div>
        <div
          className="pointer-events-none flex -translate-y-12 gap-3 opacity-90"
          style={{ transformStyle: "preserve-3d" }}
        >
          <TileColumns columns={right} side="right" />
        </div>
      </div>

      {/* Fade the field toward the top (horizon) and darken the centre so the
          headline stays legible over the mosaic. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,var(--background)_35%,transparent)]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent" />

      {/* Top amber ambient glow, Hyprland top-light. */}
      <div className="fancy-top-gradient" style={{ zIndex: 0 }} />
    </div>
  );
}
