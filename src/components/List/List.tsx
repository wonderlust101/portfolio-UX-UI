import type { RootState } from "@/app/store";
import { Fragment, type ReactNode } from "react";
import "./List.scss";
import { useSelector } from "react-redux";

type ListItem = {
    header: string;
    content?: string|ReactNode;
    bold?: string;
};

type ListItemProps = {
    item: ListItem;
    index: number;
    theme?: "light"|"dark";
}

type MetaItemProps = {
    item: ListItem;
}

type ListProps = {
    items: ListItem[];
    type: "list"|"meta";
    theme?: "light"|"dark";
};

function MetaItem({item}: MetaItemProps) {
    return (
        <>
            <li className="list__meta">
                <p>{item.header}:</p>
                {Array.isArray(item.content) ? (
                    <ul>
                        {item.content.map((item) => (
                            <li key={item}>
                                <p>{item}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    typeof (item.content) === "string" ? (
                        <p>{item.content}</p>
                    ) : (
                        item.content
                    ))}

            </li>
        </>
    );
}

function ListItem({item, index, theme}: ListItemProps) {
    const color = useSelector((state: RootState) => state.theme.color);

    return (
        <>
            <li className="list__item">
                <p className="list__index">0{index + 1}</p>

                <div className="list__item-content">
                    {item.bold && <p className="list__item-bold">{item.bold}</p>}

                    <p className={`${color}-accent-${theme}`}>{item.header}</p>

                    {item.content && <p>{item.content}</p>}
                </div>
            </li>
        </>
    );
}

export default function List({items, type, theme}: ListProps) {
    return (
        <ul className="list">
            {items.map((item, index) => (
                <Fragment key={item.header}>
                    {type === "meta" ? (
                        <MetaItem item={item}/>
                    ) : (
                        <ListItem item={item} index={index} theme={theme}/>
                    )}
                    {index !== (items.length - 1) && <hr/>}
                </Fragment>
            ))}
        </ul>
    );
}