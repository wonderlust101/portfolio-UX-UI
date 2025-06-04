"use client";

import DesktopNavigation from "@/components/Header/DesktopNavigation";
import MobileNavigation from "@/components/Header/MobileNavigation";
import navLinks from "@/data/nav-links.json";
import { useAnimatedNavigation } from "@/hooks/useAnimatedNavigation";
import { useThemeStore } from "@/store/useThemeStore";
import Link from "next/link";
import "./Header.scss";
import { useEffect, useRef, useState } from "react";
import { useWindowScroll } from "react-use";
import gsap from "gsap";

export default function Header() {
    const color = useThemeStore((state) => state.color);
    const {handleNavigation} = useAnimatedNavigation();

    const [lastScrollY, setLastScrollY] = useState(0);
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const headerRef = useRef(null);
    const {y: currentScrollY} = useWindowScroll();

    useEffect(() => {
        if (currentScrollY === 0) {
            setIsHeaderVisible(true);
        } else if (currentScrollY > lastScrollY) {
            setIsHeaderVisible(false);
        } else if (currentScrollY < lastScrollY) {
            setIsHeaderVisible(true);
        }
        setLastScrollY(currentScrollY);
    }, [currentScrollY, lastScrollY]);

    useEffect(() => {
        if (!headerRef.current) return;
        gsap.to(headerRef.current, {
            y       : isHeaderVisible ? 0 : -100,
            duration: 0.6
        });
    }, [isHeaderVisible]);

    return (
        <header className="header grid-bleed-small" ref={headerRef}>
            <div className="header__container">
                <div className="header__left-side">
                    <Link scroll={true} className="header__logo" href="/" onClick={handleNavigation("/")} aria-label="Go to Home">
                        <span className={`${color}-accent-light`}>//</span> SB
                    </Link>
                    <p className="header__tag">[ Full Stack Developer, UX & UI Designer ]</p>
                </div>

                <MobileNavigation navLinks={navLinks.navLinks}/>
                <DesktopNavigation navLinks={navLinks.navLinks}/>
            </div>
        </header>
    );
}