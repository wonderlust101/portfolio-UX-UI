import Footer from "@/components/Footer";
import Header from "@/components/Header";

import SmoothScrolling from "@/components/SmoothScrolling";
import { satoshi } from "@/fonts/Satoshi/satoshi";
import type { Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";
import { ReactNode } from "react";
import "@/assets/styles/globals.scss";

export const metadata: Metadata = {
    title       : "Sergei Borja | Product Designer & Developer",
    description : "I'm a computer science student in Edmonton, Alberta, passionate about UX/UI and full stack development. I love solving problems, designing" +
        " clean interfaces, and bu ilding things that help people.",
    keywords    : [
        "Sergei Borja",
        "UX designer",
        "UI developer",
        "product design",
        "portfolio",
        "full stack",
        "front end",
        "back end",
        "case studies"
    ],
    robots      : {
        index : true,
        follow: true
    },
    openGraph   : {
        title      : "Sergei Borja | Full Stack Developer & UX & UI Designer",
        description: "I'm a computer science student in Edmonton, Alberta, passionate about UX/UI and full stack development. I love solving problems, designing" +
            " clean interfaces, and building things that help people.",
        url        : "https://www.sergei-borja.dev",
        siteName   : "Sergei Borja Portfolio",
        images     : [
            {
                url: "/images/home/sergei-borja.webp",
                alt: "Sergei Borja Portfolio Preview"
            }
        ],
        locale     : "en-US",
        type       : "website"
    },
    twitter     : {
        card       : "summary_large_image",
        title      : "Sergei Borja | Product Designer & Developer",
        description: "I'm a computer science student in Edmonton, Alberta, passionate about UX/UI and full stack development. I love solving problems, designing" +
            " clean interfaces, and building things that help people.",
        images     : ["/images/shared/sergei-borja.webp"],
        creator    : "@sergeiborja"
    },
    metadataBase: new URL("https://www.sergei-borja.dev"),
    alternates  : {
        canonical: "https://www.sergei-borja.dev"
    },
    icons       : {
        icon: "/favicon.ico"
    }
};

type RootLayoutProps = {
    children: ReactNode;
}

export default function RootLayout({children}: RootLayoutProps) {
    return (
        <>
            <SmoothScrolling/>

            <ViewTransitions>
                <html lang="en" className={`${satoshi.variable}`}>
                <body>

                    <Header/>

                    <main>
                        {children}
                    </main>

                    <Footer/>
                </body>
                </html>
            </ViewTransitions>
        </>
    );

}