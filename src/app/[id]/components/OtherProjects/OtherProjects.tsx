"use client";

import Button from "@/components/Button";
import OptimizedImage from "@/components/OptimizedImage";
import Section from "@/components/Section";
import { buildNamedTransformUrl } from "@/lib/cloudinary";
import { useThemeStore } from "@/store/useThemeStore";
import "./OtherProjects.scss";

type CurrentProjectProps = {
    currentProject: string | undefined;
}

const otherProjects = [
    {
        project: "The Elder Scrolls: Skyrim Quest Log Redesign",
        href   : "skyrim-quest-log-redesign",
        thumbnail: "skyrim-wide_stut1i"
    },
    {
        project: "Telus World of Science Edmonton Guide Book",
        href   : "telus-world-of-science-guide-book",
        thumbnail: "telus-wide_qtlqgz"
},
    {
        project: "Elections Canada Website Audit",
        href   : "election-canada-website-audit",
        thumbnail: "election-canada-wide_dfpmwa"
    }
];

export default function OtherProjects({currentProject}: CurrentProjectProps) {
    const color = useThemeStore((state) => state.color);

    return (
        <Section header="Other Projects">
            {otherProjects.map((project) => {
                if (project.href !== currentProject)
                    return (
                        <div key={project.project}>
                            <hr/>

                            <section className="other-projects">
                                <div className="other-projects__header">
                                    <h3 className="heading-xs">
                                        <span className={`${color}-accent-light`}>// </span>
                                        {project.project}
                                        <span className={`${color}-accent-light`}>.</span>
                                    </h3>

                                    <Button
                                        color="accent"
                                        theme="light"
                                        size="sm"
                                        disabled={currentProject === project.href}
                                        href={`/${project.href}`}
                                    >
                                        Read Case Study
                                    </Button>
                                </div>

                                <div className="other-projects__content">
                                    <OptimizedImage
                                        className='other-projects__thumbnail'
                                        src={buildNamedTransformUrl(project.thumbnail, "webp_low")}
                                        alt=""
                                        width={1600}
                                        height={400}
                                        quality={50}
                                    />
                                </div>
                            </section>
                        </div>
                    );
            })}
        </Section>
    );
}