import type { RootState } from "@/app/store";
import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Button.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
    children: ReactNode;
    color: string;
    theme?: string;
    size: string;
    to?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    ariaLabel?: string;
}

export default function Button({ children, color, theme, size, to, onClick, ariaLabel, ...props }: ButtonProps) {
    const buttonColor = useSelector((state: RootState) => state.theme.color);

    if (to && to.endsWith('.pdf')) {
        return (
            <a
                href={to}
                download
                className={`button button--${color === 'accent' ? `${buttonColor}-${theme}` : color} button--${size}`}
                aria-label={ariaLabel}
                {...props}
            >
                {children}
            </a>
        );
    }

    if (to)
        return (
            <Link
                to={ to }
                className={`button button--${color === 'accent' ? `${buttonColor}-${theme}` : color} button--${size}`}
                aria-label={ ariaLabel }
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