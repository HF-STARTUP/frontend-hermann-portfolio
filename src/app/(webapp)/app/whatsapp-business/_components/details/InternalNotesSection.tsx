"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

interface InternalNotesSectionProps {
    initialValue?: string;
}

export function InternalNotesSection({
    initialValue = "Client fidèle depuis 2024, préfère être contacté le matin.",
}: InternalNotesSectionProps) {
    const [value, setValue] = useState(initialValue);

    return (
        <div className="border-t border-border px-4 py-4">
            <p className="mb-2 text-xs font-semibold uppercase text-vaTextPrimary">Notes internes</p>
            <Textarea
                value={value}
                onChange={(event) => setValue(event.target.value)}
                placeholder="Ajouter une note visible uniquement par l'équipe"
                className="min-h-20 resize-none border-border bg-vaYellow/10"
            />
        </div>
    );
}