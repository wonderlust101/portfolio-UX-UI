"use client";

import Button from "@/components/Button";
import List from "@/components/List";
import SectionHeader from "@/components/SectionHeader";
import type { ProjectSummary } from "@/types/case-study";
import { parseHighlightedText } from "@/utils/parseHighlightedText";
import "./ProjectSummary.scss";

type ProjectSummaryProps = {
    details: ProjectSummary;
}

export default function ProjectSummary({details}: ProjectSummaryProps) {
    return (

        <section className="project-summary" id="intro" role="region" aria-labelledby="intro-heading">
            <div className="project-summary__left-column">
                <div className="project-summary__content">
                    <div className="project-summary__intro">
                        <SectionHeader type="section" id="intro-heading">Introduction</SectionHeader>
                        <p>{parseHighlightedText(details.description)}</p>
                    </div>

                    <div className="project-summary__role">
                        <SectionHeader type="subsection">Role</SectionHeader>
                        <p>{parseHighlightedText(details.role)}</p>
                    </div>
                </div>

                {details.links &&
                    <div className="project-summary__links">
                        <div className="project-summary__button-row">
                            {details.links.map(link => (
                                <Button
                                    key={link.href}
                                    color={link.siteName}
                                    size="md"
                                    external
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`${link.label} (opens in a new tab)`}
                                >
                                    {link.label}
                                </Button>
                            ))}
                        </div>
                    </div>
                }
            </div>

            <div className="project-summary__metatags">
                <List items={details.details} type="meta"/>
            </div>
        </section>
    );
}