import DesignChange from "@/components/DesignChange";
import FigmaFrame from "@/components/FigmaFrame";
import List from "@/components/List";
import Persona from "@/components/Persona";
import QuoteList from "@/components/QuoteList";
import UserStatement from "@/components/UserStatement";
import LazyVideoPlayer from "@/components/VideoPlayer";
import ImageGallery from "@/app/[id]/components/CaseStudySection/ImageGallery";
import { ContentBlock } from "@/types/case-study";

type ContentRendererProps = {
    contents?: ContentBlock[];
    slug: string;
};

export default function ContentRenderer({contents, slug}: ContentRendererProps) {
    return (
        <>
            {contents?.map((content, index) => {
                switch (content.type) {
                    case "list":
                        return <List key={index} items={content.items} type="list"/>;
                    case "imagesGallery":
                        return <ImageGallery key={index} imagesGallery={content.imagesGallery} slug={slug}/>;
                    case "persona":
                        return <Persona key={index} personaData={content.persona} slug={slug}/>;
                    case "text":
                        return <p key={index}>{content.text}</p>;
                    case "userStatement":
                        return <UserStatement key={index} statement={content.statement}/>;
                    case "quoteList":
                        return <QuoteList key={index} quotes={content.quotes}/>;
                    case "figma":
                        return <FigmaFrame key={index} figmaLink={content.figmaLink}/>;
                    case "video":
                        return <LazyVideoPlayer key={index} videoLink={content.video}/>;
                    case "feedback":
                        return <DesignChange key={index} change={content.change} num={index + 1} slug={slug}/>;
                    default:
                        return null;
                }
            })}
        </>
    );
}