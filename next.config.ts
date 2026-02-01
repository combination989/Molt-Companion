import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "standalone", // Disabled - causes EISDIR errors on Windows
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  // 禁用 Next.js 热重载，由 nodemon 处理重编译
  reactStrictMode: false,
  eslint: {
    // 构建时忽略ESLint错误
    ignoreDuringBuilds: true,
  },
  webpack: (config, { isServer }) => {
    // Fix for EISDIR errors on Windows with newer Node.js versions
    config.resolve.symlinks = false;
    return config;
  },
};

export default nextConfig;
