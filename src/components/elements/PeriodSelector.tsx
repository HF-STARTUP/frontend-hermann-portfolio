import React, { useState, useEffect } from "react";
import { DateRange } from "react-day-picker";
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { startOfMonth, endOfMonth, subMonths, startOfToday, startOfYesterday, endOfToday, endOfYesterday } from "date-fns";
import { DateRangePicker } from "../ui/custom/date-range-picker";

export type PeriodFilter = "current_month" | "today" | "yesterday" | "previous_month" | "custom";

interface PeriodSelectorProps {
    defaultPeriod: PeriodFilter | DateRange;
    onChange: (range: DateRange | undefined) => void;
}

const PeriodSelector = ({ defaultPeriod, onChange }: PeriodSelectorProps) => {
    // Déterminer si la valeur par défaut est une String (PeriodFilter) ou un Object (DateRange)
    const isDefaultCustom = typeof defaultPeriod !== "string";

    const [selectedPeriod, setSelectedPeriod] = useState<PeriodFilter>(
        isDefaultCustom ? "custom" : (defaultPeriod as PeriodFilter)
    );

    const [date, setDate] = useState<DateRange | undefined>(
        isDefaultCustom ? (defaultPeriod as DateRange) : undefined
    );

    // Gérer le changement de période prédéfinie
    const handlePeriodChange = (value: PeriodFilter) => {
        setSelectedPeriod(value);
        let range: DateRange | undefined;

        switch (value) {
            case "today":
                range = { from: startOfToday(), to: endOfToday() };
                break;
            case "yesterday":
                range = { from: startOfYesterday(), to: endOfYesterday() };
                break;
            case "current_month":
                range = { from: startOfMonth(new Date()), to: endOfMonth(new Date()) };
                break;
            case "previous_month":
                const lastMonth = subMonths(new Date(), 1);
                range = { from: startOfMonth(lastMonth), to: endOfMonth(lastMonth) };
                break;
            case "custom":
                // On ne déclenche pas le onChange tout de suite, on attend la sélection du picker
                return;
        }

        if (range) {
            setDate(range);
            onChange(range);
        }
    };

    // Gérer le changement spécifique dans le DateRangePicker
    const handleDateRangeChange = (newRange: DateRange | undefined) => {
        setDate(newRange);
        onChange(newRange);
    };

    return (
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">          
            <Select value={selectedPeriod} onValueChange={handlePeriodChange}>
                <SelectTrigger className="w-fit text-xs rounded-xl py-3 text-vaTextPrimary">
                    <SelectValue placeholder="Selectionner un periode" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="today">Aujourd'hui</SelectItem>
                    <SelectItem value="yesterday">Hier</SelectItem>
                    <SelectItem value="current_month">Ce mois-ci</SelectItem>
                    <SelectItem value="previous_month">Mois dernier</SelectItem>
                    <SelectItem value="custom">Personnalisé</SelectItem>
                </SelectContent>
            </Select>

            {/* Visibilité conditionnelle du DateRangePicker */}
            {selectedPeriod === "custom" && (
                <DateRangePicker
                    dateRange={date}
                    onDateRangeChange={handleDateRangeChange}
                />
            )}
        </div>
    );
};

export default PeriodSelector;