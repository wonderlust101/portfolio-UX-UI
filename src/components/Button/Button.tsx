import type { RootState } from "@/app/store";
import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";
import { useSelector } from "react-redux";
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

export default function Button({ children, color, theme, size, href, onClick, ariaLabel, ...props }: ButtonProps) {
    const buttonColor = useSelector((state: RootState) => state.theme.color);

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
            <a
                href={ href }
                className={`button button--${color === 'accent' ? `${buttonColor}-${theme}` : color} button--${size}`}
                aria-label={ ariaLabel }
                { ...props }
            >
                { children }
            </a>
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