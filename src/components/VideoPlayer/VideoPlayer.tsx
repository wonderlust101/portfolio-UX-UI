"use client"

import { useState, useEffect, useRef } from "react";
import { buildNamedTransformUrlVideo } from "@/lib/cloudinary";
import Player from "next-video/player";
import "./VideoPlayer.scss";

type VideoPlayerProps = {
    videoLink: string;
};

type LazyVideoPlayerProps = {
    videoLink: string;
};

export default function LazyVideoPlayer({ videoLink }: LazyVideoPlayerProps) {
    const [visible, setVisible] = useState(false);
    const placeholderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!placeholderRef.current) return;
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    obs.disconnect();
                }
            },
            { rootMargin: "200px" }
        );
        obs.observe(placeholderRef.current);
        return () => obs.disconnect();
    }, []);

    return (
        <div ref={placeholderRef} style={{ minHeight: 200 }}>
            {visible ? (
                <VideoPlayer videoLink={videoLink} />
            ) : (
                <div className="video-loading-placeholder" />
            )}
        </div>
    );
}

function VideoPlayer({videoLink}: VideoPlayerProps) {
    return (
        <div className="video-player">
            <Player
                style={{"--media-accent-color": "var(--theme-color)"}}
                src={buildNamedTransformUrlVideo(videoLink, "mp4_quality")}
            />
        </div>
    );
}