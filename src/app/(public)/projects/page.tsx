import type { Metadata } from "next";
import ProjectsContent from "./_components/ProjectsContent";

export const metadata: Metadata = {
    title: "Projets | Hermann FOMO",
    description:
        "Découvrez les projets réalisés par Hermann FOMO : applications web, mobile et fullstack.",
};

export default function ProjectsPage() {
    return <ProjectsContent />;
}
