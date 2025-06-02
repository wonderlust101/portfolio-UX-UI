"use client";

import "./Footer.scss";
import Button from "@/components/Button";
import List from "@/components/List";
import navLinks from "@/data/nav-links.json";
import { useAnimatedNavigation } from "@/hooks/useAnimatedNavigation";
import { useThemeStore } from "@/store/useThemeStore";
import Link from "next/link";

const contactList = [
    {
        header : "Email",
        content: "sergei.borja0701@gmail.com"
    },
    {
        header : "Phone",
        content: "(780) 886-0023"
    },
    {
        header : "LinkedIn",
        content: (
            <a
                className="link"
                href="https://www.linkedin.com/in/sergei-borja/"
                target="_blank"
                rel="noopener noreferrer"
            >
                sergei-borja
            </a>
        )
    },
    {
        header : "GitHub",
        content: (
            <a
                className="link"
                href="https://github.com/wonderlust101"
                target="_blank"
                rel="noopener noreferrer"
            >
                @wonderlust101
            </a>
        )
    }
];

export default function Footer() {
    const color = useThemeStore((state) => state.color);
    const {handleNavigation} = useAnimatedNavigation();

    return (
        <footer className={`footer grid-bleed-small`}>
            <div className="footer__grid">
                <div className="footer__left-column">
                    <div className="footer__cta">
                        <p className="footer__cta-text">
                            <span className={`${color}-accent-dark`}>// </span>
                            Let’s get in touch
                            <span className={`${color}-accent-dark`}>!</span>
                        </p>

                        <div className="footer__buttons">
                            <Button color="accent" theme='dark' size="lg" href="mailto:sergei.borja0701@gmail.com">
                                Send an Email
                            </Button>

                            <Button color="white" size="lg" href="Sergei Borja - Resume.pdf">
                                Download Resume
                            </Button>
                        </div>
                    </div>

                    <List items={contactList} type="meta"/>
                </div>

                <div className="footer__right-column">
                    <p className="footer__name">
                        Sergei Borja
                    </p>

                    <ul className="footer__nav-list">
                        {navLinks.projectLinks.map((link, index) => (
                            <li key={index}>
                                <Link className="link link--dark" href={link.link} onClick={handleNavigation(link.link)}>
                                    {link.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="footer__bottom">
                    <hr/>
                    <p className="footer__copyright">@ 2025 Sergei Borja</p>
                </div>
            </div>
        </footer>
    );
}