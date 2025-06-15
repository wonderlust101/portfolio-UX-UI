import SectionHeader from "@/components/SectionHeader";
import type { Persona } from "@/types/case-study";
import "./Persona.scss";
import { getBlurDataURL } from "@/utils/getBlurDataURL";
import Image from "next/image";

type PersonaProps = {
    personaData: Persona;
    slug: string;
}

export default async function Persona({personaData, slug}: PersonaProps) {
    const imgSrc = `${process.env.NEXT_PUBLIC_R2_BUCKET_URL}/${slug}/${personaData.image}.webp`;
    const blurDataURL = await getBlurDataURL(imgSrc);

    return (
        <section className="persona" aria-labelledby="persona-heading">
            <div className="persona__top">
                <figure className="persona__image-container">
                    <Image
                        className="persona__image"
                        src={imgSrc}
                        alt={`Portrait of ${personaData.name}`}
                        fill
                        sizes="(max-width: 80rem) 100vw,(max-width: 48rem) 640px,800px"
                        placeholder={blurDataURL ? "blur" : "empty"}
                        blurDataURL={blurDataURL}
                        quality={75}
                    />
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