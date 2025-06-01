"use client"

import { useThemeStore } from "@/store/useThemeStore";
import type { ReactNode } from "react";

type SectionHeaderProps = {
    children: ReactNode;
    type: "page" | "section" | "subsection" | "block";
};

export default function SectionHeader({children, type}: SectionHeaderProps) {
    const color = useThemeStore((state) => state.color);

    switch (type) {
        case "page":
            return <h1 className="heading-lg">{children}</h1>;
        case "section":
            return (
                <h2 className="heading-md">
                    {children}
                    <span className={`${color}-accent-light`}>.</span>
                </h2>
            );
        case "subsection":
            return (
                <h3 className="heading-sm">
                    <span className={`${color}-accent-light`}>// </span>
                    {children}
                    <span className={`${color}-accent-light`}>.</span>
                </h3>
            );
        case "block":
            return (
                <h4 className="heading-xs">
                    <span className={`${color}-accent-light`}>// </span>
                    {children}
                    <span className={`${color}-accent-light`}>.</span>
                </h4>
            );
    }
}