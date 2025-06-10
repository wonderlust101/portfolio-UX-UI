"use client";

import SectionHeader from "@/components/SectionHeader";
import { CSSProperties, ReactNode } from "react";
import "./Section.scss";

type SectionProps = {
    children?: ReactNode;
    header?: string;
    className?: string;
    style?: CSSProperties;
    id?: string;
};

export default function Section({children, header, style, id}: SectionProps) {
    return (
        <section className="section" style={style} id={id}>
            {header && (
                <div className="section__header">
                    <SectionHeader type="section">
                        {header}
                    </SectionHeader>
                </div>
            )}

            <div className="section__content">
                {children}
            </div>
        </section>
    );
}