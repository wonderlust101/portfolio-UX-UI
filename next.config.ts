import withPlaiceholder from "@plaiceholder/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    sassOptions: {
        additionalData: `@use "@/assets/styles/abstract/_index.scss" as *;`
    },
    allowedDevOrigins: [
        'local-origin.dev',
        '*.local-origin.dev',
        '192.168.1.83',
        '192.168.1.83:3000'
    ],
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.media.sergei-borja.dev',
                pathname: '/**',
            },
        ],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    },
    experimental: {
        cssChunking: true,
    },
} satisfies NextConfig;

export default withPlaiceholder(nextConfig);