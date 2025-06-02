"use client";
import type { LenisOptions } from "@studio-freight/lenis";
import { ReactLenis } from "@studio-freight/react-lenis";
import { ReactNode } from "react";

interface SmoothScrollingProps {
    children?: ReactNode;
}

const lenisOptions: LenisOptions = {
    duration: 1.5,
    lerp    : 0.1
};

function SmoothScrolling({children}: SmoothScrollingProps) {
    return (
        <ReactLenis root options={lenisOptions}/>
    );
}

export default SmoothScrolling;