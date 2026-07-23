/**
 * Portfolio data fetching via Google Sheets (CSV export).
 *
 * Tab "Portfolio" — one row per item:
 *   id | title | category | description | tags | size | imageUrl
 *
 *   - category: "design" or "website"
 *   - size: "small", "medium", or "large"
 *   - tags: pipe-separated, e.g. "Branding|Logo|Identity"
 *   - imageUrl: optional public image URL
 *
 * Configure via env vars (see lib/googleSheets.ts):
 *   NEXT_PUBLIC_GOOGLE_SHEET_ID
 *   NEXT_PUBLIC_GSHEET_GID_PORTFOLIO
 */

import { buildSheetCsvUrl, fetchSheetRows, splitList } from "./googleSheets";

const GID_PORTFOLIO = process.env.NEXT_PUBLIC_GSHEET_GID_PORTFOLIO ?? "0";

export const PORTFOLIO_CSV_URL = buildSheetCsvUrl(GID_PORTFOLIO);

export type PortfolioCategory = "design" | "website";
export type PortfolioSize = "small" | "medium" | "large";

export interface PortfolioItem {
  id: string;
  title: string;
  category: PortfolioCategory;
  description: string;
  tags: string[];
  size: PortfolioSize;
  imageUrl?: string;
}

function parseCategory(value: string | undefined): PortfolioCategory {
  return (value ?? "").toLowerCase() === "website" ? "website" : "design";
}

function parseSize(value: string | undefined): PortfolioSize {
  const size = (value ?? "").toLowerCase();
  return size === "large" || size === "medium" || size === "small" ? size : "small";
}

export function mapPortfolioRows(rows: Record<string, string>[]): PortfolioItem[] {
  return rows
    .filter((row) => row.title)
    .map((row, index) => ({
      id: row.id || `portfolio-${index}`,
      title: row.title,
      category: parseCategory(row.category),
      description: row.description ?? "",
      tags: splitList(row.tags),
      size: parseSize(row.size),
      imageUrl: row.imageurl || undefined,
    }));
}

export async function fetchPortfolioItems(): Promise<PortfolioItem[]> {
  const rows = await fetchSheetRows(PORTFOLIO_CSV_URL);
  return mapPortfolioRows(rows);
}
