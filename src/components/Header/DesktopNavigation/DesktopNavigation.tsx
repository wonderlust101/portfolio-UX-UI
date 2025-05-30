import Button from "@/components/Button";
import type { NavLinks } from "@/types/links";
import { Link } from "react-router-dom";
import "./DesktopNavigation.scss";

type DesktopNavigationProps = {
    navLinks: NavLinks[];
}

export default function DesktopNavigation({navLinks}: DesktopNavigationProps) {
    return (
        <nav className="desktop-navigation">
            <ul className="desktop-navigation__nav-links">
                {navLinks.map((link) => (
                    <li className="desktop-navigation__nav-link" key={link.title}>
                        <div className="desktop-navigation__nav-link-wrapper">
                            <Link className="desktop-navigation__link link" to={link.link}>
                                {link.title}
                            </Link>

                            {link.subLinks && (
                                <ul className="desktop-navigation__sub-link-container">
                                    {link.subLinks.map((subLink) => (
                                        <li key={subLink.title}>
                                            <Link to={subLink.link}>
                                                <span className="link desktop-navigation__link">{subLink.title}</span>
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
                    to="mailto:sergei.borja0701@gmail.com"
                >
                    Contact Me
                </Button>
            </ul>
        </nav>
    );
}