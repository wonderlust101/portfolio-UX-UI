import List from "@/components/List";
import type { SectionContent } from "@/types/case-study";

type ContentRendererProps = {
    contents: SectionContent[];
};

export default function ContentRenderer({ contents }: ContentRendererProps) {
    return (
        <>
            {contents.map((content, index) => {
                if (Array.isArray(content)) {
                    return (
                        <List key={index} items={content} type="list"/>
                    );
                } else {
                    return <p key={index}>{content}</p>;
                }
            })}
        </>
    );
}