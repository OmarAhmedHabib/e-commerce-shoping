import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * دمج الكلاسات Tailwind باستخدام clsx + tailwind-merge
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(...inputs));
}

type SupportedCurrency = "USD" | "EUR" | "GBP" | "BDT"; // تقدر تزود عملات هنا

interface FormatPriceOptions {
  currency?: SupportedCurrency;
  notation?: Intl.NumberFormatOptions["notation"];
}

/**
 * تنسيق السعر باستخدام Intl.NumberFormat
 */
export function formatPrice(
  price: number | string,
  options: FormatPriceOptions = {}
): string {
  const { currency = "USD", notation = "compact" } = options;

  const numericPrice =
    typeof price === "string" ? Number(price) : price;

  // حماية من القيم غير الصالحة
  if (!Number.isFinite(numericPrice)) return "";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    notation,
    maximumFractionDigits: 2,
  }).format(numericPrice);
}
