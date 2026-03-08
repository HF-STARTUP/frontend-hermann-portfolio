"use client";

import * as React from "react";
import { X, Check, ChevronDown } from "lucide-react"; // Remplacement par ChevronDown pour matcher le Select

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

export interface MultiSelectOption {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: MultiSelectOption[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder: string;
  className?: string;
  disabled?: boolean;
}

export const MultiSelect = React.forwardRef<HTMLDivElement, MultiSelectProps>(
  ({ options, value, onChange, placeholder, className, disabled }, ref) => {
    const [open, setOpen] = React.useState(false);

    const handleSelect = (currentValue: string) => {
      const newValue = value.includes(currentValue)
        ? value.filter((val) => val !== currentValue)
        : [...value, currentValue];

      onChange(newValue);
    };

    const handleRemove = (itemToRemove: string) => {
      const newValue = value.filter((val) => val !== itemToRemove);
      onChange(newValue);
    };

    return (
      <Popover open={open} onOpenChange={setOpen} modal={true}>
        <PopoverTrigger asChild disabled={disabled}>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              // Styles calqués sur ton SelectTrigger "inForm"
              "flex min-h-11 w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition-all outline-none",
              "bg-transparent border border-solid border-neutral-300/60 text-neutral-700",
              "placeholder:text-vaTextPrimary/50 focus:outline-none focus:ring-2 focus:ring-vaBlue/30 focus:border-vaBlue/50",
              "disabled:cursor-not-allowed disabled:opacity-50",
              value.length > 0 ? "h-auto" : "h-10",
              className
            )}
          >
            <div className="flex flex-wrap gap-1 items-center overflow-hidden">
              {value.length > 0 ? (
                value.map((val) => {
                  const option = options.find((opt) => opt.value === val);
                  return (
                    <Badge
                      key={val}
                      className="flex bg-vaMainBlue text-white pl-2 pr-1 py-0.5 text-[11px] items-center rounded-sm hover:bg-vaMainBlue/90"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(val);
                      }}
                    >
                      {option?.label || val}
                      <span className="ml-1.5 p-0.5 rounded-sm hover:bg-black/20 transition-colors">
                        <X className="w-3 h-3" />
                      </span>
                    </Badge>
                  );
                })
              ) : (
                <span className="text-neutral-400 font-normal">
                  {placeholder}
                </span>
              )}
            </div>
            {/* Utilisation de l'icône ChevronDown identique à ton Select */}
            <ChevronDown className="h-4 w-4 opacity-50 shrink-0 ml-2" />
          </Button>
        </PopoverTrigger>
        
        <PopoverContent 
          className="p-0 w-[var(--radix-popover-trigger-width)] min-w-[200px]" 
          align="start"
        >
          <Command className="w-full">
            <CommandList className="max-h-[300px] overflow-y-auto custom-scrollbar">
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = value.includes(option.value);
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => handleSelect(option.value)}
                      className="cursor-pointer flex items-center justify-between py-2 px-3 hover:bg-vaMainBlue/5"
                    >
                      <span className={cn(
                        "text-sm",
                        isSelected ? "text-vaMainBlue font-medium" : "text-neutral-600"
                      )}>
                        {option.label}
                      </span>
                      <Check
                        className={cn(
                          "h-4 w-4 text-vaMainBlue",
                          isSelected ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);

MultiSelect.displayName = "MultiSelect";