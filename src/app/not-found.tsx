"use client";

import Button from "@/components/Button";
import Revealer from "@/components/Revealer";
import "./status-pages.scss";

export default function NotFound() {
    return (
        <>
            <Revealer/>

            <section className="status-page grid-bleed-small" id="not-found">
                <h2 className="status-page__header">Page Not Found!</h2>

                <div className="status-page__options">
                    <p className="status-page__mesage">
                        Oops! Looks like the page you’re looking for doesn’t exist.
                    </p>

                    <Button color="accent" size="lg" href="/">
                        Go to Homepage
                    </Button>
                </div>
            </section>
        </>
    );
}