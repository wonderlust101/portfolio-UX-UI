import burgerMenuIcon from "@/assets/images/burger-menu.svg";
import closeMenuIcon from "@/assets/images/close-menu.svg";
import Button from "@/components/Button";
import { useAnimatedNavigation } from "@/hooks/useAnimatedNavigation";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import "./HeaderBar.scss";

type HeaderBarProps = {
    isMenuOpen: boolean;
    setIsMenuOpen: (isMenuOpen: boolean) => void;
    toggleMenu: () => void;
}

export default function HeaderBar({isMenuOpen, setIsMenuOpen, toggleMenu}: HeaderBarProps) {
    const {handleNavigation} = useAnimatedNavigation();

    return (
        <div className="header-bar">
            <div className="header-bar__flex">
                <div className="header-bar__header">
                    <Link
                        scroll={true}
                        className="header-bar__logo"
                        href="/"
                        onClick={handleNavigation("/", () => setIsMenuOpen(false))}
                        aria-label="Go to Home"
                    >
                        Sergei Borja
                    </Link>

                    <p className="header-bar__tag" role="presentation">
                        [ Full Stack Developer, UX &amp; UI Designer ]
                    </p>
                </div>

                <div className="header-bar__cta">
                    <Button
                        color="accent"
                        theme="dark"
                        size="sm"
                        href="mailto:sergei.borja0701@gmail.com"
                        aria-label="Send an email to Sergei"
                    >
                        Contact Me
                    </Button>

                    <button
                        className="header-bar__toggle"
                        onClick={toggleMenu}
                        aria-expanded={isMenuOpen}
                        aria-controls="mobile-nav-overlay"
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    >
                        <Image
                            src={isMenuOpen ? closeMenuIcon : burgerMenuIcon}
                            alt=""
                            aria-hidden="true"
                            width={24}
                            height={24}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}