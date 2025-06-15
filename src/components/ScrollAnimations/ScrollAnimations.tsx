"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ScrollAnimations() {
    useGSAP(() => {
        const sectionsContainer = document.querySelector('main');
        if (!sectionsContainer) return;

        const elementsToAnimate = sectionsContainer.querySelectorAll(
            '.project-summary, .content-block, .case-study-page__divider, .home__divider, .case-study-navigation, #selected-works-heading,' +
            '#skills-and-tools-heading, .selected-works__list-item, .skills-list__type-container, .about'
        );

        gsap.set(elementsToAnimate, {
            opacity: 0,
            y: 100,
        });

        elementsToAnimate.forEach((el) => {
            const isDivider = el.matches('.case-study-page__divider, .home__divider');
            const isNav     = el.classList.contains('case-study-navigation');

            gsap.to(el, {
                opacity: isDivider ? 0.2 : 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                delay: isNav ? 0.5 : 0,
                scrollTrigger: {
                    trigger: el,
                    start: "top 80%",
                },
            });
        });
    });

    return null;
}