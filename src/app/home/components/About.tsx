"use client";

import List from "@/components/List";
import "./About.scss";
import SectionHeader from "@/components/SectionHeader";
import type { ProfileData } from "@/types/home";
import { CldImage } from "next-cloudinary";

type AboutProps = {
    aboutText: ProfileData|null;
}

export default function About({aboutText}: AboutProps) {
    return (
        <section className="grid-bleed skills-list" id="about-me">
            <SectionHeader type="page">
                About Me
            </SectionHeader>

            <div className="about__split" >
                <div className="about__content" >
                    <p>{aboutText?.aboutText}</p>
                    <List items={aboutText!.additionalDetails} type="meta"/>
                </div>

                <div className="about__image">
                    <CldImage
                        className="about__image"
                        src={"sergei-borja_c36hvi"}
                        alt="Sergei Borja"
                        loading="lazy"
                        width={700}
                        height={700}
                        quality={75}
                    />
                </div>
            </div>
        </section>
    );
}