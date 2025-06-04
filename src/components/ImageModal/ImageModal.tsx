"use client";

import OptimizedImage from "@/components/OptimizedImage";
import { buildNamedTransformUrl } from "@/lib/cloudinary";
import { motion } from "motion/react";
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
                >
                    <OptimizedImage
                        className="image-modal__image"
                        src={buildNamedTransformUrl(src, "webp_high")}
                        alt={caption || "No caption available"}
                        width={2000}
                        height={2000}
                        quality={80}
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