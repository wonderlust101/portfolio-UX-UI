"use client";

import { usePathname } from "next/navigation";
import { useTransitionRouter } from "next-view-transitions";
import { MouseEvent } from "react";

export function useAnimatedNavigation() {
    const router = useTransitionRouter();
    const pathname = usePathname();

    function triggerPageTransition() {
        window.scrollTo({ top: 0, behavior: "instant" });

        document.documentElement.animate(
            [
                {
                    clipPath: "polygon(25% 75%, 75% 75%, 75% 75%, 25% 75%)",
                },
                {
                    clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
                },
            ],
            {
                duration: 2000,
                easing: "cubic-bezier(0.9, 0, 0.1, 1)",
                pseudoElement: "::view-transition-new(root)",
            }
        );
    }

    const handleNavigation = (path: string, callback?: () => void) => (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();

        if (pathname === path) return;

        if (callback) callback();

        router.push(path, {
            onTransitionReady: triggerPageTransition,
        });
    };

    return { handleNavigation };
}