import Button from "@/components/Button";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import "./OtherProjects.scss";

type CurrentProjectProps = {
    currentProject: string | undefined;
}

const otherProjects = [
    {
        project: "The Elder Scrolls: Skyrim Quest Log Redesign",
        href   : "skyrim-quest-log-redesign"
    },
    {
        project: "Telus World of Science Edmonton Guide Book",
        href   : "telus-world-of-science-guide-book"
    },
    {
        project: "Elections Canada Website Audit",
        href   : "election-canada-website-audit"
    }
];

export default function OtherProjects({currentProject}: CurrentProjectProps) {

    return (
        <Section theme="light" header="Other Projects">
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
                                        to={`/${project.href}`}
                                    >
                                        Read Case Study
                                    </Button>
                                </div>

                                <div className="other-projects__content">
                                    <img src="images/home/desktop/image-hero-coffeepress.jpg" alt=""/>
                                </div>
                            </section>
                        </div>
                    );
            })}
        </Section>
    );
}