"use client";

import ContactLink from "@/components/ContactList/ContactLink";
import CursorPopup from "@/components/CursorPopup";
import List from "@/components/List";
import useCopyWithPopup from "@/hooks/useCopyWithPopup";
import { ListItem } from "@/types/case-study";
import { useMemo } from "react";
import { createPortal } from "react-dom";

// Define the contact tuple type
type ContactTuple = [string, string, string|null, string, string?];

const contacts: ContactTuple[] = [
    ["Email", "sergei.borja0701@gmail.com", "mailto:sergei.borja0701@gmail.com", "Copy email address"],
    ["Phone", "(780) 886-0023", "tel:+17808860023", "Copy phone number"],
    ["LinkedIn", "https://www.linkedin.com/in/sergei-borja/", null, "Copy LinkedIn URL", "sergei-borja"],
    ["GitHub", "https://github.com/wonderlust101", null, "Copy GitHub URL", "@wonderlust101"]
] as const;

export default function ContactList() {
    const {copy, popup} = useCopyWithPopup();

    const contactList: ListItem[] = useMemo(() =>
        contacts.map(contact => ({
            header: contact[0],
            text: <ContactLink data={contact} onCopy={copy}/>
        })), [copy]
    );

    return (
        <>
            <List items={contactList} type="meta" theme="dark"/>

            {popup.show && createPortal(
                <CursorPopup popup={popup}/>,
                document.body
            )}
        </>
    );
}