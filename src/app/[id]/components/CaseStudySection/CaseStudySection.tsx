import ContentBlock from "@/components/ContentBlock";
import type { Section as SectionType } from "@/types/case-study";
import ContentRenderer from "./ContentRenderer";
import "./CaseStudySection.scss";

type CaseStudySectionProps = {
    section: SectionType;
}

export default function CaseStudySection({section}: CaseStudySectionProps) {

    return (
        <ContentBlock header={section.title} type="section" icon={section.icon}>
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
    );
}