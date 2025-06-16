import type { MetadataRoute } from "next";
import { getCaseStudySlugs } from "@/lib/getCaseStudy";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://sergei-borja.dev";

    const pages: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}/`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 1,
        },
    ];

    try {
        const slugs = await getCaseStudySlugs();
        slugs.forEach((id) => {
            pages.push({
                url: `${baseUrl}/${id}`,
                lastModified: new Date(),
                changeFrequency: "yearly" as const,
                priority: 0.8,
            });
        });
    } catch (error) {
        console.error("Error fetching case study slugs:", error);
    }

    return pages;
}