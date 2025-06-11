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
                {section.contents &&
                    <div className="case-study-section__section">
                        <ContentRenderer contents={section.contents}/>
                    </div>
                }

                {section.subsections?.map((subsection) => (
                    <ContentBlock
                        key={subsection.title}
                        header={subsection.title}
                        type="subsection"
                        hasSectionContent={!!section.contents}
                    >
                        {subsection.contents && (
                            <div className="case-study-section__sub-section">
                                <ContentRenderer contents={subsection.contents}/>
                            </div>
                        )}
                    </ContentBlock>
                ))}
            </ContentBlock>
        </Section>
    );
}