import ImageWithCaption from "@/components/ImageWithCaption";
import './ImageRow.scss'
import type { Image } from "@/types/global";

type ImageRowProps = {
    imageSources: Image[];
}

export default function ImageRow({imageSources}: ImageRowProps) {
    return (
        <div className="image-row">
            {imageSources.map(image => (
                <ImageWithCaption
                    key={image.caption}
                    image={image}
                />
            ))}
        </div>
    );
}