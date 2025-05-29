import ContentBlock from "@/components/ContentBlock";
import Section from "@/components/Section";
import ContentRenderer from "@/pages/CaseStudy/components/CaseStudySection/ContentRenderer";
import ImageGallery from "@/pages/CaseStudy/components/CaseStudySection/ImageGallery";
import type { CaseStudySection } from "@/types/case-study";
import "./CaseStudySection.scss";

type CaseStudySectionProps = {
    section: CaseStudySection;
    theme: "light"|"dark";
}

export default function CaseStudySection({section, theme}: CaseStudySectionProps) {
    return (
        <Section key={section.title} theme={theme}>
            <div className="case-study-section__section">
                <ContentBlock header={section.title} theme={theme}>
                    <ContentRenderer contents={section.contents} theme={theme}/>
                </ContentBlock>

                {section.images &&
                    <ImageGallery images={section.images}/>
                }
            </div>

            {section.subsections?.map((subsection) => (
                <div key={subsection.title} className="case-study-section__section">
                    <ContentBlock header={subsection.title} type="block" theme={theme}>
                        <ContentRenderer contents={subsection.contents} theme={theme}/>
                    </ContentBlock>

                    {subsection.images &&
                        <ImageGallery images={subsection.images}/>
                    }
                </div>
            ))}
        </Section>
    );
}