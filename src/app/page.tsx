import About from "@/app/home/components/About";
import Hero from "@/app/home/components/Hero";
import Revealer from "@/components/Revealer";
import SkillsList from "@/components/SkillsList";
import ThemeEffect from "@/components/ThemeEffect";
import { ProfileData } from "@/types/home";
import { promises as fs } from "fs";
import { notFound } from "next/navigation";
import path from "path";
import SelectedWorks from "../components/SelectedWorks";
import "@/app/home/Home.scss";

export default async function Home() {
    const filePath = path.join(process.cwd(), "src", "data", `home.json`);

    let homeData: ProfileData;

    try {
        const file = await fs.readFile(filePath, "utf8");
        homeData = JSON.parse(file);
    } catch (err) {
        return notFound();
    }

    return (
        <main className="home">
            <Revealer/>
            <ThemeEffect/>

            <Hero/>

            <div className="grid-bleed home__content">
                <SelectedWorks/>

                <hr className="home__divider"/>

                <SkillsList/>

                <hr className="home__divider"/>

                <About aboutText={homeData}/>
            </div>
        </main>
    );
}