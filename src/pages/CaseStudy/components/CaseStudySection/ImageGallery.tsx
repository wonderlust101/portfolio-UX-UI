import ImageRow from "@/components/ImageRow";
import type { Image } from "@/types/global";
import './ImageGallery.scss'

type ImageGalleryProps = {
    images: Image[][];
}

export default function ImageGallery({images}: ImageGalleryProps) {
    return (
        <div className="image-gallery">
            {images.map((image, index) => (
                <ImageRow key={index} imageSources={image}/>
            ))}
        </div>
    );
}