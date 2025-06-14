import './ContactLink.scss'
import { MouseEventHandler } from "react";

type ContactTuple = [string, string, string|null, string, string?];

type ContactLinkType = {
    data: ContactTuple;
    onCopy: (text: string) => MouseEventHandler<HTMLButtonElement>;
}

export default function ContactLink({data, onCopy}: ContactLinkType) {
    return (
        <div className="contact-link">
            <button className="contact-link__copy-link" onClick={onCopy(data[1])} aria-label={data[3]}>
                <img src="/images/icons/copy.svg" alt=""/>
            </button>

            <a
                className="link link--contact"
                href={data[2] || data[1]}
                {...(!data[2] && {target: "_blank", rel: "noopener noreferrer"})}
            >
                {data[4] || data[1]}
            </a>
        </div>);
};