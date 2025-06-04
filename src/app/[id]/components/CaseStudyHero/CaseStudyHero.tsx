"use client";

import OptimizedImage from "@/components/OptimizedImage";
import SectionHeader from "@/components/SectionHeader";
import "./CaseStudyHero.scss";
import { buildNamedTransformUrl, buildNamedTransformUrlTablet } from "@/lib/cloudinary";
import { useThemeStore } from "@/store/useThemeStore";
import { parseHighlightedText } from "@/utils/parseHighlightedText";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(SplitText);

type CaseStudyHeroProps = {
    productName: string;
    projectType: string;
    heroImage: string;
    tabletHeroImage: string;
}

export default function CaseStudyHero({productName, projectType, heroImage, tabletHeroImage}: CaseStudyHeroProps) {
    const color = useThemeStore((state) => state.color);
    const [tabletImage, setTabletImage] = useState<string>("");
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
    }, [color]);

    useEffect(() => {
        setTabletImage(buildNamedTransformUrlTablet(tabletHeroImage, "webp_high"));
    }, []);

    return (
        <section className="case-study-hero grid-bleed-small">
            <div className="case-study-hero__image-container">
                <picture className="case-study-hero__image-container" ref={imageRef}>
                    <source srcSet={tabletImage!} media="(max-width: 100rem)"/>
                    <OptimizedImage
                        className="case-study-hero__image"
                        src={buildNamedTransformUrl(heroImage, "webp_high")}
                        alt={`Preview of ${productName} ${projectType}`}
                        height={800}
                        width={2200}
                        quality={80}
                        priority
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