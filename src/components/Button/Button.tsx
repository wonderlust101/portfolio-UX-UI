"use client";

import { useAnimatedNavigation } from "@/hooks/useAnimatedNavigation";
import Link from "next/link";
import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";
import "./Button.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement|HTMLAnchorElement> {
    children: ReactNode;
    color: string;
    theme?: string;
    size: string;
    href?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    external?: boolean;
    target?: string;
    icon?: string;
}

export default function Button({children, color, theme = "light", size, href, onClick, external, target, ...props}: ButtonProps) {
    const {handleNavigation} = useAnimatedNavigation();

    if (href && href.endsWith(".pdf")) {
        return (
            <a
                href={href}
                download
                className={`button button--${color === "accent" ? `${color}-${theme}` : color} button--${size}`}
                {...props}
            >
                {children}
            </a>
        );
    }

    if (external) {
        return (
            <a
                href={href}
                className={`button button--${color === "accent" ? `${color}-${theme}` : color} button--${size}`}
                {...props}
            >
                {children}
            </a>
        );
    }

    if (href)
        return (
            <Link
                href={href}
                className={`button button--${color === "accent" ? `${color}-${theme}` : color} button--${size}`}
                onClick={(e) => handleNavigation(href, undefined)(e)}
                scroll={true}
                {...props}
            >
                {children}
            </Link>
        );

    return (
        <button
            className={`button button--${color === "accent" ? `${color}-${theme}` : color} button--${size}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
}