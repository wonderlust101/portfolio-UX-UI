"use client";

import { useThemeStore } from "@/store/useThemeStore";
import { useRef, ReactNode } from "react";
import { motion, useScroll } from "motion/react";
import './ScrollTracker.scss'

type ScrollTrackerProps = {
    children: ReactNode;
};

export default function ScrollTracker({ children }: ScrollTrackerProps) {
    const color = useThemeStore((state) => state.color);
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    console.log(color)

    return (
        <>
            <motion.div
                className={`scroll-tracker__bar ${color}-accent-background`}
                style={{scaleX: scrollYProgress as unknown as number, }}
            />

            <div ref={containerRef}>
                {children}
            </div>
        </>
    );
}