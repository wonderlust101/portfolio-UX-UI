"use client";

import { buildNamedTransformUrl } from "@/lib/cloudinary";
import { CldImage } from "next-cloudinary";
import dynamic from "next/dynamic";
import { useState } from "react";
import "./ImageWithCaption.scss";

type ImageWithCaptionProps = {
    image: string;
    alt?: string;
};

const Lightbox = dynamic(
    () =>
        import("react-modal-image").then((mod) => mod.Lightbox),
    {ssr: false}
);

export default function ImageWithCaption({image, alt = "No caption available"}: ImageWithCaptionProps) {
    const [isOpen, setIsOpen] = useState(false);
    const largeUrl = buildNamedTransformUrl(image, "webp_high");

    return (
        <>
            <figure
                className="image-with-caption"
                onClick={() => setIsOpen(true)}
                style={{cursor: "pointer"}}
            >
                <CldImage
                    className="image-with-caption__image"
                    src={image}
                    alt={alt}
                    width={1000}
                    height={600}
                    quality={60}
                />
            </figure>

            {isOpen && (
                <div className="image-with-caption__modal">
                    <Lightbox
                        medium={largeUrl}
                        alt={alt}
                        onClose={() => setIsOpen(false)}
                        hideDownload={true}
                        hideZoom={false}
                    />
                </div>
            )}
        </>
    );
}