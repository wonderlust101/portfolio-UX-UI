"use client";

import SectionHeader from "@/components/SectionHeader";
import { contentVariants, fadeUp, fadeUpLowOpacity, headerVariants, staggerParent } from "@/motion/motionVariants";
import { useThemeStore } from "@/store/useThemeStore";
import type { Persona as PersonaType } from "@/types/case-study";
import "./Persona.scss";
import { motion } from "motion/react";
import Image from "next/image";

type PersonaProps = {
    personaData: PersonaType;
}

export default function Persona({personaData}: PersonaProps) {
    const color = useThemeStore((state) => state.color);

    return (
        <motion.section
            className="persona"
            initial="hidden"
            whileInView="visible"
            variants={staggerParent}
            viewport={{once: true}}
        >

            <motion.div className="persona__top" variants={fadeUp}>
                <motion.div className="persona__image-container" variants={headerVariants}>
                    <Image
                        className="persona__image"
                        src={personaData?.image}
                        alt={`${personaData.name}`}
                        height={1600}
                        width={1600}
                    />
                </motion.div>

                <motion.div className="persona__info" variants={contentVariants}>
                    <SectionHeader type="block">{personaData.name}</SectionHeader>

                    <div>
                        <ul>
                            <li><p><span className="bold">Age: </span>{personaData.age}</p></li>
                            <li><p><span className="bold">Location: </span>{personaData.location}</p></li>
                            <li><p><span className="bold">Type: </span>{personaData.type}</p></li>
                        </ul>
                        <p className={`persona__quote ${color}-accent-light`}>"{personaData.quote}"</p>
                    </div>
                </motion.div>
            </motion.div>

            <motion.hr variants={fadeUpLowOpacity}/>

            <motion.div className="persona__bottom" variants={staggerParent}>
                <motion.div className="persona__list" variants={fadeUp}>
                    <p className="bold">Goals:</p>
                    <ul>
                        {personaData.goals.map((goal) => (
                            <motion.li key={goal} variants={fadeUp}>
                                <p>{goal}</p>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>

                <motion.div className="persona__list" variants={fadeUp}>
                    <p className="bold">Pain Points:</p>
                    <ul>
                        {personaData.painPoints.map((pain) => (
                            <motion.li key={pain} variants={fadeUp}>
                                <p>{pain}</p>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>
            </motion.div>
        </motion.section>
    );
}