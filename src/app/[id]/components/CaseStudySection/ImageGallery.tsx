"use client";

import ImageWithCaption from "@/app/[id]/components/ImageWithCaption";
import { Image, ImagesGalleryOptions } from "@/types/case-study";
import { CSSProperties } from "react";
import Masonry from "react-layout-masonry";
import "./ImageGallery.scss";

type ImageGalleryProps = {
    imagesGallery: {
        images: Image[];
        options: ImagesGalleryOptions;
    };
}

export default function ImageGallery({imagesGallery}: ImageGalleryProps) {
    const {columns, tabletColumns, masonry} = imagesGallery.options;

    if (masonry)
        return (
            <Masonry className="image-gallery" columns={{768: tabletColumns ? tabletColumns : 1, 1184: columns ? columns : 2}} gap={8}>
                {imagesGallery.images.map((image, index) => (
                    <ImageWithCaption key={index} image={image.src} alt={image.alt}/>
                ))}
            </Masonry>
        );

    return (
        <div className="image-gallery"
             style={{"--column-num": columns ? columns : 2, "--tablet-column-num": tabletColumns? tabletColumns : 1} as CSSProperties}>
            {imagesGallery.images.map((image, index) => (
                <ImageWithCaption key={index} image={image.src} alt={image.alt}/>
            ))}
        </div>
    );
}