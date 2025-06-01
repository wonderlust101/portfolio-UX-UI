"use client";

import SectionHeader from "@/components/SectionHeader";
import { contentVariants, headerVariants } from "@/motion/motionVariants";
import { motion } from "motion/react";
import { CSSProperties, ReactNode } from "react";
import "./Section.scss";

type SectionProps = {
    children?: ReactNode;
    header?: string;
    className?: string;
    style?: CSSProperties;
};

export default function Section({children, header, className, style}: SectionProps) {
    return (
        <motion.section className={`section grid-bleed${className ? ` ${className}` : ""}`} style={style}>
            {header && (
                <motion.div
                    className="section__header"
                    variants={headerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <SectionHeader type="section">
                        {header}
                    </SectionHeader>
                </motion.div>
            )}

            <motion.div
                className="section__content"
                variants={contentVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                {children}
            </motion.div>
        </motion.section>
    );
}