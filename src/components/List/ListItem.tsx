import { ListItem as ListItemType } from "@/types/case-study";
import { parseHighlightedText } from "@/utils/parseHighlightedText";
import "./ListItem.scss";

type ListItemProps = {
    item: ListItemType;
    index: number;
}

export default function ListItem({item, index}: ListItemProps) {
    return (
        <li className="list-item">
            <span className="list-item__index" aria-hidden={true}>0{index + 1}</span>

            <div className="list-item__item-content">
                {item.bold && <p className="list-item__item-bold">{item.bold}</p>}

                <p className="accent-color list-item__item-text">{item.header}</p>

                {item.text && <p>{parseHighlightedText(item.text)}</p>}
            </div>
        </li>
    );
}