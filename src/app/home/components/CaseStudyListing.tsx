"use client";

import Button from "@/components/Button";
import "./CaseStudyListing.scss";
import { contentVariants, fadeUp, fadeUpWithDelay, headerVariants, staggerParent } from "@/motion/motionVariants";
import { useThemeStore } from "@/store/useThemeStore";
import type { CaseStudyList } from "@/types/home";
import { motion } from "motion/react";

type CaseStudyListingProps = {
    caseStudy: CaseStudyList;
    index: number;
};

export default function CaseStudyListing({caseStudy, index}: CaseStudyListingProps) {
    const color = useThemeStore((state) => state.color);

    return (
        <motion.div
            variants={staggerParent}
            initial="hidden"
            whileInView="visible"
            viewport={{once: true, amount: 0.3}}
        >
            <hr/>

            <motion.section
                className="case-study-listing"
                variants={fadeUp}
            >
                <motion.div
                    className="case-study-listing__text-column"
                    variants={contentVariants}
                >
                    <motion.h3 className="heading-sm" variants={headerVariants}>
                        <span className={`${color}-accent-light`}>// </span>
                        0{index}
                        <span className={`${color}-accent-light`}>.</span>
                    </motion.h3>

                    <motion.div className="case-study-listing__description" variants={contentVariants}>
                        <div className="case-study-listing__text">
                            <div className="case-study-listing__header">
                                <p>{caseStudy.type}</p>
                                <h3 className="heading-xs">{caseStudy.title}</h3>
                            </div>

                            <p>{caseStudy.description}</p>
                        </div>

                        <Button color="accent" size="md" href={caseStudy.link}>
                            Read More
                        </Button>
                    </motion.div>
                </motion.div>

                <motion.img
                    className="case-study-listing__image"
                    src={caseStudy.previewImage}
                    alt=""
                    variants={fadeUpWithDelay}
                    custom={0.55}
                />
            </motion.section>
        </motion.div>
    );
}