import { useLayoutEffect, useState, useRef } from 'react';

export function useWindowScrollFixed() {
    const frame = useRef(0);
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const handleScroll = () => {
        cancelAnimationFrame(frame.current);
        frame.current = requestAnimationFrame(() => {
            setPos({ x: window.scrollX, y: window.scrollY });
        });
    };

    useLayoutEffect(() => {
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return pos;
}