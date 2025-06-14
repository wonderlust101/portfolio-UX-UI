import './CursorPopup.scss';
import { ReactNode } from "react";

type PopupState = {
    show: boolean;
    x: number;
    y: number;
    fading: boolean;
};

type CursorPopupProps = {
    popup: PopupState;
    children?: ReactNode;
};

export default function CursorPopup({ popup, children = "Copied!" }: CursorPopupProps) {
    return (
        <div
            className={`cursor-popup ${popup.fading ? 'cursor-popup--fade-out' : 'cursor-popup--fade-in'}`}
            style={{
                left: popup.x,
                top: popup.y,
            }}
        >
            {children}
        </div>
    );
}