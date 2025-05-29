import SectionHeader from "@/components/SectionHeader";
import type { ReactNode } from "react";
import "./Section.scss";

type SectionProps = {
    children?: ReactNode;
    theme: "light"|"dark";
    header?: string;
    id?: string;
    className?: string;
}

export default function Section({children, theme, header, id, className}: SectionProps) {
    return (
        <section id={id} className={`section section--${theme} grid-bleed${className ? ` ${className}` : ""}`}>
            {header && (
                <div className="section__header">
                    <SectionHeader type="section" theme={theme}>{header}</SectionHeader>
                </div>
            )}

            <div className="section__content">
                {children}
            </div>
        </section>
    );
}