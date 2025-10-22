"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CgPlayListSearch } from "react-icons/cg";
import { Download, Filter, RefreshCw } from "lucide-react";

/**
 * Barre d'actions pour le DataTable
 * Contient des actions courantes comme la recherche, l'export, le filtre, etc.
 */

interface DataTableActionsProps {
    searchValue?: string;
    onSearchChange?: (value: string) => void;
    onExport?: () => void;
    onRefresh?: () => void;
    showSearch?: boolean;
    showExport?: boolean;
    showRefresh?: boolean;
    children?: React.ReactNode;
}

export const DataTableActions: React.FC<DataTableActionsProps> = ({
    searchValue = "",
    onSearchChange,
    onExport,
    onRefresh,
    showSearch = true,
    showExport = false,
    showRefresh = false,
    children,
}) => {
    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-4">
            <div className="flex gap-2 items-center flex-1">
                {showSearch && (
                    <Input
                        placeholder="Rechercher..."
                        value={searchValue}
                        onChange={(e) => onSearchChange?.(e.target.value)}
                        rightIcon={<CgPlayListSearch className="text-vaTextPrimary text-[28px]" />}
                        className="max-w-sm"
                    />
                )}
            </div>
            
            <div className="flex gap-2 items-center">
                {children}
                
                {showRefresh && (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onRefresh}
                        className="gap-2"
                    >
                        <RefreshCw className="h-4 w-4" />
                        Actualiser
                    </Button>
                )}
                
                {showExport && (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onExport}
                        className="gap-2"
                    >
                        <Download className="h-4 w-4" />
                        Exporter
                    </Button>
                )}
            </div>
        </div>
    );
};

/**
 * Composant de filtre pour le DataTable
 */
interface DataTableFilterProps {
    label: string;
    value: string;
    onValueChange: (value: string) => void;
    options: { label: string; value: string }[];
}

export const DataTableFilter: React.FC<DataTableFilterProps> = ({
    label,
    value,
    onValueChange,
    options,
}) => {
    return (
        <div className="flex items-center gap-2">
            <span className="font-semibold text-sm text-vaTextPrimary">{label}:</span>
            <Select value={value} onValueChange={onValueChange}>
                <SelectTrigger className="w-fit min-w-[150px]">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

