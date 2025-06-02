"use client";

import { getPlaceholderUrl } from "@/utils/getPlaceholderUrl";
import { motion } from "motion/react";
import Image from "next/image";
import "./ImageModal.scss";

type ImageModalProps = {
    src: string;
    caption?: string;
    onClose?: () => void;
};

export default function ImageModal({ src, caption, onClose }: ImageModalProps) {
    return (
            <motion.div
                className="image-modal__backdrop"
                onClick={onClose}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                <motion.div
                    className="image-modal__image-container"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <Image
                        className="image-modal__image"
                        src={src}
                        alt={caption || "No caption available"}
                        loading="lazy"
                        width={1600}
                        height={1600}
                        quality={100}
                        placeholder="blur"
                        blurDataURL={getPlaceholderUrl(src)}
                    />
                    {caption && (
                        <figcaption className="image-modal__caption">
                            {caption}
                        </figcaption>
                    )}
                </motion.div>
            </motion.div>
    );
}