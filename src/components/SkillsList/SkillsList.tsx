import SectionHeader from "@/components/SectionHeader";
import homeData from "@/data/home.json";
import "./SkillsList.scss";
import { toKebabCase } from "@/utils/toKebabCase";
import { CSSProperties } from "react";

export default function SkillsList() {
    const {skills} = homeData;

    return (
        <section className="skills-list" id="skills-and-tools" aria-labelledby="skills-and-tools-heading">
            <SectionHeader type="section" icon="skills" id="skills-and-tools-heading">
                Skills and Tools
            </SectionHeader>

            <div className="skills-list__type">
                {skills.map((skill) => (
                    <section key={skill.title} role="region" aria-label={toKebabCase(skill.title)}>
                        <SectionHeader type="subsection" id={toKebabCase(skill.title)}>
                            {skill.title}
                        </SectionHeader>

                        <div className="skills-list__skill-info">
                            <p>{skill.description}</p>

                            <ul className="skills-list__grid">
                                {skill.skillList.map((skillName) => (
                                    <li
                                        key={skillName.header}
                                        className="skills-list__skill"
                                        style={{"--hover-color": skillName.tint} as CSSProperties}
                                    >
                                        <span className="bold" key={skillName.header}>{skillName.header}</span>

                                        {skillName.icon &&
                                            <img className="skills-list__icon" src={`/images/shared/${skillName.icon}`} alt="" aria-hidden={true}/>}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                ))}
            </div>
        </section>
    );
}