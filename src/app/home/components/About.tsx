"use client"

import List from "@/components/List";
import Section from "@/components/Section";
import "./About.scss";
import { fadeUp, fadeUpLowOpacity, staggerParent } from "@/motion/motionVariants";
import type { ProfileData } from "@/types/home";
import { motion } from "motion/react";

type AboutProps = {
    aboutText: ProfileData|null;
}

export default function About({ aboutText }: AboutProps) {
    return (
        <Section header="About Me">
            <motion.div
                variants={staggerParent}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <motion.hr variants={fadeUpLowOpacity} />

                <motion.div className="about__split" variants={staggerParent}>
                    <motion.div className="about__content" variants={fadeUp}>
                        <p>{aboutText?.aboutText}</p>
                        <List items={aboutText!.additionalDetails} type="meta" />
                    </motion.div>

                    <motion.img
                        src="images/home/sergei-borja.webp"
                        alt="Sergei Borja"
                        variants={fadeUp}
                        className="about__image"
                    />
                </motion.div>
            </motion.div>
        </Section>
    );
}