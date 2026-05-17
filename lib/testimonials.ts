/**
 * Testimonials data fetching via Supabase REST API
 *
 * Supabase table "testimonials" columns:
 *   id        | bigint (auto)
 *   name      | text
 *   role      | text
 *   company   | text
 *   message   | text
 *   rating    | int2  (1–5)
 *   avatar    | text  (optional, public image URL)
 *   created_at| timestamptz (auto)
 *
 * RLS: make sure there's a SELECT policy for the anon role,
 * or disable RLS on this table for public read.
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const TESTIMONIALS_API_URL = `${SUPABASE_URL}/rest/v1/testimonials?select=*`;

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  message: string;
  rating: number;
  avatar?: string;
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  const res = await fetch(TESTIMONIALS_API_URL, {
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

  return (data as Record<string, unknown>[])
    .filter((row) => row.name && row.message)
    .map((row) => ({
      id: String(row.id ?? Math.random()),
      name: String(row.name ?? "").trim(),
      role: String(row.role ?? "").trim(),
      company: String(row.company ?? "").trim(),
      message: String(row.message ?? "").trim(),
      rating: Math.min(5, Math.max(1, Number(row.rating) || 5)),
      avatar: row.avatar ? String(row.avatar).trim() : undefined,
    }));
}
