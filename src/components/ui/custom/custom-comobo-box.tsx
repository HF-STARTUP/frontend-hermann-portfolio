"use client"

import * as React from "react"
import {Check} from "lucide-react"

import {cn} from "@/lib/utils"
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {FieldError} from "react-hook-form";
import {Select, SelectTrigger, SelectValue} from "@/components/ui/select";

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
    className?: string,
    variant?: "dialog",
    error?: FieldError,
}

export function CustomComboBox({
                                   options,
                                   value,
                                   onValueChange,
                                   placeholder = "Select option...",
                                   searchPlaceholder = "Search...",
                                   emptyMessage = "No option found.",
                                   className,
                                   label,
                                   variant,
                                   error
                               }: ComboBoxProps) {
    const [open, setOpen] = React.useState(false)

    const selectedLabel = React.useMemo(() => {
        return options.find((option) => option.value === value)?.label || placeholder
    }, [options, value, placeholder])

    return (
        <div className={"w-fit"}>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild className={"w-full"}>
                    <div className={"w-full"}>
                        <Select>
                            <SelectTrigger className="w-fit bg-slate-50">
                                <SelectValue
                                    placeholder={selectedLabel ?? label}
                                />
                            </SelectTrigger>
                        </Select>
                    </div>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                    <Command className={"w-full"}>
                        <CommandInput placeholder={searchPlaceholder} className="h-9"/>
                        <CommandList className={"w-full"}>
                            <CommandEmpty>{emptyMessage}</CommandEmpty>
                            <CommandGroup>
                                {options.map((option) => (
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
                                            className={cn("ml-auto h-4 w-4", value === option.value ? "opacity-100" : "opacity-0")}/>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}

