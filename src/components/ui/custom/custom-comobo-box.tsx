"use client"

import * as React from "react"
import { Check, Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { FieldError } from "react-hook-form";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "../input"

export type ComboBoxOption = {
    label: string
    value: string
}

interface ComboBoxProps {
    options: ComboBoxOption[]
    value?: string
    onValueChange: (value: string) => void
    placeholder?: string
    label?: string
    searchPlaceholder?: string
    emptyMessage?: string
    className?: string
    triggerClassName?: string
    leftIcon?: React.ReactNode
    variant?: "dialog"
    error?: FieldError
    required?: boolean
    onSearch?: (query: string) => void
    isSearching?: boolean
}

export function CustomComboBox({
    options,
    value,
    onValueChange,
    placeholder = "Selectionnez une option...",
    searchPlaceholder = "Recherche...",
    emptyMessage = "No option found.",
    className,
    triggerClassName,
    leftIcon,
    label,
    variant,
    error,
    required,
    onSearch,
    isSearching,
}: ComboBoxProps) {
    const [open, setOpen] = React.useState(false)
    const [localSearch, setLocalSearch] = React.useState("")

    const selectedLabel = React.useMemo(() => {
        return options.find((option) => option.value === value)?.label || placeholder
    }, [options, value, placeholder])

    const filteredOptions = React.useMemo(() => {
        if (onSearch) return options;
        if (!localSearch.trim()) return options;
        return options.filter((o) =>
            o.label.toLowerCase().includes(localSearch.toLowerCase())
        );
    }, [options, localSearch, onSearch])

    const handleSearchChange = (query: string) => {
        setLocalSearch(query)
        onSearch?.(query)
    }

    return (
        <div className={cn("w-full", className)}>
            {label && (
                <Label required={required}>
                    {label}
                </Label>
            )}
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild className={cn("w-full")}>
                    <div className="w-full">
                        <Select>
                            <SelectTrigger
                                inForm
                                className={cn("w-full py-3 bg-transparent rounded-xl", triggerClassName)}
                                leftIcon={leftIcon ?? <Search size={18} />}
                            >
                                <SelectValue
                                    placeholder={
                                        label ? (
                                            <span>{selectedLabel ?? label}</span>
                                        ) : (
                                            selectedLabel
                                        )
                                    }
                                />
                            </SelectTrigger>
                        </Select>
                    </div>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0 rounded-2xl overflow-hidden">
                    <Command
                        className="w-full"
                        filter={onSearch ? () => 1 : undefined}
                        shouldFilter={!onSearch}
                    >
                        <CommandInput
                            placeholder={searchPlaceholder}
                            className="h-9"
                            value={localSearch}
                            onValueChange={handleSearchChange}
                        />
                        <CommandList
                            className="w-full max-h-60 overflow-y-auto custom-scrollbar"
                            onWheel={(e) => e.stopPropagation()}
                        >
                            {isSearching ? (
                                <div className="py-4 text-center text-sm text-muted-foreground">
                                    Recherche...
                                </div>
                            ) : (
                                <>
                                    <CommandEmpty>{emptyMessage}</CommandEmpty>
                                    <CommandGroup>
                                        {filteredOptions.map((option) => (
                                            <CommandItem
                                                key={option.value}
                                                value={option.label}
                                                onSelect={() => {
                                                    onValueChange(option.value === value ? "" : option.value)
                                                    setOpen(false)
                                                }}
                                            >
                                                {option.label}
                                                <Check
                                                    className={cn(
                                                        "ml-auto h-4 w-4",
                                                        value === option.value ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </>
                            )}
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}