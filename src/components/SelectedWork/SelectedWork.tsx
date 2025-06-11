"use client";

import Button from "@/components/Button";
import "./SelectedWork.scss";
import type { CaseStudyList } from "@/types/home";
import { CldImage } from "next-cloudinary";

type CaseStudyListingProps = {
    caseStudy: CaseStudyList;
    index: number;
};

export default function SelectedWork({caseStudy, index}: CaseStudyListingProps) {
    return (
        <div>
            <section className="selected-work">
                <div className="selected-work__text-column">
                    <h3 className="heading-sm">
                        <span className="accent-color">// </span>
                        0{index}
                        <span className="accent-color">.</span>
                    </h3>

                    <div className="selected-work__description">
                        <div className="selected-work__text">
                            <div className="selected-work__header">
                                <p>{caseStudy.type}</p>
                                <h3 className="heading-xs">{caseStudy.title}</h3>
                            </div>

                            <p>{caseStudy.description}</p>
                        </div>

                        <Button color="accent" size="md" href={caseStudy.link}>
                            Read More
                        </Button>
                    </div>
                </div>

                <div>
                    <CldImage
                        className="selected-work__image"
                        src={caseStudy.previewImage}
                        alt={caseStudy.title}
                        loading="lazy"
                        width={750}
                        height={750}
                        quality={50}
                    />
                </div>
            </section>
        </div>
    );
}