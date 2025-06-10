import { buildNamedTransformUrlVideo } from "@/lib/cloudinary";
import Player from "next-video/player";
import "./VideoPlayer.scss";

type VideoPlayerProps = {
    videoLink: string;
};

export default function VideoPlayer({videoLink}: VideoPlayerProps) {
    return (
        <div className="video-player">
            <Player
                style={{"--media-accent-color": "var(--theme-color)"}}
                src={buildNamedTransformUrlVideo(videoLink, "mp4_quality")}
            />
        </div>
    );
}