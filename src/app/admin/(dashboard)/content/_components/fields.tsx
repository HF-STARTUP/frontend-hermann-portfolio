"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

/** Champ texte/textarea libellé, contrôlé — brique des formulaires de contenu */
export const TextField: React.FC<{
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    textarea?: boolean;
    rows?: number;
    hint?: string;
}> = ({
    label,
    value,
    onChange,
    placeholder,
    textarea = false,
    rows = 3,
    hint,
}) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground">{label}</label>
        {textarea ? (
            <Textarea
                rows={rows}
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
            />
        ) : (
            <Input
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
            />
        )}
        {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
);

/** Titre de sous-section dans les onglets de contenu */
export const FormSubTitle: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => (
    <h3 className="mt-2 border-t border-vaPrimary/20 pt-6 text-sm font-bold uppercase tracking-wide text-vaPrimary first:border-0 first:pt-0 first:mt-0">
        {children}
    </h3>
);
