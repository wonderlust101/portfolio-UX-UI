import { getCaseStudy } from "@/lib/getCaseStudy";
import type { Metadata } from "next";
import { ReactNode } from "react";

export const runtime = "nodejs";

type LayoutProps = {
    children: ReactNode;
};

type MetadataProps = {
    params: Promise<{id: string}>;
};


export async function generateMetadata({params}: MetadataProps): Promise<Metadata> {
    const {id} = await params;
    const caseStudy = await getCaseStudy(id);

    if (!caseStudy) {
        return {
            title      : "Project Not Found",
            description: "The requested project does not exist."
        };
    }

    const {title, description, url, imageUrl, keywords} = caseStudy.metadata;

    return {
        title      : `${title} | Sergei Borja`,
        description: description,
        keywords : keywords,
        robots: {
            index: true,
            follow: true
        },
        openGraph: {
            title: `${title} | Sergei Borja`,
            description: description,
            url: url,
            siteName: "Sergei Borja Portfolio",
            images: imageUrl ? [{ url: imageUrl, alt: `${title} thumbnail` }] : [],
            locale: "en-US",
            type: `website`,
        },
        twitter: {
            card: "summary_large_image",
            title: `${title} | Sergei Borja`,
            description: description,
            images: imageUrl ? [imageUrl] : [],
            creator: "@sergeiborja"
        },
        metadataBase: new URL("https://www.sergei-borja.dev/"),
        alternates: {
            canonical: url
        },
        icons: {
            icon: "/favicon.ico"
        }
    };
}

export async function generateStaticParams() {
    return [
        {id: "excel-society-redesign"},
        {id: "skyrim-quest-log-redesign"},
        {id: "macewan-room-booking-redesign"},
        {id: "vr-data-visualization"},
        {id: "telus-world-of-science-guide-book"}
    ];
}

export default function CaseStudyLayout({children}: LayoutProps) {
    return <>{children}</>;
}