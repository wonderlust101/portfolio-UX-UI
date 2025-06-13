"use client";

import HeaderBar from "@/components/Header/HeaderBar";
import HeaderOverlay from "@/components/Header/HeaderOverlay";
import useHeader from "@/components/Header/useHeader";
import "./Header.scss";

export default function Header() {
    const {headerRef, isMenuOpen, setIsMenuOpen, toggleMenu} = useHeader();

    return (
        <header className="header grid-bleed-small" ref={headerRef} id="navigation-header" role="banner">
            <HeaderBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} toggleMenu={toggleMenu}/>
            <HeaderOverlay toggleMenu={toggleMenu}/>
        </header>
    );
}