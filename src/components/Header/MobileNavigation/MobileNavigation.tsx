"use client";

import burgerMenuIcon from "@/assets/images/burger-menu.svg";
import "./MobileNavigation.scss";
import closeMenuIcon from "@/assets/images/close-menu.svg";
import type { NavLinks } from "@/types/links";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAnimatedNavigation } from "@/hooks/useAnimatedNavigation";

type MobileNavigationProps = {
    navLinks: NavLinks[];
}

export default function MobileNavigation({navLinks}: MobileNavigationProps) {
    const [openNav, setOpenNav] = useState(false);
    const { handleNavigation } = useAnimatedNavigation();

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
                <Image
                    src={openNav ? closeMenuIcon : burgerMenuIcon}
                    alt="Menu Icon"
                />
            </button>

            <ul style={{display: openNav ? "grid" : "none"}} className="mobile-navigation__nav-links">
                {navLinks.map((link) => (
                    <li key={link.title}>
                        {link.subLinks ? (
                                <>
                                    <div className="mobile-navigation__link-container">
                                        <p className="link mobile-navigation__link">{link.title}</p>
                                        <hr/>
                                    </div>

                                    {link.subLinks &&
                                        <ul className="mobile-navigation__sub-link-container">
                                            {link.subLinks.map((subLink) => (
                                                <li key={subLink.title} className="mobile-navigation__nav-item">
                                                    <a className="mobile-navigation__link-container" href={subLink.link} onClick={handleNavigation(subLink.link, () => setOpenNav(false))}>
                                                        <span className="link mobile-navigation__link">{subLink.title}</span>
                                                        <hr />
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    }
                                </>
                            )
                            : (
                                link.link &&
                                <a className="mobile-navigation__link-container" href={link.link} onClick={handleNavigation(link.link, () => setOpenNav(false))}>
                                    <span className="link mobile-navigation__link">{link.title}</span>
                                    <hr />
                                </a>
                            )
                        }
                    </li>
                ))}
            </ul>
        </nav>
    );
}