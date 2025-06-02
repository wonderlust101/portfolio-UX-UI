import ContentBlock from "@/components/ContentBlock";
import Persona from "@/components/Persona";
import Section from "@/components/Section";
import type { CaseStudySection } from "@/types/case-study";
import ContentRenderer from "./ContentRenderer";
import ImageGallery from "./ImageGallery";
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

            {section.subsections?.map((subsection, index) => (
                <div key={index} className="case-study-section__sub-section">
                    <ContentBlock header={subsection.title} type="block" hideDivider>
                        {subsection.contents &&
                            <ContentRenderer contents={subsection.contents}/>
                        }
                    </ContentBlock>

                    {subsection.persona &&
                        <Persona personaData={subsection.persona} />
                    }

                    {subsection.images &&
                        <ImageGallery images={subsection.images}/>
                    }
                </div>
            ))}
        </Section>
    );
}