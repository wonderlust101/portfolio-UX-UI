"use client";

import SectionHeader from "@/components/SectionHeader";
import type { Persona } from "@/types/case-study";
import "./Persona.scss";
import { CldImage } from "next-cloudinary";

type PersonaProps = {
    personaData: Persona;
}

export default function Persona({personaData}: PersonaProps) {

    return (
        <section className="persona">
            <div className="persona__top">
                <div className="persona__image-container">
                    <CldImage
                        className="persona__image"
                        src={personaData.image}
                        alt={`${personaData.name}`}
                        height={600}
                        width={600}
                    />
                </div>

                <div className="persona__info">
                    <SectionHeader type="block">{personaData.name}</SectionHeader>

                    <div>
                        <ul>
                            <li><p><span className="bold">Age: </span>{personaData.age}</p></li>
                            <li><p><span className="bold">Location: </span>{personaData.location}</p></li>
                            <li><p><span className="bold">Occupation: </span>{personaData.type}</p></li>
                        </ul>
                        <p className="persona__quote accent-color">"{personaData.quote}"</p>
                    </div>
                </div>
            </div>

            <hr/>

            <div className="persona__bottom">
                <div className="persona__list">
                    <p className="bold">Goals:</p>
                    <ul>
                        {personaData.goals.map((goal) => (
                            <li key={goal}>
                                <p>{goal}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="persona__list">
                    <p className="bold">Pain Points:</p>
                    <ul>
                        {personaData.painPoints.map((pain) => (
                            <li key={pain}>
                                <p>{pain}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}