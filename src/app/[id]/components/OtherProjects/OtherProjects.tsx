"use client";

import SectionHeader from "@/components/SectionHeader";
import projectData from "@/data/projectLinks.json";
import { useAnimatedNavigation } from "@/hooks/useAnimatedNavigation";
import { CldImage } from "next-cloudinary";
import { CSSProperties } from "react";
import './OtherProjects.scss'

type CurrentProjectProps = {
    currentProject: string|undefined;
}

export default function OtherProjects({currentProject}: CurrentProjectProps) {
    const {handleNavigation} = useAnimatedNavigation();

    return (
        <section className="other-projects grid-bleed" id='other-works'>
            <SectionHeader type="page">
                Other Works
            </SectionHeader>

            <div className="other-projects__grid">
                {projectData.projectLinks.map((project) => {
                    if (currentProject !== project.link && project.featured === true)
                        return (
                            <a
                                className="other-projects__container"
                                style={{"--hover-color": project.theme.lightThemeColor} as CSSProperties}
                                key={project.title}
                                onClick={handleNavigation(project.link)}
                                href={project.link}
                            >
                                <div className="other-projects__image-container">
                                    <CldImage
                                        className="other-projects__image"
                                        src={project.previewImage}
                                        alt=""
                                        width={600}
                                        height={600}
                                        quality={50}
                                    />
                                </div>

                                <div className="other-projects__text-container">
                                    <p>{project.type}</p>
                                    <h2 className="heading-sm">{project.title}</h2>
                                </div>
                            </a>
                        );
                })}
            </div>
        </section>
    );
}