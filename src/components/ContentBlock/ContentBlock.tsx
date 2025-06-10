"use client";

import SectionHeader from "@/components/SectionHeader";
import { ReactNode } from "react";
import "./ContentBlock.scss";

type SubsectionProps = {
    children?: ReactNode;
    header: string|undefined;
    type: string;
};

export default function ContentBlock({children, header, type}: SubsectionProps) {
    return (
        <section className={`content-block ${type === 'subsection' ? 'content-block--subsection' : ''}`}>
            <SectionHeader type={type}>
                {header}
            </SectionHeader>

            <div className="content-block__content">
                {children}
            </div>
        </section>
    );
}