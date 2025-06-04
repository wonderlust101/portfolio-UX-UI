import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const withAnalyzer = withBundleAnalyzer({
    enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
    sassOptions: {
        additionalData: `@use "@/assets/styles/abstract/_index.scss" as *;`
    },
    allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev'],
    images: {
        domains: ['res.cloudinary.com'],
    },
};

export default withAnalyzer(nextConfig);