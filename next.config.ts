import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ده بيخلي Vercel يتجاهل أخطاء ESLint أثناء الـ build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
