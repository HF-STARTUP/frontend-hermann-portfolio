"use client";

import { ColumnDef } from "@tanstack/react-table";
import React from "react";

/**
 * Hook personnalisé pour gérer l'état d'un DataTable
 * Permet de centraliser la logique de gestion d'état
 */
export function useDataTableState<TData>() {
    const [globalFilter, setGlobalFilter] = React.useState("");
    const [rowSelection, setRowSelection] = React.useState({});
    
    return {
        globalFilter,
        setGlobalFilter,
        rowSelection,
        setRowSelection,
    };
}

/**
 * Utilitaire pour créer une colonne de sélection
 * Permet la sélection multiple de lignes dans le tableau
 */
export function createSelectionColumn<TData>(): ColumnDef<TData> {
    return {
        id: "select",
        header: ({ table }) => (
            <input
                type="checkbox"
                checked={table.getIsAllPageRowsSelected()}
                onChange={table.getToggleAllPageRowsSelectedHandler()}
                className="cursor-pointer"
            />
        ),
        cell: ({ row }) => (
            <input
                type="checkbox"
                checked={row.getIsSelected()}
                onChange={row.getToggleSelectedHandler()}
                className="cursor-pointer"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    };
}

/**
 * Utilitaire pour formater les montants en FCFA
 */
export function formatCurrency(amount: number): string {
    return `${amount.toLocaleString()} FCFA`;
}

/**
 * Utilitaire pour formater les dates
 */
export function formatDate(date: string | null | undefined, defaultValue = "-"): string {
    if (!date) return defaultValue;
    
    try {
        const dateObj = new Date(date);
        return dateObj.toLocaleDateString("fr-FR");
    } catch {
        return defaultValue;
    }
}

/**
 * Crée un footer avec des agrégations personnalisées
 */
export function createAggregatedFooter<TData extends Record<string, any>>(
    data: TData[],
    aggregations: Record<string, (data: TData[]) => string | number>
): Record<string, string | number> {
    const footer: Record<string, string | number> = {};
    
    Object.entries(aggregations).forEach(([key, aggregateFn]) => {
        footer[key] = aggregateFn(data);
    });
    
    return footer;
}

/**
 * Fonctions d'agrégation courantes
 */
export const aggregations = {
    sum: <T extends Record<string, any>>(key: keyof T) => (data: T[]) =>
        data.reduce((acc, item) => acc + (Number(item[key]) || 0), 0),
    
    count: <T extends Record<string, any>>(data: T[]) => data.length,
    
    avg: <T extends Record<string, any>>(key: keyof T) => (data: T[]) => {
        const sum = data.reduce((acc, item) => acc + (Number(item[key]) || 0), 0);
        return data.length > 0 ? sum / data.length : 0;
    },
    
    min: <T extends Record<string, any>>(key: keyof T) => (data: T[]) =>
        Math.min(...data.map((item) => Number(item[key]) || 0)),
    
    max: <T extends Record<string, any>>(key: keyof T) => (data: T[]) =>
        Math.max(...data.map((item) => Number(item[key]) || 0)),
};

