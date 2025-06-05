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

export type SectionContent = string|{
    header?: string;
    content?: string;
    quote?: string;
}[];

export type ProjectMetadata = {
    title: string;
    description: string;
    keywords: string[];
    imageUrl: string;
    url: string;
};

export type ProjectSummary = {
    description: string;
    details: ProjectSummaryDetail[];
}

export type ThemeColors = {
    themeColor: string;
    lightThemeColor: string;
    darkThemeColor: string;
};

export type ProjectSummaryDetail = {
    header: string;
    content: string|string[];
};

export type ProjectImage = {
    image: string;
    caption: string;
    containerPercentage?: number;
};

export type Subsection = {
    title: string;
    contents: SectionContent[];
    images?: ProjectImage[][];
    persona?: Persona;
};

export type Section = {
    title: string;
    contents: SectionContent[];
    images?: ProjectImage[][];
    subsections?: Subsection[];
};

export type CaseStudy = {
    productName: string;
    metadata: ProjectMetadata;
    projectType: string;
    heroImage: string;
    heroImageTablet: string;
    theme: ThemeColors;
    projectSummary: ProjectSummary;
    sections: Section[];
};