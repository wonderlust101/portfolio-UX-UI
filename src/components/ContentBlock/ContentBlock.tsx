"use client";

import SectionHeader from "@/components/SectionHeader";
import { CSSProperties, ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeUp, fadeUpLowOpacity, staggerParent } from "@/motion/motionVariants";
import "./ContentBlock.scss";

type SubsectionProps = {
    children: ReactNode;
    header: string;
    type?: "subsection" | "block";
    hideDivider?: boolean;
};

export default function ContentBlock({children, header, type = "subsection", hideDivider = false}: SubsectionProps) {
    const styles = {
        "--border-padding-top": hideDivider ? `0` : undefined,
    } as CSSProperties;

    return (
        <motion.div
            className="content-block__container"
            variants={staggerParent}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            {!hideDivider && (<motion.hr variants={fadeUpLowOpacity} />)}

            <motion.section
                className="content-block"
                variants={staggerParent}
                style={styles}
            >
                <motion.div variants={fadeUp}>
                    <SectionHeader type={type}>
                        {header}
                    </SectionHeader>
                </motion.div>

                <motion.div className="content-block__content" variants={fadeUp}>
                    {children}
                </motion.div>
            </motion.section>
        </motion.div>
    );
}