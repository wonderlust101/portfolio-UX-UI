"use client";

import "./Footer.scss";
import Button from "@/components/Button";
import List from "@/components/List";
import { useAnimatedNavigation } from "@/hooks/useAnimatedNavigation";
import Link from "next/link";
import React from "react";

const contactList = [
    {
        header: "Email",
        text  : "sergei.borja0701@gmail.com"
    },
    {
        header: "Phone",
        text  : "(780) 886-0023"
    },
    {
        header: "LinkedIn",
        text  : (
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
        header: "GitHub",
        text  : (
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
        <footer className="footer grid-bleed-small">
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
                        <List items={contactList} type="meta"/>
                    </div>
                </section>

                <div className="footer__right-column">
                    <p className="footer__name" role="presentation">
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

                <div className="footer__bottom" role="presentation">
                    <p className="footer__copyright">@ 2025 Sergei Borja</p>
                </div>
            </div>
        </footer>
    );
}