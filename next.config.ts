import { withNextVideo } from "next-video/process";
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
    ],    images: {
        domains: ['res.cloudinary.com'],
    },
    experimental: {
        cssChunking: true,
    },
} satisfies NextConfig;

export default withNextVideo(nextConfig);