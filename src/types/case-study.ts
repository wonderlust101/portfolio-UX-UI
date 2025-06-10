import type { ReactNode } from "react";

export type ProjectData = {
    productName: string;
    metadata: Metadata;
    projectType: string;
    heroImage: string;
    heroImageTablet: string;
    theme: Theme;
    projectSummary: ProjectSummary;
    sections: Section[];
};

export type Metadata = {
    title: string;
    description: string;
    keywords: string[];
    imageUrl: string;
    url: string;
};

export type Theme = {
    themeColor: string;
    lightThemeColor: string;
    darkThemeColor: string;
};

export type ProjectSummary = {
    description: string;
    role: string;
    details: Detail[];
};

export type Detail = {
    header: string;
    text: string|string[];
};

export type Section = {
    title: string;
    contents?: ContentBlock[];
    subsections?: Subsection[];
};

export type Subsection = {
    title: string;
    contents: ContentBlock[];
};

export type ContentBlock =
    |TextBlock
    |ListBlock
    |ImagesGalleryBlock
    |PersonaBlock
    |QuoteList
    |UserStatement
    |FigmaBlock
    |VideoBlock;

export type TextBlock = {
    type: "text";
    text: string;
};

export type ListBlock = {
    type: "list";
    items: ListItem[];
};

export type ListItem = {
    header: string;
    text?: string|ReactNode;
    bold?: string;
};

export type ImagesGalleryBlock = {
    type: "imagesGallery";
    imagesGallery: ImagesGallery;
};

export type ImagesGallery = {
    images: Image[];
    options: ImagesGalleryOptions;
}

export type ImagesGalleryOptions = {
    masonry?: boolean;
    columns?: number;
    tabletColumns?: number;
}

export type Image = {
    src: string;
    alt: string;
};

export type PersonaBlock = {
    type: "persona";
    persona: Persona;
};

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
}

export type QuoteList = {
    type: "quoteList";
    quotes: string[];
}

export type UserStatement = {
    type: "userStatement";
    statement: string;
}

export type FigmaBlock = {
    type: "figma";
    figmaLink: string;
};

export type VideoBlock = {
    type: "video";
    video: string;
};