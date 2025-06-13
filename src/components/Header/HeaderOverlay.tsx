import List from "@/components/List";
import { useAnimatedNavigation } from "@/hooks/useAnimatedNavigation";
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

const contactList = [
    {header: "Email", text: "sergei.borja0701@gmail.com"},
    {header: "Phone", text: "(780) 886-0023"},
    {
        header: "LinkedIn",
        text  : (
            <a
                className="link"
                href="https://www.linkedin.com/in/sergei-borja/"
                target="_blank"
                rel="noopener noreferrer"
            >
                sergei-borja
            </a>
        )
    },
    {
        header: "GitHub",
        text  : (
            <a
                className="link"
                href="https://github.com/wonderlust101"
                target="_blank"
                rel="noopener noreferrer"
            >
                @wonderlust101
            </a>
        )
    }
];

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
    return (
        <div className="header-overlay">
            <div className="header-overlay__copy">
                <div className="header-overlay__contact">
                    <div className="header-overlay__info">
                        <List items={contactList} type="meta" theme="dark"/>
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