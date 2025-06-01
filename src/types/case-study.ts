import type { Image, Metadata } from "@/types/global";

export type SectionContent = string|{header: string}[];

type Persona = {
    name: string;
    age: number;
    location: string;
    devices: string[];
    playStyle: string;
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
    title: string;
    contents: SectionContent[];
    images?: Image[][];
    persona?: Persona;
};

export type ProjectSummary = {
    description: string;
    metadata: Metadata[];
};

export type CaseStudy = {
    productName: string;
    projectType: string;
    heroImage: string;
    heroImageTablet: string;
    heroImageMobile: string;
    theme: string;
    projectSummary: ProjectSummary;
    sections: CaseStudySection[];
};