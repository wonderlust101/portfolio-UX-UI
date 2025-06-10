"use client";

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
        <section className="grid-bleed" id='intro'>
            <div className="project-summary">
                <div className="project-summary__content">
                    <div className='project-summary__intro'>
                        <SectionHeader type='page'>Introduction</SectionHeader>
                        <p>{parseHighlightedText(details.description)}</p>
                    </div>

                    <div className="project-summary__role">
                        <SectionHeader type='subsection'>Role</SectionHeader>
                        <p>{parseHighlightedText(details.role)}</p>
                    </div>
                </div>

                <div className="project-summary__metatags">
                    <List items={details.details} type="meta"/>
                </div>
            </div>
        </section>
    );
}