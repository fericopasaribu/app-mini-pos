"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import { CUSTOM_TEXT } from "@/constants/CustomText";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Mapping label untuk segment path
const labelMap: Record<string, string | Record<string, string>> = {
  satuan: `${CUSTOM_TEXT.menu_satuan}`,
  barang: `${CUSTOM_TEXT.menu_barang}`,
  penjualan: `${CUSTOM_TEXT.menu_penjualan}`,
  github: `${CUSTOM_TEXT.menu_github}`,
  vercel: `${CUSTOM_TEXT.menu_vercel}`,
  add: {
    satuan: `${CUSTOM_TEXT.text_tambah_data}`,
    barang: `${CUSTOM_TEXT.text_tambah_data}`,
    penjualan: `${CUSTOM_TEXT.text_tambah_data}`,
  },
  edit: {
    satuan: `${CUSTOM_TEXT.text_ubah_data}`,
    barang: `${CUSTOM_TEXT.text_ubah_data}`,
    penjualan: `${CUSTOM_TEXT.text_ubah_data}`,
  },
  detail: {
    satuan: `${CUSTOM_TEXT.text_detail_data}`,
    barang: `${CUSTOM_TEXT.text_detail_data}`,
    penjualan: `${CUSTOM_TEXT.text_detail_data}`,
  },
};

export function CustomBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return <div className="area-breadcrumb">Home</div>;

  const breadcrumbs = segments
    .map((segment, index) => {
      const prev = segments[index - 1];
      const isLast = index === segments.length - 1;
      const isParamOfAction =
        ["detail", "edit", "add"].includes(prev ?? "") && isLast;

      if (isParamOfAction) return null;

      const href = "/" + segments.slice(0, index + 1).join("/");

      const defaultLabel = segment
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());

      const label =
        typeof labelMap[segment] === "string"
          ? (labelMap[segment] as string)
          : typeof labelMap[segment] === "object" && index > 0
          ? (labelMap[segment] as Record<string, string>)[
              segments[index - 1]
            ] || defaultLabel
          : defaultLabel;

      return {
        label,
        href,
      };
    })
    .filter(Boolean);

  return (
    <Breadcrumb className="area-breadcrumb">
      <BreadcrumbItem>
        <BreadcrumbLink asChild>
          <Link href="/" className="!text-sky-700">
            Home
          </Link>
        </BreadcrumbLink>
      </BreadcrumbItem>

      {breadcrumbs.map((crumb, idx) => {
        const isLast = idx === breadcrumbs.length - 1;
        return (
          <div key={crumb!.href} className="flex items-center">
            <ChevronRight className="breadcrumb-separator" />
            <BreadcrumbItem>
              {isLast ? (
                <span>{crumb!.label}</span>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={crumb!.href} className="!text-sky-700">
                    {crumb?.label}
                  </Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </div>
        );
      })}
    </Breadcrumb>
  );
}
