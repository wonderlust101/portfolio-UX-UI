"use client";

import SectionHeader from "@/components/SectionHeader";
import { toKebabCase } from "@/utils/toKebabCase";
import { ReactNode } from "react";
import "./ContentBlock.scss";

type SubsectionProps = {
    children?: ReactNode;
    header: string;
    type: string;
    hasSectionContent?: boolean;
    icon?: string;
};

export default function ContentBlock({children, header, type, hasSectionContent, icon}: SubsectionProps) {
    return (
        <section
            id={toKebabCase(header)}
            role="region"
            aria-labelledby={`${toKebabCase(header)}-heading`}
            className={`content-block ${type === "subsection" ? `content-block--subsection ${hasSectionContent || "content-block--no-section-content"}` : ""}`}
        >
            <header>
                <SectionHeader
                    type={type}
                    icon={icon}
                    id={`${toKebabCase(header)}-heading`}
                >
                    {header}
                </SectionHeader>
            </header>

            <div className="content-block__content">
                {children}
            </div>
        </section>
    );
}