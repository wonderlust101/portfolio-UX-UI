"use client";

import Button from "@/components/Button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { useRef } from "react";
import Marquee from "react-fast-marquee";
import "./Hero.scss";

type HeroProps = {
    tagLine: string;
};

gsap.registerPlugin(SplitText);

export default function Hero({tagLine}: HeroProps) {
    const paragraphRef = useRef<HTMLParagraphElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const marqueeRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const splitText = SplitText.create(".hero__name", {
            type      : "chars",
            charsClass: "letter"
        });

        gsap.set(splitText.chars, {y: "110%"});

        gsap.to(splitText.chars, {
            y       : "0%",
            duration: 1.5,
            stagger : 0.1,
            delay   : 1.25,
            ease    : "power4.out"
        });

        gsap.fromTo(
            [paragraphRef.current, imageRef.current, marqueeRef.current],
            {
                opacity: 0,
                y      : 60
            },
            {
                opacity : 1,
                y       : 0,
                duration: 1,
                stagger : 0.15,
                delay   : 2.5,
                ease    : "power4.out",
                clearProps: "all",
            }
        );
    }, []);

    return (
        <section className="hero grid-bleed-small">
            <h1 className="heading-xl hero__name">
                Sergei<span className="hero__name--break"></span> Borja
            </h1>

            <div className="hero__body">
                <div className="hero__cta" ref={paragraphRef}>
                    <p>{tagLine}</p>

                    <Button
                        color="accent"
                        theme="light"
                        size="lg"
                        href="mailto:sergei.borja0701@gmail.com"
                    >
                        Contact Me
                    </Button>
                </div>

                <img
                    className="hero__image"
                    ref={imageRef}
                    src="images/home/sergei-borja.webp"
                    alt="Sergei Borja"
                />
            </div>

            <div className="hero__scrolling-text-container" ref={marqueeRef}>
                <Marquee>
                    <p className="hero__scrolling-text">
                        <span>UX & UI Designer</span>
                        <span>Full Stack Developer</span>
                        <span>UX & UI Designer</span>
                        <span>Full Stack Developer</span>
                    </p>
                </Marquee>
            </div>
        </section>
    );
}