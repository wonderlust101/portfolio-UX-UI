"use client"

import { CldImage, getCldImageUrl } from "next-cloudinary";
import { useEffect, useState } from "react";

type OptimizedImageProps = {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    quality?: number;
    className?: string;
    [key: string]: any;
}

export default function OptimizedImage({src, alt, width, height, quality = 75, className, ...restProps}: OptimizedImageProps) {
    const [blurDataUrl, setBlurDataUrl] = useState<string|null>(null);

    useEffect(() => {
        async function fetchTinyBlur() {
            try {
                const thumbUrl = getCldImageUrl({
                    src,
                    width  : 20,
                    quality: "10",
                    format : "webp"
                });

                const res = await fetch(thumbUrl);
                const blob = await res.blob();

                const reader = new FileReader();
                reader.onloadend = () => {
                    setBlurDataUrl(reader.result as string);
                };
                reader.readAsDataURL(blob);
            } catch (err) {
                console.error(err);
            }
        }

        fetchTinyBlur();
    }, [src]);

    if (!blurDataUrl) {
        return null;
    }

    return (
        <CldImage
            src={src}
            alt={alt}
            width={width}
            height={height}
            quality={quality}
            placeholder="blur"
            blurDataURL={blurDataUrl}
            className={className}
            {...restProps}
        />
    );
}