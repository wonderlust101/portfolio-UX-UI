import { useWindowScrollFixed } from "@/hooks/useWindowScrollFixed";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

export default function userHeader() {
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const headerRef = useRef<HTMLDivElement>(null);
    const lastScrollY = useRef(0);
    const {y: currentScrollY} = useWindowScrollFixed();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const timeline = useRef<gsap.core.Timeline|null>(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useGSAP(
        () => {
            gsap.set(".header-overlay__link-item-holder", {y: 75});
            timeline.current = gsap.timeline({paused: true}).to(".header-overlay", {
                duration: 0.5,
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                ease    : "power4.inOut"
            }).to(".header-overlay__link-item-holder", {
                y       : 0,
                duration: 1,
                stagger : 0.1,
                ease    : "power4.out",
                delay   : -0.75
            });
        },
        {scope: headerRef}
    );

    useEffect(() => {
        const prevY = lastScrollY.current;

        if (currentScrollY === 0 || currentScrollY < prevY || isMenuOpen) {
            setIsHeaderVisible(true);
        } else if (currentScrollY > prevY) {
            setIsHeaderVisible(false);
        }

        lastScrollY.current = currentScrollY;
    }, [currentScrollY]);

    useEffect(() => {
        if (!headerRef.current) return;
        gsap.to(headerRef.current, {
            y       : isHeaderVisible ? 0 : -100,
            duration: 0.6
        });
    }, [isHeaderVisible]);

    useEffect(() => {
        const overlay = headerRef.current?.querySelector(".header-overlay") as HTMLElement;

        if (!overlay) return;

        if (isMenuOpen) {
            overlay.style.display = "block";
            timeline.current?.play();
        } else {
            if (timeline.current) {
                timeline.current.reverse();
                timeline.current.eventCallback("onReverseComplete", () => {
                    overlay.style.display = "none";
                });
            }
        }
    }, [isMenuOpen]);

    return {headerRef, isMenuOpen, setIsMenuOpen, toggleMenu};
}