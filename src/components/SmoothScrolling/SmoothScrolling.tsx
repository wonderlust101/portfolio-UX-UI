"use client";

import { useEffect } from "react";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import type { LenisOptions } from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

const lenisOptions: LenisOptions = {
    duration: 1.5,
    lerp: 0.09,
};

function isFirefox(): boolean {
    return (
        typeof navigator !== "undefined" &&
        /firefox/i.test(navigator.userAgent)
    );
}

function ScrollTriggerProxySetup() {
    const lenis = useLenis();

    useEffect(() => {
        if (!lenis || isFirefox()) return;

        ScrollTrigger.scrollerProxy(document.body, {
            scrollTop(v) {
                if (v !== undefined) lenis.scrollTo(v);
                return lenis.scroll;
            },
            getBoundingClientRect() {
                return {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight,
                };
            },
            fixedMarkers: true,
        });

        lenis.on("scroll", () => {
            ScrollTrigger.update();
        });

        ScrollTrigger.refresh();

        return () => {
            ScrollTrigger.getAll().forEach((t) => t.kill());
            lenis.off("scroll", ScrollTrigger.update);
        };
    }, [lenis]);

    return null;
}

export default function SmoothScrolling() {
    if (isFirefox()) return null;

    return (
        <>
            <ReactLenis root options={lenisOptions} />
            <ScrollTriggerProxySetup />
        </>
    );
}