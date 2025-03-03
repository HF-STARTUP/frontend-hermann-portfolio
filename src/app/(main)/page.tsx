"use client";

import React from "react";
import Hero from "@/app/(main)/home/_components/Hero";
import FlotManagement from "@/app/(main)/home/_components/FlotManagement";
import Fonctionnalities from "@/app/(main)/home/_components/Fonctionnalities";
import Platform from "@/app/(main)/home/_components/Platform";
import PlusValues from "@/app/(main)/home/_components/PlusValues";
import OurClient from "@/app/(main)/home/_components/OurClient";


export default function Home() {
    return (
        <div>
            <Hero/>
            <FlotManagement />
            <Fonctionnalities />
            <Platform />
            <PlusValues />
            <OurClient />
        </div>
    )
}

