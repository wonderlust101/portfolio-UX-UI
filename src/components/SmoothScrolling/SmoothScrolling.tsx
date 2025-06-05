"use client";

import { useEffect, useRef } from "react";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import type { LenisOptions } from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

const lenisOptions: LenisOptions = {
    duration: 1.5,
    lerp: 0.09,
};

function ScrollTriggerProxySetup() {
    const lenis = useLenis();

    useEffect(() => {
        if (!lenis) return;

        ScrollTrigger.scrollerProxy(document.body, {
            scrollTop(value) {
                if (value !== undefined) {
                    lenis.scrollTo(value);
                }
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

        const update = (time: number) => {
            lenis.raf(time);
            ScrollTrigger.update();
            requestAnimationFrame(update);
        };

        requestAnimationFrame(update);

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, [lenis]);

    return null;
}

export default function SmoothScrolling() {
    const lenisRef = useRef<any>(null);

    useEffect(() => {
        const handleMouseDown = (e: MouseEvent) => {
            if (e.button === 1 && lenisRef.current) {
                lenisRef.current.stop(); // pause smooth scroll
            }
        };

        const handleMouseUp = (e: MouseEvent) => {
            if (e.button === 1 && lenisRef.current) {
                lenisRef.current.start(); // resume smooth scroll
            }
        };

        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, []);

    return (
        <>
            <ReactLenis root options={lenisOptions} ref={lenisRef} />
            <ScrollTriggerProxySetup />
        </>
    );
}