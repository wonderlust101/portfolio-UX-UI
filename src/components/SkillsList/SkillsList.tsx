import ContentBlock from "@/components/ContentBlock";
import SectionHeader from "@/components/SectionHeader";
import homeData from "@/data/home.json";
import "./SkillsList.scss";
import { CSSProperties } from "react";

export default function SkillsList() {
    const {skills} = homeData;

    return (
        <section className="grid-bleed skills-list" id="skills-and-tools">
            <SectionHeader type="page">
                Skills and Tools
            </SectionHeader>

            <div className="skills-list__type">
                {skills.map((skill) => (
                    <ContentBlock key={skill.title} header={skill.title} type="subsection">
                        <p>{skill.description}</p>

                        <div className="skills-list__grid">
                            {skill.skillList.map((skillName) => (
                                <div
                                    key={skillName.header}
                                    className="skills-list__skill"
                                    style={{"--hover-color": skillName.tint} as CSSProperties}
                                >
                                    <p className="bold" key={skillName.header}>{skillName.header}</p>
                                    {skillName.icon &&
                                        <img className="skills-list__icon" src={`/images/shared/${skillName.icon}`} alt=""/>
                                    }
                                </div>
                            ))}
                        </div>
                    </ContentBlock>
                ))}
            </div>
        </section>
    );
}