"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll } from "motion/react";
import './ScrollTracker.scss'

type ScrollTrackerProps = {
    children: ReactNode;
};

export default function ScrollTracker({ children }: ScrollTrackerProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    return (
        <>
            <motion.div
                className={`scroll-tracker__bar`}
                style={{scaleX: scrollYProgress as unknown as number, }}
            />

            <div ref={containerRef}>
                {children}
            </div>
        </>
    );
}