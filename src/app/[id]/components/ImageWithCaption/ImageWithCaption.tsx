"use client";

import { buildNamedTransformUrl } from "@/lib/cloudinary";
import { CldImage } from "next-cloudinary";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import { Zoom } from "yet-another-react-lightbox/plugins";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "./ImageWithCaption.scss";

type ImageWithCaptionProps = {
    image: string;
    alt?: string;
};

const Lightbox = dynamic(() => import("yet-another-react-lightbox"), {
    ssr: false
});

export default function ImageWithCaption({image, alt = "No caption available"}: ImageWithCaptionProps) {
    const [isOpen, setIsOpen] = useState(false);
    const largeUrl = buildNamedTransformUrl(image, "webp_high");
    const captionsRef = useRef(null);

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

            <Lightbox
                open={isOpen}
                close={() => setIsOpen(false)}
                slides={[{src: largeUrl, alt, description: alt}]}
                plugins={[Zoom, Captions]}
                carousel={{finite: true}}
                controller={{closeOnBackdropClick: true}}
                zoom={{
                    maxZoomPixelRatio      : 1,
                    zoomInMultiplier       : 1,
                    doubleTapDelay         : 300,
                    doubleClickDelay       : 300,
                    doubleClickMaxStops    : 1,
                    keyboardMoveDistance   : 50,
                    wheelZoomDistanceFactor: 50,
                    pinchZoomDistanceFactor: 50,
                    scrollToZoom           : true
                }}
                render={{
                    buttonPrev: () => null,
                    buttonNext: () => null
                }}
                captions={{ref: captionsRef}}
            />
        </>
    );
}