"use client";

import HeaderBar from "@/components/Header/HeaderBar";
import HeaderOverlay from "@/components/Header/HeaderOverlay";
import userHeader from "@/components/Header/userHeader";
import "./Header.scss";

export default function Header() {
    const {headerRef, isMenuOpen, setIsMenuOpen, toggleMenu} = userHeader();

    return (
        <header className="header grid-bleed-small" ref={headerRef} id="navigation-header" role="banner">
            <HeaderBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} toggleMenu={toggleMenu}/>
            <HeaderOverlay toggleMenu={toggleMenu}/>
        </header>
    );
}