"use client"

import { useAnimatedNavigation } from "@/hooks/useAnimatedNavigation";
import { useThemeStore } from "@/store/useThemeStore";
import Link from "next/link";
import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";
import "./Button.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
    children: ReactNode;
    color: string;
    theme?: string;
    size: string;
    href?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    ariaLabel?: string;
}

export default function Button({ children, color, theme="light", size, href, onClick, ariaLabel, ...props }: ButtonProps) {
    const buttonColor = useThemeStore((state) => state.color);
    const {handleNavigation} = useAnimatedNavigation();

    if (href && href.endsWith('.pdf')) {
        return (
            <a
                href={href}
                download
                className={`button button--${color === 'accent' ? `${buttonColor}-${theme}` : color} button--${size}`}
                aria-label={ariaLabel}
                {...props}
            >
                {children}
            </a>
        );
    }

    if (href)
        return (
            <Link
                href={ href }
                className={`button button--${color === 'accent' ? `${buttonColor}-${theme}` : color} button--${size}`}
                aria-label={ ariaLabel }
                onClick={(e) => handleNavigation(href, undefined)(e)}
                { ...props }
            >
                { children }
            </Link>
        );

    return (
        <button
            className={`button button--${color === 'accent' ? `${buttonColor}-${theme}` : color} button--${size}`}
            onClick={ onClick }
            aria-label={ ariaLabel }
            { ...props }
        >
            { children }
        </button>
    );
}