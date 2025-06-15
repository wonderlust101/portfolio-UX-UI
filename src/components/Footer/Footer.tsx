"use client";

import "./Footer.scss";
import Button from "@/components/Button";
import ContactList from "@/components/ContactList";
import { useAnimatedNavigation } from "@/hooks/useAnimatedNavigation";
import Link from "next/link";

const navLinks = [
    {
        page: "Home",
        link: "/"
    },
    {
        page: "Selected Works",
        link: "/#selected-works"
    },
    {
        page: "Skills and Tools",
        link: "/#skills-and-tools"
    },
    {
        page: "About Me",
        link: "/#about-me"
    }
];

export default function Footer() {
    const {handleNavigation} = useAnimatedNavigation();

    return (
        <footer className="footer grid-bleed-small" aria-label="Site Footer">
            <div className="footer__grid">
                <section className="footer__left-column" role="region" aria-labelledby="footer-cta-heading">
                    <div className="footer__cta">
                        <h2 className="footer__cta-text" id="footer-cta-heading">
                            Let’s get in touch
                            <span className="accent-color-light">!</span>
                        </h2>

                        <div className="footer__buttons">
                            <Button color="accent" theme="dark" size="md" href="mailto:sergei.borja0701@gmail.com" aria-label="Send an email to Sergei">
                                Send an Email
                            </Button>

                            <Button color="white" size="md" href="/Sergei Borja - Resume.pdf" aria-label="Download Sergei's Resume">
                                <img src="/images/icons/download.svg" alt="" aria-hidden={true}/>
                                Download Resume
                            </Button>
                        </div>
                    </div>

                    <div aria-labelledby="footer-contact-heading">
                        <h2 className="sr-only" id="footer-contact-heading">Contact Information</h2>
                        <ContactList/>
                    </div>
                </section>

                <div className="footer__right-column">
                    <p className="footer__name" aria-hidden={true}>
                        Sergei Borja
                    </p>

                    <nav aria-labelledby="footer-nav-heading" className="footer__nav-list">
                        <ul style={{display: "contents"}}>
                            {navLinks.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        className="link link--dark"
                                        href={link.link}
                                        onClick={handleNavigation(link.link)}
                                        scroll={true}
                                        aria-label={link.page}
                                    >
                                        {link.page}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                <div className="footer__bottom" aria-hidden={true}>
                    <p className="footer__copyright">@ 2025 Sergei Borja</p>
                </div>
            </div>
        </footer>
    );
}