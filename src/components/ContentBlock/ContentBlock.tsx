"use client";

import SectionHeader from "@/components/SectionHeader";
import { ReactNode } from "react";
import "./ContentBlock.scss";

type SubsectionProps = {
    children?: ReactNode;
    header: string|undefined;
    type: string;
    hasSectionContent?: boolean;
};

export default function ContentBlock({children, header, type, hasSectionContent}: SubsectionProps) {
    return (
        <section
            className={`content-block ${type === "subsection" ? `content-block--subsection ${hasSectionContent || "content-block--no-section-content"}` : ""}`}
        >
            <SectionHeader type={type}>
                {header}
            </SectionHeader>

            <div className="content-block__content">
                {children}
            </div>
        </section>
    );
}