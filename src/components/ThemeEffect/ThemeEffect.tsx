"use client";
import { useEffect } from "react";

type ThemeProps = {
    themeColor?: string;
    lightThemeColor?: string;
    darkThemeColor?: string;
};

type Props = {
    theme?: ThemeProps;
};

export default function ThemeEffect({ theme }: Props) {
    useEffect(() => {
        document.documentElement.style.setProperty(
            "--theme-color",
            theme?.themeColor ?? "#507A5C"
        );
        document.documentElement.style.setProperty(
            "--light-theme-color",
            theme?.lightThemeColor ?? "#8AD1A0"
        );
        document.documentElement.style.setProperty(
            "--dark-theme-color",
            theme?.darkThemeColor ?? "#4A7256"
        );
    }, [theme]);

    return null;
}