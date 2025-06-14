"use client";

import "./SelectedWorks.scss";
import SectionHeader from "@/components/SectionHeader";
import projectData from "@/data/projectLinks.json";
import { useAnimatedNavigation } from "@/hooks/useAnimatedNavigation";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { CSSProperties } from "react";

type SelectedWorksProps = {
    title: string;
    currentProject: string;
}

export default function SelectedWorks({title, currentProject}: SelectedWorksProps) {
    const {handleNavigation} = useAnimatedNavigation();
    let index = 0;

    return (
        <section className="selected-works" id="selected-works" aria-labelledby="selected-works-heading">
            <SectionHeader type="section" icon="projects" id="selected-works-heading">
                {title}
            </SectionHeader>

            <ul className="selected-works__grid">
                {projectData.projectLinks.map((project) => {
                    if (currentProject !== project.link && project.featured === true) {
                        index = index + 1;
                        return (
                            <li className="selected-works__list-item" key={project.title}>
                                <Link
                                    className="selected-works__container"
                                    style={{"--hover-color": project.theme.lightThemeColor} as CSSProperties}
                                    href={project.link}
                                    onClick={handleNavigation(project.link)}
                                    aria-label={`View project: ${project.title} (${project.type})`}
                                >
                                    <div className="selected-works__image-container">
                                        <CldImage
                                            className="selected-works__image"
                                            src={project.previewImage}
                                            alt={`Preview screenshot of ${project.title}`}
                                            width={600}
                                            height={600}
                                            quality={50}
                                        />
                                    </div>

                                    <div className="selected-works__text-container">
                                        <div className='selected-works__header'>
                                            <div>
                                                <p>{project.type}</p>
                                                <h2 className="heading-md">{project.title}</h2>
                                            </div>

                                            <ul className="selected-works__tags">
                                                {project.tags.map(tag => (
                                                    <li key={tag} className="heading-xxs selected-works__tag">{tag}</li>
                                                ))}
                                            </ul>
                                        </div>

                                        <p className="selected-works__description">{project.description}</p>
                                    </div>
                                </Link>
                            </li>
                        );
                    }
                })}
            </ul>
        </section>
    );
}