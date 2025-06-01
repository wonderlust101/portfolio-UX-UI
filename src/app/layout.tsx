import Footer from "@/components/Footer";
import Header from "@/components/Header";
import type { Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";
import { ReactNode } from "react";
import "@/assets/styles/globals.scss";
import { satoshi } from '@/fonts/Satoshi/satoshi';

export const metadata: Metadata = {
    title: "Sergei Borja | Product Designer & Developer",
    description: "I'm a computer science student in Edmonton, Alberta, passionate about UX/UI and full stack development. I love solving problems, designing clean interfaces, and building things that help people."
};

type RootLayoutProps = {
    children: ReactNode;
}

export default function RootLayout({children}: RootLayoutProps) {
    return (
        <ViewTransitions>
            <html lang="en" className={satoshi.variable}>
            <body>
                <Header/>

                <main>
                    {children}
                </main>

                <Footer/>
            </body>
            </html>
        </ViewTransitions>
    );
}