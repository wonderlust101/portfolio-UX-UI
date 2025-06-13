"use client";

import "./CaseStudyHero.scss";
import { buildNamedTransformUrl } from "@/lib/cloudinary";
import { parseHighlightedText } from "@/utils/parseHighlightedText";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { CldImage } from "next-cloudinary";
import { useEffect, useRef, useState } from "react";

// Only register plugin on client side
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
    const [tabletSrcSet, setTabletSrcSet] = useState<string|null>(null);
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isClient, setIsClient] = useState(false);

    // Handle client-side hydration
    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        try {
            const url = buildNamedTransformUrl(tabletHeroImage, "webp_high");
            setTabletSrcSet(url);
        } catch (error) {
            console.warn("Failed to build tablet image URL:", error);
        }
    }, [tabletHeroImage]);

    useEffect(() => {
        // Only run on client side
        if (!isClient) return;

        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(() => {
                setFontsLoaded(true);
            });
        } else {
            // Fallback for browsers that don't support document.fonts
            const timeout = setTimeout(() => {
                setFontsLoaded(true);
            }, 100);
            return () => clearTimeout(timeout);
        }
    }, [isClient]);

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    useGSAP(() => {
        // Ensure we're on client side and have necessary dependencies
        if (!isClient || typeof window === "undefined") return;

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return;
        }

        // Only animate when both fonts and image are loaded
        if (!fontsLoaded || !imageLoaded) return;

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

        // Set initial state before animating to prevent flash
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
    }, [fontsLoaded, imageLoaded, isClient]);

    return (
        <section className="case-study-hero grid-bleed-small" role="region" aria-labelledby="case-study-title">
            <h1 className="case-study-hero__header heading-lg" ref={titleRef} id="case-study-title">
                {productName}
                <span ref={typeRef} className="case-study-hero__type accent-color"> {parseHighlightedText(projectType)}</span>
            </h1>

            <picture
                className={`case-study-hero__image-container ${!imageLoaded ? 'loading' : ''}`}
                ref={imageRef}
                style={{
                    opacity: imageLoaded ? undefined : 0,
                    transform: imageLoaded ? undefined : 'translateY(160px)'
                }}
            >
                <source srcSet={tabletSrcSet!} media="(max-width: 90rem)"/>
                <CldImage
                    className="case-study-hero__image"
                    src={heroImage}
                    alt={`Screenshot preview of ${productName}, ${projectType}`}
                    height={1000}
                    width={1200}
                    quality={80}
                    priority
                    onLoad={handleImageLoad}
                />
            </picture>
        </section>
    );
}