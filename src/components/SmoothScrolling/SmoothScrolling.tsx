"use client"

import { useEffect, useState } from "react";
import { ReactLenis } from "@studio-freight/react-lenis";
import type { LenisOptions } from "@studio-freight/lenis";

const lenisOptions: LenisOptions = {
    duration: 2,
    lerp: 0.075
};

function SmoothScrolling() {
    const [enableLenis, setEnableLenis] = useState(true);

    useEffect(() => {
        const handleMouseDown = (e: MouseEvent) => {
            if (e.button === 1) {
                // Middle mouse button pressed
                setEnableLenis(false);
            }
        };

        const handleMouseUp = (e: MouseEvent) => {
            if (e.button === 1) {
                // Re-enable Lenis when released
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