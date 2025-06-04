"use client"

import { useEffect, useState } from "react";
import { ReactLenis } from "@studio-freight/react-lenis";
import type { LenisOptions } from "@studio-freight/lenis";

const lenisOptions: LenisOptions = {
    duration: 1.5,
    lerp: 0.09
};

function SmoothScrolling() {
    const [enableLenis, setEnableLenis] = useState(true);

    useEffect(() => {
        const handleMouseDown = (e: MouseEvent) => {
            if (e.button === 1) {
                setEnableLenis(false);
            }
        };

        const handleMouseUp = (e: MouseEvent) => {
            if (e.button === 1) {
                setEnableLenis(true);
            }
        };

        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, []);

    return enableLenis ? <ReactLenis root options={lenisOptions} /> : null;
}

export default SmoothScrolling;