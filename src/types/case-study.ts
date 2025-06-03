import type { Image, Metadata } from "@/types/global";

export type SectionContent = string|{
    header?: string;
    content?: string;
    quote?: string;
}[];

export type Persona = {
    name: string;
    image: string;
    age: number;
    location: string;
    devices: string[];
    type: string;
    quote: string;
    goals: string[];
    painPoints: string[];
};

export type CaseStudySection = {
    title: string;
    contents?: SectionContent[];
    images?: Image[][];
    persona?: Persona;
    subsections?: CaseStudySubSection[];
};

export type CaseStudySubSection = {
    title?: string;
    contents?: SectionContent[];
    images?: Image[][];
    persona?: Persona;
    quote?: string;
};

export type ProjectSummary = {
    description: string;
    details: Metadata[];
};

export type CaseStudyMetadata = {
    title: string;
    description: string;
    keywords: string[];
    imageUrl?: string;
    url: string;
};


export type CaseStudy = {
    productName: string;
    projectType: string;
    heroImage: string;
    heroImageTablet: string;
    heroImageMobile: string;
    theme: string;
    metadata: CaseStudyMetadata;
    projectSummary: ProjectSummary;
    sections: CaseStudySection[];
};