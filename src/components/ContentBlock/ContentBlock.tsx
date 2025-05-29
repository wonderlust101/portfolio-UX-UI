import SectionHeader from "@/components/SectionHeader";
import type { ReactNode } from "react";
import "./ContentBlock.scss";

type SubsectionProps = {
    children: ReactNode;
    header: string;
    type?: "subsection"|"block";
    theme: "dark"|"light";
}

export default function ContentBlock({children, header, type = "subsection", theme}: SubsectionProps) {
    return (
        <div>
            <hr/>

            <section className="content-block">
                <SectionHeader type={type} theme={theme}>{header}</SectionHeader>

                <div className="content-block__content">
                    {children}
                </div>
            </section>
        </div>
    );
}