/**
 * Portfolio data fetching via Supabase REST API.
 *
 * Expected Supabase table "portfolio" columns:
 *   id          | bigint/text
 *   title       | text
 *   category    | text ("design" or "website")
 *   description | text
 *   tags        | text[] or comma-separated text
 *   size        | text ("small", "medium", or "large")
 *   image_url   | text (optional, public image URL)
 *   created_at  | timestamptz (optional)
 *
 * RLS: make sure there's a SELECT policy for the anon role,
 * or disable RLS on this table for public read.
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const PORTFOLIO_API_URL = `${SUPABASE_URL}/rest/v1/portfolio?select=*&order=id.asc`;

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

function asTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function parseCategory(value: unknown): PortfolioCategory {
  return asTrimmedString(value).toLowerCase() === "website" ? "website" : "design";
}

function parseSize(value: unknown): PortfolioSize {
  const size = asTrimmedString(value).toLowerCase();

  return size === "large" || size === "medium" || size === "small" ? size : "small";
}

function parseTags(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((tag) => String(tag).trim()).filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  return [];
}

export function mapPortfolioRows(rows: Record<string, unknown>[]): PortfolioItem[] {
  return rows
    .filter((row) => row.title)
    .map((row, index) => ({
      id: String(row.id ?? `portfolio-${index}`),
      title: asTrimmedString(row.title),
      category: parseCategory(row.category),
      description: asTrimmedString(row.description),
      tags: parseTags(row.tags),
      size: parseSize(row.size),
      imageUrl: asTrimmedString(row.image_url ?? row.imageUrl) || undefined,
    }));
}

export async function fetchPortfolioItems(): Promise<PortfolioItem[]> {
  const res = await fetch(PORTFOLIO_API_URL, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Supabase error: ${res.status}`);
  }

  const data = await res.json();

  return mapPortfolioRows(data as Record<string, unknown>[]);
}
