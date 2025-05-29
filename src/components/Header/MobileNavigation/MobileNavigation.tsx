import BurgerMenuIcon from "@/assets/images/burger-menu.svg?react";
import "./MobileNavigation.scss";
import CloseMenuIcon from "@/assets/images/close-menu.svg?react";
import type { NavLinks } from "@/types/links";
import { useState } from "react";
import { Link } from "react-router-dom";

type MobileNavigationProps = {
    navLinks: NavLinks[];
}

export default function MobileNavigation({navLinks}: MobileNavigationProps) {
    const [openNav, setOpenNav] = useState(false);

    return (
        <nav className="mobile-navigation">
            <button
                className="mobile-navigation__hamburger"
                onClick={() => setOpenNav(!openNav)}
            >
                {openNav ? <CloseMenuIcon/> : <BurgerMenuIcon/>}
            </button>

            <ul style={{display: openNav ? "grid" : "none"}} className="mobile-navigation__nav-links">
                {navLinks.map((link) => (
                    <li key={link.title} className="mobile-navigation__nav-item">
                        <Link to={link.link} className="mobile-navigation__link-container link">
                            {link.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}