import ImageWithCaption from "@/app/[id]/components/ImageWithCaption";
import MasonryLayout from "@/components/MasonryLayout";
import { Image, ImagesGalleryOptions } from "@/types/case-study";
import { CSSProperties } from "react";
import "./ImageGallery.scss";

type ImageGalleryProps = {
    imagesGallery: {
        images: Image[];
        options: ImagesGalleryOptions;
    };
    slug: string;
}

export default async function ImageGallery({imagesGallery, slug}: ImageGalleryProps) {
    const {columns, tabletColumns, masonry} = imagesGallery.options;

    const imageElements = imagesGallery.images.map((image, index) => (
        <ImageWithCaption key={index} image={image.src} alt={image.alt} slug={slug}/>
    ));

    // If masonry is enabled, wrap in client component
    if (masonry) {
        return (
            <MasonryLayout
                columns={columns ? columns : 2}
                tabletColumns={tabletColumns ? tabletColumns : 1}
                fallbackClassName="image-gallery"
                fallbackStyle={{"--column-num": columns ? columns : 2, "--tablet-column-num": tabletColumns ? tabletColumns : 1} as CSSProperties}
            >
                {imageElements}
            </MasonryLayout>
        );
    }

    // Default server-side grid layout
    return (
        <div className="image-gallery"
             style={{"--column-num": columns ? columns : 2, "--tablet-column-num": tabletColumns ? tabletColumns : 1} as CSSProperties}>
            {imageElements}
        </div>
    );
}