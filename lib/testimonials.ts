/**
 * Testimonials data fetching via Google Sheets (CSV export).
 *
 * Tab "Testimonials" — one row per testimonial:
 *   id | name | role | company | message | rating | avatar
 *
 *   - rating: number 1–5
 *   - avatar: optional public image URL
 *
 * Configure via env vars (see lib/googleSheets.ts):
 *   NEXT_PUBLIC_GOOGLE_SHEET_ID
 *   NEXT_PUBLIC_GSHEET_GID_TESTIMONIALS
 */

import { buildSheetCsvUrl, fetchSheetRows } from "./googleSheets";

const GID_TESTIMONIALS = process.env.NEXT_PUBLIC_GSHEET_GID_TESTIMONIALS ?? "0";

export const TESTIMONIALS_CSV_URL = buildSheetCsvUrl(GID_TESTIMONIALS);

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  message: string;
  rating: number;
  avatar?: string;
}

export function mapTestimonialRows(rows: Record<string, string>[]): Testimonial[] {
  return rows
    .filter((row) => row.name && row.message)
    .map((row, index) => ({
      id: row.id || `testi-${index}`,
      name: row.name.trim(),
      role: row.role?.trim() ?? "",
      company: row.company?.trim() ?? "",
      message: row.message.trim(),
      rating: Math.min(5, Math.max(1, Number(row.rating) || 5)),
      avatar: row.avatar?.trim() || undefined,
    }));
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  const rows = await fetchSheetRows(TESTIMONIALS_CSV_URL);
  return mapTestimonialRows(rows);
}
