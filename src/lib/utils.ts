import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * دمج الكلاسات Tailwind باستخدام clsx + tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * تنسيق السعر باستخدام Intl.NumberFormat
 */
export function formatPrice(
  price: number | string,
  options: {
    currency?: "USD" | "EUR" | "GBP" | "BDT"
    notation?: Intl.NumberFormatOptions["notation"]
  } = {}
): string {
  const { currency = "USD", notation = "compact" } = options

  const numericPrice = typeof price === "string" ? Number(price) : price

  // حماية من القيم غير الصالحة
  if (isNaN(numericPrice)) return ""

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    notation,
    maximumFractionDigits: 2,
  }).format(numericPrice)
}
