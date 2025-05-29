import type { RootState } from "@/app/store";
import { useSelector } from "react-redux";

export function parseHighlightedText(text: string) {
    const color = useSelector((state: RootState) => state.theme.color);
    const parts = text.split(/(\|[^|]+\|)/g);

    return parts.map((part, index) => {
        if (part.startsWith('|') && part.endsWith('|')) {
            const clean = part.slice(1, -1);
            return (
                <span key={index} className={`${color}-accent-light bold`}>
                    {clean}
                </span>
            );
        }
        return <span key={index}>{part}</span>;
    });
}