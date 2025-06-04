'use client';
import './Revealer.scss';
import { useEffect, useState } from 'react';

export default function Revealer() {
    const [isFirefox, setIsFirefox] = useState(false);

    useEffect(() => {
        const isFF = typeof navigator !== 'undefined' &&
            navigator.userAgent.toLowerCase().includes('firefox');
        setIsFirefox(isFF);
    }, []);

    if (isFirefox) return null;

    return <div className="revealer" />;
}