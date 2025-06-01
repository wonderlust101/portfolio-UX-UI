"use client";

import About from "@/app/home/components/About";
import CaseStudyListing from "@/app/home/components/CaseStudyListing";
import Hero from "@/app/home/components/Hero";
import ContentBlock from "@/components/ContentBlock";
import List from "@/components/List";
import Section from "@/components/Section";
import { useRevealer } from "@/hooks/useRevealer";
import { useThemeStore } from "@/store/useThemeStore";
import type { ProfileData } from "@/types/home";
import { useEffect, useState } from "react";

export default function Home() {
    useRevealer();

    const [heroData, setHeroData] = useState<ProfileData|null>(null);
    const [status, setStatus] = useState("loading");
    const changeColor = useThemeStore((state) => state.changeColor);

    useEffect(() => {
        import("@/data/home.json").then((mod) => {
            setHeroData(mod.default);
            setStatus("ok");
        }).catch(() => setStatus("error"));
    }, []);

    useEffect(() => {
        changeColor("green");
    }, []);

    return (
        <>
            <div className="revealer"></div>

            {status === "ok" && heroData && (
                <>
                    <Hero tagLine={heroData.tagLine}/>

                    <Section header="Case Studies">
                        {heroData.caseStudies.map((caseStudy, index) => (
                            <CaseStudyListing key={index} caseStudy={caseStudy} index={index + 1}/>
                        ))}
                    </Section>

                    <Section header="Skills & Tools">
                        {heroData.skills.map((skill) => (
                            <ContentBlock key={skill.title} header={skill.title}>
                                <p>{skill.description}</p>
                                <List items={skill.skillList} type="list"/>
                            </ContentBlock>
                        ))}
                    </Section>

                    <About aboutText={heroData}/>
                </>
            )}
        </>
    );
}