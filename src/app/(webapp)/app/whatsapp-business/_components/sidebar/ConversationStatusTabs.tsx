"use client";

import { cn } from "@/lib/utils";

type TabValue = "OPEN" | "ASSIGNED_TO_ME" | "CLOSED";

interface ConversationStatusTabsProps {
  value: TabValue;
  onChange: (value: TabValue) => void;
}

const TABS: { value: TabValue; label: string }[] = [
  { value: "OPEN", label: "Ouvertes" },
  { value: "ASSIGNED_TO_ME", label: "Mes conversations" },
  { value: "CLOSED", label: "Clôturées" },
];

export function ConversationStatusTabs({ value, onChange }: ConversationStatusTabsProps) {
  return (
    <div className="flex gap-1 border-b border-border px-3 pb-2">
      {TABS.map((tab) => (
        <button
          key={tab.value}
          type="button"
          onClick={() => onChange(tab.value)}
          className={cn(
            "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
            value === tab.value
              ? "bg-blue-primary text-white"
              : "text-vaTextPrimary hover:bg-accent",
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}