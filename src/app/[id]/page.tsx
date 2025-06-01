"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import CaseStudyHero from "@/app/[id]/components/CaseStudyHero";
import CaseStudySection from "@/app/[id]/components/CaseStudySection";
import OtherProjects from "@/app/[id]/components/OtherProjects";
import ProjectSummary from "@/app/[id]/components/ProjectSummary";

import { useRevealer } from "@/hooks/useRevealer";
import { useThemeStore } from "@/store/useThemeStore";
import type { CaseStudy } from "@/types/case-study";

export default function CaseStudyPage() {
    useRevealer();

    const params = useParams();
    const id = params?.id as string | undefined;

    const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
    const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");

    const changeColor = useThemeStore((state) => state.changeColor);

    useEffect(() => {
        if (!id) return;

        fetch(`/data/${id}.json`)
        .then((res) => {
            if (!res.ok) throw new Error("Failed to load");
            return res.json();
        })
        .then((data: CaseStudy) => {
            setCaseStudy(data);
            setStatus("ok");
        })
        .catch(() => {
            setStatus("error");
        });
    }, [id]);

    useEffect(() => {
        if (caseStudy) {
            changeColor(caseStudy.theme);
        }
    }, [caseStudy, changeColor]);

    return (
        <>
            <div className="revealer" />

            {status === "loading" && <p className="text-center">Loading project...</p>}

            {status === "error" && (
                <p className="text-center text-red-500">Project not found.</p>
            )}

            {status === "ok" && caseStudy && (
                <main className="home__content">
                    <CaseStudyHero
                        productName={caseStudy.productName}
                        projectType={caseStudy.projectType}
                        heroImage={caseStudy.heroImage}
                        mobileHeroImage={caseStudy.heroImageMobile}
                        tabletHeroImage={caseStudy.heroImageTablet}
                    />

                    <ProjectSummary details={caseStudy.projectSummary} />

                    {caseStudy.sections.map((section) => (
                        <CaseStudySection key={section.title} section={section} />
                    ))}

                    <OtherProjects currentProject={id!} />
                </main>
            )}
        </>
    );
}