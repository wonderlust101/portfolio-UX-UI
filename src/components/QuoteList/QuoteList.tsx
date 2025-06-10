import './QuoteList.scss'

type QuoteListProps = {
    quotes: string[];
}

export default function QuoteList({quotes}: QuoteListProps) {
    return (
        <ul className="quote-list">
            {quotes.map((quote) => (
                <li key={quote}>
                    <p className='quote'>"{quote}"</p>
                </li>
            ))}
        </ul>
    );
}