import ImageWithCaption from "@/app/[id]/components/ImageWithCaption";
import { FeedbackContent } from "@/types/case-study";
import "./DesignChange.scss";
import { parseHighlightedText } from "@/utils/parseHighlightedText";

type DesignFeedbackProps = {
    change: FeedbackContent;
    num: number;
}

export default function DesignChange({change, num}: DesignFeedbackProps) {
    const {header, before, after, option} = change;

    if (!after) {
        return (
            <div className="design-change">
                <ImageWithCaption image={before.image} alt={before.alt}/>
                <div className={`design-change__after ${option?.reversed ? "reversed" : ""}`}>
                    <h3 className="heading-xs design-change__header">{num}. {header}</h3>
                    <p>{parseHighlightedText(before.text)}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="design-change">
            <h3 className="design-change__header">{num}. {header}</h3>

            <div className="design-change__compare-grid">
                <ImageWithCaption image={before.image} alt={before.alt}/>

                <div role="group" aria-labelledby={`change-${num}-before-label`}>
                    <p id={`change-${num}-before-label`} className="sr-only">Before:</p>
                    <p aria-hidden={true} className="black">Before:</p>
                    <p className="">{parseHighlightedText(before.text)}</p>
                </div>
            </div>

            <div className="design-change__compare-grid">
                <ImageWithCaption image={after.image} alt={after.alt}/>

                <div role="group" aria-labelledby={`change-${num}-after-label`}>
                    <p id={`change-${num}-after-label`} className="sr-only">After:</p>
                    <p aria-hidden={true} className="black">After:</p>
                    <p className="">{parseHighlightedText(after.text)}</p>
                </div>
            </div>
        </div>
    );
}