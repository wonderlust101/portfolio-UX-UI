"use client";

import { fadeUp, fadeUpLowOpacity, staggerParent } from "@/motion/motionVariants";
import { useThemeStore } from "@/store/useThemeStore";
import { motion } from "motion/react";
import { type ReactNode } from "react";
import "./List.scss";

export type ListItem = {
    header?: string | undefined;
    content?: string | ReactNode;
    bold?: string;
};

type ListItemProps = {
    item: ListItem;
    index: number;
}

type MetaItemProps = {
    item: ListItem;
}

type ListProps = {
    items: ListItem[];
    type: "list"|"meta";
};

function MetaItem({item}: MetaItemProps) {
    return (
        <motion.div className="list__meta" variants={fadeUp}>
            <p>{item.header}:</p>
            {Array.isArray(item.content) ? (
                <ul>
                    {item.content.map((item) => (
                        <li key={item}>
                            <p>{item}</p>
                        </li>
                    ))}
                </ul>
            ) : typeof item.content === "string" ? (
                <p>{item.content}</p>
            ) : (
                item.content
            )}
        </motion.div>
    );
}

function ListItem({item, index}: ListItemProps) {
    const color = useThemeStore((state) => state.color);

    return (
        <motion.div className="list__item" variants={fadeUp}>
            <p className="list__index">0{index + 1}</p>
            <div className="list__item-content">
                {item.bold && <p className="list__item-bold">{item.bold}</p>}
                <p className={`${color}-accent-light bold`}>{item.header}</p>
                {item.content && <p>{item.content}</p>}
            </div>
        </motion.div>
    );
}

export default function List({items, type}: ListProps) {
    return (
        <motion.ul
            className="list"
            variants={staggerParent}
            initial="hidden"
            whileInView="visible"
            viewport={{once: true}}
        >
            {items.map((item, index) => (
                <li key={item.header} style={{display: "contents"}}>
                    {type === "meta" ? (
                        <MetaItem item={item}/>
                    ) : (
                        <ListItem item={item} index={index}/>
                    )}

                    {index !== items.length - 1 && (
                        <motion.hr className="list__divider" variants={fadeUpLowOpacity}/>
                    )}
                </li>
            ))}
        </motion.ul>
    );
}