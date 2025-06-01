"use client";

import { useEffect, useState } from "react";
import Hero from "@/app/home/components/Hero";
import CaseStudyListing from "@/app/home/components/CaseStudyListing";
import About from "@/app/home/components/About";
import Section from "@/components/Section";
import ContentBlock from "@/components/ContentBlock";
import List from "@/components/List";

import { useRevealer } from "@/hooks/useRevealer";
import { useThemeStore } from "@/store/useThemeStore";
import type { ProfileData } from "@/types/home";

export default function Home() {
    useRevealer();

    const [heroData, setHeroData] = useState<ProfileData | null>(null);
    const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");

    const changeColor = useThemeStore((state) => state.changeColor);

    useEffect(() => {
        // ✅ Load from public folder
        fetch("/data/home.json")
        .then((res) => {
            if (!res.ok) throw new Error("Failed to load data");
            return res.json();
        })
        .then((data: ProfileData) => {
            setHeroData(data);
            setStatus("ok");
        })
        .catch(() => setStatus("error"));
    }, []);

    useEffect(() => {
        changeColor("green");
    }, [changeColor]);

    return (
        <>
            <div className="revealer" />

            {status === "loading" && <p className="text-center">Loading homepage...</p>}

            {status === "error" && (
                <p className="text-center text-red-500">Failed to load content.</p>
            )}

            {status === "ok" && heroData && (
                <>
                    <Hero tagLine={heroData.tagLine} />

                    <Section header="Case Studies">
                        {heroData.caseStudies.map((caseStudy, index) => (
                            <CaseStudyListing key={index} caseStudy={caseStudy} index={index + 1} />
                        ))}
                    </Section>

                    <Section header="Skills & Tools">
                        {heroData.skills.map((skill) => (
                            <ContentBlock key={skill.title} header={skill.title}>
                                <p>{skill.description}</p>
                                <List items={skill.skillList} type="list" />
                            </ContentBlock>
                        ))}
                    </Section>

                    <About aboutText={heroData} />
                </>
            )}
        </>
    );
}