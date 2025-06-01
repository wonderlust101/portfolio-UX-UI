"use client";

import { useThemeStore } from "@/store/useThemeStore";
import { useEffect } from "react";

type Props = {
    theme: string;
};

export default function ThemeEffect({theme}: Props) {
    const changeColor = useThemeStore((state) => state.changeColor);

    useEffect(() => {
        if (theme) {
            changeColor(theme);
        }
    }, [theme, changeColor]);

    return null;
}