import type { RootState } from "@/app/store";
import type { ReactNode } from "react";
import { useSelector } from "react-redux";

type SectionHeaderProps = {
    children: ReactNode;
    type: "page" | "section" | "subsection" | "block";
    theme?: "dark" | "light";
};

export default function SectionHeader({children, type, theme}: SectionHeaderProps) {
    const color = useSelector((state: RootState) => state.theme.color);

    switch (type) {
        case "page":
            return <h1 className="heading-lg">{children}</h1>;
        case "section":
            return (
                <h2 className="heading-md">
                    {children}
                    <span className={`${color}-accent-${theme}`}>.</span>
                </h2>
            );
        case "subsection":
            return (
                <h3 className="heading-sm">
                    <span className={`${color}-accent-${theme}`}>// </span>
                    {children}
                    <span className={`${color}-accent-${theme}`}>.</span>
                </h3>
            );
        case "block":
            return (
                <h4 className="heading-xs">
                    <span className={`${color}-accent-${theme}`}>// </span>
                    {children}
                    <span className={`${color}-accent-${theme}`}>.</span>
                </h4>
            );
    }
}