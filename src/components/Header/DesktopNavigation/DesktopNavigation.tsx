"use client";

import Button from "@/components/Button";
import type { NavLinks } from "@/types/links";
import "./DesktopNavigation.scss";
import { useAnimatedNavigation } from "@/hooks/useAnimatedNavigation";
import Link from "next/link";

type DesktopNavigationProps = {
    navLinks: NavLinks[];
}

export default function DesktopNavigation({navLinks}: DesktopNavigationProps) {
    const { handleNavigation } = useAnimatedNavigation();

    return (
        <nav className="desktop-navigation">
            <ul className="desktop-navigation__nav-links">
                {navLinks.map((link) => (
                    <li className="desktop-navigation__nav-link" key={link.title}>
                        <div className="desktop-navigation__nav-link-wrapper">
                            {link.link ?
                                <Link className="link desktop-navigation__link" href={link.link} onClick={handleNavigation(link.link)}>
                                    {link.title}
                                </Link>
                                :
                                <p className='desktop-navigation__link'>{link.title}</p>
                            }

                            {link.subLinks && (
                                <ul className="desktop-navigation__sub-link-container">
                                    {link.subLinks.map((subLink) => (
                                        <li key={subLink.title}>
                                            <Link className="link desktop-navigation__link" href={subLink.link} onClick={handleNavigation(subLink.link)}>
                                                {subLink.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </li>

                ))}

                <Button
                    color="accent"
                    theme="light"
                    size="sm"
                    href="mailto:sergei.borja0701@gmail.com"
                >
                    Contact Me
                </Button>
            </ul>
        </nav>
    );
}