import Button from "@/components/Button";
import type { NavLinks } from "@/types/links";
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
                            {link.link ?
                                <a className="desktop-navigation__link link" href={link.link}>
                                    {link.title}
                                </a>
                                :
                                <p className='desktop-navigation__link'>{link.title}</p>
                            }

                            {link.subLinks && (
                                <ul className="desktop-navigation__sub-link-container">
                                    {link.subLinks.map((subLink) => (
                                        <li key={subLink.title}>
                                            <a href={subLink.link}>
                                                <span className="link desktop-navigation__link">{subLink.title}</span>
                                            </a>
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