import ContentBlock from "@/components/ContentBlock";
import type { Section as SectionType } from "@/types/case-study";
import ContentRenderer from "./ContentRenderer";
import "./CaseStudySection.scss";

type CaseStudySectionProps = {
    section: SectionType;
    slug: string;
}

export default async function CaseStudySection({section, slug}: CaseStudySectionProps) {
    return (
        <ContentBlock header={section.title} type="section" icon={section.icon}>
            {section.contents &&
                <div className="case-study-section__section">
                    <ContentRenderer contents={section.contents} slug={slug}/>
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
                            <ContentRenderer contents={subsection.contents} slug={slug}/>
                        </div>
                    )}
                </ContentBlock>
            ))}
        </ContentBlock>
    );
}