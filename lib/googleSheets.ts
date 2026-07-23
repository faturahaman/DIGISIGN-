/**
 * Generic Google Sheets (CSV export) data source.
 *
 * How it works:
 *   Google Sheets can expose any tab as a live CSV via:
 *     https://docs.google.com/spreadsheets/d/{SHEET_ID}/export?format=csv&gid={TAB_GID}
 *
 *   Requirements on the sheet:
 *   - Share → "Anyone with the link" → Viewer
 *   - First row of each tab = column headers (case-insensitive, matched below)
 *
 * This file only handles fetching + CSV parsing. Each data module
 * (services / portfolio / testimonials) builds its own URL and maps rows
 * to its own shape.
 */

export const GOOGLE_SHEET_ID = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID ?? "";

export function buildSheetCsvUrl(gid: string | number): string {
  return `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/export?format=csv&gid=${gid}`;
}

/**
 * Minimal RFC4180-ish CSV parser: handles quoted fields, escaped quotes ("")
 * commas/newlines inside quotes, and CRLF/LF line endings.
 */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  // Normalize CRLF -> LF to simplify newline handling inside the loop
  const src = text.replace(/\r\n/g, "\n");

  for (let i = 0; i < src.length; i++) {
    const char = src[i];

    if (inQuotes) {
      if (char === '"') {
        if (src[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
      continue;
    }

    if (char === ",") {
      row.push(field);
      field = "";
      continue;
    }

    if (char === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
      continue;
    }

    field += char;
  }

  // Flush trailing field/row (file may or may not end with newline)
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows.filter((r) => r.some((cell) => cell.trim() !== ""));
}

/** Converts parsed CSV rows into objects keyed by the (lower-cased) header row. */
export function rowsToObjects(rows: string[][]): Record<string, string>[] {
  if (rows.length === 0) return [];

  const [headerRow, ...dataRows] = rows;
  const headers = headerRow.map((h) => h.trim().toLowerCase());

  return dataRows.map((row) => {
    const obj: Record<string, string> = {};
    headers.forEach((header, i) => {
      if (!header) return;
      obj[header] = (row[i] ?? "").trim();
    });
    return obj;
  });
}

/** Fetch + parse a published Google Sheets tab as an array of row objects. */
export async function fetchSheetRows(csvUrl: string): Promise<Record<string, string>[]> {
  const res = await fetch(csvUrl, { cache: "no-store" });

  if (!res.ok) {
    throw new Error(`Google Sheets error: ${res.status}`);
  }

  const text = await res.text();
  return rowsToObjects(parseCsv(text));
}

/** Splits a "a | b | c" style cell into a trimmed, non-empty string array. */
export function splitList(value: string | undefined, separator = "|"): string[] {
  if (!value) return [];
  return value
    .split(separator)
    .map((s) => s.trim())
    .filter(Boolean);
}
