// app/[id]/layout.tsx
import type { Metadata } from "next";
import fs from "fs/promises";
import path from "path";
import { ReactNode } from "react";

export const runtime = "nodejs";

type LayoutProps = {
    children: ReactNode;
};

type MetadataProps = {
    params: Promise<{ id: string }>;
};

async function getCaseStudy(id: string) {
    const filePath = path.join(process.cwd(), "src", "data", `${id}.json`);
    try {
        const data = await fs.readFile(filePath, "utf-8");
        return JSON.parse(data);
    } catch {
        return null;
    }
}

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
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
    };
}

export async function generateStaticParams() {
    return [
        { id: "election-canada-website-audit" },
        { id: "skyrim-quest-log-redesign" },
        { id: "telus-world-of-science-guide-book" },
    ];
}

export default function CaseStudyLayout({ children }: LayoutProps) {
    return <>{children}</>;
}