import LightBox from "@/components/LightBox";
import Image from "next/image";
import { getBlurDataURL } from "@/utils/getBlurDataURL";
import "./ImageWithCaption.scss";

type ImageWithCaptionProps = {
    image: string;
    alt?: string;
    slug: string;
};

export default async function ImageWithCaption({image, alt = "No caption available", slug}: ImageWithCaptionProps) {
    const imgSrc = `${process.env.NEXT_PUBLIC_R2_BUCKET_URL}/${slug}/${image}.webp`;
    const blurDataURL = await getBlurDataURL(imgSrc);

    return (
        <>
            <LightBox imgSrc={imgSrc} alt={alt}>
                <figure className="image-with-caption" style={{cursor: "pointer"}}>
                    <Image
                        className="image-with-caption__image"
                        src={imgSrc}
                        alt={alt}
                        width={1000}
                        height={600}
                        loading="lazy"
                        quality={60}
                        placeholder={blurDataURL ? "blur" : "empty"}
                        blurDataURL={blurDataURL}
                    />
                </figure>
            </LightBox>
        </>
    );
}