import LightBox from "@/components/LightBox";
import { getBlurDataURL } from "@/utils/getBlurDataURL";
import Image from "next/image";
import probe from "probe-image-size";
import "./ImageWithCaption.scss";

type ImageWithCaptionProps = {
    image: string;
    alt?: string;
    slug: string;
};

export default async function ImageWithCaption({image, alt = "No caption available", slug}: ImageWithCaptionProps) {
    const imgSrc = `${process.env.NEXT_PUBLIC_R2_BUCKET_URL}/${slug}/${image}.webp`;
    const {width, height} = await probe(imgSrc);
    const blurDataURL = await getBlurDataURL(imgSrc);

    return (
        <>
            <LightBox imgSrc={imgSrc} alt={alt}>
                <figure
                    className="image-with-caption"
                    style={{aspectRatio: `${width / height}`}}
                >
                    <Image
                        className="image-with-caption__image"
                        src={imgSrc}
                        alt={alt}
                        fill
                        quality={60}
                        placeholder={blurDataURL ? "blur" : "empty"}
                        blurDataURL={blurDataURL}
                    />
                </figure>
            </LightBox>
        </>
    );
}