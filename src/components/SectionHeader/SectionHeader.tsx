"use client";

import type { ReactNode } from "react";
import React, { forwardRef } from "react";

type SectionHeaderProps = {
    children: ReactNode;
    type: "page" | "section" | "subsection" | "block";
};

const SectionHeader = forwardRef<HTMLHeadingElement, SectionHeaderProps>(
    ({ children, type }, ref) => {
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
                        <span className="accent-color">.</span>
                    </h2>
                );
            case "subsection":
                return (
                    <h3 ref={ref} className="heading-sm">
                        <span className="accent-color">// </span>
                        {children}
                        <span className="accent-color">.</span>
                    </h3>
                );
            case "block":
                return (
                    <h4 ref={ref} className="heading-xs">
                        <span className="accent-color">// </span>
                        {children}
                        <span className="accent-color">.</span>
                    </h4>
                );
        }
    }
);

export default SectionHeader;