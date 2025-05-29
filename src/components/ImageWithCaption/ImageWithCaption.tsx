import './ImageWithCaption.scss';

type ImageWithCaptionProps = {
    image: string;
    caption: string;
}

export default function ImageWithCaption({image, caption}: ImageWithCaptionProps) {
    return (
        <figure className="image-with-caption">
            <img src={image} alt={caption}/>
            <figcaption className='image-with-caption__caption'>{caption}</figcaption>
        </figure>
    );
}