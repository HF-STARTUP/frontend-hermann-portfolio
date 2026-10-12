"use client";

import React from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useSiteContentQuery, useSocialLinksQuery } from "@/hooks/portfolio/usePortfolioQueries";
import { usePatchSiteContent, useUpdateSocialLinks } from "@/hooks/portfolio/useAdminSiteContent";
import { TextField, FormSubTitle } from "./fields";
import SocialLinksEditor from "./SocialLinksEditor";

/** Onglet Profil : identité, coordonnées et liens sociaux */
const ProfileForm = () => {
    const { data: siteContent } = useSiteContentQuery();
    const { data: socialLinks = [] } = useSocialLinksQuery();
    const profile = siteContent?.profile;

    const { patchSection, loading: patchingSection } = usePatchSiteContent();
    const { updateSocialLinks, loading: patchingLinks } = useUpdateSocialLinks();
    const isSaving = patchingSection || patchingLinks;
    const { toast } = useToast();

    const [draft, setDraft] = React.useState(profile);
    React.useEffect(() => setDraft(profile), [profile]);

    // Brouillon local des liens : la sauvegarde (PUT complet) ne se fait
    // qu'à l'enregistrement, pas à chaque frappe.
    const [linksDraft, setLinksDraft] = React.useState(socialLinks);
    React.useEffect(() => setLinksDraft(socialLinks), [socialLinks]);

    const set = <K extends keyof NonNullable<typeof profile>>(
        key: K,
        value: NonNullable<typeof profile>[K]
    ) =>
        setDraft((prev) => (prev ? { ...prev, [key]: value } : prev));

    const handleSave = async () => {
        if (!draft || isSaving) return;
        try {
            await patchSection("profile", draft);
            if (JSON.stringify(linksDraft) !== JSON.stringify(socialLinks)) {
                await updateSocialLinks(linksDraft);
            }
            toast({ title: "Profil enregistré" });
        } catch {
            /* erreur déjà toastée par le provider ; le brouillon est conservé */
        }
    };

    if (!profile) return null;

    return (
        <div className="flex flex-col gap-5">
            <FormSubTitle>Identité</FormSubTitle>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <TextField
                    label="Nom complet"
                    value={draft?.fullName ?? ""}
                    onChange={(v) => set("fullName", v)}
                />
                <TextField
                    label="Prénom (partie 1 du titre)"
                    value={draft?.firstName ?? ""}
                    onChange={(v) => set("firstName", v)}
                />
                <TextField
                    label="Nom surligné (partie 2)"
                    value={draft?.lastName ?? ""}
                    onChange={(v) => set("lastName", v)}
                />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                <TextField
                    label="Initiales du logo"
                    value={draft?.logoInitials ?? ""}
                    onChange={(v) => set("logoInitials", v)}
                />
                <TextField
                    label="Rôle"
                    value={draft?.roleLine ?? ""}
                    onChange={(v) => set("roleLine", v)}
                />
                <TextField
                    label="Localisation"
                    value={draft?.location ?? ""}
                    onChange={(v) => set("location", v)}
                />
                <TextField
                    label="Email public"
                    value={draft?.email ?? ""}
                    onChange={(v) => set("email", v)}
                />
            </div>
            <TextField
                label="Ligne technologies (hero)"
                value={draft?.techLine ?? ""}
                onChange={(v) => set("techLine", v)}
            />
            <TextField
                label="Lien du CV"
                value={draft?.cvUrl ?? ""}
                placeholder="https://.../cv.pdf"
                onChange={(v) => set("cvUrl", v)}
            />

            <FormSubTitle>Liens sociaux</FormSubTitle>
            {/* PUT /social-links (remplacement complet) à l'enregistrement */}
            <SocialLinksEditor links={linksDraft} onChange={setLinksDraft} />

            <Button
                onClick={handleSave}
                loading={isSaving}
                leftIcon={<Save size={16} />}
                className="w-fit bg-gradient-to-r from-vaSecondary to-vaPrimary text-white"
            >
                Enregistrer le profil
            </Button>
        </div>
    );
};

export default ProfileForm;
