import "./Footer.scss";
import type { RootState } from "@/app/store";
import Button from "@/components/Button";
import List from "@/components/List";
import navLinks from "@/data/nav-links.json";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

type FooterProps = {
    theme: "light"|"dark";
}

const contactList = [
    {
        header : "Email",
        content: "sergei.borja0701@gmail.com"
    },
    {
        header : "Phone",
        content: "(780) 886-0023"
    },
    {
        header: "LinkedIn",
        content: (
            <a
                className="link"
                href="https://www.linkedin.com/in/sergei-borja/"
                target="_blank"
                rel="noopener noreferrer"
            >
                sergei-borja
            </a>
        ),
    },
    {
        header: "GitHub",
        content: (
            <a
                className="link"
                href="https://github.com/wonderlust101"
                target="_blank"
                rel="noopener noreferrer"
            >
                @wonderlust101
            </a>
        ),
    }
];

export default function Footer({theme}: FooterProps) {
    const color = useSelector((state: RootState) => state.theme.color);

    return (
        <footer className={`footer footer--${theme} grid-bleed-small`}>
            <div className="footer__grid">
                <div className="footer__left-column">
                    <div className="footer__cta">
                        <p className="footer__cta-text">
                            <span className={`${color}-accent-${theme}`}>// </span>
                            Let’s get in touch
                            <span className={`${color}-accent-${theme}`}>!</span>
                        </p>

                        <div className="footer__buttons">
                            <Button
                                color="accent"
                                theme={theme}
                                size="lg"
                                to="mailto:sergei.borja0701@gmail.com"
                            >
                                Send an Email
                            </Button>

                            <Button
                                color={theme === "dark" ? "white" : "black"}
                                size="lg"
                                to="Sergei Borja - Resume.pdf"
                            >
                                Download Resume
                            </Button>
                        </div>
                    </div>

                    <List items={contactList} type="meta"/>
                </div>

                <div className="footer__right-column">
                    <img className="footer__image" src="images/home/sergei-borja.webp" alt="Sergei Borja"/>

                    <ul className="footer__nav-list">
                        {navLinks.projectLinks.map((link, index) => (
                            <li key={index}>
                                <Link className={`link${theme === "dark" ? " link--dark" : ""}`} to={link.link}>{link.title}</Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="footer__bottom">
                    <hr/>
                    <p className="footer__copyright">@ 2025 Sergei Borja</p>
                </div>
            </div>
        </footer>
    );
}