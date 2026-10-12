"use client";

import React from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useSiteContentQuery } from "@/hooks/portfolio/usePortfolioQueries";
import { usePatchSiteContent } from "@/hooks/portfolio/useAdminSiteContent";
import type { FooterContent } from "@/types/portfolio.type";
import { TextField } from "./fields";

/** Onglet Footer : baseline et ligne de copyright */
const FooterForm = () => {
    const { data: siteContent } = useSiteContentQuery();
    const footer = siteContent?.footer;
    const { patchSection, loading } = usePatchSiteContent();
    const { toast } = useToast();

    const [draft, setDraft] = React.useState<FooterContent | undefined>(footer);
    React.useEffect(() => setDraft(footer), [footer]);

    const set = <K extends keyof FooterContent>(
        key: K,
        value: FooterContent[K]
    ) => setDraft((prev) => (prev ? { ...prev, [key]: value } : prev));

    const handleSave = async () => {
        if (!draft || loading) return;
        try {
            await patchSection("footer", draft);
            toast({ title: "Pied de page enregistré" });
        } catch {
            /* erreur déjà toastée par le provider ; le brouillon est conservé */
        }
    };

    if (!footer) return null;

    return (
        <div className="flex flex-col gap-5">
            <TextField
                label="Baseline (sous le logo)"
                textarea
                rows={2}
                value={draft?.baseline ?? ""}
                onChange={(v) => set("baseline", v)}
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <TextField
                    label="Copyright — nom"
                    value={draft?.copyrightPrefix ?? ""}
                    onChange={(v) => set("copyrightPrefix", v)}
                />
                <TextField
                    label="Copyright — mention (après l'année)"
                    value={draft?.copyrightSuffix ?? ""}
                    onChange={(v) => set("copyrightSuffix", v)}
                />
            </div>
            <Button
                onClick={handleSave}
                loading={loading}
                leftIcon={<Save size={16} />}
                className="w-fit bg-gradient-to-r from-vaSecondary to-vaPrimary text-white"
            >
                Enregistrer le pied de page
            </Button>
        </div>
    );
};

export default FooterForm;
