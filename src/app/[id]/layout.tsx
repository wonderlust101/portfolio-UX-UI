// app/[id]/layout.tsx
import type { Metadata, ResolvingMetadata } from "next";
import { ReactNode } from "react";

export const runtime = "nodejs";

type LayoutProps = {
    children: ReactNode;
};

type MetadataProps = {
    params: Promise<{ id: string }>;
};

async function getCaseStudy(id: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/data/${id}.json`);
        if (!res.ok) return null;
        return await res.json();
    } catch {
        return null;
    }
}

export async function generateMetadata(
    { params }: MetadataProps,
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

// For static pre-rendering, hardcode params (because we can't read /public dynamically)
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