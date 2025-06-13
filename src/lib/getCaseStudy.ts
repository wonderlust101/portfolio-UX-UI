import { ProjectData } from "@/types/case-study";
import fs from "fs/promises";
import path from "path";
import { cache } from "react";

export const getCaseStudy = cache(async (id: string): Promise<ProjectData | null> => {
    const filePath = path.join(process.cwd(), "src", "case-studies", `${id}.json`);

    try {
        const data = await fs.readFile(filePath, "utf8");
        return JSON.parse(data);
    } catch {
        return null;
    }
});

export async function getCaseStudySlugs(): Promise<string[]> {
    const dirPath = path.join(process.cwd(), "src", "case-studies");

    try {
        const files = await fs.readdir(dirPath);
        return files
        .filter(file => file.endsWith(".json"))
        .map(file => file.replace(/\.json$/, ""));
    } catch (err) {
        console.error("Error reading case studies directory:", err);
        return [];
    }
}