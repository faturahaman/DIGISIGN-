"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getHeroTiles, type Column } from "@/lib/heroTiles";

/**
 * Hero hover-reveal tiling background (Hyprland §8.1) — the signature effect.
 *
 * Two tilted 3D columns of "workspaces" recede toward a vanishing point. Every
 * tile is a dim glowing outline; hover lights it up neon, and image tiles fade
 * + zoom a brand mark or project screenshot into view (CSS-driven, see
 * .hero-tile* in globals.css).
 *
 * PERF (mobile): the tile grid is a few hundred DOM nodes plus a next/image tag
 * per image tile. On phones it's `display:none` decoration, but the nodes still
 * get parsed — wasteful on weak CPUs. So we render the grid ONLY after
 * confirming a desktop-width viewport (matchMedia, post-mount). Mobile ships
 * just the cheap gradient overlays. Desktop is unchanged.
 */

/**
 * Distance from the viewer to the z=0 plane. This single number is the depth of
 * the whole effect, and it was the reason the wall looked flat: at the previous
 * 1000px, a rotateY(10deg) across a ~660px-wide run of columns pushes the far
 * edge only ~115px away, which scales it to 1000/1115 — a 10% shrink nobody can
 * see. The reference uses 100px. At 200px the same far edge lands at 200/315,
 * a ~37% shrink, so the columns visibly converge.
 *
 * Lower it for more depth, raise it for less. Nothing else needs to change.
 */
const PERSPECTIVE_PX = 200;

function TileColumns({ columns, side }: { columns: Column[]; side: "left" | "right" }) {
  return (
    <div
      className="flex gap-4"
      style={{
        // Pivot from the screen edge so the columns swing inward, toward the
        // headline, rather than around their own middle.
        transform: side === "left" ? "rotateY(10deg)" : "rotateY(-10deg)",
        transformOrigin: side === "left" ? "left center" : "right center",
      }}
    >
      {columns.map((column, ci) => (
        <div key={ci} className="flex w-64 shrink-0 flex-col gap-4 lg:w-80">
          {column.map((workspace, wi) => (
            <div key={wi} className="flex h-64 gap-3 lg:h-80">
              {workspace.map((group, gi) => (
                <div key={gi} className="flex flex-1 flex-col gap-3">
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
                          sizes="320px"
                          className={
                            tile.fit === "contain"
                              ? // Square brand mark: keep it whole and give it
                                // room to breathe inside the tile border.
                                "hero-tile-img !h-full !w-full object-contain p-7"
                              : "hero-tile-img !h-full !w-full object-cover"
                          }
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
  const [showGrid, setShowGrid] = useState(false);

  // Only build the heavy tile grid on desktop-width screens, after mount.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setShowGrid(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const tiles = showGrid ? getHeroTiles() : null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {tiles && (
        <div
          className="absolute inset-0 flex items-start justify-between"
          style={{ perspective: `${PERSPECTIVE_PX}px` }}
        >
          <div
            className="pointer-events-none flex -translate-y-12 gap-4 opacity-90"
            style={{ transformStyle: "preserve-3d" }}
          >
            <TileColumns columns={tiles.left} side="left" />
          </div>
          <div
            className="pointer-events-none flex -translate-y-12 gap-4 opacity-90"
            style={{ transformStyle: "preserve-3d" }}
          >
            <TileColumns columns={tiles.right} side="right" />
          </div>
        </div>
      )}

      {/* Fade the field toward the top (horizon) and darken the centre so the
          headline stays legible over the mosaic. Cheap; always rendered. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,var(--background)_35%,transparent)]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent" />

      {/* Top amber ambient glow, Hyprland top-light. */}
      <div className="fancy-top-gradient" style={{ zIndex: 0 }} />
    </div>
  );
}
