import { changeColor } from "@/app/globalSlices/themeSlice";
import CaseStudyListing from "@/components/CaseStudyListing";
import ContentBlock from "@/components/ContentBlock";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import List from "@/components/List";
import Section from "@/components/Section";
import About from "@/pages/Home/components/About";
import "./Home.scss";
import Hero from "@/pages/Home/components/Hero";
import type { ProfileData } from "@/types/home";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

export default function Home() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(changeColor("green"));
    }, [dispatch]);

    const {id} = useParams();

    const [heroData, setHeroData] = useState<ProfileData | null>(null);
    const [status, setStatus] = useState("loading");

    useEffect(() => {
        import(`@/data/home.json`).then((mod) => {
            setHeroData(mod.default);
            setStatus("ok");
        }).catch(() => setStatus("error"));
    }, [id]);


    if (status === "error" || heroData === null) {
        return (<h1></h1>);
    }

    if (status === "loading") {
        return <h1></h1>;
    }

    return (
        <div className="home">
            <Header/>

            <main className="home__content">
                <Hero tagLine={heroData.tagLine} />

                <About aboutText={heroData.aboutText} additionalDetails={heroData.additionalDetails}/>

                <Section theme="light" header="Skills & Tools" id="skill-and-tools">
                    {heroData.skills.map((skill) => (
                        <ContentBlock key={skill.title} header={skill.title} theme="light">
                            <p>{skill.description}</p>
                            <List items={skill.skillList} type="list"/>
                        </ContentBlock>
                    ))}
                </Section>

                <Section theme="dark" header="Case Studies" id='case-studies'>
                    {heroData.caseStudies.map((caseStudy, index) => (
                        <CaseStudyListing key={index} caseStudy={caseStudy} index={index + 1}/>
                    ))}
                </Section>
            </main>

            <Footer theme="light"/>
        </div>
    );
}