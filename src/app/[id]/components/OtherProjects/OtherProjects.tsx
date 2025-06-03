import Button from "@/components/Button";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import { getPlaceholderUrl } from "@/utils/getPlaceholderUrl";
import Image from "next/image";
import "./OtherProjects.scss";

type CurrentProjectProps = {
    currentProject: string | undefined;
}

const otherProjects = [
    {
        project: "The Elder Scrolls: Skyrim Quest Log Redesign",
        href   : "skyrim-quest-log-redesign",
        thumbnail: "images/home/skyrim-quest-log-thumb.webp"
    },
    {
        project: "Telus World of Science Edmonton Guide Book",
        href   : "telus-world-of-science-guide-book",
        thumbnail: "images/home/telus-world-of-science-thumb.webp"
    },
    {
        project: "Elections Canada Website Audit",
        href   : "election-canada-website-audit",
        thumbnail: "images/home/election-canada-thumb.webp"
    }
];

export default function OtherProjects({currentProject}: CurrentProjectProps) {

    return (
        <Section header="Other Projects">
            {otherProjects.map((project) => {
                if (project.href !== currentProject)
                    return (
                        <div key={project.project}>
                            <hr/>

                            <section className="other-projects">
                                <div className="other-projects__header">
                                    <SectionHeader type="block">{project.project}</SectionHeader>
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
                                    <Image
                                        className='other-projects__thumbnail'
                                        src={`/${project.thumbnail.replace(/^\/?/, "")}`}
                                        alt=""
                                        height={1600}
                                        width={1600}
                                        quality={75}
                                        placeholder="blur"
                                        blurDataURL={getPlaceholderUrl(project.thumbnail)}
                                    />
                                </div>
                            </section>
                        </div>
                    );
            })}
        </Section>
    );
}