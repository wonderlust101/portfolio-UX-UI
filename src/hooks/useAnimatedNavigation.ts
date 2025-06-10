"use client";
import { useLenis } from "@studio-freight/react-lenis";
import { useTransitionRouter } from "next-view-transitions";
import { usePathname } from "next/navigation";
import type { MouseEvent as ReactMouseEvent } from "react";

export function useAnimatedNavigation() {
    const router = useTransitionRouter();
    const pathname = usePathname();
    const lenis = useLenis();

    const isFirefox =
        typeof navigator !== "undefined" &&
        navigator.userAgent.toLowerCase().includes("firefox");

    function triggerPageTransition() {
        if (lenis) {
            lenis.scrollTo(0, { immediate: true });
        } else {
            window.scrollTo({ top: 0 });
        }

        document.documentElement.animate(
            [
                { clipPath: "polygon(25% 75%, 75% 75%, 75% 75%, 25% 75%)" },
                { clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)" },
            ],
            {
                duration: 2000,
                easing: "cubic-bezier(0.9, 0, 0.1, 1)",
                pseudoElement: "::view-transition-new(root)",
            }
        );
    }

    const handleNavigation =
        (fullPath: string, callback?: () => void) =>
            (e: ReactMouseEvent<HTMLElement>) => {
                if (isFirefox) {
                    if (callback) callback();
                    return;
                }
                e.preventDefault();
                const [pathWithoutHash, hash] = fullPath.split("#");

                if (
                    pathname === pathWithoutHash ||
                    (!pathWithoutHash && pathname === "/")
                ) {
                    if (hash) {
                        const el = document.getElementById(hash);
                        if (el) {
                            lenis?.scrollTo?.(el, { offset: -280 }) || el.scrollIntoView();
                        }
                    }
                    if (callback) callback();
                    return;
                }

                if (callback) callback();

                router.push(pathWithoutHash || "/", {
                    onTransitionReady: () => {
                        triggerPageTransition();

                        if (hash) {
                            setTimeout(() => {
                                const el = document.getElementById(hash);
                                if (el) {
                                    lenis?.scrollTo?.(el, { offset: -280 }) || el.scrollIntoView();
                                }
                            }, 500);
                        }
                    },
                });
            };

    return { handleNavigation };
}