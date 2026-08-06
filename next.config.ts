import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    /**
     * O cache em disco do Turbopack tenta gravar em /mnt/<uuid-da-partição>/...
     * quando o projeto está numa partição montada em /media (caso desta máquina),
     * e o `next dev` quebra com "Permission denied (os error 13)".
     * Desativar o cache resolve sem trocar de bundler; só afeta o dev.
     */
    turbopackFileSystemCacheForDev: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
