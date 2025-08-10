import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // تجاهل أخطاء ESLint أثناء الـ build
  },
};

export default nextConfig;
