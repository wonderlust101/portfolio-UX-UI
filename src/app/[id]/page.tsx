import CaseStudyHero from "@/app/[id]/components/CaseStudyHero";
import CaseStudySection from "@/app/[id]/components/CaseStudySection";
import ProjectSummary from "@/app/[id]/components/ProjectSummary";
import CaseStudyNavigation from "@/components/CaseStudyNavigation";
import Revealer from "@/components/Revealer";
import SelectedWorks from "@/components/SelectedWorks";
import ThemeEffect from "@/components/ThemeEffect";
import { getCaseStudy } from "@/lib/getCaseStudy";
import { ProjectData, Section } from "@/types/case-study";
import { notFound } from "next/navigation";
import "./CaseStudyPage.scss";
import { Fragment } from "react";

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
            <div aria-hidden={true}>
                <Revealer/>
                <ThemeEffect theme={caseStudy.theme}/>
            </div>

            <main className="case-study-page" id="main-content" aria-labelledby="case-study-title">
                <CaseStudyHero
                    productName={caseStudy.productName}
                    projectType={caseStudy.projectType}
                    heroImage={caseStudy.heroImage}
                    tabletHeroImage={caseStudy.heroImageTablet}
                />

                <div className="case-study-page__content grid-bleed">

                    <div className="case-study-page__main-content">
                        <CaseStudyNavigation sections={caseStudy.sections}/>

                        <div className="case-study-page__sections">
                            <ProjectSummary details={caseStudy.projectSummary}/>

                            {caseStudy.sections.map((section: Section) => (
                                <Fragment key={section.title}>
                                    <CaseStudySection section={section}/>
                                    <hr className="case-study-page__divider"/>
                                </Fragment>
                            ))}
                        </div>
                    </div>

                    <SelectedWorks title="Other Works" currentProject={`/${id}`}/>
                </div>
            </main>
        </>
    );
}