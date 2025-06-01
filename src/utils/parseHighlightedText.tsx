import { useThemeStore } from "@/store/useThemeStore";

export function parseHighlightedText(text: string) {
    const parts = text.split(/(\|[^|]+\|)/g);
    const color = useThemeStore((state) => state.color);

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