// components/Modal.tsx
"use client";

import Lenis from "@studio-freight/lenis";
import { useLenis } from "@studio-freight/react-lenis";
import { ReactNode, useEffect, useRef } from "react";
import "./Modal.scss";

type ModalProps = {
    onClose?: () => void;
    children: ReactNode;
};

export default function Modal({onClose, children}: ModalProps) {
    const rootLenis = useLenis();
    const containerRef = useRef<HTMLDivElement>(null);
    const modalLenisRef = useRef<Lenis|null>(null);
    const rafIdRef = useRef<number|null>(null);

    useEffect(() => {
        rootLenis?.stop?.();

        if (!modalLenisRef.current && containerRef.current) {
            modalLenisRef.current = new Lenis({
                wrapper : containerRef.current,
                content : containerRef.current,
                duration: 1.5,
                lerp    : 0.09
            });
        }

        const raf = (time: number) => {
            modalLenisRef.current?.raf(time);
            rafIdRef.current = requestAnimationFrame(raf);
        };

        rafIdRef.current = requestAnimationFrame(raf);

        return () => {
            if (rafIdRef.current !== null) {
                cancelAnimationFrame(rafIdRef.current);
                rafIdRef.current = null;
            }

            modalLenisRef.current?.destroy();
            modalLenisRef.current = null;

            rootLenis?.start?.();
        };
    }, [rootLenis]);

    return (
        <div
            className="modal__backdrop"
            onClick={onClose}
        >
            <div
                ref={containerRef}
                className="modal__container"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
}