"use client";

import { Section } from "@/types/case-study";
import "./CaseStudyNavigation.scss";
import { toKebabCase } from "@/utils/toSnakeCase";
import { useLenis } from "@studio-freight/react-lenis";
import { Fragment, MouseEvent, useState, useEffect } from "react";

type CaseStudyNavigationProps = {
    sections: Section[];
};

export default function CaseStudyNavigation({ sections }: CaseStudyNavigationProps) {
    const lenis = useLenis();
    const [activeId, setActiveId] = useState<string>("");

    const handleClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        setActiveId(id);

        const target = document.getElementById(id);
        if (target && lenis) {
            lenis.scrollTo(target, { offset: -160, duration: 2 });
        }
    };

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "-50% 0px -40% 0px",
            threshold: 0,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveId(entry.target.id);
                }
            });
        }, observerOptions);

        const sectionElements = [
            document.getElementById("intro"),
            ...sections.map((section) =>
                document.getElementById(toKebabCase(section.title))
            ),
            document.getElementById("other-works")
        ];

        sectionElements.forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => {
            sectionElements.forEach((el) => {
                if (el) observer.unobserve(el);
            });
        };
    }, [sections]);


    return (
        <section className="case-study-navigation">
            <h2 className="heading-xs">
                <span className="accent-color">// </span>
                Contents
                <span className="accent-color">.</span>
            </h2>

            <ul className="case-study-navigation__links">
                {sections.map((section, index) => {
                    const id = toKebabCase(section.title);

                    return (
                        <Fragment key={id}>
                            <li
                                className={`case-study-navigation__link ${
                                    activeId === id ? "link-active" : ""
                                }`}
                            >
                                <a href={`#${id}`} onClick={(e) => handleClick(e, id)}>
                                    {section.title}
                                </a>
                            </li>

                            {index !== sections.length - 1 && <hr />}
                        </Fragment>
                    );
                })}
            </ul>

        </section>
    );
}