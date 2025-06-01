"use client";
import './Revealer.scss'

import { useRevealer } from "@/hooks/useRevealer";

export default function Revealer() {
    useRevealer();

    return (
        <div className="revealer"/>
    );
}