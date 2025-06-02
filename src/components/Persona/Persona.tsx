"use client"

import { useThemeStore } from "@/store/useThemeStore";
import type { Persona as PersonaType } from "@/types/case-study";
import "./Persona.scss";
import Image from "next/image";

type PersonaProps = {
    personaData: PersonaType;
}

export default function Persona({personaData}: PersonaProps) {
    const color = useThemeStore((state) => state.color);

    console.log(personaData.image);

    return (
        <section className="persona">
            <div className="persona__top">
                <div className="persona__image-container">
                    <h4 className="heading-xs">{personaData.name}</h4>

                    <Image
                        className="persona__image"
                        src={personaData?.image}
                        alt={`${personaData.name}`}
                        height={1600}
                        width={1600}
                    />
                </div>

                <div className="persona__info">
                    <ul>
                        <li><p><span className="bold">Age: </span>{personaData.age}</p></li>
                        <li><p><span className="bold">Location: </span>{personaData.location}</p></li>
                        <li><p><span className="bold">Type: </span>{personaData.type}</p></li>
                    </ul>
                    <p className={`persona__quote ${color}-accent-light`}>"{personaData.quote}"</p>
                </div>
            </div>

            <div className="persona__bottom">
                <div className="persona__list">
                    <p className="bold">Goals:</p>

                    <ul>
                        {personaData.goals.map(goal => (
                            <li key={goal}>
                                <p>{goal}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="persona__list">
                    <p className="bold">Pain Points:</p>

                    <ul>
                        {personaData.painPoints.map(pain => (
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