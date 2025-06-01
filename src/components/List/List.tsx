import { fadeUp, fadeUpLowOpacity, staggerParent } from "@/motion/motionVariants";
import { useThemeStore } from "@/store/useThemeStore";
import { motion } from "motion/react";
import { Fragment, type ReactNode } from "react";
import "./List.scss";

type ListItem = {
    header: string;
    content?: string|ReactNode;
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
        <motion.li className="list__meta" variants={fadeUp}>
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
        </motion.li>
    );
}

function ListItem({item, index}: ListItemProps) {
    const color = useThemeStore((state) => state.color);

    return (
        <motion.li className="list__item" variants={fadeUp}>
            <p className="list__index">0{index + 1}</p>
            <div className="list__item-content">
                {item.bold && <p className="list__item-bold">{item.bold}</p>}
                <p className={`${color}-accent-light bold`}>{item.header}</p>
                {item.content && <p>{item.content}</p>}
            </div>
        </motion.li>
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
                <Fragment key={item.header}>
                    {type === "meta" ? (
                        <MetaItem item={item}/>
                    ) : (
                        <ListItem item={item} index={index}/>
                    )}

                    {index !== items.length - 1 && (
                        <motion.hr className="list__divider" variants={fadeUpLowOpacity}/>
                    )}
                </Fragment>
            ))}
        </motion.ul>
    );
}