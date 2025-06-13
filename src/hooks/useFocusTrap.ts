import { useEffect, useRef } from 'react';

export function useFocusTrap(isOpen: boolean) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen || !containerRef.current) return;

        const focusableSelectors = [
            'a[href]',
            'button:not([disabled])',
            'input:not([disabled])',
            'select:not([disabled])',
            'textarea:not([disabled])',
            '[tabindex]:not([tabindex="-1"])'
        ].join(',');

        const elems = Array.from(
            containerRef.current.querySelectorAll<HTMLElement>(focusableSelectors)
        );
        if (!elems.length) return;

        let first = elems[0], last = elems[elems.length - 1];
        // focus first element on open
        first.focus();

        function onKeyDown(e: KeyboardEvent) {
            if (e.key !== 'Tab') return;
            if (e.shiftKey) {
                // SHIFT+TAB on first → jump to last
                if (document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
            } else {
                // TAB on last → jump to first
                if (document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        }

        containerRef.current.addEventListener('keydown', onKeyDown);
        return () => containerRef.current?.removeEventListener('keydown', onKeyDown);
    }, [isOpen]);

    return containerRef;
}