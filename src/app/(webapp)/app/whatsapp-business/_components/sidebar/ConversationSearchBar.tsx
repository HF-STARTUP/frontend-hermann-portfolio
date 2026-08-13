"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ConversationSearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

export function ConversationSearchBar({ value, onChange }: ConversationSearchBarProps) {
    return (
        <div className="relative px-3 py-2">
            <Input
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder="Rechercher un nom ou un numéro"
                className="rounded-full border-border bg-muted"
                type="search"
                leftIcon={<Search size={16} />}
            />
        </div>
    );
}