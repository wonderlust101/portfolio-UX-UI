import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import type { CaseStudy } from "@/types/case-study";
import { changeColor } from "@/app/globalSlices/themeSlice";
import CaseStudyHero from "@/components/CaseStudyHero";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import CaseStudySection from "@/pages/CaseStudy/components/CaseStudySection";
import OtherProjects from "@/pages/CaseStudy/components/OtherProjects";
import ProjectSummary from "@/pages/CaseStudy/components/ProjectSummary";

export default function CaseStudy() {
    const dispatch = useDispatch();
    const {id} = useParams();

    const [caseStudy, setCaseStudy] = useState<CaseStudy|null>(null);
    const [status, setStatus] = useState("loading");

    useEffect(() => {
        import(`@/data/${id}.json`).then((mod) => {
            setCaseStudy(mod.default);
            setStatus("ok");
        }).catch(() => setStatus("error"));
    }, [id]);

    useEffect(() => {
        if (caseStudy) {
            dispatch(changeColor(caseStudy.theme));
        }
    }, [caseStudy, dispatch]);

    if (status === "error" || caseStudy === null) {
        return (<h1></h1>);
    }

    if (status === "loading") {
        return <h1></h1>;
    }

    return (
        <div>
            <Header/>

            <main className="home__content">
                <CaseStudyHero
                    productName={caseStudy.productName}
                    projectType={caseStudy.projectType}
                    heroImage={caseStudy.heroImage}
                />

                <ProjectSummary details={caseStudy.projectSummary}/>

                {caseStudy.sections.map((section, index) => (
                    <CaseStudySection key={section.title} section={section} theme={index % 2 === 0 ? "dark" : "light"}/>
                ))}

                <OtherProjects
                    currentProject={id}
                />
            </main>

            <Footer theme="dark"/>
        </div>
    );
}