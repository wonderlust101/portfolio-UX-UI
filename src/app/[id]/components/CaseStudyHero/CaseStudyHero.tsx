"use client";

import SectionHeader from "@/components/SectionHeader";
import "./CaseStudyHero.scss";
import { parseHighlightedText } from "@/utils/parseHighlightedText";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { useRef } from "react";

gsap.registerPlugin(SplitText);

type CaseStudyHeroProps = {
    productName: string;
    projectType: string;
    heroImage: string;
    mobileHeroImage: string;
    tabletHeroImage: string;
}

export default function CaseStudyHero({productName, projectType, heroImage, mobileHeroImage, tabletHeroImage}: CaseStudyHeroProps) {
    const titleRef = useRef<HTMLHeadingElement|null>(null);
    const typeRef = useRef<HTMLDivElement|null>(null);
    const imageRef = useRef<HTMLImageElement|null>(null);

    useGSAP(() => {
        if (!titleRef.current) return;

        const splitText = SplitText.create(titleRef.current, {
            type      : "words",
            charsClass: "letter"
        });

        gsap.set(splitText.words, {y: "300%"});

        gsap.to(splitText.words, {
            y       : "0%",
            duration: 1.75,
            stagger : 0.15,
            delay   : 2.25,
            ease    : "power4.out"
        });

        gsap.fromTo(
            [imageRef.current],
            {
                opacity: 0,
                y      : 160
            },
            {
                opacity   : 1,
                y         : 0,
                duration  : 1.5,
                stagger   : 0.15,
                delay     : 1.75,
                ease      : "power4.out",
                clearProps: "all"
            }
        );
    }, []);

    return (
        <section className="case-study-hero grid-bleed-small">
            <div className="case-study-hero__image-container">
                <picture className="case-study-hero__image-container">
                    <source srcSet={mobileHeroImage} media="(max-width: 48rem)" />
                    <source srcSet={tabletHeroImage} media="(max-width: 74rem)" />
                    <img
                        ref={imageRef}
                        className="case-study-hero__image"
                        src={heroImage}
                        alt={`Preview of ${productName} ${projectType}`}
                    />
                </picture>
            </div>

            <div className="case-study-hero__header" ref={titleRef}>
                <SectionHeader type="page">
                    <span>{productName}</span>
                    <div ref={typeRef} className="case-study-hero__type"> {parseHighlightedText(projectType)}</div>
                </SectionHeader>
            </div>
        </section>
    );
}