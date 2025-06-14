"use client";

import { useParams } from "next/navigation";
import MediaThemeSutro from "player.style/sutro/react";
import { useEffect, useRef, useState } from "react";
import "./VideoPlayer.scss";

type VideoPlayerProps = {
    videoLink: string;
};

type LazyVideoPlayerProps = {
    videoLink: string;
};

export default function LazyVideoPlayer({videoLink}: LazyVideoPlayerProps) {
    const [visible, setVisible] = useState(false);
    const placeholderRef = useRef<HTMLDivElement>(null);

    const params = useParams();
    const slug = params.id as string;
    const videoSrc = `${process.env.NEXT_PUBLIC_R2_BUCKET_URL}/${slug}/${videoLink}.mp4`;

    useEffect(() => {
        if (!placeholderRef.current) return;
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    obs.disconnect();
                }
            },
            {rootMargin: "200px"}
        );
        obs.observe(placeholderRef.current);
        return () => obs.disconnect();
    }, []);

    return (
        <div ref={placeholderRef} style={{minHeight: 200}}>
            {visible ? (
                <VideoPlayer videoLink={videoSrc}/>
            ) : (
                <div className="video-loading-placeholder"/>
            )}
        </div>
    );
}

function VideoPlayer({videoLink}: VideoPlayerProps) {
    return (
        <MediaThemeSutro className="video-player">
            <video slot="media" src={videoLink}>
            </video>
        </MediaThemeSutro>
    );
}