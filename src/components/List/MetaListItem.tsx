import { ListItem as ListItemType } from "@/types/case-study";
import "./MetaListItem.scss";

type MetaListItemProps = {
    item: ListItemType;
}

export default function MetaListItem({item}: MetaListItemProps) {
    return (
        <div className='meta-list-item'>
            <dt className="meta-list-item__term">{item.header}:</dt>
            <dd className="meta-list-item__definition">
                {Array.isArray(item.text) ? (
                    <ul>
                        {item.text.map((item) => (
                            <li key={item}>
                                <p>{item}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    item.text
                )}
            </dd>
        </div>
    );
}