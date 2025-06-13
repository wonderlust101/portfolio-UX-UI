"use client";

import "./FigmaFrame.scss";

type Props = {figmaLink: string};

export default function FigmaFrame({figmaLink}: Props) {

    return (
        <div className="figma-frame" role="region" aria-labelledby="figma-frame-label">
            <p id="figma-frame-label" className="sr-only">
                Figma design preview
            </p>

            <iframe
                className="figma-frame__iframe"
                src={figmaLink}
                loading="lazy"
                allowFullScreen
                title="Figma design preview"
                tabIndex={-1}
                aria-hidden={true}
            />
        </div>
    );
}