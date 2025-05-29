import type { RootState } from "@/app/store";
import DesktopNavigation from "@/components/Header/DesktopNavigation";
import MobileNavigation from "@/components/Header/MobileNavigation";
import navLinks from '@/data/nav-links.json'
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Header.scss";

export default function Header() {
    const color = useSelector((state: RootState) => state.theme.color);

    return (
        <header className="header grid-bleed-small">
            <div className='header__container'>
                <div className="header__left-side">
                    <Link className="header__logo" to='/'><span className={`${color}-accent-light`}>//</span> SB</Link>
                    <p className="header__tag">[ Full Stack Developer, UX & UI Designer ]</p>
                </div>

                <MobileNavigation navLinks={navLinks.navLinks}/>
                <DesktopNavigation navLinks={navLinks.navLinks}/>
            </div>
        </header>
    );
}