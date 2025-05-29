import ContentBlock from "@/components/ContentBlock";
import List from "@/components/List";
import Section from "@/components/Section";
import type { ProjectSummary } from "@/types/case-study";
import { parseHighlightedText } from "@/utils/parseHighlightedText";

type ProjectSummaryProps = {
    details: ProjectSummary;
}

export default function ProjectSummary({details}: ProjectSummaryProps) {
    return (
        <Section theme="light" header="Case Study" >
            <ContentBlock header="Project Summary" theme='light'>
                <p>{parseHighlightedText(details.description)}</p>
                <List items={details.metadata} type='meta'/>
            </ContentBlock>
        </Section>
    );
}