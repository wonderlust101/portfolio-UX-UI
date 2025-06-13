import { useWindowScrollFixed } from "@/hooks/useWindowScrollFixed";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

export default function UseHeader() {
    const headerRef = useRef<HTMLDivElement|null>(null);
    const overlayRef = useRef<HTMLElement|null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const timeline = useRef<gsap.core.Timeline|null>(null);

    useWindowScrollFixed(headerRef, isMenuOpen);

    useGSAP(() => {
        gsap.set(".header-overlay__link-item-holder", {
            y      : 75,
            force3D: true
        });

        timeline.current = gsap.timeline({paused: true}).to(".header-overlay", {
            duration: 0.5,
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            ease    : "power3.inOut",
            force3D : true
        }).to(".header-overlay__link-item-holder", {
            y       : 0,
            duration: 0.75,
            stagger : 0.1,
            ease    : "power3.out",
            delay   : -0.5,
            force3D : true
        });
    }, {scope: headerRef});

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isMenuOpen && headerRef.current && !headerRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            // Add listener when menu is open
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMenuOpen]);

    useEffect(() => {
        return () => {
            timeline.current?.kill();
            timeline.current = null;
        };
    }, []);

    useEffect(() => {
        if (headerRef.current && !overlayRef.current) {
            overlayRef.current = headerRef.current.querySelector(".header-overlay") as HTMLElement;
        }
    }, []);

    useEffect(() => {
        const overlay = overlayRef.current;
        if (!overlay) return;

        if (isMenuOpen) {
            overlay.style.display = "block";
            timeline.current?.play();
        } else {
            timeline.current?.reverse();
            timeline.current?.eventCallback("onReverseComplete", () => {
                overlay.style.display = "none";
            });
        }
    }, [isMenuOpen]);

    const toggleMenu = () => setIsMenuOpen((o) => !o);

    return {headerRef, isMenuOpen, toggleMenu, setIsMenuOpen};
}