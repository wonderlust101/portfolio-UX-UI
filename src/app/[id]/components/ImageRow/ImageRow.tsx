import ImageWithCaption from "../ImageWithCaption";
import './ImageRow.scss'
import type { Image } from "@/types/global";
import { motion } from "motion/react";
import { fadeUp, staggerParent } from "@/motion/motionVariants";

type ImageRowProps = {
    imageSources: Image[];
}

export default function ImageRow({imageSources}: ImageRowProps) {
    return (
        <motion.div
            className="image-row"
            variants={staggerParent}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            {imageSources.map(image => (
                <motion.div key={image.image} variants={fadeUp}>
                    <ImageWithCaption image={image} />
                </motion.div>
            ))}
        </motion.div>
    );
}