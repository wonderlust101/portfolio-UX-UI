import DesignChange from "../../../../components/DesignChange";
import List from "@/components/List";
import Persona from "@/components/Persona";
import QuoteList from "@/components/QuoteList";
import UserStatement from "@/components/UserStatement";
import VideoPlayer from "@/components/VideoPlayer";
import { ContentBlock } from "@/types/case-study";
import dynamic from "next/dynamic";

const ImageGallery = dynamic(() => import("@/app/[id]/components/CaseStudySection/ImageGallery"), {
    ssr: false
});

const FigmaFrame = dynamic(() => import("@/components/FigmaFrame"), {
    ssr: false,                           // only in the browser
    loading: () => (
        <div className="figma-frame__placeholder">
            Loading preview…v
        </div>
    ),
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
                    case "figma":
                        return <FigmaFrame key={index} figmaLink={content.figmaLink}/>;
                    case "video":
                        return <VideoPlayer key={index} videoLink={content.video}/>;
                    case "feedback":
                        return <DesignChange key={index} change={content.change} num={index + 1}/>;
                    default:
                        return null;
                }
            })}
        </>
    );
}