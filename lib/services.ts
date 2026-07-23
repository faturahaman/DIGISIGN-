/**
 * Services & Pricing data fetching via Google Sheets (CSV export).
 *
 * Two tabs are required in the same spreadsheet:
 *
 * Tab "Services" — one row per service:
 *   id | title | description | icon | size | gradient | imageUrl |
 *   startingPrice | priceLabel | deliveryTime | features | highlight |
 *   studentName | studentPrice | studentFeatures
 *
 *   - icon: one of the keys in ICON_MAP below (e.g. "Palette", "Globe")
 *   - size: "small" or "large"
 *   - features / studentFeatures: pipe-separated, e.g. "Logo|Revisi 2x|PDF"
 *   - startingPrice: plain number, e.g. 800000
 *
 * Tab "Packages" — one row per package (multiple rows per service, matched by serviceId):
 *   serviceId | name | price | target | features
 *
 *   - serviceId: must match the "id" column of a row in the Services tab
 *   - features: pipe-separated
 *
 * Configure the sheet id + each tab's gid via env vars (see lib/googleSheets.ts):
 *   NEXT_PUBLIC_GOOGLE_SHEET_ID
 *   NEXT_PUBLIC_GSHEET_GID_SERVICES
 *   NEXT_PUBLIC_GSHEET_GID_PACKAGES
 */

import {
  Palette,
  FileImage,
  Layout,
  Building2,
  ShoppingCart,
  Briefcase,
  Globe,
  Zap,
  Sparkles,
} from "lucide-react";
import { buildSheetCsvUrl, fetchSheetRows, splitList } from "./googleSheets";

const GID_SERVICES = process.env.NEXT_PUBLIC_GSHEET_GID_SERVICES ?? "0";
const GID_PACKAGES = process.env.NEXT_PUBLIC_GSHEET_GID_PACKAGES ?? "0";

export const SERVICES_CSV_URL = buildSheetCsvUrl(GID_SERVICES);
export const PACKAGES_CSV_URL = buildSheetCsvUrl(GID_PACKAGES);

/** Maps the "icon" column value (string) to an actual lucide-react component. */
export const ICON_MAP: Record<string, React.ElementType> = {
  Palette,
  FileImage,
  Layout,
  Building2,
  ShoppingCart,
  Briefcase,
  Globe,
  Zap,
  Sparkles,
};

export interface ServicePackage {
  name: string;
  price: string;
  target: string;
  features: string[];
}

export interface StudentPricing {
  name: string;
  price: string;
  features: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  size: "small" | "large";
  gradient: string;
  imageUrl?: string;
  startingPrice: number;
  priceLabel: string;
  deliveryTime: string;
  features: string[];
  highlight: string;
  packages?: ServicePackage[];
  studentPricing?: StudentPricing;
}

function mapPackageRows(rows: Record<string, string>[]): Record<string, ServicePackage[]> {
  const grouped: Record<string, ServicePackage[]> = {};

  for (const row of rows) {
    const serviceId = row.serviceid ?? row["service id"] ?? "";
    if (!serviceId || !row.name) continue;

    if (!grouped[serviceId]) grouped[serviceId] = [];
    grouped[serviceId].push({
      name: row.name,
      price: row.price ?? "",
      target: row.target ?? "",
      features: splitList(row.features),
    });
  }

  return grouped;
}

function mapServiceRows(
  rows: Record<string, string>[],
  packagesByServiceId: Record<string, ServicePackage[]>
): ServiceItem[] {
  return rows
    .filter((row) => row.id && row.title)
    .map((row) => {
      const studentName = row.studentname ?? row["student name"];
      const studentPrice = row.studentprice ?? row["student price"];

      return {
        id: row.id,
        title: row.title,
        description: row.description ?? "",
        icon: ICON_MAP[row.icon] ?? Sparkles,
        size: row.size === "large" ? "large" : "small",
        gradient: row.gradient || "from-orange-500/20 to-purple-500/20",
        imageUrl: row.imageurl || undefined,
        startingPrice: Number(row.startingprice) || 0,
        priceLabel: row.pricelabel || "Mulai dari",
        deliveryTime: row.deliverytime || "",
        features: splitList(row.features),
        highlight: row.highlight || "",
        packages: packagesByServiceId[row.id],
        studentPricing: studentName
          ? {
              name: studentName,
              price: studentPrice ?? "",
              features: splitList(row.studentfeatures ?? row["student features"]),
            }
          : undefined,
      };
    });
}

export async function fetchServices(): Promise<ServiceItem[]> {
  const [serviceRows, packageRows] = await Promise.all([
    fetchSheetRows(SERVICES_CSV_URL),
    fetchSheetRows(PACKAGES_CSV_URL),
  ]);

  const packagesByServiceId = mapPackageRows(packageRows);
  return mapServiceRows(serviceRows, packagesByServiceId);
}
