import ImageWithCaption from "@/app/[id]/components/ImageWithCaption";
import { FeedbackContent } from "@/types/case-study";
import "./DesignFeedback.scss";
import { parseHighlightedText } from "@/utils/parseHighlightedText";

type DesignFeedbackProps = {
    change: FeedbackContent;
    num: number;
}

export default function DesignChange({change, num}: DesignFeedbackProps) {
    const {header, before, after, option } = change;

    if (!after) {
        return (
            <div className="design-feedback">
                <ImageWithCaption image={before.image}/>
                <div
                    className="design-feedback__after"
                    style={option?.reversed ? {order: "-1"} : {}}
                >
                    <h3 className="heading-xs design-feedback__header">{num}. {header}</h3>
                    <p>{parseHighlightedText(before.text)}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="design-feedback">
            <h3 className="heading-xs design-feedback__header">{num}. {header}</h3>

            <div className="design-feedback__compare-grid">
                <ImageWithCaption image={before.image}/>

                <div>
                    <h3 className="heading-xs">Before:</h3>
                    <p className="">{parseHighlightedText(before.text)}</p>
                </div>
            </div>

            <div className="design-feedback__compare-grid">
                <ImageWithCaption image={after.image}/>

                <div>
                    <h3 className="heading-xs">After:</h3>
                    <p className="">{parseHighlightedText(after.text)}</p>
                </div>
            </div>
        </div>
    );
}