
export function parseHighlightedText(text: string) {
    const parts = text.split(/(\|[^|]+\|)/g);

    return parts.map((part, index) => {
        if (part.startsWith('|') && part.endsWith('|')) {
            const clean = part.slice(1, -1);
            return (
                <span key={index}>
                    {clean}
                </span>
            );
        }
        return <span key={index}>{part}</span>;
    });
}