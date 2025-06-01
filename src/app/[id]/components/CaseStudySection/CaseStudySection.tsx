import ContentBlock from "@/components/ContentBlock";
import Section from "@/components/Section";
import ContentRenderer from "./ContentRenderer";
import ImageGallery from "./ImageGallery";
import type { CaseStudySection } from "@/types/case-study";
import "./CaseStudySection.scss";

type CaseStudySectionProps = {
    section: CaseStudySection;
}

export default function CaseStudySection({section}: CaseStudySectionProps) {
    return (
        <Section key={section.title}>
            <div className="case-study-section__section">
                <ContentBlock header={section.title}>
                    <ContentRenderer contents={section.contents}/>
                </ContentBlock>

                {section.images &&
                    <ImageGallery images={section.images}/>
                }
            </div>

            {section.subsections?.map((subsection) => (
                <div key={subsection.title} className="case-study-section__section">
                    <ContentBlock header={subsection.title} type="block">
                        <ContentRenderer contents={subsection.contents}/>
                    </ContentBlock>

                    {subsection.images &&
                        <ImageGallery images={subsection.images}/>
                    }
                </div>
            ))}
        </Section>
    );
}