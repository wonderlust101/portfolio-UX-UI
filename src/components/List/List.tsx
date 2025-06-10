"use client";

import { ListItem as ListItemType } from "@/types/case-study";
import { parseHighlightedText } from "@/utils/parseHighlightedText";
import "./List.scss";

type ListItemProps = {
    item: ListItemType;
    index: number;
}

type MetaItemProps = {
    item: ListItemType;
}

type ListProps = {
    items: ListItemType[];
    type: "list"|"meta";
};

function MetaItem({item}: MetaItemProps) {
    return (
        <div className="list__meta">
            <p>{item.header}:</p>
            {Array.isArray(item.text) ? (
                <ul>
                    {item.text.map((item) => (
                        <li key={item}>
                            <p>{item}</p>
                        </li>
                    ))}
                </ul>
            ) : typeof item.text === "string" ? (
                <p>{item.text}</p>
            ) : (
                item.text
            )}
        </div>
    );
}

function ListItem({item, index}: ListItemProps) {

    return (
        <div className="list__item">
            <p className="list__index">0{index + 1}</p>

            <div className="list__item-content">
                {item.bold && <p className="list__item-bold">{item.bold}</p>}

                <p className="accent-color">{item.header}</p>

                {item.text && <p>{parseHighlightedText(item.text)}</p>}
            </div>
        </div>
    );
}

export default function List({items, type}: ListProps) {
    return (
        <ul className="list">
            {items.map((item, index) => (
                <li key={item.header} style={{display: "contents"}}>
                    {type === "meta" ? (
                        <MetaItem item={item}/>
                    ) : (
                        <ListItem item={item} index={index}/>
                    )}

                    {index !== items.length - 1 && (
                        <hr className="list__divider"/>
                    )}
                </li>
            ))}
        </ul>
    );
}