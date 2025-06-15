"use client";

import "./CaseStudyHero.scss";
import { parseHighlightedText } from "@/utils/parseHighlightedText";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import Image from "next/image"
import { useParams } from "next/navigation";
import { useRef } from "react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(SplitText);
}

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

    const params = useParams();
    const slug = params.id as string;
    const imgSrcTablet = `${process.env.NEXT_PUBLIC_R2_BUCKET_URL}/${slug}/${tabletHeroImage}.webp`;
    const imgSrcDesktop = `${process.env.NEXT_PUBLIC_R2_BUCKET_URL}/${slug}/${heroImage}.webp`;

    useGSAP(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return;
        }

        const isFirefox = navigator.userAgent.toLowerCase().includes("firefox");

        const titleDelay = isFirefox ? 0.20 : 1.75;
        const imageDelay = isFirefox ? 0 : 1.45;

        if (!titleRef.current || !imageRef.current) return;

        const splitText = SplitText.create(titleRef.current, {
            type      : "words",
            charsClass: "letter"
        });

        gsap.set(splitText.words, {y: "300%", force3D: true});

        gsap.to(splitText.words, {
            y       : "0%",
            duration: 1.25,
            stagger : 0.1,
            delay   : titleDelay,
            ease    : "power3.out",
            force3D : true
        });

        gsap.set(imageRef.current, {
            opacity: 0,
            y: 160,
            force3D: true
        });

        gsap.to(imageRef.current, {
            opacity : 1,
            y       : 0,
            duration: 1.5,
            delay   : imageDelay,
            ease    : "power3.out",
            force3D : true
        });
    }, []);

    return (
        <section className="case-study-hero grid-bleed-small" role="region" aria-labelledby="case-study-title">
            <h1 className="case-study-hero__header heading-lg" ref={titleRef} id="case-study-title">
                {productName}
                <span ref={typeRef} className="case-study-hero__type accent-color"> {parseHighlightedText(projectType)}</span>
            </h1>

            <picture
                className="case-study-hero__image-container"
                ref={imageRef}
            >
                <source srcSet={imgSrcTablet} media="(max-width: 90rem)"/>
                <Image
                    className="case-study-hero__image"
                    src={imgSrcDesktop}
                    alt={`Screenshot preview of ${productName}, ${projectType}`}
                    sizes="100vw"
                    fill
                    quality={100}
                    priority
                />
            </picture>
        </section>
    );
}