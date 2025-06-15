import withPlaiceholder from "@plaiceholder/next";
import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const withAnalyzer = withBundleAnalyzer({
    enabled: process.env.ANALYZE === "true",
});

const baseConfig: NextConfig = {
    sassOptions: {
        additionalData: `@use "@/assets/styles/abstract/_index.scss" as *;`
    },
    allowedDevOrigins: [
        "local-origin.dev",
        "*.local-origin.dev",
        "192.168.1.83",
        "192.168.1.83:3000"
    ],
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "www.media.sergei-borja.dev",
                pathname: "/**"
            }
        ]
    },
    experimental: {
        cssChunking: 'strict'
    },
    webpack: (config, { dev, isServer }) => {
        if (!dev && !isServer) {
            // Optimize CSS in production
            config.optimization.splitChunks = {
                ...config.optimization.splitChunks,
                cacheGroups: {
                    ...config.optimization.splitChunks.cacheGroups,
                    styles: {
                        name: 'styles',
                        test: /\.(css|scss|sass)$/,
                        chunks: 'all',
                        enforce: true,
                    },
                },
            }
        }
        return config
    }
} satisfies NextConfig;

export default withAnalyzer(
    withPlaiceholder(baseConfig)
);