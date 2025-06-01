// app/[id]/layout.tsx
import type { Metadata, ResolvingMetadata } from "next";
import { ReactNode } from "react";
import path from "path";
import fs from "fs/promises";

// ⚠️ Must match your internal layout types — hence Promise<{ id: string }>
type Props = {
    params: Promise<{ id: string }>;
};

async function getCaseStudy(id: string) {
    const filePath = path.join(process.cwd(), "src/data", `${id}.json`);
    try {
        const data = await fs.readFile(filePath, "utf-8");
        return JSON.parse(data);
    } catch {
        return null;
    }
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { id } = await params;
    const caseStudy = await getCaseStudy(id);

    const previousImages = (await parent).openGraph?.images || [];

    if (!caseStudy) {
        return {
            title: "Project Not Found",
            description: "The requested project does not exist.",
        };
    }

    return {
        title: `${caseStudy.productName} | Sergei Borja`,
        description: caseStudy.projectSummary?.description,
        openGraph: {
            title: caseStudy.productName,
            description: caseStudy.projectSummary?.description,
            images: [caseStudy.mobileHeroImage, ...previousImages],
        },
    };
}

// Static params for build-time generation
export async function generateStaticParams() {
    const dirPath = path.join(process.cwd(), "src/data");
    const files = await fs.readdir(dirPath);

    return files
    .filter((file) => file.endsWith(".json"))
    .map((file) => ({
        id: path.basename(file, ".json"),
    }));
}

// Layout component
export default function CaseStudyLayout({ children }: { children: ReactNode }) {
    return <>{children}</>;
}