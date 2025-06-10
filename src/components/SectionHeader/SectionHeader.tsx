"use client";

import type { ReactNode } from "react";
import React, { forwardRef } from "react";
import "./SectionHeader.scss";

type SectionHeaderProps = {
    children: ReactNode;
    type: string;
};

const SectionHeader = forwardRef<HTMLHeadingElement, SectionHeaderProps>(
    ({children, type}, ref) => {
        switch (type) {
            case "page":
                return (
                    <h1 ref={ref} className="heading-lg">
                        {children}
                    </h1>
                );
            case "section":
                return (
                    <h2 ref={ref} className="section-header--section heading-sm">
                        <span>// </span>
                        {children}
                        <span>.</span>
                    </h2>
                );
            case "subsection":
                return (
                    <h3 ref={ref} className="section-header--subsection heading-xxs">
                        {children}
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