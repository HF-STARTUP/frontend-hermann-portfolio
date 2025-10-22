import { ColumnDef, SortingState, ColumnFiltersState, PaginationState } from "@tanstack/react-table";
import React from "react";

export interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    onRowClick?: (row: TData) => void;
    getRowClassName?: (row: TData) => string;
    enableSorting?: boolean;
    enableFiltering?: boolean;
    enablePagination?: boolean;
    pageSize?: number;
    showFooter?: boolean;
    footerData?: Record<string, string | number>;
    variant?: 'default' | 'v2';
    isLoading?: boolean;
    emptyMessage?: string;
    // Props pour la pagination côté serveur
    manualPagination?: boolean;
    pageIndex?: number;
    totalPages?: number;
    totalRecords?: number;
    onPageChange?: (page: number) => void;
    onPageSizeChange?: (pageSize: number) => void;
    pageSizeOptions?: number[];
}

export interface DataTableColumnMeta {
    headerClassName?: string;
    cellClassName?: string;
    footerClassName?: string;
    align?: 'left' | 'center' | 'right';
}

export interface DataTableState {
    sorting: SortingState;
    columnFilters: ColumnFiltersState;
    pagination: PaginationState;
}

