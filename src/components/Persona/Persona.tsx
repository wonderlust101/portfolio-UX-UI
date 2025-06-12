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
        <section className="persona" role="region" aria-labelledby="persona-heading">
            <div className="persona__top">
                <figure className="persona__image-container">
                    <CldImage
                        className="persona__image"
                        src={personaData.image}
                        alt={`Portrait of ${personaData.name}`}
                        height={600}
                        width={600}
                    />

                    <figcaption className="sr-only">
                        Portrait of {personaData.name}
                    </figcaption>
                </figure>

                <div className="persona__info">
                    <SectionHeader type="block" id="persona-heading">{personaData.name}</SectionHeader>

                    <div>
                        <dl>
                            <div>
                                <dt className="bold">Age:</dt>
                                <dd>{personaData.age}</dd>
                            </div>

                            <div>
                                <dt className="bold">Location:</dt>
                                <dd>{personaData.location}</dd>
                            </div>

                            <div>
                                <dt className="bold">Occupation:</dt>
                                <dd>{personaData.type}</dd>
                            </div>
                        </dl>

                        <p className="persona__quote accent-color">"{personaData.quote}"</p>
                    </div>
                </div>
            </div>

            <div className="persona__bottom">
                <div className="persona__list">
                    <h3 className="black">Goals:</h3>

                    <ul>
                        {personaData.goals.map((goal) => (
                            <li key={goal}>{goal}</li>
                        ))}
                    </ul>
                </div>

                <div className="persona__list">
                    <h3 className="black">Pain Points:</h3>

                    <ul>
                        {personaData.painPoints.map((pain) => (
                            <li key={pain}>{pain}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}