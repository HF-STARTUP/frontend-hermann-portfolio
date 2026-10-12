"use client";

import React from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TagInputOption {
    value: string;
    label: string;
}

interface TagInputProps {
    options: TagInputOption[];
    value: string[];
    onChange: (value: string[]) => void;
    placeholder?: string;
    /**
     * Permet de valider une valeur libre absente des options (tags
     * d'articles, technologies hors liste...).
     */
    allowFree?: boolean;
    emptyMessage?: string;
    disabled?: boolean;
}

/**
 * Input à badges avec autocomplétion :
 * la saisie filtre les options, la sélection (clic ou Entrée) se transforme
 * en badge avec bouton X de suppression.
 */
const TagInput: React.FC<TagInputProps> = ({
    options,
    value,
    onChange,
    placeholder = "Saisir pour filtrer...",
    allowFree = false,
    emptyMessage = "Aucun résultat",
    disabled = false,
}) => {
    const [query, setQuery] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const wrapperRef = React.useRef<HTMLDivElement>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);

    /* Ferme la liste déroulante au clic extérieur */
    React.useEffect(() => {
        if (!open) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [open]);

    const normalizedQuery = query.trim().toLowerCase();

    const filteredOptions = normalizedQuery
        ? options.filter(
              (option) =>
                  option.label.toLowerCase().includes(normalizedQuery) &&
                  !value.includes(option.value)
          )
        : options.filter((option) => !value.includes(option.value));

    const exactMatch = options.some(
        (option) => option.value.toLowerCase() === normalizedQuery
    );

    const addValue = (raw: string) => {
        const trimmed = raw.trim();
        if (!trimmed || value.includes(trimmed)) {
            setQuery("");
            return;
        }
        onChange([...value, trimmed]);
        setQuery("");
    };

    const removeValue = (removed: string) =>
        onChange(value.filter((item) => item !== removed));

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        switch (event.key) {
            case "Enter":
                event.preventDefault();
                if (!query.trim()) return;
                // Priorité à la première option filtrée, sinon valeur libre
                if (filteredOptions.length > 0) {
                    addValue(filteredOptions[0].value);
                } else if (allowFree) {
                    addValue(query);
                }
                break;
            case ",":
                event.preventDefault();
                if (filteredOptions.length > 0) {
                    addValue(filteredOptions[0].value);
                } else if (allowFree && query.trim()) {
                    addValue(query);
                }
                break;
            case "Backspace":
                if (!query && value.length > 0) {
                    onChange(value.slice(0, -1));
                }
                break;
        }
    };

    return (
        <div ref={wrapperRef} className="relative">
            {/* Champ conteneur : badges + input de saisie */}
            <div
                className={cn(
                    "flex min-h-11 w-full flex-wrap items-center gap-1.5 rounded-xl border border-neutral-300/60 bg-transparent px-3 py-2 transition-all dark:border-neutral-600/60",
                    "focus-within:ring-2 focus-within:ring-vaPrimary/30 focus-within:border-vaPrimary/50",
                    disabled && "cursor-not-allowed opacity-50"
                )}
                onClick={() => inputRef.current?.focus()}
            >
                {value.map((item) => (
                    <span
                        key={item}
                        className="flex items-center gap-1 rounded-md bg-vaPrimary/15 py-0.5 pl-2.5 pr-1 text-xs font-medium text-foreground"
                    >
                        {item}
                        <button
                            type="button"
                            aria-label={`Retirer ${item}`}
                            disabled={disabled}
                            onClick={(e) => {
                                e.stopPropagation();
                                removeValue(item);
                            }}
                            className="rounded-sm p-0.5 text-muted-foreground transition-colors hover:bg-vaPrimary/20 hover:text-destructive"
                        >
                            <X size={12} />
                        </button>
                    </span>
                ))}
                <input
                    ref={inputRef}
                    disabled={disabled}
                    value={query}
                    placeholder={
                        value.length === 0 ? placeholder : undefined
                    }
                    className="min-w-[90px] flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setOpen(true);
                    }}
                    onFocus={() => setOpen(true)}
                    onKeyDown={handleKeyDown}
                />
            </div>

            {/* Liste d'options filtrée par la saisie */}
            {open && (normalizedQuery || filteredOptions.length > 0) && (
                <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-60 overflow-y-auto rounded-xl border border-vaPrimary/20 bg-popover p-1 shadow-lg custom-scrollbar">
                    {filteredOptions.length === 0 && (
                        <p className="px-3 py-2 text-sm text-muted-foreground">
                            {emptyMessage}
                        </p>
                    )}
                    {filteredOptions.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            // onMouseDown : sélectionne avant le blur de l'input
                            onMouseDown={(e) => {
                                e.preventDefault();
                                addValue(option.value);
                            }}
                            className="flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-foreground transition-colors hover:bg-vaPrimary/10"
                        >
                            <span>{option.label}</span>
                            <Check size={14} className="text-vaPrimary" />
                        </button>
                    ))}
                    {/* Création libre (tags d'articles...) */}
                    {allowFree &&
                        normalizedQuery &&
                        !exactMatch &&
                        filteredOptions.length === 0 && (
                            <button
                                type="button"
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                    addValue(query);
                                }}
                                className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-vaPrimary transition-colors hover:bg-vaPrimary/10"
                            >
                                + Ajouter « {query.trim()} »
                            </button>
                        )}
                </div>
            )}
        </div>
    );
};

export default TagInput;
