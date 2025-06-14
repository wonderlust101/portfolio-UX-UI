"use client";

import List from "@/components/List";
import "./About.scss";
import SectionHeader from "@/components/SectionHeader";
import type { ProfileData } from "@/types/home";
import Image from "next/image";

type AboutProps = {
    aboutText: ProfileData|null;
}

export default function About({aboutText}: AboutProps) {
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

                <div className="about__image">
                    <Image
                        className="about__image"
                        src={`${process.env.NEXT_PUBLIC_R2_BUCKET_URL}/sergei-borja.webp`}
                        alt="Portrait photograph of Sergei Borja"
                        loading="lazy"
                        width={700}
                        height={700}
                        quality={80}
                    />
                </div>
            </div>
        </section>
    );
}