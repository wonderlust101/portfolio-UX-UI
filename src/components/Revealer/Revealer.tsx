'use client';
import './Revealer.scss';
import { useRevealer } from '@/hooks/useRevealer';
import { useEffect, useState } from 'react';

export default function Revealer() {
    const [isFirefox, setIsFirefox] = useState(false);

    // TODO: Remove when useTransitionRouter is supported
    useEffect(() => {
        const isFF = typeof navigator !== 'undefined' &&
            navigator.userAgent.toLowerCase().includes('firefox');
        setIsFirefox(isFF);
    }, []);

    useRevealer();

    if (isFirefox) return null;

    return <div className="revealer" />;
}