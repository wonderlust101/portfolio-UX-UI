"use client";

import CaseStudyHero from "@/app/[id]/components/CaseStudyHero";
import CaseStudySection from "@/app/[id]/components/CaseStudySection";
import OtherProjects from "@/app/[id]/components/OtherProjects";
import ProjectSummary from "@/app/[id]/components/ProjectSummary";
import { useRevealer } from "@/hooks/useRevealer";
import { useThemeStore } from "@/store/useThemeStore";

import type { CaseStudy } from "@/types/case-study";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CaseStudyPage() {
    useRevealer();

    const params = useParams();
    const id = params?.id as string;

    const [caseStudy, setCaseStudy] = useState<CaseStudy|null>(null);
    const [status, setStatus] = useState("loading");
    const changeColor = useThemeStore((state) => state.changeColor);

    useEffect(() => {
        if (!id) return;

        import(`@/data/${id}.json`).then((mod) => {
            setCaseStudy(mod.default);
            setStatus("ok");
        }).catch(() => setStatus("error"));
    }, [id]);

    useEffect(() => {
        if (caseStudy) {
            changeColor(caseStudy.theme);
        }
    }, [caseStudy]);

    return (
        <>
            <div className="revealer"></div>
            {status === "ok" && caseStudy && (

                <main className="home__content">
                    <CaseStudyHero
                        productName={caseStudy.productName}
                        projectType={caseStudy.projectType}
                        heroImage={caseStudy.heroImage}
                        mobileHeroImage={caseStudy.heroImageMobile}
                        tabletHeroImage={caseStudy.heroImageTablet}
                    />

                    <ProjectSummary details={caseStudy.projectSummary}/>

                    {caseStudy.sections.map((section, index) => (
                        <CaseStudySection key={section.title} section={section}/>
                    ))}

                    <OtherProjects currentProject={id}/>
                </main>
            )}
        </>
    );
}