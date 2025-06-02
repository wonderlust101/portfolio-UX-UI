"use client";

import Button from "@/components/Button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { useRef } from "react";
import "./Hero.scss";

gsap.registerPlugin(SplitText);

export default function Hero() {
    const paragraphRef = useRef<HTMLParagraphElement>(null);

    useGSAP(() => {
        const runAnimation = () => {

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
                [paragraphRef.current],
                {
                    opacity: 0,
                    y      : 60
                },
                {
                    opacity   : 1,
                    y         : 0,
                    duration  : 1,
                    stagger   : 0.15,
                    delay     : 2.5,
                    ease      : "power4.out",
                    clearProps: "all"
                }
            );
        };

        if (document.fonts?.ready) {
            document.fonts.ready.then(runAnimation);
        } else {
            runAnimation();
        }
    }, []);

    return (
        <section className="hero grid-bleed-small">
            <div className="hero__body">
                <h1 className="heading-xl hero__name">
                    Sergei <span className="hero__name--break"><br/></span> Borja
                </h1>

                <div>
                    <div className="hero__cta" ref={paragraphRef}>
                        <p className='hero__tag'>[ Full Stack Developer, UX & UI Designer ]</p>

                        <Button
                            color="accent"
                            theme="light"
                            size="lg"
                            href="mailto:sergei.borja0701@gmail.com"
                        >
                            Contact Me
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}