import CaseStudyHero from "@/app/[id]/components/CaseStudyHero";
import CaseStudySection from "@/app/[id]/components/CaseStudySection";
import OtherProjects from "@/app/[id]/components/OtherProjects";
import ProjectSummary from "@/app/[id]/components/ProjectSummary";
import Revealer from "@/components/Revealer";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import ThemeEffect from "@/components/ThemeEffect";
import { CaseStudy } from "@/types/case-study";
import { promises as fs } from "fs";
import { notFound } from "next/navigation";
import path from "path";

type Props = {
    params: Promise<{ id: string }>
};

export const dynamic = 'force-static';

export default async function CaseStudyPage({params}: Props) {
    const { id } = await params;
    const filePath = path.join(process.cwd(), "src", "data", `${id}.json`);

    let caseStudy: CaseStudy;

    try {
        const file = await fs.readFile(filePath, "utf8");
        caseStudy = JSON.parse(file);
    } catch (err) {
        return notFound();
    }

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

                <ProjectSummary details={caseStudy.projectSummary}/>

                {caseStudy.sections.map((section) => (
                    <CaseStudySection key={section.title} section={section}/>
                ))}

                <OtherProjects currentProject={id}/>
            </main>

        </>
    );
}