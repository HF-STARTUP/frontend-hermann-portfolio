"use client";

import React from "react";
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
    SortingState,
    ColumnFiltersState,
    PaginationState,
} from "@tanstack/react-table";
import { DataTableProps } from "@/types/dataTable.types";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ArrowSortIcon } from "@/components/layout/admin/sidebar/_navIcons/NavIcons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import Loading from "./Loader";
import { EmptyData } from "../box/PageNetworkState";

/**
 * DataTable - Un composant de tableau réutilisable et optimisé basé sur @tanstack/react-table
 * 
 * Features:
 * - Tri multi-colonnes
 * - Filtrage
 * - Pagination
 * - Footer avec totaux
 * - Gestion des clics sur les lignes
 * - Performance optimisée avec React.memo et useMemo
 */
export const DataTable = React.memo(<TData, TValue>(props: DataTableProps<TData, TValue>) => {
    const {
        columns,
        data,
        onRowClick,
        getRowClassName,
        enableSorting = true,
        enableFiltering = false,
        enablePagination = false,
        pageSize: initialPageSize = 10,
        showFooter = false,
        footerData,
        variant = "v2",
        isLoading = false,
        emptyMessage = "Aucune donnée disponible",
        // Props pour la pagination côté serveur
        manualPagination = false,
        pageIndex: controlledPageIndex,
        totalPages = 1,
        totalRecords = 0,
        onPageChange,
        onPageSizeChange,
        pageSizeOptions = [10, 20, 50, 100],
    } = props;

    // États du tableau
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    
    // Gestion de la pagination (locale ou côté serveur)
    const [localPagination, setLocalPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: initialPageSize,
    });

    // Utiliser la pagination contrôlée si manualPagination est activé
    const pagination = React.useMemo(() => {
        if (manualPagination && controlledPageIndex !== undefined) {
            return {
                pageIndex: controlledPageIndex,
                pageSize: initialPageSize,
            };
        }
        return localPagination;
    }, [manualPagination, controlledPageIndex, initialPageSize, localPagination]);

    // Gestionnaire de changement de pagination
    const handlePaginationChange = React.useCallback(
        (updater: any) => {
            if (manualPagination) {
                // En mode manuel, notifier le parent via les callbacks
                const newPagination = typeof updater === 'function' ? updater(pagination) : updater;
                if (newPagination.pageIndex !== pagination.pageIndex && onPageChange) {
                    onPageChange(newPagination.pageIndex);
                }
                if (newPagination.pageSize !== pagination.pageSize && onPageSizeChange) {
                    onPageSizeChange(newPagination.pageSize);
                }
            } else {
                // En mode local, gérer l'état localement
                setLocalPagination(updater);
            }
        },
        [manualPagination, pagination, onPageChange, onPageSizeChange]
    );

    // Configuration du tableau avec React Table
    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnFilters,
            pagination,
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onPaginationChange: handlePaginationChange,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
        getFilteredRowModel: enableFiltering ? getFilteredRowModel() : undefined,
        getPaginationRowModel: enablePagination ? getPaginationRowModel() : undefined,
        manualPagination: manualPagination,
        pageCount: manualPagination ? totalPages : undefined,
    });

    return (
        <div className="space-y-4 w-full relative">
            {(isLoading || !data.length) && (
                <div className="absolute top-0 rounded-lg left-0 w-full h-full flex items-center justify-center bg-white/80 backdrop-blur-sm z-10">
                    {isLoading && (
                        <div className="flex items-center flex-col justify-center gap-2">
                            <Loading />
                        </div>
                    )}
                    {!isLoading && !data.length && (
                        <div className="flex items-center flex-col justify-center gap-2">
                            <EmptyData message={emptyMessage} />
                        </div>
                    )}
                </div>
            )}
            <div className=" bg-white overflow-hidden">
                <Table>
                    {/* En-tête du tableau */}
                    <TableHeader className="bg-[#000b20] h-[56px]">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="border-none hover:bg-transparent">
                                {headerGroup.headers.map((header) => {
                                    const canSort = header.column.getCanSort();
                                    return (
                                        <TableHead 
                                            key={header.id} 
                                            className="py-[17px] text-center"
                                        >
                                            <div
                                                className={cn(
                                                    "flex gap-[10px] items-center justify-center text-white text-xs font-semibold px-[40px]",
                                                    canSort && enableSorting && "cursor-pointer hover:opacity-80 transition duration-200"
                                                )}
                                                onClick={
                                                    canSort && enableSorting
                                                        ? header.column.getToggleSortingHandler()
                                                        : undefined
                                                }
                                            >
                                                {enableSorting && canSort && (
                                                    <div>
                                                        <ArrowSortIcon />
                                                    </div>
                                                )}
                                                <div>
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                              header.column.columnDef.header,
                                                              header.getContext()
                                                          )}
                                                </div>
                                            </div>
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>

                    {/* Corps du tableau */}
                    <TableBody>
                        {isLoading ? (
                            <TableRow className="hover:bg-transparent">
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center text-gray-500"
                                >
                                    <div className=" h-[425px]">
                                       
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    className={cn(
                                        "hover:bg-slate-100 transition duration-200 ease-in",
                                        onRowClick && "cursor-pointer",
                                        getRowClassName && getRowClassName(row.original)
                                    )}
                                    onClick={() => onRowClick && onRowClick(row.original)}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell 
                                            key={cell.id}
                                            className="text-center"
                                        >
                                            <div className="text-[#506D82] text-base font-normal font-['DM Sans'] leading-7 h-12 flex items-center justify-center">
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </div>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow className="hover:bg-transparent">
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center text-gray-500"
                                >
                                    <div className=" h-[425px]">
                                       
                                       </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>

                    {/* Footer du tableau */}
                    {showFooter && footerData && (
                        <TableFooter className={cn(
                            "h-[45px] border-t-0",
                            variant === "v2" ? "bg-white" : "bg-[#405768]"
                        )}>
                            <TableRow className="hover:bg-transparent border-none">
                                {table.getHeaderGroups()[0].headers.map((header) => {
                                    const columnId = header.column.id;
                                    const footerValue = footerData[columnId] || "-";
                                    return (
                                        <TableCell 
                                            key={header.id}
                                            className="text-center"
                                        >
                                            <div
                                                className={cn(
                                                    "text-xl font-bold leading-[25px] py-[10px]",
                                                    variant === "v2" ? "text-black" : "text-white"
                                                )}
                                            >
                                                {footerValue}
                                            </div>
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        </TableFooter>
                    )}
                </Table>
            </div>

            {/* Pagination */}
            {enablePagination && (manualPagination ? totalRecords > 0 : data.length > initialPageSize) && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
                    <div className="flex items-center gap-4">
                        <div className="text-sm text-gray-700">
                            Page {table.getState().pagination.pageIndex + 1} sur{" "}
                            {table.getPageCount()} 
                            {manualPagination 
                                ? ` (${totalRecords} résultat(s) au total)` 
                                : ` (${data.length} résultat(s))`
                            }
                        </div>
                        
                        {/* Sélecteur de taille de page */}
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-700">Afficher:</span>
                            <select
                                value={table.getState().pagination.pageSize}
                                onChange={(e) => {
                                    const newSize = Number(e.target.value);
                                    table.setPageSize(newSize);
                                }}
                                className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {pageSizeOptions.map((size) => (
                                    <option key={size} value={size}>
                                        {size}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    
                    {/* Boutons de navigation */}
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}
                            title="Première page"
                        >
                            <ChevronsLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            title="Page précédente"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                            title="Page suivante"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                            disabled={!table.getCanNextPage()}
                            title="Dernière page"
                        >
                            <ChevronsRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}) as (<TData, TValue>(
    props: DataTableProps<TData, TValue>
) => React.ReactElement) & { displayName?: string };

DataTable.displayName = "DataTable";

