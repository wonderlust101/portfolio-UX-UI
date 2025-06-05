"use client";

import Button from "@/components/Button";
import "./SelectedWork.scss";
import OptimizedImage from "@/components/OptimizedImage";
import { buildNamedTransformUrl } from "@/lib/cloudinary";
import { contentVariants, fadeUp, fadeUpWithDelay, headerVariants, staggerParent } from "@/motion/motionVariants";
import type { CaseStudyList } from "@/types/home";
import { motion } from "motion/react";

type CaseStudyListingProps = {
    caseStudy: CaseStudyList;
    index: number;
};

export default function SelectedWork({caseStudy, index}: CaseStudyListingProps) {
    return (
        <motion.div
            variants={staggerParent}
            initial="hidden"
            whileInView="visible"
            viewport={{once: true, amount: 0.3}}
        >
            <hr/>

            <motion.section
                className="selected-work"
                variants={fadeUp}
            >
                <motion.div
                    className="selected-work__text-column"
                    variants={contentVariants}
                >
                    <motion.h3 className="heading-sm" variants={headerVariants}>
                        <span className="accent-color">// </span>
                        0{index}
                        <span className="accent-color">.</span>
                    </motion.h3>

                    <motion.div className="selected-work__description" variants={contentVariants}>
                        <div className="selected-work__text">
                            <div className="selected-work__header">
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

                <motion.div
                    variants={fadeUpWithDelay}
                    custom={0.70}
                >
                    <OptimizedImage
                        className="selected-work__image"
                        src={buildNamedTransformUrl(caseStudy.previewImage, "webp_low")}
                        alt={caseStudy.title}
                        loading="lazy"
                        width={750}
                        height={750}
                        quality={50}
                    />
                </motion.div>
            </motion.section>
        </motion.div>
    );
}