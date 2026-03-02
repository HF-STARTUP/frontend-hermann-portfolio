import { cn } from "@/lib/utils";
import React from "react";
import { MoreVertical } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    totalEntries: number;
    pageSize: number;
    onPageSizeChange: (size: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange, totalEntries, pageSize, onPageSizeChange }: PaginationProps) => {
    return (
        <div className="flex items-center justify-between px-6 bg-white border-none text-sm text-[#506D82]">
            <div>
                Affichage de {((currentPage - 1) * pageSize) + 1} à {Math.min(currentPage * pageSize, totalEntries)} sur {totalEntries} entrées
            </div>

            <div className="flex items-center gap-2">
                <button
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                    className="p-2 hover:bg-gray-100 rounded-md disabled:opacity-30"
                >
                    &lt;
                </button>

                {[...Array(totalPages)].map((_, i) => {
                    const page = i + 1;
                    // Logique simplifiée pour l'affichage des numéros (1, 2, 3... 10)
                    if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                        return (
                            <button
                                key={page}
                                onClick={() => onPageChange(page)}
                                className={cn(
                                    "w-8 h-8 rounded-md transition-colors",
                                    currentPage === page ? "bg-vaPrimary text-white" : "hover:bg-gray-100"
                                )}
                            >
                                {page}
                            </button>
                        );
                    }
                    if (page === currentPage - 2 || page === currentPage + 2) return <span key={page}>..</span>;
                    return null;
                })}

                <button
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                    className="p-2 hover:bg-gray-100 rounded-md disabled:opacity-30"
                >
                    &gt;
                </button>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-500 font-medium">
                <span>Afficher</span>
                <Select
                    value={pageSize.toString()}
                    onValueChange={(value) => onPageSizeChange(Number(value))}
                >
                    <SelectTrigger
                        className="h-9 border w-fit min-w-12 border-[#E0E9FF] rounded-lg bg-white"
                        aria-label="Sélectionner le nombre d'entrées par page"
                    >
                        <SelectValue>{pageSize}</SelectValue>
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
                <span>entrées par page</span>
            </div>
        </div>
    );
};



export interface Column<T> {
    header: string;
    accessor: keyof T | ((item: T) => React.ReactNode);
    className?: string;
}

export interface RowAction<T> {
    id: string;
    label: string;
    onClick: (item: T) => void;
    variant?: "default" | "destructive" | "ghost" | "mainBlue" | "gray" | "vaBlue";
    icon?: React.ReactNode;
}

interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
    pagination: PaginationProps;
    isLoading?: boolean;
    rowActions?: (item: T) => RowAction<T>[];
}


interface TableShimmerProps {
    rows?: number;
    columns?: number;
}

export const TableShimmer = ({ rows = 10, columns = 8 }: TableShimmerProps) => {
    return (
        <div className="w-full animate-pulse">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-[#0A1D47]">
                        {Array.from({ length: columns }).map((_, i) => (
                            <th key={i} className="px-6 py-4">
                                <div className="h-3 w-20 bg-white/10 rounded" />
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 bg-white">
                    {Array.from({ length: rows }).map((_, rowIndex) => (
                        <tr key={rowIndex}>
                            {Array.from({ length: columns }).map((_, colIndex) => (
                                <td key={colIndex} className="px-6 py-4">
                                    <div
                                        className={cn(
                                            "h-4 bg-gray-100 rounded",
                                            colIndex === 0 ? "w-24" : "w-full",
                                            colIndex === 1 ? "w-32" : "",
                                            colIndex === 4 ? "h-6 w-20 rounded-md bg-gray-50" : ""
                                        )}
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

function TableRowActionsDropdown<T>({
    item,
    getActions,
}: {
    item: T;
    getActions: (item: T) => RowAction<T>[];
}) {
    const actions = getActions(item);
    if (actions.length === 0) {
        return <div className="px-6 py-4" />;
    }

    const getVariant = (variant: RowAction<T>["variant"]) => {
        switch (variant) {
            case "default":
                return "text-gray-500";
            case "destructive":
                return "text-vaRed focus:text-vaRed";
            case "ghost":
                return "text-vaLightGray";
            case "mainBlue":
                return "text-vaMainBlue";
            case "gray":
                return "text-gray-500";
            case "vaBlue":
                return "text-vaBlue";
            
            default:
                return "text-vaLightGray";
        }
    }

    return (
        <div className="px-6 py-4 flex justify-end">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {actions.map((action) => (
                        <DropdownMenuItem
                            key={action.id}
                            onClick={() => action.onClick(item)}
                            className={cn(getVariant(action.variant), "cursor-pointer text-xs font-medium hover:bg-vaPrimary/5 text-center")}
                        >
                            {action.icon && <span className="mr-2">{action.icon}</span>}
                            {action.label}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

export function DataTable<T>({ columns, data, pagination, isLoading, rowActions }: DataTableProps<T>) {
    const hasActions = !!rowActions;
    const totalColumns = columns.length + (hasActions ? 1 : 0);
    const gridTemplate = {
        gridTemplateColumns: hasActions
            ? `repeat(${columns.length}, minmax(150px, 1fr)) minmax(80px, auto)`
            : `repeat(${columns.length}, minmax(150px, 1fr))`,
    };

    return (
        <div className="w-full space-y-2">
            <div className="w-full overflow-x-auto custom-scrollbar space-y-2">
                <div className="min-w-[800px] space-y-4">
                    <div
                        style={gridTemplate}
                        className="grid bg-vaPrimary text-white rounded-2xl w-fit min-w-full"
                    >
                        {columns.map((col, idx) => (
                            <div
                                key={idx}
                                className={cn(
                                    "px-6 py-4 text-left text-xs font-semibold tracking-wider",
                                    col.className
                                )}
                            >
                                {col.header}
                            </div>
                        ))}
                        {hasActions && (
                            <div className="px-6 py-4 text-left text-xs font-semibold tracking-wider" />
                        )}
                    </div>

                    <div className="flex flex-col gap-3">
                        {isLoading ? (
                            <TableShimmer rows={10} columns={totalColumns} />
                        ) : (
                            data.map((row, rowIndex) => (
                                <div
                                    key={rowIndex}
                                    style={gridTemplate}
                                    className="grid items-center bg-white border border-[#E0E9FF] rounded-2xl transition-all group w-fit min-w-full hover:bg-vaPrimary/5 duration-300 cursor-pointer"
                                >
                                    {columns.map((col, colIdx) => (
                                        <div key={colIdx} className="px-6 py-4 text-sm text-[#506D82] truncate">
                                            {typeof col.accessor === "function"
                                                ? col.accessor(row)
                                                : (row[col.accessor as keyof T] as React.ReactNode)}
                                        </div>
                                    ))}
                                    {hasActions && rowActions && (
                                        <TableRowActionsDropdown item={row} getActions={rowActions} />
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border-none">
                <Pagination {...pagination} />
            </div>
        </div>
    );
}