import ContactList from "@/components/ContactList";
import { useAnimatedNavigation } from "@/hooks/useAnimatedNavigation";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import Link from "next/link";
import "./HeaderOverlay.scss";

type HeaderOverlayProps = {
    toggleMenu: () => void;
}

type HeaderLinkProps = {
    link: {
        page: string;
        link: string;
    };
    toggleMenu: () => void;
}

const navLinks = [
    {
        page: "Home",
        link: "/"
    },
    {
        page: "Selected Works",
        link: "/#selected-works"
    },
    {
        page: "Skills and Tools",
        link: "/#skills-and-tools"
    },
    {
        page: "About Me",
        link: "/#about-me"
    }
];


export default function HeaderOverlay({toggleMenu}: HeaderOverlayProps) {
    const overlayRef = useFocusTrap(true);

    return (
        <div
            ref={overlayRef}
            className="header-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Main Menu"
            tabIndex={-1}
            onKeyDown={(e) => {
                if (e.key === "Escape") {
                    e.preventDefault();
                    toggleMenu();
                }
            }}
        >
            <div className="header-overlay__copy">
                <div className="header-overlay__contact">
                    <div className="header-overlay__info">
                        <ContactList/>
                    </div>
                </div>

                <nav className="header-overlay__links">
                    {navLinks.map((link, index) => (
                        link.link && (
                            <HeaderLink link={link} toggleMenu={toggleMenu} key={index}/>
                        )
                    ))}
                </nav>
            </div>
        </div>
    );
}

function HeaderLink({link, toggleMenu}: HeaderLinkProps) {
    const {handleNavigation} = useAnimatedNavigation();

    return (
        <div key={link.page} className="header-overlay__link-item">
            <div className="header-overlay__link-item-holder">
                <Link
                    className="header-overlay__link"
                    href={link.link}
                    onClick={handleNavigation(link.link, toggleMenu)}
                    aria-label={`Go to ${link.page} page`}
                >
                    {link.page}
                </Link>
            </div>
        </div>
    );
}