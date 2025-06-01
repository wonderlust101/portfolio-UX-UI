// app/[id]/layout.tsx
import type { Metadata } from "next";
import { ReactNode } from "react";
import path from "path";
import fs from "fs/promises";

interface LayoutProps {
    children: ReactNode;
    params: Promise<{ id: string }>;
}

async function getCaseStudy(id: string) {
    const filePath = path.join(process.cwd(), "src/data", `${id}.json`);
    try {
        const data = await fs.readFile(filePath, "utf-8");
        return JSON.parse(data);
    } catch (err) {
        return null;
    }
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
    const { id } = await params;
    const caseStudy = await getCaseStudy(id);

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
            images: [caseStudy.mobileHeroImage],
        },
    };
}

export default function CaseStudyLayout({ children }: { children: ReactNode }) {
    return <>{children}</>;
}