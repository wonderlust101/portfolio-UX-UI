"use client";

import DesktopNavigation from "@/components/Header/DesktopNavigation";
import MobileNavigation from "@/components/Header/MobileNavigation";
import navLinks from '@/data/nav-links.json'
import { useAnimatedNavigation } from "@/hooks/useAnimatedNavigation";
import { useThemeStore } from "@/store/useThemeStore";
import Link from "next/link";
import "./Header.scss";

export default function Header() {
    const color = useThemeStore((state) => state.color);
    const { handleNavigation } = useAnimatedNavigation();

    return (
        <header className="header grid-bleed-small">
            <div className='header__container'>
                <div className="header__left-side">
                    <Link scroll={true} className="header__logo" href='/' onClick={handleNavigation('/')}>
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