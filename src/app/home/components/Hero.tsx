"use client";
import Button from "@/components/Button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { useEffect, useRef, useState } from "react";
import "./Hero.scss";

gsap.registerPlugin(SplitText);

export default function Hero() {
    const paragraphRef = useRef<HTMLParagraphElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
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
    }, []);

    useGSAP(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return;
        }

        const runAnimation = () => {
            const isFirefox = navigator.userAgent.toLowerCase().includes("firefox");
            const nameAnimationDelay = isFirefox ? 0 : 1.25;
            const contentAnimationDelay = isFirefox ? 0.75 : 2.5;

            const splitText = SplitText.create(".hero__name", {
                type: "chars",
                charsClass: "letter"
            });

            gsap.set(splitText.chars, { y: "200%" });
            gsap.to(splitText.chars, {
                y: "0%",
                duration: 1.25,
                stagger: 0.1,
                delay: nameAnimationDelay,
                ease: "power4.out"
            });

            // Set initial state explicitly before animating
            gsap.set([paragraphRef.current, buttonRef.current], {
                opacity: 0,
                y: 60
            });

            gsap.to([paragraphRef.current, buttonRef.current], {
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.15,
                delay: contentAnimationDelay,
                ease: "power4.out"
            });
        };

        const timeout = setTimeout(runAnimation, 50);
        return () => clearTimeout(timeout);
    }, [fontsLoaded]);

    return (
        <section className="hero grid-bleed-small" aria-labelledby="hero-heading">
            <div className="hero__body">
                <h1 id="hero-heading" className="heading-xl hero__name" aria-label="Sergei Borja">
                    <span aria-hidden="true">
                        Sergei <br className="hero__name--break"/> Borja
                    </span>
                </h1>
                <div>
                    <div className="hero__cta" ref={paragraphRef}>
                        <p className="hero__tag">
                            <span aria-hidden={true}>[ </span>
                            Full Stack Developer, UX & UI Designer
                            <span aria-hidden={true}> ]</span>
                        </p>
                        <div ref={buttonRef}>
                            <Button color="accent" theme="light" size="lg" href="mailto:sergei.borja0701@gmail.com">
                                Contact Me
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}