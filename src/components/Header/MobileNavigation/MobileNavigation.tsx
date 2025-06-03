"use client";

import burgerMenuIcon from "@/assets/images/burger-menu.svg";
import closeMenuIcon from "@/assets/images/close-menu.svg";
import Button from "@/components/Button";
import List from "@/components/List";
import { useAnimatedNavigation } from "@/hooks/useAnimatedNavigation";
import { useThemeStore } from "@/store/useThemeStore";
import type { NavLinks } from "@/types/links";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useEffect, useRef, useState } from "react";

import "./MobileNavigation.scss";

type MobileNavigationProps = {
    navLinks: NavLinks[];
};

const contactList = [
    {header: "Email", content: "sergei.borja0701@gmail.com"},
    {header: "Phone", content: "(780) 886-0023"},
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

export default function MobileNavigation({navLinks}: MobileNavigationProps) {
    const color = useThemeStore((state) => state.color);
    const {handleNavigation} = useAnimatedNavigation();

    const containerRef = useRef<HTMLDivElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const tl = useRef<gsap.core.Timeline|null>(null);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    useGSAP(
        () => {
            gsap.set(".mobile-navigation__link-item-holder", { y: 75 });
            tl.current = gsap
            .timeline({ paused: true })
            .to(".mobile-navigation__overlay", {
                duration: 1,
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                ease: "power4.inOut",
            })
            .to(".mobile-navigation__link-item-holder", {
                y: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power4.out",
                delay: -0.75,
            });
        },
        { scope: containerRef }
    );

    useEffect(() => {
        if (isMenuOpen) {
            tl.current?.play();
        } else {
            tl.current?.reverse();
        }
    }, [isMenuOpen]);

    return (
        <div className="mobile-navigation" ref={containerRef}>
            <div className="mobile-navigation__bar">
                <div className="mobile-navigation__bar-flex">
                    <div className="mobile-navigation__logo">
                        <Link
                            scroll={true}
                            className="header__logo"
                            href="/"
                            onClick={handleNavigation("/", () => setIsMenuOpen(false))}
                        >
                            <span className={`${color}-accent-light`}>//</span> SB
                        </Link>
                        <p className="header__tag">
                            [ Full Stack Developer, UX &amp; UI Designer ]
                        </p>
                    </div>

                    <div className="mobile-navigation__toggle" onClick={toggleMenu}>
                        <Image
                            src={burgerMenuIcon}
                            alt="Open menu"
                            role="presentation"
                            width={24}
                            height={24}
                        />
                    </div>
                </div>
            </div>

            <div className="mobile-navigation__overlay">
                <div className="mobile-navigation__overlay-bar grid-bleed-small">
                    <div className="mobile-navigation__bar-flex">
                        <div className="mobile-navigation__logo">
                            <Link
                                scroll={true}
                                className="header__logo"
                                href="/"
                                onClick={() => handleNavigation("/", toggleMenu)}
                            >
                                <span className={`${color}-accent-light`}>//</span> SB
                            </Link>
                            <p className="header__tag">
                                [ Full Stack Developer, UX &amp; UI Designer ]
                            </p>
                        </div>

                        <div className="mobile-navigation__toggle" onClick={toggleMenu}>
                            <Image src={closeMenuIcon} alt="Close menu" width={24} height={24}/>
                        </div>
                    </div>
                </div>

                <div className="mobile-navigation__copy">
                    <div className="mobile-navigation__links">
                        {navLinks.map((link) => (
                            <Fragment key={link.title}>
                                {link.link && (
                                    <div className="mobile-navigation__link-item">
                                        <div className="mobile-navigation__link-item-holder">
                                            <Link
                                                scroll={true}
                                                className="mobile-navigation__link" href={link.link}
                                                onClick={handleNavigation(link.link, toggleMenu)}
                                            >
                                                {link.title}
                                            </Link>
                                        </div>
                                    </div>
                                )}
                                {link.subLinks?.map((subLink) => (
                                    <div key={subLink.title} className="mobile-navigation__link-item">
                                        <div className="mobile-navigation__link-item-holder">
                                            <Link
                                                scroll={true}
                                                className="mobile-navigation__link" href={subLink.link}
                                                onClick={handleNavigation(subLink.link, toggleMenu)}
                                            >
                                                {subLink.title}
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </Fragment>
                        ))}
                    </div>

                    <div className="mobile-navigation__contact">
                        <div className="mobile-navigation__info">
                            <List items={contactList} type="meta"/>
                        </div>
                        <Button
                            color="accent"
                            theme="light"
                            size="sm"
                            href="mailto:sergei.borja0701@gmail.com"
                        >
                            Contact Me
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};