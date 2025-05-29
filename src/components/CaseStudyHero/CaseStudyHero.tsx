import type { RootState } from "@/app/store";
import SectionHeader from "@/components/SectionHeader";
import { useSelector } from "react-redux";
import "./CaseStudyHero.scss";

type CaseStudyHeroProps = {
    productName: string;
    projectType: string;
    heroImage: string;
}

export default function CaseStudyHero({productName, projectType, heroImage}: CaseStudyHeroProps) {
    const color = useSelector((state: RootState) => state.theme.color);

    return (
        <section className="case-study-hero grid-bleed-small">
            <SectionHeader type="page">
                {productName}
                <div className={`case-study-hero__type ${color}-accent-light`}> {projectType}</div>
            </SectionHeader>

            <div className="case-study-hero__image-container">
                <img className="case-study-hero__image" src={heroImage} alt={`Preview of ${productName} ${projectType}`}/>
            </div>
        </section>
    );
}