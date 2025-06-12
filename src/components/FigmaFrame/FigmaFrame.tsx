import "./FigmaFrame.scss";

type FigmaFrameProps = {
    figmaLink: string;
}

export default function FigmaFrame({figmaLink}: FigmaFrameProps) {
    return (
        <div className="figma-frame">
            <iframe
                className="figma-frame__iframe"
                src={figmaLink}
                allowFullScreen
                loading="lazy"
                name="figma-frame"
            >
            </iframe>
        </div>
    );
}