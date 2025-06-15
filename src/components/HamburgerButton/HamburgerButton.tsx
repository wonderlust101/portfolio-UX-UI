import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import "./HamburgerButton.scss";

type HamburgerButtonProps = {
    handleToggleMenu: () => void;
    isMenuOpen: boolean;
}

export default function HamburgerButton({handleToggleMenu, isMenuOpen}: HamburgerButtonProps) {
    const topRef = useRef<HTMLSpanElement>(null);
    const middleRef = useRef<HTMLSpanElement>(null);
    const bottomRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (!topRef.current || !middleRef.current || !bottomRef.current) return;

        if (isMenuOpen) {
            gsap.to(topRef.current, {
                rotation: 45,
                top     : "50%",
                duration: 0.5,
                ease    : "power3.inOut",
                force3D : true
            });

            gsap.to(middleRef.current, {
                rotation: -45,
                duration: 0.5,
                ease    : "power3.inOut",
                force3D : true
            });

            gsap.to(bottomRef.current, {
                rotation: 45,
                bottom  : "50%",
                left    : "50%",
                duration: 0.5,
                ease    : "power3.inOut",
                force3D : true
            });
        } else {
            gsap.to(topRef.current, {
                rotation: 0,
                top     : "35%",
                duration: 0.5,
                ease    : "power3.inOut",
                force3D : true
            });

            gsap.to(middleRef.current, {
                rotation: 0,
                duration: 0.5,
                ease    : "power3.inOut",
                force3D : true
            });

            gsap.to(bottomRef.current, {
                rotation: 0,
                bottom  : "35%",
                duration: 0.5,
                ease    : "power3.inOut",
                force3D : true
            });
        }
    }, [isMenuOpen]);

    return (
        <button
            className="hamburger-button"
            onClick={handleToggleMenu}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav-overlay"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
            <span ref={topRef} className="hamburger-button__line hamburger-button__line--top"/>
            <span ref={middleRef} className="hamburger-button__line hamburger-button__line--middle"/>
            <span ref={bottomRef} className="hamburger-button__line hamburger-button__line--bottom"/>
        </button>
    );
};