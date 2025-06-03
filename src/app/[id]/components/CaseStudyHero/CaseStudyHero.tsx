"use client";

import SectionHeader from "@/components/SectionHeader";
import "./CaseStudyHero.scss";
import { useThemeStore } from "@/store/useThemeStore";
import { getPlaceholderUrl } from "@/utils/getPlaceholderUrl";
import { parseHighlightedText } from "@/utils/parseHighlightedText";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import Image from "next/image";
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
    const color = useThemeStore((state) => state.color);
    const titleRef = useRef<HTMLHeadingElement|null>(null);
    const typeRef = useRef<HTMLDivElement|null>(null);
    const imageRef = useRef<HTMLImageElement|null>(null);

    useGSAP(() => {
        if (!titleRef.current || !color) return;

        // Small delay to ensure color classes are applied
        gsap.delayedCall(0.1, () => {
            const splitText = SplitText.create(titleRef.current, {
                type      : "words",
                charsClass: "letter"
            });

            gsap.set(splitText.words, {y: "300%"});

            gsap.to(splitText.words, {
                y       : "0%",
                duration: 1.5,
                stagger : 0.1,
                delay   : 1.50,
                ease    : "power3.out"
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
                    delay     : 1.55,
                    ease      : "power3.out",
                }
            );
        });
    }, [color]); // Add color as dependency

    return (
        <section className="case-study-hero grid-bleed-small">
            <div className="case-study-hero__image-container">
                <picture className="case-study-hero__image-container">
                    <source srcSet={mobileHeroImage} media="(max-width: 48rem)"/>
                    <source srcSet={tabletHeroImage} media="(max-width: 74rem)"/>
                    <Image
                        ref={imageRef}
                        className="case-study-hero__image"
                        src={`/${heroImage.replace(/^\/?/, "")}`}
                        alt={`Preview of ${productName} ${projectType}`}
                        height={1600}
                        width={1600}
                        quality={80}
                        priority
                        placeholder="blur"
                        blurDataURL={getPlaceholderUrl(heroImage)}
                    />
                </picture>
            </div>

            <div className="case-study-hero__header">
                <SectionHeader type="page" ref={titleRef}>
                    <span>{productName}</span>
                    <div ref={typeRef} className={`case-study-hero__type ${color}-accent-light`}> {parseHighlightedText(projectType)}</div>
                </SectionHeader>
            </div>
        </section>
    );
}