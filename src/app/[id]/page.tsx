import CaseStudyHero from "@/app/[id]/components/CaseStudyHero";
import CaseStudySection from "@/app/[id]/components/CaseStudySection";
import OtherProjects from "@/app/[id]/components/OtherProjects";
import ProjectSummary from "@/app/[id]/components/ProjectSummary";
import CaseStudyNavigation from "@/components/CaseStudyNavigation";
import Revealer from "@/components/Revealer";
import ThemeEffect from "@/components/ThemeEffect";
import { getCaseStudy } from "@/lib/getCaseStudy";
import { ProjectData, Section } from "@/types/case-study";
import { notFound } from "next/navigation";
import "./CaseStudyPage.scss";

type Props = {
    params: Promise<{id: string}>
};

export default async function CaseStudyPage({params}: Props) {
    const {id} = await params;
    const caseStudy: ProjectData|null = await getCaseStudy(id);

    if (!caseStudy || !caseStudy.sections) {
        return notFound();
    }

    return (
        <>
            <Revealer/>
            <ThemeEffect theme={caseStudy.theme}/>

            <main className='case-study-page'>
                <CaseStudyHero
                    productName={caseStudy.productName}
                    projectType={caseStudy.projectType}
                    heroImage={caseStudy.heroImage}
                    tabletHeroImage={caseStudy.heroImageTablet}
                />

                <ProjectSummary details={caseStudy.projectSummary}/>

                <div className="grid-bleed">
                    <div className='case-study-page__main-content'>
                        <CaseStudyNavigation sections={caseStudy.sections}/>

                        <div className="case-study-page__sections">
                            {caseStudy.sections.map((section: Section) => (
                                <CaseStudySection key={section.title} section={section}/>
                            ))}
                        </div>
                    </div>
                </div>

                <OtherProjects currentProject={`/${id}`}/>
            </main>
        </>
    );
}