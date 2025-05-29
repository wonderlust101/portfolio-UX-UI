import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollHandler() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (hash) {
                const id = hash.replace("#", "");
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView();
                    return;
                }
            }

            // Default scroll to top
            window.scrollTo({ top: 0 });
        });

        return () => clearTimeout(timeout);
    }, [pathname, hash]);

    return null;
}