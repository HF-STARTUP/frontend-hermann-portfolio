"use client";

import React from "react";
import { Plus, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import TagInput from "@/components/ui/tag-input";
import { ICON_PRESET, getIconFromPreset } from "@/components/admin/iconPreset";
import { useSiteContentQuery } from "@/hooks/portfolio/usePortfolioQueries";
import { usePatchSiteContent } from "@/hooks/portfolio/useAdminSiteContent";
import type {
    HeroContent,
    HomeSectionsContent,
    SkillCard,
    StatItem,
} from "@/types/portfolio.type";
import { TextField, FormSubTitle } from "./fields";

/** Onglet Accueil : hero, statistiques, en-têtes des sections et compétences */
const HomeForm = () => {
    const { data: siteContent } = useSiteContentQuery();
    const hero = siteContent?.hero;
    const homeSections = siteContent?.homeSections;
    const skills = siteContent?.skills;

    /* PATCH /site-content/{section} ; erreur toastée par le provider */
    const { patchSection, loading } = usePatchSiteContent();
    const isSaving = loading;
    const { toast } = useToast();

    const [heroDraft, setHeroDraft] = React.useState<HeroContent | undefined>(hero);
    const [sectionsDraft, setSectionsDraft] =
        React.useState<HomeSectionsContent | undefined>(homeSections);
    const [skillsDraft, setSkillsDraft] = React.useState<
        SkillCard[] | undefined
    >(skills);

    React.useEffect(() => setHeroDraft(hero), [hero]);
    React.useEffect(() => setSectionsDraft(homeSections), [homeSections]);
    React.useEffect(() => setSkillsDraft(skills), [skills]);

    const setHero = <K extends keyof HeroContent>(
        key: K,
        value: HeroContent[K]
    ) =>
        setHeroDraft((prev) => (prev ? { ...prev, [key]: value } : prev));

    const setSection = <K extends keyof HomeSectionsContent>(
        key: K,
        patch: Partial<HomeSectionsContent[K]>
    ) =>
        setSectionsDraft((prev) =>
            prev ? { ...prev, [key]: { ...prev[key], ...patch } } : prev
        );

    const setStat = (id: string, patch: Partial<StatItem>) =>
        setHeroDraft((prev) =>
            prev
                ? {
                      ...prev,
                      stats: prev.stats.map((stat) =>
                          stat.id === id ? { ...stat, ...patch } : stat
                      ),
                  }
                : prev
        );

    const addStat = () =>
        setHeroDraft((prev) =>
            prev
                ? {
                      ...prev,
                      stats: [
                          ...prev.stats,
                          { id: `stat-${Date.now()}`, value: "", label: "" },
                      ],
                  }
                : prev
        );

    const removeStat = (id: string) =>
        setHeroDraft((prev) =>
            prev
                ? { ...prev, stats: prev.stats.filter((stat) => stat.id !== id) }
                : prev
        );

    const setSkill = (id: string, patch: Partial<SkillCard>) =>
        setSkillsDraft((prev) =>
            prev
                ? prev.map((skill) =>
                      skill.id === id ? { ...skill, ...patch } : skill
                  )
                : prev
        );

    const addSkill = () =>
        setSkillsDraft((prev) =>
            prev
                ? [
                      ...prev,
                      {
                          id: `skill-${Date.now()}`,
                          name: "Nouvelle compétence",
                          iconName: "Sparkles",
                          features: [],
                      },
                  ]
                : prev
        );

    const removeSkill = (id: string) =>
        setSkillsDraft((prev) =>
            prev ? prev.filter((skill) => skill.id !== id) : prev
        );

    const handleSave = async () => {
        // PATCH /site-content/{hero|homeSections|skills}
        if (!heroDraft || !sectionsDraft || !skillsDraft || isSaving) return;
        try {
            await patchSection("hero", heroDraft);
            await patchSection("homeSections", sectionsDraft);
            await patchSection("skills", skillsDraft);
            toast({ title: "Page d'accueil enregistrée" });
        } catch {
            /* erreur déjà toastée par le provider ; les brouillons restent */
        }
    };

    if (!heroDraft || !sectionsDraft || !skillsDraft) return null;

    return (
        <div className="flex flex-col gap-5">
            <FormSubTitle>Hero</FormSubTitle>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <TextField
                    label="Badge de disponibilité"
                    value={heroDraft.availabilityBadge}
                    onChange={(v) => setHero("availabilityBadge", v)}
                />
                <TextField
                    label="Bouton principal"
                    value={heroDraft.ctaLabel}
                    onChange={(v) => setHero("ctaLabel", v)}
                />
            </div>
            <TextField
                label="Description (paragraphe du hero)"
                textarea
                rows={4}
                value={heroDraft.description}
                onChange={(v) => setHero("description", v)}
            />
            <TextField
                label="Indication de défilement"
                value={heroDraft.scrollHint}
                onChange={(v) => setHero("scrollHint", v)}
            />

            {/* Statistiques */}
            <FormSubTitle>Statistiques</FormSubTitle>
            <div className="flex flex-col gap-2">
                {heroDraft.stats.map((stat) => (
                    <div
                        key={stat.id}
                        className="flex flex-wrap items-center gap-2"
                    >
                        <Input
                            className="w-24"
                            placeholder="2+"
                            value={stat.value}
                            onChange={(e) =>
                                setStat(stat.id, { value: e.target.value })
                            }
                        />
                        <Input
                            className="flex-1"
                            placeholder="Libellé"
                            value={stat.label}
                            onChange={(e) =>
                                setStat(stat.id, { label: e.target.value })
                            }
                        />
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            aria-label={`Supprimer la statistique ${stat.label}`}
                            onClick={() => removeStat(stat.id)}
                            className="rounded-xl border-destructive/40 text-destructive hover:bg-destructive/20"
                        >
                            <Trash2 size={16} />
                        </Button>
                    </div>
                ))}
                <Button
                    type="button"
                    variant="outline"
                    onClick={addStat}
                    leftIcon={<Plus size={16} />}
                    className="w-fit"
                >
                    Ajouter une statistique
                </Button>
            </div>

            {/* En-têtes des sections de la page d'accueil */}
            <FormSubTitle>Section « À propos »</FormSubTitle>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                <TextField
                    label="Badge"
                    value={sectionsDraft.about.badge}
                    onChange={(v) => setSection("about", { badge: v })}
                />
                <TextField
                    label="Titre (début)"
                    value={sectionsDraft.about.titlePrefix}
                    onChange={(v) => setSection("about", { titlePrefix: v })}
                />
                <TextField
                    label="Titre (surligné)"
                    value={sectionsDraft.about.titleHighlight}
                    onChange={(v) => setSection("about", { titleHighlight: v })}
                />
                <TextField
                    label="Titre (fin)"
                    value={sectionsDraft.about.titleSuffix ?? ""}
                    onChange={(v) => setSection("about", { titleSuffix: v })}
                />
            </div>
            <TextField
                label="Description"
                textarea
                rows={3}
                value={sectionsDraft.about.subtitle ?? ""}
                onChange={(v) => setSection("about", { subtitle: v })}
            />
            <TextField
                label="Bouton"
                value={sectionsDraft.about.ctaLabel}
                onChange={(v) => setSection("about", { ctaLabel: v })}
            />

            <FormSubTitle>Section « Technologies »</FormSubTitle>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                <TextField
                    label="Badge"
                    value={sectionsDraft.technologies.badge}
                    onChange={(v) => setSection("technologies", { badge: v })}
                />
                <TextField
                    label="Titre (début)"
                    value={sectionsDraft.technologies.titlePrefix}
                    onChange={(v) =>
                        setSection("technologies", { titlePrefix: v })
                    }
                />
                <TextField
                    label="Titre (surligné)"
                    value={sectionsDraft.technologies.titleHighlight}
                    onChange={(v) =>
                        setSection("technologies", { titleHighlight: v })
                    }
                />
                <TextField
                    label="Bouton (optionnel)"
                    value={sectionsDraft.technologies.ctaLabel ?? ""}
                    onChange={(v) =>
                        setSection("technologies", { ctaLabel: v })
                    }
                />
            </div>
            <TextField
                label="Sous-titre"
                textarea
                rows={2}
                value={sectionsDraft.technologies.subtitle ?? ""}
                onChange={(v) => setSection("technologies", { subtitle: v })}
            />

            <FormSubTitle>Section « Projets »</FormSubTitle>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                <TextField
                    label="Badge"
                    value={sectionsDraft.projects.badge}
                    onChange={(v) => setSection("projects", { badge: v })}
                />
                <TextField
                    label="Titre (début)"
                    value={sectionsDraft.projects.titlePrefix}
                    onChange={(v) => setSection("projects", { titlePrefix: v })}
                />
                <TextField
                    label="Titre (surligné)"
                    value={sectionsDraft.projects.titleHighlight}
                    onChange={(v) =>
                        setSection("projects", { titleHighlight: v })
                    }
                />
                <TextField
                    label="Bouton"
                    value={sectionsDraft.projects.ctaLabel}
                    onChange={(v) => setSection("projects", { ctaLabel: v })}
                />
            </div>
            <TextField
                label="Sous-titre"
                textarea
                rows={2}
                value={sectionsDraft.projects.subtitle ?? ""}
                onChange={(v) => setSection("projects", { subtitle: v })}
            />

            <FormSubTitle>Section « Contact »</FormSubTitle>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                <TextField
                    label="Badge"
                    value={sectionsDraft.contact.badge}
                    onChange={(v) => setSection("contact", { badge: v })}
                />
                <TextField
                    label="Titre (début)"
                    value={sectionsDraft.contact.titlePrefix}
                    onChange={(v) => setSection("contact", { titlePrefix: v })}
                />
                <TextField
                    label="Titre (surligné)"
                    value={sectionsDraft.contact.titleHighlight}
                    onChange={(v) =>
                        setSection("contact", { titleHighlight: v })
                    }
                />
                <TextField
                    label="Panneau latéral — titre"
                    value={sectionsDraft.contact.sideTitle}
                    onChange={(v) => setSection("contact", { sideTitle: v })}
                />
            </div>
            <TextField
                label="Sous-titre"
                textarea
                rows={2}
                value={sectionsDraft.contact.subtitle ?? ""}
                onChange={(v) => setSection("contact", { subtitle: v })}
            />
            <TextField
                label="Panneau latéral — description"
                textarea
                rows={2}
                value={sectionsDraft.contact.sideDescription}
                onChange={(v) => setSection("contact", { sideDescription: v })}
            />

            {/* Cartes de compétences */}
            <FormSubTitle>Cartes de compétences</FormSubTitle>
            <div className="flex flex-col gap-4">
                {skillsDraft.map((skill) => {
                    const Icon = getIconFromPreset(skill.iconName);

                    return (
                        <div
                            key={skill.id}
                            className="flex flex-col gap-3 rounded-2xl border border-vaPrimary/20 bg-background/40 p-4"
                        >
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-vaPrimary/20 bg-vaPrimary/10 text-vaPrimary">
                                    <Icon size={18} />
                                </span>
                                <Input
                                    className="min-w-[180px] flex-1"
                                    value={skill.name}
                                    onChange={(e) =>
                                        setSkill(skill.id, {
                                            name: e.target.value,
                                        })
                                    }
                                />
                                <Select
                                    value={skill.iconName}
                                    onValueChange={(iconName) =>
                                        setSkill(skill.id, { iconName })
                                    }
                                >
                                    <SelectTrigger className="w-44">
                                        <SelectValue placeholder="Icône" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(ICON_PRESET).map(
                                            ([name, PresetIcon]) => (
                                                <SelectItem
                                                    key={name}
                                                    value={name}
                                                >
                                                    <span className="flex items-center gap-2">
                                                        <PresetIcon size={14} />
                                                        {name}
                                                    </span>
                                                </SelectItem>
                                            )
                                        )}
                                    </SelectContent>
                                </Select>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    aria-label={`Supprimer ${skill.name}`}
                                    onClick={() => removeSkill(skill.id)}
                                    className="rounded-xl border-destructive/40 text-destructive hover:bg-destructive/20"
                                >
                                    <Trash2 size={16} />
                                </Button>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium text-foreground">
                                    Points (sélection libre)
                                </label>
                                <TagInput
                                    options={[]}
                                    value={skill.features}
                                    onChange={(features) =>
                                        setSkill(skill.id, { features })
                                    }
                                    allowFree
                                    placeholder="Saisir un point puis Entrée..."
                                    emptyMessage="Saisissez du texte puis Entrée pour ajouter"
                                />
                            </div>
                        </div>
                    );
                })}
                <Button
                    type="button"
                    variant="outline"
                    onClick={addSkill}
                    leftIcon={<Plus size={16} />}
                    className="w-fit"
                >
                    Ajouter une compétence
                </Button>
            </div>

            <Button
                onClick={handleSave}
                loading={isSaving}
                leftIcon={<Save size={16} />}
                className="mt-2 w-fit bg-gradient-to-r from-vaSecondary to-vaPrimary text-white"
            >
                Enregistrer l'accueil
            </Button>
        </div>
    );
};

export default HomeForm;
