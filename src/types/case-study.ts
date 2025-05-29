import type { Image, Metadata } from "@/types/global";

export type SectionContent = string | { header: string }[];

export type CaseStudySection = {
    title: string;
    contents: SectionContent[];
    images?: Image[][];
    subsections?: CaseStudySubSection[];
};

export type CaseStudySubSection = {
    title: string;
    contents: SectionContent[];
    images?: Image[][];
};

export type ProjectSummary = {
    description: string;
    metadata: Metadata[];
};

export type CaseStudy = {
    productName: string;
    projectType: string;
    heroImage: string;
    theme: string;
    projectSummary: ProjectSummary;
    sections: CaseStudySection[];
};