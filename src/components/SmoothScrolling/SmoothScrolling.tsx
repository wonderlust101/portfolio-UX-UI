"use client";
import type { LenisOptions } from "@studio-freight/lenis";
import { ReactLenis } from "@studio-freight/react-lenis";

const lenisOptions: LenisOptions = {
    duration: 1.5,
    lerp    : 0.1
};

function SmoothScrolling() {
    return (
        <ReactLenis root options={lenisOptions}/>
    );
}

export default SmoothScrolling;