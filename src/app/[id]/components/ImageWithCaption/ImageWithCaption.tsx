"use client";

import ImageModal from "@/components/ImageModal";
import { fadeUp } from "@/motion/motionVariants";
import type { Image as ImageType } from "@/types/global";
import "./ImageWithCaption.scss";
import { getPlaceholderUrl } from "@/utils/getPlaceholderUrl";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { CSSProperties, useState } from "react";

type ImageWithCaptionProps = {
    image: ImageType;
};

export default function ImageWithCaption({ image }: ImageWithCaptionProps) {
    const [isOpen, setIsOpen] = useState(false);
    const styles = {
        "--image-max-width": image.containerPercentage ? `${image.containerPercentage}%` : undefined,
        cursor: "zoom-in"
    } as CSSProperties;

    const srcPath = `/${image.image.replace(/^\/?/, "")}`;
    const caption = image.caption || "No caption available";

    return (
        <>
            <motion.figure
                className="image-with-caption"
                style={styles}
                variants={fadeUp}
                onClick={() => setIsOpen(true)}
            >
                <Image
                    className="image-with-caption__image"
                    src={srcPath}
                    alt={caption}
                    loading="lazy"
                    width={1600}
                    height={1600}
                    quality={75}
                    placeholder="blur"
                    blurDataURL={getPlaceholderUrl(image.image)}
                />

                {image.caption && (
                    <figcaption className="image-with-caption__caption">{image.caption}</figcaption>
                )}
            </motion.figure>

            <AnimatePresence mode="wait">
                {isOpen && (
                    <ImageModal
                        src={srcPath}
                        caption={image.caption}
                        onClose={() => setIsOpen(false)}
                    />
                )}
            </AnimatePresence>
        </>
    );
}