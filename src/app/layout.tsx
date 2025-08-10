import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// تأكد أن المسار صحيح لمزود الحالة (Providers)
import { Providers } from "@/components/ProductList";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "LEEN Shopping Cart | Your E-Shop",
  description: "LEEN store built with Next.js",
  icons:"/images/logo.jpeg",
  keywords: "Next.js, E-commerce, Shopping Cart, React",
  authors: [{ name: "LEEN", url: "https://leen.com" }],
  creator: "LEEN",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
