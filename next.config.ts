import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://frontend-engineer-codecheck-api.mirai.yumemi.io/api/:path*',
      },
    ];
  },
};

export default nextConfig;
