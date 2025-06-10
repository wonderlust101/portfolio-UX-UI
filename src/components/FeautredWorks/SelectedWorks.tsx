"use client";

import SectionHeader from "@/components/SectionHeader";
import projectData from "@/data/projectLinks.json";
import { useAnimatedNavigation } from "@/hooks/useAnimatedNavigation";
import "./SelectedWorks.scss";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { CSSProperties } from "react";

export default function SelectedWorks() {
    const {handleNavigation} = useAnimatedNavigation();

    return (
        <section className="selected-works grid-bleed" id='selected-works'>
            <SectionHeader type="page">
                Selected Works
            </SectionHeader>

            <div className="selected-works__grid">
                {projectData.projectLinks.map((project) => {
                    if (project.featured === true)
                        return (
                            <Link
                                className="selected-works__container"
                                style={{"--hover-color": project.theme.lightThemeColor} as CSSProperties}
                                key={project.title}
                                onClick={handleNavigation(project.link)}
                                href={project.link}
                            >
                                <div className="selected-works__image-container">
                                    <CldImage
                                        className="selected-works__image"
                                        src={project.previewImage}
                                        alt=""
                                        width={400}
                                        height={400}
                                        quality={50}
                                    />
                                </div>

                                <div className="selected-works__text-container">
                                    <p>{project.type}</p>
                                    <h2 className="heading-sm">{project.title}</h2>
                                </div>
                            </Link>
                        );
                })}
            </div>
        </section>
    );
}