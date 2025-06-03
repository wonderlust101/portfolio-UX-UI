"use client";

import Button from "@/components/Button";
import Revealer from "@/components/Revealer";
import { useEffect } from "react";
import "./status-pages.scss";

type ErrorProps = {
    error: Error;
    reset: () => void;
};

export default function Error({error, reset}: ErrorProps) {
    useEffect(() => {
        console.error("Error boundary caught:", error);
    }, [error]);

    return (
        <>
            <Revealer/>

            <div className="status-page grid-bleed-small" id="error">
                <h2 className="status-page__header">An error occurred!</h2>

                <div className="status-page__options">
                    <p>{error.message}</p>
                    {/*<p>{error.stack}</p>*/}

                    <div className="status-page__button-row">
                        <Button
                            color="accent"
                            theme="light"
                            size="lg"
                            onClick={() => reset()}
                        >
                            Try again
                        </Button>

                        <Button color="black" size="lg" href="/">
                            Return to Home
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}