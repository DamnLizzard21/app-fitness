/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // Configurações de imagem
  images: {
    unoptimized: true,
  },
  // Desabilitar header powered by Next.js
  poweredByHeader: false,
};

export default nextConfig;