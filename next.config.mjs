/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // Configurações para resolver problemas de RSC payload
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
          },
        ],
      },
    ];
  },
  // Desabilitar otimizações que podem causar problemas
  swcMinify: false,
  // Configurações de servidor
  serverRuntimeConfig: {},
  publicRuntimeConfig: {},
  // Configurações de build
  output: 'standalone',
  poweredByHeader: false,
  // Configurações de imagem
  images: {
    unoptimized: true,
  },
};

export default nextConfig;