import type { ReactNode } from "react";
import { forwardRef } from "react";
import "./SectionHeader.scss";

type SectionHeaderProps = {
    children: ReactNode;
    type: string;
    icon?: string;
    id?: string;
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
    ({children, type, icon, id}, ref) => {
        switch (type) {
            case "page":
                return (
                    <h1 ref={ref} className="section-header heading-md" id={id}>
                        {icon && <img src={iconMap[icon]} alt=""/>}
                        {children}
                    </h1>
                );
            case "section":
                return (
                    <h2 className="section-header heading-md" id={id}>
                        {icon && <img src={iconMap[icon]} alt=""/>}
                        {children}
                    </h2>
                );
            case "subsection":
                return (
                    <h3 ref={ref} className="section-header--subsection heading-xxs" id={id}>
                        {children}
                    </h3>
                );
        }
    }
);

export default SectionHeader;