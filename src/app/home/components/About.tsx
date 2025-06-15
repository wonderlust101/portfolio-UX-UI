import List from "@/components/List";
import "./About.scss";
import SectionHeader from "@/components/SectionHeader";
import type { ProfileData } from "@/types/home";
import { getBlurDataURL } from "@/utils/getBlurDataURL";
import Image from "next/image";
import probe from "probe-image-size";
import { CSSProperties } from "react";

type AboutProps = {
    aboutText: ProfileData|null;
}

export default async function About({aboutText}: AboutProps) {
    const imgSrc = `${process.env.NEXT_PUBLIC_R2_BUCKET_URL}/sergei-borja.webp`;
    const {width, height} = await probe(imgSrc);
    const blurDataURL = await getBlurDataURL(imgSrc);

    return (
        <section className="about" id="about-me" aria-labelledby="about-me-heading">
            <SectionHeader type="section" icon="about" id="about-me-heading">
                About Me
            </SectionHeader>

            <div className="about__split">
                <div className="about__content">
                    <p>{aboutText?.aboutText}</p>
                    <List items={aboutText!.additionalDetails} type="meta"/>
                </div>

                <div
                    className="about__image"
                    style={{"--aspect-ratio": `${width / height}`} as CSSProperties}
                >
                    <Image
                        src={`${process.env.NEXT_PUBLIC_R2_BUCKET_URL}/sergei-borja.webp`}
                        alt="Portrait photograph of Sergei Borja"
                        loading="lazy"
                        fill
                        quality={80}
                        sizes="(max-width: 80rem) 100vw,(max-width: 48rem) 640px,800px"
                        placeholder={blurDataURL? "blur" : "empty"}
                        blurDataURL={blurDataURL}
                    />
                </div>
            </div>
        </section>
    );
}