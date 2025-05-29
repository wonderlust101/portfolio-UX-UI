import List from "@/components/List";
import type { SectionContent } from "@/types/case-study";

type ContentRendererProps = {
    contents: SectionContent[];
    theme: "dark" | "light";
};

export default function ContentRenderer({ contents, theme }: ContentRendererProps) {
    return (
        <>
            {contents.map((content, index) => {
                if (Array.isArray(content)) {
                    return (
                        <List key={index} items={content} type="list" theme={theme}/>
                    );
                } else {
                    return <p key={index}>{content}</p>;
                }
            })}
        </>
    );
}