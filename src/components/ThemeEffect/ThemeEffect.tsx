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
            theme?.themeColor ?? "#6A7D8B"
        );
        document.documentElement.style.setProperty(
            "--light-theme-color",
            theme?.lightThemeColor ?? "#c2c7cc"
        );
        document.documentElement.style.setProperty(
            "--dark-theme-color",
            theme?.darkThemeColor ?? "#3D4A5A"
        );
    }, [theme?.themeColor, theme?.lightThemeColor, theme?.darkThemeColor]);

    return null;
}