"use client";

import MobileNavigation from "@/components/Header/MobileNavigation";
import navLinks from "@/data/nav-links.json";
import gsap from "gsap";
import "./Header.scss";
import { useEffect, useRef, useState } from "react";
import { useWindowScroll } from "react-use";

export default function Header() {
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const headerRef = useRef(null);
    const lastScrollY = useRef(0);
    const { y: currentScrollY } = useWindowScroll();

    useEffect(() => {
        const prevY = lastScrollY.current;

        if (currentScrollY === 0 || currentScrollY < prevY) {
            setIsHeaderVisible(true);
        } else if (currentScrollY > prevY) {
            setIsHeaderVisible(false);
        }

        lastScrollY.current = currentScrollY;
    }, [currentScrollY]);

    useEffect(() => {
        if (!headerRef.current) return;
        gsap.to(headerRef.current, {
            y: isHeaderVisible ? 0 : -100,
            duration: 0.6
        });
    }, [isHeaderVisible]);

    return (
        <header className="header" ref={headerRef}>
            <MobileNavigation navLinks={navLinks.navLinks} />
        </header>
    );
}