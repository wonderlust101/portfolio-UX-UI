import CloseMenuIcon from "@/assets/images/close-menu-dark.svg";
import Image from "next/image";
import { ReactNode, useEffect, useRef } from "react";
import "./Modal.scss";

type ModalProps = {
    onClose: () => void;
    children: ReactNode;
    title?: string;
};

export default function Modal({onClose, title, children}: ModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    const previouslyFocusedElement = useRef<HTMLElement|null>(null);

    useEffect(() => {
        // Save and restore focus
        previouslyFocusedElement.current = document.activeElement as HTMLElement;
        modalRef.current?.focus();

        // Trap focus and handle Escape
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                e.stopPropagation();
                onClose();
            }
            if (e.key === "Tab") {
                const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
                    "a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex=\"-1\"])"
                );
                if (!focusable || focusable.length === 0) return;
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                } else if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
            previouslyFocusedElement.current?.focus();
        };
    }, [onClose]);

    return (
        <div className="modal__backdrop" onClick={onClose} aria-hidden="true">
            <section
                className="modal__container"
                ref={modalRef}
                tabIndex={-1}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-heading"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal__header">
                    <h2 id="modal-heading">{title}</h2>

                    <button className="modal__close-button" onClick={onClose} aria-label="Close modal">
                        <Image src={CloseMenuIcon} alt="" aria-hidden={true}/>
                    </button>
                </div>

                <div className="modal__content">{children}</div>
            </section>
        </div>
    );
}