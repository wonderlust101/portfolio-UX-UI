import { cache } from "react";
import fs from "fs/promises";
import path from "path";
import { CaseStudy } from "@/types/case-study";

export const getCaseStudy = cache(async (id: string): Promise<CaseStudy | null> => {
    const filePath = path.join(process.cwd(), "src", "data", `${id}.json`);

    try {
        const data = await fs.readFile(filePath, "utf8");
        return JSON.parse(data);
    } catch {
        return null;
    }
});