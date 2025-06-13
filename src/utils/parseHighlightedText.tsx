export function parseHighlightedText(text: any) {
    if (typeof text !== 'string') {
        return text;
    }

    const parts = text.split(/(\|[^|]+\|)/g);

    return parts.map((part, index) => {
        if (part.startsWith('|') && part.endsWith('|')) {
            const clean = part.slice(1, -1);
            return (
                <mark className='accent-color medium' key={index}>
                    {clean}
                </mark>
            );
        }
        return <span key={index}>{part}</span>;
    });
}