import { cn } from "@/lib/utils";
import React, {
    useMemo,
    useCallback,
    memo,
    useState,
    forwardRef,
    useImperativeHandle,
} from "react";
import {
    Loader2,
    MoreVertical,
    ArrowUpDown,
    ArrowUp,
    ArrowDown,
    Download,
    ChevronDown,
    ChevronRight,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { EmptyData } from "../box/PageNetworkState";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { runTableExport } from "./tableExport";

// ─────────────────────────────────────────────
// PAGINATION
// ─────────────────────────────────────────────

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
    onPageSizeChange,
}: PaginationProps) => {
    const startEntry = (currentPage - 1) * pageSize + 1;
    const endEntry = Math.min(currentPage * pageSize, totalEntries);

    const getPageNumbers = useCallback(() => {
        const delta = 2;
        const range: number[] = [];
        const rangeWithDots: (number | string)[] = [];
        let l: number | undefined;

        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
                range.push(i);
            }
        }

        range.forEach((i) => {
            if (l) {
                if (i - l === 2) rangeWithDots.push(l + 1);
                else if (i - l !== 1) rangeWithDots.push("...");
            }
            rangeWithDots.push(i);
            l = i;
        });

        return rangeWithDots;
    }, [currentPage, totalPages]);

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-2 bg-white text-xs text-[#506D82]">
            <div className="text-sm text-gray-600 whitespace-nowrap">
                Affichage de {startEntry} à {endEntry} sur {totalEntries} entrées
            </div>

            <div className="flex items-center gap-1">
                <button
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                    className="p-2 hover:bg-gray-100 rounded-md disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                    &lt;
                </button>
                {getPageNumbers().map((page, index) =>
                    page === "..." ? (
                        <span key={`dots-${index}`} className="px-2 text-gray-400">...</span>
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
                        >
                            {page}
                        </button>
                    )
                )}
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                    className="p-2 hover:bg-gray-100 rounded-md disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                    &gt;
                </button>
            </div>

            <div className="flex items-center gap-3 text-sm text-gray-500 font-medium">
                <span className="hidden sm:inline">Afficher</span>
                <Select value={pageSize.toString()} onValueChange={(v) => onPageSizeChange(Number(v))}>
                    <SelectTrigger className="h-9 w-20 border border-[#E0E9FF] rounded-lg bg-white hover:bg-gray-50 transition-colors">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {[10, 20, 50, 100].map((size) => (
                            <SelectItem key={size} value={size.toString()}>
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
Pagination.displayName = "Pagination";

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

export type SortDirection = "asc" | "desc" | null;

export interface Column<T> {
    header: string;
    accessor: keyof T | ((item: T) => React.ReactNode);
    /** Clé utilisée pour le tri. Doit pointer vers une valeur primitive de T. */
    sortKey?: keyof T;
    /**
     * Valeur texte/brute à utiliser lors de l'export (Excel/PDF/Word) quand `accessor`
     * retourne du JSX. Si omis pour une colonne à accessor fonction, la cellule exportée sera vide.
     */
    exportValue?: (item: T) => string | number;
    className?: string;
    width?: string;
    minWidth?: string;
}

export interface RowAction<T> {
    id: string;
    label: string;
    onClick: (item: T) => void;
    variant?: "default" | "destructive" | "ghost" | "mainBlue" | "gray" | "vaBlue" | "success";
    icon?: React.ReactNode;
}

export type ExportFormat = "excel" | "pdf" | "word";

export interface ExportConfig<T> {
    /** Formats disponibles à proposer dans le dropdown interne. Omis = pas de dropdown interne. */
    formats?: ExportFormat[];
    /** Colonnes à inclure dans l'export (toutes par défaut). */
    columns?: Column<T>[];
    /**
     * Handler optionnel. Si omis, le composant génère et télécharge lui-même
     * le fichier (Excel/PDF/Word) via tableExport.ts — aucune implémentation requise côté appelant.
     * Fournir cette prop permet de remplacer entièrement la génération interne (ex: export serveur).
     */
    onExport?: (format: ExportFormat, data: T[]) => void | Promise<void>;
    /** Cache le bouton "Exporter" interne — utile si déclenché uniquement depuis l'extérieur via la ref. */
    hideTrigger?: boolean;
    /** Nom de fichier sans extension (défaut: "export"). */
    fileName?: string;
    /** Titre affiché en en-tête du PDF/Word généré en interne. */
    title?: string;
}

export interface SelectionConfig {
    /** Tableau des valeurs actuellement sélectionnées. */
    selectedItems: string[];
    /** Setter pour mettre à jour la sélection. */
    onSelectionChange: (selected: string[]) => void;
    /** Clé de chaque ligne utilisée comme valeur de sélection. */
    selectionKey: string;
}

export interface GroupConfig<T> {
    /** Clé de T utilisée pour regrouper les lignes. */
    groupKey: keyof T;
    /** Libellé d'affichage du groupe (par défaut: la valeur brute de groupKey). */
    groupLabel?: (groupValue: any, items: T[]) => React.ReactNode;
    /** Groupes ouverts par défaut (toutes fermées si omis). */
    defaultExpanded?: boolean;
}

export interface DataTableRef {
    /** Déclenche l'export depuis l'extérieur du composant (ex: bouton dans le header de page). */
    triggerExport: (format: ExportFormat) => void;
}

interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
    pagination: PaginationProps;
    isLoading?: boolean;
    isError?: boolean;
    rowActions?: (item: T) => RowAction<T>[];
    onRowClick?: (item: T) => void;
    loadingRowId?: string | null;
    getRowId?: (item: T) => string;
    emptyMessage?: string;
    emptyContent?: React.ReactNode;
    errorContent?: React.ReactNode;
    className?: string;
    /** Config de sélection via cases à cocher. */
    selection?: SelectionConfig;
    /** Config d'export — interne et/ou déclenchable via ref. */
    exportConfig?: ExportConfig<T>;
    /** Config de regroupement — affiche les lignes en accordéon par groupe. */
    groupConfig?: GroupConfig<T>;
}

// ─────────────────────────────────────────────
// SHIMMER
// ─────────────────────────────────────────────

const TableShimmer = memo(({ rows = 10, columns = 8 }: { rows?: number; columns?: number }) => (
    <TableBody>
        {Array.from({ length: rows }).map((_, rowIndex) => (
            <TableRow key={rowIndex} className="animate-pulse border-none">
                {Array.from({ length: columns }).map((_, colIndex) => (
                    <TableCell key={colIndex} className="py-4">
                        <div className={cn("h-4 bg-gray-200 rounded", colIndex === 0 ? "w-24" : "w-full")} />
                    </TableCell>
                ))}
            </TableRow>
        ))}
    </TableBody>
));
TableShimmer.displayName = "TableShimmer";

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

const getVariantClass = (variant: RowAction<any>["variant"]) => {
    switch (variant) {
        case "destructive": return "text-red-600 focus:text-red-600 hover:bg-red-50";
        case "mainBlue":    return "text-blue-600";
        case "vaBlue":      return "text-blue-500";
        case "success":     return "text-green-600";
        case "gray":        return "text-gray-600";
        default:            return "text-gray-700";
    }
};

const EXPORT_LABELS: Record<ExportFormat, string> = {
    excel: "Exporter en Excel",
    pdf:   "Exporter en PDF",
    word:  "Exporter en Word",
};

// ─────────────────────────────────────────────
// DATA TABLE
// ─────────────────────────────────────────────

function DataTableInner<T extends Record<string, any>>(
    {
        columns,
        data,
        pagination,
        isLoading,
        isError,
        rowActions,
        onRowClick,
        loadingRowId,
        getRowId,
        emptyMessage = "Aucune donnée à afficher",
        emptyContent,
        errorContent,
        className,
        selection,
        exportConfig,
        groupConfig,
    }: DataTableProps<T>,
    ref: React.Ref<DataTableRef>
) {
    const hasActions   = !!rowActions;
    const hasSelection = !!selection;
    const hasGrouping  = !!groupConfig;

    const [sortKey, setSortKey] = useState<keyof T | null>(null);
    const [sortDirection, setSortDirection] = useState<SortDirection>(null);
    const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
    const [groupsInitialized, setGroupsInitialized] = useState(false);

    // ── Tri ──────────────────────────────────
    const handleSort = (key: keyof T) => {
        if (sortKey !== key) {
            setSortKey(key);
            setSortDirection("asc");
        } else if (sortDirection === "asc") {
            setSortDirection("desc");
        } else {
            setSortKey(null);
            setSortDirection(null);
        }
    };

    const sortedData = useMemo(() => {
        if (!sortKey || !sortDirection) return data;
        return [...data].sort((a, b) => {
            const aVal = a[sortKey];
            const bVal = b[sortKey];
            if (aVal === bVal) return 0;
            const cmp = aVal > bVal ? 1 : -1;
            return sortDirection === "asc" ? cmp : -cmp;
        });
    }, [data, sortKey, sortDirection]);

    // ── Groupement ───────────────────────────
    const groups = useMemo(() => {
        if (!groupConfig) return null;
        const map = new Map<string, { value: any; items: T[] }>();
        sortedData.forEach((row) => {
            const rawValue = row[groupConfig.groupKey];
            const key = String(rawValue);
            if (!map.has(key)) map.set(key, { value: rawValue, items: [] });
            map.get(key)!.items.push(row);
        });
        return Array.from(map.entries()).map(([key, val]) => ({ key, ...val }));
    }, [sortedData, groupConfig]);

    // initialise l'état d'expansion une fois les groupes connus
    React.useEffect(() => {
        if (!groups || groupsInitialized) return;
        if (groupConfig?.defaultExpanded) {
            setExpandedGroups(new Set(groups.map((g) => g.key)));
        }
        setGroupsInitialized(true);
    }, [groups, groupConfig?.defaultExpanded, groupsInitialized]);

    const toggleGroup = (key: string) => {
        setExpandedGroups((prev) => {
            const next = new Set(prev);
            if (next.has(key)) next.delete(key);
            else next.add(key);
            return next;
        });
    };

    // ── Sélection ────────────────────────────
    const allIds = useMemo(
        () => sortedData.map((row) => String(row[selection?.selectionKey ?? ""])),
        [sortedData, selection?.selectionKey]
    );

    const isAllSelected = allIds.length > 0 && allIds.every((id) => selection?.selectedItems.includes(id));
    const isIndeterminate = !isAllSelected && allIds.some((id) => selection?.selectedItems.includes(id));

    const handleSelectAll = () => {
        if (!selection) return;
        if (isAllSelected) {
            selection.onSelectionChange(selection.selectedItems.filter((id) => !allIds.includes(id)));
        } else {
            selection.onSelectionChange(Array.from(new Set([...selection.selectedItems, ...allIds])));
        }
    };

    const handleSelectRow = (rowId: string) => {
        if (!selection) return;
        if (selection.selectedItems.includes(rowId)) {
            selection.onSelectionChange(selection.selectedItems.filter((id) => id !== rowId));
        } else {
            selection.onSelectionChange([...selection.selectedItems, rowId]);
        }
    };

    const getGroupSelectionIds = (items: T[]) =>
        selection ? items.map((item) => String(item[selection.selectionKey])) : [];

    const isGroupAllSelected = (items: T[]) => {
        if (!selection) return false;
        const ids = getGroupSelectionIds(items);
        return ids.length > 0 && ids.every((id) => selection.selectedItems.includes(id));
    };

    const isGroupIndeterminate = (items: T[]) => {
        if (!selection) return false;
        const ids = getGroupSelectionIds(items);
        const allSel = ids.every((id) => selection.selectedItems.includes(id));
        return !allSel && ids.some((id) => selection.selectedItems.includes(id));
    };

    const handleSelectGroup = (items: T[]) => {
        if (!selection) return;
        const ids = getGroupSelectionIds(items);
        const allSel = ids.every((id) => selection.selectedItems.includes(id));
        if (allSel) {
            selection.onSelectionChange(selection.selectedItems.filter((id) => !ids.includes(id)));
        } else {
            selection.onSelectionChange(Array.from(new Set([...selection.selectedItems, ...ids])));
        }
    };

    // ── Export ───────────────────────────────
    const runExport = useCallback(
        async (format: ExportFormat) => {
            if (!exportConfig) return;

            if (exportConfig.onExport) {
                await exportConfig.onExport(format, sortedData);
                return;
            }

            // Aucun onExport fourni : génération + téléchargement gérés en interne
            await runTableExport({
                format,
                data: sortedData,
                columns: exportConfig.columns ?? columns,
                fileName: exportConfig.fileName,
                title: exportConfig.title,
            });
        },
        [exportConfig, sortedData, columns]
    );

    useImperativeHandle(ref, () => ({
        triggerExport: (format: ExportFormat) => runExport(format),
    }), [runExport]);

    const totalHeadCols =
        columns.length +
        (hasActions ? 1 : 0) +
        (hasSelection ? 1 : 0) +
        (hasGrouping ? 1 : 0); // colonne du chevron d'expansion

    // ── Rendu d'une ligne ────────────────────
    const renderRow = (row: T, index: number) => {
        const rowId        = getRowId?.(row);
        const isRowLoading = !!loadingRowId && !!rowId && rowId === loadingRowId;
        const selectionId  = selection ? String(row[selection.selectionKey]) : "";
        const isSelected   = selection?.selectedItems.includes(selectionId) ?? false;

        return (
            <TableRow
                key={rowId ?? index}
                onClick={onRowClick && !isRowLoading ? () => onRowClick(row) : undefined}
                className={cn(
                    "border-b border-[#E0E9FF] transition-colors relative",
                    isRowLoading && "opacity-70 pointer-events-none bg-vaPrimary/5",
                    isSelected && "bg-vaPrimary/10",
                    onRowClick && !isRowLoading && "cursor-pointer hover:bg-vaPrimary/5"
                )}
            >
                {isRowLoading && (
                    <td className="absolute inset-0 flex items-center justify-center z-10 bg-white/60">
                        <Loader2 className="size-5 animate-spin text-vaPrimary" />
                    </td>
                )}

                {/* Cellule vide pour aligner avec la colonne d'expansion des groupes */}
                {hasGrouping && <TableCell className="w-[32px]" />}

                {hasSelection && (
                    <TableCell
                        className="w-[48px]"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleSelectRow(selectionId);
                        }}
                    >
                        <Checkbox checked={isSelected} onCheckedChange={() => handleSelectRow(selectionId)} />
                    </TableCell>
                )}

                {columns.map((col, colIdx) => {
                    const value = typeof col.accessor === "function"
                        ? col.accessor(row)
                        : row[col.accessor as keyof T];
                    const isSimple = typeof value === "string" || typeof value === "number";

                    return (
                        <TableCell
                            key={colIdx}
                            className={cn("text-sm text-[#506D82] whitespace-nowrap", col.className)}
                            title={isSimple ? String(value) : undefined}
                        >
                            {value as React.ReactNode}
                        </TableCell>
                    );
                })}

                {hasActions && rowActions && (
                    <TableCell className="w-[80px]" onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="hover:bg-gray-100 h-8 w-8">
                                    <MoreVertical className="size-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="min-w-[140px] rounded-2xl">
                                {rowActions(row).map((action) => (
                                    <DropdownMenuItem
                                        key={action.id}
                                        onClick={() => action.onClick(row)}
                                        className={cn(getVariantClass(action.variant), "cursor-pointer text-sm font-medium py-2")}
                                    >
                                        {action.icon && <span className="mr-2 w-4 h-4">{action.icon}</span>}
                                        {action.label}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                )}
            </TableRow>
        );
    };

    return (
        <div className={cn("w-full space-y-4", className)}>
            {/* Barre d'outils export interne (optionnelle) */}
            {exportConfig && exportConfig.formats && !exportConfig.hideTrigger && (
                <div className="flex justify-end">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="gap-2">
                                <Download className="size-4" />
                                Exporter
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-2xl">
                            {exportConfig.formats.map((format) => (
                                <DropdownMenuItem
                                    key={format}
                                    onClick={() => runExport(format)}
                                    className="cursor-pointer text-sm"
                                >
                                    {EXPORT_LABELS[format]}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )}

            <div className="w-full overflow-x-auto custom-scrollbar rounded-2xl border border-[#E0E9FF]">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-vaPrimary hover:bg-vaPrimary/80 border-none p-0 uppercase h-4">
                            {hasGrouping && <TableHead className="w-[32px]" />}

                            {hasSelection && (
                                <TableHead className="w-[48px] text-white">
                                    <Checkbox
                                        checked={isAllSelected}
                                        ref={(el) => {
                                            if (el) (el as any).indeterminate = isIndeterminate;
                                        }}
                                        onCheckedChange={handleSelectAll}
                                        className="border-white data-[state=checked]:bg-white data-[state=checked]:text-vaPrimary"
                                    />
                                </TableHead>
                            )}

                            {columns.map((col, idx) => (
                                <TableHead
                                    key={idx}
                                    className={cn(
                                        "text-white text-xs font-semibold tracking-wider whitespace-nowrap",
                                        col.width && `w-[${col.width}]`,
                                        col.minWidth && `min-w-[${col.minWidth}]`,
                                        col.sortKey && "cursor-pointer select-none",
                                        col.className
                                    )}
                                    onClick={col.sortKey ? () => handleSort(col.sortKey!) : undefined}
                                >
                                    <div className="flex items-center gap-1">
                                        {col.header}
                                        {col.sortKey && (
                                            sortKey === col.sortKey ? (
                                                sortDirection === "asc"
                                                    ? <ArrowUp className="size-3" />
                                                    : <ArrowDown className="size-3" />
                                            ) : (
                                                <ArrowUpDown className="size-3 opacity-50" />
                                            )
                                        )}
                                    </div>
                                </TableHead>
                            ))}

                            {hasActions && <TableHead className="text-white text-xs" />}
                        </TableRow>
                    </TableHeader>

                    {isLoading ? (
                        <TableShimmer rows={pagination.pageSize} columns={totalHeadCols} />
                    ) : isError && errorContent ? (
                        <TableBody>
                            <TableRow>
                                <TableCell colSpan={totalHeadCols}>{errorContent}</TableCell>
                            </TableRow>
                        </TableBody>
                    ) : sortedData.length === 0 ? (
                        <TableBody>
                            <TableRow>
                                <TableCell colSpan={totalHeadCols}>
                                    {emptyContent ?? <EmptyData message={emptyMessage} className="bg-transparent" />}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    ) : hasGrouping && groups ? (
                        <>
                            {groups.map((group) => {
                                const isExpanded = expandedGroups.has(group.key);
                                const groupAllSelected = isGroupAllSelected(group.items);
                                const groupIndeterminate = isGroupIndeterminate(group.items);

                                return (
                                    <TableBody key={group.key}>
                                        <TableRow
                                            className="bg-[#F4F7FE] hover:bg-[#EAF0FD] border-b border-[#E0E9FF] cursor-pointer"
                                            onClick={() => toggleGroup(group.key)}
                                        >
                                            <TableCell className="w-[32px]">
                                                {isExpanded
                                                    ? <ChevronDown className="size-4 text-vaPrimary" />
                                                    : <ChevronRight className="size-4 text-vaPrimary" />}
                                            </TableCell>

                                            {hasSelection && (
                                                <TableCell
                                                    className="w-[48px]"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleSelectGroup(group.items);
                                                    }}
                                                >
                                                    <Checkbox
                                                        checked={groupAllSelected}
                                                        ref={(el) => {
                                                            if (el) (el as any).indeterminate = groupIndeterminate;
                                                        }}
                                                        onCheckedChange={() => handleSelectGroup(group.items)}
                                                    />
                                                </TableCell>
                                            )}

                                            <TableCell
                                                colSpan={columns.length + (hasActions ? 1 : 0)}
                                                className="text-sm font-semibold text-vaPrimary"
                                            >
                                                {groupConfig?.groupLabel
                                                    ? groupConfig.groupLabel(group.value, group.items)
                                                    : `${group.value} (${group.items.length})`}
                                            </TableCell>
                                        </TableRow>

                                        {isExpanded && group.items.map((row, idx) => renderRow(row, idx))}
                                    </TableBody>
                                );
                            })}
                        </>
                    ) : (
                        <TableBody>
                            {sortedData.map((row, index) => renderRow(row, index))}
                        </TableBody>
                    )}
                </Table>
            </div>

            {!isLoading && !isError && sortedData.length > 0 && (
                <div className="bg-white rounded-2xl overflow-hidden">
                    <Pagination {...pagination} />
                </div>
            )}
        </div>
    );
}

export const DataTable = forwardRef(DataTableInner) as <T extends Record<string, any>>(
    props: DataTableProps<T> & { ref?: React.Ref<DataTableRef> }
) => React.ReactElement;

// ─────────────────────────────────────────────────────────────────────────────
// DOCUMENTATION
// ─────────────────────────────────────────────────────────────────────────────
//
// ## DataTable<T>
//
// Tableau générique typé. T doit étendre Record<string, any>.
//
// ### Props principales (inchangées + nouvelles)
//
// | Prop          | Type             | Description                                          |
// |---------------|------------------|-------------------------------------------------------|
// | selection     | SelectionConfig  | Cases à cocher, gère aussi la sélection par groupe.    |
// | exportConfig  | ExportConfig<T>  | Export interne et/ou déclenché depuis l'extérieur.     |
// | groupConfig   | GroupConfig<T>   | Active le regroupement en accordéon.                   |
//
// ### ExportConfig<T>
//
// | Champ        | Type                                       | Description                                  |
// |--------------|---------------------------------------------|-----------------------------------------------|
// | formats      | ExportFormat[] (optionnel)                  | Si fourni, affiche un dropdown interne.        |
// | onExport     | (format, data: T[]) => void                 | Toujours appelé, peu importe la source du clic.|
// | hideTrigger  | boolean                                     | Cache le bouton interne (utile en mode externe).|
// | columns      | Column<T>[] (optionnel)                     | Restreint les colonnes exportées.              |
//
// Pour déclencher l'export depuis un bouton EXTERNE (hors du tableau) :
//
//   const tableRef = useRef<DataTableRef>(null);
//
//   <Button onClick={() => tableRef.current?.triggerExport("excel")}>
//     Exporter en Excel
//   </Button>
//
//   <DataTable ref={tableRef} exportConfig={{ onExport: handleExport, hideTrigger: true }} ... />
//
// Si `formats` est fourni ET `hideTrigger` n'est pas true, le dropdown interne
// ET les boutons externes fonctionnent simultanément — les deux appellent le
// même onExport avec les données triées du moment.
//
// ### GroupConfig<T>
//
// | Champ            | Type                                          | Description                              |
// |------------------|-------------------------------------------------|--------------------------------------------|
// | groupKey         | keyof T                                       | Champ utilisé pour regrouper les lignes.    |
// | groupLabel       | (value, items: T[]) => ReactNode (optionnel)  | Rendu custom de l'en-tête de groupe.        |
// | defaultExpanded  | boolean                                       | Tous les groupes ouverts au montage.        |
//
// Chaque groupe affiche une checkbox propre à son sous-ensemble : cocher la
// checkbox de groupe sélectionne/désélectionne tous les éléments de ce
// groupe uniquement (et reflète un état indéterminé si partiel). Cela
// fonctionne avec la même prop `selection` que la sélection ligne-par-ligne.
//
// ─────────────────────────────────────────────────────────────────────────────
// CAS D'USAGE COMPLET
// ─────────────────────────────────────────────────────────────────────────────
//
// interface Driver {
//   id: string;
//   name: string;
//   vehicle: string;
//   status: string;
//   city: string;       // <- utilisé comme groupKey
//   contractsCount: number;
// }
//
// export default function DriversPage() {
//   const tableRef = useRef<DataTableRef>(null);
//   const [page, setPage] = useState(1);
//   const [pageSize, setPageSize] = useState(10);
//   const [selected, setSelected] = useState<string[]>([]);
//
//   const { data, isLoading, total } = useGetDrivers({ page, pageSize });
//
//   const columns: Column<Driver>[] = [
//     { header: "Nom", accessor: "name", sortKey: "name", minWidth: "160px" },
//     { header: "Véhicule", accessor: "vehicle", sortKey: "vehicle" },
//     { header: "Statut", accessor: (d) => <Badge>{d.status}</Badge> },
//     { header: "Contrats", accessor: "contractsCount", sortKey: "contractsCount", width: "100px" },
//   ];
//
//   const handleExport = (format: ExportFormat, data: Driver[]) => {
//     if (format === "excel") exportToExcel(data);
//     if (format === "pdf")   exportToPdf(data);
//     if (format === "word")  exportToWord(data);
//   };
//
//   return (
//     <>
//       {/* Bouton d'export externe, hors du tableau */}
//       <div className="flex justify-between items-center mb-4">
//         <h1>Chauffeurs</h1>
//         <Button onClick={() => tableRef.current?.triggerExport("excel")}>
//           <Download className="size-4 mr-2" /> Exporter en Excel
//         </Button>
//       </div>
//
//       <DataTable<Driver>
//         ref={tableRef}
//         columns={columns}
//         data={data}
//         isLoading={isLoading}
//         pagination={{
//           currentPage: page,
//           totalPages: Math.ceil(total / pageSize),
//           onPageChange: setPage,
//           totalEntries: total,
//           pageSize,
//           onPageSizeChange: setPageSize,
//         }}
//         getRowId={(driver) => driver.id}
//         onRowClick={(driver) => router.push(`/drivers/${driver.id}`)}
//         selection={{
//           selectedItems: selected,
//           onSelectionChange: setSelected,
//           selectionKey: "id",
//         }}
//         groupConfig={{
//           groupKey: "city",
//           groupLabel: (city, items) => `${city} — ${items.length} chauffeur(s)`,
//           defaultExpanded: true,
//         }}
//         exportConfig={{
//           onExport: handleExport,
//           hideTrigger: true,   // pas de dropdown interne, uniquement le bouton externe ci-dessus
//         }}
//         rowActions={(driver) => [
//           { id: "edit", label: "Modifier", icon: <Pencil className="size-4" />, onClick: () => router.push(`/drivers/${driver.id}/edit`) },
//           { id: "delete", label: "Supprimer", variant: "destructive", icon: <Trash2 className="size-4" />, onClick: () => handleDelete(driver.id) },
//         ]}
//       />
//     </>
//   );
// }