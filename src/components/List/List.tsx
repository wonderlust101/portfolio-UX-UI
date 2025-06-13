"use client";

import ListItem from "@/components/List/ListItem";
import MetaListItem from "@/components/List/MetaListItem";
import { ListItem as ListItemType } from "@/types/case-study";
import "./List.scss";

type ListProps = {
    items: ListItemType[];
    type: "list"|"meta";
    theme?: "light"|"dark";
};


export default function List({items, type, theme}: ListProps) {
    if (type === "meta") {
        return (
            <dl className={`list ${theme === "dark" ? "list--dark" : ""}`}>
                {items.map((item, index) => (
                    <MetaListItem item={item} key={index}/>
                ))}
            </dl>
        );
    }

    return (
        <ol className="list">
            {items.map((item, index) => (
                <ListItem item={item} index={index} key={index}/>
            ))}
        </ol>
    );
}