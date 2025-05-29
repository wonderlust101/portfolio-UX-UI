import "./Hero.scss";
import Button from "@/components/Button";
import Marquee from "react-fast-marquee";

type HeroProps = {
    tagLine: string;
}

export default function Hero({tagLine}: HeroProps) {
    return (
        <section className="hero grid-bleed-small">
            <h1 className="heading-xl">Sergei Borja</h1>

            <div className="hero__body">
                <div className="hero__cta">
                    <p>
                        {tagLine}
                    </p>

                    <Button
                        color="accent"
                        theme="light"
                        size="lg"
                        to="mailto:sergei.borja0701@gmail.com"
                    >
                        Contact Me</Button>
                </div>

                <img className="hero__image" src='images/home/sergei-borja.webp' alt="Sergei Borja"/>
            </div>

            <Marquee className="hero__scrolling-text-container">
                <p className="hero__scrolling-text">
                    <span>UX & UI Designer</span>
                    <span>Full Stack Developer</span>
                    <span>UX & UI Designer</span>
                    <span>Full Stack Developer</span>
                </p>
            </Marquee>
        </section>
    );
}