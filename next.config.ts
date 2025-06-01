import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    sassOptions: {
        additionalData: `@use "@/assets/styles/abstract/_index.scss" as *;`
    }
};

export default nextConfig;