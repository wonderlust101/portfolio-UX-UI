"use client";

import List from "@/components/List";
import Section from "@/components/Section";
import "./About.scss";
import { fadeUp, fadeUpLowOpacity, staggerParent } from "@/motion/motionVariants";
import type { ProfileData } from "@/types/home";
import { motion } from "motion/react";
import Image from "next/image";

type AboutProps = {
    aboutText: ProfileData|null;
}

export default function About({aboutText}: AboutProps) {
    return (
        <Section header="About Me">
            <motion.div
                variants={staggerParent}
                initial="hidden"
                whileInView="visible"
                viewport={{once: true}}
            >
                <motion.hr variants={fadeUpLowOpacity}/>

                <motion.div className="about__split" variants={staggerParent}>
                    <motion.div className="about__content" variants={fadeUp}>
                        <p>{aboutText?.aboutText}</p>
                        <List items={aboutText!.additionalDetails} type="meta"/>
                    </motion.div>

                    <motion.div variants={fadeUp} className="about__image">
                        <Image
                            className="about__image"
                            src="/images/home/sergei-borja.webp"
                            alt="Sergei Borja"
                            loading="lazy"
                            width={1600}
                            height={1600}
                            quality={75}
                            placeholder="blur"
                            blurDataURL="/images/home/sergei-borja-placeholder.webp"
                        />
                    </motion.div>
                </motion.div>
            </motion.div>
        </Section>
    );
}