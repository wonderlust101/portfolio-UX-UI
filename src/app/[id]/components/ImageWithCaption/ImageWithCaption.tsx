import { fadeUp } from "@/motion/motionVariants";
import type { Image as ImageType } from "@/types/global";
import "./ImageWithCaption.scss";
import Image from "next/image";
import { motion } from "motion/react";
import { CSSProperties } from "react";

type ImageWithCaptionProps = {
    image: ImageType;
}

export default function ImageWithCaption({image}: ImageWithCaptionProps) {
    const styles = {
        "--image-max-width": image.containerPercentage ? `${image.containerPercentage}%` : undefined
    } as CSSProperties;


    return (
        <motion.figure className="image-with-caption" style={styles} variants={fadeUp}>
            <Image
                className="image-with-caption__image"
                src={`/${image.image.replace(/^\/?/, "")}`}
                alt={image.caption || "Loading Image"}
                loading="lazy"
                width={1200}
                height={1200}
                quality={75}
            />
            {image.caption && (
                <figcaption className="image-with-caption__caption">{image.caption}</figcaption>
            )}
        </motion.figure>
    );
}