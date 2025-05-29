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
                    <li key={link.title}>
                        <Link className="desktop-navigation__link link" to={link.link}>
                            {link.title}
                        </Link>
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