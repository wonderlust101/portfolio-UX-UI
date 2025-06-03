"use client";

import { useThemeStore } from "@/store/useThemeStore";
import type { ReactNode } from "react";
import React, { forwardRef } from "react";

type SectionHeaderProps = {
    children: ReactNode;
    type: "page" | "section" | "subsection" | "block";
};

// Use `React.ForwardRefExoticComponent` correctly
const SectionHeader = forwardRef<HTMLHeadingElement, SectionHeaderProps>(
    ({ children, type }, ref) => {
        const color = useThemeStore((state) => state.color);

        switch (type) {
            case "page":
                return (
                    <h1 ref={ref} className="heading-lg">
                        {children}
                    </h1>
                );
            case "section":
                return (
                    <h2 ref={ref} className="heading-md">
                        {children}
                        <span className={`${color}-accent-light`}>.</span>
                    </h2>
                );
            case "subsection":
                return (
                    <h3 ref={ref} className="heading-sm">
                        <span className={`${color}-accent-light`}>// </span>
                        {children}
                        <span className={`${color}-accent-light`}>.</span>
                    </h3>
                );
            case "block":
                return (
                    <h4 ref={ref} className="heading-xs">
                        <span className={`${color}-accent-light`}>// </span>
                        {children}
                        <span className={`${color}-accent-light`}>.</span>
                    </h4>
                );
        }
    }
);

export default SectionHeader;