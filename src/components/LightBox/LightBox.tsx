"use client";

import dynamic from "next/dynamic";
import { useRef, useState, useEffect, ReactNode } from "react";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import { Zoom } from "yet-another-react-lightbox/plugins";
import Captions from "yet-another-react-lightbox/plugins/captions";

type LightBoxProps = {
    imgSrc: string;
    alt: string;
    children: ReactNode;
};

const Lightbox = dynamic(() => import("yet-another-react-lightbox"), {
    ssr: false
});

export default function LightBox({ imgSrc, alt, children }: LightBoxProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const captionsRef = useRef(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleClick = () => {
        setIsOpen(true);
    };

    if (!isMounted) {
        return <div onClick={handleClick}>{children}</div>;
    }

    return (
        <>
            <div onClick={handleClick}>
                {children}
            </div>

            <Lightbox
                open={isOpen}
                close={() => setIsOpen(false)}
                slides={[{ src: imgSrc, alt, description: alt }]}
                plugins={[Zoom, Captions]}
                carousel={{ finite: true }}
                controller={{ closeOnBackdropClick: true }}
                zoom={{
                    maxZoomPixelRatio: 1,
                    zoomInMultiplier: 1,
                    doubleTapDelay: 300,
                    doubleClickDelay: 300,
                    doubleClickMaxStops: 1,
                    keyboardMoveDistance: 50,
                    wheelZoomDistanceFactor: 50,
                    pinchZoomDistanceFactor: 50,
                    scrollToZoom: true
                }}
                render={{
                    buttonPrev: () => null,
                    buttonNext: () => null
                }}
                captions={{ ref: captionsRef }}
            />
        </>
    );
}