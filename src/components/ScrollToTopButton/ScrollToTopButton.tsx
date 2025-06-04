"use client";

import { useLenis } from "@studio-freight/react-lenis";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ArrowSVG from "@/components/Icons/ArrowSVG";
import "./ScrollToTopButton.scss";

export default function ScrollToTopButton() {
    const lenis = useLenis();
    const [show, setShow] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShow(window.scrollY > window.innerHeight * 0.5);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleClick = () => {
        if (lenis) {
            lenis.scrollTo(0, { offset: 0, duration: 2 });
        }
    };

    return (
        <motion.button
            onClick={handleClick}
            className="scroll-to-top-button"
            initial={{ opacity: 0, y: 128 }}
            animate={show ? { opacity: 0.7, y: 0 } : { opacity: 0, y: 128 }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 60,
                bounce: 0
            }}
            whileHover={{
                opacity: 1,
                scale: 1.05,
                transition: { duration: 0.15, ease: "easeOut" },
            }}
            aria-label="Scroll back to top"
        >
            <ArrowSVG className="scroll-to-top-button__arrow" />
            <p className="scroll-to-top-button__text">Back to Top</p>
        </motion.button>
    );
}