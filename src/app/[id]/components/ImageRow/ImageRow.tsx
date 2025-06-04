import { staggerParent } from "@/motion/motionVariants";
import type { Image } from "@/types/global";
import { motion } from "motion/react";
import ImageWithCaption from "../ImageWithCaption";
import "./ImageRow.scss";

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
            viewport={{once: true, amount: 0.2}}
        >
            {imageSources.map(image => (
                <ImageWithCaption image={image} key={image.image}/>
            ))}
        </motion.div>
    );
}