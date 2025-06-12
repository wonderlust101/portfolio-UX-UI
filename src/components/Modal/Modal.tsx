import { ReactNode } from "react";
import "./Modal.scss";

type ModalProps = {
    onClose?: () => void;
    children: ReactNode;
};

export default function Modal({onClose, children}: ModalProps) {
    return (
        <div
            className="modal__backdrop"
            onClick={onClose}
            aria-hidden="true"
        >
            <div
                className="modal__container"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-heading"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
}