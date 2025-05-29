import type { Image } from "@/types/global";
import type { CSSProperties } from "react";
import "./ImageWithCaption.scss";

type ImageWithCaptionProps = {
    image: Image;
    style?: CSSProperties;
}

export default function ImageWithCaption({image, style}: ImageWithCaptionProps) {
    return (
        <figure className="image-with-caption" style={{width: image.options?.even ? "calc(50% - 1rem)" : "100%"}}>
            <img className="image-with-caption__image" src={image.image} alt={image.caption} loading="lazy" style={style}/>
            <figcaption className="image-with-caption__caption">{image.caption}</figcaption>
        </figure>
    );
}