type AdditionalDetail = {
    header: string;
    content: string;
};

type SkillItem = {
    header: string;
};

type SkillSection = {
    title: string;
    description: string;
    skillList: SkillItem[];
};

export type CaseStudyList = {
    title: string;
    type: string;
    description: string;
    link: string;
    previewImage: string;
};

export type ProfileData = {
    tagLine: string;
    aboutText: string;
    additionalDetails: AdditionalDetail[];
    skills: SkillSection[];
    caseStudies: CaseStudyList[];
};