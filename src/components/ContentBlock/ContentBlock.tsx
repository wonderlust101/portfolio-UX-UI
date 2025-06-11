"use client";

import SectionHeader from "@/components/SectionHeader";
import { ReactNode } from "react";
import "./ContentBlock.scss";

type SubsectionProps = {
    children?: ReactNode;
    header: string|undefined;
    type: string;
    hasSectionContent?: boolean;
    icon?: string;
};

export default function ContentBlock({children, header, type, hasSectionContent, icon}: SubsectionProps) {
    return (
        <section
            className={`content-block ${type === "subsection" ? `content-block--subsection ${hasSectionContent || "content-block--no-section-content"}` : ""}`}
        >
            <SectionHeader type={type} icon={icon}>
                {header}
            </SectionHeader>

            <div className="content-block__content">
                {children}
            </div>
        </section>
    );
}