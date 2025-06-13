import gsap from "gsap";
import { RefObject, useEffect, useRef } from "react";

export function useWindowScrollFixed(headerRef: RefObject<HTMLElement|null>, isMenuOpen: boolean) {
    const frame = useRef<number | null>(null);
    const lastY = useRef<number>(typeof window !== "undefined" ? window.scrollY : 0);
    const isAnimating = useRef<boolean>(false);

    useEffect(() => {
        const SCROLL_THRESHOLD = 20;

        const handleScroll = () => {
            if (frame.current == null && !isAnimating.current) {
                frame.current = requestAnimationFrame(() => {
                    const currentY = window.scrollY;
                    const diff = Math.abs(currentY - lastY.current);

                    if (diff < SCROLL_THRESHOLD && currentY !== 0) {
                        frame.current = null;
                        return;
                    }

                    const el = headerRef.current;

                    if (el) {
                        if (currentY === 0 || currentY < lastY.current || isMenuOpen) {
                            gsap.to(el, {y: 0, duration: 0.6});
                        } else if (currentY > lastY.current) {
                            gsap.to(el, {y: -100, duration: 0.6});
                        }
                    }
                    lastY.current = currentY;
                    frame.current = null;
                });
            }
        };

        window.addEventListener("scroll", handleScroll, {passive: true});
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (frame.current) cancelAnimationFrame(frame.current);
        };
    }, [headerRef, isMenuOpen]);
}