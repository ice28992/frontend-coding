import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/proxyPop/:prefCode',
        destination:
          'https://frontend-engineer-codecheck-api.mirai.yumemi.io/api/v1/population/composition/perYear?prefCode=:prefCode',
      },
      {
        source: '/api/proxyPref',
        destination: 'https://frontend-engineer-codecheck-api.mirai.yumemi.io/api/v1/prefectures',
      },
    ];
  },
};

export default nextConfig;
