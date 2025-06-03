import CaseStudyHero from "@/app/[id]/components/CaseStudyHero";
import CaseStudySection from "@/app/[id]/components/CaseStudySection";
import OtherProjects from "@/app/[id]/components/OtherProjects";
import ProjectSummary from "@/app/[id]/components/ProjectSummary";
import Revealer from "@/components/Revealer";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import ScrollTracker from "@/components/ScrollTracker";
import ThemeEffect from "@/components/ThemeEffect";
import { getCaseStudy } from "@/lib/getCaseStudy";
import { notFound } from "next/navigation";

type Props = {
    params: Promise<{ id: string }>
};

export const dynamic = 'force-static';

export default async function CaseStudyPage({params}: Props) {
    const { id } = await params;
    const caseStudy = await getCaseStudy(id);

    if (!caseStudy || !caseStudy.sections) {
        return notFound();
    }

    return (
        <>
            <Revealer/>
            <ThemeEffect theme={caseStudy.theme}/>

            <ScrollToTopButton/>

            <main className="home__content">
                <CaseStudyHero
                    productName={caseStudy.productName}
                    projectType={caseStudy.projectType}
                    heroImage={caseStudy.heroImage}
                    mobileHeroImage={caseStudy.heroImageMobile}
                    tabletHeroImage={caseStudy.heroImageTablet}
                />

                <ScrollTracker>
                    <ProjectSummary details={caseStudy.projectSummary} />

                    {caseStudy.sections.map((section) => (
                        <CaseStudySection key={section.title} section={section} />
                    ))}
                </ScrollTracker>

                <OtherProjects currentProject={id}/>
            </main>

        </>
    );
}