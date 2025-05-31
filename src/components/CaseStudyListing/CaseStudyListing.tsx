import type { RootState } from "@/app/store";
import Button from "@/components/Button";
import "./CaseStudyListing.scss";
import type { CaseStudyList } from "@/types/home";
import { useSelector } from "react-redux";

type CaseStudyListingProps = {
    caseStudy: CaseStudyList;
    index: number;
}

export default function CaseStudyListing({caseStudy, index}: CaseStudyListingProps) {
    const color = useSelector((state: RootState) => state.theme.color);

    return (
        <div>
            <hr/>

            <section className="case-study-listing">
                <div className="case-study-listing__text-column">
                    <h3 className="heading-sm">
                        <span className={`${color}-accent-dark`}>// </span>
                        0{index}
                        <span className={`${color}-accent-dark`}>.</span>
                    </h3>

                    <div className="case-study-listing__description">
                        <div className="case-study-listing__text">
                            <div className="case-study-listing__header">
                                <p>{caseStudy.type}</p>
                                <h3 className="heading-xs">{caseStudy.title}</h3>
                            </div>

                            <p>{caseStudy.description}</p>
                        </div>

                        <Button color="white" size="md" href={caseStudy.link}>Read More</Button>
                    </div>
                </div>

                <img className="case-study-listing__image" src={caseStudy.previewImage} alt=""/>
            </section>
        </div>
    );
}