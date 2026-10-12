"use client";

import React from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ICON_PRESET } from "@/components/admin/iconPreset";
import type { SocialLink } from "@/types/portfolio.type";

/**
 * Éditeur de liens sociaux : lignes label / URL / icône (preset lucide)
 * avec ajout et suppression. Utilisé dans l'onglet Profil de /admin/content.
 */
const SocialLinksEditor: React.FC<{
    links: SocialLink[];
    onChange: (links: SocialLink[]) => void;
}> = ({ links, onChange }) => {
    const updateLink = (id: string, patch: Partial<SocialLink>) =>
        onChange(links.map((link) => (link.id === id ? { ...link, ...patch } : link)));

    const removeLink = (id: string) =>
        onChange(links.filter((link) => link.id !== id));

    const addLink = () =>
        onChange([
            ...links,
            { id: `sl-${Date.now()}`, label: "", url: "", iconName: "Globe" },
        ]);

    return (
        <div className="flex flex-col gap-3">
            {links.map((link) => {
                const Icon = ICON_PRESET[link.iconName] ?? ICON_PRESET.Globe;

                return (
                    <div
                        key={link.id}
                        className="flex flex-wrap items-center gap-2 rounded-xl border border-vaPrimary/20 bg-background/40 p-2"
                    >
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-vaPrimary/20 bg-vaPrimary/10 text-vaPrimary">
                            <Icon size={16} />
                        </span>
                        <Input
                            className="w-32 flex-none"
                            placeholder="Libellé"
                            value={link.label}
                            onChange={(e) =>
                                updateLink(link.id, { label: e.target.value })
                            }
                        />
                        <Input
                            className="min-w-[180px] flex-1"
                            placeholder="https://..."
                            value={link.url}
                            onChange={(e) =>
                                updateLink(link.id, { url: e.target.value })
                            }
                        />
                        <Select
                            value={link.iconName}
                            onValueChange={(iconName) =>
                                updateLink(link.id, { iconName })
                            }
                        >
                            <SelectTrigger className="w-36">
                                <SelectValue placeholder="Icône" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.entries(ICON_PRESET).map(
                                    ([name, PresetIcon]) => (
                                        <SelectItem key={name} value={name}>
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
                            aria-label={`Supprimer le lien ${link.label || ""}`}
                            onClick={() => removeLink(link.id)}
                            className="rounded-xl border-destructive/40 text-destructive hover:bg-destructive/20"
                        >
                            <X size={16} />
                        </Button>
                    </div>
                );
            })}

            <Button
                type="button"
                variant="outline"
                onClick={addLink}
                leftIcon={<Plus size={16} />}
                className="w-fit"
            >
                Ajouter un lien
            </Button>
        </div>
    );
};

export default SocialLinksEditor;
