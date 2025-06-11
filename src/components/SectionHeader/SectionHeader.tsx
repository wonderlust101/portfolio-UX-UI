"use client";

import type { ReactNode } from "react";
import React, { forwardRef } from "react";
import "./SectionHeader.scss";

type SectionHeaderProps = {
    children: ReactNode;
    type: string;
    icon?: string;
};

const iconMap: any = {
    projects      : "/images/icons/projects.svg",
    skills        : "/images/icons/skills.svg",
    about         : "/images/icons/about.svg",
    problem       : "/images/icons/problem.svg",
    solution      : "/images/icons/solution.svg",
    research      : "/images/icons/research.svg",
    design        : "/images/icons/design.svg",
    feedback      : "/images/icons/feedback.svg",
    implementation: "/images/icons/implementation.svg",
    phone         : "/images/icons/phone.svg",
    final         : "/images/icons/final.svg",
    journal       : "/images/icons/journal.svg",
    testing       : "/images/icons/testing.svg",
    vr            : "/images/icons/vr.svg"
};

const SectionHeader = forwardRef<HTMLHeadingElement, SectionHeaderProps>(
    ({children, type, icon}, ref) => {
        switch (type) {
            case "page":
                return (
                    <h1 ref={ref} className="section-header heading-md">
                        {icon && <img src={iconMap[icon]} alt=""/>}
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