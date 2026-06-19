import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { useId } from "react";

export interface SelectableChipProps {
    label: string;
    value: string;
    icon?: React.ReactNode;
    onSelect: (value: string) => void;
    isSelected?: boolean;
}

export const SelectableChip = ({ label, value, icon, onSelect, isSelected = false }: SelectableChipProps) => {
    const id = useId();

    return (
        <label
            htmlFor={id}
            className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full border cursor-pointer transition-colors select-none",
                isSelected
                    ? "bg-vaPrimary text-white border-vaPrimary"
                    : "bg-white text-foreground border-border hover:bg-muted/50"
            )}
        >
            <Checkbox
                id={id}
                checked={isSelected}
                onCheckedChange={() => onSelect(value)}
                className="hidden"
            />
            {icon && <span className={cn("shrink-0", isSelected ? "text-white" : "text-muted-foreground")}>{icon}</span>}
            <span className="text-sm font-medium">{label}</span>
        </label>
    );
};