"use client";

import ImageModal from "@/components/ImageModal";
import OptimizedImage from "@/components/OptimizedImage";
import { buildNamedTransformUrl } from "@/lib/cloudinary";
import { fadeUp } from "@/motion/motionVariants";
import type { Image as ImageType } from "@/types/global";
import "./ImageWithCaption.scss";
import { AnimatePresence, motion } from "motion/react";
import { getCldImageUrl } from "next-cloudinary";
import { CSSProperties, useEffect, useState } from "react";

type ImageWithCaptionProps = {
    image: ImageType;
};

export default function ImageWithCaption({image}: ImageWithCaptionProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [highBlur, setHighBlur] = useState<string | null>(null);

    const styles = {"--image-max-width": image.containerPercentage ? `${image.containerPercentage}%` : undefined} as CSSProperties;

    useEffect(() => {
        async function fetchHighResBlur() {
            try {
                const url = buildNamedTransformUrl(image.image, "webp_high");
                const tinyUrl = getCldImageUrl({
                    src: url,
                    width: 20,
                    quality: "10",
                    format: "webp",
                });
                const res = await fetch(tinyUrl);
                const blob = await res.blob();
                const reader = new FileReader();
                reader.onloadend = () => setHighBlur(reader.result as string);
                reader.readAsDataURL(blob);
            } catch (e) {
                console.error(e);
            }
        }

        fetchHighResBlur();
    }, [image.image]);

    return (
        <>
            <motion.figure
                className="image-with-caption"
                style={styles}
                variants={fadeUp}
                onClick={() => setIsOpen(true)}
            >
                <OptimizedImage
                    className="image-with-caption__image"
                    src={buildNamedTransformUrl(image.image, "webp_low")}
                    alt={image.caption || "No caption available"}
                    width={1000}
                    height={600}
                    quality={80}
                />

                {image.caption && (
                    <figcaption className="image-with-caption__caption">{image.caption}</figcaption>
                )}
            </motion.figure>

            <AnimatePresence mode="wait">
                {isOpen && (
                    <ImageModal
                        src={image.image}
                        caption={image.caption}
                        blurDataUrl={highBlur}
                        onClose={() => setIsOpen(false)}
                    />
                )}
            </AnimatePresence>
        </>
    );
}