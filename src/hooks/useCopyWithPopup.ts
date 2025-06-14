import { useCallback, useRef, useState } from "react";

export default function useCopyWithPopup() {
    const [popup, setPopup] = useState({show: false, x: 0, y: 0, fading: false});
    const timeoutRef = useRef<NodeJS.Timeout>(undefined);
    const fadeTimeoutRef = useRef<NodeJS.Timeout>(undefined);
    const mouseFollowRef = useRef<((e: MouseEvent) => void)|null>(null);

    const copy = useCallback( (text: string) => (e: React.MouseEvent) => {
        [timeoutRef, fadeTimeoutRef].forEach(ref => ref.current && clearTimeout(ref.current));
        mouseFollowRef.current && window.removeEventListener("mousemove", mouseFollowRef.current);

        navigator.clipboard.writeText(text).catch(console.error);
        const offset = 12;
        setPopup({show: true, x: e.clientX + offset, y: e.clientY + offset, fading: false});

        mouseFollowRef.current = (ev: MouseEvent) =>
            setPopup(prev => ({...prev, x: ev.clientX + offset, y: ev.clientY + offset}));
        window.addEventListener("mousemove", mouseFollowRef.current);

        timeoutRef.current = setTimeout(() => {
            setPopup(prev => ({...prev, fading: true}));
            fadeTimeoutRef.current = setTimeout(() => {
                mouseFollowRef.current && window.removeEventListener("mousemove", mouseFollowRef.current);
                mouseFollowRef.current = null;
                setPopup({show: false, x: 0, y: 0, fading: false});
            }, 300);
        }, 1000);
    }, []);

    return {copy, popup};
}