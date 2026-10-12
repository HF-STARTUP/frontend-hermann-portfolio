"use client";

import React from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useSiteContentQuery } from "@/hooks/portfolio/usePortfolioQueries";
import { usePatchSiteContent } from "@/hooks/portfolio/useAdminSiteContent";
import ImagePicker from "@/components/admin/ImagePicker";
import type {
    BlogPageContent,
    PagesContent,
    ProjectsPageContent,
} from "@/types/portfolio.type";
import { TextField, FormSubTitle } from "./fields";

/** Onglet À propos & Pages : bio, parcours et en-têtes des pages Projets/Blog */
const PagesForm = () => {
    const { data: siteContent } = useSiteContentQuery();
    const pages = siteContent?.pages;

    /* PATCH /site-content/pages ; erreur toastée par le provider */
    const { patchSection, loading: isSaving } = usePatchSiteContent();
    const { toast } = useToast();

    const [draft, setDraft] = React.useState<PagesContent | undefined>(pages);
    React.useEffect(() => setDraft(pages), [pages]);

    const setAbout = <K extends keyof PagesContent["about"]>(
        key: K,
        value: PagesContent["about"][K]
    ) =>
        setDraft((prev) =>
            prev ? { ...prev, about: { ...prev.about, [key]: value } } : prev
        );

    const setProjects = <K extends keyof ProjectsPageContent>(
        key: K,
        value: ProjectsPageContent[K]
    ) =>
        setDraft((prev) =>
            prev
                ? { ...prev, projects: { ...prev.projects, [key]: value } }
                : prev
        );

    const setBlog = <K extends keyof BlogPageContent>(
        key: K,
        value: BlogPageContent[K]
    ) =>
        setDraft((prev) =>
            prev ? { ...prev, blog: { ...prev.blog, [key]: value } } : prev
        );

    // Un paragraphe de la bio par bloc séparé d'une ligne vide
    const handleBioChange = (value: string) =>
        setAbout(
            "bioParagraphs",
            value.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean)
        );

    const handleSave = async () => {
        if (!draft || isSaving) return;
        try {
            await patchSection("pages", draft);
            toast({ title: "Pages enregistrées" });
        } catch {
            /* erreur déjà toastée par le provider ; le brouillon est conservé */
        }
    };

    if (!draft) return null;

    return (
        <div className="flex flex-col gap-5">
            <FormSubTitle>Page « À propos »</FormSubTitle>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <TextField
                    label="Badge"
                    value={draft.about.badge}
                    onChange={(v) => setAbout("badge", v)}
                />
                <TextField
                    label="Titre (début)"
                    value={draft.about.titlePrefix}
                    onChange={(v) => setAbout("titlePrefix", v)}
                />
                <TextField
                    label="Titre (surligné)"
                    value={draft.about.titleHighlight}
                    onChange={(v) => setAbout("titleHighlight", v)}
                />
            </div>
            <TextField
                label="Description sous le titre"
                textarea
                rows={2}
                value={draft.about.description}
                onChange={(v) => setAbout("description", v)}
            />

            <FormSubTitle>Bio</FormSubTitle>
            <TextField
                label="Titre de la bio"
                value={draft.about.bioTitle}
                onChange={(v) => setAbout("bioTitle", v)}
            />
            <TextField
                label="Paragraphes (séparer par une ligne vide)"
                textarea
                rows={6}
                hint="Chaque bloc séparé par une ligne vide devient un paragraphe."
                value={draft.about.bioParagraphs.join("\n\n")}
                onChange={handleBioChange}
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <TextField
                    label="Bouton CV"
                    value={draft.about.cvCtaLabel}
                    onChange={(v) => setAbout("cvCtaLabel", v)}
                />
                <TextField
                    label="Bouton contact"
                    value={draft.about.contactCtaLabel}
                    onChange={(v) => setAbout("contactCtaLabel", v)}
                />
            </div>

            <FormSubTitle>Parcours</FormSubTitle>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <TextField
                    label="Titre expériences"
                    value={draft.about.experienceTitle}
                    onChange={(v) => setAbout("experienceTitle", v)}
                />
                <TextField
                    label="Titre formation"
                    value={draft.about.educationTitle}
                    onChange={(v) => setAbout("educationTitle", v)}
                />
                <TextField
                    label="Titre certifications"
                    value={draft.about.certificationTitle}
                    onChange={(v) => setAbout("certificationTitle", v)}
                />
                <TextField
                    label="Titre compétences (début)"
                    value={draft.about.skillsTitlePrefix}
                    onChange={(v) => setAbout("skillsTitlePrefix", v)}
                />
                <TextField
                    label="Titre compétences (surligné)"
                    value={draft.about.skillsTitleHighlight}
                    onChange={(v) => setAbout("skillsTitleHighlight", v)}
                />
            </div>

            <FormSubTitle>Photos du profil</FormSubTitle>
            <p className="text-xs text-muted-foreground">
                Deux photos : une pour les grands écrans (1024px et +) et une pour les petits écrans. Si aucune photo n'est définie, l'avatar (initiales) est affiché par défaut.
            </p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <ImagePicker
                    value={draft.about.photoDesktopUrl}
                    onChange={(v) => setAbout("photoDesktopUrl", v)}
                    label="Photo (grands écrans)"
                />
                <ImagePicker
                    value={draft.about.photoMobileUrl}
                    onChange={(v) => setAbout("photoMobileUrl", v)}
                    label="Photo (petits écrans)"
                />
            </div>

            <p className="text-xs text-muted-foreground">
                La gestion des expériences, formations et certifications se fait depuis la section <strong>Parcours</strong> du menu.
            </p>

            <FormSubTitle>Page « Projets »</FormSubTitle>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <TextField
                    label="Badge"
                    value={draft.projects.badge}
                    onChange={(v) => setProjects("badge", v)}
                />
                <TextField
                    label="Titre (début)"
                    value={draft.projects.titlePrefix}
                    onChange={(v) => setProjects("titlePrefix", v)}
                />
                <TextField
                    label="Titre (surligné)"
                    value={draft.projects.titleHighlight}
                    onChange={(v) => setProjects("titleHighlight", v)}
                />
            </div>
            <TextField
                label="Description"
                textarea
                rows={2}
                value={draft.projects.description}
                onChange={(v) => setProjects("description", v)}
            />

            <FormSubTitle>Page « Blog »</FormSubTitle>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <TextField
                    label="Badge"
                    value={draft.blog.badge}
                    onChange={(v) => setBlog("badge", v)}
                />
                <TextField
                    label="Titre (début)"
                    value={draft.blog.titlePrefix}
                    onChange={(v) => setBlog("titlePrefix", v)}
                />
                <TextField
                    label="Titre (surligné)"
                    value={draft.blog.titleHighlight}
                    onChange={(v) => setBlog("titleHighlight", v)}
                />
            </div>
            <TextField
                label="Description"
                textarea
                rows={2}
                value={draft.blog.description}
                onChange={(v) => setBlog("description", v)}
            />

            <Button
                onClick={handleSave}
                loading={isSaving}
                leftIcon={<Save size={16} />}
                className="w-fit bg-gradient-to-r from-vaSecondary to-vaPrimary text-white"
            >
                Enregistrer les pages
            </Button>
        </div>
    );
};

export default PagesForm;
