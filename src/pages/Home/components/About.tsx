import List from "@/components/List";
import Section from "@/components/Section";
import "./About.scss";
import type { Metadata } from "@/types/global";

type AboutProps = {
    aboutText: string;
    additionalDetails: Metadata[];
}

export default function About({aboutText, additionalDetails}: AboutProps) {
    return (
        <Section theme="dark" header="About Me" id="about-me">
            <div>
                <hr/>

                <div className="about__split">
                    <div className="about__content">
                        <p>{aboutText}</p>

                        <List items={additionalDetails} type="meta"/>
                    </div>

                    <img src="images/home/sergei-borja.webp" alt="Sergei Borja"/>
                </div>
            </div>
        </Section>
    );
}