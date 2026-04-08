import { cn } from "@/lib/utils";
import React, { useMemo, useCallback, memo } from "react";
import { MoreVertical } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { EmptyData } from "../box/PageNetworkState";

export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    totalEntries: number;
    pageSize: number;
    onPageSizeChange: (size: number) => void;
}

const Pagination = memo(({ 
    currentPage, 
    totalPages, 
    onPageChange, 
    totalEntries, 
    pageSize, 
    onPageSizeChange 
}: PaginationProps) => {
    const startEntry = (currentPage - 1) * pageSize + 1;
    const endEntry = Math.min(currentPage * pageSize, totalEntries);

    const getPageNumbers = useCallback(() => {
        const delta = 2;
        const range = [];
        const rangeWithDots: (number | string)[] = [];
        let l: number | undefined;

        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
                range.push(i);
            }
        }

        range.forEach((i) => {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(l + 1);
                } else if (i - l !== 1) {
                    rangeWithDots.push('...');
                }
            }
            rangeWithDots.push(i);
            l = i;
        });

        return rangeWithDots;
    }, [currentPage, totalPages]);

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 bg-white text-sm text-[#506D82]">
            <div className="text-sm text-gray-600 whitespace-nowrap">
                Affichage de {startEntry} à {endEntry} sur {totalEntries} entrées
            </div>

            <div className="flex items-center gap-1">
                <button
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                    className="p-2 hover:bg-gray-100 rounded-md disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    aria-label="Page précédente"
                >
                    &lt;
                </button>

                {getPageNumbers().map((page, index) => (
                    page === '...' ? (
                        <span key={`dots-${index}`} className="px-2 text-gray-400">
                            ...
                        </span>
                    ) : (
                        <button
                            key={page}
                            onClick={() => onPageChange(page as number)}
                            className={cn(
                                "min-w-[32px] h-8 px-2 rounded-md transition-all duration-200",
                                currentPage === page 
                                    ? "bg-vaPrimary text-white shadow-sm" 
                                    : "hover:bg-gray-100 text-gray-700"
                            )}
                            aria-label={`Page ${page}`}
                            aria-current={currentPage === page ? "page" : undefined}
                        >
                            {page}
                        </button>
                    )
                ))}

                <button
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                    className="p-2 hover:bg-gray-100 rounded-md disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    aria-label="Page suivante"
                >
                    &gt;
                </button>
            </div>

            <div className="flex items-center gap-3 text-sm text-gray-500 font-medium">
                <span className="hidden sm:inline">Afficher</span>
                <Select
                    value={pageSize.toString()}
                    onValueChange={(value) => onPageSizeChange(Number(value))}
                >
                    <SelectTrigger
                        className="h-9 w-20 border border-[#E0E9FF] rounded-lg bg-white hover:bg-gray-50 transition-colors"
                        aria-label="Sélectionner le nombre d'entrées par page"
                    >
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {[10, 20, 50, 100].map((size) => (
                            <SelectItem
                                key={size}
                                value={size.toString()}
                                className="cursor-pointer hover:bg-gray-50 focus:bg-vaPrimary/5 focus:text-vaPrimary"
                            >
                                {size}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <span className="hidden sm:inline">entrées par page</span>
            </div>
        </div>
    );
});

Pagination.displayName = 'Pagination';

export interface Column<T> {
    header: string;
    accessor: keyof T | ((item: T) => React.ReactNode);
    className?: string;
    width?: string;
    minWidth?: string;
    sortable?: boolean;
}

export interface RowAction<T> {
    id: string;
    label: string;
    onClick: (item: T) => void;
    variant?: "default" | "destructive" | "ghost" | "mainBlue" | "gray" | "vaBlue" | "success";
    icon?: React.ReactNode;
}

interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
    pagination: PaginationProps;
    isLoading?: boolean;
    rowActions?: (item: T) => RowAction<T>[];
    onRowClick?: (item: T) => void;
    emptyMessage?: string;
    className?: string;
}

interface TableShimmerProps {
    rows?: number;
    columns?: number;
}

const TableShimmer = memo(({ rows = 10, columns = 8 }: TableShimmerProps) => {
    return (
        <div className="w-full animate-pulse space-y-3">
            {Array.from({ length: rows }).map((_, rowIndex) => (
                <div
                    key={rowIndex}
                    className="grid items-center bg-white border border-[#E0E9FF] rounded-2xl py-4 px-2"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${columns}, 1fr)`,
                        gap: '0.5rem'
                    }}
                >
                    {Array.from({ length: columns }).map((_, colIndex) => (
                        <div key={colIndex} className="px-4">
                            <div
                                className={cn(
                                    "h-4 bg-gray-200 rounded",
                                    colIndex === 0 ? "w-24" : "w-full"
                                )}
                            />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
});

TableShimmer.displayName = 'TableShimmer';

const TableRowActionsDropdown = memo(function TableRowActionsDropdown<T>({
    item,
    getActions,
}: {
    item: T;
    getActions: (item: T) => RowAction<T>[];
}) {
    const actions = getActions(item);
    
    if (actions.length === 0) {
        return <div className="px-2" />;
    }

    const getVariantClass = (variant: RowAction<T>["variant"]) => {
        switch (variant) {
            case "destructive":
                return "text-red-600 focus:text-red-600 hover:bg-red-50";
            case "mainBlue":
                return "text-blue-600";
            case "vaBlue":
                return "text-blue-500";
            case "success":
                return "text-green-600";
            case "gray":
                return "text-gray-600";
            default:
                return "text-gray-700";
        }
    };

    return (
        <div className="flex justify-center" onClick={(e) => e.stopPropagation()}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button 
                        variant="ghost" 
                        size="icon"
                        className="hover:bg-gray-100 transition-colors h-8 w-8"
                    >
                        <MoreVertical className="size-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-[140px]">
                    {actions.map((action) => (
                        <DropdownMenuItem
                            key={action.id}
                            onClick={() => action.onClick(item)}
                            className={cn(
                                getVariantClass(action.variant),
                                "cursor-pointer text-sm font-medium py-2"
                            )}
                        >
                            {action.icon && <span className="mr-2 w-4 h-4">{action.icon}</span>}
                            {action.label}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}) as <T>(props: { item: T; getActions: (item: T) => RowAction<T>[] }) => JSX.Element;

const TableRow = memo(function TableRow<T>({
    row,
    columns,
    hasActions,
    rowActions,
    onRowClick,
}: {
    row: T;
    columns: Column<T>[];
    hasActions: boolean;
    rowActions?: (item: T) => RowAction<T>[];
    onRowClick?: (item: T) => void;
}) {
    // Utiliser les mêmes largeurs que l'en-tête
    const gridTemplateColumns = useMemo(() => {
        const widths = columns.map(col => col.width || '1fr');
        if (hasActions) widths.push('80px');
        return widths.join(' ');
    }, [columns, hasActions]);

    return (
        <div
            role={onRowClick ? "button" : undefined}
            tabIndex={onRowClick ? 0 : undefined}
            onKeyDown={onRowClick ? (e) => e.key === "Enter" && onRowClick(row) : undefined}
            className="grid items-center bg-white border border-[#E0E9FF] rounded-2xl transition-all group hover:bg-vaPrimary/5 hover:border-vaPrimary/20 duration-200 cursor-pointer py-2 px-2"
            style={{
                display: 'grid',
                gridTemplateColumns: gridTemplateColumns,
                gap: '0.5rem'
            }}
            onClick={onRowClick ? () => onRowClick(row) : undefined}
        >
            {columns.map((col, colIdx) => {
                const value = typeof col.accessor === "function"
                    ? col.accessor(row)
                    : row[col.accessor as keyof T];

                const isSimpleType = typeof value === "string" || typeof value === "number";
                const titleValue = isSimpleType ? String(value) : undefined;

                return (
                    <div
                        key={colIdx}
                        className={cn(
                            "px-4 text-sm text-[#506D82] truncate",
                            col.className
                        )}
                        title={titleValue}
                    >
                        {value as React.ReactNode}
                    </div>
                );
            })}
            {hasActions && rowActions && (
                <div className="px-2">
                    <TableRowActionsDropdown item={row} getActions={rowActions} />
                </div>
            )}
        </div>
    );
}) as <T>(props: {
    row: T;
    columns: Column<T>[];
    hasActions: boolean;
    rowActions?: (item: T) => RowAction<T>[];
    onRowClick?: (item: T) => void;
}) => JSX.Element;

export function DataTable<T extends Record<string, any>>({ 
    columns, 
    data, 
    pagination, 
    isLoading, 
    rowActions, 
    onRowClick,
    emptyMessage = "Aucune donnée à afficher",
    className 
}: DataTableProps<T>) {
    const hasActions = !!rowActions;

    // Calculer les largeurs des colonnes une fois pour l'en-tête et les lignes
    const gridTemplateColumns = useMemo(() => {
        const widths = columns.map(col => col.width || '1fr');
        if (hasActions) widths.push('80px');
        return widths.join(' ');
    }, [columns, hasActions]);

    const headerStyle = useMemo(() => ({
        display: 'grid',
        gridTemplateColumns: gridTemplateColumns,
        gap: '0.5rem'
    }), [gridTemplateColumns]);

    return (
        <div className={cn("w-full space-y-4", className)}>
            <div className="w-full overflow-x-auto custom-scrollbar">
                <div className="min-w-full space-y-3">
                    {/* Header */}
                    <div
                        style={headerStyle}
                        className="grid bg-vaPrimary text-white rounded-2xl px-2 py-4"
                    >
                        {columns.map((col, idx) => (
                            <div
                                key={idx}
                                className={cn(
                                    "px-4 text-left text-xs font-semibold tracking-wider truncate",
                                    col.className
                                )}
                            >
                                {col.header}
                            </div>
                        ))}
                        {hasActions && (
                            <div className="px-4 text-left text-xs font-semibold tracking-wider">
                                Actions
                            </div>
                        )}
                    </div>

                    {/* Data rows */}
                    <div className="flex flex-col gap-3">
                        {isLoading ? (
                            <TableShimmer 
                                rows={pagination.pageSize} 
                                columns={columns.length + (hasActions ? 1 : 0)} 
                            />
                        ) : data.length === 0 ? (
                            <EmptyData message={emptyMessage} className="bg-transparent" />
                        ) : (
                            data.map((row, index) => (
                                <TableRow
                                    key={index}
                                    row={row}
                                    columns={columns}
                                    hasActions={hasActions}
                                    rowActions={rowActions}
                                    onRowClick={onRowClick}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>

            {!isLoading && data.length > 0 && (
                <div className="bg-white rounded-2xl">
                    <Pagination {...pagination} />
                </div>
            )}
        </div>
    );
}