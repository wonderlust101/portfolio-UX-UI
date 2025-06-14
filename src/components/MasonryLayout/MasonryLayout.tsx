"use client";

import dynamic from "next/dynamic";
import { CSSProperties, ReactNode, useEffect, useState } from "react";

const Masonry = dynamic(() => import("react-layout-masonry"), {
    ssr: false
});

type MasonryLayoutProps = {
    children: ReactNode;
    columns: number;
    tabletColumns: number;
    fallbackClassName: string;
    fallbackStyle: CSSProperties;
}

export default function MasonryLayout({children, columns, tabletColumns, fallbackClassName, fallbackStyle}: MasonryLayoutProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return (
            <div className={fallbackClassName} style={fallbackStyle}>
                {children}
            </div>
        );
    }

    return (
        <Masonry
            className="image-gallery"
            columns={{768: tabletColumns, 1184: columns}}
            gap={8}
        >
            {children}
        </Masonry>
    );
}