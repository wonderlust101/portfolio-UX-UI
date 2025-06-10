export function parseHighlightedText(text: any) {
    if (typeof text !== 'string') {
        return text;
    }

    const parts = text.split(/(\|[^|]+\|)/g);

    return parts.map((part, index) => {
        if (part.startsWith('|') && part.endsWith('|')) {
            const clean = part.slice(1, -1);
            return (
                <span className='accent-color bold' key={index}>
                    {clean}
                </span>
            );
        }
        return <span key={index}>{part}</span>;
    });
}