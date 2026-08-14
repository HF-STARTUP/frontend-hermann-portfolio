"use client";

import { cn } from "@/lib/utils";
import { WaConversationStatus } from "@/types/whatsapp.type";

type TabValue = "OPEN" | "ASSIGNED_TO_ME" | "CLOSED";

interface ConversationStatusTabsProps {
    value: WaConversationStatus;
    onChange: (value: WaConversationStatus) => void;
}

const TABS: { value: WaConversationStatus; label: string }[] = [
    { value: WaConversationStatus.OPEN, label: "Ouvertes" },
    { value: WaConversationStatus.ASSIGNED, label: "Mes conversations" },
    { value: WaConversationStatus.PENDING, label: "En attente" },
    { value: WaConversationStatus.BOT, label: "IA (Bot)" },
    { value: WaConversationStatus.CLOSED, label: "Clôturées" },
];

export function ConversationStatusTabs({ value, onChange }: ConversationStatusTabsProps) {
    return (
        <div className="flex gap-1 border-b border-border px-3 pb-2 overflow-x-auto">
            {TABS.map((tab) => (
                <button
                    key={tab.value}
                    type="button"
                    onClick={() => onChange(tab.value)}
                    className={cn(
                        "rounded-full px-3 py-1.5 text-sm font-medium transition-colors shrink-0 custom-scrollbar",
                        value === tab.value
                            ? "bg-blue-primary text-white"
                            : "text-vaTextPrimary hover:bg-accent bg-muted-foreground/5",
                    )}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}