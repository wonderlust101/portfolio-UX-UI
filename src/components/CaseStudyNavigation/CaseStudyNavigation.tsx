"use client";

import { Section } from "@/types/case-study";
import "./CaseStudyNavigation.scss";
import { toKebabCase } from "@/utils/toKebabCase";
import { Fragment, MouseEvent, useEffect, useState } from "react";

type CaseStudyNavigationProps = {
    sections: Section[];
};

export default function CaseStudyNavigation({sections}: CaseStudyNavigationProps) {
    const [activeId, setActiveId] = useState<string>("");

    const handleClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        setActiveId(id);

        const target = document.getElementById(id);
        if (target) {
            target.scrollIntoView({behavior: "smooth", block: "start"});
        }
    };

    useEffect(() => {
        const observerOptions = {
            root      : null,
            rootMargin: "-50% 0px -40% 0px",
            threshold : 0
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
        <nav className="case-study-navigation" aria-labelledby="case-study-nav-heading">
            <h2 className="heading-xs accent-color" id="case-study-nav-heading">
                <span className='sr-only'>Table of</span>
                Contents
            </h2>

            <ul className="case-study-navigation__links" role="list">
                {sections.map((section) => {
                    const id = toKebabCase(section.title);

                    return (
                        <Fragment key={id}>
                            <li className={`case-study-navigation__link ${activeId === id ? "link-active" : ""}`}>
                                <a
                                    href={`#${id}`}
                                    onClick={(e) => handleClick(e, id)}
                                    aria-current={activeId === id ? "location" : undefined}
                                >
                                    {section.title}
                                </a>
                            </li>
                        </Fragment>
                    );
                })}
            </ul>
        </nav>
    );
}