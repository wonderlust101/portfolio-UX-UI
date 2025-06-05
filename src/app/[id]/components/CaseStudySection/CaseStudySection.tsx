"use client";

import ContentBlock from "@/components/ContentBlock";
import Persona from "@/components/Persona";
import Section from "@/components/Section";
import type { Section as SectionType } from "@/types/case-study";
import ContentRenderer from "./ContentRenderer";
import ImageGallery from "./ImageGallery";
import "./CaseStudySection.scss";

import { motion } from "framer-motion";
import { fadeUp, staggerParent } from "@/motion/motionVariants";


type CaseStudySectionProps = {
    section: SectionType;
}

export default function CaseStudySection({ section }: CaseStudySectionProps) {
    return (
        <Section key={section.title}>
            <motion.div
                className="case-study-section__section"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerParent}
            >
                <motion.div variants={fadeUp}>
                    <ContentBlock header={section.title}>
                        <ContentRenderer contents={section.contents} />
                    </ContentBlock>
                </motion.div>

                {section.images && (
                    <motion.div variants={fadeUp}>
                        <ImageGallery images={section.images} />
                    </motion.div>
                )}
            </motion.div>

            {section.subsections?.map((subsection, index) => (
                <motion.div
                    key={index}
                    className="case-study-section__sub-section"
                    initial="hidden"
                    animate="visible"
                    variants={staggerParent}
                >
                    <motion.div variants={fadeUp}>
                        <ContentBlock header={subsection.title} type="block" hideDivider>
                            {subsection.contents && (
                                <ContentRenderer contents={subsection.contents} />
                            )}
                        </ContentBlock>
                    </motion.div>

                    {subsection.persona && (
                        <motion.div variants={fadeUp}>
                            <Persona personaData={subsection.persona} />
                        </motion.div>
                    )}

                    {subsection.images && (
                        <motion.div variants={fadeUp}>
                            <ImageGallery images={subsection.images} />
                        </motion.div>
                    )}
                </motion.div>
            ))}
        </Section>
    );
}