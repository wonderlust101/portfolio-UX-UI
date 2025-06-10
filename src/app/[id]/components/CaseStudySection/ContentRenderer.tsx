import dynamic from "next/dynamic";
import List from "@/components/List";
import Persona from "@/components/Persona";
import QuoteList from "@/components/QuoteList";
import UserStatement from "@/components/UserStatement";
import { ContentBlock } from "@/types/case-study";

const ImageGallery = dynamic(() => import("@/app/[id]/components/CaseStudySection/ImageGallery"), {
    ssr: false,
});

type ContentRendererProps = {
    contents?: ContentBlock[];
};

export default function ContentRenderer({contents}: ContentRendererProps) {
    return (
        <>
            {contents?.map((content, index) => {
                switch (content.type) {
                    case "list":
                        return <List key={index} items={content.items} type="list"/>;
                    case "imagesGallery":
                        return <ImageGallery key={index} imagesGallery={content.imagesGallery}/>;
                    case "persona":
                        return <Persona key={index} personaData={content.persona}/>;
                    case "text":
                        return <p key={index}>{content.text}</p>;
                    case "userStatement":
                        return <UserStatement key={index} statement={content.statement}/>;
                    case "quoteList":
                        return <QuoteList key={index} quotes={content.quotes}/>;
                    default:
                        return null;
                }
            })}
        </>
    );
}