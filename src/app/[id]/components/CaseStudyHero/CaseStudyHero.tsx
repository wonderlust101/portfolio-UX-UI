"use client";

import "./CaseStudyHero.scss";
import { buildNamedTransformUrl } from "@/lib/cloudinary";
import { parseHighlightedText } from "@/utils/parseHighlightedText";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { CldImage } from "next-cloudinary";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(SplitText);

type CaseStudyHeroProps = {
    productName: string;
    projectType: string;
    heroImage: string;
    tabletHeroImage: string;
}

export default function CaseStudyHero({productName, projectType, heroImage, tabletHeroImage}: CaseStudyHeroProps) {
    const titleRef = useRef<HTMLHeadingElement|null>(null);
    const typeRef = useRef<HTMLDivElement|null>(null);
    const imageRef = useRef<HTMLImageElement|null>(null);
    const [tabletSrcSet, setTabletSrcSet] = useState<string|null>(null);

    useEffect(() => {
        try {
            const url = buildNamedTransformUrl(tabletHeroImage, "webp_high");
            setTabletSrcSet(url);
        } catch (error) {
            console.warn("Failed to build tablet image URL:", error);
        }
    }, [tabletHeroImage]);

    useGSAP(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return;
        }
        const isFirefox =
            typeof (window as any).InstallTrigger !== "undefined" ||
            navigator.userAgent.toLowerCase().includes("firefox");

        const titleDelay = isFirefox ? 0.20 : 1.75;
        const imageDelay = isFirefox ? 0 : 1.55;

        if (!titleRef.current) return;

        const splitText = SplitText.create(titleRef.current, {
            type      : "words",
            charsClass: "letter"
        });

        gsap.set(splitText.words, {y: "300%"});

        gsap.to(splitText.words, {
            y       : "0%",
            duration: 1.25,
            stagger : 0.1,
            delay   : titleDelay,
            ease    : "power3.out"
        });

        gsap.fromTo(
            [imageRef.current],
            {
                opacity: 0,
                y      : 160
            },
            {
                opacity : 1,
                y       : 0,
                duration: 1.5,
                stagger : 0.15,
                delay   : imageDelay,
                ease    : "power3.out"
            }
        );
    });

    return (
        <section className="case-study-hero grid-bleed-small" role="region" aria-labelledby="case-study-title">
            <h1 className="case-study-hero__header" ref={titleRef} id="case-study-title">
                <span className="heading-lg">{productName}</span>
                <span ref={typeRef} className="heading-lg case-study-hero__type accent-color"> {parseHighlightedText(projectType)}</span>
            </h1>

            <picture className="case-study-hero__image-container" ref={imageRef}>
                <source srcSet={tabletSrcSet!} media="(max-width: 90rem)"/>
                <CldImage
                    className="case-study-hero__image"
                    src={heroImage}
                    alt={`Screenshot preview of ${productName}, ${projectType}`}
                    height={1000}
                    width={1200}
                    quality={80}
                    priority
                />
            </picture>
        </section>
    );
}