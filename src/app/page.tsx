import About from "@/app/home/components/About";
import CaseStudyListing from "@/app/home/components/CaseStudyListing";
import Hero from "@/app/home/components/Hero";
import ContentBlock from "@/components/ContentBlock";
import List from "@/components/List";
import Revealer from "@/components/Revealer";
import Section from "@/components/Section";
import ThemeEffect from "@/components/ThemeEffect";
import { ProfileData } from "@/types/home";
import { promises as fs } from "fs";
import { notFound } from "next/navigation";
import path from "path";

export default async function Home() {
    const filePath = path.join(process.cwd(), "src", "data", `home.json`);

    let homeData: ProfileData;

    try {
        const file = await fs.readFile(filePath, "utf8");
        homeData = JSON.parse(file);
    } catch (err) {
        return notFound();
    }

    return (
        <>
            <Revealer/>
            <ThemeEffect theme={"green"}/>

            <Hero/>

            <Section header="Featured Case Studies">
                {homeData.caseStudies.map((caseStudy, index) => (
                    <CaseStudyListing key={index} caseStudy={caseStudy} index={index + 1}/>
                ))}
            </Section>

            <Section header="Skills & Tools">
                {homeData.skills.map((skill) => (
                    <ContentBlock key={skill.title} header={skill.title}>
                        <p>{skill.description}</p>
                        <List items={skill.skillList} type="list"/>
                    </ContentBlock>
                ))}
            </Section>

            <About aboutText={homeData}/>
        </>
    );
}