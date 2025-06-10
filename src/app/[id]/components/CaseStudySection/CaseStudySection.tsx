"use client";

import ContentBlock from "@/components/ContentBlock";
import Section from "@/components/Section";
import type { Section as SectionType } from "@/types/case-study";
import { toKebabCase } from "@/utils/toSnakeCase";
import ContentRenderer from "./ContentRenderer";
import "./CaseStudySection.scss";

type CaseStudySectionProps = {
    section: SectionType;
}

export default function CaseStudySection({section}: CaseStudySectionProps) {
    return (
        <Section key={section.title} id={toKebabCase(section.title)}>
            <ContentBlock header={section.title} type="page">
                <div className="case-study-section__section">
                    <ContentRenderer contents={section.contents}/>
                </div>
            </ContentBlock>

            <div className="case-study-section__sub-section-container">
                {section.subsections?.map((subsection, index) => (
                    <div key={index}>
                        <ContentBlock header={subsection.title} type="subsection">
                            {subsection.contents && (
                                <div className="case-study-section__sub-section">
                                    <ContentRenderer contents={subsection.contents}/>
                                </div>
                            )}
                        </ContentBlock>
                    </div>
                ))}
            </div>
        </Section>
    );
}