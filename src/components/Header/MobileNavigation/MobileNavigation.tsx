import BurgerMenuIcon from "@/assets/images/burger-menu.svg?react";
import "./MobileNavigation.scss";
import CloseMenuIcon from "@/assets/images/close-menu.svg?react";
import type { NavLinks } from "@/types/links";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type MobileNavigationProps = {
    navLinks: NavLinks[];
}

export default function MobileNavigation({navLinks}: MobileNavigationProps) {
    const [openNav, setOpenNav] = useState(false);

    useEffect(() => {
        if (openNav) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        // Clean up when component unmounts
        return () => {
            document.body.style.overflow = "";
        };
    }, [openNav]);

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
                    <li key={link.title}>
                        {link.subLinks ? (
                                <>
                                    <Link to={link.link} className="mobile-navigation__link-container" onClick={() => setOpenNav(false)}>
                                        <span className="link mobile-navigation__link">{link.title}</span>
                                        <hr/>
                                    </Link>

                                    {link.subLinks &&
                                        <ul className="mobile-navigation__sub-link-container">
                                            {link.subLinks.map((subLink) => (
                                                <li key={subLink.title} className="mobile-navigation__nav-item">
                                                    <Link to={subLink.link} className="mobile-navigation__link-container" onClick={() => setOpenNav(false)}>
                                                        <span className="link mobile-navigation__link">{subLink.title}</span>
                                                        <hr/>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    }
                                </>
                            )
                            : (
                                <Link to={link.link} className="mobile-navigation__link-container" onClick={() => setOpenNav(false)}>
                                    <span className="link mobile-navigation__link">{link.title}</span>
                                    <hr/>
                                </Link>
                            )
                        }
                    </li>
                ))}
            </ul>
        </nav>
    );
}