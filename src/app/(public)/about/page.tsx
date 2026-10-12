import type { Metadata } from "next";
import AboutContent from "./_components/AboutContent";

export const metadata: Metadata = {
    title: "À propos | Hermann FOMO",
    description:
        "Parcours, expériences et compétences d'Hermann FOMO, développeur frontend basé à Douala, Cameroun.",
};

export default function AboutPage() {
    return <AboutContent />;
}
